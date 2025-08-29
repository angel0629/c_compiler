---
title: "the Clang C, C++, and Objective-C compiler — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/CommandGuide/clang.html#cmdoption-include"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
SYNOPSIS[¶](#synopsis "Link to this heading")
---------------------------------------------

**clang** \[_options_\] _filename …_

DESCRIPTION[¶](#description "Link to this heading")
---------------------------------------------------

**clang** is a C, C++, and Objective-C compiler which encompasses preprocessing, parsing, optimization, code generation, assembly, and linking. Depending on which high-level mode setting is passed, Clang will stop before doing a full link. While Clang is highly integrated, it is important to understand the stages of compilation, to understand how to invoke it. These stages are:

Driver

The clang executable is actually a small driver which controls the overall execution of other tools such as the compiler, assembler and linker. Typically you do not need to interact with the driver, but you transparently use it to run the other tools.

Preprocessing

This stage handles tokenization of the input source file, macro expansion, #include expansion and handling of other preprocessor directives. The output of this stage is typically called a “.i” (for C), “.ii” (for C++), “.mi” (for Objective-C), or “.mii” (for Objective-C++) file.

Parsing and Semantic Analysis

This stage parses the input file, translating preprocessor tokens into a parse tree. Once in the form of a parse tree, it applies semantic analysis to compute types for expressions as well and determine whether the code is well formed. This stage is responsible for generating most of the compiler warnings as well as parse errors. The output of this stage is an “Abstract Syntax Tree” (AST).

Code Generation and Optimization

This stage translates an AST into low-level intermediate code (known as “LLVM IR”) and ultimately to machine code. This phase is responsible for optimizing the generated code and handling target-specific code generation. The output of this stage is typically called a “.s” file or “assembly” file.

Clang also supports the use of an integrated assembler, in which the code generator produces object files directly. This avoids the overhead of generating the “.s” file and of calling the target assembler.

Assembler

This stage runs the target assembler to translate the output of the compiler into a target object file. The output of this stage is typically called a “.o” file or “object” file.

Linker

This stage runs the target linker to merge multiple object files into an executable or dynamic library. The output of this stage is typically called an “a.out”, “.dylib” or “.so” file.

**Clang Static Analyzer**

The Clang Static Analyzer is a tool that scans source code to try to find bugs through code analysis. This tool uses many parts of Clang and is built into the same driver. Please see <[https://clang-analyzer.llvm.org](https://clang-analyzer.llvm.org/)\> for more details on how to use the static analyzer.

OPTIONS[¶](#options "Link to this heading")
-------------------------------------------

### Stage Selection Options[¶](#stage-selection-options "Link to this heading")

\-E[¶](#cmdoption-E "Link to this definition")

Run the preprocessor stage.

\-fsyntax-only[¶](#cmdoption-fsyntax-only "Link to this definition")

Run the preprocessor, parser and semantic analysis stages.

\-S[¶](#cmdoption-S "Link to this definition")

Run the previous stages as well as LLVM generation and optimization stages and target-specific code generation, producing an assembly file.

\-c[¶](#cmdoption-c "Link to this definition")

Run all of the above, plus the assembler, generating a target “.o” object file.

no stage selection option[¶](#cmdoption-arg-no "Link to this definition")

If no stage selection option is specified, all stages above are run, and the linker is run to combine the results into an executable or shared library.

### Language Selection and Mode Options[¶](#language-selection-and-mode-options "Link to this heading")

\-x <language>[¶](#cmdoption-x "Link to this definition")

Treat subsequent input files as having type language.

\-std\=<standard>[¶](#cmdoption-std "Link to this definition")

Specify the language standard to compile for.

Supported values for the C language are:

> `c89`
> 
> `c90`
> 
> `iso9899:1990`
> 
> > ISO C 1990
> 
> `iso9899:199409`
> 
> > ISO C 1990 with amendment 1
> 
> `gnu89`
> 
> `gnu90`
> 
> > ISO C 1990 with GNU extensions
> 
> `c99`
> 
> `iso9899:1999`
> 
> > ISO C 1999
> 
> `gnu99`
> 
> > ISO C 1999 with GNU extensions
> 
> `c11`
> 
> `iso9899:2011`
> 
> > ISO C 2011
> 
> `gnu11`
> 
> > ISO C 2011 with GNU extensions
> 
> `c17`
> 
> `iso9899:2017`
> 
> > ISO C 2017
> 
> `gnu17`
> 
> > ISO C 2017 with GNU extensions
> 
> `c23`
> 
> `iso9899:2024`
> 
> > ISO C 2023
> 
> `gnu23`
> 
> > ISO C 2023 with GNU extensions
> 
> `c2y`
> 
> > ISO C 202y
> 
> `gnu2y`
> 
> > ISO C 202y with GNU extensions

The default C language standard is `gnu17`, except on PS4, where it is `gnu99`.

Supported values for the C++ language are:

> `c++98`
> 
> `c++03`
> 
> > ISO C++ 1998 with amendments
> 
> `gnu++98`
> 
> `gnu++03`
> 
> > ISO C++ 1998 with amendments and GNU extensions
> 
> `c++11`
> 
> > ISO C++ 2011 with amendments
> 
> `gnu++11`
> 
> > ISO C++ 2011 with amendments and GNU extensions
> 
> `c++14`
> 
> > ISO C++ 2014 with amendments
> 
> `gnu++14`
> 
> > ISO C++ 2014 with amendments and GNU extensions
> 
> `c++17`
> 
> > ISO C++ 2017 with amendments
> 
> `gnu++17`
> 
> > ISO C++ 2017 with amendments and GNU extensions
> 
> `c++20`
> 
> > ISO C++ 2020 with amendments
> 
> `gnu++20`
> 
> > ISO C++ 2020 with amendments and GNU extensions
> 
> `c++23`
> 
> > ISO C++ 2023 with amendments
> 
> `gnu++23`
> 
> > ISO C++ 2023 with amendments and GNU extensions
> 
> `c++2c`
> 
> > Working draft for C++2c
> 
> `gnu++2c`
> 
> > Working draft for C++2c with GNU extensions

The default C++ language standard is `gnu++17`.

Supported values for the OpenCL language are:

> `cl1.0`
> 
> > OpenCL 1.0
> 
> `cl1.1`
> 
> > OpenCL 1.1
> 
> `cl1.2`
> 
> > OpenCL 1.2
> 
> `cl2.0`
> 
> > OpenCL 2.0

The default OpenCL language standard is `cl1.0`.

Supported values for the CUDA language are:

> `cuda`
> 
> > NVIDIA CUDA(tm)

\-stdlib\=<library>[¶](#cmdoption-stdlib "Link to this definition")

Specify the C++ standard library to use; supported options are libstdc++ and libc++. If not specified, platform default will be used.

\-rtlib\=<library>[¶](#cmdoption-rtlib "Link to this definition")

Specify the compiler runtime library to use; supported options are libgcc and compiler-rt. If not specified, platform default will be used.

\-ansi[¶](#cmdoption-ansi "Link to this definition")

Same as -std=c89.

\-ObjC, \-ObjC++[¶](#cmdoption-ObjC "Link to this definition")

Treat source input files as Objective-C and Object-C++ inputs respectively.

\-trigraphs[¶](#cmdoption-trigraphs "Link to this definition")

Enable trigraphs.

\-ffreestanding[¶](#cmdoption-ffreestanding "Link to this definition")

Indicate that the file should be compiled for a freestanding, not a hosted, environment. Note that a freestanding build still requires linking against a C Standard Library which supports the freestanding interfaces for the specified language mode and target environment. This includes functions like memcpy, memmove, and memset.

\-fno-builtin[¶](#cmdoption-fno-builtin "Link to this definition")

Disable special handling and optimizations of well-known library functions, like `strlen()` and `malloc()`.

\-fno-builtin-<function>[¶](#cmdoption-fno-builtin-function "Link to this definition")

Disable special handling and optimizations for the specific library function. For example, `-fno-builtin-strlen` removes any special handling for the `strlen()` library function.

\-fno-builtin-std-<function>[¶](#cmdoption-fno-builtin-std-function "Link to this definition")

Disable special handling and optimizations for the specific C++ standard library function in namespace `std`. For example, `-fno-builtin-std-move_if_noexcept` removes any special handling for the `std::move_if_noexcept()` library function.

For C standard library functions that the C++ standard library also provides in namespace `std`, use [`-fno-builtin-<function>`](#cmdoption-fno-builtin-function) instead.

\-fmath-errno[¶](#cmdoption-fmath-errno "Link to this definition")

Indicate that math functions should be treated as updating `errno`.

\-fpascal-strings[¶](#cmdoption-fpascal-strings "Link to this definition")

Enable support for Pascal-style strings with “\\pfoo”.

\-fms-extensions[¶](#cmdoption-fms-extensions "Link to this definition")

Enable support for Microsoft extensions.

\-fmsc-version\=[¶](#cmdoption-fmsc-version "Link to this definition")

Set `_MSC_VER`. When on Windows, this defaults to either the same value as the currently installed version of cl.exe, or `1933`. Not set otherwise.

\-fborland-extensions[¶](#cmdoption-fborland-extensions "Link to this definition")

Enable support for Borland extensions.

\-fwritable-strings[¶](#cmdoption-fwritable-strings "Link to this definition")

Make all string literals default to writable. This disables uniquing of strings and other optimizations.

\-flax-vector-conversions, \-flax-vector-conversions\=<kind>, \-fno-lax-vector-conversions[¶](#cmdoption-flax-vector-conversions "Link to this definition")

Allow loose type checking rules for implicit vector conversions. Possible values of <kind>:

*   `none`: allow no implicit conversions between vectors
    
*   `integer`: allow implicit bitcasts between integer vectors of the same overall bit-width
    
*   `all`: allow implicit bitcasts between any vectors of the same overall bit-width
    

<kind> defaults to `integer` if unspecified.

\-fblocks[¶](#cmdoption-fblocks "Link to this definition")

Enable the “Blocks” language feature.

\-fobjc-abi-version\=version[¶](#cmdoption-fobjc-abi-version "Link to this definition")

Select the Objective-C ABI version to use. Available versions are 1 (legacy “fragile” ABI), 2 (non-fragile ABI 1), and 3 (non-fragile ABI 2).

\-fobjc-nonfragile-abi-version\=<version>[¶](#cmdoption-fobjc-nonfragile-abi-version "Link to this definition")

Select the Objective-C non-fragile ABI version to use by default. This will only be used as the Objective-C ABI when the non-fragile ABI is enabled (either via [`-fobjc-nonfragile-abi`](#cmdoption-fobjc-nonfragile-abi), or because it is the platform default).

\-fobjc-nonfragile-abi, \-fno-objc-nonfragile-abi[¶](#cmdoption-fobjc-nonfragile-abi "Link to this definition")

Enable use of the Objective-C non-fragile ABI. On platforms for which this is the default ABI, it can be disabled with [`-fno-objc-nonfragile-abi`](#cmdoption-fobjc-nonfragile-abi).

### Target Selection Options[¶](#target-selection-options "Link to this heading")

Clang fully supports cross compilation as an inherent part of its design. Depending on how your version of Clang is configured, it may have support for a number of cross compilers, or may only support a native target.

\-arch <architecture>[¶](#cmdoption-arch "Link to this definition")

Specify the architecture to build for (Mac OS X specific).

\-target <architecture>[¶](#cmdoption-target "Link to this definition")

Specify the architecture to build for (all platforms).

\-mmacos-version-min\=<version>[¶](#cmdoption-mmacos-version-min "Link to this definition")

When building for macOS, specify the minimum version supported by your application.

\-miphoneos-version-min[¶](#cmdoption-miphoneos-version-min "Link to this definition")

When building for iPhone OS, specify the minimum version supported by your application.

\--print-supported-cpus[¶](#cmdoption-print-supported-cpus "Link to this definition")

Print out a list of supported processors for the given target (specified through `--target=<architecture>` or [`-arch`](#cmdoption-arch) `<architecture>`). If no target is specified, the system default target will be used.

\-mcpu\=?, \-mtune\=?[¶](#cmdoption-mcpu "Link to this definition")

Acts as an alias for [`--print-supported-cpus`](#cmdoption-print-supported-cpus).

\-mcpu\=help, \-mtune\=help[¶](#cmdoption-0 "Link to this definition")

Acts as an alias for [`--print-supported-cpus`](#cmdoption-print-supported-cpus).

\-march\=<cpu>[¶](#cmdoption-march "Link to this definition")

Specify that Clang should generate code for a specific processor family member and later. For example, if you specify -march=i486, the compiler is allowed to generate instructions that are valid on i486 and later processors, but which may not exist on earlier ones.

\--print-enabled-extensions[¶](#cmdoption-print-enabled-extensions "Link to this definition")

Prints the list of extensions that are enabled for the target specified by the combination of –target, \-march, and \-mcpu values. Currently, this option is only supported on AArch64 and RISC-V. On RISC-V, this option also prints out the ISA string of enabled extensions.

\--print-supported-extensions[¶](#cmdoption-print-supported-extensions "Link to this definition")

Prints the list of all extensions that are supported for every CPU target for an architecture (specified through `--target=<architecture>` or [`-arch`](#cmdoption-arch) `<architecture>`). If no target is specified, the system default target will be used. Currently, this option is only supported on AArch64 and RISC-V.

### Code Generation Options[¶](#code-generation-options "Link to this heading")

\-O0, \-O1, \-O2, \-O3, \-Ofast, \-Os, \-Oz, \-Og, \-O, \-O4[¶](#cmdoption-O0 "Link to this definition")

Specify which optimization level to use:

> [`-O0`](#cmdoption-O0) Means “no optimization”: this level compiles the fastest and generates the most debuggable code.
> 
> [`-O1`](#cmdoption-O0) Somewhere between [`-O0`](#cmdoption-O0) and [`-O2`](#cmdoption-O0).
> 
> [`-O2`](#cmdoption-O0) Moderate level of optimization which enables most optimizations.
> 
> [`-O3`](#cmdoption-O0) Like [`-O2`](#cmdoption-O0), except that it enables optimizations that take longer to perform or that may generate larger code (in an attempt to make the program run faster).
> 
> [`-Ofast`](#cmdoption-O0) Enables all the optimizations from [`-O3`](#cmdoption-O0) along with other aggressive optimizations that may violate strict compliance with language standards. This is deprecated in Clang 19 and a warning is emitted that [`-O3`](#cmdoption-O0) in combination with [`-ffast-math`](https://clang.llvm.org/docs/UsersManual.html#cmdoption-ffast-math) should be used instead if the request for non-standard math behavior is intended. There is no timeline yet for removal; the aim is to discourage use of [`-Ofast`](#cmdoption-O0) due to the surprising behavior of an optimization flag changing the observable behavior of correct code.
> 
> [`-Os`](#cmdoption-O0) Like [`-O2`](#cmdoption-O0) with extra optimizations to reduce code size.
> 
> [`-Oz`](#cmdoption-O0) Like [`-Os`](#cmdoption-O0) (and thus [`-O2`](#cmdoption-O0)), but reduces code size further.
> 
> [`-Og`](#cmdoption-O0) Similar to [`-O1`](#cmdoption-O0), but with slightly reduced optimization and better variable visibility. The same optimizations are run as at [`-O1`](#cmdoption-O0), but the `-fextend-variable-liveness` flag is also set, which tries to prevent optimizations from reducing the liveness of user variables, improving their availability when debugging.
> 
> [`-O`](#cmdoption-O0) Equivalent to [`-O1`](#cmdoption-O0).
> 
> [`-O4`](#cmdoption-O0) and higher
> 
> > Currently equivalent to [`-O3`](#cmdoption-O0)

\-g, \-gline-tables-only, \-gmodules[¶](#cmdoption-g "Link to this definition")

Control debug information output. Note that Clang debug information works best at [`-O0`](#cmdoption-O0). When more than one option starting with \-g is specified, the last one wins:

> [`-g`](#cmdoption-g) Generate debug information.
> 
> [`-gline-tables-only`](#cmdoption-g) Generate only line table debug information. This allows for symbolicated backtraces with inlining information, but does not include any information about variables, their locations or types.
> 
> [`-gmodules`](#cmdoption-g) Generate debug information that contains external references to types defined in Clang modules or precompiled headers instead of emitting redundant debug type information into every object file. This option transparently switches the Clang module format to object file containers that hold the Clang module together with the debug information. When compiling a program that uses Clang modules or precompiled headers, this option produces complete debug information with faster compile times and much smaller object files.
> 
> This option should not be used when building static libraries for distribution to other machines because the debug info will contain references to the module cache on the machine the object files in the library were built on.

\-fstandalone-debug \-fno-standalone-debug[¶](#cmdoption-fstandalone-debug "Link to this definition")

Clang supports a number of optimizations to reduce the size of debug information in the binary. They work based on the assumption that the debug type information can be spread out over multiple compilation units. For instance, Clang will not emit type definitions for types that are not needed by a module and could be replaced with a forward declaration. Further, Clang will only emit type info for a dynamic C++ class in the module that contains the vtable for the class.

The [`-fstandalone-debug`](#cmdoption-fstandalone-debug) option turns off these optimizations. This is useful when working with 3rd-party libraries that don’t come with debug information. This is the default on Darwin. Note that Clang will never emit type information for types that are not referenced at all by the program.

\-feliminate-unused-debug-types[¶](#cmdoption-feliminate-unused-debug-types "Link to this definition")

By default, Clang does not emit type information for types that are defined but not used in a program. To retain the debug info for these unused types, the negation **\-fno-eliminate-unused-debug-types** can be used.

\-fexceptions[¶](#cmdoption-fexceptions "Link to this definition")

Allow exceptions to be thrown through Clang compiled stack frames (on many targets, this will enable unwind information for functions that might have an exception thrown through them). For most targets, this is enabled by default for C++.

\-ftrapv[¶](#cmdoption-ftrapv "Link to this definition")

Generate code to catch integer overflow errors. Signed integer overflow is undefined in C. With this flag, extra code is generated to detect this and abort when it happens.

\-fvisibility[¶](#cmdoption-fvisibility "Link to this definition")

This flag sets the default visibility level.

\-fcommon, \-fno-common[¶](#cmdoption-fcommon "Link to this definition")

This flag specifies that variables without initializers get common linkage. It can be disabled with [`-fno-common`](#cmdoption-fcommon).

\-ftls-model\=<model>[¶](#cmdoption-ftls-model "Link to this definition")

Set the default thread-local storage (TLS) model to use for thread-local variables. Valid values are: “global-dynamic”, “local-dynamic”, “initial-exec” and “local-exec”. The default is “global-dynamic”. The default model can be overridden with the tls\_model attribute. The compiler will try to choose a more efficient model if possible.

\-flto, \-flto\=full, \-flto\=thin, \-emit-llvm[¶](#cmdoption-flto "Link to this definition")

Generate output files in LLVM formats, suitable for link time optimization. When used with [`-S`](#cmdoption-S) this generates LLVM intermediate language assembly files, otherwise this generates LLVM bitcode format object files (which may be passed to the linker depending on the stage selection options).

The default for [`-flto`](#cmdoption-flto) is “full”, in which the LLVM bitcode is suitable for monolithic Link Time Optimization (LTO), where the linker merges all such modules into a single combined module for optimization. With “thin”, [ThinLTO](https://clang.llvm.org/docs/ThinLTO.html) compilation is invoked instead.

Note

On Darwin, when using [`-flto`](#cmdoption-flto) along with [`-g`](#cmdoption-g) and compiling and linking in separate steps, you also need to pass `-Wl,-object_path_lto,<lto-filename>.o` at the linking step to instruct the ld64 linker not to delete the temporary object file generated during Link Time Optimization (this flag is automatically passed to the linker by Clang if compilation and linking are done in a single step). This allows debugging the executable as well as generating the `.dSYM` bundle using _dsymutil(1)_.

### Driver Options[¶](#driver-options "Link to this heading")

\-###[¶](#cmdoption-2 "Link to this definition")

Print (but do not run) the commands to run for this compilation.

\--help[¶](#cmdoption-help "Link to this definition")

Display available options.

\-Qunused-arguments[¶](#cmdoption-Qunused-arguments "Link to this definition")

Do not emit any warnings for unused driver arguments.

\-Wa,<args>[¶](#cmdoption-Wa-args "Link to this definition")

Pass the comma separated arguments in args to the assembler.

\-Wl,<args>[¶](#cmdoption-Wl-args "Link to this definition")

Pass the comma separated arguments in args to the linker.

\-Wp,<args>[¶](#cmdoption-Wp-args "Link to this definition")

Pass the comma separated arguments in args to the preprocessor.

\-Xanalyzer <arg>[¶](#cmdoption-Xanalyzer "Link to this definition")

Pass arg to the static analyzer.

\-Xassembler <arg>[¶](#cmdoption-Xassembler "Link to this definition")

Pass arg to the assembler.

\-Xlinker <arg>[¶](#cmdoption-Xlinker "Link to this definition")

Pass arg to the linker.

\-Xpreprocessor <arg>[¶](#cmdoption-Xpreprocessor "Link to this definition")

Pass arg to the preprocessor.

\-o <file>[¶](#cmdoption-o "Link to this definition")

Write output to file.

\-print-file-name\=<file>[¶](#cmdoption-print-file-name "Link to this definition")

Print the full library path of file.

\-print-libgcc-file-name[¶](#cmdoption-print-libgcc-file-name "Link to this definition")

Print the library path for the currently used compiler runtime library (“libgcc.a” or “libclang\_rt.builtins.\*.a”).

\-print-prog-name\=<name>[¶](#cmdoption-print-prog-name "Link to this definition")

Print the full program path of name.

\-print-search-dirs[¶](#cmdoption-print-search-dirs "Link to this definition")

Print the paths used for finding libraries and programs.

\-save-temps[¶](#cmdoption-save-temps "Link to this definition")

Save intermediate compilation results.

\-save-stats, \-save-stats\=cwd, \-save-stats\=obj[¶](#cmdoption-save-stats "Link to this definition")

Save internal code generation (LLVM) statistics to a file in the current directory ([`-save-stats`](#cmdoption-save-stats)/”-save-stats=cwd”) or the directory of the output file (“-save-stats=obj”).

You can also use environment variables to control the statistics reporting. Setting `CC_PRINT_INTERNAL_STAT` to `1` enables the feature, the report goes to stdout in JSON format.

Setting `CC_PRINT_INTERNAL_STAT_FILE` to a file path makes it report statistics to the given file in the JSON format.

Note that `-save-stats` take precedence over `CC_PRINT_INTERNAL_STAT` and `CC_PRINT_INTERNAL_STAT_FILE`.

\-integrated-as, \-no-integrated-as[¶](#cmdoption-integrated-as "Link to this definition")

Used to enable and disable, respectively, the use of the integrated assembler. Whether the integrated assembler is on by default is target dependent.

\-time[¶](#cmdoption-time "Link to this definition")

Time individual commands.

\-ftime-report[¶](#cmdoption-ftime-report "Link to this definition")

Print timing summary of each stage of compilation.

\-v[¶](#cmdoption-v "Link to this definition")

Show commands to run and use verbose output.

### Diagnostics Options[¶](#diagnostics-options "Link to this heading")

\-fshow-column, \-fshow-source-location, \-fcaret-diagnostics, \-fdiagnostics-fixit-info, \-fdiagnostics-parseable-fixits, \-fdiagnostics-print-source-range-info, \-fprint-source-range-info, \-fdiagnostics-show-option, \-fmessage-length[¶](#cmdoption-fshow-column "Link to this definition")

These options control how Clang prints out information about diagnostics (errors and warnings). Please see the Clang User’s Manual for more information.

### Preprocessor Options[¶](#preprocessor-options "Link to this heading")

\-D<macroname>\=<value>[¶](#cmdoption-D-macroname "Link to this definition")

Adds an implicit #define into the predefines buffer which is read before the source file is preprocessed.

\-U<macroname>[¶](#cmdoption-U-macroname "Link to this definition")

Adds an implicit #undef into the predefines buffer which is read before the source file is preprocessed.

\-include <filename>[¶](#cmdoption-include "Link to this definition")

Adds an implicit #include into the predefines buffer which is read before the source file is preprocessed.

\-I<directory>[¶](#cmdoption-I-directory "Link to this definition")

Add the specified directory to the search path for include files.

\-F<directory>[¶](#cmdoption-F-directory "Link to this definition")

Add the specified directory to the search path for framework include files.

\-nostdinc[¶](#cmdoption-nostdinc "Link to this definition")

Do not search the standard system directories or compiler builtin directories for include files.

\-nostdlibinc[¶](#cmdoption-nostdlibinc "Link to this definition")

Do not search the standard system directories for include files, but do search compiler builtin include directories.

\-nobuiltininc[¶](#cmdoption-nobuiltininc "Link to this definition")

Do not search clang’s builtin directory for include files.

\-nostdinc++[¶](#cmdoption-3 "Link to this definition")

Do not search the system C++ standard library directory for include files.

\-fkeep-system-includes[¶](#cmdoption-fkeep-system-includes "Link to this definition")

Usable only with [`-E`](#cmdoption-E). Do not copy the preprocessed content of “system” headers to the output; instead, preserve the #include directive. This can greatly reduce the volume of text produced by [`-E`](#cmdoption-E) which can be helpful when trying to produce a “small” reproduceable test case.

This option does not guarantee reproduceability, however. If the including source defines preprocessor symbols that influence the behavior of system headers (for example, `_XOPEN_SOURCE`) the operation of [`-E`](#cmdoption-E) will remove that definition and thus can change the semantics of the included header. Also, using a different version of the system headers (especially a different version of the STL) may result in different behavior. Always verify the preprocessed file by compiling it separately.

ENVIRONMENT[¶](#environment "Link to this heading")
---------------------------------------------------

TMPDIR, TEMP, TMP[¶](#envvar-TMPDIR-TEMP-TMP "Link to this definition")

These environment variables are checked, in order, for the location to write temporary files used during the compilation process.

CPATH[¶](#envvar-CPATH "Link to this definition")

This environment variable specifies additional (non-system) header search paths to be used to find included header files. These paths are searched after paths specified with the [`-I<directory>`](#cmdoption-I-directory) option, but before any system header search paths. Paths are delimited by the platform dependent delimiter as used in the `PATH` environment variable. Empty entries in the delimited path list, including those at the beginning or end of the list, are treated as specifying the compiler’s current working directory.

C\_INCLUDE\_PATH, OBJC\_INCLUDE\_PATH, CPLUS\_INCLUDE\_PATH, OBJCPLUS\_INCLUDE\_PATH[¶](#envvar-C_INCLUDE_PATH-OBJC_INCLUDE_PATH-CPLUS_INCLUDE_PATH-OBJCPLUS_INCLUDE_PATH "Link to this definition")

These environment variables specify additional system header file search paths to be used when processing the corresponding language. Search paths are delimited as for the [`CPATH`](#envvar-CPATH) environment variable.

MACOSX\_DEPLOYMENT\_TARGET[¶](#envvar-MACOSX_DEPLOYMENT_TARGET "Link to this definition")

If [`-mmacos-version-min`](#cmdoption-mmacos-version-min) is unspecified, the default deployment target is read from this environment variable. This option only affects Darwin targets.

BUGS[¶](#bugs "Link to this heading")
-------------------------------------

To report bugs, please visit <[https://github.com/llvm/llvm-project/issues/](https://github.com/llvm/llvm-project/issues/)\>. Most bug reports should include preprocessed source files (use the [`-E`](#cmdoption-E) option) and the full output of the compiler, along with information to reproduce.

SEE ALSO[¶](#see-also "Link to this heading")
---------------------------------------------

_as(1)_, _ld(1)_