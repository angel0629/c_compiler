---
title: "SanitizerStats — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/SanitizerStats.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
*   [Introduction](#introduction)
    
*   [How to build and run](#how-to-build-and-run)
    

[Introduction](#id1)[¶](#introduction "Link to this heading")
-------------------------------------------------------------

The sanitizers support a simple mechanism for gathering profiling statistics to help understand the overhead associated with sanitizers.

[How to build and run](#id2)[¶](#how-to-build-and-run "Link to this heading")
-----------------------------------------------------------------------------

SanitizerStats can currently only be used with [Control Flow Integrity](https://clang.llvm.org/docs/ControlFlowIntegrity.html). In addition to `-fsanitize=cfi*`, pass the `-fsanitize-stats` flag. This will cause the program to count the number of times that each control flow integrity check in the program fires.

At run time, set the `SANITIZER_STATS_PATH` environment variable to direct statistics output to a file. The file will be written on process exit. The following substitutions will be applied to the environment variable:

> *   `%b` – The executable basename.
>     
> *   `%p` – The process ID.
>     

You can also send the `SIGUSR2` signal to a process to make it write sanitizer statistics immediately.

The `sanstats` program can be used to dump statistics. It takes as a command line argument the path to a statistics file produced by a program compiled with `-fsanitize-stats`.

The output of `sanstats` is in four columns, separated by spaces. The first column is the file and line number of the call site. The second column is the function name. The third column is the type of statistic gathered (in this case, the type of control flow integrity check). The fourth column is the call count.

Example:

$ cat \-n vcall.cc
     1 struct A {
     2   virtual void f() {}
     3 };
     4
     5 \_\_attribute\_\_((noinline)) void g(A \*a) {
     6   a->f();
     7 }
     8
     9 int main() {
    10   A a;
    11   g(&a);
    12 }
$ clang++ \-fsanitize\=cfi \-fvisibility\=hidden \-flto \-fuse-ld\=gold vcall.cc \-fsanitize-stats \-g
$ SANITIZER\_STATS\_PATH\=a.stats ./a.out
$ sanstats a.stats
vcall.cc:6 \_Z1gP1A cfi-vcall 1