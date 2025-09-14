---
title: "Sanitizer special case list — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/SanitizerSpecialCaseList.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
*   [Introduction](#introduction)
    
*   [Goal and usage](#goal-and-usage)
    
*   [Example](#example)
    
*   [Usage with UndefinedBehaviorSanitizer](#usage-with-undefinedbehaviorsanitizer)
    
*   [Format](#format)
    

[Introduction](#id1)[¶](#introduction "Link to this heading")
-------------------------------------------------------------

This document describes the way to disable or alter the behavior of sanitizer tools for certain source-level entities by providing a special file at compile-time.

[Goal and usage](#id2)[¶](#goal-and-usage "Link to this heading")
-----------------------------------------------------------------

Users of sanitizer tools, such as [AddressSanitizer](https://clang.llvm.org/docs/AddressSanitizer.html), [Hardware-assisted AddressSanitizer Design Documentation](https://clang.llvm.org/docs/HardwareAssistedAddressSanitizerDesign.html), [ThreadSanitizer](https://clang.llvm.org/docs/ThreadSanitizer.html), [MemorySanitizer](https://clang.llvm.org/docs/MemorySanitizer.html) or [UndefinedBehaviorSanitizer](https://clang.llvm.org/docs/UndefinedBehaviorSanitizer.html) may want to disable or alter some checks for certain source-level entities to:

*   speedup hot function, which is known to be correct;
    
*   ignore a function that does some low-level magic (e.g. walks through the thread stack, bypassing the frame boundaries);
    
*   ignore a known problem.
    

To achieve this, user may create a file listing the entities they want to ignore, and pass it to clang at compile-time using `-fsanitize-ignorelist` flag. See [Clang Compiler User’s Manual](https://clang.llvm.org/docs/UsersManual.html) for details.

[Example](#id3)[¶](#example "Link to this heading")
---------------------------------------------------

$ cat foo.c
#include <stdlib.h>
void bad\_foo() {
  int \*a \= (int\*)malloc(40);
  a\[10\] \= 1;
  free(a);
}
int main() { bad\_foo(); }
$ cat ignorelist.txt
\# Ignore reports from bad\_foo function.
fun:bad\_foo
$ clang \-fsanitize\=address foo.c ; ./a.out
\# AddressSanitizer prints an error report.
$ clang \-fsanitize\=address \-fsanitize-ignorelist\=ignorelist.txt foo.c ; ./a.out
\# No error report here.

[Usage with UndefinedBehaviorSanitizer](#id4)[¶](#usage-with-undefinedbehaviorsanitizer "Link to this heading")
---------------------------------------------------------------------------------------------------------------

`unsigned-integer-overflow`, `signed-integer-overflow`, `implicit-signed-integer-truncation`, `implicit-unsigned-integer-truncation`, and `enum` sanitizers support the ability to adjust instrumentation based on type.

By default, supported sanitizers will have their instrumentation disabled for entries specified within an ignorelist.

$ cat foo.c
void foo() {
  int a \= 2147483647; // INT\_MAX
  ++a;                // Normally, an overflow with \-fsanitize\=signed-integer-overflow
}
$ cat ignorelist.txt
\[signed-integer-overflow\]
type:int
$ clang \-fsanitize\=signed-integer-overflow \-fsanitize-ignorelist\=ignorelist.txt foo.c ; ./a.out
\# no signed-integer-overflow error

For example, supplying the above `ignorelist.txt` to `-fsanitize-ignorelist=ignorelist.txt` disables overflow sanitizer instrumentation for arithmetic operations containing values of type `int`.

The `=sanitize` category is also supported. Any `=sanitize` category entries enable sanitizer instrumentation, even if it was ignored by entries before. Entries can be `src`, `type`, `global`, `fun`, and `mainfile`.

With this, one may disable instrumentation for some or all types and specifically allow instrumentation for one or many types – including types created via `typedef`. This is a way to achieve a sort of “allowlist” for supported sanitizers.

$ cat ignorelist.txt
\[implicit-signed-integer-truncation\]
type:\*
type:T\=sanitize

$ cat foo.c
typedef char T;
typedef char U;
void foo(int toobig) {
  T a \= toobig;    // instrumented
  U b \= toobig;    // not instrumented
  char c \= toobig; // also not instrumented
}

If multiple entries match the source, then the latest entry takes the precedence. Here are a few examples.

$ cat ignorelist1.txt
\# test.cc will not be instrumented.
src:\*
src:\*/mylib/\*\=sanitize
src:\*/mylib/test.cc

$ cat ignorelist2.txt
\# test.cc will be instrumented.
src:\*
src:\*/mylib/test.cc
src:\*/mylib/\*\=sanitize

$ cat ignorelist3.txt
\# Type T will not be instrumented.
type:\*
type:T\=sanitize
type:T

$ cat ignorelist4.txt
\# Function \`bad\_bar\`\` will be instrumented.
\# Function \`good\_bar\` will not be instrumented.
fun:\*
fun:\*bar
fun:bad\_bar\=sanitize

[Format](#id5)[¶](#format "Link to this heading")
-------------------------------------------------

Ignorelists consist of entries, optionally grouped into sections. Empty lines and lines starting with “#” are ignored.

Note

Prior to Clang 18, section names and entries described below use a variant of regex where `*` is translated to `.*`. Clang 18 (D154014 <https://reviews.llvm.org/D154014>) switches to glob and plans to remove regex support in Clang 19.

For Clang 18, regex is supported if `#!special-case-list-v1` is the first line of the file.

Many special case lists use `.` to indicate the literal character and do not use regex metacharacters such as `(`, `)`. They are unaffected by the regex to glob transition. For more details, see [this discourse post](https://discourse.llvm.org/t/use-glob-instead-of-regex-for-specialcaselists/71666).

Section names are globs written in square brackets that denote which sanitizer the following entries apply to. For example, `[address]` specifies AddressSanitizer while `[{cfi-vcall,cfi-icall}]` specifies Control Flow Integrity virtual and indirect call checking. Entries without a section will be placed under the `[*]` section applying to all enabled sanitizers.

Entries contain an entity type, followed by a colon and a glob, specifying the names of the entities, optionally followed by an equals sign and a tool-specific category, e.g. `fun:*ExampleFunc=example_category`. Two generic entity types are `src` and `fun`, which allow users to specify source files and functions, respectively. Some sanitizer tools may introduce custom entity types and categories - refer to tool-specific docs.

\# Lines starting with # are ignored.
\# Turn off checks for the source file
\# Entries without sections are placed into \[\*\] and apply to all sanitizers
src:path/to/source/file.c
src:\*/source/file.c
\# Turn off checks for this main file, including files included by it.
\# Useful when the main file instead of an included file should be ignored.
mainfile:file.c
\# Turn off checks for a particular functions (use mangled names):
fun:\_Z8MyFooBarv
\# Glob brace expansions and character ranges are supported
fun:bad\_{foo,bar}
src:bad\_source\[1\-9\].c
\# "\*" matches zero or more characters
src:bad/sources/\*
fun:\*BadFunction\*
\# Specific sanitizer tools may introduce categories.
src:/special/path/\*\=special\_sources
\# Sections can be used to limit ignorelist entries to specific sanitizers
\[address\]
fun:\*BadASanFunc\*
\# Section names are globs
\[{cfi-vcall,cfi-icall}\]
fun:\*BadCfiCall

`mainfile` is similar to applying `-fno-sanitize=` to a set of files but does not need plumbing into the build system. This works well for internal linkage functions but has a caveat for C++ vague linkage functions.

C++ vague linkage functions (e.g. inline functions, template instantiations) are deduplicated at link time. A function (in an included file) ignored by a specific `mainfile` pattern may not be the prevailing copy picked by the linker. Therefore, using `mainfile` requires caution. It may still be useful, e.g. when patterns are picked in a way to ensure the prevailing one is ignored. (There is action-at-a-distance risk.)

`mainfile` can be useful enabling a ubsan check for a large code base when finding the direct stack frame triggering the failure for every failure is difficult.