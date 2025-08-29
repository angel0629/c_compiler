---
title: "Clang command line argument reference — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/ClangCommandLineReference.html#cmdoption-clang-ftime-trace"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
*   [Introduction](#introduction)
    
*   [Actions](#actions)
    
*   [Compilation options](#compilation-options)
    
    *   [Preprocessor options](#preprocessor-options)
        
        *   [Include path management](#include-path-management)
            
        *   [Dependency file generation](#dependency-file-generation)
            
        *   [Dumping preprocessor state](#dumping-preprocessor-state)
            
    *   [Diagnostic options](#diagnostic-options)
        
    *   [Target-independent compilation options](#target-independent-compilation-options)
        
        *   [Common Offloading options](#common-offloading-options)
            
        *   [OpenCL options](#opencl-options)
            
        *   [SYCL options](#sycl-options)
            
        *   [CUDA options](#cuda-options)
            
        *   [HIP options](#hip-options)
            
        *   [HLSL options](#hlsl-options)
            
    *   [Target-dependent compilation options](#target-dependent-compilation-options)
        
        *   [AARCH64](#aarch64)
            
        *   [AMDGPU](#amdgpu)
            
        *   [ARM](#arm)
            
        *   [Hexagon](#hexagon)
            
        *   [SPARC](#sparc)
            
        *   [Hexagon](#id1)
            
        *   [M68k](#m68k)
            
        *   [MIPS](#mips)
            
        *   [PowerPC](#powerpc)
            
        *   [WebAssembly](#webassembly)
            
        *   [WebAssembly Driver](#webassembly-driver)
            
        *   [X86](#x86)
            
        *   [X86 AVX10](#x86-avx10)
            
        *   [RISC-V](#risc-v)
            
        *   [VE](#ve)
            
        *   [LoongArch](#loongarch)
            
        *   [Long double options](#long-double-options)
            
    *   [Optimization level](#optimization-level)
        
    *   [Debug information generation](#debug-information-generation)
        
        *   [Kind and level of debug information](#kind-and-level-of-debug-information)
            
            *   [Debug level](#debug-level)
                
            *   [Debugger to tune debug information for](#debugger-to-tune-debug-information-for)
                
        *   [Debug information options](#debug-information-options)
            
*   [Static analyzer options](#static-analyzer-options)
    
*   [Fortran compilation options](#fortran-compilation-options)
    
*   [Linker options](#linker-options)
    
*   [clang-dxc options](#clang-dxc-options)
    

[Introduction](#id2)[¶](#introduction "Link to this heading")
-------------------------------------------------------------

This page lists the command line arguments currently supported by the GCC-compatible `clang` and `clang++` drivers.

\-B<prefix>, \--prefix <arg>, \--prefix\=<arg>[¶](#cmdoption-clang-B-prefix "Link to this definition")

Search $prefix$file for executables, libraries, and data files. If $prefix is a directory, search $prefix/$file

\-F<arg>[¶](#cmdoption-clang-F-arg "Link to this definition")

Add directory to framework include search path

\-K[¶](#cmdoption-clang-K "Link to this definition")

\-ObjC[¶](#cmdoption-clang-ObjC "Link to this definition")

Treat source input files as Objective-C inputs

\-ObjC++[¶](#cmdoption-clang1-ObjC "Link to this definition")

Treat source input files as Objective-C++ inputs

\-Qn, \-fno-ident[¶](#cmdoption-clang-Qn "Link to this definition")

Do not emit metadata containing compiler name and version

\-Qunused-arguments[¶](#cmdoption-clang-Qunused-arguments "Link to this definition")

Don’t emit warning for unused driver arguments

\-Qy, \-fident[¶](#cmdoption-clang-Qy "Link to this definition")

Emit metadata containing compiler name and version

\-Wa,<arg>,<arg2>...[¶](#cmdoption-clang-Wa-arg-arg2-... "Link to this definition")

Pass the comma separated arguments in <arg> to the assembler

\-Wlarge-by-value-copy\=<arg>[¶](#cmdoption-clang-Wlarge-by-value-copy "Link to this definition")

\-Xarch\_<arch> <arg>[¶](#cmdoption-clang-Xarch_-arch "Link to this definition")

Specifies that the argument should only be used if the compilation

target matches the specified architecture. This can be used with the target CPU, triple architecture, or offloading host and device. It is most useful for separating behavior undesirable on one of the targets when combining many compilation jobs, as is common with offloading. For example, -Xarch\_x86\_64, -Xarch\_gfx90a, and -Xarch\_device are all valid selectors. -Xarch\_device will forward the argument to the offloading device while -Xarch\_host will target the host system, which can be used to suppress incompatible GPU arguments.

\-Xarch\_device <arg>[¶](#cmdoption-clang1-Xarch_device "Link to this definition")

Pass <arg> to the CUDA/HIP device compilation

\-Xarch\_host <arg>[¶](#cmdoption-clang2-Xarch_host "Link to this definition")

Pass <arg> to the CUDA/HIP host compilation

\-Xcuda-fatbinary <arg>[¶](#cmdoption-clang-Xcuda-fatbinary "Link to this definition")

Pass <arg> to fatbinary invocation

\-Xcuda-ptxas <arg>[¶](#cmdoption-clang-Xcuda-ptxas "Link to this definition")

Pass <arg> to the ptxas assembler

\-alias\_list <arg>[¶](#cmdoption-clang-alias_list "Link to this definition")

\-all\_load[¶](#cmdoption-clang-all_load "Link to this definition")

\-allowable\_client <arg>[¶](#cmdoption-clang-allowable_client "Link to this definition")

\--analyze[¶](#cmdoption-clang-analyze "Link to this definition")

Run the static analyzer

\--analyzer-no-default-checks[¶](#cmdoption-clang-analyzer-no-default-checks "Link to this definition")

\--analyzer-output<arg>[¶](#cmdoption-clang-analyzer-output-arg "Link to this definition")

Static analyzer report output format (html|plist|plist-multi-file|plist-html|sarif|sarif-html|text).

\-arch <arg>[¶](#cmdoption-clang-arch "Link to this definition")

\-arch\_errors\_fatal[¶](#cmdoption-clang1-arch_errors_fatal "Link to this definition")

\-arch\_only <arg>[¶](#cmdoption-clang2-arch_only "Link to this definition")

\--autocomplete\=<arg>[¶](#cmdoption-clang-autocomplete "Link to this definition")

\-bind\_at\_load[¶](#cmdoption-clang-bind_at_load "Link to this definition")

\-bundle[¶](#cmdoption-clang-bundle "Link to this definition")

\-bundle\_loader <arg>[¶](#cmdoption-clang1-bundle_loader "Link to this definition")

\-clangir-disable-passes[¶](#cmdoption-clang-clangir-disable-passes "Link to this definition")

Disable CIR transformations pipeline

\-clangir-disable-verifier[¶](#cmdoption-clang-clangir-disable-verifier "Link to this definition")

ClangIR: Disable MLIR module verifier

\-client\_name<arg>[¶](#cmdoption-clang-client_name-arg "Link to this definition")

\-compatibility\_version<arg>[¶](#cmdoption-clang-compatibility_version-arg "Link to this definition")

\--config\=<file>, \--config <arg>[¶](#cmdoption-clang-config "Link to this definition")

Specify configuration file

\--constant-cfstrings[¶](#cmdoption-clang-constant-cfstrings "Link to this definition")

\-current\_version<arg>[¶](#cmdoption-clang-current_version-arg "Link to this definition")

\-darwin-target-variant <arg>[¶](#cmdoption-clang-darwin-target-variant "Link to this definition")

Generate code for an additional runtime variant of the deployment target

\-darwin-target-variant-triple <arg>[¶](#cmdoption-clang-darwin-target-variant-triple "Link to this definition")

Specify the darwin target variant triple

\-dead\_strip[¶](#cmdoption-clang-dead_strip "Link to this definition")

\-dependency-dot <arg>[¶](#cmdoption-clang-dependency-dot "Link to this definition")

Filename to write DOT-formatted header dependencies to

\-dependency-file <arg>[¶](#cmdoption-clang-dependency-file "Link to this definition")

Filename (or -) to write dependency output to

\-dsym-dir<dir>[¶](#cmdoption-clang-dsym-dir-dir "Link to this definition")

Directory to output dSYM’s (if any) to

\-dumpdir <dumppfx>[¶](#cmdoption-clang-dumpdir "Link to this definition")

Use <dumpfpx> as a prefix to form auxiliary and dump file names

\-dumpmachine[¶](#cmdoption-clang-dumpmachine "Link to this definition")

Display the compiler’s target processor

\-dumpversion[¶](#cmdoption-clang-dumpversion "Link to this definition")

Display the version of the compiler

\--dyld-prefix\=<arg>, \--dyld-prefix <arg>[¶](#cmdoption-clang-dyld-prefix "Link to this definition")

\-dylib\_file <arg>[¶](#cmdoption-clang-dylib_file "Link to this definition")

\-dylinker[¶](#cmdoption-clang-dylinker "Link to this definition")

\-dylinker\_install\_name<arg>[¶](#cmdoption-clang1-dylinker_install_name-arg "Link to this definition")

\-dynamic[¶](#cmdoption-clang-dynamic "Link to this definition")

\-dynamiclib[¶](#cmdoption-clang-dynamiclib "Link to this definition")

\-emit-ast[¶](#cmdoption-clang-emit-ast "Link to this definition")

Emit Clang AST files for source inputs

\--emit-extension-symbol-graphs[¶](#cmdoption-clang-emit-extension-symbol-graphs "Link to this definition")

Generate additional symbol graphs for extended modules.

\--emit-static-lib[¶](#cmdoption-clang-emit-static-lib "Link to this definition")

Enable linker job to emit a static library.

\-emit-symbol-graph[¶](#cmdoption-clang-emit-symbol-graph "Link to this definition")

Generate Extract API information as a side effect of compilation.

\--end-no-unused-arguments[¶](#cmdoption-clang-end-no-unused-arguments "Link to this definition")

Start emitting warnings for unused driver arguments

\-exported\_symbols\_list <arg>[¶](#cmdoption-clang-exported_symbols_list "Link to this definition")

Comma separated list of files containing a new line separated list of API symbols to ignore when extracting API information.

\-faligned-new\=<arg>[¶](#cmdoption-clang-faligned-new "Link to this definition")

\-fautomatic[¶](#cmdoption-clang-fautomatic "Link to this definition")

\-fcheck-new, \-fno-check-new[¶](#cmdoption-clang-fcheck-new "Link to this definition")

Do not assume C++ operator new may not return NULL

\-fconvergent-functions, \-fno-convergent-functions[¶](#cmdoption-clang-fconvergent-functions "Link to this definition")

Assume all functions may be convergent.

\-fcx-fortran-rules, \-fno-cx-fortran-rules[¶](#cmdoption-clang-fcx-fortran-rules "Link to this definition")

Range reduction is enabled for complex arithmetic operations.

\-fcx-limited-range, \-fno-cx-limited-range[¶](#cmdoption-clang-fcx-limited-range "Link to this definition")

Basic algebraic expansions of complex arithmetic operations involving are enabled.

\-ffinite-math-only, \-fno-finite-math-only[¶](#cmdoption-clang-ffinite-math-only "Link to this definition")

Allow floating-point optimizations that assume arguments and results are not NaNs or +-inf. This defines the \\\_\\\_FINITE\\\_MATH\\\_ONLY\\\_\\\_ preprocessor macro.

\-finit-global-zero, \-fno-init-global-zero[¶](#cmdoption-clang-finit-global-zero "Link to this definition")

Zero initialize globals without default initialization (default)

\-flat\_namespace[¶](#cmdoption-clang-flat_namespace "Link to this definition")

\-fmodule-output[¶](#cmdoption-clang-fmodule-output "Link to this definition")

Save intermediate module file results when compiling a standard C++ module unit.

\-fmodule-output\=<arg>[¶](#cmdoption-clang1-fmodule-output "Link to this definition")

Save intermediate module file results when compiling a standard C++ module unit.

\-fmodules-embed-all-files<arg>[¶](#cmdoption-clang-fmodules-embed-all-files-arg "Link to this definition")

Embed the contents of all files read by this compilation into the produced module file.

\-fmodules-reduced-bmi, \-fexperimental-modules-reduced-bmi, \-fno-modules-reduced-bmi[¶](#cmdoption-clang-fmodules-reduced-bmi "Link to this definition")

Generate the reduced BMI

\-fmultilib-flag\=<arg>, \--fmultilib-flag\=<arg>[¶](#cmdoption-clang-fmultilib-flag "Link to this definition")

\-force\_cpusubtype\_ALL[¶](#cmdoption-clang-force_cpusubtype_ALL "Link to this definition")

\-force\_flat\_namespace[¶](#cmdoption-clang1-force_flat_namespace "Link to this definition")

\-force\_load <arg>[¶](#cmdoption-clang2-force_load "Link to this definition")

\-fplugin-arg-<name>-<arg>[¶](#cmdoption-clang-fplugin-arg-name-arg "Link to this definition")

Pass <arg> to plugin <name>

\-framework <arg>[¶](#cmdoption-clang-framework "Link to this definition")

\-frtlib-add-rpath, \-fno-rtlib-add-rpath, \--no-offload-add-rpath, \--offload-add-rpath[¶](#cmdoption-clang-frtlib-add-rpath "Link to this definition")

Add -rpath with architecture-specific resource directory to the linker flags. When –hip-link is specified, also add -rpath with HIP runtime library directory to the linker flags

\-fsanitize-system-ignorelist\=<arg>[¶](#cmdoption-clang-fsanitize-system-ignorelist "Link to this definition")

Path to system ignorelist file for sanitizers

\-fsanitize-undefined-ignore-overflow-pattern\=<arg1>,<arg2>...[¶](#cmdoption-clang-fsanitize-undefined-ignore-overflow-pattern "Link to this definition")

Specify the overflow patterns to exclude from arithmetic sanitizer instrumentation. <arg> must be ‘none’, ‘all’, ‘add-unsigned-overflow-test’, ‘add-signed-overflow-test’, ‘negated-unsigned-const’ or ‘unsigned-post-decr-while’.

\-fshow-skipped-includes[¶](#cmdoption-clang-fshow-skipped-includes "Link to this definition")

#include files may be “skipped” due to include guard optimization

or #pragma once. This flag makes -H show also such includes.

\-fsystem-module[¶](#cmdoption-clang-fsystem-module "Link to this definition")

Build this module as a system module. Only used with -emit-module

\--gcc-install-dir\=<arg>[¶](#cmdoption-clang-gcc-install-dir "Link to this definition")

Use GCC installation in the specified directory. The directory ends with path components like ‘lib{,32,64}/gcc{,-cross}/$triple/$version’. Note: executables (e.g. ld) used by the compiler are not overridden by the selected GCC installation

\--gcc-toolchain\=<arg>[¶](#cmdoption-clang-gcc-toolchain "Link to this definition")

Specify a directory where Clang can find ‘include’ and ‘lib{,32,64}/gcc{,-cross}/$triple/$version’. Clang will use the GCC installation with the largest version

\--gcc-triple\=<arg>[¶](#cmdoption-clang-gcc-triple "Link to this definition")

Search for the GCC installation with the specified triple.

\-gcodeview[¶](#cmdoption-clang-gcodeview "Link to this definition")

Generate CodeView debug information

\-gcodeview-command-line, \-gno-codeview-command-line[¶](#cmdoption-clang-gcodeview-command-line "Link to this definition")

Emit compiler path and command line into CodeView debug information

\-gcodeview-ghash, \-gno-codeview-ghash[¶](#cmdoption-clang-gcodeview-ghash "Link to this definition")

Emit type record hashes in a .debug$H section

\-gen-reproducer\=<arg>, \-fno-crash-diagnostics (equivalent to \-gen-reproducer=off)[¶](#cmdoption-clang-gen-reproducer "Link to this definition")

Emit reproducer on (option: off, crash (default), error, always)

\-gpulibc[¶](#cmdoption-clang-gpulibc "Link to this definition")

Link the LLVM C Library for GPUs

\-help, \--help[¶](#cmdoption-clang-help "Link to this definition")

Display available options

\--help-hidden[¶](#cmdoption-clang-help-hidden "Link to this definition")

Display help for hidden options

\-image\_base <arg>[¶](#cmdoption-clang-image_base "Link to this definition")

\-init <arg>[¶](#cmdoption-clang-init "Link to this definition")

\-install\_name <arg>[¶](#cmdoption-clang-install_name "Link to this definition")

\-interface-stub-version\=<arg>[¶](#cmdoption-clang-interface-stub-version "Link to this definition")

\-keep\_private\_externs[¶](#cmdoption-clang-keep_private_externs "Link to this definition")

\-lazy\_framework <arg>[¶](#cmdoption-clang-lazy_framework "Link to this definition")

\-lazy\_library <arg>[¶](#cmdoption-clang1-lazy_library "Link to this definition")

\-m3dnow, \-mno-3dnow[¶](#cmdoption-clang-m3dnow "Link to this definition")

\-m3dnowa, \-mno-3dnowa[¶](#cmdoption-clang-m3dnowa "Link to this definition")

\-mllvm <arg>, \-mllvm\=<arg>[¶](#cmdoption-clang-mllvm "Link to this definition")

Additional arguments to forward to LLVM’s option processing

\-mmlir <arg>[¶](#cmdoption-clang-mmlir "Link to this definition")

Additional arguments to forward to MLIR’s option processing

\-module-dependency-dir <arg>[¶](#cmdoption-clang-module-dependency-dir "Link to this definition")

Directory to dump module dependencies to

\-mtvos-simulator-version-min\=<arg>, \-mappletvsimulator-version-min\=<arg>[¶](#cmdoption-clang-mtvos-simulator-version-min "Link to this definition")

\-multi-lib-config\=<file>, \--multi-lib-config\=<file>[¶](#cmdoption-clang-multi-lib-config "Link to this definition")

Path to the YAML configuration file to be used for multilib selection

\-multi\_module[¶](#cmdoption-clang-multi_module "Link to this definition")

\-multiply\_defined <arg>[¶](#cmdoption-clang-multiply_defined "Link to this definition")

\-multiply\_defined\_unused <arg>[¶](#cmdoption-clang1-multiply_defined_unused "Link to this definition")

\-mzos-hlq-clang\=<ClangHLQ>[¶](#cmdoption-clang-mzos-hlq-clang "Link to this definition")

High level qualifier for z/OS C++RT side deck datasets

\-mzos-hlq-csslib\=<CsslibHLQ>[¶](#cmdoption-clang-mzos-hlq-csslib "Link to this definition")

High level qualifier for z/OS CSSLIB dataset

\-mzos-hlq-le\=<LeHLQ>[¶](#cmdoption-clang-mzos-hlq-le "Link to this definition")

High level qualifier for z/OS Language Environment datasets

\-mzos-sys-include\=<SysInclude>[¶](#cmdoption-clang-mzos-sys-include "Link to this definition")

Path to system headers on z/OS

\--no-default-config[¶](#cmdoption-clang-no-default-config "Link to this definition")

Disable loading default configuration files

\-no-integrated-cpp, \--no-integrated-cpp[¶](#cmdoption-clang-no-integrated-cpp "Link to this definition")

\-no\_dead\_strip\_inits\_and\_terms[¶](#cmdoption-clang-no_dead_strip_inits_and_terms "Link to this definition")

\-nodefaultlibs[¶](#cmdoption-clang-nodefaultlibs "Link to this definition")

\-nodriverkitlib[¶](#cmdoption-clang-nodriverkitlib "Link to this definition")

\-nofixprebinding[¶](#cmdoption-clang-nofixprebinding "Link to this definition")

\-nogpulibc[¶](#cmdoption-clang-nogpulibc "Link to this definition")

\-nolibc[¶](#cmdoption-clang-nolibc "Link to this definition")

\-nomultidefs[¶](#cmdoption-clang-nomultidefs "Link to this definition")

\-nopie[¶](#cmdoption-clang-nopie "Link to this definition")

\-noprebind[¶](#cmdoption-clang-noprebind "Link to this definition")

\-noprofilelib[¶](#cmdoption-clang-noprofilelib "Link to this definition")

\-noseglinkedit[¶](#cmdoption-clang-noseglinkedit "Link to this definition")

\-nostdlib++[¶](#cmdoption-clang-nostdlib "Link to this definition")

\-o<file>, \--output <arg>, \--output\=<arg>[¶](#cmdoption-clang-o-file "Link to this definition")

Write output to <file>

\-object[¶](#cmdoption-clang-object "Link to this definition")

\-object-file-name\=<file>, \-object-file-name <arg>[¶](#cmdoption-clang-object-file-name "Link to this definition")

Set the output <file> for debug infos

\--offloadlib, \--no-offloadlib[¶](#cmdoption-clang-offloadlib "Link to this definition")

Link device libraries for GPU device compilation

\-p, \--profile[¶](#cmdoption-clang-p "Link to this definition")

Enable mcount instrumentation with prof

\-pagezero\_size<arg>[¶](#cmdoption-clang-pagezero_size-arg "Link to this definition")

\-pg[¶](#cmdoption-clang-pg "Link to this definition")

Enable mcount instrumentation

\-pipe, \--pipe[¶](#cmdoption-clang-pipe "Link to this definition")

Use pipes between commands, when possible

\-prebind[¶](#cmdoption-clang-prebind "Link to this definition")

\-prebind\_all\_twolevel\_modules[¶](#cmdoption-clang1-prebind_all_twolevel_modules "Link to this definition")

\-preload[¶](#cmdoption-clang-preload "Link to this definition")

\--pretty-sgf[¶](#cmdoption-clang-pretty-sgf "Link to this definition")

Emit pretty printed symbol graphs

\--print-diagnostic-categories[¶](#cmdoption-clang-print-diagnostic-categories "Link to this definition")

\-print-diagnostic-options, \--print-diagnostic-options[¶](#cmdoption-clang-print-diagnostic-options "Link to this definition")

Print all of Clang’s warning options

\-print-effective-triple, \--print-effective-triple[¶](#cmdoption-clang-print-effective-triple "Link to this definition")

Print the effective target triple

\-print-enabled-extensions, \--print-enabled-extensions[¶](#cmdoption-clang-print-enabled-extensions "Link to this definition")

Print the extensions enabled by the given target and -march/-mcpu options. (AArch64 and RISC-V only)

\-print-file-name\=<file>, \--print-file-name\=<file>, \--print-file-name <arg>[¶](#cmdoption-clang-print-file-name "Link to this definition")

Print the full library path of <file>

\-print-ivar-layout[¶](#cmdoption-clang-print-ivar-layout "Link to this definition")

Enable Objective-C Ivar layout bitmap print trace

\-print-libgcc-file-name, \--print-libgcc-file-name[¶](#cmdoption-clang-print-libgcc-file-name "Link to this definition")

Print the library path for the currently used compiler runtime library (“libgcc.a” or “libclang\_rt.builtins.\*.a”)

\-print-library-module-manifest-path, \--print-library-module-manifest-path[¶](#cmdoption-clang-print-library-module-manifest-path "Link to this definition")

Print the path for the C++ Standard library module manifest

\-print-multi-directory, \--print-multi-directory[¶](#cmdoption-clang-print-multi-directory "Link to this definition")

\-print-multi-flags-experimental, \--print-multi-flags-experimental[¶](#cmdoption-clang-print-multi-flags-experimental "Link to this definition")

Print the flags used for selecting multilibs (experimental)

\-print-multi-lib, \--print-multi-lib[¶](#cmdoption-clang-print-multi-lib "Link to this definition")

\-print-prog-name\=<name>, \--print-prog-name\=<name>, \--print-prog-name <arg>[¶](#cmdoption-clang-print-prog-name "Link to this definition")

Print the full program path of <name>

\-print-resource-dir, \--print-resource-dir[¶](#cmdoption-clang-print-resource-dir "Link to this definition")

Print the resource directory pathname

\-print-rocm-search-dirs, \--print-rocm-search-dirs[¶](#cmdoption-clang-print-rocm-search-dirs "Link to this definition")

Print the paths used for finding ROCm installation

\-print-runtime-dir, \--print-runtime-dir[¶](#cmdoption-clang-print-runtime-dir "Link to this definition")

Print the directory pathname containing Clang’s runtime libraries

\-print-search-dirs, \--print-search-dirs[¶](#cmdoption-clang-print-search-dirs "Link to this definition")

Print the paths used for finding libraries and programs

\-print-supported-extensions, \--print-supported-extensions[¶](#cmdoption-clang-print-supported-extensions "Link to this definition")

Print supported -march extensions (RISC-V, AArch64 and ARM only)

\-print-target-triple, \--print-target-triple[¶](#cmdoption-clang-print-target-triple "Link to this definition")

Print the normalized target triple

\-print-targets, \--print-targets[¶](#cmdoption-clang-print-targets "Link to this definition")

Print the registered targets

\-private\_bundle[¶](#cmdoption-clang-private_bundle "Link to this definition")

\--product-name\=<arg>[¶](#cmdoption-clang-product-name "Link to this definition")

\-pthread, \-no-pthread[¶](#cmdoption-clang-pthread "Link to this definition")

Support POSIX threads in generated code

\-pthreads[¶](#cmdoption-clang-pthreads "Link to this definition")

\-read\_only\_relocs <arg>[¶](#cmdoption-clang-read_only_relocs "Link to this definition")

\-reexport-l<arg>[¶](#cmdoption-clang-reexport-l-arg "Link to this definition")

\-reexport\_framework <arg>[¶](#cmdoption-clang-reexport_framework "Link to this definition")

\-reexport\_library<arg>[¶](#cmdoption-clang1-reexport_library-arg "Link to this definition")

\-relocatable-pch, \--relocatable-pch[¶](#cmdoption-clang-relocatable-pch "Link to this definition")

Whether to build a relocatable precompiled header

\-remap[¶](#cmdoption-clang-remap "Link to this definition")

\-rewrite-legacy-objc[¶](#cmdoption-clang-rewrite-legacy-objc "Link to this definition")

Rewrite Legacy Objective-C source to C++

\-rtlib\=<arg>, \--rtlib\=<arg>, \--rtlib <arg>[¶](#cmdoption-clang-rtlib "Link to this definition")

Compiler runtime library to use

\-save-stats\=<arg>, \--save-stats\=<arg>, \-save-stats (equivalent to \-save-stats=cwd), \--save-stats (equivalent to \-save-stats=cwd)[¶](#cmdoption-clang-save-stats "Link to this definition")

Save llvm statistics.

\-save-temps\=<arg>, \--save-temps\=<arg>, \-save-temps (equivalent to \-save-temps=cwd), \--save-temps (equivalent to \-save-temps=cwd)[¶](#cmdoption-clang-save-temps "Link to this definition")

Save intermediate compilation results. <arg> can be set to ‘cwd’ for current working directory, or ‘obj’ which will save temporary files in the same directory as the final output file

\-sectalign <arg1> <arg2> <arg3>[¶](#cmdoption-clang-sectalign "Link to this definition")

\-sectcreate <arg1> <arg2> <arg3>[¶](#cmdoption-clang-sectcreate "Link to this definition")

\-sectobjectsymbols <arg1> <arg2>[¶](#cmdoption-clang-sectobjectsymbols "Link to this definition")

\-sectorder <arg1> <arg2> <arg3>[¶](#cmdoption-clang-sectorder "Link to this definition")

\-seg1addr<arg>[¶](#cmdoption-clang-seg1addr-arg "Link to this definition")

\-seg\_addr\_table <arg>[¶](#cmdoption-clang-seg_addr_table "Link to this definition")

\-seg\_addr\_table\_filename <arg>[¶](#cmdoption-clang1-seg_addr_table_filename "Link to this definition")

\-segaddr <arg1> <arg2>[¶](#cmdoption-clang-segaddr "Link to this definition")

\-segcreate <arg1> <arg2> <arg3>[¶](#cmdoption-clang-segcreate "Link to this definition")

\-seglinkedit[¶](#cmdoption-clang-seglinkedit "Link to this definition")

\-segprot <arg1> <arg2> <arg3>[¶](#cmdoption-clang-segprot "Link to this definition")

\-segs\_read\_<arg>[¶](#cmdoption-clang-segs_read_-arg "Link to this definition")

\-segs\_read\_only\_addr <arg>[¶](#cmdoption-clang1-segs_read_only_addr "Link to this definition")

\-segs\_read\_write\_addr <arg>[¶](#cmdoption-clang2-segs_read_write_addr "Link to this definition")

\-serialize-diagnostics <arg>, \--serialize-diagnostics <arg>[¶](#cmdoption-clang-serialize-diagnostics "Link to this definition")

Serialize compiler diagnostics to a file

\-shared-libgcc[¶](#cmdoption-clang-shared-libgcc "Link to this definition")

\-shared-libsan, \-shared-libasan[¶](#cmdoption-clang-shared-libsan "Link to this definition")

Dynamically link the sanitizer runtime

\-single\_module[¶](#cmdoption-clang-single_module "Link to this definition")

\--start-no-unused-arguments[¶](#cmdoption-clang-start-no-unused-arguments "Link to this definition")

Don’t emit warnings about unused arguments for the following arguments

\-static-libclosure[¶](#cmdoption-clang-static-libclosure "Link to this definition")

Generate code for statically linking libclosure (BlocksRuntime)

\-static-libgcc[¶](#cmdoption-clang-static-libgcc "Link to this definition")

\-static-libsan, \-static-libasan[¶](#cmdoption-clang-static-libsan "Link to this definition")

Statically link the sanitizer runtime (Not supported for ASan, TSan or UBSan on darwin)

\-static-libstdc++[¶](#cmdoption-clang-static-libstdc "Link to this definition")

\-static-openmp[¶](#cmdoption-clang-static-openmp "Link to this definition")

Use the static host OpenMP runtime while linking.

\-std-default\=<arg>[¶](#cmdoption-clang-std-default "Link to this definition")

\-stdlib\=<arg>, \--stdlib\=<arg>, \--stdlib <arg>[¶](#cmdoption-clang-stdlib "Link to this definition")

C++ standard library to use. <arg> must be ‘libc++’, ‘libstdc++’ or ‘platform’.

\-sub\_library<arg>[¶](#cmdoption-clang-sub_library-arg "Link to this definition")

\-sub\_umbrella<arg>[¶](#cmdoption-clang1-sub_umbrella-arg "Link to this definition")

\--symbol-graph-dir\=<arg>[¶](#cmdoption-clang-symbol-graph-dir "Link to this definition")

Directory in which to emit symbol graphs.

\--sysroot\=<arg>, \--sysroot <arg>[¶](#cmdoption-clang-sysroot "Link to this definition")

\--target-help[¶](#cmdoption-clang-target-help "Link to this definition")

\--target\=<arg>, \-target <arg>[¶](#cmdoption-clang-target "Link to this definition")

Generate code for the given target

\-time[¶](#cmdoption-clang-time "Link to this definition")

Time individual commands

\-traditional, \--traditional[¶](#cmdoption-clang-traditional "Link to this definition")

\-traditional-cpp, \--traditional-cpp[¶](#cmdoption-clang-traditional-cpp "Link to this definition")

Enable some traditional CPP emulation

\-twolevel\_namespace[¶](#cmdoption-clang-twolevel_namespace "Link to this definition")

\-twolevel\_namespace\_hints[¶](#cmdoption-clang1-twolevel_namespace_hints "Link to this definition")

\-umbrella <arg>[¶](#cmdoption-clang-umbrella "Link to this definition")

\-unexported\_symbols\_list <arg>[¶](#cmdoption-clang-unexported_symbols_list "Link to this definition")

\-unwindlib\=<arg>, \--unwindlib\=<arg>[¶](#cmdoption-clang-unwindlib "Link to this definition")

Unwind library to use. <arg> must be ‘libgcc’, ‘libunwind’ or ‘platform’.

\-v, \--verbose[¶](#cmdoption-clang-v "Link to this definition")

Show commands to run and use verbose output

\--verify-debug-info[¶](#cmdoption-clang-verify-debug-info "Link to this definition")

Verify the binary representation of debug output

\--version[¶](#cmdoption-clang-version "Link to this definition")

Print version information

\-vfsoverlay<arg>, \--vfsoverlay<arg>[¶](#cmdoption-clang-vfsoverlay-arg "Link to this definition")

Overlay the virtual filesystem described by file over the real file system. Additionally, pass this overlay file to the linker if it supports it

\-w, \--no-warnings[¶](#cmdoption-clang-w "Link to this definition")

Suppress all warnings

\-weak-l<arg>[¶](#cmdoption-clang-weak-l-arg "Link to this definition")

\-weak\_framework <arg>[¶](#cmdoption-clang-weak_framework "Link to this definition")

\-weak\_library <arg>[¶](#cmdoption-clang1-weak_library "Link to this definition")

\-weak\_reference\_mismatches <arg>[¶](#cmdoption-clang2-weak_reference_mismatches "Link to this definition")

\-whatsloaded[¶](#cmdoption-clang-whatsloaded "Link to this definition")

\-why\_load, \-whyload[¶](#cmdoption-clang-why_load "Link to this definition")

\-working-directory <arg>, \-working-directory\=<arg>[¶](#cmdoption-clang-working-directory "Link to this definition")

Resolve file paths relative to the specified directory

\-x<language>, \--language <arg>, \--language\=<arg>[¶](#cmdoption-clang-x-language "Link to this definition")

Treat subsequent input files as having type <language>

\-y<arg>[¶](#cmdoption-clang-y-arg "Link to this definition")

[Actions](#id3)[¶](#actions "Link to this heading")
---------------------------------------------------

The action to perform on the input.

\-E, \--preprocess[¶](#cmdoption-clang-E "Link to this definition")

Only run the preprocessor

\-S, \--assemble[¶](#cmdoption-clang-S "Link to this definition")

Only run preprocess and compilation steps

\-c, \--compile[¶](#cmdoption-clang-c "Link to this definition")

Only run preprocess, compile, and assemble steps

\-emit-cir[¶](#cmdoption-clang-emit-cir "Link to this definition")

Build ASTs and then lower to ClangIR

\-emit-interface-stubs[¶](#cmdoption-clang-emit-interface-stubs "Link to this definition")

Generate Interface Stub Files.

\-emit-llvm[¶](#cmdoption-clang-emit-llvm "Link to this definition")

Use the LLVM representation for assembler and object files

\-emit-merged-ifs[¶](#cmdoption-clang-emit-merged-ifs "Link to this definition")

Generate Interface Stub Files, emit merged text not binary.

Extract API information

\-fdriver-only[¶](#cmdoption-clang-fdriver-only "Link to this definition")

Only run the driver.

\-fsyntax-only[¶](#cmdoption-clang-fsyntax-only "Link to this definition")

Run the preprocessor, parser and semantic analysis stages

\-module-file-info[¶](#cmdoption-clang-module-file-info "Link to this definition")

Provide information about a particular module file

\--precompile[¶](#cmdoption-clang-precompile "Link to this definition")

Only precompile the input

\-rewrite-objc[¶](#cmdoption-clang-rewrite-objc "Link to this definition")

Rewrite Objective-C source to C++

\-verify-pch[¶](#cmdoption-clang-verify-pch "Link to this definition")

Load and verify that a pre-compiled header file is not stale

[Compilation options](#id4)[¶](#compilation-options "Link to this heading")
---------------------------------------------------------------------------

Flags controlling the behavior of Clang during compilation. These flags have no effect during actions that do not perform compilation.

\-Xassembler <arg>[¶](#cmdoption-clang-Xassembler "Link to this definition")

Pass <arg> to the assembler

\-Xclang <arg>, \-Xclang\=<arg>[¶](#cmdoption-clang-Xclang "Link to this definition")

Pass <arg> to clang -cc1

\-Xclangas <arg>, \-Xclangas\=<arg>[¶](#cmdoption-clang-Xclangas "Link to this definition")

Pass <arg> to clang -cc1as

\-Xopenmp-target <arg>[¶](#cmdoption-clang-Xopenmp-target "Link to this definition")

Pass <arg> to the target offloading toolchain.

\-Xopenmp-target\=<triple> <arg>[¶](#cmdoption-clang1-Xopenmp-target "Link to this definition")

Pass <arg> to the target offloading toolchain identified by <triple>.

\-ansi, \--ansi[¶](#cmdoption-clang-ansi "Link to this definition")

\-fallow-runtime-check-skip-hot-cutoff\=<arg>[¶](#cmdoption-clang-fallow-runtime-check-skip-hot-cutoff "Link to this definition")

Exclude \_\_builtin\_allow\_runtime\_check for the top hottest code responsible for the given fraction of PGO counters (0.0 \[default\] = skip none; 1.0 = skip all). Argument format: <value>

\-fapinotes, \-fno-apinotes[¶](#cmdoption-clang-fapinotes "Link to this definition")

Enable external API notes support

\-fapinotes-modules, \-fno-apinotes-modules[¶](#cmdoption-clang-fapinotes-modules "Link to this definition")

Enable module-based external API notes support

\-fapinotes-swift-version\=<version>[¶](#cmdoption-clang-fapinotes-swift-version "Link to this definition")

Specify the Swift version to use when filtering API notes

\-fc++-abi\=<arg>[¶](#cmdoption-clang-fc-abi "Link to this definition")

C++ ABI to use. This will override the target C++ ABI.

\-fclang-abi-compat\=<version>[¶](#cmdoption-clang-fclang-abi-compat "Link to this definition")

Attempt to match the ABI of Clang <version>. <version> must be ‘<major>.<minor>’ or ‘latest’.

\-fcomment-block-commands\=<arg>,<arg2>...[¶](#cmdoption-clang-fcomment-block-commands "Link to this definition")

Treat each comma separated argument in <arg> as a documentation comment block command

\-fcomplete-member-pointers, \-fno-complete-member-pointers[¶](#cmdoption-clang-fcomplete-member-pointers "Link to this definition")

Require member pointer base types to be complete if they would be significant under the Microsoft ABI

\-fcrash-diagnostics-dir\=<dir>[¶](#cmdoption-clang-fcrash-diagnostics-dir "Link to this definition")

Put crash-report files in <dir>

\-fcrash-diagnostics\=<arg>, \-fcrash-diagnostics (equivalent to \-fcrash-diagnostics=compiler)[¶](#cmdoption-clang-fcrash-diagnostics "Link to this definition")

Set level of crash diagnostic reporting, (option: off, compiler, all)

\-fdeclspec, \-fno-declspec[¶](#cmdoption-clang-fdeclspec "Link to this definition")

Allow \_\_declspec as a keyword

\-fdepfile-entry\=<arg>[¶](#cmdoption-clang-fdepfile-entry "Link to this definition")

\-fdiagnostics-fixit-info, \-fno-diagnostics-fixit-info[¶](#cmdoption-clang-fdiagnostics-fixit-info "Link to this definition")

\-fdiagnostics-format\=<arg>[¶](#cmdoption-clang-fdiagnostics-format "Link to this definition")

\-fdiagnostics-parseable-fixits[¶](#cmdoption-clang-fdiagnostics-parseable-fixits "Link to this definition")

Print fix-its in machine parseable form

\-fdiagnostics-print-source-range-info[¶](#cmdoption-clang-fdiagnostics-print-source-range-info "Link to this definition")

Print source range spans in numeric form

\-fdiagnostics-show-category\=<arg>[¶](#cmdoption-clang-fdiagnostics-show-category "Link to this definition")

\-fdiscard-value-names, \-fno-discard-value-names[¶](#cmdoption-clang-fdiscard-value-names "Link to this definition")

Discard value names in LLVM IR

\-fexperimental-relative-c++-abi-vtables, \-fno-experimental-relative-c++-abi-vtables[¶](#cmdoption-clang-fexperimental-relative-c-abi-vtables "Link to this definition")

Use the experimental C++ class ABI for classes with virtual tables

\-fexperimental-strict-floating-point[¶](#cmdoption-clang-fexperimental-strict-floating-point "Link to this definition")

Enables the use of non-default rounding modes and non-default exception handling on targets that are not currently ready.

\-ffine-grained-bitfield-accesses, \-fno-fine-grained-bitfield-accesses[¶](#cmdoption-clang-ffine-grained-bitfield-accesses "Link to this definition")

Use separate accesses for consecutive bitfield runs with legal widths and alignments.

\-fglobal-isel, \-fexperimental-isel, \-fno-global-isel[¶](#cmdoption-clang-fglobal-isel "Link to this definition")

Enables the global instruction selector

\-finline-functions, \-fno-inline-functions[¶](#cmdoption-clang-finline-functions "Link to this definition")

Inline suitable functions

\-finline-hint-functions[¶](#cmdoption-clang-finline-hint-functions "Link to this definition")

Inline functions which are (explicitly or implicitly) marked inline

\-fno-sanitize-ignorelist[¶](#cmdoption-clang-fno-sanitize-ignorelist "Link to this definition")

Don’t use ignorelist file for sanitizers

\-frandomize-layout-seed-file\=<file>[¶](#cmdoption-clang-frandomize-layout-seed-file "Link to this definition")

File holding the seed used by the randomize structure layout feature

\-frandomize-layout-seed\=<seed>[¶](#cmdoption-clang-frandomize-layout-seed "Link to this definition")

The seed used by the randomize structure layout feature

\-fsanitize-address-destructor\=<arg>[¶](#cmdoption-clang-fsanitize-address-destructor "Link to this definition")

Set the kind of module destructors emitted by AddressSanitizer instrumentation. These destructors are emitted to unregister instrumented global variables when code is unloaded (e.g. via \`dlclose()\`). <arg> must be ‘none’ or ‘global’.

\-fsanitize-address-field-padding\=<arg>[¶](#cmdoption-clang-fsanitize-address-field-padding "Link to this definition")

Level of field padding for AddressSanitizer

\-fsanitize-address-globals-dead-stripping, \-fno-sanitize-address-globals-dead-stripping[¶](#cmdoption-clang-fsanitize-address-globals-dead-stripping "Link to this definition")

Enable linker dead stripping of globals in AddressSanitizer

\-fsanitize-address-outline-instrumentation, \-fno-sanitize-address-outline-instrumentation[¶](#cmdoption-clang-fsanitize-address-outline-instrumentation "Link to this definition")

Always generate function calls for address sanitizer instrumentation

\-fsanitize-address-poison-custom-array-cookie, \-fno-sanitize-address-poison-custom-array-cookie[¶](#cmdoption-clang-fsanitize-address-poison-custom-array-cookie "Link to this definition")

Enable “poisoning” array cookies when allocating arrays with a custom operator new\[\] in Address Sanitizer, preventing accesses to the cookies from user code. An array cookie is a small implementation-defined header added to certain array allocations to record metadata such as the length of the array. Accesses to array cookies from user code are technically allowed by the standard but are more likely to be the result of an out-of-bounds array access.

An operator new\[\] is “custom” if it is not one of the allocation functions provided by the C++ standard library. Array cookies from non-custom allocation functions are always poisoned.

\-fsanitize-address-use-after-return\=<mode>[¶](#cmdoption-clang-fsanitize-address-use-after-return "Link to this definition")

Select the mode of detecting stack use-after-return in AddressSanitizer. <mode> must be ‘never’, ‘runtime’ or ‘always’.

\-fsanitize-address-use-after-scope, \-fno-sanitize-address-use-after-scope[¶](#cmdoption-clang-fsanitize-address-use-after-scope "Link to this definition")

Enable use-after-scope detection in AddressSanitizer

\-fsanitize-address-use-odr-indicator, \-fno-sanitize-address-use-odr-indicator[¶](#cmdoption-clang-fsanitize-address-use-odr-indicator "Link to this definition")

Enable ODR indicator globals to avoid false ODR violation reports in partially sanitized programs at the cost of an increase in binary size

\-fsanitize-annotate-debug-info\=<arg1>,<arg2>..., \-fno-sanitize-annotate-debug-info\=<arg1>,<arg2>..., \-fsanitize-annotate-debug-info (equivalent to \-fsanitize-annotate-debug-info=all)[¶](#cmdoption-clang-fsanitize-annotate-debug-info "Link to this definition")

Annotate sanitizer instrumentation with extra debug info for the specified sanitizers, if supported

\-fsanitize-cfi-canonical-jump-tables, \-fno-sanitize-cfi-canonical-jump-tables[¶](#cmdoption-clang-fsanitize-cfi-canonical-jump-tables "Link to this definition")

Make the jump table addresses canonical in the symbol table

\-fsanitize-cfi-cross-dso, \-fno-sanitize-cfi-cross-dso[¶](#cmdoption-clang-fsanitize-cfi-cross-dso "Link to this definition")

Enable control flow integrity (CFI) checks for cross-DSO calls.

\-fsanitize-cfi-icall-experimental-normalize-integers[¶](#cmdoption-clang-fsanitize-cfi-icall-experimental-normalize-integers "Link to this definition")

Normalize integers in CFI indirect call type signature checks

\-fsanitize-cfi-icall-generalize-pointers[¶](#cmdoption-clang-fsanitize-cfi-icall-generalize-pointers "Link to this definition")

Generalize pointers in CFI indirect call type signature checks

\-fsanitize-coverage-allowlist\=<arg>[¶](#cmdoption-clang-fsanitize-coverage-allowlist "Link to this definition")

Restrict sanitizer coverage instrumentation exclusively to modules and functions that match the provided special case list, except the blocked ones

\-fsanitize-coverage-ignorelist\=<arg>[¶](#cmdoption-clang-fsanitize-coverage-ignorelist "Link to this definition")

Disable sanitizer coverage instrumentation for modules and functions that match the provided special case list, even the allowed ones

\-fsanitize-coverage-stack-depth-callback-min\=<M>[¶](#cmdoption-clang-fsanitize-coverage-stack-depth-callback-min "Link to this definition")

Use callback for max stack depth tracing with minimum stack depth M

\-fsanitize-coverage\=<arg1>,<arg2>..., \-fno-sanitize-coverage\=<arg1>,<arg2>...[¶](#cmdoption-clang-fsanitize-coverage "Link to this definition")

Specify the type of coverage instrumentation for Sanitizers

\-fsanitize-hwaddress-abi\=<arg>[¶](#cmdoption-clang-fsanitize-hwaddress-abi "Link to this definition")

Select the HWAddressSanitizer ABI to target (interceptor or platform, default interceptor). This option is currently unused.

\-fsanitize-hwaddress-experimental-aliasing, \-fno-sanitize-hwaddress-experimental-aliasing[¶](#cmdoption-clang-fsanitize-hwaddress-experimental-aliasing "Link to this definition")

Enable aliasing mode in HWAddressSanitizer

\-fsanitize-ignorelist\=<arg>[¶](#cmdoption-clang-fsanitize-ignorelist "Link to this definition")

Path to ignorelist file for sanitizers

\-fsanitize-kcfi-arity[¶](#cmdoption-clang-fsanitize-kcfi-arity "Link to this definition")

Embed function arity information into the KCFI patchable function prefix

\-fsanitize-link-c++-runtime, \-fno-sanitize-link-c++-runtime[¶](#cmdoption-clang-fsanitize-link-c-runtime "Link to this definition")

\-fsanitize-link-runtime, \-fno-sanitize-link-runtime[¶](#cmdoption-clang-fsanitize-link-runtime "Link to this definition")

\-fsanitize-memory-track-origins\=<arg>, \-fsanitize-memory-track-origins (equivalent to \-fsanitize-memory-track-origins=2)[¶](#cmdoption-clang-fsanitize-memory-track-origins "Link to this definition")

Enable origins tracking in MemorySanitizer

\-fsanitize-memory-use-after-dtor, \-fno-sanitize-memory-use-after-dtor[¶](#cmdoption-clang-fsanitize-memory-use-after-dtor "Link to this definition")

Enable use-after-destroy detection in MemorySanitizer

\-fsanitize-memtag-mode\=<arg>[¶](#cmdoption-clang-fsanitize-memtag-mode "Link to this definition")

Set default MTE mode to ‘sync’ (default) or ‘async’

\-fsanitize-merge\=<arg1>,<arg2>..., \-fno-sanitize-merge\=<arg1>,<arg2>..., \-fsanitize-merge (equivalent to \-fsanitize-merge=all)[¶](#cmdoption-clang-fsanitize-merge "Link to this definition")

Allow compiler to merge handlers for specified sanitizers

\-fsanitize-minimal-runtime, \-fno-sanitize-minimal-runtime[¶](#cmdoption-clang-fsanitize-minimal-runtime "Link to this definition")

\-fsanitize-recover\=<arg1>,<arg2>..., \-fno-sanitize-recover\=<arg1>,<arg2>..., \-fsanitize-recover (equivalent to \-fsanitize-recover=all)[¶](#cmdoption-clang-fsanitize-recover "Link to this definition")

Enable recovery for specified sanitizers

\-fsanitize-skip-hot-cutoff\=<arg1>,<arg2>...[¶](#cmdoption-clang-fsanitize-skip-hot-cutoff "Link to this definition")

Exclude sanitization for the top hottest code responsible for the given fraction of PGO counters (0.0 \[default\] = skip none; 1.0 = skip all). Argument format: <sanitizer1>=<value1>,<sanitizer2>=<value2>,…

\-fsanitize-stats, \-fno-sanitize-stats[¶](#cmdoption-clang-fsanitize-stats "Link to this definition")

Enable sanitizer statistics gathering.

\-fsanitize-thread-atomics, \-fno-sanitize-thread-atomics[¶](#cmdoption-clang-fsanitize-thread-atomics "Link to this definition")

Enable atomic operations instrumentation in ThreadSanitizer (default)

\-fsanitize-thread-func-entry-exit, \-fno-sanitize-thread-func-entry-exit[¶](#cmdoption-clang-fsanitize-thread-func-entry-exit "Link to this definition")

Enable function entry/exit instrumentation in ThreadSanitizer (default)

\-fsanitize-thread-memory-access, \-fno-sanitize-thread-memory-access[¶](#cmdoption-clang-fsanitize-thread-memory-access "Link to this definition")

Enable memory access instrumentation in ThreadSanitizer (default)

\-fsanitize-trap\=<arg1>,<arg2>..., \-fno-sanitize-trap\=<arg1>,<arg2>..., \-fsanitize-trap (equivalent to \-fsanitize-trap=all), \-fsanitize-undefined-trap-on-error (equivalent to \-fsanitize-trap=undefined)[¶](#cmdoption-clang-fsanitize-trap "Link to this definition")

Enable trapping for specified sanitizers

\-fsanitize-undefined-strip-path-components\=<number>[¶](#cmdoption-clang-fsanitize-undefined-strip-path-components "Link to this definition")

Strip (or keep only, if negative) a given number of path components when emitting check metadata.

\-fsanitize\=<check>,<arg2>..., \-fno-sanitize\=<arg1>,<arg2>...[¶](#cmdoption-clang-fsanitize "Link to this definition")

Turn on runtime checks for various forms of undefined or suspicious behavior. See user manual for available checks

\-fswift-version-independent-apinotes, \-fno-swift-version-independent-apinotes[¶](#cmdoption-clang-fswift-version-independent-apinotes "Link to this definition")

Enable version-independent external API notes support

\-fuse-lipo\=<arg>[¶](#cmdoption-clang-fuse-lipo "Link to this definition")

\-fverify-intermediate-code, \-fno-verify-intermediate-code[¶](#cmdoption-clang-fverify-intermediate-code "Link to this definition")

Enable verification of LLVM IR

\-mno-fmv[¶](#cmdoption-clang-mno-fmv "Link to this definition")

Disable function multiversioning

\-moutline, \-mno-outline[¶](#cmdoption-clang-moutline "Link to this definition")

Enable function outlining (AArch64 only)

\-moutline-atomics, \-mno-outline-atomics[¶](#cmdoption-clang-moutline-atomics "Link to this definition")

Generate local calls to out-of-line atomic operations

\--param <arg>, \--param\=<arg>[¶](#cmdoption-clang-param "Link to this definition")

\-print-supported-cpus, \--print-supported-cpus, \-mcpu\=help, \-mtune\=help[¶](#cmdoption-clang-print-supported-cpus "Link to this definition")

Print supported cpu models for the given target (if target is not specified,it will print the supported cpus for the default target)

\-std\=<arg>, \--std\=<arg>, \--std <arg>[¶](#cmdoption-clang-std "Link to this definition")

Language standard to compile for

### [Preprocessor options](#id5)[¶](#preprocessor-options "Link to this heading")

Flags controlling the behavior of the Clang preprocessor.

\-C, \--comments[¶](#cmdoption-clang-C "Link to this definition")

Include comments in preprocessed output

\-CC, \--comments-in-macros[¶](#cmdoption-clang-CC "Link to this definition")

Include comments from within macros in preprocessed output

\-D<macro>\=<value>, \--define-macro <arg>, \--define-macro\=<arg>[¶](#cmdoption-clang-D-macro "Link to this definition")

Define <macro> to <value> (or 1 if <value> omitted)

\-H, \--trace-includes[¶](#cmdoption-clang-H "Link to this definition")

Show header includes and nesting depth

\-P, \--no-line-commands[¶](#cmdoption-clang-P "Link to this definition")

Disable linemarker output in -E mode

\-U<macro>, \--undefine-macro <arg>, \--undefine-macro\=<arg>[¶](#cmdoption-clang-U-macro "Link to this definition")

Undefine macro <macro>

\-Wp,<arg>,<arg2>...[¶](#cmdoption-clang-Wp-arg-arg2-... "Link to this definition")

Pass the comma separated arguments in <arg> to the preprocessor

\-Xpreprocessor <arg>[¶](#cmdoption-clang-Xpreprocessor "Link to this definition")

Pass <arg> to the preprocessor

\--embed-dir\=<dir>[¶](#cmdoption-clang-embed-dir "Link to this definition")

Add directory to embed search path

#### [Include path management](#id6)[¶](#include-path-management "Link to this heading")

Flags controlling how `#include`s are resolved to files.

\-I<dir>, \--include-directory <arg>, \--include-directory\=<arg>[¶](#cmdoption-clang-I-dir "Link to this definition")

Add directory to include search path. For C++ inputs, if there are multiple -I options, these directories are searched in the order they are given before the standard system directories are searched. If the same directory is in the SYSTEM include search paths, for example if also specified with -isystem, the -I option will be ignored

\-I-, \--include-barrier[¶](#cmdoption-clang-I "Link to this definition")

Restrict all prior -I flags to double-quoted inclusion and remove current directory from include path

\-cxx-isystem<directory>[¶](#cmdoption-clang-cxx-isystem-directory "Link to this definition")

Add directory to the C++ SYSTEM include search path

\-fbuild-session-file\=<file>[¶](#cmdoption-clang-fbuild-session-file "Link to this definition")

Use the last modification time of <file> as the build session timestamp

\-fbuild-session-timestamp\=<time since Epoch in seconds>[¶](#cmdoption-clang-fbuild-session-timestamp "Link to this definition")

Time when the current build session started

\-fmodule-file\=\\\[<name>=\\\]<file>[¶](#cmdoption-clang-fmodule-file "Link to this definition")

Specify the mapping of module name to precompiled module file, or load a module file if name is omitted.

\-fmodules-cache-path\=<directory>[¶](#cmdoption-clang-fmodules-cache-path "Link to this definition")

Specify the module cache path

\-fmodules-disable-diagnostic-validation[¶](#cmdoption-clang-fmodules-disable-diagnostic-validation "Link to this definition")

Disable validation of the diagnostic options when loading the module

Force validation of user headers when repeatedly loading a module file within single build session

\-fmodules-prune-after\=<seconds>[¶](#cmdoption-clang-fmodules-prune-after "Link to this definition")

Specify the interval (in seconds) after which a module file will be considered unused

\-fmodules-prune-interval\=<seconds>[¶](#cmdoption-clang-fmodules-prune-interval "Link to this definition")

Specify the interval (in seconds) between attempts to prune the module cache

\-fmodules-user-build-path <directory>[¶](#cmdoption-clang-fmodules-user-build-path "Link to this definition")

Specify the module user build path

\-fmodules-validate-once-per-build-session[¶](#cmdoption-clang-fmodules-validate-once-per-build-session "Link to this definition")

Don’t verify input files for the modules if the module has been successfully validated or loaded during this build session

Validate the system headers that a module depends on when loading the module

\-fprebuilt-module-path\=<directory>[¶](#cmdoption-clang-fprebuilt-module-path "Link to this definition")

Specify the prebuilt module path

\-iapinotes-modules<directory>[¶](#cmdoption-clang-iapinotes-modules-directory "Link to this definition")

Add directory to the API notes search path referenced by module name

\-ibuiltininc[¶](#cmdoption-clang-ibuiltininc "Link to this definition")

Enable builtin #include directories even when -nostdinc is used before or after -ibuiltininc. Using -nobuiltininc after the option disables it

\-idirafter<arg>, \--include-directory-after <arg>, \--include-directory-after\=<arg>[¶](#cmdoption-clang-idirafter-arg "Link to this definition")

Add directory to AFTER include search path

\-iframework<arg>[¶](#cmdoption-clang-iframework-arg "Link to this definition")

Add directory to SYSTEM framework search path

\-iframeworkwithsysroot<directory>[¶](#cmdoption-clang-iframeworkwithsysroot-directory "Link to this definition")

Add directory to SYSTEM framework search path, absolute paths are relative to -isysroot

\-imacros<file>, \--imacros<file>, \--imacros\=<arg>[¶](#cmdoption-clang-imacros-file "Link to this definition")

Include macros from file before parsing

\-include<file>, \--include<file>, \--include\=<arg>[¶](#cmdoption-clang-include-file "Link to this definition")

Include file before parsing

\-include-pch <file>[¶](#cmdoption-clang-include-pch "Link to this definition")

Include precompiled header file

\-iprefix<dir>, \--include-prefix <arg>, \--include-prefix\=<arg>[¶](#cmdoption-clang-iprefix-dir "Link to this definition")

Set the -iwithprefix/-iwithprefixbefore prefix

\-iquote<directory>[¶](#cmdoption-clang-iquote-directory "Link to this definition")

Add directory to QUOTE include search path

\-isysroot<dir>[¶](#cmdoption-clang-isysroot-dir "Link to this definition")

Set the system root directory (usually /)

\-isystem<directory>[¶](#cmdoption-clang-isystem-directory "Link to this definition")

Add directory to SYSTEM include search path

\-isystem-after<directory>[¶](#cmdoption-clang-isystem-after-directory "Link to this definition")

Add directory to end of the SYSTEM include search path

\-ivfsoverlay<arg>[¶](#cmdoption-clang-ivfsoverlay-arg "Link to this definition")

Overlay the virtual filesystem described by file over the real file system

\-iwithprefix<dir>, \--include-with-prefix <arg>, \--include-with-prefix-after <arg>, \--include-with-prefix-after\=<arg>, \--include-with-prefix\=<arg>[¶](#cmdoption-clang-iwithprefix-dir "Link to this definition")

Set directory to SYSTEM include search path with prefix

\-iwithprefixbefore<dir>, \--include-with-prefix-before <arg>, \--include-with-prefix-before\=<arg>[¶](#cmdoption-clang-iwithprefixbefore-dir "Link to this definition")

Set directory to include search path with prefix

\-iwithsysroot<directory>[¶](#cmdoption-clang-iwithsysroot-directory "Link to this definition")

Add directory to SYSTEM include search path, absolute paths are relative to -isysroot

\--libomptarget-amdgpu-bc-path\=<arg>, \--libomptarget-amdgcn-bc-path\=<arg>[¶](#cmdoption-clang-libomptarget-amdgpu-bc-path "Link to this definition")

Path to libomptarget-amdgcn bitcode library

\--libomptarget-nvptx-bc-path\=<arg>[¶](#cmdoption-clang-libomptarget-nvptx-bc-path "Link to this definition")

Path to libomptarget-nvptx bitcode library

\--libomptarget-spirv-bc-path\=<arg>[¶](#cmdoption-clang-libomptarget-spirv-bc-path "Link to this definition")

Path to libomptarget-spirv bitcode library

\-nobuiltininc[¶](#cmdoption-clang-nobuiltininc "Link to this definition")

Disable builtin #include directories only

\-nohipwrapperinc[¶](#cmdoption-clang-nohipwrapperinc "Link to this definition")

Do not include the default HIP wrapper headers and include paths

\-nostdinc, \--no-standard-includes[¶](#cmdoption-clang-nostdinc "Link to this definition")

Disable both standard system #include directories and builtin #include directories

\-nostdinc++[¶](#cmdoption-clang1-nostdinc "Link to this definition")

Disable standard #include directories for the C++ standard library

\-nostdlibinc[¶](#cmdoption-clang-nostdlibinc "Link to this definition")

Disable standard system #include directories only

\--offload-inc, \--no-offload-inc[¶](#cmdoption-clang-offload-inc "Link to this definition")

Add include paths for CUDA/HIP and include the default CUDA/HIP wrapper headers (default)

\-stdlib++-isystem<directory>[¶](#cmdoption-clang1-stdlib-isystem-directory "Link to this definition")

Use directory as the C++ standard library include path

Treat all #include paths starting with <prefix> as including a system header.

#### [Dependency file generation](#id7)[¶](#dependency-file-generation "Link to this heading")

Flags controlling generation of a dependency file for `make`\-like build systems.

\-M, \--dependencies[¶](#cmdoption-clang-M "Link to this definition")

Like -MD, but also implies -E and writes to stdout by default

\-MD, \--write-dependencies[¶](#cmdoption-clang-MD "Link to this definition")

Write a depfile containing user and system headers

\-MF<file>[¶](#cmdoption-clang-MF-file "Link to this definition")

Write depfile output from -MMD, -MD, -MM, or -M to <file>

\-MG, \--print-missing-file-dependencies[¶](#cmdoption-clang-MG "Link to this definition")

Add missing headers to depfile

\-MJ<arg>[¶](#cmdoption-clang-MJ-arg "Link to this definition")

Write a compilation database entry per input

\-MM, \--user-dependencies[¶](#cmdoption-clang-MM "Link to this definition")

Like -MMD, but also implies -E and writes to stdout by default

\-MMD, \--write-user-dependencies[¶](#cmdoption-clang-MMD "Link to this definition")

Write a depfile containing user headers

\-MP[¶](#cmdoption-clang-MP "Link to this definition")

Create phony target for each dependency (other than main file)

\-MQ<arg>[¶](#cmdoption-clang-MQ-arg "Link to this definition")

Specify name of main file output to quote in depfile

\-MT<arg>[¶](#cmdoption-clang-MT-arg "Link to this definition")

Specify name of main file output in depfile

\-MV[¶](#cmdoption-clang-MV "Link to this definition")

Use NMake/Jom format for the depfile

#### [Dumping preprocessor state](#id8)[¶](#dumping-preprocessor-state "Link to this heading")

Flags allowing the state of the preprocessor to be dumped in various ways.

\-d[¶](#cmdoption-clang-d "Link to this definition")

\-d<arg>[¶](#cmdoption-clang1-d-arg "Link to this definition")

\-dD[¶](#cmdoption-clang-dD "Link to this definition")

Print macro definitions in -E mode in addition to normal output

\-dI[¶](#cmdoption-clang-dI "Link to this definition")

Print include directives in -E mode in addition to normal output

\-dM[¶](#cmdoption-clang-dM "Link to this definition")

Print macro definitions in -E mode instead of normal output

### [Diagnostic options](#id9)[¶](#diagnostic-options "Link to this heading")

Flags controlling which warnings, errors, and remarks Clang will generate. See the [full list of warning and remark flags](https://clang.llvm.org/docs/DiagnosticsReference.html).

Enable the specified remark

\-Rpass-analysis\=<arg>[¶](#cmdoption-clang-Rpass-analysis "Link to this definition")

Report transformation analysis from optimization passes whose name matches the given POSIX regular expression

\-Rpass-missed\=<arg>[¶](#cmdoption-clang-Rpass-missed "Link to this definition")

Report missed transformations by optimization passes whose name matches the given POSIX regular expression

\-Rpass\=<arg>[¶](#cmdoption-clang-Rpass "Link to this definition")

Report transformations performed by optimization passes whose name matches the given POSIX regular expression

\-W<warning>, \--extra-warnings, \-fheinous-gnu-extensions (equivalent to \-Wno-error=invalid-gnu-asm-cast), \--warn-<arg>, \--warn-\=<arg>[¶](#cmdoption-clang-W-warning "Link to this definition")

Enable the specified warning

\-Wframe-larger-than\=<arg>, \-Wframe-larger-than[¶](#cmdoption-clang-Wframe-larger-than "Link to this definition")

\-Wnonportable-cfstrings<arg>, \-Wno-nonportable-cfstrings<arg>[¶](#cmdoption-clang-Wnonportable-cfstrings-arg "Link to this definition")

\--warning-suppression-mappings\=<arg>[¶](#cmdoption-clang-warning-suppression-mappings "Link to this definition")

File containing diagnostic suppression mappings. See user manual for file format.

### [Target-independent compilation options](#id10)[¶](#target-independent-compilation-options "Link to this heading")

\-fPIC, \-fno-PIC[¶](#cmdoption-clang-fPIC "Link to this definition")

\-fPIE, \-fno-PIE[¶](#cmdoption-clang-fPIE "Link to this definition")

\-faarch64-jump-table-hardening, \-fno-aarch64-jump-table-hardening[¶](#cmdoption-clang-faarch64-jump-table-hardening "Link to this definition")

Use hardened lowering for jump-table dispatch

\-faccess-control, \-fno-access-control[¶](#cmdoption-clang-faccess-control "Link to this definition")

\-faddrsig, \-fno-addrsig[¶](#cmdoption-clang-faddrsig "Link to this definition")

Emit an address-significance table

\-falign-functions, \-fno-align-functions[¶](#cmdoption-clang-falign-functions "Link to this definition")

\-falign-functions\=<arg>[¶](#cmdoption-clang1-falign-functions "Link to this definition")

\-falign-loops\=<N>[¶](#cmdoption-clang-falign-loops "Link to this definition")

N must be a power of two. Align loops to the boundary

\-faligned-allocation, \-faligned-new, \-fno-aligned-allocation[¶](#cmdoption-clang1-faligned-allocation "Link to this definition")

Enable C++17 aligned allocation functions

\-fallow-editor-placeholders, \-fno-allow-editor-placeholders[¶](#cmdoption-clang-fallow-editor-placeholders "Link to this definition")

Treat editor placeholders as valid source code

\-fallow-unsupported[¶](#cmdoption-clang-fallow-unsupported "Link to this definition")

\-faltivec, \-fno-altivec[¶](#cmdoption-clang-faltivec "Link to this definition")

\-faltivec-src-compat\=<arg>[¶](#cmdoption-clang-faltivec-src-compat "Link to this definition")

Source-level compatibility for Altivec vectors (for PowerPC targets). This includes results of vector comparison (scalar for ‘xl’, vector for ‘gcc’) as well as behavior when initializing with a scalar (splatting for ‘xl’, element zero only for ‘gcc’). For ‘mixed’, the compatibility is as ‘gcc’ for ‘vector bool/vector pixel’ and as ‘xl’ for other types. Current default is ‘mixed’. <arg> must be ‘mixed’, ‘gcc’ or ‘xl’.

\-fandroid-pad-segment, \-fno-android-pad-segment[¶](#cmdoption-clang-fandroid-pad-segment "Link to this definition")

\-fansi-escape-codes[¶](#cmdoption-clang-fansi-escape-codes "Link to this definition")

Use ANSI escape codes for diagnostics

\-fapple-kext, \-findirect-virtual-calls, \-fterminated-vtables[¶](#cmdoption-clang-fapple-kext "Link to this definition")

Use Apple’s kernel extensions ABI

\-fapple-link-rtlib[¶](#cmdoption-clang-fapple-link-rtlib "Link to this definition")

Force linking the clang builtins runtime library

\-fapple-pragma-pack, \-fno-apple-pragma-pack[¶](#cmdoption-clang-fapple-pragma-pack "Link to this definition")

Enable Apple gcc-compatible #pragma pack handling

\-fapplication-extension, \-fno-application-extension[¶](#cmdoption-clang-fapplication-extension "Link to this definition")

Restrict code to those available for App Extensions

\-fapprox-func, \-fno-approx-func[¶](#cmdoption-clang-fapprox-func "Link to this definition")

Allow certain math function calls to be replaced with an approximately equivalent calculation

\-fasm, \-fno-asm[¶](#cmdoption-clang-fasm "Link to this definition")

\-fasm-blocks, \-fno-asm-blocks[¶](#cmdoption-clang-fasm-blocks "Link to this definition")

\-fassociative-math, \-fno-associative-math[¶](#cmdoption-clang-fassociative-math "Link to this definition")

\-fassume-nothrow-exception-dtor, \-fno-assume-nothrow-exception-dtor[¶](#cmdoption-clang-fassume-nothrow-exception-dtor "Link to this definition")

Assume that exception objects’ destructors are non-throwing

\-fassume-sane-operator-new, \-fno-assume-sane-operator-new[¶](#cmdoption-clang-fassume-sane-operator-new "Link to this definition")

\-fassume-unique-vtables, \-fno-assume-unique-vtables[¶](#cmdoption-clang-fassume-unique-vtables "Link to this definition")

\-fassumptions, \-fno-assumptions[¶](#cmdoption-clang-fassumptions "Link to this definition")

\-fast[¶](#cmdoption-clang-fast "Link to this definition")

\-fastcp[¶](#cmdoption-clang-fastcp "Link to this definition")

\-fastf[¶](#cmdoption-clang-fastf "Link to this definition")

\-fasync-exceptions, \-fno-async-exceptions[¶](#cmdoption-clang-fasync-exceptions "Link to this definition")

Enable EH Asynchronous exceptions

\-fasynchronous-unwind-tables, \-fno-asynchronous-unwind-tables[¶](#cmdoption-clang-fasynchronous-unwind-tables "Link to this definition")

\-fatomic-fine-grained-memory, \-fno-atomic-fine-grained-memory[¶](#cmdoption-clang-fatomic-fine-grained-memory "Link to this definition")

May have atomic operations on fine-grained memory

\-fatomic-ignore-denormal-mode, \-fno-atomic-ignore-denormal-mode, \-munsafe-fp-atomics[¶](#cmdoption-clang-fatomic-ignore-denormal-mode "Link to this definition")

Allow atomic operations to ignore denormal mode

\-fatomic-remote-memory, \-fno-atomic-remote-memory[¶](#cmdoption-clang-fatomic-remote-memory "Link to this definition")

May have atomic operations on remote memory

\-fauto-import, \-fno-auto-import[¶](#cmdoption-clang-fauto-import "Link to this definition")

MinGW specific. Enable code generation support for automatic dllimport, and enable support for it in the linker. Enabled by default.

\-fautolink, \-fno-autolink[¶](#cmdoption-clang-fautolink "Link to this definition")

\-fbasic-block-address-map, \-fno-basic-block-address-map[¶](#cmdoption-clang-fbasic-block-address-map "Link to this definition")

Emit the basic block address map section.

\-fbasic-block-sections\=<arg>[¶](#cmdoption-clang-fbasic-block-sections "Link to this definition")

Place each basic block or a subset of basic blocks in its own section. <arg> must be ‘all’, ‘none’ or ‘list=’.

\-fbinutils-version\=<major.minor>[¶](#cmdoption-clang-fbinutils-version "Link to this definition")

Produced object files can use all ELF features supported by this binutils version and newer. If -fno-integrated-as is specified, the generated assembly will consider GNU as support. ‘none’ means that all ELF features can be used, regardless of binutils support. Defaults to 2.26.

\-fblocks, \-fno-blocks[¶](#cmdoption-clang-fblocks "Link to this definition")

Enable the ‘blocks’ language feature

\-fbootclasspath\=<arg>, \--bootclasspath <arg>, \--bootclasspath\=<arg>[¶](#cmdoption-clang-fbootclasspath "Link to this definition")

\-fborland-extensions, \-fno-borland-extensions[¶](#cmdoption-clang-fborland-extensions "Link to this definition")

Accept non-standard constructs supported by the Borland compiler

\-fbracket-depth\=<arg>[¶](#cmdoption-clang-fbracket-depth "Link to this definition")

\-fbuiltin, \-fno-builtin[¶](#cmdoption-clang-fbuiltin "Link to this definition")

\-fbuiltin-module-map[¶](#cmdoption-clang-fbuiltin-module-map "Link to this definition")

Load the clang builtins module map file.

\-fc++-static-destructors\=<arg>, \-fc++-static-destructors (equivalent to \-fc++-static-destructors=all), \-fno-c++-static-destructors (equivalent to \-fc++-static-destructors=none)[¶](#cmdoption-clang1-fc-static-destructors "Link to this definition")

Controls which variables C++ static destructors are registered for. <arg> must be ‘all’, ‘thread-local’ or ‘none’.

\-fcaret-diagnostics, \-fno-caret-diagnostics[¶](#cmdoption-clang-fcaret-diagnostics "Link to this definition")

\-fcaret-diagnostics-max-lines\=<arg>[¶](#cmdoption-clang-fcaret-diagnostics-max-lines "Link to this definition")

Set the maximum number of source lines to show in a caret diagnostic (0 = no limit).

\-fcf-protection\=<arg>, \-fcf-protection (equivalent to \-fcf-protection=full)[¶](#cmdoption-clang-fcf-protection "Link to this definition")

Instrument control-flow architecture protection. <arg> must be ‘return’, ‘branch’, ‘full’ or ‘none’.

\-fcf-runtime-abi\=<arg>[¶](#cmdoption-clang-fcf-runtime-abi "Link to this definition")

<arg> must be ‘unspecified’, ‘standalone’, ‘objc’, ‘swift’, ‘swift-5.0’, ‘swift-4.2’ or ‘swift-4.1’.

\-fchar8\_t, \-fno-char8\_t[¶](#cmdoption-clang-fchar8_t "Link to this definition")

Enable C++ builtin type char8\_t

\-fclangir, \-fno-clangir[¶](#cmdoption-clang-fclangir "Link to this definition")

Use the ClangIR pipeline to compile

\-fclasspath\=<arg>, \--CLASSPATH <arg>, \--CLASSPATH\=<arg>, \--classpath <arg>, \--classpath\=<arg>[¶](#cmdoption-clang-fclasspath "Link to this definition")

\-fcodegen-data-generate\=<path>, \-fcodegen-data-generate (equivalent to \-fcodegen-data-generate=default.cgdata)[¶](#cmdoption-clang-fcodegen-data-generate "Link to this definition")

Emit codegen data into the object file. LLD for MachO (currently) merges them into the specified <path>.

\-fcodegen-data-use\=<path>, \-fcodegen-data-use (equivalent to \-fcodegen-data-use=default.cgdata)[¶](#cmdoption-clang-fcodegen-data-use "Link to this definition")

Use codegen data read from the specified <path>.

\-fcolor-diagnostics, \-fdiagnostics-color, \-fno-color-diagnostics[¶](#cmdoption-clang-fcolor-diagnostics "Link to this definition")

Enable colors in diagnostics

\-fcommon, \-fno-common[¶](#cmdoption-clang-fcommon "Link to this definition")

Place definitions of variables with no storage class and no initializer (tentative definitions) in a common block, instead of generating individual zero-initialized definitions (default -fno-common).

\-fcompile-resource\=<arg>, \--resource <arg>, \--resource\=<arg>[¶](#cmdoption-clang-fcompile-resource "Link to this definition")

\-fcomplex-arithmetic\=<arg>[¶](#cmdoption-clang-fcomplex-arithmetic "Link to this definition")

Controls the calculation methods of complex number multiplication and division. <arg> must be ‘full’, ‘improved’, ‘promoted’ or ‘basic’.

\-fconstant-cfstrings, \-fno-constant-cfstrings[¶](#cmdoption-clang-fconstant-cfstrings "Link to this definition")

\-fconstant-string-class\=<arg>[¶](#cmdoption-clang-fconstant-string-class "Link to this definition")

\-fconstexpr-backtrace-limit\=<arg>[¶](#cmdoption-clang-fconstexpr-backtrace-limit "Link to this definition")

Set the maximum number of entries to print in a constexpr evaluation backtrace (0 = no limit)

\-fconstexpr-depth\=<arg>[¶](#cmdoption-clang-fconstexpr-depth "Link to this definition")

Set the maximum depth of recursive constexpr function calls

\-fconstexpr-steps\=<arg>[¶](#cmdoption-clang-fconstexpr-steps "Link to this definition")

Set the maximum number of steps in constexpr function evaluation

\-fcoro-aligned-allocation, \-fno-coro-aligned-allocation[¶](#cmdoption-clang-fcoro-aligned-allocation "Link to this definition")

Prefer aligned allocation for C++ Coroutines

\-fcoroutines, \-fno-coroutines[¶](#cmdoption-clang-fcoroutines "Link to this definition")

Enable support for the C++ Coroutines

\-fcoverage-compilation-dir\=<arg>[¶](#cmdoption-clang-fcoverage-compilation-dir "Link to this definition")

The compilation directory to embed in the coverage mapping.

\-fcoverage-mapping, \-fno-coverage-mapping[¶](#cmdoption-clang-fcoverage-mapping "Link to this definition")

Generate coverage mapping to enable code coverage analysis

\-fcoverage-mcdc, \-fno-coverage-mcdc[¶](#cmdoption-clang-fcoverage-mcdc "Link to this definition")

Enable MC/DC criteria when generating code coverage

\-fcoverage-prefix-map\=<old>=<new>[¶](#cmdoption-clang-fcoverage-prefix-map "Link to this definition")

remap file source paths <old> to <new> in coverage mapping. If there are multiple options, prefix replacement is applied in reverse order starting from the last one

\-fcreate-profile[¶](#cmdoption-clang-fcreate-profile "Link to this definition")

\-fcs-profile-generate[¶](#cmdoption-clang-fcs-profile-generate "Link to this definition")

Generate instrumented code to collect context sensitive execution counts into default.profraw (overridden by LLVM\_PROFILE\_FILE env var)

\-fcs-profile-generate\=<directory>[¶](#cmdoption-clang1-fcs-profile-generate "Link to this definition")

Generate instrumented code to collect context sensitive execution counts into <directory>/default.profraw (overridden by LLVM\_PROFILE\_FILE env var)

\-fcxx-exceptions, \-fno-cxx-exceptions[¶](#cmdoption-clang-fcxx-exceptions "Link to this definition")

Enable C++ exceptions

\-fcxx-modules, \-fno-cxx-modules[¶](#cmdoption-clang-fcxx-modules "Link to this definition")

Enable modules for C++

\-fdata-sections, \-fno-data-sections[¶](#cmdoption-clang-fdata-sections "Link to this definition")

Place each data in its own section

\-fdebug-compilation-dir\=<arg>, \-fdebug-compilation-dir <arg>[¶](#cmdoption-clang-fdebug-compilation-dir "Link to this definition")

The compilation directory to embed in the debug info

\-fdebug-default-version\=<arg>[¶](#cmdoption-clang-fdebug-default-version "Link to this definition")

Default DWARF version to use, if a -g option caused DWARF debug info to be produced

\-fdebug-info-for-profiling, \-fno-debug-info-for-profiling[¶](#cmdoption-clang-fdebug-info-for-profiling "Link to this definition")

Emit extra debug info to make sample profile more accurate

\-fdebug-macro, \-fno-debug-macro[¶](#cmdoption-clang-fdebug-macro "Link to this definition")

Emit macro debug information

\-fdebug-pass-arguments[¶](#cmdoption-clang-fdebug-pass-arguments "Link to this definition")

\-fdebug-pass-structure[¶](#cmdoption-clang-fdebug-pass-structure "Link to this definition")

\-fdebug-prefix-map\=<old>=<new>[¶](#cmdoption-clang-fdebug-prefix-map "Link to this definition")

For paths in debug info, remap directory <old> to <new>. If multiple options match a path, the last option wins

\-fdebug-ranges-base-address, \-fno-debug-ranges-base-address[¶](#cmdoption-clang-fdebug-ranges-base-address "Link to this definition")

Use DWARF base address selection entries in .debug\_ranges

\-fdebug-types-section, \-fno-debug-types-section[¶](#cmdoption-clang-fdebug-types-section "Link to this definition")

Place debug types in their own section (ELF Only)

\-fdefine-target-os-macros, \-fno-define-target-os-macros[¶](#cmdoption-clang-fdefine-target-os-macros "Link to this definition")

Enable predefined target OS macros

\-fdelayed-template-parsing, \-fno-delayed-template-parsing[¶](#cmdoption-clang-fdelayed-template-parsing "Link to this definition")

Parse templated function definitions at the end of the translation unit

\-fdelete-null-pointer-checks, \-fno-delete-null-pointer-checks[¶](#cmdoption-clang-fdelete-null-pointer-checks "Link to this definition")

When enabled, treat null pointer dereference, creation of a reference to null, or passing a null pointer to a function parameter annotated with the “nonnull” attribute as undefined behavior. (And, thus the optimizer may assume that any pointer used in such a way must not have been null and optimize away the branches accordingly.) On by default.

\-fdenormal-fp-math\=<arg>[¶](#cmdoption-clang-fdenormal-fp-math "Link to this definition")

\-fdiagnostics-absolute-paths[¶](#cmdoption-clang-fdiagnostics-absolute-paths "Link to this definition")

Print absolute paths in diagnostics

\-fdiagnostics-color\=<arg>[¶](#cmdoption-clang1-fdiagnostics-color "Link to this definition")

When to use colors in diagnostics. <arg> must be ‘auto’, ‘always’ or ‘never’.

\-fdiagnostics-hotness-threshold\=<value>[¶](#cmdoption-clang-fdiagnostics-hotness-threshold "Link to this definition")

Prevent optimization remarks from being output if they do not have at least this profile count. Use ‘auto’ to apply the threshold from profile summary

\-fdiagnostics-misexpect-tolerance\=<value>[¶](#cmdoption-clang-fdiagnostics-misexpect-tolerance "Link to this definition")

Prevent misexpect diagnostics from being output if the profile counts are within N% of the expected.

\-fdiagnostics-show-hotness, \-fno-diagnostics-show-hotness[¶](#cmdoption-clang-fdiagnostics-show-hotness "Link to this definition")

Enable profile hotness information in diagnostic line

\-fdiagnostics-show-line-numbers, \-fno-diagnostics-show-line-numbers[¶](#cmdoption-clang-fdiagnostics-show-line-numbers "Link to this definition")

\-fdiagnostics-show-note-include-stack, \-fno-diagnostics-show-note-include-stack[¶](#cmdoption-clang-fdiagnostics-show-note-include-stack "Link to this definition")

Display include stacks for diagnostic notes

\-fdiagnostics-show-option, \-fno-diagnostics-show-option[¶](#cmdoption-clang-fdiagnostics-show-option "Link to this definition")

Print option name with mappable diagnostics

\-fdiagnostics-show-template-tree[¶](#cmdoption-clang-fdiagnostics-show-template-tree "Link to this definition")

Print a template comparison tree for differing templates

\-fdigraphs, \-fno-digraphs[¶](#cmdoption-clang-fdigraphs "Link to this definition")

Enable alternative token representations ‘<:’, ‘:>’, ‘<%’, ‘%>’, ‘%:’, ‘%:%:’ (default)

\-fdirect-access-external-data, \-fno-direct-access-external-data[¶](#cmdoption-clang-fdirect-access-external-data "Link to this definition")

Don’t use GOT indirection to reference external data symbols

\-fdirectives-only, \-fno-directives-only[¶](#cmdoption-clang-fdirectives-only "Link to this definition")

\-fdisable-block-signature-string, \-fno-disable-block-signature-string[¶](#cmdoption-clang-fdisable-block-signature-string "Link to this definition")

Disable block signature string)

\-fdollars-in-identifiers, \-fno-dollars-in-identifiers[¶](#cmdoption-clang-fdollars-in-identifiers "Link to this definition")

Allow ‘$’ in identifiers

\-fdouble-square-bracket-attributes, \-fno-double-square-bracket-attributes[¶](#cmdoption-clang-fdouble-square-bracket-attributes "Link to this definition")

\-fdwarf-directory-asm, \-fno-dwarf-directory-asm[¶](#cmdoption-clang-fdwarf-directory-asm "Link to this definition")

\-fdwarf-exceptions[¶](#cmdoption-clang-fdwarf-exceptions "Link to this definition")

Use DWARF style exceptions

\-felide-constructors, \-fno-elide-constructors[¶](#cmdoption-clang-felide-constructors "Link to this definition")

\-feliminate-unused-debug-symbols, \-fno-eliminate-unused-debug-symbols[¶](#cmdoption-clang-feliminate-unused-debug-symbols "Link to this definition")

\-feliminate-unused-debug-types, \-fno-eliminate-unused-debug-types[¶](#cmdoption-clang-feliminate-unused-debug-types "Link to this definition")

Do not emit debug info for defined but unused types

\-fembed-bitcode\=<option>, \-fembed-bitcode (equivalent to \-fembed-bitcode=all), \-fembed-bitcode-marker (equivalent to \-fembed-bitcode=marker)[¶](#cmdoption-clang-fembed-bitcode "Link to this definition")

Embed LLVM bitcode. <option> must be ‘off’, ‘all’, ‘bitcode’ or ‘marker’.

\-fembed-offload-object\=<arg>[¶](#cmdoption-clang-fembed-offload-object "Link to this definition")

Embed Offloading device-side binary into host object file as a section.

\-femit-all-decls[¶](#cmdoption-clang-femit-all-decls "Link to this definition")

Emit all declarations, even if unused

\-femit-compact-unwind-non-canonical, \-fno-emit-compact-unwind-non-canonical[¶](#cmdoption-clang-femit-compact-unwind-non-canonical "Link to this definition")

Try emitting Compact-Unwind for non-canonical entries. Maybe overridden by other constraints

\-femit-dwarf-unwind\=<arg>[¶](#cmdoption-clang-femit-dwarf-unwind "Link to this definition")

When to emit DWARF unwind (EH frame) info. <arg> must be ‘always’, ‘no-compact-unwind’ or ‘default’.

\-femulated-tls, \-fno-emulated-tls[¶](#cmdoption-clang-femulated-tls "Link to this definition")

Use emutls functions to access thread\_local variables

\-fenable-matrix[¶](#cmdoption-clang-fenable-matrix "Link to this definition")

Enable matrix data type and related builtin functions

\-fencoding\=<arg>, \--encoding <arg>, \--encoding\=<arg>[¶](#cmdoption-clang-fencoding "Link to this definition")

\-ferror-limit\=<arg>[¶](#cmdoption-clang-ferror-limit "Link to this definition")

\-fescaping-block-tail-calls, \-fno-escaping-block-tail-calls[¶](#cmdoption-clang-fescaping-block-tail-calls "Link to this definition")

\-fexceptions, \-fno-exceptions[¶](#cmdoption-clang-fexceptions "Link to this definition")

Enable support for exception handling

\-fexcess-precision\=<arg>[¶](#cmdoption-clang-fexcess-precision "Link to this definition")

Allows control over excess precision on targets where native support for the precision types is not available. By default, excess precision is used to calculate intermediate results following the rules specified in ISO C99. <arg> must be ‘standard’, ‘fast’ or ‘none’.

\-fexec-charset\=<arg>[¶](#cmdoption-clang-fexec-charset "Link to this definition")

\-fexperimental-late-parse-attributes, \-fno-experimental-late-parse-attributes[¶](#cmdoption-clang-fexperimental-late-parse-attributes "Link to this definition")

Enable experimental late parsing of attributes

\-fexperimental-library, \-fno-experimental-library[¶](#cmdoption-clang-fexperimental-library "Link to this definition")

Control whether unstable and experimental library features are enabled. This option enables various library features that are either experimental (also known as TSes), or have been but are not stable yet in the selected Standard Library implementation. It is not recommended to use this option in production code, since neither ABI nor API stability are guaranteed. This is intended to provide a preview of features that will ship in the future for experimentation purposes

\-fexperimental-new-constant-interpreter[¶](#cmdoption-clang-fexperimental-new-constant-interpreter "Link to this definition")

Enable the experimental new constant interpreter

\-fexperimental-openacc-macro-override <arg>, \-fexperimental-openacc-macro-override\=<arg>[¶](#cmdoption-clang-fexperimental-openacc-macro-override "Link to this definition")

Overrides the \_OPENACC macro value for experimental testing during OpenACC support development

\-fexperimental-sanitize-metadata-ignorelist\=<arg>[¶](#cmdoption-clang-fexperimental-sanitize-metadata-ignorelist "Link to this definition")

Disable sanitizer metadata for modules and functions that match the provided special case list

\-fexperimental-sanitize-metadata\=<arg1>,<arg2>..., \-fno-experimental-sanitize-metadata\=<arg1>,<arg2>...[¶](#cmdoption-clang-fexperimental-sanitize-metadata "Link to this definition")

Specify the type of metadata to emit for binary analysis sanitizers

\-fextdirs\=<arg>, \--extdirs <arg>, \--extdirs\=<arg>[¶](#cmdoption-clang-fextdirs "Link to this definition")

\-fextend-arguments\=<arg>[¶](#cmdoption-clang-fextend-arguments "Link to this definition")

Controls how scalar integer arguments are extended in calls to unprototyped and varargs functions. <arg> must be ‘32’ or ‘64’.

\-fextend-variable-liveness\=<arg>, \-fextend-variable-liveness (equivalent to \-fextend-variable-liveness=all)[¶](#cmdoption-clang-fextend-variable-liveness "Link to this definition")

Extend the liveness of user variables through optimizations to prevent stale or optimized-out variable values when debugging. <arg> must be ‘all’, ‘this’ or ‘none’.

\-ffast-math, \-fno-fast-math[¶](#cmdoption-clang-ffast-math "Link to this definition")

Allow aggressive, lossy floating-point optimizations

\-ffat-lto-objects, \-fno-fat-lto-objects[¶](#cmdoption-clang-ffat-lto-objects "Link to this definition")

Enable fat LTO object support

\-ffile-compilation-dir\=<arg>[¶](#cmdoption-clang-ffile-compilation-dir "Link to this definition")

The compilation directory to embed in the debug info and coverage mapping.

\-ffile-prefix-map\=<arg>[¶](#cmdoption-clang-ffile-prefix-map "Link to this definition")

remap file source paths in debug info, coverage mapping, predefined preprocessor macros and \_\_builtin\_FILE(). Implies -ffile-reproducible.

\-ffile-reproducible, \-fno-file-reproducible[¶](#cmdoption-clang-ffile-reproducible "Link to this definition")

Use the target’s platform-specific path separator character when expanding the \_\_FILE\_\_ macro

\-ffinite-loops, \-fno-finite-loops[¶](#cmdoption-clang-ffinite-loops "Link to this definition")

Assume all non-trivial loops are finite.

\-ffixed-point, \-fno-fixed-point[¶](#cmdoption-clang-ffixed-point "Link to this definition")

Enable fixed point types

\-ffixed-r19[¶](#cmdoption-clang-ffixed-r19 "Link to this definition")

Reserve register r19 (Hexagon only)

\-ffor-scope, \-fno-for-scope[¶](#cmdoption-clang-ffor-scope "Link to this definition")

\-fforce-check-cxx20-modules-input-files[¶](#cmdoption-clang-fforce-check-cxx20-modules-input-files "Link to this definition")

Check the input source files from C++20 modules explicitly

\-fforce-dwarf-frame, \-fno-force-dwarf-frame[¶](#cmdoption-clang-fforce-dwarf-frame "Link to this definition")

Always emit a debug frame section

\-fforce-emit-vtables, \-fno-force-emit-vtables[¶](#cmdoption-clang-fforce-emit-vtables "Link to this definition")

In order to improve devirtualization, forces emitting of vtables even in modules where it isn’t necessary. It causes more inline virtual functions to be emitted.

\-fforce-enable-int128, \-fno-force-enable-int128[¶](#cmdoption-clang-fforce-enable-int128 "Link to this definition")

Enable support for int128\_t type

\-ffp-contract\=<arg>[¶](#cmdoption-clang-ffp-contract "Link to this definition")

Form fused FP ops (e.g. FMAs): fast (fuses across statements disregarding pragmas) | on (only fuses in the same statement unless dictated by pragmas) | off (never fuses) | fast-honor-pragmas (fuses across statements unless dictated by pragmas). Default is ‘fast’ for CUDA, ‘fast-honor-pragmas’ for HIP, and ‘on’ otherwise. <arg> must be ‘fast’, ‘on’, ‘off’ or ‘fast-honor-pragmas’.

\-ffp-eval-method\=<arg>[¶](#cmdoption-clang-ffp-eval-method "Link to this definition")

Specifies the evaluation method to use for floating-point arithmetic. <arg> must be ‘source’, ‘double’ or ‘extended’.

\-ffp-exception-behavior\=<arg>[¶](#cmdoption-clang-ffp-exception-behavior "Link to this definition")

Specifies the exception behavior of floating-point operations. <arg> must be ‘ignore’, ‘maytrap’ or ‘strict’.

\-ffp-model\=<arg>[¶](#cmdoption-clang-ffp-model "Link to this definition")

Controls the semantics of floating-point calculations.

\-ffreestanding[¶](#cmdoption-clang-ffreestanding "Link to this definition")

Assert that the compilation takes place in a freestanding environment

\-ffunction-sections, \-fno-function-sections[¶](#cmdoption-clang-ffunction-sections "Link to this definition")

Place each function in its own section

\-fgnu-inline-asm, \-fno-gnu-inline-asm[¶](#cmdoption-clang-fgnu-inline-asm "Link to this definition")

\-fgnu-keywords, \-fno-gnu-keywords[¶](#cmdoption-clang-fgnu-keywords "Link to this definition")

Allow GNU-extension keywords regardless of language standard

\-fgnu-runtime[¶](#cmdoption-clang-fgnu-runtime "Link to this definition")

Generate output compatible with the standard GNU Objective-C runtime

\-fgnu89-inline, \-fno-gnu89-inline[¶](#cmdoption-clang-fgnu89-inline "Link to this definition")

Use the gnu89 inline semantics

\-fgnuc-version\=<arg>[¶](#cmdoption-clang-fgnuc-version "Link to this definition")

Sets various macros to claim compatibility with the given GCC version (default is 4.2.1)

\-fgpu-approx-transcendentals, \-fcuda-approx-transcendentals, \-fno-gpu-approx-transcendentals[¶](#cmdoption-clang-fgpu-approx-transcendentals "Link to this definition")

Use approximate transcendental functions

\-fhonor-infinities, \-fhonor-infinites, \-fno-honor-infinities[¶](#cmdoption-clang-fhonor-infinities "Link to this definition")

Specify that floating-point optimizations are not allowed that assume arguments and results are not +-inf.

\-fhonor-nans, \-fno-honor-nans[¶](#cmdoption-clang-fhonor-nans "Link to this definition")

Specify that floating-point optimizations are not allowed that assume arguments and results are not NANs.

\-fhosted[¶](#cmdoption-clang-fhosted "Link to this definition")

\-fignore-exceptions[¶](#cmdoption-clang-fignore-exceptions "Link to this definition")

Enable support for ignoring exception handling constructs

\-fimplicit-module-maps, \-fmodule-maps, \-fno-implicit-module-maps[¶](#cmdoption-clang-fimplicit-module-maps "Link to this definition")

Implicitly search the file system for module map files.

\-fimplicit-modules, \-fno-implicit-modules[¶](#cmdoption-clang-fimplicit-modules "Link to this definition")

\-fincremental-extensions[¶](#cmdoption-clang-fincremental-extensions "Link to this definition")

Enable incremental processing extensions such as processing statements on the global scope.

\-finline-max-stacksize\=<arg>[¶](#cmdoption-clang-finline-max-stacksize "Link to this definition")

Suppress inlining of functions whose stack size exceeds the given value

\-finput-charset\=<arg>[¶](#cmdoption-clang-finput-charset "Link to this definition")

Specify the default character set for source files

\-finstrument-function-entry-bare[¶](#cmdoption-clang-finstrument-function-entry-bare "Link to this definition")

Instrument function entry only, after inlining, without arguments to the instrumentation call

\-finstrument-functions[¶](#cmdoption-clang-finstrument-functions "Link to this definition")

Generate calls to instrument function entry and exit

\-finstrument-functions-after-inlining[¶](#cmdoption-clang-finstrument-functions-after-inlining "Link to this definition")

Like -finstrument-functions, but insert the calls after inlining

\-fintegrated-as, \-fno-integrated-as, \-integrated-as[¶](#cmdoption-clang-fintegrated-as "Link to this definition")

Enable the integrated assembler

\-fintegrated-cc1, \-fno-integrated-cc1[¶](#cmdoption-clang-fintegrated-cc1 "Link to this definition")

Run cc1 in-process

\-fintegrated-objemitter, \-fno-integrated-objemitter[¶](#cmdoption-clang-fintegrated-objemitter "Link to this definition")

Use internal machine object code emitter.

\-fjmc, \-fno-jmc[¶](#cmdoption-clang-fjmc "Link to this definition")

Enable just-my-code debugging

\-fjump-tables, \-fno-jump-tables[¶](#cmdoption-clang-fjump-tables "Link to this definition")

Use jump tables for lowering switches

\-fkeep-persistent-storage-variables, \-fno-keep-persistent-storage-variables[¶](#cmdoption-clang-fkeep-persistent-storage-variables "Link to this definition")

Enable keeping all variables that have a persistent storage duration, including global, static and thread-local variables, to guarantee that they can be directly addressed

\-fkeep-static-consts, \-fno-keep-static-consts[¶](#cmdoption-clang-fkeep-static-consts "Link to this definition")

Keep static const variables even if unused

\-fkeep-system-includes, \-fno-keep-system-includes[¶](#cmdoption-clang-fkeep-system-includes "Link to this definition")

Instead of expanding system headers when emitting preprocessor output, preserve the #include directive. Useful when producing preprocessed output for test case reduction. May produce incorrect output if preprocessor symbols that control the included content (e.g. \_XOPEN\_SOURCE) are defined in the including source file. The portability of the resulting source to other compilation environments is not guaranteed.

Only valid with -E.

\-flax-vector-conversions\=<arg>, \-flax-vector-conversions (equivalent to \-flax-vector-conversions=integer), \-fno-lax-vector-conversions (equivalent to \-flax-vector-conversions=none)[¶](#cmdoption-clang-flax-vector-conversions "Link to this definition")

Enable implicit vector bit-casts. <arg> must be ‘none’, ‘integer’ or ‘all’.

\-flimited-precision\=<arg>[¶](#cmdoption-clang-flimited-precision "Link to this definition")

\-floop-interchange, \-fno-loop-interchange[¶](#cmdoption-clang-floop-interchange "Link to this definition")

Enable the loop interchange pass

\-flto-jobs\=<arg>[¶](#cmdoption-clang-flto-jobs "Link to this definition")

Controls the backend parallelism of -flto=thin (default of 0 means the number of threads will be derived from the number of CPUs detected)

\-flto-partitions\=<arg>[¶](#cmdoption-clang-flto-partitions "Link to this definition")

Number of partitions to use for parallel full LTO codegen, ld.lld only.

\-flto\=<arg>, \-flto (equivalent to \-flto=full), \-flto\=auto (equivalent to \-flto=full), \-flto\=jobserver (equivalent to \-flto=full)[¶](#cmdoption-clang-flto "Link to this definition")

Set LTO mode. <arg> must be ‘thin’ or ‘full’.

\-fmacro-backtrace-limit\=<arg>[¶](#cmdoption-clang-fmacro-backtrace-limit "Link to this definition")

Set the maximum number of entries to print in a macro expansion backtrace (0 = no limit)

\-fmacro-prefix-map\=<arg>[¶](#cmdoption-clang-fmacro-prefix-map "Link to this definition")

remap file source paths in predefined preprocessor macros and \_\_builtin\_FILE(). Implies -ffile-reproducible.

\-fmath-errno, \-fno-math-errno[¶](#cmdoption-clang-fmath-errno "Link to this definition")

Require math functions to indicate errors by setting errno

\-fmax-tokens\=<arg>[¶](#cmdoption-clang-fmax-tokens "Link to this definition")

Max total number of preprocessed tokens for -Wmax-tokens.

\-fmax-type-align\=<arg>[¶](#cmdoption-clang-fmax-type-align "Link to this definition")

Specify the maximum alignment to enforce on pointers lacking an explicit alignment

\-fmemory-profile, \-fno-memory-profile[¶](#cmdoption-clang-fmemory-profile "Link to this definition")

Enable heap memory profiling

\-fmemory-profile-use\=<pathname>[¶](#cmdoption-clang-fmemory-profile-use "Link to this definition")

Use memory profile for profile-guided memory optimization

\-fmemory-profile\=<directory>[¶](#cmdoption-clang1-fmemory-profile "Link to this definition")

Enable heap memory profiling and dump results into <directory>

\-fmerge-all-constants, \-fno-merge-all-constants[¶](#cmdoption-clang-fmerge-all-constants "Link to this definition")

Allow merging of constants

\-fmessage-length\=<arg>[¶](#cmdoption-clang-fmessage-length "Link to this definition")

Format message diagnostics so that they fit within N columns

\-fminimize-whitespace, \-fno-minimize-whitespace[¶](#cmdoption-clang-fminimize-whitespace "Link to this definition")

Ignore the whitespace from the input file when emitting preprocessor output. It will only contain whitespace when necessary, e.g. to keep two minus signs from merging into to an increment operator. Useful with the -P option to normalize whitespace such that two files with only formatting changes are equal.

Only valid with -E on C-like inputs and incompatible with -traditional-cpp.

\-fmodule-file-deps, \-fno-module-file-deps[¶](#cmdoption-clang-fmodule-file-deps "Link to this definition")

Build a C++20 Header Unit from a header

Build a C++20 Header Unit from a header that should be found in the user (fmodule-header=user) or system (fmodule-header=system) search path.

\-fmodule-map-file\=<file>[¶](#cmdoption-clang-fmodule-map-file "Link to this definition")

Load this module map file

\-fmodule-name\=<name>, \-fmodule-implementation-of <arg>[¶](#cmdoption-clang-fmodule-name "Link to this definition")

Specify the name of the module to build

\-fmodulemap-allow-subdirectory-search, \-fno-modulemap-allow-subdirectory-search[¶](#cmdoption-clang-fmodulemap-allow-subdirectory-search "Link to this definition")

Allow to search for module maps in subdirectories of search paths

\-fmodules, \-fno-modules[¶](#cmdoption-clang-fmodules "Link to this definition")

Enable the ‘modules’ language feature

\-fmodules-decluse, \-fno-modules-decluse[¶](#cmdoption-clang-fmodules-decluse "Link to this definition")

Require declaration of modules used within a module

\-fmodules-driver, \-fno-modules-driver[¶](#cmdoption-clang-fmodules-driver "Link to this definition")

Enable support for driver managed module builds (experimental)

\-fmodules-ignore-macro\=<arg>[¶](#cmdoption-clang-fmodules-ignore-macro "Link to this definition")

Ignore the definition of the given macro when building and loading modules

\-fmodules-search-all, \-fno-modules-search-all[¶](#cmdoption-clang-fmodules-search-all "Link to this definition")

Search even non-imported modules to resolve references

\-fmodules-strict-decluse[¶](#cmdoption-clang-fmodules-strict-decluse "Link to this definition")

Like -fmodules-decluse but requires all headers to be in modules

\-fmodules-validate-input-files-content[¶](#cmdoption-clang-fmodules-validate-input-files-content "Link to this definition")

Validate PCM input files based on content if mtime differs

\-fms-compatibility, \-fno-ms-compatibility[¶](#cmdoption-clang-fms-compatibility "Link to this definition")

Enable full Microsoft Visual C++ compatibility

\-fms-compatibility-version\=<arg>[¶](#cmdoption-clang-fms-compatibility-version "Link to this definition")

Dot-separated value representing the Microsoft compiler version number to report in \_MSC\_VER (0 = don’t define it (default))

\-fms-define-stdc[¶](#cmdoption-clang-fms-define-stdc "Link to this definition")

Define ‘\_\_STDC\_\_’ to ‘1’ in MSVC Compatibility mode

\-fms-extensions, \-fno-ms-extensions[¶](#cmdoption-clang-fms-extensions "Link to this definition")

Accept some non-standard constructs supported by the Microsoft compiler

\-fms-hotpatch[¶](#cmdoption-clang-fms-hotpatch "Link to this definition")

Ensure that all functions can be hotpatched at runtime

\-fms-memptr-rep\=<arg>[¶](#cmdoption-clang-fms-memptr-rep "Link to this definition")

<arg> must be ‘single’, ‘multiple’ or ‘virtual’.

\-fms-omit-default-lib<arg>[¶](#cmdoption-clang-fms-omit-default-lib-arg "Link to this definition")

\-fms-runtime-lib\=<arg>[¶](#cmdoption-clang-fms-runtime-lib "Link to this definition")

Specify Visual Studio C runtime library. “static” and “static\_dbg” correspond to the cl flags /MT and /MTd which use the multithread, static version. “dll” and “dll\_dbg” correspond to the cl flags /MD and /MDd which use the multithread, dll version. <arg> must be ‘static’, ‘static\_dbg’, ‘dll’ or ‘dll\_dbg’.

\-fms-secure-hotpatch-functions-file\=<arg>[¶](#cmdoption-clang-fms-secure-hotpatch-functions-file "Link to this definition")

Path to a file that contains a list of mangled names of functions that should be hot-patched for Windows Secure Hot-Patching

\-fms-secure-hotpatch-functions-list\=<arg1>,<arg2>...[¶](#cmdoption-clang-fms-secure-hotpatch-functions-list "Link to this definition")

List of mangled symbol names of functions that should be hot-patched for Windows Secure Hot-Patching

\-fms-tls-guards, \-fno-ms-tls-guards[¶](#cmdoption-clang-fms-tls-guards "Link to this definition")

\-fms-volatile, \-fno-ms-volatile[¶](#cmdoption-clang-fms-volatile "Link to this definition")

Volatile loads and stores have acquire and release semantics

\-fmsc-version\=<arg>[¶](#cmdoption-clang-fmsc-version "Link to this definition")

Microsoft compiler version number to report in \_MSC\_VER (0 = don’t define it (default))

\-fmudflap[¶](#cmdoption-clang-fmudflap "Link to this definition")

\-fmudflapth[¶](#cmdoption-clang-fmudflapth "Link to this definition")

\-fnested-functions[¶](#cmdoption-clang-fnested-functions "Link to this definition")

\-fnew-alignment\=<align>, \-fnew-alignment <arg>[¶](#cmdoption-clang-fnew-alignment "Link to this definition")

Specifies the largest alignment guaranteed by ‘::operator new(size\_t)’

\-fnew-infallible, \-fno-new-infallible[¶](#cmdoption-clang-fnew-infallible "Link to this definition")

Enable treating throwing global C++ operator new as always returning valid memory (annotates with \_\_attribute\_\_((returns\_nonnull)) and throw()). This is detectable in source.

\-fnext-runtime[¶](#cmdoption-clang-fnext-runtime "Link to this definition")

\-fno-builtin-<arg>[¶](#cmdoption-clang-fno-builtin-arg "Link to this definition")

Disable implicit builtin knowledge of a specific function

\-fno-elide-type[¶](#cmdoption-clang-fno-elide-type "Link to this definition")

Do not elide types when printing diagnostics

\-fno-knr-functions[¶](#cmdoption-clang-fno-knr-functions "Link to this definition")

Disable support for K&R C function declarations

\-fno-max-type-align[¶](#cmdoption-clang-fno-max-type-align "Link to this definition")

\-fno-modules-check-relocated<arg>[¶](#cmdoption-clang-fno-modules-check-relocated-arg "Link to this definition")

Skip checks for relocated modules when loading PCM files

Do not enforce -fmodules-decluse and private header restrictions for textual headers. This flag will be removed in a future Clang release.

\-fno-profile-sample-use, \-fno-auto-profile[¶](#cmdoption-clang-fno-profile-sample-use "Link to this definition")

\-fno-strict-modules-decluse[¶](#cmdoption-clang-fno-strict-modules-decluse "Link to this definition")

\-fno-temp-file[¶](#cmdoption-clang-fno-temp-file "Link to this definition")

Directly create compilation output files. This may lead to incorrect incremental builds if the compiler crashes

\-fno-working-directory[¶](#cmdoption-clang-fno-working-directory "Link to this definition")

\-fno\_modules-validate-input-files-content[¶](#cmdoption-clang-fno_modules-validate-input-files-content "Link to this definition")

\-fno\_pch-validate-input-files-content[¶](#cmdoption-clang1-fno_pch-validate-input-files-content "Link to this definition")

\-fobjc-abi-version\=<arg>[¶](#cmdoption-clang-fobjc-abi-version "Link to this definition")

\-fobjc-arc, \-fno-objc-arc[¶](#cmdoption-clang-fobjc-arc "Link to this definition")

Synthesize retain and release calls for Objective-C pointers

\-fobjc-arc-exceptions, \-fno-objc-arc-exceptions[¶](#cmdoption-clang-fobjc-arc-exceptions "Link to this definition")

Use EH-safe code when synthesizing retains and releases in -fobjc-arc

\-fobjc-avoid-heapify-local-blocks, \-fno-objc-avoid-heapify-local-blocks[¶](#cmdoption-clang-fobjc-avoid-heapify-local-blocks "Link to this definition")

Try to avoid heapifying local blocks

\-fobjc-convert-messages-to-runtime-calls, \-fno-objc-convert-messages-to-runtime-calls[¶](#cmdoption-clang-fobjc-convert-messages-to-runtime-calls "Link to this definition")

\-fobjc-disable-direct-methods-for-testing[¶](#cmdoption-clang-fobjc-disable-direct-methods-for-testing "Link to this definition")

Ignore attribute objc\_direct so that direct methods can be tested

\-fobjc-encode-cxx-class-template-spec, \-fno-objc-encode-cxx-class-template-spec[¶](#cmdoption-clang-fobjc-encode-cxx-class-template-spec "Link to this definition")

Fully encode c++ class template specialization

\-fobjc-exceptions, \-fno-objc-exceptions[¶](#cmdoption-clang-fobjc-exceptions "Link to this definition")

Enable Objective-C exceptions

\-fobjc-legacy-dispatch, \-fno-objc-legacy-dispatch[¶](#cmdoption-clang-fobjc-legacy-dispatch "Link to this definition")

\-fobjc-link-runtime[¶](#cmdoption-clang-fobjc-link-runtime "Link to this definition")

\-fobjc-nonfragile-abi, \-fno-objc-nonfragile-abi[¶](#cmdoption-clang-fobjc-nonfragile-abi "Link to this definition")

\-fobjc-nonfragile-abi-version\=<arg>[¶](#cmdoption-clang-fobjc-nonfragile-abi-version "Link to this definition")

\-fobjc-runtime\=<arg>[¶](#cmdoption-clang-fobjc-runtime "Link to this definition")

Specify the target Objective-C runtime kind and version

\-fobjc-sender-dependent-dispatch[¶](#cmdoption-clang-fobjc-sender-dependent-dispatch "Link to this definition")

\-fobjc-weak, \-fno-objc-weak[¶](#cmdoption-clang-fobjc-weak "Link to this definition")

Enable ARC-style weak references in Objective-C

\-foffload-lto\=<arg>, \-foffload-lto (equivalent to \-foffload-lto=full)[¶](#cmdoption-clang-foffload-lto "Link to this definition")

Set LTO mode for offload compilation. <arg> must be ‘thin’ or ‘full’.

\-foffload-uniform-block, \-cl-uniform-work-group-size, \-fno-offload-uniform-block[¶](#cmdoption-clang-foffload-uniform-block "Link to this definition")

Assume that kernels are launched with uniform block sizes (default true for CUDA/HIP and false otherwise)

\-fomit-frame-pointer, \-fno-omit-frame-pointer[¶](#cmdoption-clang-fomit-frame-pointer "Link to this definition")

Omit the frame pointer from functions that don’t need it. Some stack unwinding cases, such as profilers and sanitizers, may prefer specifying -fno-omit-frame-pointer. On many targets, -O1 and higher omit the frame pointer by default. -m\[no-\]omit-leaf-frame-pointer takes precedence for leaf functions

\-fopenacc[¶](#cmdoption-clang-fopenacc "Link to this definition")

Enable OpenACC

\-fopenmp, \-fno-openmp[¶](#cmdoption-clang-fopenmp "Link to this definition")

Parse OpenMP pragmas and generate parallel code.

\-fopenmp-extensions, \-fno-openmp-extensions[¶](#cmdoption-clang-fopenmp-extensions "Link to this definition")

Enable all Clang extensions for OpenMP directives and clauses

\-fopenmp-force-usm[¶](#cmdoption-clang-fopenmp-force-usm "Link to this definition")

Force behavior as if the user specified pragma omp requires unified\_shared\_memory.

\-fopenmp-offload-mandatory[¶](#cmdoption-clang-fopenmp-offload-mandatory "Link to this definition")

Do not create a host fallback if offloading to the device fails.

\-fopenmp-simd, \-fno-openmp-simd[¶](#cmdoption-clang-fopenmp-simd "Link to this definition")

Emit OpenMP code only for SIMD-based constructs.

\-fopenmp-target-debug, \-fno-openmp-target-debug[¶](#cmdoption-clang-fopenmp-target-debug "Link to this definition")

Enable debugging in the OpenMP offloading device RTL

\-fopenmp-target-jit[¶](#cmdoption-clang-fopenmp-target-jit "Link to this definition")

Emit code that can be JIT compiled for OpenMP offloading. Implies -foffload-lto=full

\-fopenmp-version\=<arg>[¶](#cmdoption-clang-fopenmp-version "Link to this definition")

Set OpenMP version (e.g. 45 for OpenMP 4.5, 51 for OpenMP 5.1). Default value is 51 for Clang

\-fopenmp\=<arg>[¶](#cmdoption-clang1-fopenmp "Link to this definition")

\-foperator-arrow-depth\=<arg>[¶](#cmdoption-clang-foperator-arrow-depth "Link to this definition")

Maximum number of ‘operator->’s to call for a member access

\-foperator-names, \-fno-operator-names[¶](#cmdoption-clang-foperator-names "Link to this definition")

\-foptimization-record-file\=<file>[¶](#cmdoption-clang-foptimization-record-file "Link to this definition")

Specify the output name of the file containing the optimization remarks. Implies -fsave-optimization-record. On Darwin platforms, this cannot be used with multiple -arch <arch> options.

\-foptimization-record-passes\=<regex>[¶](#cmdoption-clang-foptimization-record-passes "Link to this definition")

Only include passes which match a specified regular expression in the generated optimization record (by default, include all passes)

\-foptimize-sibling-calls, \-fno-optimize-sibling-calls[¶](#cmdoption-clang-foptimize-sibling-calls "Link to this definition")

\-foutput-class-dir\=<arg>, \--output-class-directory <arg>, \--output-class-directory\=<arg>[¶](#cmdoption-clang-foutput-class-dir "Link to this definition")

\-fpack-struct, \-fno-pack-struct[¶](#cmdoption-clang-fpack-struct "Link to this definition")

\-fpack-struct\=<arg>[¶](#cmdoption-clang1-fpack-struct "Link to this definition")

Specify the default maximum struct packing alignment

\-fpascal-strings, \-fno-pascal-strings, \-mpascal-strings[¶](#cmdoption-clang-fpascal-strings "Link to this definition")

Recognize and construct Pascal-style string literals

\-fpass-plugin\=<dsopath>[¶](#cmdoption-clang-fpass-plugin "Link to this definition")

Load pass plugin from a dynamic shared object file (only with new pass manager).

\-fpatchable-function-entry\=<N,M,Section>[¶](#cmdoption-clang-fpatchable-function-entry "Link to this definition")

Generate M NOPs before function entry and N-M NOPs after function entry. If section is specified, use it instead of \_\_patchable\_function\_entries.

\-fpcc-struct-return[¶](#cmdoption-clang-fpcc-struct-return "Link to this definition")

Override the default ABI to return all structs on the stack

\-fpch-codegen, \-fno-pch-codegen[¶](#cmdoption-clang-fpch-codegen "Link to this definition")

Generate code for uses of this PCH that assumes an explicit object file will be built for the PCH

\-fpch-debuginfo, \-fno-pch-debuginfo[¶](#cmdoption-clang-fpch-debuginfo "Link to this definition")

Generate debug info for types in an object file built from this PCH and do not generate them elsewhere

\-fpch-instantiate-templates, \-fno-pch-instantiate-templates[¶](#cmdoption-clang-fpch-instantiate-templates "Link to this definition")

Instantiate templates already while building a PCH

\-fpch-preprocess[¶](#cmdoption-clang-fpch-preprocess "Link to this definition")

\-fpch-validate-input-files-content[¶](#cmdoption-clang-fpch-validate-input-files-content "Link to this definition")

Validate PCH input files based on content if mtime differs

\-fpic, \-fno-pic[¶](#cmdoption-clang-fpic "Link to this definition")

\-fpie, \-fno-pie[¶](#cmdoption-clang-fpie "Link to this definition")

\-fplt, \-fno-plt[¶](#cmdoption-clang-fplt "Link to this definition")

\-fplugin\=<dsopath>[¶](#cmdoption-clang-fplugin "Link to this definition")

Load the named plugin (dynamic shared object)

\-fpointer-tbaa, \-fno-pointer-tbaa[¶](#cmdoption-clang-fpointer-tbaa "Link to this definition")

\-fprebuilt-implicit-modules, \-fno-prebuilt-implicit-modules[¶](#cmdoption-clang-fprebuilt-implicit-modules "Link to this definition")

Look up implicit modules in the prebuilt module path

\-fproc-stat-report<arg>[¶](#cmdoption-clang-fproc-stat-report-arg "Link to this definition")

Print subprocess statistics

\-fproc-stat-report\=<arg>[¶](#cmdoption-clang1-fproc-stat-report "Link to this definition")

Save subprocess statistics to the given file

\-fprofile-arcs, \-fno-profile-arcs[¶](#cmdoption-clang-fprofile-arcs "Link to this definition")

Instrument code to produce gcov data files (\*.gcda)

\-fprofile-continuous[¶](#cmdoption-clang-fprofile-continuous "Link to this definition")

Enable continuous instrumentation profiling mode

\-fprofile-dir\=<arg>[¶](#cmdoption-clang-fprofile-dir "Link to this definition")

\-fprofile-exclude-files\=<arg>[¶](#cmdoption-clang-fprofile-exclude-files "Link to this definition")

Instrument only functions from files where names don’t match all the regexes separated by a semi-colon

\-fprofile-filter-files\=<arg>[¶](#cmdoption-clang-fprofile-filter-files "Link to this definition")

Instrument only functions from files where names match any regex separated by a semi-colon

\-fprofile-function-groups\=<N>[¶](#cmdoption-clang-fprofile-function-groups "Link to this definition")

Partition functions into N groups and select only functions in group i to be instrumented using -fprofile-selected-function-group

\-fprofile-generate, \-fno-profile-generate[¶](#cmdoption-clang-fprofile-generate "Link to this definition")

Generate instrumented code to collect execution counts into default.profraw (overridden by LLVM\_PROFILE\_FILE env var)

\-fprofile-generate-cold-function-coverage[¶](#cmdoption-clang-fprofile-generate-cold-function-coverage "Link to this definition")

Generate instrumented code to collect coverage info for cold functions into default.profraw file (overridden by ‘=’ form of option or LLVM\_PROFILE\_FILE env var)

\-fprofile-generate-cold-function-coverage\=<directory>[¶](#cmdoption-clang1-fprofile-generate-cold-function-coverage "Link to this definition")

Generate instrumented code to collect coverage info for cold functions into <directory>/default.profraw (overridden by LLVM\_PROFILE\_FILE env var)

\-fprofile-generate\=<directory>[¶](#cmdoption-clang1-fprofile-generate "Link to this definition")

Generate instrumented code to collect execution counts into <directory>/default.profraw (overridden by LLVM\_PROFILE\_FILE env var)

\-fprofile-instr-generate, \-fno-profile-instr-generate[¶](#cmdoption-clang-fprofile-instr-generate "Link to this definition")

Generate instrumented code to collect execution counts into default.profraw file (overridden by ‘=’ form of option or LLVM\_PROFILE\_FILE env var)

\-fprofile-instr-generate\=<file>[¶](#cmdoption-clang1-fprofile-instr-generate "Link to this definition")

Generate instrumented code to collect execution counts into <file> (overridden by LLVM\_PROFILE\_FILE env var)

\-fprofile-instr-use, \-fno-profile-instr-use, \-fprofile-use[¶](#cmdoption-clang-fprofile-instr-use "Link to this definition")

\-fprofile-instr-use\=<arg>[¶](#cmdoption-clang1-fprofile-instr-use "Link to this definition")

Use instrumentation data for profile-guided optimization

\-fprofile-list\=<arg>[¶](#cmdoption-clang-fprofile-list "Link to this definition")

Filename defining the list of functions/files to instrument. The file uses the sanitizer special case list format.

\-fprofile-remapping-file\=<file>[¶](#cmdoption-clang-fprofile-remapping-file "Link to this definition")

Use the remappings described in <file> to match the profile data against names in the program

\-fprofile-sample-accurate, \-fauto-profile-accurate, \-fno-profile-sample-accurate[¶](#cmdoption-clang-fprofile-sample-accurate "Link to this definition")

Specifies that the sample profile is accurate. If the sample

profile is accurate, callsites without profile samples are marked as cold. Otherwise, treat callsites without profile samples as if we have no profile

\-fprofile-sample-use\=<arg>, \-fauto-profile\=<arg>[¶](#cmdoption-clang-fprofile-sample-use "Link to this definition")

Enable sample-based profile guided optimizations

\-fprofile-selected-function-group\=<i>[¶](#cmdoption-clang-fprofile-selected-function-group "Link to this definition")

Partition functions into N groups using -fprofile-function-groups and select only functions in group i to be instrumented. The valid range is 0 to N-1 inclusive

\-fprofile-update\=<method>[¶](#cmdoption-clang-fprofile-update "Link to this definition")

Set update method of profile counters. <method> must be ‘atomic’, ‘prefer-atomic’ or ‘single’.

\-fprofile-use\=<pathname>[¶](#cmdoption-clang1-fprofile-use "Link to this definition")

Use instrumentation data for profile-guided optimization. If pathname is a directory, it reads from <pathname>/default.profdata. Otherwise, it reads from file <pathname>.

\-fprotect-parens, \-fno-protect-parens[¶](#cmdoption-clang-fprotect-parens "Link to this definition")

Determines whether the optimizer honors parentheses when floating-point expressions are evaluated

\-fpseudo-probe-for-profiling, \-fno-pseudo-probe-for-profiling[¶](#cmdoption-clang-fpseudo-probe-for-profiling "Link to this definition")

Emit pseudo probes for sample profiling

\-fptrauth-auth-traps, \-fno-ptrauth-auth-traps[¶](#cmdoption-clang-fptrauth-auth-traps "Link to this definition")

Enable traps on authentication failures

\-fptrauth-block-descriptor-pointers, \-fno-ptrauth-block-descriptor-pointers[¶](#cmdoption-clang-fptrauth-block-descriptor-pointers "Link to this definition")

Enable signing and authentication of block descriptors

\-fptrauth-calls, \-fno-ptrauth-calls[¶](#cmdoption-clang-fptrauth-calls "Link to this definition")

Enable signing and authentication of all indirect calls

\-fptrauth-elf-got, \-fno-ptrauth-elf-got[¶](#cmdoption-clang-fptrauth-elf-got "Link to this definition")

Enable authentication of pointers from GOT (ELF only)

\-fptrauth-function-pointer-type-discrimination, \-fno-ptrauth-function-pointer-type-discrimination[¶](#cmdoption-clang-fptrauth-function-pointer-type-discrimination "Link to this definition")

Enable type discrimination on C function pointers

\-fptrauth-indirect-gotos, \-fno-ptrauth-indirect-gotos[¶](#cmdoption-clang-fptrauth-indirect-gotos "Link to this definition")

Enable signing and authentication of indirect goto targets

\-fptrauth-init-fini, \-fno-ptrauth-init-fini[¶](#cmdoption-clang-fptrauth-init-fini "Link to this definition")

Enable signing of function pointers in init/fini arrays

\-fptrauth-init-fini-address-discrimination, \-fno-ptrauth-init-fini-address-discrimination[¶](#cmdoption-clang-fptrauth-init-fini-address-discrimination "Link to this definition")

Enable address discrimination of function pointers in init/fini arrays

\-fptrauth-intrinsics, \-fno-ptrauth-intrinsics[¶](#cmdoption-clang-fptrauth-intrinsics "Link to this definition")

Enable pointer authentication intrinsics

\-fptrauth-objc-class-ro, \-fno-ptrauth-objc-class-ro[¶](#cmdoption-clang-fptrauth-objc-class-ro "Link to this definition")

Enable signing and authentication for ObjC class\_ro pointers

\-fptrauth-objc-interface-sel, \-fno-ptrauth-objc-interface-sel[¶](#cmdoption-clang-fptrauth-objc-interface-sel "Link to this definition")

Enable signing and authentication of Objective-C object’s ‘SEL’ fields

\-fptrauth-objc-isa, \-fno-ptrauth-objc-isa[¶](#cmdoption-clang-fptrauth-objc-isa "Link to this definition")

Enable signing and authentication of Objective-C object’s ‘isa’ field

\-fptrauth-returns, \-fno-ptrauth-returns[¶](#cmdoption-clang-fptrauth-returns "Link to this definition")

Enable signing and authentication of return addresses

\-fptrauth-type-info-vtable-pointer-discrimination, \-fno-ptrauth-type-info-vtable-pointer-discrimination[¶](#cmdoption-clang-fptrauth-type-info-vtable-pointer-discrimination "Link to this definition")

Enable type and address discrimination of vtable pointer of std::type\_info

\-fptrauth-vtable-pointer-address-discrimination, \-fno-ptrauth-vtable-pointer-address-discrimination[¶](#cmdoption-clang-fptrauth-vtable-pointer-address-discrimination "Link to this definition")

Enable address discrimination of vtable pointers

\-fptrauth-vtable-pointer-type-discrimination, \-fno-ptrauth-vtable-pointer-type-discrimination[¶](#cmdoption-clang-fptrauth-vtable-pointer-type-discrimination "Link to this definition")

Enable type discrimination of vtable pointers

\-fraw-string-literals, \-fno-raw-string-literals[¶](#cmdoption-clang-fraw-string-literals "Link to this definition")

Enable raw string literals

\-freciprocal-math, \-fno-reciprocal-math[¶](#cmdoption-clang-freciprocal-math "Link to this definition")

Allow division operations to be reassociated

\-frecord-command-line, \-fno-record-command-line, \-frecord-gcc-switches[¶](#cmdoption-clang-frecord-command-line "Link to this definition")

Generate a section named “.GCC.command.line” containing the driver command-line. After linking, the section may contain multiple command lines, which will be individually terminated by null bytes. Separate arguments within a command line are combined with spaces; spaces and backslashes within an argument are escaped with backslashes. This format differs from the format of the equivalent section produced by GCC with the -frecord-gcc-switches flag. This option is currently only supported on ELF targets.

\-freg-struct-return[¶](#cmdoption-clang-freg-struct-return "Link to this definition")

Override the default ABI to return small structs in registers

\-fregister-global-dtors-with-atexit, \-fno-register-global-dtors-with-atexit[¶](#cmdoption-clang-fregister-global-dtors-with-atexit "Link to this definition")

Use atexit or \_\_cxa\_atexit to register global destructors

\-frewrite-imports, \-fno-rewrite-imports[¶](#cmdoption-clang-frewrite-imports "Link to this definition")

\-frewrite-includes, \-fno-rewrite-includes[¶](#cmdoption-clang-frewrite-includes "Link to this definition")

\-fropi, \-fno-ropi[¶](#cmdoption-clang-fropi "Link to this definition")

Generate read-only position independent code (ARM only)

\-frounding-math, \-fno-rounding-math[¶](#cmdoption-clang-frounding-math "Link to this definition")

\-frtlib-defaultlib, \-fno-rtlib-defaultlib[¶](#cmdoption-clang-frtlib-defaultlib "Link to this definition")

On Windows, emit /defaultlib: directives to link compiler-rt libraries (default)

\-frtti, \-fno-rtti[¶](#cmdoption-clang-frtti "Link to this definition")

\-frtti-data, \-fno-rtti-data[¶](#cmdoption-clang-frtti-data "Link to this definition")

\-frwpi, \-fno-rwpi[¶](#cmdoption-clang-frwpi "Link to this definition")

Generate read-write position independent code (ARM only)

\-fsafe-buffer-usage-suggestions, \-fno-safe-buffer-usage-suggestions[¶](#cmdoption-clang-fsafe-buffer-usage-suggestions "Link to this definition")

Display suggestions to update code associated with -Wunsafe-buffer-usage warnings

\-fsample-profile-use-profi, \-fno-sample-profile-use-profi[¶](#cmdoption-clang-fsample-profile-use-profi "Link to this definition")

Infer block and edge counts. If the profiles have errors or missing

blocks caused by sampling, profile inference (profi) can convert basic block counts to branch probabilities to fix them by extended and re-engineered classic MCMF (min-cost max-flow) approach.

\-fsanitize-debug-trap-reasons, \-fno-sanitize-debug-trap-reasons[¶](#cmdoption-clang-fsanitize-debug-trap-reasons "Link to this definition")

Annotate trap blocks in debug info with UBSan trap reasons

\-fsanitize-memory-param-retval, \-fno-sanitize-memory-param-retval[¶](#cmdoption-clang-fsanitize-memory-param-retval "Link to this definition")

Enable detection of uninitialized parameters and return values

\-fsanitize-stable-abi, \-fno-sanitize-stable-abi[¶](#cmdoption-clang-fsanitize-stable-abi "Link to this definition")

Stable ABI instrumentation for sanitizer runtime. Default: Conventional

\-fsave-optimization-record, \-fno-save-optimization-record[¶](#cmdoption-clang-fsave-optimization-record "Link to this definition")

Generate a YAML optimization record file

\-fsave-optimization-record\=<format>[¶](#cmdoption-clang1-fsave-optimization-record "Link to this definition")

Generate an optimization record file in a specific format

\-fseh-exceptions[¶](#cmdoption-clang-fseh-exceptions "Link to this definition")

Use SEH style exceptions

\-fsemantic-interposition, \-fno-semantic-interposition[¶](#cmdoption-clang-fsemantic-interposition "Link to this definition")

Enable semantic interposition. Semantic interposition allows for the interposition of a symbol by another at runtime, thus preventing a range of inter-procedural optimisation.

\-fseparate-named-sections, \-fno-separate-named-sections[¶](#cmdoption-clang-fseparate-named-sections "Link to this definition")

Use separate unique sections for named sections (ELF Only)

\-fshort-enums, \-fno-short-enums[¶](#cmdoption-clang-fshort-enums "Link to this definition")

Allocate to an enum type only as many bytes as it needs for the declared range of possible values

\-fshort-wchar, \-fno-short-wchar[¶](#cmdoption-clang-fshort-wchar "Link to this definition")

Force wchar\_t to be a short unsigned int

\-fshow-column, \-fno-show-column[¶](#cmdoption-clang-fshow-column "Link to this definition")

\-fshow-overloads\=<arg>[¶](#cmdoption-clang-fshow-overloads "Link to this definition")

Which overload candidates to show when overload resolution fails. Defaults to ‘all’. <arg> must be ‘best’ or ‘all’.

\-fshow-source-location, \-fno-show-source-location[¶](#cmdoption-clang-fshow-source-location "Link to this definition")

\-fsignaling-math, \-fno-signaling-math[¶](#cmdoption-clang-fsignaling-math "Link to this definition")

\-fsigned-bitfields[¶](#cmdoption-clang-fsigned-bitfields "Link to this definition")

\-fsigned-char, \-fno-signed-char, \--signed-char[¶](#cmdoption-clang-fsigned-char "Link to this definition")

char is signed

\-fsigned-zeros, \-fno-signed-zeros[¶](#cmdoption-clang-fsigned-zeros "Link to this definition")

\-fsized-deallocation, \-fno-sized-deallocation[¶](#cmdoption-clang-fsized-deallocation "Link to this definition")

Enable C++14 sized global deallocation functions

\-fsjlj-exceptions[¶](#cmdoption-clang-fsjlj-exceptions "Link to this definition")

Use SjLj style exceptions

\-fskip-odr-check-in-gmf, \-fno-skip-odr-check-in-gmf[¶](#cmdoption-clang-fskip-odr-check-in-gmf "Link to this definition")

Skip ODR checks for decls in the global module fragment.

\-fslp-vectorize, \-fno-slp-vectorize, \-ftree-slp-vectorize[¶](#cmdoption-clang-fslp-vectorize "Link to this definition")

Enable the superword-level parallelism vectorization passes

\-fspell-checking, \-fno-spell-checking[¶](#cmdoption-clang-fspell-checking "Link to this definition")

\-fspell-checking-limit\=<arg>[¶](#cmdoption-clang-fspell-checking-limit "Link to this definition")

Set the maximum number of times to perform spell checking on unrecognized identifiers (0 = no limit)

\-fsplit-dwarf-inlining, \-fno-split-dwarf-inlining[¶](#cmdoption-clang-fsplit-dwarf-inlining "Link to this definition")

Provide minimal debug info in the object/executable to facilitate online symbolication/stack traces in the absence of .dwo/.dwp files when using Split DWARF

\-fsplit-lto-unit, \-fno-split-lto-unit[¶](#cmdoption-clang-fsplit-lto-unit "Link to this definition")

Enables splitting of the LTO unit

\-fsplit-machine-functions, \-fno-split-machine-functions[¶](#cmdoption-clang-fsplit-machine-functions "Link to this definition")

Enable late function splitting using profile information (x86 and aarch64 ELF)

\-fsplit-stack, \-fno-split-stack[¶](#cmdoption-clang-fsplit-stack "Link to this definition")

Use segmented stack

\-fstack-clash-protection, \-fno-stack-clash-protection[¶](#cmdoption-clang-fstack-clash-protection "Link to this definition")

Instrument stack allocation to prevent stack clash attacks

\-fstack-protector, \-fno-stack-protector[¶](#cmdoption-clang-fstack-protector "Link to this definition")

Enable stack protectors for some functions vulnerable to stack smashing. This uses a loose heuristic which considers functions vulnerable if they contain a char (or 8bit integer) array or constant sized calls to alloca , which are of greater size than ssp-buffer-size (default: 8 bytes). All variable sized calls to alloca are considered vulnerable. A function with a stack protector has a guard value added to the stack frame that is checked on function exit. The guard value must be positioned in the stack frame such that a buffer overflow from a vulnerable variable will overwrite the guard value before overwriting the function’s return address. The reference stack guard value is stored in a global variable.

\-fstack-protector-all[¶](#cmdoption-clang-fstack-protector-all "Link to this definition")

Enable stack protectors for all functions

\-fstack-protector-strong[¶](#cmdoption-clang-fstack-protector-strong "Link to this definition")

Enable stack protectors for some functions vulnerable to stack smashing. Compared to -fstack-protector, this uses a stronger heuristic that includes functions containing arrays of any size (and any type), as well as any calls to alloca or the taking of an address from a local variable

\-fstack-size-section, \-fno-stack-size-section[¶](#cmdoption-clang-fstack-size-section "Link to this definition")

Emit section containing metadata on function stack sizes

\-fstack-usage[¶](#cmdoption-clang-fstack-usage "Link to this definition")

Emit .su file containing information on function stack sizes

\-fstandalone-debug, \-fno-limit-debug-info, \-fno-standalone-debug[¶](#cmdoption-clang-fstandalone-debug "Link to this definition")

Emit full debug info for all types used by the program

\-fstrict-aliasing, \-fno-strict-aliasing[¶](#cmdoption-clang-fstrict-aliasing "Link to this definition")

Enable optimizations based on strict aliasing rules

\-fstrict-enums, \-fno-strict-enums[¶](#cmdoption-clang-fstrict-enums "Link to this definition")

Enable optimizations based on the strict definition of an enum’s value range

\-fstrict-flex-arrays\=<n>[¶](#cmdoption-clang-fstrict-flex-arrays "Link to this definition")

If `<n>` is equal to 0, any trailing array member is considered a flexible array.

If `<n>` is equal to 1, trailing array members of size 0, 1 or undefined are considered flexible arrays. If `<n>` is equal to 2, trailing array members of size 0 or undefined are considered flexible arrays. If `<n>` is equal to 3, only trailing array members of undefined size are considered flexible arrays. <n> must be ‘0’, ‘1’, ‘2’ or ‘3’.

\-fstrict-float-cast-overflow, \-fno-strict-float-cast-overflow[¶](#cmdoption-clang-fstrict-float-cast-overflow "Link to this definition")

Assume that overflowing float-to-int casts are undefined (default)

\-fstrict-overflow, \-fno-strict-overflow[¶](#cmdoption-clang-fstrict-overflow "Link to this definition")

\-fstrict-return, \-fno-strict-return[¶](#cmdoption-clang-fstrict-return "Link to this definition")

\-fstrict-vtable-pointers, \-fno-strict-vtable-pointers[¶](#cmdoption-clang-fstrict-vtable-pointers "Link to this definition")

Enable optimizations based on the strict rules for overwriting polymorphic C++ objects

\-fstruct-path-tbaa, \-fno-struct-path-tbaa[¶](#cmdoption-clang-fstruct-path-tbaa "Link to this definition")

\-fswift-async-fp\=<option>[¶](#cmdoption-clang-fswift-async-fp "Link to this definition")

Control emission of Swift async extended frame info. <option> must be ‘auto’, ‘always’ or ‘never’.

\-fsymbol-partition\=<arg>[¶](#cmdoption-clang-fsymbol-partition "Link to this definition")

\-ftabstop\=<arg>[¶](#cmdoption-clang-ftabstop "Link to this definition")

\-ftemplate-backtrace-limit\=<arg>[¶](#cmdoption-clang-ftemplate-backtrace-limit "Link to this definition")

Set the maximum number of entries to print in a template instantiation backtrace (0 = no limit)

\-ftemplate-depth\=<arg>, \-ftemplate-depth-<arg>[¶](#cmdoption-clang-ftemplate-depth "Link to this definition")

Set the maximum depth of recursive template instantiation

\-ftemporal-profile[¶](#cmdoption-clang-ftemporal-profile "Link to this definition")

Generate instrumented code to collect temporal information

\-ftest-coverage, \-fno-test-coverage[¶](#cmdoption-clang-ftest-coverage "Link to this definition")

Produce gcov notes files (\*.gcno)

\-fthin-link-bitcode\=<arg>[¶](#cmdoption-clang-fthin-link-bitcode "Link to this definition")

Write minimized bitcode to <file> for the ThinLTO thin link only

\-fthinlto-distributor\=<path>[¶](#cmdoption-clang-fthinlto-distributor "Link to this definition")

Path to the ThinLTO distributor process. If specified, ThinLTO backend compilations will be distributed by LLD

\-fthinlto-index\=<arg>[¶](#cmdoption-clang-fthinlto-index "Link to this definition")

Perform ThinLTO importing using provided function summary index

\-fthreadsafe-statics, \-fno-threadsafe-statics[¶](#cmdoption-clang-fthreadsafe-statics "Link to this definition")

\-ftime-report[¶](#cmdoption-clang-ftime-report "Link to this definition")

\-ftime-report-json[¶](#cmdoption-clang-ftime-report-json "Link to this definition")

\-ftime-report\=<arg>[¶](#cmdoption-clang1-ftime-report "Link to this definition")

(For new pass manager) ‘per-pass’: one report for each pass; ‘per-pass-run’: one report for each pass invocation. <arg> must be ‘per-pass’ or ‘per-pass-run’.

\-ftime-trace[¶](#cmdoption-clang-ftime-trace "Link to this definition")

Turn on time profiler. Generates JSON file based on output filename. Results can be analyzed with chrome://tracing or [Speedscope App](https://www.speedscope.app/) for flamegraph visualization.

\-ftime-trace-granularity\=<arg>[¶](#cmdoption-clang-ftime-trace-granularity "Link to this definition")

Minimum time granularity (in microseconds) traced by time profiler

\-ftime-trace-verbose<arg>[¶](#cmdoption-clang-ftime-trace-verbose-arg "Link to this definition")

Make time trace capture verbose event details (e.g. source filenames). This can increase the size of the output by 2-3 times

\-ftime-trace\=<arg>[¶](#cmdoption-clang1-ftime-trace "Link to this definition")

Similar to -ftime-trace. Specify the JSON file or a directory which will contain the JSON file

\-ftls-model\=<arg>[¶](#cmdoption-clang-ftls-model "Link to this definition")

<arg> must be ‘global-dynamic’, ‘local-dynamic’, ‘initial-exec’ or ‘local-exec’.

\-ftrap-function\=<arg>[¶](#cmdoption-clang-ftrap-function "Link to this definition")

Issue call to specified function rather than a trap instruction

\-ftrapping-math, \-fno-trapping-math[¶](#cmdoption-clang-ftrapping-math "Link to this definition")

\-ftrapv[¶](#cmdoption-clang-ftrapv "Link to this definition")

Trap on integer overflow

\-ftrapv-handler <arg>[¶](#cmdoption-clang-ftrapv-handler "Link to this definition")

\-ftrapv-handler\=<function name>[¶](#cmdoption-clang1-ftrapv-handler "Link to this definition")

Specify the function to be called on overflow

\-ftrigraphs, \-fno-trigraphs, \-trigraphs, \--trigraphs[¶](#cmdoption-clang-ftrigraphs "Link to this definition")

Process trigraph sequences

\-ftrivial-auto-var-init-max-size\=<arg>[¶](#cmdoption-clang-ftrivial-auto-var-init-max-size "Link to this definition")

Stop initializing trivial automatic stack variables if var size exceeds the specified number of instances (in bytes)

\-ftrivial-auto-var-init-stop-after\=<arg>[¶](#cmdoption-clang-ftrivial-auto-var-init-stop-after "Link to this definition")

Stop initializing trivial automatic stack variables after the specified number of instances

\-ftrivial-auto-var-init\=<arg>[¶](#cmdoption-clang-ftrivial-auto-var-init "Link to this definition")

Initialize trivial automatic stack variables. Defaults to ‘uninitialized’. <arg> must be ‘uninitialized’, ‘zero’ or ‘pattern’.

\-funified-lto, \-fno-unified-lto[¶](#cmdoption-clang-funified-lto "Link to this definition")

Use the unified LTO pipeline

\-funique-basic-block-section-names, \-fno-unique-basic-block-section-names[¶](#cmdoption-clang-funique-basic-block-section-names "Link to this definition")

Use unique names for basic block sections (ELF Only)

\-funique-internal-linkage-names, \-fno-unique-internal-linkage-names[¶](#cmdoption-clang-funique-internal-linkage-names "Link to this definition")

Uniqueify Internal Linkage Symbol Names by appending the MD5 hash of the module path

\-funique-section-names, \-fno-unique-section-names[¶](#cmdoption-clang-funique-section-names "Link to this definition")

\-funique-source-file-identifier\=<arg>[¶](#cmdoption-clang-funique-source-file-identifier "Link to this definition")

Specify the source file identifier for -funique-source-file-names; uses the source file path if not specified

\-funique-source-file-names, \-fno-unique-source-file-names[¶](#cmdoption-clang-funique-source-file-names "Link to this definition")

Allow the compiler to assume that each translation unit has a unique source file identifier (see -funique-source-file-identifier) at link time

\-funroll-loops, \-fno-unroll-loops[¶](#cmdoption-clang-funroll-loops "Link to this definition")

Turn on loop unroller

\-funsafe-math-optimizations, \-fno-unsafe-math-optimizations[¶](#cmdoption-clang-funsafe-math-optimizations "Link to this definition")

Allow unsafe floating-point math optimizations which may decrease precision

\-funsigned-bitfields[¶](#cmdoption-clang-funsigned-bitfields "Link to this definition")

\-funsigned-char, \-fno-unsigned-char, \--unsigned-char[¶](#cmdoption-clang-funsigned-char "Link to this definition")

\-funwind-tables, \-fno-unwind-tables[¶](#cmdoption-clang-funwind-tables "Link to this definition")

\-fuse-cxa-atexit, \-fno-use-cxa-atexit[¶](#cmdoption-clang-fuse-cxa-atexit "Link to this definition")

\-fuse-init-array, \-fno-use-init-array[¶](#cmdoption-clang-fuse-init-array "Link to this definition")

\-fuse-ld\=<arg>[¶](#cmdoption-clang-fuse-ld "Link to this definition")

\-fuse-line-directives, \-fno-use-line-directives[¶](#cmdoption-clang-fuse-line-directives "Link to this definition")

Use #line in preprocessed output

\-fvalidate-ast-input-files-content[¶](#cmdoption-clang-fvalidate-ast-input-files-content "Link to this definition")

Compute and store the hash of input files used to build an AST. Files with mismatching mtime’s are considered valid if both contents is identical

\-fveclib\=<arg>[¶](#cmdoption-clang-fveclib "Link to this definition")

Use the given vector functions library.

Note: -fveclib={ArmPL,SLEEF,libmvec} implies -fno-math-errno. Note: -fveclib=libmvec on AArch64 requires GLIBC 2.40 or newer. <arg> must be ‘Accelerate’, ‘libmvec’, ‘MASSV’, ‘SVML’, ‘SLEEF’, ‘Darwin\_libsystem\_m’, ‘ArmPL’, ‘AMDLIBM’ or ‘none’.

\-fvectorize, \-fno-vectorize, \-ftree-vectorize[¶](#cmdoption-clang-fvectorize "Link to this definition")

Enable the loop vectorization passes

\-fverbose-asm, \-dA, \-fno-verbose-asm[¶](#cmdoption-clang-fverbose-asm "Link to this definition")

Generate verbose assembly output

\-fvirtual-function-elimination, \-fno-virtual-function-elimination[¶](#cmdoption-clang-fvirtual-function-elimination "Link to this definition")

Enables dead virtual function elimination optimization. Requires -flto=full

\-fvisibility-dllexport\=<arg>[¶](#cmdoption-clang-fvisibility-dllexport "Link to this definition")

The visibility for dllexport definitions. If Keep is specified the visibility is not adjusted \[-fvisibility-from-dllstorageclass\]. <arg> must be ‘keep’, ‘hidden’, ‘protected’ or ‘default’.

\-fvisibility-externs-dllimport\=<arg>[¶](#cmdoption-clang-fvisibility-externs-dllimport "Link to this definition")

The visibility for dllimport external declarations. If Keep is specified the visibility is not adjusted \[-fvisibility-from-dllstorageclass\]. <arg> must be ‘keep’, ‘hidden’, ‘protected’ or ‘default’.

\-fvisibility-externs-nodllstorageclass\=<arg>[¶](#cmdoption-clang-fvisibility-externs-nodllstorageclass "Link to this definition")

The visibility for external declarations without an explicit DLL storage class. If Keep is specified the visibility is not adjusted \[-fvisibility-from-dllstorageclass\]. <arg> must be ‘keep’, ‘hidden’, ‘protected’ or ‘default’.

\-fvisibility-from-dllstorageclass, \-fno-visibility-from-dllstorageclass[¶](#cmdoption-clang-fvisibility-from-dllstorageclass "Link to this definition")

Override the visibility of globals based on their final DLL storage class.

\-fvisibility-global-new-delete-hidden[¶](#cmdoption-clang-fvisibility-global-new-delete-hidden "Link to this definition")

Give global C++ operator new and delete declarations hidden visibility

\-fvisibility-global-new-delete\=<arg>[¶](#cmdoption-clang-fvisibility-global-new-delete "Link to this definition")

The visibility for global C++ operator new and delete declarations. If ‘source’ is specified the visibility is not adjusted. <arg> must be ‘force-default’, ‘force-protected’, ‘force-hidden’ or ‘source’.

\-fvisibility-inlines-hidden, \-fno-visibility-inlines-hidden[¶](#cmdoption-clang-fvisibility-inlines-hidden "Link to this definition")

Give inline C++ member functions hidden visibility by default

\-fvisibility-inlines-hidden-static-local-var, \-fno-visibility-inlines-hidden-static-local-var[¶](#cmdoption-clang-fvisibility-inlines-hidden-static-local-var "Link to this definition")

When -fvisibility-inlines-hidden is enabled, static variables in inline C++ member functions will also be given hidden visibility by default

\-fvisibility-ms-compat[¶](#cmdoption-clang-fvisibility-ms-compat "Link to this definition")

Give global types ‘default’ visibility and global functions and variables ‘hidden’ visibility by default

\-fvisibility-nodllstorageclass\=<arg>[¶](#cmdoption-clang-fvisibility-nodllstorageclass "Link to this definition")

The visibility for definitions without an explicit DLL storage class. If Keep is specified the visibility is not adjusted \[-fvisibility-from-dllstorageclass\]. <arg> must be ‘keep’, ‘hidden’, ‘protected’ or ‘default’.

\-fvisibility\=<arg>[¶](#cmdoption-clang-fvisibility "Link to this definition")

Set the default symbol visibility for all global definitions. <arg> must be ‘default’, ‘hidden’, ‘internal’ or ‘protected’.

\-fwasm-exceptions[¶](#cmdoption-clang-fwasm-exceptions "Link to this definition")

Use WebAssembly style exceptions

\-fwhole-program-vtables, \-fno-whole-program-vtables[¶](#cmdoption-clang-fwhole-program-vtables "Link to this definition")

Enables whole-program vtable optimization. Requires -flto

\-fwinx64-eh-unwindv2\=<arg>[¶](#cmdoption-clang-fwinx64-eh-unwindv2 "Link to this definition")

Generate unwind v2 (epilog) information for x64 Windows. <arg> must be ‘disabled’, ‘best-effort’ or ‘required’.

\-fwrapv, \-fno-wrapv[¶](#cmdoption-clang-fwrapv "Link to this definition")

Treat signed integer overflow as two’s complement

\-fwrapv-pointer, \-fno-wrapv-pointer[¶](#cmdoption-clang-fwrapv-pointer "Link to this definition")

Treat pointer overflow as two’s complement

\-fwritable-strings[¶](#cmdoption-clang-fwritable-strings "Link to this definition")

Store string literals as writable data

\-fxl-pragma-pack, \-fno-xl-pragma-pack[¶](#cmdoption-clang-fxl-pragma-pack "Link to this definition")

Enable IBM XL #pragma pack handling

\-fxray-always-emit-customevents, \-fno-xray-always-emit-customevents[¶](#cmdoption-clang-fxray-always-emit-customevents "Link to this definition")

Always emit \_\_xray\_customevent(…) calls even if the containing function is not always instrumented

\-fxray-always-emit-typedevents, \-fno-xray-always-emit-typedevents[¶](#cmdoption-clang-fxray-always-emit-typedevents "Link to this definition")

Always emit \_\_xray\_typedevent(…) calls even if the containing function is not always instrumented

\-fxray-always-instrument\=<arg>[¶](#cmdoption-clang-fxray-always-instrument "Link to this definition")

DEPRECATED: Filename defining the whitelist for imbuing the ‘always instrument’ XRay attribute.

\-fxray-attr-list\=<arg>[¶](#cmdoption-clang-fxray-attr-list "Link to this definition")

Filename defining the list of functions/types for imbuing XRay attributes.

\-fxray-function-groups\=<arg>[¶](#cmdoption-clang-fxray-function-groups "Link to this definition")

Only instrument 1 of N groups

\-fxray-function-index, \-fno-xray-function-index[¶](#cmdoption-clang-fxray-function-index "Link to this definition")

\-fxray-ignore-loops, \-fno-xray-ignore-loops[¶](#cmdoption-clang-fxray-ignore-loops "Link to this definition")

Don’t instrument functions with loops unless they also meet the minimum function size

\-fxray-instruction-threshold\=<arg>[¶](#cmdoption-clang-fxray-instruction-threshold "Link to this definition")

Sets the minimum function size to instrument with XRay

\-fxray-instrument, \-fno-xray-instrument[¶](#cmdoption-clang-fxray-instrument "Link to this definition")

Generate XRay instrumentation sleds on function entry and exit

\-fxray-instrumentation-bundle\=<arg>[¶](#cmdoption-clang-fxray-instrumentation-bundle "Link to this definition")

Select which XRay instrumentation points to emit. Options: all, none, function-entry, function-exit, function, custom. Default is ‘all’. ‘function’ includes both ‘function-entry’ and ‘function-exit’.

\-fxray-link-deps, \-fno-xray-link-deps[¶](#cmdoption-clang-fxray-link-deps "Link to this definition")

Link XRay runtime library when -fxray-instrument is specified (default)

\-fxray-modes\=<arg>[¶](#cmdoption-clang-fxray-modes "Link to this definition")

List of modes to link in by default into XRay instrumented binaries.

\-fxray-never-instrument\=<arg>[¶](#cmdoption-clang-fxray-never-instrument "Link to this definition")

DEPRECATED: Filename defining the whitelist for imbuing the ‘never instrument’ XRay attribute.

\-fxray-selected-function-group\=<arg>[¶](#cmdoption-clang-fxray-selected-function-group "Link to this definition")

When using -fxray-function-groups, select which group of functions to instrument. Valid range is 0 to fxray-function-groups - 1

\-fxray-shared, \-fno-xray-shared[¶](#cmdoption-clang-fxray-shared "Link to this definition")

Enable shared library instrumentation with XRay

\-fzero-call-used-regs\=<arg>[¶](#cmdoption-clang-fzero-call-used-regs "Link to this definition")

Clear call-used registers upon function return (AArch64/x86 only). <arg> must be ‘skip’, ‘used-gpr-arg’, ‘used-gpr’, ‘used-arg’, ‘used’, ‘all-gpr-arg’, ‘all-gpr’, ‘all-arg’ or ‘all’.

\-fzero-initialized-in-bss, \-fno-zero-initialized-in-bss[¶](#cmdoption-clang-fzero-initialized-in-bss "Link to this definition")

\-fzos-extensions, \-fno-zos-extensions[¶](#cmdoption-clang-fzos-extensions "Link to this definition")

Accept some non-standard constructs supported by the z/OS compiler

\-fzvector, \-fno-zvector, \-mzvector[¶](#cmdoption-clang-fzvector "Link to this definition")

Enable System z vector language extension

\-ignore-pch[¶](#cmdoption-clang-ignore-pch "Link to this definition")

Disable precompiled headers, overrides -emit-pch and -include-pch

\-pedantic, \--pedantic, \-no-pedantic, \--no-pedantic[¶](#cmdoption-clang-pedantic "Link to this definition")

Warn on language extensions

\-pedantic-errors, \--pedantic-errors[¶](#cmdoption-clang-pedantic-errors "Link to this definition")

#### [Common Offloading options](#id11)[¶](#common-offloading-options "Link to this heading")

\-cuid\=<arg>[¶](#cmdoption-clang-cuid "Link to this definition")

An ID for compilation unit, which should be the same for the same compilation unit but different for different compilation units. It is used to externalize device-side static variables for single source offloading languages CUDA and HIP so that they can be accessed by the host code of the same compilation unit.

\-fgpu-default-stream\=<arg>[¶](#cmdoption-clang-fgpu-default-stream "Link to this definition")

Specify default stream. The default value is ‘legacy’. (CUDA/HIP only). <arg> must be ‘legacy’ or ‘per-thread’.

\-fgpu-defer-diag, \-fno-gpu-defer-diag[¶](#cmdoption-clang-fgpu-defer-diag "Link to this definition")

Defer host/device related diagnostic messages for CUDA/HIP

\-fgpu-flush-denormals-to-zero, \-fcuda-flush-denormals-to-zero, \-fno-gpu-flush-denormals-to-zero[¶](#cmdoption-clang-fgpu-flush-denormals-to-zero "Link to this definition")

Flush denormal floating point values to zero in CUDA/HIP device mode.

\-fgpu-rdc, \-fcuda-rdc, \-fno-gpu-rdc[¶](#cmdoption-clang-fgpu-rdc "Link to this definition")

Generate relocatable device code, also known as separate compilation mode

\-fgpu-sanitize, \-fno-gpu-sanitize[¶](#cmdoption-clang-fgpu-sanitize "Link to this definition")

Enable sanitizer for supported offloading devices

\-foffload-implicit-host-device-templates, \-fno-offload-implicit-host-device-templates[¶](#cmdoption-clang-foffload-implicit-host-device-templates "Link to this definition")

Template functions or specializations without host, device and global attributes have implicit host device attributes (CUDA/HIP only)

\-foffload-via-llvm, \-fno-offload-via-llvm[¶](#cmdoption-clang-foffload-via-llvm "Link to this definition")

Use LLVM/Offload as portable offloading runtime.

\-fuse-cuid\=<arg>[¶](#cmdoption-clang-fuse-cuid "Link to this definition")

Method to generate ID’s for compilation units for single source offloading languages CUDA and HIP: ‘hash’ (ID’s generated by hashing file path and command line options) | ‘random’ (ID’s generated as random numbers) | ‘none’ (disabled). Default is ‘hash’. This option will be overridden by option ‘-cuid=\[ID\]’ if it is specified.

\--offload-arch-tool\=<arg>, \--amdgpu-arch-tool\=<arg>, \--nvptx-arch-tool\=<arg>[¶](#cmdoption-clang-offload-arch-tool "Link to this definition")

Tool used for detecting offloading architectures in the system.

\--offload-arch\=<arg1>,<arg2>..., \--cuda-gpu-arch\=<arg>, \--no-offload-arch\=<arg1>,<arg2>...[¶](#cmdoption-clang-offload-arch "Link to this definition")

Specify an offloading device architecture for CUDA, HIP, or OpenMP. (e.g. sm\_35). If ‘native’ is used the compiler will detect locally installed architectures. For HIP offloading, the device architecture can be followed by target ID features delimited by a colon (e.g. gfx908:xnack+:sramecc-). May be specified more than once.

\--offload-compress, \--no-offload-compress[¶](#cmdoption-clang-offload-compress "Link to this definition")

Compress offload device binaries (HIP only)

\--offload-device-only, \--cuda-device-only, \-fsycl-device-only[¶](#cmdoption-clang-offload-device-only "Link to this definition")

Only compile for the offloading device.

\--offload-host-device, \--cuda-compile-host-device[¶](#cmdoption-clang-offload-host-device "Link to this definition")

Compile for both the offloading host and device (default).

\--offload-host-only, \--cuda-host-only, \-fsycl-host-only[¶](#cmdoption-clang-offload-host-only "Link to this definition")

Only compile for the offloading host.

\--offload-jobs\=<arg>[¶](#cmdoption-clang-offload-jobs "Link to this definition")

Specify the number of threads to use for device offloading tasks during compilation.

\--offload-new-driver, \--no-offload-new-driver[¶](#cmdoption-clang-offload-new-driver "Link to this definition")

Use the new driver for offloading compilation.

\--offload-targets\=<arg1>,<arg2>..., \-fopenmp-targets\=<arg1>,<arg2>..., \--offload\=<arg1>,<arg2>...[¶](#cmdoption-clang-offload-targets "Link to this definition")

Specify a list of target architectures to use for offloading.

#### [OpenCL options](#id12)[¶](#opencl-options "Link to this heading")

\-cl-denorms-are-zero[¶](#cmdoption-clang-cl-denorms-are-zero "Link to this definition")

OpenCL only. Allow denormals to be flushed to zero.

\-cl-ext\=<arg1>,<arg2>...[¶](#cmdoption-clang-cl-ext "Link to this definition")

OpenCL only. Enable or disable OpenCL extensions/optional features. The argument is a comma-separated sequence of one or more extension names, each prefixed by ‘+’ or ‘-‘.

\-cl-fast-relaxed-math[¶](#cmdoption-clang-cl-fast-relaxed-math "Link to this definition")

OpenCL only. Sets -cl-finite-math-only and -cl-unsafe-math-optimizations, and defines \_\_FAST\_RELAXED\_MATH\_\_.

\-cl-finite-math-only[¶](#cmdoption-clang-cl-finite-math-only "Link to this definition")

OpenCL only. Allow floating-point optimizations that assume arguments and results are not NaNs or +-Inf.

\-cl-fp32-correctly-rounded-divide-sqrt[¶](#cmdoption-clang-cl-fp32-correctly-rounded-divide-sqrt "Link to this definition")

OpenCL only. Specify that single precision floating-point divide and sqrt used in the program source are correctly rounded.

\-cl-kernel-arg-info[¶](#cmdoption-clang-cl-kernel-arg-info "Link to this definition")

OpenCL only. Generate kernel argument metadata.

\-cl-mad-enable[¶](#cmdoption-clang-cl-mad-enable "Link to this definition")

OpenCL only. Allow use of less precise MAD computations in the generated binary.

\-cl-no-signed-zeros[¶](#cmdoption-clang-cl-no-signed-zeros "Link to this definition")

OpenCL only. Allow use of less precise no signed zeros computations in the generated binary.

\-cl-no-stdinc[¶](#cmdoption-clang-cl-no-stdinc "Link to this definition")

OpenCL only. Disables all standard includes containing non-native compiler types and functions.

\-cl-opt-disable[¶](#cmdoption-clang-cl-opt-disable "Link to this definition")

OpenCL only. This option disables all optimizations. By default optimizations are enabled.

\-cl-single-precision-constant[¶](#cmdoption-clang-cl-single-precision-constant "Link to this definition")

OpenCL only. Treat double precision floating-point constant as single precision constant.

\-cl-std\=<arg>[¶](#cmdoption-clang-cl-std "Link to this definition")

OpenCL language standard to compile for. <arg> must be ‘cl’, ‘CL’, ‘cl1.0’, ‘CL1.0’, ‘cl1.1’, ‘CL1.1’, ‘cl1.2’, ‘CL1.2’, ‘cl2.0’, ‘CL2.0’, ‘cl3.0’, ‘CL3.0’, ‘clc++’, ‘CLC++’, ‘clc++1.0’, ‘CLC++1.0’, ‘clc++2021’ or ‘CLC++2021’.

\-cl-strict-aliasing[¶](#cmdoption-clang-cl-strict-aliasing "Link to this definition")

OpenCL only. This option is added for compatibility with OpenCL 1.0.

\-cl-unsafe-math-optimizations[¶](#cmdoption-clang-cl-unsafe-math-optimizations "Link to this definition")

OpenCL only. Allow unsafe floating-point optimizations. Also implies -cl-no-signed-zeros and -cl-mad-enable.

\--libclc-lib\=<arg>[¶](#cmdoption-clang-libclc-lib "Link to this definition")

Namespec of libclc OpenCL bitcode library to link

#### [SYCL options](#id13)[¶](#sycl-options "Link to this heading")

\-fsycl, \-fno-sycl[¶](#cmdoption-clang-fsycl "Link to this definition")

Enable SYCL C++ extensions

\-sycl-std\=<arg>[¶](#cmdoption-clang-sycl-std "Link to this definition")

SYCL language standard to compile for. <arg> must be ‘2020’, ‘2017’, ‘121’, ‘1.2.1’ or ‘sycl-1.2.1’.

#### [CUDA options](#id14)[¶](#cuda-options "Link to this heading")

\--cuda-feature\=<arg>[¶](#cmdoption-clang-cuda-feature "Link to this definition")

Manually specify the CUDA feature to use

\--cuda-include-ptx\=<arg>, \--no-cuda-include-ptx\=<arg>[¶](#cmdoption-clang-cuda-include-ptx "Link to this definition")

Include PTX for the following GPU architecture (e.g. sm\_35) or ‘all’. May be specified more than once.

\--cuda-noopt-device-debug, \--no-cuda-noopt-device-debug[¶](#cmdoption-clang-cuda-noopt-device-debug "Link to this definition")

Enable device-side debug info generation. Disables ptxas optimizations.

\--cuda-path-ignore-env[¶](#cmdoption-clang-cuda-path-ignore-env "Link to this definition")

Ignore environment variables to detect CUDA installation

\--cuda-path\=<arg>[¶](#cmdoption-clang-cuda-path "Link to this definition")

CUDA installation path

\-fcuda-short-ptr, \-fno-cuda-short-ptr[¶](#cmdoption-clang-fcuda-short-ptr "Link to this definition")

Use 32-bit pointers for accessing const/local/shared address spaces

\--no-cuda-version-check[¶](#cmdoption-clang-no-cuda-version-check "Link to this definition")

Don’t error out if the detected version of the CUDA install is too low for the requested CUDA gpu architecture.

\--ptxas-path\=<arg>[¶](#cmdoption-clang-ptxas-path "Link to this definition")

Path to ptxas (used for compiling CUDA code)

#### [HIP options](#id15)[¶](#hip-options "Link to this heading")

\-fgpu-allow-device-init, \-fno-gpu-allow-device-init[¶](#cmdoption-clang-fgpu-allow-device-init "Link to this definition")

Allow device side init function in HIP (experimental)

\-fhip-emit-relocatable, \-fno-hip-emit-relocatable[¶](#cmdoption-clang-fhip-emit-relocatable "Link to this definition")

Compile HIP source to relocatable

\-fhip-fp32-correctly-rounded-divide-sqrt, \-fno-hip-fp32-correctly-rounded-divide-sqrt[¶](#cmdoption-clang-fhip-fp32-correctly-rounded-divide-sqrt "Link to this definition")

Specify that single precision floating-point divide and sqrt used in the program source are correctly rounded (HIP device compilation only)

\-fhip-kernel-arg-name, \-fno-hip-kernel-arg-name[¶](#cmdoption-clang-fhip-kernel-arg-name "Link to this definition")

Specify that kernel argument names are preserved (HIP only)

\-fhip-new-launch-api, \-fno-hip-new-launch-api[¶](#cmdoption-clang-fhip-new-launch-api "Link to this definition")

Use new kernel launching API for HIP

\--gpu-bundle-output, \--no-gpu-bundle-output[¶](#cmdoption-clang-gpu-bundle-output "Link to this definition")

Bundle output files of HIP device compilation

\--gpu-instrument-lib\=<arg>[¶](#cmdoption-clang-gpu-instrument-lib "Link to this definition")

Instrument device library for HIP, which is a LLVM bitcode containing \_\_cyg\_profile\_func\_enter and \_\_cyg\_profile\_func\_exit

\--gpu-max-threads-per-block\=<arg>[¶](#cmdoption-clang-gpu-max-threads-per-block "Link to this definition")

Default max threads per block for kernel launch bounds for HIP

\--hip-device-lib\=<arg>[¶](#cmdoption-clang-hip-device-lib "Link to this definition")

HIP device library

\--hip-link[¶](#cmdoption-clang-hip-link "Link to this definition")

Link clang-offload-bundler bundles for HIP

\--hip-path\=<arg>[¶](#cmdoption-clang-hip-path "Link to this definition")

HIP runtime installation path, used for finding HIP version and adding HIP include path.

\--hip-version\=<arg>[¶](#cmdoption-clang-hip-version "Link to this definition")

HIP version in the format of major.minor.patch

\--hipspv-pass-plugin\=<dsopath>[¶](#cmdoption-clang-hipspv-pass-plugin "Link to this definition")

path to a pass plugin for HIP to SPIR-V passes.

\--hipstdpar[¶](#cmdoption-clang-hipstdpar "Link to this definition")

Enable HIP acceleration for standard parallel algorithms

\--hipstdpar-interpose-alloc[¶](#cmdoption-clang-hipstdpar-interpose-alloc "Link to this definition")

Replace all memory allocation / deallocation calls with hipManagedMalloc / hipFree equivalents

\--hipstdpar-path\=<arg>[¶](#cmdoption-clang-hipstdpar-path "Link to this definition")

HIP Standard Parallel Algorithm Acceleration library path, used for finding and implicitly including the library header

\--hipstdpar-prim-path\=<arg>[¶](#cmdoption-clang-hipstdpar-prim-path "Link to this definition")

rocPrim path, required by the HIP Standard Parallel Algorithm Acceleration library, used to implicitly include the rocPrim library

\--hipstdpar-thrust-path\=<arg>[¶](#cmdoption-clang-hipstdpar-thrust-path "Link to this definition")

rocThrust path, required by the HIP Standard Parallel Algorithm Acceleration library, used to implicitly include the rocThrust library

\-no-hip-rt[¶](#cmdoption-clang-no-hip-rt "Link to this definition")

Do not link against HIP runtime libraries

\--rocm-device-lib-path\=<arg>, \--hip-device-lib-path\=<arg>[¶](#cmdoption-clang-rocm-device-lib-path "Link to this definition")

ROCm device library path. Alternative to rocm-path.

\--rocm-path\=<arg>[¶](#cmdoption-clang-rocm-path "Link to this definition")

ROCm installation path, used for finding and automatically linking required bitcode libraries.

#### [HLSL options](#id16)[¶](#hlsl-options "Link to this heading")

\-fhlsl-strict-availability[¶](#cmdoption-clang-fhlsl-strict-availability "Link to this definition")

Enables strict availability diagnostic mode for HLSL built-in functions.

### [Target-dependent compilation options](#id17)[¶](#target-dependent-compilation-options "Link to this heading")

\-G<size>, \-G\=<arg>, \-msmall-data-limit\=<arg>, \-msmall-data-threshold\=<arg>[¶](#cmdoption-clang-G-size "Link to this definition")

Put objects of at most <size> bytes into small data section (MIPS / Hexagon)

\-ffixed-x1[¶](#cmdoption-clang-ffixed-x1 "Link to this definition")

Reserve the x1 register (AArch64/RISC-V only)

\-ffixed-x10[¶](#cmdoption-clang-ffixed-x10 "Link to this definition")

Reserve the x10 register (AArch64/RISC-V only)

\-ffixed-x11[¶](#cmdoption-clang-ffixed-x11 "Link to this definition")

Reserve the x11 register (AArch64/RISC-V only)

\-ffixed-x12[¶](#cmdoption-clang-ffixed-x12 "Link to this definition")

Reserve the x12 register (AArch64/RISC-V only)

\-ffixed-x13[¶](#cmdoption-clang-ffixed-x13 "Link to this definition")

Reserve the x13 register (AArch64/RISC-V only)

\-ffixed-x14[¶](#cmdoption-clang-ffixed-x14 "Link to this definition")

Reserve the x14 register (AArch64/RISC-V only)

\-ffixed-x15[¶](#cmdoption-clang-ffixed-x15 "Link to this definition")

Reserve the x15 register (AArch64/RISC-V only)

\-ffixed-x16[¶](#cmdoption-clang-ffixed-x16 "Link to this definition")

Reserve the x16 register (AArch64/RISC-V only)

\-ffixed-x17[¶](#cmdoption-clang-ffixed-x17 "Link to this definition")

Reserve the x17 register (AArch64/RISC-V only)

\-ffixed-x18[¶](#cmdoption-clang-ffixed-x18 "Link to this definition")

Reserve the x18 register (AArch64/RISC-V only)

\-ffixed-x19[¶](#cmdoption-clang-ffixed-x19 "Link to this definition")

Reserve the x19 register (AArch64/RISC-V only)

\-ffixed-x2[¶](#cmdoption-clang-ffixed-x2 "Link to this definition")

Reserve the x2 register (AArch64/RISC-V only)

\-ffixed-x20[¶](#cmdoption-clang-ffixed-x20 "Link to this definition")

Reserve the x20 register (AArch64/RISC-V only)

\-ffixed-x21[¶](#cmdoption-clang-ffixed-x21 "Link to this definition")

Reserve the x21 register (AArch64/RISC-V only)

\-ffixed-x22[¶](#cmdoption-clang-ffixed-x22 "Link to this definition")

Reserve the x22 register (AArch64/RISC-V only)

\-ffixed-x23[¶](#cmdoption-clang-ffixed-x23 "Link to this definition")

Reserve the x23 register (AArch64/RISC-V only)

\-ffixed-x24[¶](#cmdoption-clang-ffixed-x24 "Link to this definition")

Reserve the x24 register (AArch64/RISC-V only)

\-ffixed-x25[¶](#cmdoption-clang-ffixed-x25 "Link to this definition")

Reserve the x25 register (AArch64/RISC-V only)

\-ffixed-x26[¶](#cmdoption-clang-ffixed-x26 "Link to this definition")

Reserve the x26 register (AArch64/RISC-V only)

\-ffixed-x27[¶](#cmdoption-clang-ffixed-x27 "Link to this definition")

Reserve the x27 register (AArch64/RISC-V only)

\-ffixed-x28[¶](#cmdoption-clang-ffixed-x28 "Link to this definition")

Reserve the x28 register (AArch64/RISC-V only)

\-ffixed-x29[¶](#cmdoption-clang-ffixed-x29 "Link to this definition")

Reserve the x29 register (AArch64/RISC-V only)

\-ffixed-x3[¶](#cmdoption-clang-ffixed-x3 "Link to this definition")

Reserve the x3 register (AArch64/RISC-V only)

\-ffixed-x30[¶](#cmdoption-clang-ffixed-x30 "Link to this definition")

Reserve the x30 register (AArch64/RISC-V only)

\-ffixed-x31[¶](#cmdoption-clang-ffixed-x31 "Link to this definition")

Reserve the x31 register (AArch64/RISC-V only)

\-ffixed-x4[¶](#cmdoption-clang-ffixed-x4 "Link to this definition")

Reserve the x4 register (AArch64/RISC-V only)

\-ffixed-x5[¶](#cmdoption-clang-ffixed-x5 "Link to this definition")

Reserve the x5 register (AArch64/RISC-V only)

\-ffixed-x6[¶](#cmdoption-clang-ffixed-x6 "Link to this definition")

Reserve the x6 register (AArch64/RISC-V only)

\-ffixed-x7[¶](#cmdoption-clang-ffixed-x7 "Link to this definition")

Reserve the x7 register (AArch64/RISC-V only)

\-ffixed-x8[¶](#cmdoption-clang-ffixed-x8 "Link to this definition")

Reserve the x8 register (AArch64/RISC-V only)

\-ffixed-x9[¶](#cmdoption-clang-ffixed-x9 "Link to this definition")

Reserve the x9 register (AArch64/RISC-V only)

\-ffuchsia-api-level\=<arg>[¶](#cmdoption-clang-ffuchsia-api-level "Link to this definition")

Set Fuchsia API level

\-inline-asm\=<arg>[¶](#cmdoption-clang-inline-asm "Link to this definition")

<arg> must be ‘att’ or ‘intel’.

\-m16[¶](#cmdoption-clang-m16 "Link to this definition")

\-m32[¶](#cmdoption-clang-m32 "Link to this definition")

\-m64[¶](#cmdoption-clang-m64 "Link to this definition")

\-mabi\=<arg>[¶](#cmdoption-clang-mabi "Link to this definition")

\-mabi\=quadword-atomics[¶](#cmdoption-clang1-mabi "Link to this definition")

Enable quadword atomics ABI on AIX (AIX PPC64 only). Uses lqarx/stqcx. instructions.

\-maix-struct-return[¶](#cmdoption-clang-maix-struct-return "Link to this definition")

Override the default ABI for 32-bit targets to return all structs in memory, as in the Power 32-bit ABI for Linux (2011), and on AIX and Darwin.

\-maix32[¶](#cmdoption-clang-maix32 "Link to this definition")

\-maix64[¶](#cmdoption-clang-maix64 "Link to this definition")

\-malign-branch-boundary\=<arg>[¶](#cmdoption-clang-malign-branch-boundary "Link to this definition")

Specify the boundary’s size to align branches

\-malign-branch\=<arg1>,<arg2>...[¶](#cmdoption-clang-malign-branch "Link to this definition")

Specify types of branches to align

\-malign-double[¶](#cmdoption-clang-malign-double "Link to this definition")

Align doubles to two words in structs (x86 only)

\-mamdgpu-ieee, \-mno-amdgpu-ieee[¶](#cmdoption-clang-mamdgpu-ieee "Link to this definition")

Sets the IEEE bit in the expected default floating point mode register. Floating point opcodes that support exception flag gathering quiet and propagate signaling NaN inputs per IEEE 754-2008. This option changes the ABI. (AMDGPU only)

\-mamdgpu-precise-memory-op, \-mno-amdgpu-precise-memory-op[¶](#cmdoption-clang-mamdgpu-precise-memory-op "Link to this definition")

Enable precise memory mode (AMDGPU only)

\-mapx-inline-asm-use-gpr32[¶](#cmdoption-clang-mapx-inline-asm-use-gpr32 "Link to this definition")

Enable use of GPR32 in inline assembly for APX

\-march\=<arg>[¶](#cmdoption-clang-march "Link to this definition")

For a list of available architectures for the target use ‘-mcpu=help’

\-marm64x<arg>[¶](#cmdoption-clang-marm64x-arg "Link to this definition")

Link as a hybrid ARM64X image

\-masm\=<arg>[¶](#cmdoption-clang-masm "Link to this definition")

\-mbackchain, \-mno-backchain[¶](#cmdoption-clang-mbackchain "Link to this definition")

Link stack frames through backchain on System Z

\-mbig-endian, \-EB[¶](#cmdoption-clang-mbig-endian "Link to this definition")

\-mbranch-protection\=<arg>[¶](#cmdoption-clang-mbranch-protection "Link to this definition")

Enforce targets of indirect branches and function returns

\-mbranches-within-32B-boundaries[¶](#cmdoption-clang-mbranches-within-32B-boundaries "Link to this definition")

Align selected branches (fused, jcc, jmp) within 32-byte boundary

\-mcf-branch-label-scheme\=<arg>[¶](#cmdoption-clang-mcf-branch-label-scheme "Link to this definition")

Select label scheme for branch control-flow architecture protection. <arg> must be ‘unlabeled’ or ‘func-sig’.

\-mcmodel\=<arg>[¶](#cmdoption-clang-mcmodel "Link to this definition")

\-mcode-object-version\=<arg>[¶](#cmdoption-clang-mcode-object-version "Link to this definition")

Specify code object ABI version. Defaults to 6. (AMDGPU only). <arg> must be ‘none’, ‘4’, ‘5’ or ‘6’.

\-mconsole<arg>[¶](#cmdoption-clang-mconsole-arg "Link to this definition")

\-mconstructor-aliases, \-mno-constructor-aliases[¶](#cmdoption-clang-mconstructor-aliases "Link to this definition")

Enable emitting complete constructors and destructors as aliases when possible

\-mcpu\=<arg>, \-mv5 (equivalent to \-mcpu=hexagonv5), \-mv55 (equivalent to \-mcpu=hexagonv55), \-mv60 (equivalent to \-mcpu=hexagonv60), \-mv62 (equivalent to \-mcpu=hexagonv62), \-mv65 (equivalent to \-mcpu=hexagonv65), \-mv66 (equivalent to \-mcpu=hexagonv66), \-mv67 (equivalent to \-mcpu=hexagonv67), \-mv67t (equivalent to \-mcpu=hexagonv67t), \-mv68 (equivalent to \-mcpu=hexagonv68), \-mv69 (equivalent to \-mcpu=hexagonv69), \-mv71 (equivalent to \-mcpu=hexagonv71), \-mv71t (equivalent to \-mcpu=hexagonv71t), \-mv73 (equivalent to \-mcpu=hexagonv73), \-mv75 (equivalent to \-mcpu=hexagonv75), \-mv79 (equivalent to \-mcpu=hexagonv79)[¶](#cmdoption-clang1-mcpu "Link to this definition")

For a list of available CPUs for the target use ‘-mcpu=help’

\-mcrc, \-mno-crc[¶](#cmdoption-clang-mcrc "Link to this definition")

Allow use of CRC instructions (ARM/Mips only)

\-mdaz-ftz, \-mno-daz-ftz[¶](#cmdoption-clang-mdaz-ftz "Link to this definition")

Globally set the denormals-are-zero (DAZ) and flush-to-zero (FTZ) bits in the floating-point control register on program startup

\-mdefault-build-attributes<arg>, \-mno-default-build-attributes<arg>[¶](#cmdoption-clang-mdefault-build-attributes-arg "Link to this definition")

\-mdefault-visibility-export-mapping\=<arg>[¶](#cmdoption-clang-mdefault-visibility-export-mapping "Link to this definition")

Mapping between default visibility and export. <arg> must be ‘none’, ‘explicit’ or ‘all’.

\-mdll<arg>[¶](#cmdoption-clang-mdll-arg "Link to this definition")

\-mdouble-float[¶](#cmdoption-clang-mdouble-float "Link to this definition")

\-mdouble\=<n[¶](#cmdoption-clang-mdouble "Link to this definition")

Force double to be <n> bits. <n must be ‘32’ or ‘64’.

\-mdynamic-no-pic<arg>[¶](#cmdoption-clang-mdynamic-no-pic-arg "Link to this definition")

\-meabi <arg>[¶](#cmdoption-clang-meabi "Link to this definition")

Set EABI type. Default depends on triple). <arg> must be ‘default’, ‘4’, ‘5’ or ‘gnu’.

\-menable-experimental-extensions[¶](#cmdoption-clang-menable-experimental-extensions "Link to this definition")

Enable use of experimental RISC-V extensions.

\-mfentry[¶](#cmdoption-clang-mfentry "Link to this definition")

Insert calls to fentry at function entry (x86/SystemZ only)

\-mfloat-abi\=<arg>[¶](#cmdoption-clang-mfloat-abi "Link to this definition")

<arg> must be ‘soft’, ‘softfp’ or ‘hard’.

\-mfpmath\=<arg>[¶](#cmdoption-clang-mfpmath "Link to this definition")

\-mfpu\=<arg>[¶](#cmdoption-clang-mfpu "Link to this definition")

\-mfunction-return\=<arg>[¶](#cmdoption-clang-mfunction-return "Link to this definition")

Replace returns with jumps to \`\`\_\_x86\_return\_thunk\`\` (x86 only, error otherwise). <arg> must be ‘keep’ or ‘thunk-extern’.

\-mgeneral-regs-only[¶](#cmdoption-clang-mgeneral-regs-only "Link to this definition")

Generate code which only uses the general purpose registers (AArch64/x86 only)

\-mglobal-merge, \-mno-global-merge[¶](#cmdoption-clang-mglobal-merge "Link to this definition")

Enable merging of globals

\-mguard\=<arg>[¶](#cmdoption-clang-mguard "Link to this definition")

Enable or disable Control Flow Guard checks and guard tables emission. <arg> must be ‘none’, ‘cf’ or ‘cf-nochecks’.

\-mhard-float[¶](#cmdoption-clang-mhard-float "Link to this definition")

\-mharden-sls\=<arg>[¶](#cmdoption-clang-mharden-sls "Link to this definition")

Select straight-line speculation hardening scope (ARM/AArch64/X86 only). <arg> must be: all, none, retbr(ARM/AArch64), blr(ARM/AArch64), comdat(ARM/AArch64), nocomdat(ARM/AArch64), return(X86), indirect-jmp(X86)

\-mhwdiv\=<arg>, \--mhwdiv <arg>, \--mhwdiv\=<arg>[¶](#cmdoption-clang-mhwdiv "Link to this definition")

\-mhwmult\=<arg>[¶](#cmdoption-clang-mhwmult "Link to this definition")

\-miamcu, \-mno-iamcu[¶](#cmdoption-clang-miamcu "Link to this definition")

Use Intel MCU ABI

\-mignore-xcoff-visibility[¶](#cmdoption-clang-mignore-xcoff-visibility "Link to this definition")

Not emit the visibility attribute for asm in AIX OS or give all symbols ‘unspecified’ visibility in XCOFF object file

\-mimplicit-float, \-mno-implicit-float[¶](#cmdoption-clang-mimplicit-float "Link to this definition")

Generate implicit floating point or vector instructions

\-mimplicit-it\=<arg>[¶](#cmdoption-clang-mimplicit-it "Link to this definition")

\-mincremental-linker-compatible, \-mno-incremental-linker-compatible[¶](#cmdoption-clang-mincremental-linker-compatible "Link to this definition")

(integrated-as) Emit an object file which can be used with an incremental linker

\-mindirect-branch-cs-prefix[¶](#cmdoption-clang-mindirect-branch-cs-prefix "Link to this definition")

Add cs prefix to call and jmp to indirect thunk

\-mios-simulator-version-min\=<arg>, \-miphonesimulator-version-min\=<arg>[¶](#cmdoption-clang-mios-simulator-version-min "Link to this definition")

\-mios-version-min\=<arg>, \-miphoneos-version-min\=<arg>[¶](#cmdoption-clang-mios-version-min "Link to this definition")

Set iOS deployment target

\-mkernel[¶](#cmdoption-clang-mkernel "Link to this definition")

\-mlarge-data-threshold\=<arg>[¶](#cmdoption-clang-mlarge-data-threshold "Link to this definition")

\-mlink-builtin-bitcode-postopt, \-mno-link-builtin-bitcode-postopt[¶](#cmdoption-clang-mlink-builtin-bitcode-postopt "Link to this definition")

Link builtin bitcodes after the optimization pipeline

\-mlinker-version\=<arg>[¶](#cmdoption-clang-mlinker-version "Link to this definition")

\-mlittle-endian, \-EL[¶](#cmdoption-clang-mlittle-endian "Link to this definition")

\-mlong-calls, \-mno-long-calls[¶](#cmdoption-clang-mlong-calls "Link to this definition")

Generate branches with extended addressability, usually via indirect jumps.

\-mlvi-cfi, \-mno-lvi-cfi[¶](#cmdoption-clang-mlvi-cfi "Link to this definition")

Enable only control-flow mitigations for Load Value Injection (LVI)

\-mlvi-hardening, \-mno-lvi-hardening[¶](#cmdoption-clang-mlvi-hardening "Link to this definition")

Enable all mitigations for Load Value Injection (LVI)

\-mmacos-version-min\=<arg>, \-mmacosx-version-min\=<arg>[¶](#cmdoption-clang-mmacos-version-min "Link to this definition")

Set macOS deployment target

\-mmcu\=<arg>[¶](#cmdoption-clang-mmcu "Link to this definition")

\-mms-bitfields, \-mno-ms-bitfields[¶](#cmdoption-clang-mms-bitfields "Link to this definition")

Set the default structure layout to be compatible with the Microsoft compiler standard

\-mno-gather[¶](#cmdoption-clang-mno-gather "Link to this definition")

Disable generation of gather instructions in auto-vectorization(x86 only)

\-mno-scatter[¶](#cmdoption-clang-mno-scatter "Link to this definition")

Disable generation of scatter instructions in auto-vectorization(x86 only)

\-mnop-mcount[¶](#cmdoption-clang-mnop-mcount "Link to this definition")

Generate mcount/\_\_fentry\_\_ calls as nops. To activate they need to be patched in.

\-momit-leaf-frame-pointer, \-mno-omit-leaf-frame-pointer[¶](#cmdoption-clang-momit-leaf-frame-pointer "Link to this definition")

Omit frame pointer setup for leaf functions

\-moslib\=<arg>[¶](#cmdoption-clang-moslib "Link to this definition")

\-mpacked-stack, \-mno-packed-stack[¶](#cmdoption-clang-mpacked-stack "Link to this definition")

Use packed stack layout (SystemZ only).

\-mpad-max-prefix-size\=<arg>[¶](#cmdoption-clang-mpad-max-prefix-size "Link to this definition")

Specify maximum number of prefixes to use for padding

\-mpic-data-is-text-relative, \-mno-pic-data-is-text-relative[¶](#cmdoption-clang-mpic-data-is-text-relative "Link to this definition")

Assume data segments are relative to text segment

\-mprefer-vector-width\=<arg>[¶](#cmdoption-clang-mprefer-vector-width "Link to this definition")

Specifies preferred vector width for auto-vectorization. Defaults to ‘none’ which allows target specific decisions.

\-mprintf-kind\=<arg>[¶](#cmdoption-clang-mprintf-kind "Link to this definition")

Specify the printf lowering scheme (AMDGPU only), allowed values are “hostcall”(printing happens during kernel execution, this scheme relies on hostcalls which require system to support pcie atomics) and “buffered”(printing happens after all kernel threads exit, this uses a printf buffer and does not rely on pcie atomic support). <arg> must be ‘hostcall’ or ‘buffered’.

\-mqdsp6-compat[¶](#cmdoption-clang-mqdsp6-compat "Link to this definition")

Enable hexagon-qdsp6 backward compatibility

\-mrecip[¶](#cmdoption-clang-mrecip "Link to this definition")

Equivalent to ‘-mrecip=all’

\-mrecip\=<arg1>,<arg2>...[¶](#cmdoption-clang1-mrecip "Link to this definition")

Control use of approximate reciprocal and reciprocal square root instructions followed by <n> iterations of Newton-Raphson refinement. <value> = ( \[‘!’\] \[‘vec-’\] (‘rcp’|’sqrt’) \[(‘h’|’s’|’d’)\] \[‘:’<n>\] ) | ‘all’ | ‘default’ | ‘none’

\-mrecord-mcount[¶](#cmdoption-clang-mrecord-mcount "Link to this definition")

Generate a \_\_mcount\_loc section entry for each \_\_fentry\_\_ call.

\-mred-zone, \-mno-red-zone[¶](#cmdoption-clang-mred-zone "Link to this definition")

\-mregnames, \-mno-regnames[¶](#cmdoption-clang-mregnames "Link to this definition")

Use full register names when writing assembly output

\-mregparm\=<arg>[¶](#cmdoption-clang-mregparm "Link to this definition")

\-mrelax, \-mno-relax[¶](#cmdoption-clang-mrelax "Link to this definition")

Enable linker relaxation

\-mrelax-all, \-mno-relax-all[¶](#cmdoption-clang-mrelax-all "Link to this definition")

(integrated-as) Relax all machine instructions

\-mretpoline, \-mno-retpoline[¶](#cmdoption-clang-mretpoline "Link to this definition")

\-mrtd, \-mno-rtd[¶](#cmdoption-clang-mrtd "Link to this definition")

Make StdCall calling convention the default

\-mrvv-vector-bits\=<arg>[¶](#cmdoption-clang-mrvv-vector-bits "Link to this definition")

Specify the size in bits of an RVV vector register. Defaults to the vector length agnostic value of “scalable”. Accepts power of 2 values between 64 and 65536. Also accepts “zvl” to use the value implied by -march/-mcpu. The value will be reflected in \_\_riscv\_v\_fixed\_vlen preprocessor define (RISC-V only)

\-msave-reg-params[¶](#cmdoption-clang-msave-reg-params "Link to this definition")

Save arguments passed by registers to ABI-defined stack positions

\-mscalar-strict-align, \-mno-scalar-strict-align[¶](#cmdoption-clang-mscalar-strict-align "Link to this definition")

Force all scalar memory accesses to be aligned (RISC-V only)

\-mseses, \-mno-seses[¶](#cmdoption-clang-mseses "Link to this definition")

Enable speculative execution side effect suppression (SESES). Includes LVI control flow integrity mitigations

\-msign-return-address\=<arg>[¶](#cmdoption-clang-msign-return-address "Link to this definition")

Select return address signing scope. <arg> must be ‘none’, ‘all’ or ‘non-leaf’.

\-msim[¶](#cmdoption-clang-msim "Link to this definition")

\-msingle-float[¶](#cmdoption-clang-msingle-float "Link to this definition")

\-mskip-rax-setup, \-mno-skip-rax-setup[¶](#cmdoption-clang-mskip-rax-setup "Link to this definition")

Skip setting up RAX register when passing variable arguments (x86 only)

\-msoft-float, \-mno-soft-float[¶](#cmdoption-clang-msoft-float "Link to this definition")

Use software floating point

\-mspeculative-load-hardening, \-mno-speculative-load-hardening[¶](#cmdoption-clang-mspeculative-load-hardening "Link to this definition")

\-msse2avx[¶](#cmdoption-clang-msse2avx "Link to this definition")

Specify that the assembler should encode SSE instructions with VEX prefix

\-mstack-alignment\=<arg>[¶](#cmdoption-clang-mstack-alignment "Link to this definition")

Set the stack alignment

\-mstack-arg-probe, \-mno-stack-arg-probe[¶](#cmdoption-clang-mstack-arg-probe "Link to this definition")

Enable stack probes

\-mstack-probe-size\=<arg>[¶](#cmdoption-clang-mstack-probe-size "Link to this definition")

Set the stack probe size

\-mstack-protector-guard-offset\=<arg>[¶](#cmdoption-clang-mstack-protector-guard-offset "Link to this definition")

Use the given offset for addressing the stack-protector guard

\-mstack-protector-guard-reg\=<arg>[¶](#cmdoption-clang-mstack-protector-guard-reg "Link to this definition")

Use the given reg for addressing the stack-protector guard

\-mstack-protector-guard-symbol\=<arg>[¶](#cmdoption-clang-mstack-protector-guard-symbol "Link to this definition")

Use the given symbol for addressing the stack-protector guard

\-mstack-protector-guard\=<arg>[¶](#cmdoption-clang-mstack-protector-guard "Link to this definition")

Use the given guard (global, tls) for addressing the stack-protector guard

\-mstackrealign, \-mno-stackrealign[¶](#cmdoption-clang-mstackrealign "Link to this definition")

Force realign the stack at entry to every function

\-mstrict-align, \-mno-strict-align[¶](#cmdoption-clang-mstrict-align "Link to this definition")

Force all memory accesses to be aligned (AArch64/LoongArch/RISC-V only)

\-msvr4-struct-return[¶](#cmdoption-clang-msvr4-struct-return "Link to this definition")

Override the default ABI for 32-bit targets to return small structs in registers, as in the System V ABI (1995).

\-mtargetos\=<arg>[¶](#cmdoption-clang-mtargetos "Link to this definition")

Set the deployment target to be the specified OS and OS version

\-mthread-model <arg>[¶](#cmdoption-clang-mthread-model "Link to this definition")

The thread model to use. Defaults to ‘posix’). <arg> must be ‘posix’ or ‘single’.

\-mthreads<arg>[¶](#cmdoption-clang-mthreads-arg "Link to this definition")

\-mthumb, \-mno-thumb[¶](#cmdoption-clang-mthumb "Link to this definition")

\-mtls-dialect\=<arg>[¶](#cmdoption-clang-mtls-dialect "Link to this definition")

Which thread-local storage dialect to use for dynamic accesses of TLS variables

\-mtls-direct-seg-refs, \-mno-tls-direct-seg-refs[¶](#cmdoption-clang-mtls-direct-seg-refs "Link to this definition")

Enable direct TLS access through segment registers (default)

\-mtls-size\=<arg>[¶](#cmdoption-clang-mtls-size "Link to this definition")

Specify bit size of immediate TLS offsets (AArch64 ELF only): 12 (for 4KB) | 24 (for 16MB, default) | 32 (for 4GB) | 48 (for 256TB, needs -mcmodel=large)

\-mtocdata, \-mno-tocdata[¶](#cmdoption-clang-mtocdata "Link to this definition")

All suitable variables will have the TOC data transformation applied

\-mtocdata\=<arg1>,<arg2>..., \-mno-tocdata\=<arg1>,<arg2>...[¶](#cmdoption-clang1-mtocdata "Link to this definition")

Specifies a list of variables to which the TOC data transformation will be applied.

\-mtune\=<arg>[¶](#cmdoption-clang1-mtune "Link to this definition")

Only supported on AArch64, PowerPC, RISC-V, SPARC, SystemZ, and X86

\-mtvos-version-min\=<arg>, \-mappletvos-version-min\=<arg>[¶](#cmdoption-clang-mtvos-version-min "Link to this definition")

\-munaligned-access, \-mno-unaligned-access[¶](#cmdoption-clang-munaligned-access "Link to this definition")

Allow memory accesses to be unaligned (AArch32/MIPSr6 only)

\-munaligned-symbols, \-mno-unaligned-symbols[¶](#cmdoption-clang-munaligned-symbols "Link to this definition")

Expect external char-aligned symbols to be without ABI alignment (SystemZ only)

\-municode<arg>[¶](#cmdoption-clang-municode-arg "Link to this definition")

\-mvector-strict-align, \-mno-vector-strict-align[¶](#cmdoption-clang-mvector-strict-align "Link to this definition")

Force all vector memory accesses to be aligned (RISC-V only)

\-mvx, \-mno-vx[¶](#cmdoption-clang-mvx "Link to this definition")

\-mwarn-nonportable-cfstrings, \-mno-warn-nonportable-cfstrings[¶](#cmdoption-clang-mwarn-nonportable-cfstrings "Link to this definition")

\-mwatchos-simulator-version-min\=<arg>, \-mwatchsimulator-version-min\=<arg>[¶](#cmdoption-clang-mwatchos-simulator-version-min "Link to this definition")

\-mwatchos-version-min\=<arg>[¶](#cmdoption-clang-mwatchos-version-min "Link to this definition")

\-mwavefrontsize64, \-mno-wavefrontsize64[¶](#cmdoption-clang-mwavefrontsize64 "Link to this definition")

Specify wavefront size 64 mode (AMDGPU only)

\-mwindows<arg>[¶](#cmdoption-clang-mwindows-arg "Link to this definition")

\-mx32[¶](#cmdoption-clang-mx32 "Link to this definition")

\-mxcoff-roptr, \-mno-xcoff-roptr[¶](#cmdoption-clang-mxcoff-roptr "Link to this definition")

Place constant objects with relocatable address values in the RO data section and add -bforceimprw to the linker flags (AIX only)

\-mzos-target\=<arg>[¶](#cmdoption-clang-mzos-target "Link to this definition")

Set the z/OS release of the runtime environment

\-regcall4[¶](#cmdoption-clang-regcall4 "Link to this definition")

Set \_\_regcall4 as a default calling convention to respect \_\_regcall ABI v.4

\--wasm-opt, \--no-wasm-opt[¶](#cmdoption-clang-wasm-opt "Link to this definition")

Enable the wasm-opt optimizer (default)

#### [AARCH64](#id18)[¶](#aarch64 "Link to this heading")

\-fcall-saved-x10[¶](#cmdoption-clang-fcall-saved-x10 "Link to this definition")

Make the x10 register call-saved (AArch64 only)

\-fcall-saved-x11[¶](#cmdoption-clang-fcall-saved-x11 "Link to this definition")

Make the x11 register call-saved (AArch64 only)

\-fcall-saved-x12[¶](#cmdoption-clang-fcall-saved-x12 "Link to this definition")

Make the x12 register call-saved (AArch64 only)

\-fcall-saved-x13[¶](#cmdoption-clang-fcall-saved-x13 "Link to this definition")

Make the x13 register call-saved (AArch64 only)

\-fcall-saved-x14[¶](#cmdoption-clang-fcall-saved-x14 "Link to this definition")

Make the x14 register call-saved (AArch64 only)

\-fcall-saved-x15[¶](#cmdoption-clang-fcall-saved-x15 "Link to this definition")

Make the x15 register call-saved (AArch64 only)

\-fcall-saved-x18[¶](#cmdoption-clang-fcall-saved-x18 "Link to this definition")

Make the x18 register call-saved (AArch64 only)

\-fcall-saved-x8[¶](#cmdoption-clang-fcall-saved-x8 "Link to this definition")

Make the x8 register call-saved (AArch64 only)

\-fcall-saved-x9[¶](#cmdoption-clang-fcall-saved-x9 "Link to this definition")

Make the x9 register call-saved (AArch64 only)

\-mfix-cortex-a53-835769, \-mno-fix-cortex-a53-835769[¶](#cmdoption-clang-mfix-cortex-a53-835769 "Link to this definition")

Work around Cortex-A53 erratum 835769 (AArch64 only)

\-mfix-cortex-a53-843419, \-mno-fix-cortex-a53-843419[¶](#cmdoption-clang-mfix-cortex-a53-843419 "Link to this definition")

Work around Cortex-A53 erratum 843419 (AArch64 only)

\-mlr-for-calls-only[¶](#cmdoption-clang-mlr-for-calls-only "Link to this definition")

Do not allocate the LR register for general purpose usage, only for calls. (AArch64 only)

\-mmark-bti-property[¶](#cmdoption-clang-mmark-bti-property "Link to this definition")

Add .note.gnu.property with BTI to assembly files (AArch64 only)

\-msve-streaming-vector-bits\=<arg>[¶](#cmdoption-clang-msve-streaming-vector-bits "Link to this definition")

Specify the size in bits of an SVE vector register in streaming mode. Defaults to the vector length agnostic value of “scalable”. (AArch64 only)

\-msve-vector-bits\=<arg>[¶](#cmdoption-clang-msve-vector-bits "Link to this definition")

Specify the size in bits of an SVE vector register. Defaults to the vector length agnostic value of “scalable”. (AArch64 only)

#### [AMDGPU](#id19)[¶](#amdgpu "Link to this heading")

\-mcumode, \-mno-cumode[¶](#cmdoption-clang-mcumode "Link to this definition")

Specify CU wavefront execution mode (AMDGPU only)

\-mtgsplit, \-mno-tgsplit[¶](#cmdoption-clang-mtgsplit "Link to this definition")

Enable threadgroup split execution mode (AMDGPU only)

#### [ARM](#id20)[¶](#arm "Link to this heading")

\-faapcs-bitfield-load[¶](#cmdoption-clang-faapcs-bitfield-load "Link to this definition")

Follows the AAPCS standard that all volatile bit-field write generates at least one load. (ARM only).

\-faapcs-bitfield-width, \-fno-aapcs-bitfield-width[¶](#cmdoption-clang-faapcs-bitfield-width "Link to this definition")

Follow the AAPCS standard requirement stating that volatile bit-field width is dictated by the field container type. (ARM only).

\-ffixed-r9[¶](#cmdoption-clang-ffixed-r9 "Link to this definition")

Reserve the r9 register (ARM only)

\-mcmse[¶](#cmdoption-clang-mcmse "Link to this definition")

Allow use of CMSE (Armv8-M Security Extensions)

\-mexecute-only, \-mno-execute-only, \-mpure-code[¶](#cmdoption-clang-mexecute-only "Link to this definition")

Disallow generation of data access to code sections (AArch64/ARM only)

\-mfix-cmse-cve-2021-35465, \-mno-fix-cmse-cve-2021-35465[¶](#cmdoption-clang-mfix-cmse-cve-2021-35465 "Link to this definition")

Work around VLLDM erratum CVE-2021-35465 (ARM only)

\-mfix-cortex-a57-aes-1742098, \-mfix-cortex-a72-aes-1655431, \-mno-fix-cortex-a57-aes-1742098[¶](#cmdoption-clang-mfix-cortex-a57-aes-1742098 "Link to this definition")

Work around Cortex-A57 Erratum 1742098 (ARM only)

\-mframe-chain\=<arg>[¶](#cmdoption-clang-mframe-chain "Link to this definition")

Select the frame chain model used to emit frame records (Arm only). <arg> must be ‘none’, ‘aapcs’ or ‘aapcs+leaf’.

\-mno-bti-at-return-twice[¶](#cmdoption-clang-mno-bti-at-return-twice "Link to this definition")

Do not add a BTI instruction after a setjmp or other return-twice construct (Arm/AArch64 only)

\-mno-movt[¶](#cmdoption-clang-mno-movt "Link to this definition")

Disallow use of movt/movw pairs (ARM only)

\-mno-neg-immediates[¶](#cmdoption-clang-mno-neg-immediates "Link to this definition")

Disallow converting instructions with negative immediates to their negation or inversion.

\-mnocrc[¶](#cmdoption-clang-mnocrc "Link to this definition")

Disallow use of CRC instructions (ARM only)

\-mrestrict-it, \-mno-restrict-it[¶](#cmdoption-clang-mrestrict-it "Link to this definition")

Disallow generation of complex IT blocks. It is off by default.

\-mtp\=<arg>[¶](#cmdoption-clang-mtp "Link to this definition")

Thread pointer access method. For AArch32: ‘soft’ uses a function call, or ‘tpidrurw’, ‘tpidruro’ or ‘tpidrprw’ use the three CP15 registers. ‘cp15’ is an alias for ‘tpidruro’. For AArch64: ‘tpidr\_el0’, ‘tpidr\_el1’, ‘tpidr\_el2’, ‘tpidr\_el3’ or ‘tpidrro\_el0’ use the five system registers. ‘elN’ is an alias for ‘tpidr\_elN’. <arg> must be ‘soft’, ‘cp15’, ‘tpidrurw’, ‘tpidruro’, ‘tpidrprw’, ‘el0’, ‘el1’, ‘el2’, ‘el3’, ‘tpidr\_el0’, ‘tpidr\_el1’, ‘tpidr\_el2’, ‘tpidr\_el3’, ‘tpidrro\_el0’ or ‘auto’.

#### [Hexagon](#id21)[¶](#hexagon "Link to this heading")

\-mcabac[¶](#cmdoption-clang-mcabac "Link to this definition")

Enable CABAC instructions

\-mhvx-ieee-fp, \-mno-hvx-ieee-fp[¶](#cmdoption-clang-mhvx-ieee-fp "Link to this definition")

Enable Hexagon HVX IEEE floating-point

\-mieee-rnd-near[¶](#cmdoption-clang-mieee-rnd-near "Link to this definition")

\-mmemops, \-mno-memops[¶](#cmdoption-clang-mmemops "Link to this definition")

Enable generation of memop instructions

\-mnvj, \-mno-nvj[¶](#cmdoption-clang-mnvj "Link to this definition")

Enable generation of new-value jumps

\-mnvs, \-mno-nvs[¶](#cmdoption-clang-mnvs "Link to this definition")

Enable generation of new-value stores

\-mpackets, \-mno-packets[¶](#cmdoption-clang-mpackets "Link to this definition")

Enable generation of instruction packets

#### [SPARC](#id22)[¶](#sparc "Link to this heading")

\-ffixed-g1[¶](#cmdoption-clang-ffixed-g1 "Link to this definition")

Reserve the G1 register (SPARC only)

\-ffixed-g2[¶](#cmdoption-clang-ffixed-g2 "Link to this definition")

Reserve the G2 register (SPARC only)

\-ffixed-g3[¶](#cmdoption-clang-ffixed-g3 "Link to this definition")

Reserve the G3 register (SPARC only)

\-ffixed-g4[¶](#cmdoption-clang-ffixed-g4 "Link to this definition")

Reserve the G4 register (SPARC only)

\-ffixed-g5[¶](#cmdoption-clang-ffixed-g5 "Link to this definition")

Reserve the G5 register (SPARC only)

\-ffixed-g6[¶](#cmdoption-clang-ffixed-g6 "Link to this definition")

Reserve the G6 register (SPARC only)

\-ffixed-g7[¶](#cmdoption-clang-ffixed-g7 "Link to this definition")

Reserve the G7 register (SPARC only)

\-ffixed-i0[¶](#cmdoption-clang-ffixed-i0 "Link to this definition")

Reserve the I0 register (SPARC only)

\-ffixed-i1[¶](#cmdoption-clang-ffixed-i1 "Link to this definition")

Reserve the I1 register (SPARC only)

\-ffixed-i2[¶](#cmdoption-clang-ffixed-i2 "Link to this definition")

Reserve the I2 register (SPARC only)

\-ffixed-i3[¶](#cmdoption-clang-ffixed-i3 "Link to this definition")

Reserve the I3 register (SPARC only)

\-ffixed-i4[¶](#cmdoption-clang-ffixed-i4 "Link to this definition")

Reserve the I4 register (SPARC only)

\-ffixed-i5[¶](#cmdoption-clang-ffixed-i5 "Link to this definition")

Reserve the I5 register (SPARC only)

\-ffixed-l0[¶](#cmdoption-clang-ffixed-l0 "Link to this definition")

Reserve the L0 register (SPARC only)

\-ffixed-l1[¶](#cmdoption-clang-ffixed-l1 "Link to this definition")

Reserve the L1 register (SPARC only)

\-ffixed-l2[¶](#cmdoption-clang-ffixed-l2 "Link to this definition")

Reserve the L2 register (SPARC only)

\-ffixed-l3[¶](#cmdoption-clang-ffixed-l3 "Link to this definition")

Reserve the L3 register (SPARC only)

\-ffixed-l4[¶](#cmdoption-clang-ffixed-l4 "Link to this definition")

Reserve the L4 register (SPARC only)

\-ffixed-l5[¶](#cmdoption-clang-ffixed-l5 "Link to this definition")

Reserve the L5 register (SPARC only)

\-ffixed-l6[¶](#cmdoption-clang-ffixed-l6 "Link to this definition")

Reserve the L6 register (SPARC only)

\-ffixed-l7[¶](#cmdoption-clang-ffixed-l7 "Link to this definition")

Reserve the L7 register (SPARC only)

\-ffixed-o0[¶](#cmdoption-clang-ffixed-o0 "Link to this definition")

Reserve the O0 register (SPARC only)

\-ffixed-o1[¶](#cmdoption-clang-ffixed-o1 "Link to this definition")

Reserve the O1 register (SPARC only)

\-ffixed-o2[¶](#cmdoption-clang-ffixed-o2 "Link to this definition")

Reserve the O2 register (SPARC only)

\-ffixed-o3[¶](#cmdoption-clang-ffixed-o3 "Link to this definition")

Reserve the O3 register (SPARC only)

\-ffixed-o4[¶](#cmdoption-clang-ffixed-o4 "Link to this definition")

Reserve the O4 register (SPARC only)

\-ffixed-o5[¶](#cmdoption-clang-ffixed-o5 "Link to this definition")

Reserve the O5 register (SPARC only)

\-mfix-gr712rc[¶](#cmdoption-clang-mfix-gr712rc "Link to this definition")

Enable workarounds for GR712RC errata

\-mfix-ut700[¶](#cmdoption-clang-mfix-ut700 "Link to this definition")

Enable workarounds for UT700 errata

\-mfpu, \-mno-fpu[¶](#cmdoption-clang1-mfpu "Link to this definition")

\-mfsmuld, \-mno-fsmuld[¶](#cmdoption-clang-mfsmuld "Link to this definition")

\-mhard-quad-float[¶](#cmdoption-clang-mhard-quad-float "Link to this definition")

\-mpopc, \-mno-popc[¶](#cmdoption-clang-mpopc "Link to this definition")

\-msoft-quad-float[¶](#cmdoption-clang-msoft-quad-float "Link to this definition")

\-mv8plus, \-mno-v8plus[¶](#cmdoption-clang-mv8plus "Link to this definition")

Enable V8+ mode, allowing use of 64-bit V9 instructions in 32-bit code

\-mvis, \-mno-vis[¶](#cmdoption-clang-mvis "Link to this definition")

\-mvis2, \-mno-vis2[¶](#cmdoption-clang-mvis2 "Link to this definition")

\-mvis3, \-mno-vis3[¶](#cmdoption-clang-mvis3 "Link to this definition")

#### [Hexagon](#id23)[¶](#id1 "Link to this heading")

\-mhvx, \-mno-hvx[¶](#cmdoption-clang-mhvx "Link to this definition")

Enable Hexagon Vector eXtensions

\-mhvx-length\=<arg>[¶](#cmdoption-clang-mhvx-length "Link to this definition")

Set Hexagon Vector Length. <arg> must be ‘64B’ or ‘128B’.

\-mhvx-qfloat, \-mno-hvx-qfloat[¶](#cmdoption-clang-mhvx-qfloat "Link to this definition")

Enable Hexagon HVX QFloat instructions

\-mhvx\=<arg>[¶](#cmdoption-clang1-mhvx "Link to this definition")

Enable Hexagon Vector eXtensions

#### [M68k](#id24)[¶](#m68k "Link to this heading")

\-ffixed-a0[¶](#cmdoption-clang-ffixed-a0 "Link to this definition")

Reserve the a0 register (M68k only)

\-ffixed-a1[¶](#cmdoption-clang-ffixed-a1 "Link to this definition")

Reserve the a1 register (M68k only)

\-ffixed-a2[¶](#cmdoption-clang-ffixed-a2 "Link to this definition")

Reserve the a2 register (M68k only)

\-ffixed-a3[¶](#cmdoption-clang-ffixed-a3 "Link to this definition")

Reserve the a3 register (M68k only)

\-ffixed-a4[¶](#cmdoption-clang-ffixed-a4 "Link to this definition")

Reserve the a4 register (M68k only)

\-ffixed-a5[¶](#cmdoption-clang-ffixed-a5 "Link to this definition")

Reserve the a5 register (M68k only)

\-ffixed-a6[¶](#cmdoption-clang-ffixed-a6 "Link to this definition")

Reserve the a6 register (M68k only)

\-ffixed-d0[¶](#cmdoption-clang-ffixed-d0 "Link to this definition")

Reserve the d0 register (M68k only)

\-ffixed-d1[¶](#cmdoption-clang-ffixed-d1 "Link to this definition")

Reserve the d1 register (M68k only)

\-ffixed-d2[¶](#cmdoption-clang-ffixed-d2 "Link to this definition")

Reserve the d2 register (M68k only)

\-ffixed-d3[¶](#cmdoption-clang-ffixed-d3 "Link to this definition")

Reserve the d3 register (M68k only)

\-ffixed-d4[¶](#cmdoption-clang-ffixed-d4 "Link to this definition")

Reserve the d4 register (M68k only)

\-ffixed-d5[¶](#cmdoption-clang-ffixed-d5 "Link to this definition")

Reserve the d5 register (M68k only)

\-ffixed-d6[¶](#cmdoption-clang-ffixed-d6 "Link to this definition")

Reserve the d6 register (M68k only)

\-ffixed-d7[¶](#cmdoption-clang-ffixed-d7 "Link to this definition")

Reserve the d7 register (M68k only)

\-m68000[¶](#cmdoption-clang-m68000 "Link to this definition")

\-m68010[¶](#cmdoption-clang-m68010 "Link to this definition")

\-m68020[¶](#cmdoption-clang-m68020 "Link to this definition")

\-m68030[¶](#cmdoption-clang-m68030 "Link to this definition")

\-m68040[¶](#cmdoption-clang-m68040 "Link to this definition")

\-m68060[¶](#cmdoption-clang-m68060 "Link to this definition")

\-m68881[¶](#cmdoption-clang-m68881 "Link to this definition")

#### [MIPS](#id25)[¶](#mips "Link to this heading")

\-mabicalls, \-mno-abicalls[¶](#cmdoption-clang-mabicalls "Link to this definition")

Enable SVR4-style position-independent code (Mips only)

\-mabs\=<arg>[¶](#cmdoption-clang-mabs "Link to this definition")

\-mcheck-zero-division, \-mno-check-zero-division[¶](#cmdoption-clang-mcheck-zero-division "Link to this definition")

\-mcompact-branches\=<arg>[¶](#cmdoption-clang-mcompact-branches "Link to this definition")

\-mdsp, \-mno-dsp[¶](#cmdoption-clang-mdsp "Link to this definition")

\-mdspr2, \-mno-dspr2[¶](#cmdoption-clang-mdspr2 "Link to this definition")

\-membedded-data, \-mno-embedded-data[¶](#cmdoption-clang-membedded-data "Link to this definition")

Place constants in the .rodata section instead of the .sdata section even if they meet the -G <size> threshold (MIPS)

\-mextern-sdata, \-mno-extern-sdata[¶](#cmdoption-clang-mextern-sdata "Link to this definition")

Assume that externally defined data is in the small data if it meets the -G <size> threshold (MIPS)

\-mfix4300[¶](#cmdoption-clang-mfix4300 "Link to this definition")

\-mfp32[¶](#cmdoption-clang-mfp32 "Link to this definition")

Use 32-bit floating point registers (MIPS only)

\-mfp64[¶](#cmdoption-clang-mfp64 "Link to this definition")

Use 64-bit floating point registers (MIPS only)

\-mginv, \-mno-ginv[¶](#cmdoption-clang-mginv "Link to this definition")

\-mgpopt, \-mno-gpopt[¶](#cmdoption-clang-mgpopt "Link to this definition")

Use GP relative accesses for symbols known to be in a small data section (MIPS)

\-mindirect-jump\=<arg>[¶](#cmdoption-clang-mindirect-jump "Link to this definition")

Change indirect jump instructions to inhibit speculation

\-mips16[¶](#cmdoption-clang-mips16 "Link to this definition")

\-mldc1-sdc1, \-mno-ldc1-sdc1[¶](#cmdoption-clang-mldc1-sdc1 "Link to this definition")

\-mlocal-sdata, \-mno-local-sdata[¶](#cmdoption-clang-mlocal-sdata "Link to this definition")

Extend the -G behaviour to object local data (MIPS)

\-mmadd4, \-mno-madd4[¶](#cmdoption-clang-mmadd4 "Link to this definition")

Enable the generation of 4-operand madd.s, madd.d and related instructions.

\-mmicromips, \-mno-micromips[¶](#cmdoption-clang-mmicromips "Link to this definition")

\-mmsa, \-mno-msa[¶](#cmdoption-clang-mmsa "Link to this definition")

Enable MSA ASE (MIPS only)

\-mmt, \-mno-mt[¶](#cmdoption-clang-mmt "Link to this definition")

Enable MT ASE (MIPS only)

\-mnan\=<arg>[¶](#cmdoption-clang-mnan "Link to this definition")

\-mno-mips16[¶](#cmdoption-clang-mno-mips16 "Link to this definition")

\-mvirt, \-mno-virt[¶](#cmdoption-clang-mvirt "Link to this definition")

\-mxgot, \-mno-xgot[¶](#cmdoption-clang-mxgot "Link to this definition")

#### [PowerPC](#id26)[¶](#powerpc "Link to this heading")

\-maix-shared-lib-tls-model-opt[¶](#cmdoption-clang-maix-shared-lib-tls-model-opt "Link to this definition")

For shared library loaded with the main program, change local-dynamic access(es) to initial-exec access(es) at the function level (AIX 64-bit only).

\-maix-small-local-dynamic-tls[¶](#cmdoption-clang-maix-small-local-dynamic-tls "Link to this definition")

Produce a faster access sequence for local-dynamic TLS variables where the offset from the TLS base is encoded as an immediate operand (AIX 64-bit only). This access sequence is not used for variables larger than 32KB.

\-maix-small-local-exec-tls[¶](#cmdoption-clang-maix-small-local-exec-tls "Link to this definition")

Produce a faster access sequence for local-exec TLS variables where the offset from the TLS base is encoded as an immediate operand (AIX 64-bit only). This access sequence is not used for variables larger than 32KB.

\-maltivec, \-mno-altivec[¶](#cmdoption-clang-maltivec "Link to this definition")

Enable AltiVec vector initializer syntax

\-mcmpb, \-mno-cmpb[¶](#cmdoption-clang-mcmpb "Link to this definition")

\-mcrbits, \-mno-crbits[¶](#cmdoption-clang-mcrbits "Link to this definition")

Control the CR-bit tracking feature on PowerPC. \`\`-mcrbits\`\` (the enablement of CR-bit tracking support) is the default for POWER8 and above, as well as for all other CPUs when optimization is applied (-O2 and above).

\-mcrypto, \-mno-crypto[¶](#cmdoption-clang-mcrypto "Link to this definition")

\-mdirect-move, \-mno-direct-move[¶](#cmdoption-clang-mdirect-move "Link to this definition")

\-mefpu2[¶](#cmdoption-clang-mefpu2 "Link to this definition")

\-mfloat128, \-mno-float128[¶](#cmdoption-clang-mfloat128 "Link to this definition")

\-mfprnd, \-mno-fprnd[¶](#cmdoption-clang-mfprnd "Link to this definition")

\-mhtm, \-mno-htm[¶](#cmdoption-clang-mhtm "Link to this definition")

\-minvariant-function-descriptors, \-mno-invariant-function-descriptors[¶](#cmdoption-clang-minvariant-function-descriptors "Link to this definition")

\-misel, \-mno-isel[¶](#cmdoption-clang-misel "Link to this definition")

\-mlongcall, \-mno-longcall[¶](#cmdoption-clang-mlongcall "Link to this definition")

\-mmfocrf, \-mmfcrf, \-mno-mfocrf[¶](#cmdoption-clang-mmfocrf "Link to this definition")

\-mmma, \-mno-mma[¶](#cmdoption-clang-mmma "Link to this definition")

\-mpaired-vector-memops, \-mno-paired-vector-memops[¶](#cmdoption-clang-mpaired-vector-memops "Link to this definition")

\-mpcrel, \-mno-pcrel[¶](#cmdoption-clang-mpcrel "Link to this definition")

\-mpopcntd, \-mno-popcntd[¶](#cmdoption-clang-mpopcntd "Link to this definition")

\-mpower10-vector, \-mno-power10-vector[¶](#cmdoption-clang-mpower10-vector "Link to this definition")

\-mpower8-vector, \-mno-power8-vector[¶](#cmdoption-clang-mpower8-vector "Link to this definition")

\-mpower9-vector, \-mno-power9-vector[¶](#cmdoption-clang-mpower9-vector "Link to this definition")

\-mprefixed, \-mno-prefixed[¶](#cmdoption-clang-mprefixed "Link to this definition")

\-mprivileged[¶](#cmdoption-clang-mprivileged "Link to this definition")

\-mrop-protect[¶](#cmdoption-clang-mrop-protect "Link to this definition")

\-msecure-plt[¶](#cmdoption-clang-msecure-plt "Link to this definition")

\-mspe, \-mno-spe[¶](#cmdoption-clang-mspe "Link to this definition")

\-mvsx, \-mno-vsx[¶](#cmdoption-clang-mvsx "Link to this definition")

#### [WebAssembly](#id27)[¶](#webassembly "Link to this heading")

\-matomics, \-mno-atomics[¶](#cmdoption-clang-matomics "Link to this definition")

\-mbulk-memory, \-mno-bulk-memory[¶](#cmdoption-clang-mbulk-memory "Link to this definition")

\-mbulk-memory-opt, \-mno-bulk-memory-opt[¶](#cmdoption-clang-mbulk-memory-opt "Link to this definition")

\-mcall-indirect-overlong, \-mno-call-indirect-overlong[¶](#cmdoption-clang-mcall-indirect-overlong "Link to this definition")

\-mexception-handling, \-mno-exception-handling[¶](#cmdoption-clang-mexception-handling "Link to this definition")

\-mextended-const, \-mno-extended-const[¶](#cmdoption-clang-mextended-const "Link to this definition")

\-mfp16, \-mno-fp16[¶](#cmdoption-clang-mfp16 "Link to this definition")

\-mgc, \-mno-gc[¶](#cmdoption-clang-mgc "Link to this definition")

\-mmultimemory, \-mno-multimemory[¶](#cmdoption-clang-mmultimemory "Link to this definition")

\-mmultivalue, \-mno-multivalue[¶](#cmdoption-clang-mmultivalue "Link to this definition")

\-mmutable-globals, \-mno-mutable-globals[¶](#cmdoption-clang-mmutable-globals "Link to this definition")

\-mnontrapping-fptoint, \-mno-nontrapping-fptoint[¶](#cmdoption-clang-mnontrapping-fptoint "Link to this definition")

\-mreference-types, \-mno-reference-types[¶](#cmdoption-clang-mreference-types "Link to this definition")

\-mrelaxed-simd, \-mno-relaxed-simd[¶](#cmdoption-clang-mrelaxed-simd "Link to this definition")

\-msign-ext, \-mno-sign-ext[¶](#cmdoption-clang-msign-ext "Link to this definition")

\-msimd128, \-mno-simd128[¶](#cmdoption-clang-msimd128 "Link to this definition")

\-mtail-call, \-mno-tail-call[¶](#cmdoption-clang-mtail-call "Link to this definition")

\-mwide-arithmetic, \-mno-wide-arithmetic[¶](#cmdoption-clang-mwide-arithmetic "Link to this definition")

#### [WebAssembly Driver](#id28)[¶](#webassembly-driver "Link to this heading")

\-mexec-model\=<arg>[¶](#cmdoption-clang-mexec-model "Link to this definition")

Select between “command” and “reactor” executable models. Commands have a main-function which scopes the lifetime of the program. Reactors are activated and remain active until explicitly terminated. <arg> must be ‘command’ or ‘reactor’.

#### [X86](#id29)[¶](#x86 "Link to this heading")

\-madx, \-mno-adx[¶](#cmdoption-clang-madx "Link to this definition")

\-maes, \-mno-aes[¶](#cmdoption-clang-maes "Link to this definition")

\-mamx-avx512, \-mno-amx-avx512[¶](#cmdoption-clang-mamx-avx512 "Link to this definition")

\-mamx-bf16, \-mno-amx-bf16[¶](#cmdoption-clang-mamx-bf16 "Link to this definition")

\-mamx-complex, \-mno-amx-complex[¶](#cmdoption-clang-mamx-complex "Link to this definition")

\-mamx-fp16, \-mno-amx-fp16[¶](#cmdoption-clang-mamx-fp16 "Link to this definition")

\-mamx-fp8, \-mno-amx-fp8[¶](#cmdoption-clang-mamx-fp8 "Link to this definition")

\-mamx-int8, \-mno-amx-int8[¶](#cmdoption-clang-mamx-int8 "Link to this definition")

\-mamx-movrs, \-mno-amx-movrs[¶](#cmdoption-clang-mamx-movrs "Link to this definition")

\-mamx-tf32, \-mno-amx-tf32[¶](#cmdoption-clang-mamx-tf32 "Link to this definition")

\-mamx-tile, \-mno-amx-tile[¶](#cmdoption-clang-mamx-tile "Link to this definition")

\-mamx-transpose, \-mno-amx-transpose[¶](#cmdoption-clang-mamx-transpose "Link to this definition")

\-mapx-features\=<arg1>,<arg2>..., \-mapxf (equivalent to \-mapx-features=egpr,push2pop2,ppx,ndd,ccmp,nf,zu), \-mno-apx-features\=<arg1>,<arg2>...[¶](#cmdoption-clang-mapx-features "Link to this definition")

Enable features of APX. <arg> must be ‘egpr’, ‘push2pop2’, ‘ppx’, ‘ndd’, ‘ccmp’, ‘nf’, ‘cf’ or ‘zu’.

\-mavx, \-mno-avx[¶](#cmdoption-clang-mavx "Link to this definition")

\-mavx2, \-mno-avx2[¶](#cmdoption-clang-mavx2 "Link to this definition")

\-mavx512bf16, \-mno-avx512bf16[¶](#cmdoption-clang-mavx512bf16 "Link to this definition")

\-mavx512bitalg, \-mno-avx512bitalg[¶](#cmdoption-clang-mavx512bitalg "Link to this definition")

\-mavx512bw, \-mno-avx512bw[¶](#cmdoption-clang-mavx512bw "Link to this definition")

\-mavx512cd, \-mno-avx512cd[¶](#cmdoption-clang-mavx512cd "Link to this definition")

\-mavx512dq, \-mno-avx512dq[¶](#cmdoption-clang-mavx512dq "Link to this definition")

\-mavx512f, \-mno-avx512f[¶](#cmdoption-clang-mavx512f "Link to this definition")

\-mavx512fp16, \-mno-avx512fp16[¶](#cmdoption-clang-mavx512fp16 "Link to this definition")

\-mavx512ifma, \-mno-avx512ifma[¶](#cmdoption-clang-mavx512ifma "Link to this definition")

\-mavx512vbmi, \-mno-avx512vbmi[¶](#cmdoption-clang-mavx512vbmi "Link to this definition")

\-mavx512vbmi2, \-mno-avx512vbmi2[¶](#cmdoption-clang-mavx512vbmi2 "Link to this definition")

\-mavx512vl, \-mno-avx512vl[¶](#cmdoption-clang-mavx512vl "Link to this definition")

\-mavx512vnni, \-mno-avx512vnni[¶](#cmdoption-clang-mavx512vnni "Link to this definition")

\-mavx512vp2intersect, \-mno-avx512vp2intersect[¶](#cmdoption-clang-mavx512vp2intersect "Link to this definition")

\-mavx512vpopcntdq, \-mno-avx512vpopcntdq[¶](#cmdoption-clang-mavx512vpopcntdq "Link to this definition")

\-mavxifma, \-mno-avxifma[¶](#cmdoption-clang-mavxifma "Link to this definition")

\-mavxneconvert, \-mno-avxneconvert[¶](#cmdoption-clang-mavxneconvert "Link to this definition")

\-mavxvnni, \-mno-avxvnni[¶](#cmdoption-clang-mavxvnni "Link to this definition")

\-mavxvnniint16, \-mno-avxvnniint16[¶](#cmdoption-clang-mavxvnniint16 "Link to this definition")

\-mavxvnniint8, \-mno-avxvnniint8[¶](#cmdoption-clang-mavxvnniint8 "Link to this definition")

\-mbmi, \-mno-bmi[¶](#cmdoption-clang-mbmi "Link to this definition")

\-mbmi2, \-mno-bmi2[¶](#cmdoption-clang-mbmi2 "Link to this definition")

\-mcldemote, \-mno-cldemote[¶](#cmdoption-clang-mcldemote "Link to this definition")

\-mclflushopt, \-mno-clflushopt[¶](#cmdoption-clang-mclflushopt "Link to this definition")

\-mclwb, \-mno-clwb[¶](#cmdoption-clang-mclwb "Link to this definition")

\-mclzero, \-mno-clzero[¶](#cmdoption-clang-mclzero "Link to this definition")

\-mcmpccxadd, \-mno-cmpccxadd[¶](#cmdoption-clang-mcmpccxadd "Link to this definition")

\-mcrc32, \-mno-crc32[¶](#cmdoption-clang-mcrc32 "Link to this definition")

\-mcx16, \-mno-cx16[¶](#cmdoption-clang-mcx16 "Link to this definition")

\-menqcmd, \-mno-enqcmd[¶](#cmdoption-clang-menqcmd "Link to this definition")

\-mevex512, \-mno-evex512[¶](#cmdoption-clang-mevex512 "Link to this definition")

\-mf16c, \-mno-f16c[¶](#cmdoption-clang-mf16c "Link to this definition")

\-mfma, \-mno-fma[¶](#cmdoption-clang-mfma "Link to this definition")

\-mfma4, \-mno-fma4[¶](#cmdoption-clang-mfma4 "Link to this definition")

\-mfsgsbase, \-mno-fsgsbase[¶](#cmdoption-clang-mfsgsbase "Link to this definition")

\-mfxsr, \-mno-fxsr[¶](#cmdoption-clang-mfxsr "Link to this definition")

\-mgfni, \-mno-gfni[¶](#cmdoption-clang-mgfni "Link to this definition")

\-mhreset, \-mno-hreset[¶](#cmdoption-clang-mhreset "Link to this definition")

\-minvpcid, \-mno-invpcid[¶](#cmdoption-clang-minvpcid "Link to this definition")

\-mkl, \-mno-kl[¶](#cmdoption-clang-mkl "Link to this definition")

\-mlwp, \-mno-lwp[¶](#cmdoption-clang-mlwp "Link to this definition")

\-mlzcnt, \-mno-lzcnt[¶](#cmdoption-clang-mlzcnt "Link to this definition")

\-mmmx, \-mno-mmx[¶](#cmdoption-clang-mmmx "Link to this definition")

\-mmovbe, \-mno-movbe[¶](#cmdoption-clang-mmovbe "Link to this definition")

\-mmovdir64b, \-mno-movdir64b[¶](#cmdoption-clang-mmovdir64b "Link to this definition")

\-mmovdiri, \-mno-movdiri[¶](#cmdoption-clang-mmovdiri "Link to this definition")

\-mmovrs, \-mno-movrs[¶](#cmdoption-clang-mmovrs "Link to this definition")

\-mmwaitx, \-mno-mwaitx[¶](#cmdoption-clang-mmwaitx "Link to this definition")

\-mpclmul, \-mno-pclmul[¶](#cmdoption-clang-mpclmul "Link to this definition")

\-mpconfig, \-mno-pconfig[¶](#cmdoption-clang-mpconfig "Link to this definition")

\-mpku, \-mno-pku[¶](#cmdoption-clang-mpku "Link to this definition")

\-mpopcnt, \-mno-popcnt[¶](#cmdoption-clang-mpopcnt "Link to this definition")

\-mprefetchi, \-mno-prefetchi[¶](#cmdoption-clang-mprefetchi "Link to this definition")

\-mprfchw, \-mno-prfchw[¶](#cmdoption-clang-mprfchw "Link to this definition")

\-mptwrite, \-mno-ptwrite[¶](#cmdoption-clang-mptwrite "Link to this definition")

\-mraoint, \-mno-raoint[¶](#cmdoption-clang-mraoint "Link to this definition")

\-mrdpid, \-mno-rdpid[¶](#cmdoption-clang-mrdpid "Link to this definition")

\-mrdpru, \-mno-rdpru[¶](#cmdoption-clang-mrdpru "Link to this definition")

\-mrdrnd, \-mno-rdrnd[¶](#cmdoption-clang-mrdrnd "Link to this definition")

\-mrdseed, \-mno-rdseed[¶](#cmdoption-clang-mrdseed "Link to this definition")

\-mretpoline-external-thunk, \-mno-retpoline-external-thunk[¶](#cmdoption-clang-mretpoline-external-thunk "Link to this definition")

\-mrtm, \-mno-rtm[¶](#cmdoption-clang-mrtm "Link to this definition")

\-msahf, \-mno-sahf[¶](#cmdoption-clang-msahf "Link to this definition")

\-mserialize, \-mno-serialize[¶](#cmdoption-clang-mserialize "Link to this definition")

\-msgx, \-mno-sgx[¶](#cmdoption-clang-msgx "Link to this definition")

\-msha, \-mno-sha[¶](#cmdoption-clang-msha "Link to this definition")

\-msha512, \-mno-sha512[¶](#cmdoption-clang-msha512 "Link to this definition")

\-mshstk, \-mno-shstk[¶](#cmdoption-clang-mshstk "Link to this definition")

\-msm3, \-mno-sm3[¶](#cmdoption-clang-msm3 "Link to this definition")

\-msm4, \-mno-sm4[¶](#cmdoption-clang-msm4 "Link to this definition")

\-msse, \-mno-sse[¶](#cmdoption-clang-msse "Link to this definition")

\-msse2, \-mno-sse2[¶](#cmdoption-clang-msse2 "Link to this definition")

\-msse3, \-mno-sse3[¶](#cmdoption-clang-msse3 "Link to this definition")

\-msse4.1, \-mno-sse4.1[¶](#cmdoption-clang-msse4.1 "Link to this definition")

\-msse4.2, \-mno-sse4.2, \-msse4[¶](#cmdoption-clang1-msse4.2 "Link to this definition")

\-msse4a, \-mno-sse4a[¶](#cmdoption-clang-msse4a "Link to this definition")

\-mssse3, \-mno-ssse3[¶](#cmdoption-clang-mssse3 "Link to this definition")

\-mtbm, \-mno-tbm[¶](#cmdoption-clang-mtbm "Link to this definition")

\-mtsxldtrk, \-mno-tsxldtrk[¶](#cmdoption-clang-mtsxldtrk "Link to this definition")

\-muintr, \-mno-uintr[¶](#cmdoption-clang-muintr "Link to this definition")

\-musermsr, \-mno-usermsr[¶](#cmdoption-clang-musermsr "Link to this definition")

\-mvaes, \-mno-vaes[¶](#cmdoption-clang-mvaes "Link to this definition")

\-mvpclmulqdq, \-mno-vpclmulqdq[¶](#cmdoption-clang-mvpclmulqdq "Link to this definition")

\-mvzeroupper, \-mno-vzeroupper[¶](#cmdoption-clang-mvzeroupper "Link to this definition")

\-mwaitpkg, \-mno-waitpkg[¶](#cmdoption-clang-mwaitpkg "Link to this definition")

\-mwbnoinvd, \-mno-wbnoinvd[¶](#cmdoption-clang-mwbnoinvd "Link to this definition")

\-mwidekl, \-mno-widekl[¶](#cmdoption-clang-mwidekl "Link to this definition")

\-mx87, \-m80387, \-mno-x87[¶](#cmdoption-clang-mx87 "Link to this definition")

\-mxop, \-mno-xop[¶](#cmdoption-clang-mxop "Link to this definition")

\-mxsave, \-mno-xsave[¶](#cmdoption-clang-mxsave "Link to this definition")

\-mxsavec, \-mno-xsavec[¶](#cmdoption-clang-mxsavec "Link to this definition")

\-mxsaveopt, \-mno-xsaveopt[¶](#cmdoption-clang-mxsaveopt "Link to this definition")

\-mxsaves, \-mno-xsaves[¶](#cmdoption-clang-mxsaves "Link to this definition")

#### [X86 AVX10](#id30)[¶](#x86-avx10 "Link to this heading")

\-mavx10.1, \-mno-avx10.1[¶](#cmdoption-clang-mavx10.1 "Link to this definition")

\-mavx10.1-256, \-mno-avx10.1-256[¶](#cmdoption-clang1-mavx10.1-256 "Link to this definition")

\-mavx10.1-512[¶](#cmdoption-clang2-mavx10.1-512 "Link to this definition")

\-mavx10.2, \-mno-avx10.2[¶](#cmdoption-clang3-mavx10.2 "Link to this definition")

\-mavx10.2-256[¶](#cmdoption-clang4-mavx10.2-256 "Link to this definition")

\-mavx10.2-512[¶](#cmdoption-clang5-mavx10.2-512 "Link to this definition")

#### [RISC-V](#id31)[¶](#risc-v "Link to this heading")

\-msave-restore, \-mno-save-restore[¶](#cmdoption-clang-msave-restore "Link to this definition")

Enable using library calls for save and restore

#### [VE](#id32)[¶](#ve "Link to this heading")

\-mvevpu, \-mno-vevpu[¶](#cmdoption-clang-mvevpu "Link to this definition")

Emit VPU instructions for VE

#### [LoongArch](#id33)[¶](#loongarch "Link to this heading")

\-mannotate-tablejump, \-mno-annotate-tablejump[¶](#cmdoption-clang-mannotate-tablejump "Link to this definition")

Enable annotate table jump instruction to correlate it with the jump table.

\-mdiv32, \-mno-div32[¶](#cmdoption-clang-mdiv32 "Link to this definition")

Use div.w\[u\] and mod.w\[u\] instructions with input not sign-extended.

\-mfrecipe, \-mno-frecipe[¶](#cmdoption-clang-mfrecipe "Link to this definition")

Enable frecipe.{s/d} and frsqrte.{s/d}

\-mlam-bh, \-mno-lam-bh[¶](#cmdoption-clang-mlam-bh "Link to this definition")

Enable amswap\[\_db\].{b/h} and amadd\[\_db\].{b/h}

\-mlamcas, \-mno-lamcas[¶](#cmdoption-clang-mlamcas "Link to this definition")

Enable amcas\[\_db\].{b/h/w/d}

\-mlasx, \-mno-lasx[¶](#cmdoption-clang-mlasx "Link to this definition")

Enable Loongson Advanced SIMD Extension (LASX).

\-mld-seq-sa, \-mno-ld-seq-sa[¶](#cmdoption-clang-mld-seq-sa "Link to this definition")

Do not generate same-address load-load barrier instructions (dbar 0x700)

\-mlsx, \-mno-lsx[¶](#cmdoption-clang-mlsx "Link to this definition")

Enable Loongson SIMD Extension (LSX).

\-mscq, \-mno-scq[¶](#cmdoption-clang-mscq "Link to this definition")

Enable sc.q instruction.

\-msimd\=<arg>[¶](#cmdoption-clang-msimd "Link to this definition")

Select the SIMD extension(s) to be enabled in LoongArch either ‘none’, ‘lsx’, ‘lasx’.

#### [Long double options](#id34)[¶](#long-double-options "Link to this heading")

Selects the long double implementation

\-mlong-double-128[¶](#cmdoption-clang-mlong-double-128 "Link to this definition")

Force long double to be 128 bits

\-mlong-double-64[¶](#cmdoption-clang-mlong-double-64 "Link to this definition")

Force long double to be 64 bits

\-mlong-double-80[¶](#cmdoption-clang-mlong-double-80 "Link to this definition")

Force long double to be 80 bits, padded to 128 bits for storage

### [Optimization level](#id35)[¶](#optimization-level "Link to this heading")

Flags controlling how much optimization should be performed.

\-O<arg>, \-O (equivalent to \-O1), \--optimize, \--optimize\=<arg>[¶](#cmdoption-clang-O-arg "Link to this definition")

\-Ofast<arg>[¶](#cmdoption-clang-Ofast-arg "Link to this definition")

Deprecated; use ‘-O3 -ffast-math’ for the same behavior, or ‘-O3’ to enable only conforming optimizations

### [Debug information generation](#id36)[¶](#debug-information-generation "Link to this heading")

Flags controlling how much and what kind of debug information should be generated.

#### [Kind and level of debug information](#id37)[¶](#kind-and-level-of-debug-information "Link to this heading")

\-g, \--debug, \--debug\=<arg>[¶](#cmdoption-clang-g "Link to this definition")

Generate source-level debug information

\-gdwarf[¶](#cmdoption-clang-gdwarf "Link to this definition")

Generate source-level debug information with the default dwarf version

\-gdwarf-2[¶](#cmdoption-clang-gdwarf-2 "Link to this definition")

Generate source-level debug information with dwarf version 2

\-gdwarf-3[¶](#cmdoption-clang-gdwarf-3 "Link to this definition")

Generate source-level debug information with dwarf version 3

\-gdwarf-4[¶](#cmdoption-clang-gdwarf-4 "Link to this definition")

Generate source-level debug information with dwarf version 4

\-gdwarf-5[¶](#cmdoption-clang-gdwarf-5 "Link to this definition")

Generate source-level debug information with dwarf version 5

\-gdwarf32[¶](#cmdoption-clang-gdwarf32 "Link to this definition")

Enables DWARF32 format for ELF binaries, if debug information emission is enabled.

\-gdwarf64[¶](#cmdoption-clang-gdwarf64 "Link to this definition")

Enables DWARF64 format for ELF binaries, if debug information emission is enabled.

\-gfull[¶](#cmdoption-clang-gfull "Link to this definition")

\-ginline-line-tables, \-gno-inline-line-tables[¶](#cmdoption-clang-ginline-line-tables "Link to this definition")

\-gkey-instructions, \-gno-key-instructions[¶](#cmdoption-clang-gkey-instructions "Link to this definition")

Enable Key Instructions, which reduces the jumpiness of debug stepping in optimized C/C++ code in some debuggers. DWARF only. Implies -g.

\-gomit-unreferenced-methods, \-gno-omit-unreferenced-methods[¶](#cmdoption-clang-gomit-unreferenced-methods "Link to this definition")

\-gused[¶](#cmdoption-clang-gused "Link to this definition")

##### [Debug level](#id38)[¶](#debug-level "Link to this heading")

\-g0[¶](#cmdoption-clang-g0 "Link to this definition")

\-g2[¶](#cmdoption-clang-g2 "Link to this definition")

\-g3[¶](#cmdoption-clang-g3 "Link to this definition")

\-ggdb0[¶](#cmdoption-clang-ggdb0 "Link to this definition")

\-ggdb1[¶](#cmdoption-clang-ggdb1 "Link to this definition")

\-ggdb2[¶](#cmdoption-clang-ggdb2 "Link to this definition")

\-ggdb3[¶](#cmdoption-clang-ggdb3 "Link to this definition")

\-gline-directives-only[¶](#cmdoption-clang-gline-directives-only "Link to this definition")

Emit debug line info directives only

\-gline-tables-only, \-g1, \-gmlt[¶](#cmdoption-clang-gline-tables-only "Link to this definition")

Emit debug line number tables only

\-gmodules, \-gno-modules[¶](#cmdoption-clang-gmodules "Link to this definition")

Generate debug info with external references to clang modules or precompiled headers

##### [Debugger to tune debug information for](#id39)[¶](#debugger-to-tune-debug-information-for "Link to this heading")

\-gdbx[¶](#cmdoption-clang-gdbx "Link to this definition")

\-ggdb[¶](#cmdoption-clang-ggdb "Link to this definition")

\-glldb[¶](#cmdoption-clang-glldb "Link to this definition")

\-gsce[¶](#cmdoption-clang-gsce "Link to this definition")

#### [Debug information options](#id40)[¶](#debug-information-options "Link to this heading")

\-gcolumn-info, \-gno-column-info[¶](#cmdoption-clang-gcolumn-info "Link to this definition")

\-gdwarf-aranges[¶](#cmdoption-clang-gdwarf-aranges "Link to this definition")

\-gembed-source, \-gno-embed-source[¶](#cmdoption-clang-gembed-source "Link to this definition")

Embed source text in DWARF debug sections

\-ggnu-pubnames, \-gno-gnu-pubnames[¶](#cmdoption-clang-ggnu-pubnames "Link to this definition")

\-gpubnames, \-gno-pubnames[¶](#cmdoption-clang-gpubnames "Link to this definition")

\-grecord-command-line, \-gno-record-command-line, \-grecord-gcc-switches[¶](#cmdoption-clang-grecord-command-line "Link to this definition")

\-gsimple-template-names, \-gno-simple-template-names[¶](#cmdoption-clang-gsimple-template-names "Link to this definition")

\-gsplit-dwarf, \-gno-split-dwarf[¶](#cmdoption-clang-gsplit-dwarf "Link to this definition")

\-gsplit-dwarf\=<arg>[¶](#cmdoption-clang1-gsplit-dwarf "Link to this definition")

Set DWARF fission mode. <arg> must be ‘split’ or ‘single’.

\-gstrict-dwarf, \-gno-strict-dwarf[¶](#cmdoption-clang-gstrict-dwarf "Link to this definition")

Restrict DWARF features to those defined in the specified version, avoiding features from later versions.

\-gtemplate-alias, \-gno-template-alias[¶](#cmdoption-clang-gtemplate-alias "Link to this definition")

\-gz\=<arg>, \-gz (equivalent to \-gz=zlib)[¶](#cmdoption-clang-gz "Link to this definition")

DWARF debug sections compression type

[Static analyzer options](#id41)[¶](#static-analyzer-options "Link to this heading")
------------------------------------------------------------------------------------

Flags controlling the behavior of the Clang Static Analyzer.

\-Xanalyzer <arg>[¶](#cmdoption-clang-Xanalyzer "Link to this definition")

Pass <arg> to the static analyzer

[Fortran compilation options](#id42)[¶](#fortran-compilation-options "Link to this heading")
--------------------------------------------------------------------------------------------

Flags that will be passed onto the `gfortran` compiler when Clang is given a Fortran input.

\-A<arg>, \--assert <arg>, \--assert\=<arg>[¶](#cmdoption-clang-A-arg "Link to this definition")

\-A-<arg>[¶](#cmdoption-clang-0 "Link to this definition")

\-faggressive-function-elimination, \-fno-aggressive-function-elimination[¶](#cmdoption-clang-faggressive-function-elimination "Link to this definition")

\-falign-commons, \-fno-align-commons[¶](#cmdoption-clang-falign-commons "Link to this definition")

\-fall-intrinsics, \-fno-all-intrinsics[¶](#cmdoption-clang-fall-intrinsics "Link to this definition")

\-fbacktrace, \-fno-backtrace[¶](#cmdoption-clang-fbacktrace "Link to this definition")

\-fblas-matmul-limit\=<arg>[¶](#cmdoption-clang-fblas-matmul-limit "Link to this definition")

\-fbounds-check, \-fno-bounds-check[¶](#cmdoption-clang-fbounds-check "Link to this definition")

\-fcheck-array-temporaries, \-fno-check-array-temporaries[¶](#cmdoption-clang-fcheck-array-temporaries "Link to this definition")

\-fcheck\=<arg>[¶](#cmdoption-clang-fcheck "Link to this definition")

\-fcray-pointer, \-fno-cray-pointer[¶](#cmdoption-clang-fcray-pointer "Link to this definition")

\-fdollar-ok, \-fno-dollar-ok[¶](#cmdoption-clang-fdollar-ok "Link to this definition")

\-fdump-fortran-optimized, \-fno-dump-fortran-optimized[¶](#cmdoption-clang-fdump-fortran-optimized "Link to this definition")

\-fdump-fortran-original, \-fno-dump-fortran-original[¶](#cmdoption-clang-fdump-fortran-original "Link to this definition")

\-fdump-parse-tree, \-fno-dump-parse-tree[¶](#cmdoption-clang-fdump-parse-tree "Link to this definition")

\-fexternal-blas, \-fno-external-blas[¶](#cmdoption-clang-fexternal-blas "Link to this definition")

\-ff2c, \-fno-f2c[¶](#cmdoption-clang-ff2c "Link to this definition")

\-ffpe-trap\=<arg>[¶](#cmdoption-clang-ffpe-trap "Link to this definition")

\-ffree-line-length-<arg>[¶](#cmdoption-clang-ffree-line-length-arg "Link to this definition")

\-ffrontend-optimize, \-fno-frontend-optimize[¶](#cmdoption-clang-ffrontend-optimize "Link to this definition")

\-finit-character\=<arg>[¶](#cmdoption-clang-finit-character "Link to this definition")

\-finit-integer\=<arg>[¶](#cmdoption-clang-finit-integer "Link to this definition")

\-finit-local-zero, \-fno-init-local-zero[¶](#cmdoption-clang-finit-local-zero "Link to this definition")

\-finit-logical\=<arg>[¶](#cmdoption-clang-finit-logical "Link to this definition")

\-finit-real\=<arg>[¶](#cmdoption-clang-finit-real "Link to this definition")

\-finteger-4-integer-8, \-fno-integer-4-integer-8[¶](#cmdoption-clang-finteger-4-integer-8 "Link to this definition")

\-fmax-array-constructor\=<arg>[¶](#cmdoption-clang-fmax-array-constructor "Link to this definition")

\-fmax-errors\=<arg>[¶](#cmdoption-clang-fmax-errors "Link to this definition")

\-fmax-identifier-length, \-fno-max-identifier-length[¶](#cmdoption-clang-fmax-identifier-length "Link to this definition")

\-fmax-stack-var-size\=<arg>[¶](#cmdoption-clang-fmax-stack-var-size "Link to this definition")

\-fmax-subrecord-length\=<arg>[¶](#cmdoption-clang-fmax-subrecord-length "Link to this definition")

\-fmodule-private, \-fno-module-private[¶](#cmdoption-clang-fmodule-private "Link to this definition")

\-fpack-derived, \-fno-pack-derived[¶](#cmdoption-clang-fpack-derived "Link to this definition")

\-frange-check, \-fno-range-check[¶](#cmdoption-clang-frange-check "Link to this definition")

\-freal-4-real-10, \-fno-real-4-real-10[¶](#cmdoption-clang-freal-4-real-10 "Link to this definition")

\-freal-4-real-16, \-fno-real-4-real-16[¶](#cmdoption-clang-freal-4-real-16 "Link to this definition")

\-freal-4-real-8, \-fno-real-4-real-8[¶](#cmdoption-clang-freal-4-real-8 "Link to this definition")

\-freal-8-real-10, \-fno-real-8-real-10[¶](#cmdoption-clang-freal-8-real-10 "Link to this definition")

\-freal-8-real-16, \-fno-real-8-real-16[¶](#cmdoption-clang-freal-8-real-16 "Link to this definition")

\-freal-8-real-4, \-fno-real-8-real-4[¶](#cmdoption-clang-freal-8-real-4 "Link to this definition")

\-frecord-marker\=<arg>[¶](#cmdoption-clang-frecord-marker "Link to this definition")

\-frecursive, \-fno-recursive[¶](#cmdoption-clang-frecursive "Link to this definition")

\-fsecond-underscore, \-fno-second-underscore[¶](#cmdoption-clang-fsecond-underscore "Link to this definition")

\-fsign-zero, \-fno-sign-zero[¶](#cmdoption-clang-fsign-zero "Link to this definition")

\-fwhole-file, \-fno-whole-file[¶](#cmdoption-clang-fwhole-file "Link to this definition")

\-imultilib <arg>[¶](#cmdoption-clang-imultilib "Link to this definition")

\-static-libgfortran[¶](#cmdoption-clang-static-libgfortran "Link to this definition")

[Linker options](#id43)[¶](#linker-options "Link to this heading")
------------------------------------------------------------------

Flags that are passed on to the linker

\-L<dir>, \--library-directory <arg>, \--library-directory\=<arg>[¶](#cmdoption-clang-L-dir "Link to this definition")

Add directory to library search path

\-Mach[¶](#cmdoption-clang-Mach "Link to this definition")

\-T<script>[¶](#cmdoption-clang-T-script "Link to this definition")

Specify <script> as linker script

\-Wl,<arg>,<arg2>...[¶](#cmdoption-clang-Wl-arg-arg2-... "Link to this definition")

Pass the comma separated arguments in <arg> to the linker

\-X[¶](#cmdoption-clang-X "Link to this definition")

\-Xlinker <arg>, \--for-linker <arg>, \--for-linker\=<arg>[¶](#cmdoption-clang-Xlinker "Link to this definition")

Pass <arg> to the linker

\-Xoffload-linker<triple> <arg>[¶](#cmdoption-clang-Xoffload-linker-triple "Link to this definition")

Pass <arg> to the offload linkers or the ones identified by -<triple>

\-Xthinlto-distributor\=<arg>,<arg2>...[¶](#cmdoption-clang-Xthinlto-distributor "Link to this definition")

Pass <arg> to the ThinLTO distributor process. Can be specified multiple times or with comma-separated values.

\-Z[¶](#cmdoption-clang-Z "Link to this definition")

\-b<arg>[¶](#cmdoption-clang-b-arg "Link to this definition")

Pass -b <arg> to the linker on AIX

\-coverage, \--coverage[¶](#cmdoption-clang-coverage "Link to this definition")

\-e <arg>, \--entry[¶](#cmdoption-clang-e "Link to this definition")

\-filelist <arg>[¶](#cmdoption-clang-filelist "Link to this definition")

\-l<arg>[¶](#cmdoption-clang-l-arg "Link to this definition")

\--ld-path\=<arg>[¶](#cmdoption-clang-ld-path "Link to this definition")

\-mxcoff-build-id\=<0xHEXSTRING>[¶](#cmdoption-clang-mxcoff-build-id "Link to this definition")

On AIX, request creation of a build-id string, “0xHEXSTRING”, in the string table of the loader section inside the linked binary

\-nostartfiles[¶](#cmdoption-clang-nostartfiles "Link to this definition")

\-nostdlib, \--no-standard-libraries[¶](#cmdoption-clang1-nostdlib "Link to this definition")

\--offload-link[¶](#cmdoption-clang-offload-link "Link to this definition")

Use the new offloading linker to perform the link job.

\-pie, \-no-pie[¶](#cmdoption-clang-pie "Link to this definition")

\-r[¶](#cmdoption-clang-r "Link to this definition")

\-rdynamic[¶](#cmdoption-clang-rdynamic "Link to this definition")

\-rpath <arg>[¶](#cmdoption-clang-rpath "Link to this definition")

\-s[¶](#cmdoption-clang-s "Link to this definition")

\-shared, \--shared[¶](#cmdoption-clang-shared "Link to this definition")

\-specs\=<arg>, \--specs\=<arg>[¶](#cmdoption-clang-specs "Link to this definition")

\-startfiles[¶](#cmdoption-clang-startfiles "Link to this definition")

\-static, \--static[¶](#cmdoption-clang-static "Link to this definition")

\-static-pie[¶](#cmdoption-clang-static-pie "Link to this definition")

\-stdlib[¶](#cmdoption-clang2-stdlib "Link to this definition")

\-t[¶](#cmdoption-clang-t "Link to this definition")

\-u<arg>, \--force-link <arg>, \--force-link\=<arg>[¶](#cmdoption-clang-u-arg "Link to this definition")

\-undef[¶](#cmdoption-clang-undef "Link to this definition")

undef all system defines

\-undefined<arg>, \--no-undefined[¶](#cmdoption-clang-undefined-arg "Link to this definition")

\-z <arg>[¶](#cmdoption-clang-z "Link to this definition")

Pass -z <arg> to the linker

[clang-dxc options](#id44)[¶](#clang-dxc-options "Link to this heading")
------------------------------------------------------------------------

dxc compatibility options.

\--dxv-path\=<arg>[¶](#cmdoption-clang-dxv-path "Link to this definition")

DXIL validator installation path

\-fdx-rootsignature-define\=<arg>[¶](#cmdoption-clang-fdx-rootsignature-define "Link to this definition")

Override entry function root signature with root signature at given macro name.

\-fdx-rootsignature-version\=<arg>[¶](#cmdoption-clang-fdx-rootsignature-version "Link to this definition")

Root Signature Version. <arg> must be ‘rootsig\_1\_0’ or ‘rootsig\_1\_1’.

\-fspv-extension\=<arg>[¶](#cmdoption-clang-fspv-extension "Link to this definition")

Specify the available SPIR-V extensions. If this option is not specified, then all extensions are available. If KHR is specified, then all KHR extensions will be available. If DXC is specifided, then all extensions implemented by the DirectX Shader compiler will be available. This option is useful for moving from DXC to Clang.

\-fspv-target-env\=<arg>[¶](#cmdoption-clang-fspv-target-env "Link to this definition")

Specify the target environment. <arg> must be ‘vulkan1.2’ or ‘ vulkan1.3’.

\-hlsl-entry <arg>[¶](#cmdoption-clang-hlsl-entry "Link to this definition")

Entry point name for hlsl