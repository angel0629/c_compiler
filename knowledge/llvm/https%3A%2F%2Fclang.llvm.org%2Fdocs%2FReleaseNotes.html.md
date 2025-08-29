---
title: "Clang 22.0.0git (In-Progress) Release Notes — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/ReleaseNotes.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
*   [Introduction](#introduction)
    
*   [Potentially Breaking Changes](#potentially-breaking-changes)
    
    *   [C/C++ Language Potentially Breaking Changes](#c-c-language-potentially-breaking-changes)
        
    *   [C++ Specific Potentially Breaking Changes](#c-specific-potentially-breaking-changes)
        
    *   [ABI Changes in This Version](#abi-changes-in-this-version)
        
    *   [AST Dumping Potentially Breaking Changes](#ast-dumping-potentially-breaking-changes)
        
    *   [Clang Frontend Potentially Breaking Changes](#clang-frontend-potentially-breaking-changes)
        
    *   [Clang Python Bindings Potentially Breaking Changes](#clang-python-bindings-potentially-breaking-changes)
        
*   [What’s New in Clang 22.0.0git?](#what-s-new-in-clang-release)
    
    *   [C++ Language Changes](#c-language-changes)
        
    *   [C Language Changes](#id2)
        
    *   [Non-comprehensive list of changes in this release](#non-comprehensive-list-of-changes-in-this-release)
        
    *   [New Compiler Flags](#new-compiler-flags)
        
    *   [Deprecated Compiler Flags](#deprecated-compiler-flags)
        
    *   [Modified Compiler Flags](#modified-compiler-flags)
        
    *   [Removed Compiler Flags](#removed-compiler-flags)
        
    *   [Attribute Changes in Clang](#attribute-changes-in-clang)
        
    *   [Improvements to Clang’s diagnostics](#improvements-to-clang-s-diagnostics)
        
    *   [Improvements to Clang’s time-trace](#improvements-to-clang-s-time-trace)
        
    *   [Improvements to Coverage Mapping](#improvements-to-coverage-mapping)
        
    *   [Bug Fixes in This Version](#bug-fixes-in-this-version)
        
    *   [OpenACC Specific Changes](#openacc-specific-changes)
        
    *   [Target Specific Changes](#target-specific-changes)
        
    *   [DWARF Support in Clang](#dwarf-support-in-clang)
        
    *   [Floating Point Support in Clang](#floating-point-support-in-clang)
        
    *   [Fixed Point Support in Clang](#fixed-point-support-in-clang)
        
    *   [AST Matchers](#ast-matchers)
        
    *   [clang-format](#clang-format)
        
    *   [libclang](#libclang)
        
    *   [Code Completion](#code-completion)
        
    *   [Static Analyzer](#static-analyzer)
        
    *   [Sanitizers](#sanitizers)
        
    *   [Python Binding Changes](#python-binding-changes)
        
    *   [OpenMP Support](#openmp-support)
        
*   [Additional Information](#additional-information)
    

Written by the [LLVM Team](https://llvm.org/)

Warning

These are in-progress notes for the upcoming Clang 22 release. Release notes for previous releases can be found on [the Releases Page](https://llvm.org/releases/).

[Introduction](#id40)[¶](#introduction "Link to this heading")
--------------------------------------------------------------

This document contains the release notes for the Clang C/C++/Objective-C frontend, part of the LLVM Compiler Infrastructure, release 22.0.0git. Here we describe the status of Clang in some detail, including major improvements from the previous release and new feature work. For the general LLVM release notes, see [the LLVM documentation](https://llvm.org/docs/ReleaseNotes.html). For the libc++ release notes, see [this page](https://libcxx.llvm.org/ReleaseNotes.html). All LLVM releases may be downloaded from the [LLVM releases web site](https://llvm.org/releases/).

For more information about Clang or LLVM, including information about the latest release, please see the [Clang Web Site](https://clang.llvm.org/) or the [LLVM Web Site](https://llvm.org/).

[Potentially Breaking Changes](#id41)[¶](#potentially-breaking-changes "Link to this heading")
----------------------------------------------------------------------------------------------

*   Clang will now emit a warning if the auto-detected GCC installation directory (i.e. the one with the largest version number) does not contain libstdc++ include directories although a “complete” GCC installation directory containing the include directories is available. It is planned to change the auto-detection to prefer the “complete” directory in the future. The warning will disappear if the libstdc++ include directories are either installed or removed for all GCC installation directories considered by the auto-detection; see the output of `clang -v` for a list of those directories. If the GCC installations cannot be modified and maintaining the current choice of the auto-detection is desired, the GCC installation directory can be selected explicitly using the `--gcc-install-dir` command line argument. This will silence the warning. It can also be disabled using the `-Wno-gcc-install-dir-libstdcxx` command line flag.
    

### [C/C++ Language Potentially Breaking Changes](#id42)[¶](#c-c-language-potentially-breaking-changes "Link to this heading")

*   The `__has_builtin` function now only considers the currently active target when being used with target offloading.
    

### [C++ Specific Potentially Breaking Changes](#id43)[¶](#c-specific-potentially-breaking-changes "Link to this heading")

*   For C++20 modules, the Reduced BMI mode will be the default option. This may introduce regressions if your build system supports two-phase compilation model but haven’t support reduced BMI or it is a compiler bug or a bug in users code.
    
*   Clang now correctly diagnoses during constant expression evaluation undefined behavior due to member pointer access to a member which is not a direct or indirect member of the most-derived object of the accessed object but is instead located directly in a sibling class to one of the classes along the inheritance hierarchy of the most-derived object as ill-formed. Other scenarios in which the member is not member of the most derived object were already diagnosed previously. ([#150709](https://github.com/llvm/llvm-project/issues/150709))
    
    struct A {};
    struct B : A {};
    struct C : A { constexpr int foo() const { return 1; } };
    constexpr A a;
    constexpr B b;
    constexpr C c;
    constexpr auto mp \= static\_cast<int(A::\*)() const\>(&C::foo);
    static\_assert((a.\*mp)() \== 1); // continues to be rejected
    static\_assert((b.\*mp)() \== 1); // newly rejected
    static\_assert((c.\*mp)() \== 1); // accepted
    

### [ABI Changes in This Version](#id44)[¶](#abi-changes-in-this-version "Link to this heading")

### [AST Dumping Potentially Breaking Changes](#id45)[¶](#ast-dumping-potentially-breaking-changes "Link to this heading")

*   How nested name specifiers are dumped and printed changes, keeping track of clang AST changes.
    

### [Clang Frontend Potentially Breaking Changes](#id46)[¶](#clang-frontend-potentially-breaking-changes "Link to this heading")

*   Members of anonymous unions/structs are now injected as `IndirectFieldDecl` into the enclosing record even if their names conflict with other names in the scope. These `IndirectFieldDecl` are marked invalid.
    

### [Clang Python Bindings Potentially Breaking Changes](#id47)[¶](#clang-python-bindings-potentially-breaking-changes "Link to this heading")

*   TypeKind `ELABORATED` is not used anymore, per clang AST changes removing ElaboratedTypes. The value becomes unused, and all the existing users should expect the former underlying type to be reported instead.
    

[What’s New in Clang 22.0.0git?](#id48)[¶](#what-s-new-in-clang-release "Link to this heading")
-----------------------------------------------------------------------------------------------

### [C++ Language Changes](#id49)[¶](#c-language-changes "Link to this heading")

#### C++2c Feature Support[¶](#c-2c-feature-support "Link to this heading")

#### C++23 Feature Support[¶](#c-23-feature-support "Link to this heading")

#### C++20 Feature Support[¶](#c-20-feature-support "Link to this heading")

#### C++17 Feature Support[¶](#c-17-feature-support "Link to this heading")

#### Resolutions to C++ Defect Reports[¶](#resolutions-to-c-defect-reports "Link to this heading")

### [C Language Changes](#id50)[¶](#id2 "Link to this heading")

#### C2y Feature Support[¶](#c2y-feature-support "Link to this heading")

#### C23 Feature Support[¶](#c23-feature-support "Link to this heading")

### [Non-comprehensive list of changes in this release](#id51)[¶](#non-comprehensive-list-of-changes-in-this-release "Link to this heading")

*   Added `__builtin_elementwise_fshl` and `__builtin_elementwise_fshr`.
    
*   `__builtin_elementwise_abs` can now be used in constant expression.
    
*   Added `__builtin_elementwise_minnumnum` and `__builtin_elementwise_maxnumnum`.
    
*   Trapping UBSan (e.g. `-fsanitize-trap=undefined`) now emits a string describing the reason for trapping into the generated debug info. This feature allows debuggers (e.g. LLDB) to display the reason for trapping if the trap is reached. The string is currently encoded in the debug info as an artificial frame that claims to be inlined at the trap location. The function used for the artificial frame is an artificial function whose name encodes the reason for trapping. The encoding used is currently the same as `__builtin_verbose_trap` but might change in the future. This feature is enabled by default but can be disabled by compiling with `-fno-sanitize-annotate-debug-info-traps`.
    
*   `__builtin_elementwise_max` and `__builtin_elementwise_min` functions for integer types can now be used in constant expressions.
    
*   A vector of booleans is now a valid condition for the ternary `?:` operator. This binds to a simple vector select operation.
    
*   Added `__builtin_masked_load` and `__builtin_masked_store` for conditional memory loads from vectors. Binds to the LLVM intrinsic of the same name.
    
*   Use of `__has_feature` to detect the `ptrauth_qualifier` and `ptrauth_intrinsics` features has been deprecated, and is restricted to the arm64e target only. The correct method to check for these features is to test for the `__PTRAUTH__` macro.
    
*   Added a new builtin, `__builtin_dedup_pack`, to remove duplicate types from a parameter pack. This feature is particularly useful in template metaprogramming for normalizing type lists. The builtin produces a new, unexpanded parameter pack that can be used in contexts like template argument lists or base specifiers.
    
    template <typename...\> struct TypeList;
    
    // The resulting type is TypeList<int, double, char>
    using MyTypeList \= TypeList<\_\_builtin\_dedup\_pack<int, double, int, char, double\>...\>;
    
    Currently, the use of `__builtin_dedup_pack` is limited to template arguments and base specifiers, it also must be used within a template context.
    

### [New Compiler Flags](#id52)[¶](#new-compiler-flags "Link to this heading")

*   New option `-fno-sanitize-annotate-debug-info-traps` added to disable emitting trap reasons into the debug info when compiling with trapping UBSan (e.g. `-fsanitize-trap=undefined`).
    

#### Lanai Support[¶](#lanai-support "Link to this heading")

*   The option `-mcmodel={small,medium,large}` is supported again.
    

### [Deprecated Compiler Flags](#id53)[¶](#deprecated-compiler-flags "Link to this heading")

### [Modified Compiler Flags](#id54)[¶](#modified-compiler-flags "Link to this heading")

### [Removed Compiler Flags](#id55)[¶](#removed-compiler-flags "Link to this heading")

### [Attribute Changes in Clang](#id56)[¶](#attribute-changes-in-clang "Link to this heading")

### [Improvements to Clang’s diagnostics](#id57)[¶](#improvements-to-clang-s-diagnostics "Link to this heading")

*   Added a separate diagnostic group `-Wfunction-effect-redeclarations`, for the more pedantic diagnostics for function effects (`[[clang::nonblocking]]` and `[[clang::nonallocating]]`). Moved the warning for a missing (though implied) attribute on a redeclaration into this group. Added a new warning in this group for the case where the attribute is missing/implicit on an override of a virtual method.
    
*   Fixed fix-it hint for fold expressions. Clang now correctly places the suggested right parenthesis when diagnosing malformed fold expressions. ([#151787](https://github.com/llvm/llvm-project/issues/151787))
    
*   Added fix-it hint for when scoped enumerations require explicit conversions for binary operations. ([#24265](https://github.com/llvm/llvm-project/issues/24265))
    
*   Fixed an issue where emitted format-signedness diagnostics were not associated with an appropriate diagnostic id. Besides being incorrect from an API standpoint, this was user visible, e.g.: “format specifies type ‘unsigned int’ but the argument has type ‘int’ \[-Wformat\]” “signedness of format specifier ‘u’ is incompatible with ‘c’ \[-Wformat\]” This was misleading, because even though -Wformat is required in order to emit the diagnostics, the warning flag the user needs to concerned with here is -Wformat-signedness, which is also required and is not enabled by default. With the change you’ll now see: “format specifies type ‘unsigned int’ but the argument has type ‘int’, which differs in signedness \[-Wformat-signedness\]” “signedness of format specifier ‘u’ is incompatible with ‘c’ \[-Wformat-signedness\]” and the API-visible diagnostic id will be appropriate.
    
*   Fixed false positives in `-Waddress-of-packed-member` diagnostics when potential misaligned members get processed before they can get discarded. ([#144729](https://github.com/llvm/llvm-project/issues/144729))
    
*   Fixed false positive in `-Wmissing-noreturn` diagnostic when it was requiring the usage of `[[noreturn]]` on lambdas before C++23 ([#154493](https://github.com/llvm/llvm-project/issues/154493)).
    
*   Clang now diagnoses the use of `#` and `##` preprocessor tokens in attribute argument lists in C++ when `-pedantic` is enabled. The operators can be used in macro replacement lists with the usual preprocessor semantics, however, non-preprocessor use of tokens now triggers a pedantic warning in C++. Compilation in C mode is unchanged, and still permits these tokens to be used. ([#147217](https://github.com/llvm/llvm-project/issues/147217))
    
*   Clang now diagnoses misplaced array bounds on declarators for template specializations in th same way as it already did for other declarators. ([#147333](https://github.com/llvm/llvm-project/issues/147333))
    
*   A new warning `-Walloc-size` has been added to detect calls to functions decorated with the `alloc_size` attribute don’t allocate enough space for the target pointer type.
    

### [Improvements to Clang’s time-trace](#id58)[¶](#improvements-to-clang-s-time-trace "Link to this heading")

### [Improvements to Coverage Mapping](#id59)[¶](#improvements-to-coverage-mapping "Link to this heading")

### [Bug Fixes in This Version](#id60)[¶](#bug-fixes-in-this-version "Link to this heading")

*   Fix a crash when marco name is empty in `#pragma push_macro("")` or `#pragma pop_macro("")`. ([#149762](https://github.com/llvm/llvm-project/issues/149762)).
    
*   Fix a crash in variable length array (e.g. `int a[*]`) function parameter type being used in `_Countof` expression. ([#152826](https://github.com/llvm/llvm-project/issues/152826)).
    
*   \-Wunreachable-code\` now diagnoses tautological or contradictory comparisons such as `x != 0 || x != 1.0` and `x == 0 && x == 1.0` on targets that treat `_Float16`/`__fp16` as native scalar types. Previously the warning was silently lost because the operands differed only by an implicit cast chain. ([#149967](https://github.com/llvm/llvm-project/issues/149967)).
    
*   Fixed a crash with incompatible pointer to integer conversions in designated initializers involving string literals. ([#154046](https://github.com/llvm/llvm-project/issues/154046))
    
*   Clang now emits a frontend error when a function marked with the flatten attribute calls another function that requires target features not enabled in the caller. This prevents a fatal error in the backend.
    
*   Fixed scope of typedefs present inside a template class. ([#91451](https://github.com/llvm/llvm-project/issues/91451))
    

#### Bug Fixes to Compiler Builtins[¶](#bug-fixes-to-compiler-builtins "Link to this heading")

*   Fix an ambiguous reference to the builtin type\_info (available when using \-fms-compatibility) with modules. ([#38400](https://github.com/llvm/llvm-project/issues/38400))
    

#### Bug Fixes to Attribute Support[¶](#bug-fixes-to-attribute-support "Link to this heading")

*   `[[nodiscard]]` is now respected on Objective-C and Objective-C++ methods ([#141504](https://github.com/llvm/llvm-project/issues/141504)) and on types returned from indirect calls ([#142453](https://github.com/llvm/llvm-project/issues/142453)).
    
*   Fixes some late parsed attributes, when applied to function definitions, not being parsed in function try blocks, and some situations where parsing of the function body is skipped, such as error recovery and code completion. ([#153551](https://github.com/llvm/llvm-project/issues/153551))
    
*   Using `[[gnu::cleanup(some_func)]]` where some\_func is annotated with `[[gnu::error("some error")]]` now correctly triggers an error. ([#146520](https://github.com/llvm/llvm-project/issues/146520))
    

#### Bug Fixes to C++ Support[¶](#bug-fixes-to-c-support "Link to this heading")

*   Diagnose binding a reference to `*nullptr` during constant evaluation. ([#48665](https://github.com/llvm/llvm-project/issues/48665))
    
*   Suppress `-Wdeprecated-declarations` in implicitly generated functions. ([#147293](https://github.com/llvm/llvm-project/issues/147293))
    
*   Fix a crash when deleting a pointer to an incomplete array ([#150359](https://github.com/llvm/llvm-project/issues/150359)).
    
*   Fixed a mismatched lambda scope bug when propagating up `consteval` within nested lambdas. ([#145776](https://github.com/llvm/llvm-project/issues/145776))
    
*   Fix an assertion failure when expression in assumption attribute (`[[assume(expr)]]`) creates temporary objects.
    
*   Fix the dynamic\_cast to final class optimization to correctly handle casts that are guaranteed to fail ([#137518](https://github.com/llvm/llvm-project/issues/137518)).
    
*   Fix bug rejecting partial specialization of variable templates with auto NTTPs ([#118190](https://github.com/llvm/llvm-project/issues/118190)).
    
*   Fix a crash if errors “member of anonymous \[…\] redeclares” and “intializing multiple members of union” coincide ([#149985](https://github.com/llvm/llvm-project/issues/149985)).
    
*   Fix a crash when using `explicit(bool)` in pre-C++11 language modes. ([#152729](https://github.com/llvm/llvm-project/issues/152729))
    
*   Fix the parsing of variadic member functions when the ellipis immediately follows a default argument.([#153445](https://github.com/llvm/llvm-project/issues/153445))
    
*   Fixed a bug that caused `this` captured by value in a lambda with a dependent explicit object parameter to not be instantiated properly. ([#154054](https://github.com/llvm/llvm-project/issues/154054))
    

#### Bug Fixes to AST Handling[¶](#bug-fixes-to-ast-handling "Link to this heading")

*   Fix incorrect name qualifiers applied to alias CTAD. ([#136624](https://github.com/llvm/llvm-project/issues/136624))
    
*   Fixed ElaboratedTypes appearing within NestedNameSpecifier, which was not a legal representation. This is fixed because ElaboratedTypes don’t exist anymore. ([#43179](https://github.com/llvm/llvm-project/issues/43179)) ([#68670](https://github.com/llvm/llvm-project/issues/68670)) ([#92757](https://github.com/llvm/llvm-project/issues/92757))
    
*   Fix unrecognized html tag causing undesirable comment lexing ([#152944](https://github.com/llvm/llvm-project/issues/152944))
    
*   Fix comment lexing of special command names ([#152943](https://github.com/llvm/llvm-project/issues/152943))
    

#### Miscellaneous Bug Fixes[¶](#miscellaneous-bug-fixes "Link to this heading")

#### Miscellaneous Clang Crashes Fixed[¶](#miscellaneous-clang-crashes-fixed "Link to this heading")

### [OpenACC Specific Changes](#id61)[¶](#openacc-specific-changes "Link to this heading")

### [Target Specific Changes](#id62)[¶](#target-specific-changes "Link to this heading")

#### AMDGPU Support[¶](#amdgpu-support "Link to this heading")

#### NVPTX Support[¶](#nvptx-support "Link to this heading")

#### X86 Support[¶](#x86-support "Link to this heading")

*   More SSE, AVX and AVX512 intrinsics, including initializers and general arithmetic can now be used in C++ constant expressions.
    
*   Some SSE, AVX and AVX512 intrinsics have been converted to wrap generic \_\_builtin intrinsics.
    
*   NOTE: Please avoid use of the \_\_builtin\_ia32\_\* intrinsics - these are not guaranteed to exist in future releases, or match behaviour with previous releases of clang or other compilers.
    

#### Arm and AArch64 Support[¶](#arm-and-aarch64-support "Link to this heading")

#### Android Support[¶](#android-support "Link to this heading")

#### Windows Support[¶](#windows-support "Link to this heading")

#### LoongArch Support[¶](#loongarch-support "Link to this heading")

#### RISC-V Support[¶](#risc-v-support "Link to this heading")

*   Add support for \_\_attribute\_\_((interrupt(“rnmi”))) to be used with the Smrnmi extension. With this the Smrnmi extension is fully supported.
    
*   Add \-march=unset to clear any previous \-march= value. This ISA string will be computed from \-mcpu or the platform default.
    

#### CUDA/HIP Language Changes[¶](#cuda-hip-language-changes "Link to this heading")

#### CUDA Support[¶](#cuda-support "Link to this heading")

#### AIX Support[¶](#aix-support "Link to this heading")

#### NetBSD Support[¶](#netbsd-support "Link to this heading")

#### WebAssembly Support[¶](#webassembly-support "Link to this heading")

#### AVR Support[¶](#avr-support "Link to this heading")

### [DWARF Support in Clang](#id63)[¶](#dwarf-support-in-clang "Link to this heading")

### [Floating Point Support in Clang](#id64)[¶](#floating-point-support-in-clang "Link to this heading")

### [Fixed Point Support in Clang](#id65)[¶](#fixed-point-support-in-clang "Link to this heading")

### [AST Matchers](#id66)[¶](#ast-matchers "Link to this heading")

*   Removed elaboratedType matchers, and related nested name specifier changes, following the corresponding changes in the clang AST.
    
*   Ensure `hasBitWidth` doesn’t crash on bit widths that are dependent on template parameters.
    
*   Add a boolean member `IgnoreSystemHeaders` to `MatchFinderOptions`. This allows it to ignore nodes in system headers when traversing the AST.
    
*   `hasConditionVariableStatement` now supports `for` loop, `while` loop and `switch` statements.
    

### [clang-format](#id67)[¶](#clang-format "Link to this heading")

*   Add `SpaceInEmptyBraces` option and set it to `Always` for WebKit style.
    

### [libclang](#id68)[¶](#libclang "Link to this heading")

### [Code Completion](#id69)[¶](#code-completion "Link to this heading")

### [Static Analyzer](#id70)[¶](#static-analyzer "Link to this heading")

*   The Clang Static Analyzer now handles parenthesized initialization. ([#148875](https://github.com/llvm/llvm-project/issues/148875))
    
*   `__datasizeof` (C++) and `_Countof` (C) no longer cause a failed assertion when given an operand of VLA type. ([#151711](https://github.com/llvm/llvm-project/issues/151711))
    

#### New features[¶](#new-features "Link to this heading")

#### Crash and bug fixes[¶](#crash-and-bug-fixes "Link to this heading")

*   Fixed a crash in the static analyzer that when the expression in an `[[assume(expr)]]` attribute was enclosed in parentheses. ([#151529](https://github.com/llvm/llvm-project/issues/151529))
    
*   Fixed a crash when parsing `#embed` parameters with unmatched closing brackets. ([#152829](https://github.com/llvm/llvm-project/issues/152829))
    

#### Improvements[¶](#improvements "Link to this heading")

#### Moved checkers[¶](#moved-checkers "Link to this heading")

### [Sanitizers](#id71)[¶](#sanitizers "Link to this heading")

### [Python Binding Changes](#id72)[¶](#python-binding-changes "Link to this heading")

*   Exposed clang\_getCursorLanguage via Cursor.language.
    

### [OpenMP Support](#id73)[¶](#openmp-support "Link to this heading")

*   Added parsing and semantic analysis support for the `need_device_addr` modifier in the `adjust_args` clause.
    
*   Allow array length to be omitted in array section subscript expression.
    
*   Fixed non-contiguous strided update in the `omp target update` directive with the `from` clause.
    

#### Improvements[¶](#id39 "Link to this heading")

[Additional Information](#id74)[¶](#additional-information "Link to this heading")
----------------------------------------------------------------------------------

A wide variety of additional information is available on the [Clang web page](https://clang.llvm.org/). The web page contains versions of the API documentation which are up-to-date with the Git version of the source code. You can access versions of these documents specific to this release by going into the “`clang/docs/`” directory in the Clang tree.

If you have any questions or comments about Clang, please feel free to contact us on the [Discourse forums (Clang Frontend category)](https://discourse.llvm.org/c/clang/6).