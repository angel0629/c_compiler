---
title: "DataFlowSanitizer — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/DataFlowSanitizer.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
*   [Introduction](#introduction)
    
*   [How to build libc++ with DFSan](#how-to-build-libc-with-dfsan)
    
*   [Usage](#usage)
    
    *   [ABI List](#abi-list)
        
    *   [Compilation Flags](#compilation-flags)
        
    *   [Environment Variables](#environment-variables)
        
*   [Example](#example)
    
*   [Origin Tracking](#origin-tracking)
    
*   [Current status](#current-status)
    
*   [Design](#design)
    

[Introduction](#id2)[¶](#introduction "Link to this heading")
-------------------------------------------------------------

DataFlowSanitizer is a generalised dynamic data flow analysis.

Unlike other Sanitizer tools, this tool is not designed to detect a specific class of bugs on its own. Instead, it provides a generic dynamic data flow analysis framework to be used by clients to help detect application-specific issues within their own code.

[How to build libc++ with DFSan](#id3)[¶](#how-to-build-libc-with-dfsan "Link to this heading")
-----------------------------------------------------------------------------------------------

DFSan requires either all of your code to be instrumented or for uninstrumented functions to be listed as `uninstrumented` in the [ABI list](#abi-list).

If you’d like to have instrumented libc++ functions, then you need to build it with DFSan instrumentation from source. Here is an example of how to build libc++ and the libc++ ABI with data flow sanitizer instrumentation.

mkdir libcxx-build
cd libcxx-build

\# An example using ninja
cmake -GNinja -S <monorepo-root>/runtimes \\
  -DCMAKE\_C\_COMPILER=clang \\
  -DCMAKE\_CXX\_COMPILER=clang++ \\
  -DLLVM\_USE\_SANITIZER="DataFlow" \\
  -DLLVM\_ENABLE\_RUNTIMES="libcxx;libcxxabi"

ninja cxx cxxabi

Note: Ensure you are building with a sufficiently new version of Clang.

[Usage](#id4)[¶](#usage "Link to this heading")
-----------------------------------------------

With no program changes, applying DataFlowSanitizer to a program will not alter its behavior. To use DataFlowSanitizer, the program uses API functions to apply tags to data to cause it to be tracked, and to check the tag of a specific data item. DataFlowSanitizer manages the propagation of tags through the program according to its data flow.

The APIs are defined in the header file `sanitizer/dfsan_interface.h`. For further information about each function, please refer to the header file.

### [ABI List](#id5)[¶](#abi-list "Link to this heading")

DataFlowSanitizer uses a list of functions known as an ABI list to decide whether a call to a specific function should use the operating system’s native ABI or whether it should use a variant of this ABI that also propagates labels through function parameters and return values. The ABI list file also controls how labels are propagated in the former case. DataFlowSanitizer comes with a default ABI list which is intended to eventually cover the glibc library on Linux but it may become necessary for users to extend the ABI list in cases where a particular library or function cannot be instrumented (e.g. because it is implemented in assembly or another language which DataFlowSanitizer does not support) or a function is called from a library or function which cannot be instrumented.

DataFlowSanitizer’s ABI list file is a [Sanitizer special case list](https://clang.llvm.org/docs/SanitizerSpecialCaseList.html). The pass treats every function in the `uninstrumented` category in the ABI list file as conforming to the native ABI. Unless the ABI list contains additional categories for those functions, a call to one of those functions will produce a warning message, as the labelling behavior of the function is unknown. The other supported categories are `discard`, `functional` and `custom`.

*   `discard` – To the extent that this function writes to (user-accessible) memory, it also updates labels in shadow memory (this condition is trivially satisfied for functions which do not write to user-accessible memory). Its return value is unlabelled.
    
*   `functional` – Like `discard`, except that the label of its return value is the union of the label of its arguments.
    
*   `custom` – Instead of calling the function, a custom wrapper `__dfsw_F` is called, where `F` is the name of the function. This function may wrap the original function or provide its own implementation. This category is generally used for uninstrumentable functions which write to user-accessible memory or which have more complex label propagation behavior. The signature of `__dfsw_F` is based on that of `F` with each argument having a label of type `dfsan_label` appended to the argument list. If `F` is of non-void return type a final argument of type `dfsan_label *` is appended to which the custom function can store the label for the return value. For example:
    

void f(int x);
void \_\_dfsw\_f(int x, dfsan\_label x\_label);

void \*memcpy(void \*dest, const void \*src, size\_t n);
void \*\_\_dfsw\_memcpy(void \*dest, const void \*src, size\_t n,
                    dfsan\_label dest\_label, dfsan\_label src\_label,
                    dfsan\_label n\_label, dfsan\_label \*ret\_label);

If a function defined in the translation unit being compiled belongs to the `uninstrumented` category, it will be compiled so as to conform to the native ABI. Its arguments will be assumed to be unlabelled, but it will propagate labels in shadow memory.

For example:

\# main is called by the C runtime using the native ABI.
fun:main=uninstrumented
fun:main=discard

# malloc only writes to its internal data structures, not user-accessible memory.
fun:malloc=uninstrumented
fun:malloc=discard

# tolower is a pure function.
fun:tolower=uninstrumented
fun:tolower=functional

# memcpy needs to copy the shadow from the source to the destination region.
# This is done in a custom function.
fun:memcpy=uninstrumented
fun:memcpy=custom

For instrumented functions, the ABI list supports a `force_zero_labels` category, which will make all stores and return values set zero labels. Functions should never be labelled with both `force_zero_labels` and `uninstrumented` or any of the uninstrumented wrapper kinds.

For example:

\# e.g. void writes\_data(char\* out\_buf, int out\_buf\_len) {...}
# Applying force\_zero\_labels will force out\_buf shadow to zero.
fun:writes\_data=force\_zero\_labels

### [Compilation Flags](#id6)[¶](#compilation-flags "Link to this heading")

*   `-dfsan-abilist` – The additional ABI list files that control how shadow parameters are passed. File names are separated by comma.
    
*   `-dfsan-combine-pointer-labels-on-load` – Controls whether to include or ignore the labels of pointers in load instructions. Its default value is true. For example:
    

v \= \*p;

If the flag is true, the label of `v` is the union of the label of `p` and the label of `*p`. If the flag is false, the label of `v` is the label of just `*p`.

*   `-dfsan-combine-pointer-labels-on-store` – Controls whether to include or ignore the labels of pointers in store instructions. Its default value is false. For example:
    

\*p \= v;

If the flag is true, the label of `*p` is the union of the label of `p` and the label of `v`. If the flag is false, the label of `*p` is the label of just `v`.

*   `-dfsan-combine-offset-labels-on-gep` – Controls whether to propagate labels of offsets in GEP instructions. Its default value is true. For example:
    

p += i;

If the flag is true, the label of `p` is the union of the label of `p` and the label of `i`. If the flag is false, the label of `p` is unchanged.

*   `-dfsan-track-select-control-flow` – Controls whether to track the control flow of select instructions. Its default value is true. For example:
    

v \= b? v1: v2;

If the flag is true, the label of `v` is the union of the labels of `b`, `v1` and `v2`. If the flag is false, the label of `v` is the union of the labels of just `v1` and `v2`.

*   `-dfsan-event-callbacks` – An experimental feature that inserts callbacks for certain data events. Currently callbacks are only inserted for loads, stores, memory transfers (i.e. memcpy and memmove), and comparisons. Its default value is false. If this flag is set to true, a user must provide definitions for the following callback functions:
    

void \_\_dfsan\_load\_callback(dfsan\_label Label, void\* Addr);
void \_\_dfsan\_store\_callback(dfsan\_label Label, void\* Addr);
void \_\_dfsan\_mem\_transfer\_callback(dfsan\_label \*Start, size\_t Len);
void \_\_dfsan\_cmp\_callback(dfsan\_label CombinedLabel);

*   `-dfsan-conditional-callbacks` – An experimental feature that inserts callbacks for control flow conditional expressions. This can be used to find where tainted values can control execution.
    
    In addition to this compilation flag, a callback handler must be registered using `dfsan_set_conditional_callback(my_callback);`, where my\_callback is a function with a signature matching `void my_callback(dfsan_label l, dfsan_origin o);`. This signature is the same when origin tracking is disabled - in this case the dfsan\_origin passed in it will always be 0.
    
    The callback will only be called when a tainted value reaches a conditional expression for control flow (such as an if’s condition). The callback will be skipped for conditional expressions inside signal handlers, as this is prone to deadlock. Tainted values used in conditional expressions inside signal handlers will instead be aggregated via bitwise or, and can be accessed using `dfsan_label dfsan_get_labels_in_signal_conditional();`.
    
*   `-dfsan-reaches-function-callbacks` – An experimental feature that inserts callbacks for data entering a function.
    
    In addition to this compilation flag, a callback handler must be registered using `dfsan_set_reaches_function_callback(my_callback);`, where my\_callback is a function with a signature matching `void my_callback(dfsan_label label, dfsan_origin origin, const char *file, unsigned int line, const char *function);` This signature is the same when origin tracking is disabled - in this case the dfsan\_origin passed in it will always be 0.
    
    The callback will be called when a tained value reach stack/registers in the context of a function. Tainted values can reach a function: \* via the arguments of the function \* via the return value of a call that occurs in the function \* via the loaded value of a load that occurs in the function
    
    The callback will be skipped for conditional expressions inside signal handlers, as this is prone to deadlock. Tainted values reaching functions inside signal handlers will instead be aggregated via bitwise or, and can be accessed using `dfsan_label dfsan_get_labels_in_signal_reaches_function()`.
    
*   `-dfsan-track-origins` – Controls how to track origins. When its value is 0, the runtime does not track origins. When its value is 1, the runtime tracks origins at memory store operations. When its value is 2, the runtime tracks origins at memory load and store operations. Its default value is 0.
    
*   `-dfsan-instrument-with-call-threshold` – If a function being instrumented requires more than this number of origin stores, use callbacks instead of inline checks (-1 means never use callbacks). Its default value is 3500.
    

### [Environment Variables](#id7)[¶](#environment-variables "Link to this heading")

*   `warn_unimplemented` – Whether to warn on unimplemented functions. Its default value is false.
    
*   `strict_data_dependencies` – Whether to propagate labels only when there is explicit obvious data dependency (e.g., when comparing strings, ignore the fact that the output of the comparison might be implicit data-dependent on the content of the strings). This applies only to functions with `custom` category in ABI list. Its default value is true.
    
*   `origin_history_size` – The limit of origin chain length. Non-positive values mean unlimited. Its default value is 16.
    
*   `origin_history_per_stack_limit` – The limit of origin node’s references count. Non-positive values mean unlimited. Its default value is 20000.
    
*   `store_context_size` – The depth limit of origin tracking stack traces. Its default value is 20.
    
*   `zero_in_malloc` – Whether to zero shadow space of new allocated memory. Its default value is true.
    
*   `zero_in_free` — Whether to zero shadow space of deallocated memory. Its default value is true.
    

[Example](#id8)[¶](#example "Link to this heading")
---------------------------------------------------

DataFlowSanitizer supports up to 8 labels, to achieve low CPU and code size overhead. Base labels are simply 8-bit unsigned integers that are powers of 2 (i.e. 1, 2, 4, 8, …, 128), and union labels are created by ORing base labels.

The following program demonstrates label propagation by checking that the correct labels are propagated.

#include <sanitizer/dfsan\_interface.h>
#include <assert.h>

int main(void) {
  int i \= 100;
  int j \= 200;
  int k \= 300;
  dfsan\_label i\_label \= 1;
  dfsan\_label j\_label \= 2;
  dfsan\_label k\_label \= 4;
  dfsan\_set\_label(i\_label, &i, sizeof(i));
  dfsan\_set\_label(j\_label, &j, sizeof(j));
  dfsan\_set\_label(k\_label, &k, sizeof(k));

  dfsan\_label ij\_label \= dfsan\_get\_label(i + j);

  assert(ij\_label & i\_label);  // ij\_label has i\_label
  assert(ij\_label & j\_label);  // ij\_label has j\_label
  assert(!(ij\_label & k\_label));  // ij\_label doesn't have k\_label
  assert(ij\_label \== 3);  // Verifies all of the above

  // Or, equivalently:
  assert(dfsan\_has\_label(ij\_label, i\_label));
  assert(dfsan\_has\_label(ij\_label, j\_label));
  assert(!dfsan\_has\_label(ij\_label, k\_label));

  dfsan\_label ijk\_label \= dfsan\_get\_label(i + j + k);

  assert(ijk\_label & i\_label);  // ijk\_label has i\_label
  assert(ijk\_label & j\_label);  // ijk\_label has j\_label
  assert(ijk\_label & k\_label);  // ijk\_label has k\_label
  assert(ijk\_label \== 7);  // Verifies all of the above

  // Or, equivalently:
  assert(dfsan\_has\_label(ijk\_label, i\_label));
  assert(dfsan\_has\_label(ijk\_label, j\_label));
  assert(dfsan\_has\_label(ijk\_label, k\_label));

  return 0;
}

[Origin Tracking](#id9)[¶](#origin-tracking "Link to this heading")
-------------------------------------------------------------------

DataFlowSanitizer can track origins of labeled values. This feature is enabled by `-mllvm -dfsan-track-origins=1`. For example,

% cat test.cc
#include <sanitizer/dfsan\_interface.h>
#include <stdio.h>

int main(int argc, char\*\* argv) {
  int i = 0;
  dfsan\_set\_label(i\_label, &i, sizeof(i));
  int j = i + 1;
  dfsan\_print\_origin\_trace(&j, "A flow from i to j");
  return 0;
}

% clang++ \-fsanitize\=dataflow \-mllvm \-dfsan-track-origins\=1 \-fno-omit-frame-pointer \-g \-O2 test.cc
% ./a.out
Taint value 0x1 (at 0x7ffd42bf415c) origin tracking (A flow from i to j)
Origin value: 0x13900001, Taint value was stored to memory at
  #0 0x55676db85a62 in main test.cc:7:7
  #1 0x7f0083611bbc in \_\_libc\_start\_main libc-start.c:285

Origin value: 0x9e00001, Taint value was created at
  #0 0x55676db85a08 in main test.cc:6:3
  #1 0x7f0083611bbc in \_\_libc\_start\_main libc-start.c:285

By `-mllvm -dfsan-track-origins=1` DataFlowSanitizer collects only intermediate stores a labeled value went through. Origin tracking slows down program execution by a factor of 2x on top of the usual DataFlowSanitizer slowdown and increases memory overhead by 1x. By `-mllvm -dfsan-track-origins=2` DataFlowSanitizer also collects intermediate loads a labeled value went through. This mode slows down program execution by a factor of 4x.

[Current status](#id10)[¶](#current-status "Link to this heading")
------------------------------------------------------------------

DataFlowSanitizer is a work in progress, currently under development for x86\_64 Linux.

[Design](#id11)[¶](#design "Link to this heading")
--------------------------------------------------

Please refer to the [design document](https://clang.llvm.org/docs/DataFlowSanitizerDesign.html).