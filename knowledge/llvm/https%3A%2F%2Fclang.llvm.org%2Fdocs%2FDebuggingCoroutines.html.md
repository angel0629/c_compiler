---
title: "Debugging C++ Coroutines — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/DebuggingCoroutines.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
*   [Introduction](#introduction)
    
*   [Debugging generators](#debugging-generators)
    
    *   [Breakpoints inside the generators](#breakpoints-inside-the-generators)
        
    *   [Inspecting variables in a coroutine](#inspecting-variables-in-a-coroutine)
        
    *   [Stepping out of a coroutine](#stepping-out-of-a-coroutine)
        
    *   [Stepping into a coroutine](#stepping-into-a-coroutine)
        
    *   [Inspecting a suspended coroutine](#inspecting-a-suspended-coroutine)
        
    *   [Tracking the exact suspension point](#tracking-the-exact-suspension-point)
        
*   [Async stack traces](#async-stack-traces)
    
    *   [Stack traces of in-flight coroutines](#stack-traces-of-in-flight-coroutines)
        
    *   [Stack traces of suspended coroutines](#stack-traces-of-suspended-coroutines)
        
    *   [Keeping track of all existing coroutines](#keeping-track-of-all-existing-coroutines)
        
*   [Known issues & workarounds for older LLDB versions](#known-issues-workarounds-for-older-lldb-versions)
    
*   [Toolchain Implementation Details](#toolchain-implementation-details)
    
    *   [Ramp, resume and destroy functions](#ramp-resume-and-destroy-functions)
        
    *   [Artificial `__promise` and `__coro_frame` variables](#artificial-promise-and-coro-frame-variables)
        
    *   [The ABI of a coroutine](#the-abi-of-a-coroutine)
        
    *   [Implementation in clang / LLVM](#implementation-in-clang-llvm)
        
    *   [Devirtualization of coroutine handles](#devirtualization-of-coroutine-handles)
        
    *   [Interpreting the coroutine frame in optimized builds](#interpreting-the-coroutine-frame-in-optimized-builds)
        
*   [Resources](#resources)
    
    *   [LLDB Debugger Script](#lldb-debugger-script)
        
    *   [GDB Debugger Script](#gdb-debugger-script)
        
    *   [Further Reading](#further-reading)
        

[Introduction](#id1)[¶](#introduction "Link to this heading")
-------------------------------------------------------------

Coroutines in C++ were introduced in C++20, and the user experience for debugging them can still be challenging. This document guides you on how to most efficiently debug coroutines and how to navigate existing shortcomings in debuggers and compilers.

Coroutines are generally used either as generators or for asynchronous programming. In this document, we will discuss both use cases. Even if you are using coroutines for asynchronous programming, you should still read the generators section, as it introduces foundational debugging techniques also applicable to the debugging of asynchronous programs.

Both compilers (clang, gcc, …) and debuggers (lldb, gdb, …) are still improving their support for coroutines. As such, we recommend using the latest available version of your toolchain.

This document focuses on clang and lldb. The screenshots show [lldb-dap](https://marketplace.visualstudio.com/items?itemName=llvm-vs-code-extensions.lldb-dap) in combination with VS Code. The same techniques can also be used in other IDEs.

Debugging clang-compiled binaries with gdb is possible, but requires more scripting. This guide comes with a basic GDB script for coroutine debugging.

This guide will first showcase the more polished, bleeding-edge experience, but will also show you how to debug coroutines with older toolchains. In general, the older your toolchain, the deeper you will have to dive into the implementation details of coroutines (such as their ABI). The further down you go in this document, the more low-level, technical the content will become. If you are on an up-to-date toolchain, you will hopefully be able to stop reading earlier.

[Debugging generators](#id2)[¶](#debugging-generators "Link to this heading")
-----------------------------------------------------------------------------

One of the two major use cases for coroutines in C++ is generators, i.e., functions which can produce values via `co_yield`. Values are produced lazily, on-demand. For this purpose, every time a new value is requested, the coroutine gets resumed. As soon as it reaches a `co_yield` and thereby returns the requested value, the coroutine is suspended again.

This logic is encapsulated in a `generator` type similar to this one:

// generator.hpp
#include <coroutine>

// \`generator\` is a stripped down, minimal generator type.
template<typename T\>
struct generator {
  struct promise\_type {
    T current\_value{};

    auto get\_return\_object() {
      return std::coroutine\_handle<promise\_type\>::from\_promise(\*this);
    }
    auto initial\_suspend() { return std::suspend\_always(); }
    auto final\_suspend() noexcept { return std::suspend\_always(); }
    auto return\_void() { return std::suspend\_always(); }
    void unhandled\_exception() { \_\_builtin\_unreachable(); }
    auto yield\_value(T v) {
      current\_value \= v;
      return std::suspend\_always();
    }
  };

  generator(std::coroutine\_handle<promise\_type\> h) : hdl(h) { hdl.resume(); }
  ~generator() { hdl.destroy(); }

  generator<T\>& operator++() { hdl.resume(); return \*this; } // resume the coroutine
  T operator\*() const { return hdl.promise().current\_value; }

  private:
  std::coroutine\_handle<promise\_type\> hdl;
};

We can then use this `generator` class to print the Fibonacci sequence:

#include "generator.hpp"
#include <iostream>

generator<int\> fibonacci() {
  co\_yield 0;
  int prev \= 0;
  co\_yield 1;
  int current \= 1;
  while (true) {
    int next \= current + prev;
    co\_yield next;
    prev \= current;
    current \= next;
  }
}

template<typename T\>
void print10Elements(generator<T\>& gen) {
  for (unsigned i \= 0; i < 10; ++i) {
    std::cerr << \*gen << "\\n";
    ++gen;
  }
}

int main() {
  std::cerr << "Fibonacci sequence - here we go\\n";
  generator<int\> fib \= fibonacci();
  for (unsigned i \= 0; i < 5; ++i) {
    ++fib;
  }
  print10Elements(fib);
}

To compile this code, use `clang++ --std=c++23 generator-example.cpp -g`.

### [Breakpoints inside the generators](#id3)[¶](#breakpoints-inside-the-generators "Link to this heading")

We can set breakpoints inside coroutines just as we set them in regular functions. For VS Code, that means clicking next the line number in the editor. In the `lldb` CLI or in `gdb`, you can use `b` to set a breakpoint.

### [Inspecting variables in a coroutine](#id4)[¶](#inspecting-variables-in-a-coroutine "Link to this heading")

If you hit a breakpoint inside the `fibonacci` function, you should be able to inspect all local variables (`prev`, `current`, `next`) just like in a regular function.

![_images/coro-generator-variables.png](https://clang.llvm.org/docs/_images/coro-generator-variables.png)

Note the two additional variables `__promise` and `__coro_frame`. Those show the internal state of the coroutine. They are not relevant for our generator example but will be relevant for asynchronous programming described in the next section.

### [Stepping out of a coroutine](#id5)[¶](#stepping-out-of-a-coroutine "Link to this heading")

When single-stepping, you will notice that the debugger will leave the `fibonacci` function as soon as you hit a `co_yield` statement. You might find yourself inside some standard library code. After stepping out of the library code, you will be back in the `main` function.

### [Stepping into a coroutine](#id6)[¶](#stepping-into-a-coroutine "Link to this heading")

If you stop at `++fib` and try to step into the generator, you will first find yourself inside `operator++`. Stepping into the `handle.resume()` will not work by default.

This is because lldb does not step into functions from the standard library by default. To make this work, you first need to run `settings set target.process.thread.step-avoid-regexp ""`. You can do so from the “Debug Console” towards the bottom of the screen. With that setting change, you can step through `coroutine_handle::resume` and into your generator.

You might find yourself at the top of the coroutine at first, instead of at your previous suspension point. In that case, single-step and you will arrive at the previously suspended `co_yield` statement.

### [Inspecting a suspended coroutine](#id7)[¶](#inspecting-a-suspended-coroutine "Link to this heading")

The `print10Elements` function receives an opaque `generator` type. Let’s assume we are suspended at the `++gen;` line and want to inspect the generator and its internal state.

To do so, we can simply look into the `gen.hdl` variable. LLDB comes with a pretty printer for `std::coroutine_handle` which will show us the internal state of the coroutine. For GDB, you will have to use the `show-coro-frame` command provided by the [GDB Debugger Script](#gdb-script).

![_images/coro-generator-suspended.png](https://clang.llvm.org/docs/_images/coro-generator-suspended.png)

We can see two function pointers `resume` and `destroy`. These pointers point to the resume / destroy functions. By inspecting those function pointers, we can see that our `generator` is actually backed by our `fibonacci` coroutine. When using VS Code + lldb-dap, you can Cmd+Click on the function address (`0x555...` in the screenshot) to jump directly to the function definition backing your coroutine handle.

Next, we see the `promise`. In our case, this reveals the current value of our generator.

The `coro_frame` member represents the internal state of the coroutine. It contains our internal coroutine state `prev`, `current`, `next`. Furthermore, it contains many internal, compiler-specific members, which are named based on their type. These represent temporary values which the compiler decided to spill across suspension points, but which were not declared in our original source code and hence have no proper user-provided name.

### [Tracking the exact suspension point](#id8)[¶](#tracking-the-exact-suspension-point "Link to this heading")

Among the compiler-generated members, the `__coro_index` is particularly important. This member identifies the suspension point at which the coroutine is currently suspended.

However, it is non-trivial to map this number back to a source code location. The compiler emits debug info labels for the suspension points. This allows us to map the suspension point index back to a source code location. In gdb, we can use the `info line` command to get the source code location of the suspension point.

(gdb) info line \-function coro\_task \-label \_\_coro\_resume\_2
Line 45 of "llvm-example.cpp" starts at address 0x1b1b <\_ZL9coro\_taski.resume+555\> and ends at 0x1b46 <\_ZL9coro\_taski.resume+598\>.
Line 45 of "llvm-example.cpp" starts at address 0x201b <\_ZL9coro\_taski.destroy+555\> and ends at 0x2046 <\_ZL9coro\_taski.destroy+598\>.
Line 45 of "llvm-example.cpp" starts at address 0x253b <\_ZL9coro\_taski.cleanup+555\> and ends at 0x2566 <\_ZL9coro\_taski.cleanup+598\>.

LLDB does not support looking up labels. Furthermore, those labels are only emitted starting with clang 21.0.

For simple cases, you might still be able to guess the suspension point correctly. Alternatively, you might also want to modify your coroutine library to store the line number of the current suspension point in the promise:

// For all promise\_types we need a new \`\_coro\_return\_address\` variable:
class promise\_type {
  ...
  void\* \_coro\_return\_address \= nullptr;
};

// For all the awaiter types we need:
class awaiter {
  ...
  template <typename Promise\>
  \_\_attribute\_\_((noinline)) auto await\_suspend(std::coroutine\_handle<Promise\> handle) {
        ...
        handle.promise().\_coro\_return\_address \= \_\_builtin\_return\_address(0);
  }
};

This stores the return address of `await_suspend` within the promise. Thereby, we can read it back from the promise of a suspended coroutine and map it to an exact source code location. For a complete example, see the `task` type used below for asynchronous programming.

Alternatively, we can modify the C++ code to store the line number in the promise type. We can use `std::source_location` to get the line number of the await and store it inside the `promise_type`. In the debugger, we can then read the line number from the promise of the suspended coroutine.

// For all the awaiter types we need:
class awaiter {
  ...
  template <typename Promise\>
  void await\_suspend(std::coroutine\_handle<Promise\> handle,
                     std::source\_location sl \= std::source\_location::current()) {
        ...
        handle.promise().line\_number \= sl.line();
  }
};

The downside of both approaches is that they come at the price of additional runtime cost. In particular, the second approach increases binary size, since it requires additional `std::source_location` objects, and those source locations are not stripped by split-dwarf. Whether the first approach is worth the additional runtime cost is a trade-off you need to make yourself.

[Async stack traces](#id9)[¶](#async-stack-traces "Link to this heading")
-------------------------------------------------------------------------

Besides generators, the second common use case for coroutines in C++ is asynchronous programming, usually involving libraries such as stdexec, folly, cppcoro, boost::asio, or similar libraries. Some of those libraries already provide custom debugging support, so in addition to this guide, you might want to check out their documentation.

When using coroutines for asynchronous programming, your library usually provides you with some `task` type. This type usually looks similar to this:

// async-task-library.hpp
#include <coroutine>
#include <utility>

struct task {
  struct promise\_type {
    task get\_return\_object() { return std::coroutine\_handle<promise\_type\>::from\_promise(\*this); }
    auto initial\_suspend() { return std::suspend\_always{}; }

    void unhandled\_exception() noexcept {}

    auto final\_suspend() noexcept {
      struct FinalSuspend {
        std::coroutine\_handle<> continuation;
        auto await\_ready() noexcept { return false; }
        auto await\_suspend(std::coroutine\_handle<> handle) noexcept {
          return continuation;
        }
        void await\_resume() noexcept {}
      };
      return FinalSuspend{continuation};
    }

    void return\_value(int res) { result \= res; }

    std::coroutine\_handle<> continuation \= std::noop\_coroutine();
    int result \= 0;
    #ifndef NDEBUG
    void\* \_coro\_suspension\_point\_addr \= nullptr;
    #endif
  };

  task(std::coroutine\_handle<promise\_type\> handle) : handle(handle) {}
  ~task() {
    if (handle)
      handle.destroy();
  }

  struct Awaiter {
    std::coroutine\_handle<promise\_type\> handle;
    auto await\_ready() { return false; }

    template <typename P\>
    #ifndef NDEBUG
    \_\_attribute\_\_((noinline))
    #endif
    auto await\_suspend(std::coroutine\_handle<P\> continuation) {
      handle.promise().continuation \= continuation;
      #ifndef NDEBUG
      continuation.promise().\_coro\_suspension\_point\_addr \= \_\_builtin\_return\_address(0);
      #endif
      return handle;
    }
    int await\_resume() {
      return handle.promise().result;
    }
  };

  auto operator co\_await() {
    return Awaiter{handle};
  }

  int syncStart() {
    handle.resume();
    return handle.promise().result;
  }

private:
  std::coroutine\_handle<promise\_type\> handle;
};

Note how the `task::promise_type` has a member variable `std::coroutine_handle<> continuation`. This is the handle of the coroutine that will be resumed when the current coroutine is finished executing (see `final_suspend`). In a sense, this is the “return address” of the coroutine. It is set inside `operator co_await` when another coroutine calls our generator and awaits for the next value to be produced.

The result value is returned via the `int result` member. It is written in `return_value` and read by `Awaiter::await_resume`. Usually, the result type of a task is a template argument. For simplicity’s sake, we hard-coded the `int` type in this example.

### [Stack traces of in-flight coroutines](#id10)[¶](#stack-traces-of-in-flight-coroutines "Link to this heading")

Let’s assume you have the following program and set a breakpoint inside the `write_output` function. There are multiple call paths through which this function could have been reached. How can we find out said call path?

#include <iostream>
#include <string\_view>
#include "async-task-library.hpp"

static task write\_output(std::string\_view contents) {
  std::cout << contents << "\\n";
  co\_return contents.size();
}

static task greet() {
  int bytes\_written \= 0;
  bytes\_written += co\_await write\_output("Hello");
  bytes\_written += co\_await write\_output("World");
  co\_return bytes\_written;
}

int main() {
  int bytes\_written \= greet().syncStart();
  std::cout << "Bytes written: " << bytes\_written << "\\n";
  return 0;
}

To do so, let’s break inside `write_output`. We can understand our call-stack by looking into the special `__promise` variable. This artificial variable is generated by the compiler and points to the `promise_type` instance corresponding to the currently in-flight coroutine. In this case, the `__promise` variable contains the `continuation` which points to our caller. That caller again contains a `promise` with a `continuation` which points to our caller’s caller.

![_images/coro-async-task-continuations.png](https://clang.llvm.org/docs/_images/coro-async-task-continuations.png)

We can figure out the involved coroutine functions and their current suspension points as discussed above in the “Inspecting a suspended coroutine” section.

When using LLDB’s CLI, the command `p --ptr-depth 4 __promise` might also be useful to automatically dereference all the pointers up to the given depth.

To get a flat representation of that call stack, we can use a debugger script, such as the one shown in the [LLDB Debugger Script](#lldb-script) section. With that script, we can run `coro bt` to get the following stack trace:

(lldb) coro bt
frame #0: write\_output(std::basic\_string\_view<char, std::char\_traits<char>>) at /home/avogelsgesang/Documents/corotest/async-task-example.cpp:6:16
\[async\] frame #1: greet() at /home/avogelsgesang/Documents/corotest/async-task-example.cpp:12:20
\[async\] frame #2: std::\_\_n4861::coroutine\_handle<std::\_\_n4861::noop\_coroutine\_promise>::\_\_frame::\_\_dummy\_resume\_destroy() at /usr/include/c++/14/coroutine:298, suspension point unknown
frame #3: std::\_\_n4861::coroutine\_handle<task::promise\_type>::resume() const at /usr/include/c++/14/coroutine:242:29
frame #4: task::syncStart() at /home/avogelsgesang/Documents/corotest/async-task-library.hpp:78:14
frame #5: main at /home/avogelsgesang/Documents/corotest/async-task-example.cpp:18:11
frame #6: \_\_libc\_start\_call\_main at sysdeps/nptl/libc\_start\_call\_main.h:58:16
frame #7: \_\_libc\_start\_main\_impl at csu/libc-start.c:360:3
frame #8: \_start at :4294967295

Note how the frames #1 and #2 are async frames.

The `coro bt` command already includes logic to identify the exact suspension point of each frame based on the `_coro_suspension_point_addr` stored inside the promise.

### [Stack traces of suspended coroutines](#id11)[¶](#stack-traces-of-suspended-coroutines "Link to this heading")

Usually, while a coroutine is waiting for, e.g., an in-flight network request, the suspended `coroutine_handle` is stored within the work queues inside the IO scheduler. As soon as we get hold of the coroutine handle, we can backtrace it by using `coro bt <coro_handle>` where `<coro_handle>` is an expression evaluating to the coroutine handle of the suspended coroutine.

### [Keeping track of all existing coroutines](#id12)[¶](#keeping-track-of-all-existing-coroutines "Link to this heading")

Usually, we should be able to get hold of all currently suspended coroutines by inspecting the worker queues of the IO scheduler. In cases where this is not possible, we can use the following approach to keep track of all currently suspended coroutines.

One such solution is to store the list of in-flight coroutines in a collection:

inline std::unordered\_set<std::coroutine\_handle<void\>> inflight\_coroutines;
inline std::mutex inflight\_coroutines\_mutex;

class promise\_type {
public:
    promise\_type() {
        std::unique\_lock<std::mutex\> lock(inflight\_coroutines\_mutex);
        inflight\_coroutines.insert(std::coroutine\_handle<promise\_type\>::from\_promise(\*this));
    }
    ~promise\_type() {
        std::unique\_lock<std::mutex\> lock(inflight\_coroutines\_mutex);
        inflight\_coroutines.erase(std::coroutine\_handle<promise\_type\>::from\_promise(\*this));
    }
};

With this in place, it is possible to inspect `inflight_coroutines` from the debugger and rely on LLDB’s `std::coroutine_handle` pretty-printer to inspect the coroutines.

This technique will track _all_ coroutines, also the ones which are currently awaiting another coroutine, though. To identify just the “roots” of our in-flight coroutines, we can use the `coro in-flight inflight_coroutines` command provided by the [LLDB Debugger Script](#lldb-script).

Please note that the above is expensive from a runtime performance perspective, and requires locking to prevent data races. As such, it is not recommended to use this approach in production code.

[Known issues & workarounds for older LLDB versions](#id13)[¶](#known-issues-workarounds-for-older-lldb-versions "Link to this heading")
----------------------------------------------------------------------------------------------------------------------------------------

LLDB before 21.0 did not yet show the `__coro_frame` inside `coroutine_handle`. To inspect the coroutine frame, you had to use the approach described in the [Devirtualization of coroutine handles](#devirtualization) section.

LLDB before 18.0 hid the `__promise` and `__coro_frame` variables by default. The variables are still present, but they need to be explicitly added to the “watch” pane in VS Code or requested via `print __promise` and `print __coro_frame` from the debugger console.

LLDB before 16.0 did not yet provide a pretty-printer for `std::coroutine_handle`. To inspect the coroutine handle, you had to manually use the approach described in the [Devirtualization of coroutine handles](#devirtualization) section.

[Toolchain Implementation Details](#id14)[¶](#toolchain-implementation-details "Link to this heading")
------------------------------------------------------------------------------------------------------

This section covers the ABI as well as additional compiler-specific behavior. The ABI is followed by all compilers, on all major systems, including Windows, Linux, and macOS. Different compilers emit different debug information, though.

### [Ramp, resume and destroy functions](#id15)[¶](#ramp-resume-and-destroy-functions "Link to this heading")

Every coroutine is split into three parts:

*   The ramp function allocates the coroutine frame and initializes it, usually copying over all variables into the coroutine frame
    
*   The resume function continues the coroutine from its previous suspension point
    
*   The destroy function destroys and deallocates the coroutine frame
    
*   The cleanup function destroys the coroutine frame but does not deallocate it. It is used when the coroutine’s allocation was elided thanks to [Heap Allocation Elision (HALO)](https://www.open-std.org/JTC1/SC22/WG21/docs/papers/2018/p0981r0.html)
    

The ramp function is called by the coroutine’s caller, and available under the original function name used in the C++ source code. The resume function is called via `std::coroutine_handle::resume`. The destroy function is called via `std::coroutine_handle::destroy`.

Information between the three functions is passed via the coroutine frame, a compiler-synthesized struct that contains all necessary internal state. The resume function knows where to resume execution by reading the suspension point index from the coroutine frame. Similarly, the destroy function relies on the suspension point index to know which variables are currently in scope and need to be destructed.

Usually, the destroy function calls all destructors and deallocates the coroutine frame. When a coroutine frame was elided thanks to HALO, only the destructors need to be called, but the coroutine frame must not be deallocated. In those cases, the cleanup function is used instead of the destroy function.

For coroutines allocated with `[[clang::coro_await_elidable]]`, clang also generates a `.noalloc` variant of the ramp function, which does not allocate the coroutine frame by itself, but instead expects the caller to allocate the coroutine frame and pass it to the ramp function.

When trying to intercept all creations of new coroutines in the debugger, you hence might have to set breakpoints in the ramp function and its `.noalloc` variant.

### [Artificial `__promise` and `__coro_frame` variables](#id16)[¶](#artificial-promise-and-coro-frame-variables "Link to this heading")

Inside all coroutine functions, clang / LLVM synthesize a `__promise` and `__coro_frame` variable. These variables are used to store the coroutine’s state. When inside the coroutine function, those can be used to directly inspect the promise and the coroutine frame of the own function.

### [The ABI of a coroutine](#id17)[¶](#the-abi-of-a-coroutine "Link to this heading")

A `std::coroutine_handle` essentially only holds a pointer to a coroutine frame. It resembles the following struct:

template<typename promise\_type\>
struct coroutine\_handle {
  void\* \_\_coroutine\_frame \= nullptr;
};

The structure of coroutine frames is defined as

struct my\_coroutine\_frame {
  void (\*\_\_resume)(coroutine\_frame\*); // function pointer to the \`resume\` function
  void (\*\_\_destroy)(coroutine\_frame\*); // function pointer to the \`destroy\` function
  promise\_type promise; // the corresponding \`promise\_type\`
  ... // Internal coroutine state
}

For each coroutine, the compiler synthesizes a different coroutine type, storing all necessary internal state. The actual coroutine type is type-erased behind the `std::coroutine_handle`.

However, all coroutine frames always contain the `resume` and `destroy` functions as their first two members. As such, we can read the function pointers from the coroutine frame and then obtain the function’s name from its address.

The promise is guaranteed to be at a 16-byte offset from the coroutine frame. If we have a coroutine handle at address 0x416eb0, we can hence reinterpret-cast the promise as follows:

print (task::promise\_type)\*(0x416eb0+16)

### [Implementation in clang / LLVM](#id18)[¶](#implementation-in-clang-llvm "Link to this heading")

The C++ Coroutines feature in the Clang compiler is implemented in two parts of the compiler. Semantic analysis is performed in Clang, and coroutine construction and optimization take place in the LLVM middle-end.

For each coroutine function, the frontend generates a single corresponding LLVM-IR function. This function uses special `llvm.coro.suspend` intrinsics to mark the suspension points of the coroutine. The middle end first optimizes this function and applies, e.g., constant propagation across the whole, non-split coroutine.

CoroSplit then splits the function into ramp, resume and destroy functions. This pass also moves stack-local variables which are alive across suspension points into the coroutine frame. Most of the heavy lifting to preserve debugging information is done in this pass. This pass needs to rewrite all variable locations to point into the coroutine frame.

Afterwards, a couple of additional optimizations are applied before code gets emitted, but none of them are really interesting regarding debugging information.

For more details on the IR representation of coroutines and the relevant optimization passes, see [Coroutines in LLVM](https://llvm.org/docs/Coroutines.html).

Emitting debug information inside `CoroSplit` forces us to generate insufficient debugging information. Usually, the compiler generates debug information in the frontend, as debug information is highly language specific. However, this is not possible for coroutine frames because the frames are constructed in the LLVM middle-end.

To mitigate this problem, the LLVM middle end attempts to generate some debug information, which is unfortunately incomplete, since much of the language-specific information is missing in the middle end.

### [Devirtualization of coroutine handles](#id19)[¶](#devirtualization-of-coroutine-handles "Link to this heading")

Figuring out the promise type and the coroutine frame type of a coroutine handle requires inspecting the `resume` and `destroy` function pointers. There are two possible approaches to do so:

1.  clang always names the type by appending `.coro_frame_ty` to the linkage name of the ramp function.
    
2.  Both clang and GCC add the function-local `__promise` and `__coro_frame` variables to the resume and destroy functions. We can lookup their types and thereby get the types of promise and coroutine frame.
    

In gdb, one can use the following approach to devirtualize a coroutine type, assuming we have a `std::coroutine_handle` is at address 0x418eb0:

(gdb) # Get the address of coroutine frame
(gdb) print/x \*0x418eb0
$1 = 0x4019e0
(gdb) # Get the linkage name for the coroutine
(gdb) x 0x4019e0
0x4019e0 <\_ZL9coro\_taski>:  0xe5894855
(gdb) # Turn off the demangler temporarily to avoid the debugger misunderstanding the name.
(gdb) set demangle-style none
(gdb) # The coroutine frame type is 'linkage\_name.coro\_frame\_ty'
(gdb) print  ('\_ZL9coro\_taski.coro\_frame\_ty')\*(0x418eb0)
$2 = {\_\_resume\_fn = 0x4019e0 <coro\_task(int)>, \_\_destroy\_fn = 0x402000 <coro\_task(int)>, \_\_promise = {...}, ...}

In practice, one would use the `show-coro-frame` command provided by the [GDB Debugger Script](#gdb-script).

LLDB comes with devirtualization support out of the box, as part of the pretty-printer for `std::coroutine_handle`. Internally, this pretty-printer uses the second approach. We look up the types in the destroy function and not the resume function because the resume function pointer will be set to a `nullptr` as soon as a coroutine reaches its final suspension point. If we used the resume function, devirtualization would hence fail for all coroutines that have reached their final suspension point.

### [Interpreting the coroutine frame in optimized builds](#id20)[¶](#interpreting-the-coroutine-frame-in-optimized-builds "Link to this heading")

The `__coro_frame` variable usually refers to the coroutine frame of an _in-flight_ coroutine. This means the coroutine is currently executing. However, the compiler only guarantees the coroutine frame to be in a consistent state while the coroutine is suspended. As such, the variables inside the `__coro_frame` variable might be outdated, particularly when optimizations are enabled.

Furthermore, when optimizations are enabled, the compiler will layout the coroutine frame more aggressively. Unused values are optimized out, and the state will usually contain only the minimal information required to reconstruct the coroutine’s state.

clang / LLVM usually use variables like `__int_32_0` to represent this optimized storage. Those values usually do not directly correspond to variables in the source code.

When compiling the program

static task coro\_task(int v) {
  int a \= v;
  co\_await some\_other\_task();
  a++; // \_\_int\_32\_0 is 43 here
  std::cout << a << "\\n";
  a++; // \_\_int\_32\_0 is still 43 here
  std::cout << a << "\\n";
  a++; // \_\_int\_32\_0 is still 43 here!
  std::cout << a << "\\n";
  co\_await some\_other\_task();
  a++; // \_\_int\_32\_0 is still 43 here!!
  std::cout << a << "\\n";
  a++; // Why is \_\_int\_32\_0 still 43 here?
  std::cout << a << "\\n";
}

clang creates a single entry `__int_32_0` in the coroutine state.

Intuitively, one might assume that `__int_32_0` represents the value of the local variable `a`. However, inspecting `__int_32_0` in the debugger while single-stepping will reveal that the value of `__int_32_0` stays constant, despite `a` being frequently incremented.

While this might be surprising, this is a result of the optimizer recognizing that it can eliminate most of the load/store operations. The above code is optimized to the equivalent of:

static task coro\_task(int v) {
  store v into \_\_int\_32\_0 in the frame
  co\_await await\_counter{};
  a \= load \_\_int\_32\_0
  std::cout << a+1 << "\\n";
  std::cout << a+2 << "\\n";
  std::cout << a+3 << "\\n";
  co\_await await\_counter{};
  a \= load \_\_int\_32\_0
  std::cout << a+4 << "\\n";
  std::cout << a+5 << "\\n";
}

It should now be obvious why the value of `__int_32_0` remains unchanged throughout the function. It is important to recognize that `__int_32_0` does not directly correspond to `a`, but is instead a variable generated to assist the compiler in code generation. The variables in an optimized coroutine frame should not be thought of as directly representing the variables in the C++ source.

[Resources](#id21)[¶](#resources "Link to this heading")
--------------------------------------------------------

### [LLDB Debugger Script](#id22)[¶](#lldb-debugger-script "Link to this heading")

The following script provides the `coro bt` and `coro in-flight` commands discussed above. It can be loaded into LLDB using `command script import lldb_coro_debugging.py`. To load this by default, add this command to your `~/.lldbinit` file.

Note that this script requires LLDB 21.0 or newer.

\# lldb\_coro\_debugging.py
import lldb
from lldb.plugins.parsed\_cmd import ParsedCommand

def \_get\_first\_var\_path(v, paths):
    """
    Tries multiple variable paths via \`GetValueForExpressionPath\`
    and returns the first one that succeeds, or None if none succeed.
    """
    for path in paths:
        var \= v.GetValueForExpressionPath(path)
        if var.error.Success():
            return var
    return None

def \_print\_async\_bt(coro\_hdl, result, \*, curr\_idx, start, limit, continuation\_paths, prefix\=""):
    """
    Prints a backtrace for an async coroutine stack starting from \`coro\_hdl\`,
    using the given \`continuation\_paths\` to get the next coroutine from the promise.
    """
    target \= coro\_hdl.GetTarget()
    while curr\_idx < limit and coro\_hdl is not None and coro\_hdl.error.Success():
        \# Print the stack frame, if in range
        if curr\_idx \>= start:
            \# Figure out the function name
            destroy\_func\_var \= coro\_hdl.GetValueForExpressionPath(".destroy")
            destroy\_addr \= target.ResolveLoadAddress(destroy\_func\_var.GetValueAsAddress())
            func\_name \= destroy\_addr.function.name
            \# Figure out the line entry to show
            suspension\_addr\_var \= coro\_hdl.GetValueForExpressionPath(".promise.\_coro\_suspension\_point\_addr")
            if suspension\_addr\_var.error.Success():
                line\_entry \= target.ResolveLoadAddress(suspension\_addr\_var.GetValueAsAddress()).line\_entry
                print(f"{prefix} frame #{curr\_idx}: {func\_name} at {line\_entry}", file\=result)
            else:
                \# We don't know the exact line, print the suspension point ID, so we at least show
                \# the id of the current suspension point
                suspension\_point\_var \= coro\_hdl.GetValueForExpressionPath(".coro\_frame.\_\_coro\_index")
                if suspension\_point\_var.error.Success():
                    suspension\_point \= suspension\_point\_var.GetValueAsUnsigned()
                else:
                    suspension\_point \= "unknown"
                line\_entry \= destroy\_addr.line\_entry
                print(f"{prefix} frame #{curr\_idx}: {func\_name} at {line\_entry}, suspension point {suspension\_point}", file\=result)
        \# Move to the next stack frame
        curr\_idx += 1
        promise\_var \= coro\_hdl.GetChildMemberWithName("promise")
        coro\_hdl \= \_get\_first\_var\_path(promise\_var, continuation\_paths)
    return curr\_idx

def \_print\_combined\_bt(frame, result, \*, unfiltered, curr\_idx, start, limit, continuation\_paths):
    """
    Prints a backtrace starting from \`frame\`, interleaving async coroutine frames
    with regular frames.
    """
    while curr\_idx < limit and frame.IsValid():
        if curr\_idx \>= start and (unfiltered or not frame.IsHidden()):
            print(f"frame #{curr\_idx}: {frame.name} at {frame.line\_entry}", file\=result)
        curr\_idx += 1
        coro\_var \= \_get\_first\_var\_path(frame.GetValueForVariablePath("\_\_promise"), continuation\_paths)
        if coro\_var:
            curr\_idx \= \_print\_async\_bt(coro\_var, result,
                curr\_idx\=curr\_idx, start\=start, limit\=limit,
                continuation\_paths\=continuation\_paths, prefix\="\[async\]")
        frame \= frame.parent

class CoroBacktraceCommand(ParsedCommand):
    def get\_short\_help(self):
        return "Create a backtrace for C++-20 coroutines"

    def get\_flags(self):
        return lldb.eCommandRequiresFrame | lldb.eCommandProcessMustBePaused

    def setup\_command\_definition(self):
        ov\_parser \= self.get\_parser()
        ov\_parser.add\_option(
            "e",
            "continuation-expr",
            help \= (
                "Semi-colon-separated list of expressions evaluated against the promise object"
                "to get the next coroutine (e.g. \`.continuation;.coro\_parent\`)"
            ),
            value\_type \= lldb.eArgTypeNone,
            dest \= "continuation\_expr\_arg",
            default \= ".continuation",
        )
        ov\_parser.add\_option(
            "c",
            "count",
            help \= "How many frames to display (0 for all)",
            value\_type \= lldb.eArgTypeCount,
            dest \= "count\_arg",
            default \= 20,
        )
        ov\_parser.add\_option(
            "s",
            "start",
            help \= "Frame in which to start the backtrace",
            value\_type \= lldb.eArgTypeIndex,
            dest \= "frame\_index\_arg",
            default \= 0,
        )
        ov\_parser.add\_option(
            "u",
            "unfiltered",
            help \= "Do not filter out frames according to installed frame recognizers",
            value\_type \= lldb.eArgTypeBoolean,
            dest \= "unfiltered\_arg",
            default \= False,
        )
        ov\_parser.add\_argument\_set(\[
            ov\_parser.make\_argument\_element(
                lldb.eArgTypeExpression,
                repeat\="optional"
            )
        \])

    def \_\_call\_\_(self, debugger, args\_array, exe\_ctx, result):
        ov\_parser \= self.get\_parser()
        continuation\_paths \= ov\_parser.continuation\_expr\_arg.split(";")
        count \= ov\_parser.count\_arg
        if count \== 0:
            count \= 99999
        frame\_index \= ov\_parser.frame\_index\_arg
        unfiltered \= ov\_parser.unfiltered\_arg

        frame \= exe\_ctx.GetFrame()
        if not frame.IsValid():
            result.SetError("invalid frame")
            return

        if len(args\_array) \> 1:
            result.SetError("At most one expression expected")
            return
        elif len(args\_array) \== 1:
            expr \= args\_array.GetItemAtIndex(0).GetStringValue(9999)
            coro\_hdl \= frame.EvaluateExpression(expr)
            if not coro\_hdl.error.Success():
                result.AppendMessage(
                    f'error: expression failed {expr} => {coro\_hdl.error}'
                )
                result.SetError(f"Expression \`{expr}\` failed to evaluate")
                return
            \_print\_async\_bt(coro\_hdl, result,
                curr\_idx \= 0, start \= frame\_index, limit \= frame\_index + count,
                continuation\_paths \= continuation\_paths)
        else:
            \_print\_combined\_bt(frame, result, unfiltered\=unfiltered,
                curr\_idx \= 0, start \= frame\_index, limit \= frame\_index + count,
                continuation\_paths \= continuation\_paths)

class CoroInflightCommand(ParsedCommand):
    def get\_short\_help(self):
        return "Identify all in-flight coroutines"

    def get\_flags(self):
        return lldb.eCommandRequiresTarget | lldb.eCommandProcessMustBePaused

    def setup\_command\_definition(self):
        ov\_parser \= self.get\_parser()
        ov\_parser.add\_option(
            "e",
            "continuation-expr",
            help \= (
                "Semi-colon-separated list of expressions evaluated against the promise object"
                "to get the next coroutine (e.g. \`.continuation;.coro\_parent\`)"
            ),
            value\_type \= lldb.eArgTypeNone,
            dest \= "continuation\_expr\_arg",
            default \= ".continuation",
        )
        ov\_parser.add\_option(
            "c",
            "count",
            help \= "How many frames to display (0 for all)",
            value\_type \= lldb.eArgTypeCount,
            dest \= "count\_arg",
            default \= 5,
        )
        ov\_parser.add\_argument\_set(\[
            ov\_parser.make\_argument\_element(
                lldb.eArgTypeExpression,
                repeat\="plus"
            )
        \])

    def \_\_call\_\_(self, debugger, args\_array, exe\_ctx, result):
        ov\_parser \= self.get\_parser()
        continuation\_paths \= ov\_parser.continuation\_expr\_arg.split(";")
        count \= ov\_parser.count\_arg

        \# Collect all coroutine\_handles from the provided containers
        all\_coros \= \[\]
        for entry in args\_array:
            expr \= entry.GetStringValue(9999)
            if exe\_ctx.frame.IsValid():
                coro\_container \= exe\_ctx.frame.EvaluateExpression(expr)
            else:
                coro\_container \= exe\_ctx.target.EvaluateExpression(expr)
            if not coro\_container.error.Success():
                result.AppendMessage(
                    f'error: expression failed {expr} => {coro\_container.error}'
                )
                result.SetError(f"Expression \`{expr}\` failed to evaluate")
                return
            for entry in coro\_container.children:
                if "coroutine\_handle" not in entry.GetType().name:
                    result.SetError(f"Found entry of type {entry.GetType().name} in {expr},"
                                    "  expected a coroutine handle")
                    return
                all\_coros.append(entry)

        \# Remove all coroutines that are currently waiting for other coroutines to finish
        coro\_roots \= {c.GetChildMemberWithName("coro\_frame").GetValueAsAddress(): c for c in all\_coros}
        for coro\_hdl in all\_coros:
            parent\_coro \= \_get\_first\_var\_path(coro\_hdl.GetChildMemberWithName("promise"), continuation\_paths)
            parent\_addr \= parent\_coro.GetChildMemberWithName("coro\_frame").GetValueAsAddress()
            if parent\_addr in coro\_roots:
                del coro\_roots\[parent\_addr\]

        \# Print all remaining coroutines
        for addr, root\_hdl in coro\_roots.items():
            print(f"coroutine root 0x{addr:x}", file\=result)
            \_print\_async\_bt(root\_hdl, result,
                            curr\_idx\=0, start\=0, limit\=count,
                            continuation\_paths\=continuation\_paths, prefix\="    ")

def \_\_lldb\_init\_module(debugger, internal\_dict):
    debugger.HandleCommand("command container add -h 'Debugging utilities for C++20 coroutines' coro")
    debugger.HandleCommand(f"command script add -o -p -c {\_\_name\_\_}.CoroBacktraceCommand coro bt")
    debugger.HandleCommand(f"command script add -o -p -c {\_\_name\_\_}.CoroInflightCommand coro in-flight")
    print("Coro debugging utilities installed. Use \`help coro\` to see available commands.")

if \_\_name\_\_ \== '\_\_main\_\_':
    print("This script should be loaded from LLDB using \`command script import <filename>\`")

### [GDB Debugger Script](#id23)[¶](#gdb-debugger-script "Link to this heading")

For GDB, the following script provides a couple of useful commands:

*   `async-bt` to print the stack trace of a coroutine
    
*   `show-coro-frame` to print the coroutine frame, similar to LLDB’s builtin pretty-printer for coroutine frames
    

\# debugging-helper.py
import gdb
from gdb.FrameDecorator import FrameDecorator

class SymValueWrapper():
    def \_\_init\_\_(self, symbol, value):
        self.sym \= symbol
        self.val \= value

    def \_\_str\_\_(self):
        return str(self.sym) + " = " + str(self.val)

def get\_long\_pointer\_size():
    return gdb.lookup\_type('long').pointer().sizeof

def cast\_addr2long\_pointer(addr):
    return gdb.Value(addr).cast(gdb.lookup\_type('long').pointer())

def dereference(addr):
    return long(cast\_addr2long\_pointer(addr).dereference())

class CoroutineFrame(object):
    def \_\_init\_\_(self, task\_addr):
        self.frame\_addr \= task\_addr
        self.resume\_addr \= task\_addr
        self.destroy\_addr \= task\_addr + get\_long\_pointer\_size()
        self.promise\_addr \= task\_addr + get\_long\_pointer\_size() \* 2
        \# In the example, the continuation is the first field member of the promise\_type.
        \# So they have the same addresses.
        \# If we want to generalize the scripts to other coroutine types, we need to be sure
        \# the continuation field is the first member of promise\_type.
        self.continuation\_addr \= self.promise\_addr

    def next\_task\_addr(self):
        return dereference(self.continuation\_addr)

class CoroutineFrameDecorator(FrameDecorator):
    def \_\_init\_\_(self, coro\_frame):
        super(CoroutineFrameDecorator, self).\_\_init\_\_(None)
        self.coro\_frame \= coro\_frame
        self.resume\_func \= dereference(self.coro\_frame.resume\_addr)
        self.resume\_func\_block \= gdb.block\_for\_pc(self.resume\_func)
        if self.resume\_func\_block is None:
            raise Exception('Not stackless coroutine.')
        self.line\_info \= gdb.find\_pc\_line(self.resume\_func)

    def address(self):
        return self.resume\_func

    def filename(self):
        return self.line\_info.symtab.filename

    def frame\_args(self):
        return \[SymValueWrapper("frame\_addr", cast\_addr2long\_pointer(self.coro\_frame.frame\_addr)),
                SymValueWrapper("promise\_addr", cast\_addr2long\_pointer(self.coro\_frame.promise\_addr)),
                SymValueWrapper("continuation\_addr", cast\_addr2long\_pointer(self.coro\_frame.continuation\_addr))
                \]

    def function(self):
        return self.resume\_func\_block.function.print\_name

    def line(self):
        return self.line\_info.line

class StripDecorator(FrameDecorator):
    def \_\_init\_\_(self, frame):
        super(StripDecorator, self).\_\_init\_\_(frame)
        self.frame \= frame
        f \= frame.function()
        self.function\_name \= f

    def \_\_str\_\_(self, shift \= 2):
        addr \= "" if self.address() is None else '%#x' % self.address() + " in "
        location \= "" if self.filename() is None else " at " + self.filename() + ":" + str(self.line())
        return addr + self.function() + " " + str(\[str(args) for args in self.frame\_args()\]) + location

class CoroutineFilter:
    def create\_coroutine\_frames(self, task\_addr):
        frames \= \[\]
        while task\_addr != 0:
            coro\_frame \= CoroutineFrame(task\_addr)
            frames.append(CoroutineFrameDecorator(coro\_frame))
            task\_addr \= coro\_frame.next\_task\_addr()
        return frames

class AsyncStack(gdb.Command):
    def \_\_init\_\_(self):
        super(AsyncStack, self).\_\_init\_\_("async-bt", gdb.COMMAND\_USER)

    def invoke(self, arg, from\_tty):
        coroutine\_filter \= CoroutineFilter()
        argv \= gdb.string\_to\_argv(arg)
        if len(argv) \== 0:
            try:
                task \= gdb.parse\_and\_eval('\_\_coro\_frame')
                task \= int(str(task.address), 16)
            except Exception:
                print ("Can't find \_\_coro\_frame in current context.\\n" +
                      "Please use \`async-bt\` in stackless coroutine context.")
                return
        elif len(argv) != 1:
            print("usage: async-bt <pointer to task>")
            return
        else:
            task \= int(argv\[0\], 16)

        frames \= coroutine\_filter.create\_coroutine\_frames(task)
        i \= 0
        for f in frames:
            print '#'+ str(i), str(StripDecorator(f))
            i += 1
        return

AsyncStack()

class ShowCoroFrame(gdb.Command):
    def \_\_init\_\_(self):
        super(ShowCoroFrame, self).\_\_init\_\_("show-coro-frame", gdb.COMMAND\_USER)

    def invoke(self, arg, from\_tty):
        argv \= gdb.string\_to\_argv(arg)
        if len(argv) != 1:
            print("usage: show-coro-frame <address of coroutine frame>")
            return

        addr \= int(argv\[0\], 16)
        block \= gdb.block\_for\_pc(long(cast\_addr2long\_pointer(addr).dereference()))
        if block is None:
            print "block " + str(addr) + " is None."
            return

        \# Disable demangling since gdb will treat names starting with \`\_Z\`(The marker for Itanium ABI) specially.
        gdb.execute("set demangle-style none")

        coro\_frame\_type \= gdb.lookup\_type(block.function.linkage\_name + ".coro\_frame\_ty")
        coro\_frame\_ptr\_type \= coro\_frame\_type.pointer()
        coro\_frame \= gdb.Value(addr).cast(coro\_frame\_ptr\_type).dereference()

        gdb.execute("set demangle-style auto")
        gdb.write(coro\_frame.format\_string(pretty\_structs \= True))

ShowCoroFrame()

### [Further Reading](#id24)[¶](#further-reading "Link to this heading")

The authors of the Folly libraries wrote a blog post series on how they debug coroutines:

*   [Async stack traces in folly: Introduction](https://developers.facebook.com/blog/post/2021/09/16/async-stack-traces-folly-Introduction/)
    
*   [Async stack traces in folly: Synchronous and asynchronous stack traces](https://developers.facebook.com/blog/post/2021/09/23/async-stack-traces-folly-synchronous-asynchronous-stack-traces/)
    
*   [Async stack traces in folly: Forming an async stack from individual frames](https://developers.facebook.com/blog/post/2021/09/30/async-stack-traces-folly-forming-async-stack-individual-frames/)
    
*   [Async Stack Traces for C++ Coroutines in Folly: Walking the async stack](https://developers.facebook.com/blog/post/2021/10/14/async-stack-traces-c-plus-plus-coroutines-folly-walking-async-stack/)
    
*   [Async stack traces in folly: Improving debugging in the developer lifecycle](https://developers.facebook.com/blog/post/2021/10/21/async-stack-traces-folly-improving-debugging-developer-lifecycle/)
    

Besides some topics also covered here (stack traces from the debugger), Folly’s blog post series also covers additional topics, such as capturing async stack traces in performance profiles via eBPF filters and printing async stack traces on crashes.