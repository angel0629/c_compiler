---
title: "RealtimeSanitizer — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/RealtimeSanitizer.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
*   [Introduction](#introduction)
    
*   [How to build](#how-to-build)
    
*   [Usage](#usage)
    
    *   [Blocking functions](#blocking-functions)
        
    *   [Run-time flags](#run-time-flags)
        
    *   [Additional customization](#additional-customization)
        
    *   [Disabling and suppressing](#disabling-and-suppressing)
        
        *   [`ScopedDisabler`](#scopeddisabler)
            
        *   [Suppression file](#suppression-file)
            
    *   [Compile-time sanitizer detection](#compile-time-sanitizer-detection)
        

[Introduction](#id4)[¶](#introduction "Link to this heading")
-------------------------------------------------------------

RealtimeSanitizer (a.k.a. RTSan) is a real-time safety testing tool for C and C++ projects. RTSan can be used to detect real-time violations, i.e. calls to methods that are not safe for use in functions with deterministic run time requirements. RTSan considers any function marked with the `[[clang::nonblocking]]` attribute to be a real-time function. At run-time, if RTSan detects a call to `malloc`, `free`, `pthread_mutex_lock`, or anything else known to have a non-deterministic execution time in a function marked `[[clang::nonblocking]]` it raises an error.

RTSan performs its analysis at run-time but shares the `[[clang::nonblocking]]` attribute with the [Function Effect Analysis](https://clang.llvm.org/docs/FunctionEffectAnalysis.html) system, which operates at compile-time to detect potential real-time safety violations. For comprehensive detection of real-time safety issues, it is recommended to use both systems together.

The runtime slowdown introduced by RealtimeSanitizer is negligible.

[How to build](#id5)[¶](#how-to-build "Link to this heading")
-------------------------------------------------------------

Build LLVM/Clang with [CMake](https://llvm.org/docs/CMake.html) and enable the `compiler-rt` runtime. An example CMake configuration that will allow for the use/testing of RealtimeSanitizer:

$ cmake \-DCMAKE\_BUILD\_TYPE\=Release \-DLLVM\_ENABLE\_PROJECTS\="clang" \-DLLVM\_ENABLE\_RUNTIMES\="compiler-rt" <path to source>/llvm

[Usage](#id6)[¶](#usage "Link to this heading")
-----------------------------------------------

There are two requirements:

1.  The code must be compiled with the `-fsanitize=realtime` flag.
    
2.  Functions that are subject to real-time constraints must be marked with the `[[clang::nonblocking]]` attribute.
    

Typically, these attributes should be added onto the functions that are entry points for threads with real-time priority. These threads are subject to a fixed callback time, such as audio callback threads or rendering loops in video game code.

% cat example\_realtime\_violation.cpp
#include <vector>

void violation() \[\[clang::nonblocking\]\]{
  std::vector<float> v;
  v.resize(100);
}

int main() {
  violation();
  return 0;
}
\# Compile and link
% clang++ \-fsanitize\=realtime example\_realtime\_violation.cpp

If a real-time safety violation is detected in a `[[clang::nonblocking]]` context, or any function invoked by that function, the program will exit with a non-zero exit code.

% clang++ \-fsanitize\=realtime example\_realtime\_violation.cpp
% ./a.out
\==76290==ERROR: RealtimeSanitizer: unsafe-library-call
Intercepted call to real-time unsafe function \`malloc\` in real-time context!
    #0 0x000102a7b884 in malloc rtsan\_interceptors.cpp:426
    #1 0x00019c326bd0 in operator new(unsigned long)+0x1c (libc++abi.dylib:arm64+0x16bd0)
    #2 0xa30d0001024f79a8  (<unknown module>)
    #3 0x0001024f794c in std::\_\_1::\_\_libcpp\_allocate\[abi:ne200000\](unsigned long, unsigned long)+0x44
    #4 0x0001024f78c4 in std::\_\_1::allocator<float>::allocate\[abi:ne200000\](unsigned long)+0x44
    ... snip ...
    #9 0x0001024f6868 in std::\_\_1::vector<float, std::\_\_1::allocator<float>>::resize(unsigned long)+0x48
    #10 0x0001024f67b4 in violation()+0x24
    #11 0x0001024f68f0 in main+0x18 (a.out:arm64+0x1000028f0)
    #12 0x00019bfe3150  (<unknown module>)
    #13 0xed5efffffffffffc  (<unknown module>)

### [Blocking functions](#id7)[¶](#blocking-functions "Link to this heading")

Calls to system library functions such as `malloc` are automatically caught by RealtimeSanitizer. Real-time programmers may also write their own blocking (real-time unsafe) functions that they wish RealtimeSanitizer to be aware of. RealtimeSanitizer will raise an error at run time if any function attributed with `[[clang::blocking]]` is called in a `[[clang::nonblocking]]` context.

$ cat example\_blocking\_violation.cpp
#include <atomic>
#include <thread>

std::atomic<bool> has\_permission{false};

int wait\_for\_permission() \[\[clang::blocking\]\] {
  while (has\_permission.load() == false)
    std::this\_thread::yield();
  return 0;
}

int real\_time\_function() \[\[clang::nonblocking\]\] {
  return wait\_for\_permission();
}

int main() {
  return real\_time\_function();
}

$ clang++ \-fsanitize\=realtime example\_blocking\_violation.cpp && ./a.out
\==76131==ERROR: RealtimeSanitizer: blocking-call
Call to blocking function \`wait\_for\_permission()\` in real-time context!
    #0 0x0001000c3db0 in wait\_for\_permission()+0x10 (a.out:arm64+0x100003db0)
    #1 0x0001000c3e3c in real\_time\_function()+0x10 (a.out:arm64+0x100003e3c)
    #2 0x0001000c3e68 in main+0x10 (a.out:arm64+0x100003e68)
    #3 0x00019bfe3150  (<unknown module>)
    #4 0x5a27fffffffffffc  (<unknown module>)

### [Run-time flags](#id8)[¶](#run-time-flags "Link to this heading")

RealtimeSanitizer supports a number of run-time flags, which can be specified in the `RTSAN_OPTIONS` environment variable:

% RTSAN\_OPTIONS\=option\_1\=true:path\_option\_2\="/some/file.txt" ./a.out
...

Or at compile-time by providing the symbol `__rtsan_default_options`:

\_\_attribute\_\_((\_\_visibility\_\_("default")))
extern "C" const char \*\_\_rtsan\_default\_options() {
  return "symbolize=false:abort\_on\_error=0:log\_to\_syslog=0";
}

You can see all sanitizer options (some of which are unsupported) by using the `help` flag:

% RTSAN\_OPTIONS\=help\=true ./a.out

A **partial** list of flags RealtimeSanitizer respects:

Run-time Flags[¶](#id2 "Link to this table")    

Flag name

Default value

Type

Short description

`halt_on_error`

`true`

boolean

Exit after first reported error.

`suppress_equal_stacks`

`true`

boolean

If true, suppress duplicate reports (i.e. only print each unique error once). Only particularly useful when `halt_on_error=false`.

`print_stats_on_exit`

`false`

boolean

Print stats on exit. Includes total and unique errors.

`color`

`"auto"`

string

Colorize reports: (always|never|auto).

`fast_unwind_on_fatal`

`false`

boolean

If available, use the fast frame-pointer-based unwinder on detected errors. If true, ensure the code under test has been compiled with frame pointers with `-fno-omit-frame-pointers` or similar.

`abort_on_error`

OS dependent

boolean

If true, the tool calls `abort()` instead of `_exit()` after printing the error report. On some OSes (MacOS, for example) this is beneficial because a better stack trace is emitted on crash.

`symbolize`

`true`

boolean

If set, use the symbolizer to turn virtual addresses to file/line locations. If false, can greatly speed up the error reporting.

`suppressions`

`""`

path

If set to a valid suppressions file, will suppress issue reporting. See details in [Disabling and Suppressing](#id1).

`verify_interceptors`

`true`

boolean

If true, verifies interceptors are working at initialization. The program will abort with error `==ERROR: Interceptors are not working. This may be because RealtimeSanitizer is loaded too late (e.g. via dlopen)` if an issue is detected.

Some issues with flags can be debugged using the `verbosity=$NUM` flag:

% RTSAN\_OPTIONS\=verbosity\=1:misspelled\_flag\=true ./a.out
WARNING: found 1 unrecognized flag(s):
misspelled\_flag
...

### [Additional customization](#id9)[¶](#additional-customization "Link to this heading")

In addition to `__rtsan_default_options` outlined above, you can provide definitions of other functions that affect how RTSan operates.

To be notified on every error reported by RTsan, provide a definition of `__sanitizer_report_error_summary`.

extern "C" void \_\_sanitizer\_report\_error\_summary(const char \*error\_summary) {
   fprintf(stderr, "%s %s\\n", "In custom handler! ", error\_summary);
   /\* do other custom things \*/
}

The error summary will be of the form:

SUMMARY: RealtimeSanitizer: unsafe-library-call main.cpp:8 in process(std::\_\_1::vector<int, std::\_\_1::allocator<int>>&)

To register a callback which will be invoked before a RTSan kills the process:

extern "C" void \_\_sanitizer\_set\_death\_callback(void (\*callback)(void));

void custom\_on\_die\_callback() {
  fprintf(stderr, "In custom handler!")
  /\* do other custom things \*/
}

int main()
{
  \_\_sanitizer\_set\_death\_callback(custom\_on\_die\_callback);
  ...
}

### [Disabling and suppressing](#id10)[¶](#disabling-and-suppressing "Link to this heading")

There are multiple ways to disable error reporting when using RealtimeSanitizer.

In general, `ScopedDisabler` should be preferred, as it is the most performant.

Suppression methods[¶](#id3 "Link to this table")     

Method

Specified at?

Scope

Run-time cost

Description

`ScopedDisabler`

Compile-time

Stack

Very low

Violations are ignored for the lifetime of the `ScopedDisabler` object.

`function-name-matches` suppression

Run-time

Single function

Medium

Suppresses intercepted and `[[clang::blocking]]` function calls by name.

`call-stack-contains` suppression

Run-time

Stack

High

Suppresses any stack trace containing the specified pattern.

#### [`ScopedDisabler`](#id11)[¶](#scopeddisabler "Link to this heading")

At compile time, RealtimeSanitizer may be disabled using `__rtsan::ScopedDisabler`. RTSan ignores any errors originating within the `ScopedDisabler` instance variable scope.

#include <sanitizer/rtsan\_interface.h>

void process(const std::vector<float\>& buffer) \[\[clang::nonblocking\]\] {
    {
        \_\_rtsan::ScopedDisabler d;
        ...
    }
}

If RealtimeSanitizer is not enabled at compile time (i.e., the code is not compiled with the `-fsanitize=realtime` flag), the `ScopedDisabler` is compiled as a no-op.

In C, you can use the `__rtsan_disable()` and `rtsan_enable()` functions to manually disable and re-enable RealtimeSanitizer checks.

#include <sanitizer/rtsan\_interface.h>

int process(const float\* buffer) \[\[clang::nonblocking\]\]
{
    {
        \_\_rtsan\_disable();

        ...

        \_\_rtsan\_enable();
    }
}

Each call to `__rtsan_disable()` must be paired with a subsequent call to `__rtsan_enable()` to restore normal sanitizer functionality. If a corresponding `rtsan_enable()` call is not made, the behavior is undefined.

#### [Suppression file](#id12)[¶](#suppression-file "Link to this heading")

At run-time, suppressions may be specified using a suppressions file passed in `RTSAN_OPTIONS`. Run-time suppression may be useful if the source cannot be changed.

\> cat suppressions.supp
call-stack-contains:MallocViolation
call-stack-contains:std::\*vector
function-name-matches:free
function-name-matches:CustomMarkedBlocking\*
\> RTSAN\_OPTIONS="suppressions=suppressions.supp" ./a.out
...

Suppressions specified in this file are one of two flavors.

`function-name-matches` suppresses reporting of any intercepted library call, or function marked `[[clang::blocking]]` by name. If, for instance, you know that `malloc` is real-time safe on your system, you can disable the check for it via `function-name-matches:malloc`.

`call-stack-contains` suppresses reporting of errors in any stack that contains a string matching the pattern specified. For example, suppressing error reporting of any non-real-time-safe behavior in `std::vector` may be specified `call-stack-contains:std::*vector`. You must include symbols in your build for this method to be effective, unsymbolicated stack traces cannot be matched. `call-stack-contains` has the highest run-time cost of any method of suppression.

Patterns may be exact matches or are “regex-light” patterns, containing special characters such as `^$*`.

The number of potential errors suppressed via this method may be seen on exit when using the `print_stats_on_exit` flag.

### [Compile-time sanitizer detection](#id13)[¶](#compile-time-sanitizer-detection "Link to this heading")

Clang provides the pre-processor macro `__has_feature` which may be used to detect if RealtimeSanitizer is enabled at compile-time.

#if defined(\_\_has\_feature) && \_\_has\_feature(realtime\_sanitizer)
...
#endif