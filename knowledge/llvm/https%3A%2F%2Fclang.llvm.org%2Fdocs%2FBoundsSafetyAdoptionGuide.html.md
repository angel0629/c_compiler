---
title: "Adoption Guide for -fbounds-safety — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/BoundsSafetyAdoptionGuide.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
*   [Where to get `-fbounds-safety`](#where-to-get-fbounds-safety)
    
*   [Feature flag](#feature-flag)
    
*   [Include `ptrcheck.h`](#include-ptrcheck-h)
    
*   [Add bounds annotations on pointers as necessary](#add-bounds-annotations-on-pointers-as-necessary)
    
*   [Address compiler diagnostics](#address-compiler-diagnostics)
    
*   [Run test suites to fix new run-time traps](#run-test-suites-to-fix-new-run-time-traps)
    
*   [Repeat the process for each remaining file](#repeat-the-process-for-each-remaining-file)
    

[Where to get `-fbounds-safety`](#id1)[¶](#where-to-get-fbounds-safety "Link to this heading")
----------------------------------------------------------------------------------------------

The open sourcing to llvm.org’s `llvm-project` is still on going and the feature is not available yet. In the mean time, the preview implementation is available [here](https://github.com/swiftlang/llvm-project/tree/stable/20240723) in a fork of `llvm-project`. Please follow [Building LLVM with CMake](https://llvm.org/docs/CMake.html) to build the compiler.

[Feature flag](#id2)[¶](#feature-flag "Link to this heading")
-------------------------------------------------------------

Pass `-fbounds-safety` as a Clang compilation flag for the C file that you want to adopt. We recommend adopting the model file by file, because adoption requires some effort to add bounds annotations and fix compiler diagnostics.

[Include `ptrcheck.h`](#id3)[¶](#include-ptrcheck-h "Link to this heading")
---------------------------------------------------------------------------

`ptrcheck.h` is a Clang toolchain header to provide definition of the bounds annotations such as `__counted_by`, `__counted_by_or_null`, `__sized_by`, etc. In the LLVM source tree, the header is located in `llvm-project/clang/lib/Headers/ptrcheck.h`.

[Add bounds annotations on pointers as necessary](#id4)[¶](#add-bounds-annotations-on-pointers-as-necessary "Link to this heading")
-----------------------------------------------------------------------------------------------------------------------------------

Annotate pointers on struct fields and function parameters if they are pointing to an array of object, with appropriate bounds annotations. Please see [\-fbounds-safety: Enforcing bounds safety for C](https://clang.llvm.org/docs/BoundsSafety.html) to learn what kind of bounds annotations are available and their semantics. Note that local pointer variables typically don’t need bounds annotations because they are implicitly a wide pointer (`__bidi_indexable`) that automatically carries the bounds information.

[Address compiler diagnostics](#id5)[¶](#address-compiler-diagnostics "Link to this heading")
---------------------------------------------------------------------------------------------

Once you pass `-fbounds-safety` to compiler a C file, you will see some new compiler warnings and errors, which guide adoption of `-fbounds-safety`. Consider the following example:

#include <ptrcheck.h>

void init\_buf(int \*p, int n) {
   for (int i \= 0; i < n; ++i)
      p\[i\] \= 0; // error: array subscript on single pointer 'p' must use a constant index of 0 to be in bounds
}

The parameter `int *p` doesn’t have a bounds annotation, so the compiler will complain about the code indexing into it (`p[i]`) as it assumes that `p` is pointing to a single `int` object or null. To address the diagnostics, you should add a bounds annotation on `int *p` so that the compiler can reason about the safety of the array subscript. In the following example, `p` is now `int *__counted_by(n)`, so the compiler will allow the array subscript with additional run-time checks as necessary.

#include <ptrcheck.h>

void init\_buf(int \*\_\_counted\_by(n) p, int n) {
   for (int i \= 0; i < n; ++i)
      p\[i\] \= 0; // ok; \`p\` is now has a type with bounds annotation.
}

[Run test suites to fix new run-time traps](#id6)[¶](#run-test-suites-to-fix-new-run-time-traps "Link to this heading")
-----------------------------------------------------------------------------------------------------------------------

Adopting `-fbounds-safety` may cause your program to trap if it violates bounds safety or it has incorrect adoption. Thus, it is necessary to perform run-time testing of your program to gain confidence that it won’t trap at run time.

[Repeat the process for each remaining file](#id7)[¶](#repeat-the-process-for-each-remaining-file "Link to this heading")
-------------------------------------------------------------------------------------------------------------------------

Once you’ve done with adopting a single C file, please repeat the same process for each remaining C file that you want to adopt.