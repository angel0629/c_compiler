---
title: "SanitizerCoverage — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/SanitizerCoverage.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
*   [Introduction](#introduction)
    
*   [Tracing PCs with guards](#tracing-pcs-with-guards)
    
*   [Inline 8bit-counters](#inline-8bit-counters)
    
*   [Inline bool-flag](#inline-bool-flag)
    
*   [PC-Table](#pc-table)
    
*   [Tracing PCs](#tracing-pcs)
    
*   [Instrumentation points](#instrumentation-points)
    
    *   [Edge coverage](#edge-coverage)
        
*   [Tracing data flow](#tracing-data-flow)
    
*   [Tracing control flow](#tracing-control-flow)
    
*   [Tracing Stack Depth](#tracing-stack-depth)
    
*   [Gated Trace Callbacks](#gated-trace-callbacks)
    
*   [Disabling instrumentation with `__attribute__((no_sanitize("coverage")))`](#disabling-instrumentation-with-attribute-no-sanitize-coverage)
    
*   [Disabling instrumentation without source modification](#disabling-instrumentation-without-source-modification)
    
*   [Default implementation](#default-implementation)
    
    *   [Sancov data format](#sancov-data-format)
        
    *   [Sancov Tool](#sancov-tool)
        
    *   [Coverage Reports](#coverage-reports)
        
    *   [Output directory](#output-directory)
        

[Introduction](#id1)[¶](#introduction "Link to this heading")
-------------------------------------------------------------

LLVM has a simple code coverage instrumentation built in (SanitizerCoverage). It inserts calls to user-defined functions on function-, basic-block-, and edge- levels. Default implementations of those callbacks are provided and implement simple coverage reporting and visualization, however if you need _just_ coverage visualization you may want to use [SourceBasedCodeCoverage](https://clang.llvm.org/docs/SourceBasedCodeCoverage.html) instead.

[Tracing PCs with guards](#id2)[¶](#tracing-pcs-with-guards "Link to this heading")
-----------------------------------------------------------------------------------

With `-fsanitize-coverage=trace-pc-guard` the compiler will insert the following code on every edge:

\_\_sanitizer\_cov\_trace\_pc\_guard(&guard\_variable)

Every edge will have its own guard\_variable (uint32\_t).

The compiler will also insert calls to a module constructor:

// The guards are \[start, stop).
// This function will be called at least once per DSO and may be called
// more than once with the same values of start/stop.
\_\_sanitizer\_cov\_trace\_pc\_guard\_init(uint32\_t \*start, uint32\_t \*stop);

With an additional `...=trace-pc,indirect-calls` flag `__sanitizer_cov_trace_pc_indirect(void *callee)` will be inserted on every indirect call.

The functions \_\_sanitizer\_cov\_trace\_pc\_\* should be defined by the user.

Example:

// trace-pc-guard-cb.cc
#include <stdint.h>
#include <stdio.h>
#include <sanitizer/coverage\_interface.h>

// This callback is inserted by the compiler as a module constructor
// into every DSO. 'start' and 'stop' correspond to the
// beginning and end of the section with the guards for the entire
// binary (executable or DSO). The callback will be called at least
// once per DSO and may be called multiple times with the same parameters.
extern "C" void \_\_sanitizer\_cov\_trace\_pc\_guard\_init(uint32\_t \*start,
                                                    uint32\_t \*stop) {
  static uint64\_t N;  // Counter for the guards.
  if (start \== stop || \*start) return;  // Initialize only once.
  printf("INIT: %p %p\\n", start, stop);
  for (uint32\_t \*x \= start; x < stop; x++)
    \*x \= ++N;  // Guards should start from 1.
}

// This callback is inserted by the compiler on every edge in the
// control flow (some optimizations apply).
// Typically, the compiler will emit the code like this:
//    if(\*guard)
//      \_\_sanitizer\_cov\_trace\_pc\_guard(guard);
// But for large functions it will emit a simple call:
//    \_\_sanitizer\_cov\_trace\_pc\_guard(guard);
extern "C" void \_\_sanitizer\_cov\_trace\_pc\_guard(uint32\_t \*guard) {
  if (!\*guard) return;  // Duplicate the guard check.
  // If you set \*guard to 0 this code will not be called again for this edge.
  // Now you can get the PC and do whatever you want:
  //   store it somewhere or symbolize it and print right away.
  // The values of \`\*guard\` are as you set them in
  // \_\_sanitizer\_cov\_trace\_pc\_guard\_init and so you can make them consecutive
  // and use them to dereference an array or a bit vector.
  void \*PC \= \_\_builtin\_return\_address(0);
  char PcDescr\[1024\];
  // This function is a part of the sanitizer run-time.
  // To use it, link with AddressSanitizer or other sanitizer.
  \_\_sanitizer\_symbolize\_pc(PC, "%p %F %L", PcDescr, sizeof(PcDescr));
  printf("guard: %p %x PC %s\\n", guard, \*guard, PcDescr);
}

// trace-pc-guard-example.cc
void foo() { }
int main(int argc, char \*\*argv) {
  if (argc \> 1) foo();
}

clang++ -g  -fsanitize-coverage=trace-pc-guard trace-pc-guard-example.cc -c
clang++ trace-pc-guard-cb.cc trace-pc-guard-example.o -fsanitize=address
ASAN\_OPTIONS=strip\_path\_prefix=\`pwd\`/ ./a.out

INIT: 0x71bcd0 0x71bce0
guard: 0x71bcd4 2 PC 0x4ecd5b in main trace-pc-guard-example.cc:2
guard: 0x71bcd8 3 PC 0x4ecd9e in main trace-pc-guard-example.cc:3:7

ASAN\_OPTIONS=strip\_path\_prefix=\`pwd\`/ ./a.out with-foo

INIT: 0x71bcd0 0x71bce0
guard: 0x71bcd4 2 PC 0x4ecd5b in main trace-pc-guard-example.cc:3
guard: 0x71bcdc 4 PC 0x4ecdc7 in main trace-pc-guard-example.cc:4:17
guard: 0x71bcd0 1 PC 0x4ecd20 in foo() trace-pc-guard-example.cc:2:14

[Inline 8bit-counters](#id3)[¶](#inline-8bit-counters "Link to this heading")
-----------------------------------------------------------------------------

**Experimental, may change or disappear in future**

With `-fsanitize-coverage=inline-8bit-counters` the compiler will insert inline counter increments on every edge. This is similar to `-fsanitize-coverage=trace-pc-guard` but instead of a callback the instrumentation simply increments a counter.

Users need to implement a single function to capture the counters at startup.

extern "C"
void \_\_sanitizer\_cov\_8bit\_counters\_init(char \*start, char \*end) {
  // \[start,end) is the array of 8-bit counters created for the current DSO.
  // Capture this array in order to read/modify the counters.
}

[Inline bool-flag](#id4)[¶](#inline-bool-flag "Link to this heading")
---------------------------------------------------------------------

**Experimental, may change or disappear in future**

With `-fsanitize-coverage=inline-bool-flag` the compiler will insert setting an inline boolean to true on every edge. This is similar to `-fsanitize-coverage=inline-8bit-counter` but instead of an increment of a counter, it just sets a boolean to true.

Users need to implement a single function to capture the flags at startup.

extern "C"
void \_\_sanitizer\_cov\_bool\_flag\_init(bool \*start, bool \*end) {
  // \[start,end) is the array of boolean flags created for the current DSO.
  // Capture this array in order to read/modify the flags.
}

[PC-Table](#id5)[¶](#pc-table "Link to this heading")
-----------------------------------------------------

**Experimental, may change or disappear in future**

**Note:** this instrumentation might be incompatible with dead code stripping (`-Wl,-gc-sections`) for linkers other than LLD, thus resulting in a significant binary size overhead. For more information, see [Bug 34636](https://bugs.llvm.org/show_bug.cgi?id=34636).

With `-fsanitize-coverage=pc-table` the compiler will create a table of instrumented PCs. Requires either `-fsanitize-coverage=inline-8bit-counters`, or `-fsanitize-coverage=inline-bool-flag`, or `-fsanitize-coverage=trace-pc-guard`.

Users need to implement a single function to capture the PC table at startup:

extern "C"
void \_\_sanitizer\_cov\_pcs\_init(const uintptr\_t \*pcs\_beg,
                              const uintptr\_t \*pcs\_end) {
  // \[pcs\_beg,pcs\_end) is the array of ptr-sized integers representing
  // pairs \[PC,PCFlags\] for every instrumented block in the current DSO.
  // Capture this array in order to read the PCs and their Flags.
  // The number of PCs and PCFlags for a given DSO is the same as the number
  // of 8-bit counters (-fsanitize-coverage=inline-8bit-counters), or
  // boolean flags (-fsanitize-coverage=inline=bool-flags), or trace\_pc\_guard
  // callbacks (-fsanitize-coverage=trace-pc-guard).
  // A PCFlags describes the basic block:
  //  \* bit0: 1 if the block is the function entry block, 0 otherwise.
}

[Tracing PCs](#id6)[¶](#tracing-pcs "Link to this heading")
-----------------------------------------------------------

With `-fsanitize-coverage=trace-pc` the compiler will insert `__sanitizer_cov_trace_pc()` on every edge. With an additional `...=trace-pc,indirect-calls` flag `__sanitizer_cov_trace_pc_indirect(void *callee)` will be inserted on every indirect call. These callbacks are not implemented in the Sanitizer run-time and should be defined by the user. This mechanism is used for fuzzing the Linux kernel ([https://github.com/google/syzkaller](https://github.com/google/syzkaller)).

[Instrumentation points](#id7)[¶](#instrumentation-points "Link to this heading")
---------------------------------------------------------------------------------

Sanitizer Coverage offers different levels of instrumentation.

*   `edge` (default): edges are instrumented (see below).
    
*   `bb`: basic blocks are instrumented.
    
*   `func`: only the entry block of every function will be instrumented.
    

Use these flags together with `trace-pc-guard` or `trace-pc`, like this: `-fsanitize-coverage=func,trace-pc-guard`.

When `edge` or `bb` is used, some of the edges/blocks may still be left uninstrumented (pruned) if such instrumentation is considered redundant. Use `no-prune` (e.g. `-fsanitize-coverage=bb,no-prune,trace-pc-guard`) to disable pruning. This could be useful for better coverage visualization.

### [Edge coverage](#id8)[¶](#edge-coverage "Link to this heading")

Consider this code:

void foo(int \*a) {
  if (a)
    \*a \= 0;
}

It contains 3 basic blocks, let’s name them A, B, C:

A
|\\
| \\
|  B
| /
|/
C

If blocks A, B, and C are all covered we know for certain that the edges A=>B and B=>C were executed, but we still don’t know if the edge A=>C was executed. Such edges of control flow graph are called [critical](https://en.wikipedia.org/wiki/Control_flow_graph#Special_edges). The edge-level coverage simply splits all critical edges by introducing new dummy blocks and then instruments those blocks:

A
|\\
| \\
D  B
| /
|/
C

[Tracing data flow](#id9)[¶](#tracing-data-flow "Link to this heading")
-----------------------------------------------------------------------

Support for data-flow-guided fuzzing. With `-fsanitize-coverage=trace-cmp` the compiler will insert extra instrumentation around comparison instructions and switch statements. Similarly, with `-fsanitize-coverage=trace-div` the compiler will instrument integer division instructions (to capture the right argument of division) and with `-fsanitize-coverage=trace-gep` – the [LLVM GEP instructions](https://llvm.org/docs/GetElementPtr.html) (to capture array indices). Similarly, with `-fsanitize-coverage=trace-loads` and `-fsanitize-coverage=trace-stores` the compiler will instrument loads and stores, respectively.

Currently, these flags do not work by themselves - they require one of `-fsanitize-coverage={trace-pc,inline-8bit-counters,inline-bool}` flags to work.

Unless `no-prune` option is provided, some of the comparison instructions will not be instrumented.

// Called before a comparison instruction.
// Arg1 and Arg2 are arguments of the comparison.
void \_\_sanitizer\_cov\_trace\_cmp1(uint8\_t Arg1, uint8\_t Arg2);
void \_\_sanitizer\_cov\_trace\_cmp2(uint16\_t Arg1, uint16\_t Arg2);
void \_\_sanitizer\_cov\_trace\_cmp4(uint32\_t Arg1, uint32\_t Arg2);
void \_\_sanitizer\_cov\_trace\_cmp8(uint64\_t Arg1, uint64\_t Arg2);

// Called before a comparison instruction if exactly one of the arguments is constant.
// Arg1 and Arg2 are arguments of the comparison, Arg1 is a compile-time constant.
// These callbacks are emitted by -fsanitize-coverage=trace-cmp since 2017-08-11
void \_\_sanitizer\_cov\_trace\_const\_cmp1(uint8\_t Arg1, uint8\_t Arg2);
void \_\_sanitizer\_cov\_trace\_const\_cmp2(uint16\_t Arg1, uint16\_t Arg2);
void \_\_sanitizer\_cov\_trace\_const\_cmp4(uint32\_t Arg1, uint32\_t Arg2);
void \_\_sanitizer\_cov\_trace\_const\_cmp8(uint64\_t Arg1, uint64\_t Arg2);

// Called before a switch statement.
// Val is the switch operand.
// Cases\[0\] is the number of case constants.
// Cases\[1\] is the size of Val in bits.
// Cases\[2:\] are the case constants.
void \_\_sanitizer\_cov\_trace\_switch(uint64\_t Val, uint64\_t \*Cases);

// Called before a division statement.
// Val is the second argument of division.
void \_\_sanitizer\_cov\_trace\_div4(uint32\_t Val);
void \_\_sanitizer\_cov\_trace\_div8(uint64\_t Val);

// Called before a GetElementPtr (GEP) instruction
// for every non-constant array index.
void \_\_sanitizer\_cov\_trace\_gep(uintptr\_t Idx);

// Called before a load of appropriate size. Addr is the address of the load.
void \_\_sanitizer\_cov\_load1(uint8\_t \*addr);
void \_\_sanitizer\_cov\_load2(uint16\_t \*addr);
void \_\_sanitizer\_cov\_load4(uint32\_t \*addr);
void \_\_sanitizer\_cov\_load8(uint64\_t \*addr);
void \_\_sanitizer\_cov\_load16(\_\_int128 \*addr);
// Called before a store of appropriate size. Addr is the address of the store.
void \_\_sanitizer\_cov\_store1(uint8\_t \*addr);
void \_\_sanitizer\_cov\_store2(uint16\_t \*addr);
void \_\_sanitizer\_cov\_store4(uint32\_t \*addr);
void \_\_sanitizer\_cov\_store8(uint64\_t \*addr);
void \_\_sanitizer\_cov\_store16(\_\_int128 \*addr);

[Tracing control flow](#id10)[¶](#tracing-control-flow "Link to this heading")
------------------------------------------------------------------------------

With `-fsanitize-coverage=control-flow` the compiler will create a table to collect control flow for each function. More specifically, for each basic block in the function, two lists are populated. One list for successors of the basic block and another list for non-intrinsic called functions.

**TODO:** in the current implementation, indirect calls are not tracked and are only marked with special value (-1) in the list.

Each table row consists of the basic block address followed by `null`\-ended lists of successors and callees. The table is encoded in a special section named `sancov_cfs`

Example:

int foo (int x) {
  if (x \> 0)
    bar(x);
  else
    x \= 0;
  return x;
}

The code above contains 4 basic blocks, let’s name them A, B, C, D:

A
|\\
| \\
B  C
| /
|/
D

The collected control flow table is as follows: `A, B, C, null, null, B, D, null, @bar, null, C, D, null, null, D, null, null.`

Users need to implement a single function to capture the CF table at startup:

extern "C"
void \_\_sanitizer\_cov\_cfs\_init(const uintptr\_t \*cfs\_beg,
                              const uintptr\_t \*cfs\_end) {
  // \[cfs\_beg,cfs\_end) is the array of ptr-sized integers representing
  // the collected control flow.
}

[Tracing Stack Depth](#id11)[¶](#tracing-stack-depth "Link to this heading")
----------------------------------------------------------------------------

With `-fsanitize-coverage=stack-depth` the compiler will track how much stack space has been used for a function call chain. Leaf functions are not included in this tracing.

The maximum depth of a function call graph is stored in the thread-local `__sancov_lowest_stack` variable. Instrumentation is inserted in every non-leaf function to check the frame pointer against this variable, and if it is lower, store the current frame pointer. This effectively inserts the following:

extern thread\_local uintptr\_t \_\_sancov\_lowest\_stack;

uintptr\_t stack \= (uintptr\_t)\_\_builtin\_frame\_address(0);
if (stack < \_\_sancov\_lowest\_stack)
  \_\_sancov\_lowest\_stack \= stack;

If `-fsanitize-coverage-stack-depth-callback-min=N` (where `N > 0`) is also used, the tracking is delegated to a callback, `__sanitizer_cov_stack_depth`, instead of adding instrumentation to update `__sancov_lowest_stack`. The `N` of the argument is used to determine which functions to instrument. Only functions estimated to be using `N` bytes or more of stack space will be instrumented to call the tracing callback. In the case of a dynamically sized stack, the callback is unconditionally added.

The callback takes no arguments and is responsible for determining the stack usage and doing any needed comparisons and storage. A roughly equivalent implementation of `__sancov_lowest_stack` using the callback would look like this:

void \_\_sanitizer\_cov\_stack\_depth(void) {
  uintptr\_t stack \= (uintptr\_t)\_\_builtin\_frame\_address(0);

  if (stack < \_\_sancov\_lowest\_stack)
    \_\_sancov\_lowest\_stack \= stack;
}

[Gated Trace Callbacks](#id12)[¶](#gated-trace-callbacks "Link to this heading")
--------------------------------------------------------------------------------

Gate the invocation of the tracing callbacks with `-sanitizer-coverage-gated-trace-callbacks`.

When this option is enabled, the instrumentation will not call into the runtime-provided callbacks for tracing, thus only incurring in a trivial branch without going through a function call.

It is up to the runtime to toggle the value of the global variable in order to enable tracing.

This option is only supported for trace-pc-guard and trace-cmp.

[Disabling instrumentation with `__attribute__((no_sanitize("coverage")))`](#id13)[¶](#disabling-instrumentation-with-attribute-no-sanitize-coverage "Link to this heading")
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

It is possible to disable coverage instrumentation for select functions via the function attribute `__attribute__((no_sanitize("coverage")))`. Because this attribute may not be supported by other compilers, it is recommended to use it together with `__has_feature(coverage_sanitizer)`.

[Disabling instrumentation without source modification](#id14)[¶](#disabling-instrumentation-without-source-modification "Link to this heading")
------------------------------------------------------------------------------------------------------------------------------------------------

It is sometimes useful to tell SanitizerCoverage to instrument only a subset of the functions in your target without modifying source files. With `-fsanitize-coverage-allowlist=allowlist.txt` and `-fsanitize-coverage-ignorelist=blocklist.txt`, you can specify such a subset through the combination of an allowlist and a blocklist.

SanitizerCoverage will only instrument functions that satisfy two conditions. First, the function should belong to a source file with a path that is both allowlisted and not blocklisted. Second, the function should have a mangled name that is both allowlisted and not blocklisted.

The allowlist and blocklist format is similar to that of the sanitizer blocklist format. The default allowlist will match every source file and every function. The default blocklist will match no source file and no function.

A common use case is to have the allowlist list folders or source files for which you want instrumentation and allow all function names, while the blocklist will opt out some specific files or functions that the allowlist loosely allowed.

Here is an example allowlist:

\# Enable instrumentation for a whole folder
src:bar/\*
# Enable instrumentation for a specific source file
src:foo/a.cpp
# Enable instrumentation for all functions in those files
fun:\*

And an example blocklist:

\# Disable instrumentation for a specific source file that the allowlist allowed
src:bar/b.cpp
# Disable instrumentation for a specific function that the allowlist allowed
fun:\*myFunc\*

The use of `*` wildcards above is required because function names are matched after mangling. Without the wildcards, one would have to write the whole mangled name.

Be careful that the paths of source files are matched exactly as they are provided on the clang command line. For example, the allowlist above would include file `bar/b.cpp` if the path was provided exactly like this, but would it would fail to include it with other ways to refer to the same file such as `./bar/b.cpp`, or `bar\b.cpp` on Windows. So, please make sure to always double check that your lists are correctly applied.

[Default implementation](#id15)[¶](#default-implementation "Link to this heading")
----------------------------------------------------------------------------------

The sanitizer run-time (AddressSanitizer, MemorySanitizer, etc) provide a default implementations of some of the coverage callbacks. You may use this implementation to dump the coverage on disk at the process exit.

Example:

% cat \-n cov.cc
     1  #include <stdio.h>
     2  \_\_attribute\_\_((noinline))
     3  void foo() { printf("foo\\n"); }
     4
     5  int main(int argc, char \*\*argv) {
     6    if (argc == 2)
     7      foo();
     8    printf("main\\n");
     9  }
% clang++ \-g cov.cc \-fsanitize\=address \-fsanitize-coverage\=trace-pc-guard
% ASAN\_OPTIONS\=coverage\=1 ./a.out; wc \-c \*.sancov
main
SanitizerCoverage: ./a.out.7312.sancov 2 PCs written
24 a.out.7312.sancov
% ASAN\_OPTIONS\=coverage\=1 ./a.out foo ; wc \-c \*.sancov
foo
main
SanitizerCoverage: ./a.out.7316.sancov 3 PCs written
24 a.out.7312.sancov
32 a.out.7316.sancov

Every time you run an executable instrumented with SanitizerCoverage one `*.sancov` file is created during the process shutdown. If the executable is dynamically linked against instrumented DSOs, one `*.sancov` file will be also created for every DSO.

### [Sancov data format](#id16)[¶](#sancov-data-format "Link to this heading")

The format of `*.sancov` files is very simple: the first 8 bytes is the magic, one of `0xC0BFFFFFFFFFFF64` and `0xC0BFFFFFFFFFFF32`. The last byte of the magic defines the size of the following offsets. The rest of the data is the offsets in the corresponding binary/DSO that were executed during the run.

### [Sancov Tool](#id17)[¶](#sancov-tool "Link to this heading")

A simple `sancov` tool is provided to process coverage files. The tool is part of LLVM project and is currently supported only on Linux. It can handle symbolization tasks autonomously without any extra support from the environment. You need to pass .sancov files (named `<module_name>.<pid>.sancov` and paths to all corresponding binary elf files. Sancov matches these files using module names and binaries file names.

USAGE: sancov \[options\] <action> (<binary file>|<.sancov file>)...

Action (required)
  -print                    - Print coverage addresses
  -covered-functions        - Print all covered functions.
  -not-covered-functions    - Print all not covered functions.
  -symbolize                - Symbolizes the report.

Options
  -blocklist=<string>         - Blocklist file (sanitizer blocklist format).
  -demangle                   - Print demangled function name.
  -strip\_path\_prefix=<string> - Strip this prefix from file paths in reports

### [Coverage Reports](#id18)[¶](#coverage-reports "Link to this heading")

**Experimental**

`.sancov` files do not contain enough information to generate a source-level coverage report. The missing information is contained in debug info of the binary. Thus the `.sancov` has to be symbolized to produce a `.symcov` file first:

sancov -symbolize my\_program.123.sancov my\_program > my\_program.123.symcov

The `.symcov` file can be browsed overlaid over the source code by running `tools/sancov/coverage-report-server.py` script that will start an HTTP server.

### [Output directory](#id19)[¶](#output-directory "Link to this heading")

By default, .sancov files are created in the current working directory. This can be changed with `ASAN_OPTIONS=coverage_dir=/path`:

% ASAN\_OPTIONS\="coverage=1:coverage\_dir=/tmp/cov" ./a.out foo
% ls \-l /tmp/cov/\*sancov
\-rw-r----- 1 kcc eng 4 Nov 27 12:21 a.out.22673.sancov
\-rw-r----- 1 kcc eng 8 Nov 27 12:21 a.out.22679.sancov