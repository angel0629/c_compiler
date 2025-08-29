---
title: "Clang nvlink Wrapper — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/ClangNVLinkWrapper.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
*   [Introduction](#introduction)
    
*   [Usage](#usage)
    
*   [Example](#example)
    

[Introduction](#id2)[¶](#introduction "Link to this heading")
-------------------------------------------------------------

This tools works as a wrapper around the NVIDIA `nvlink` linker. The purpose of this wrapper is to provide an interface similar to the `ld.lld` linker while still relying on NVIDIA’s proprietary linker to produce the final output.

`nvlink` has a number of known quirks that make it difficult to use in a unified offloading setting. For example, it does not accept `.o` files as they must be named `.cubin`. Static archives do not work, so passing a `.a` will provide a linker error. `nvlink` also does not support link time optimization and ignores many standard linker arguments. This tool works around these issues.

[Usage](#id3)[¶](#usage "Link to this heading")
-----------------------------------------------

This tool can be used with the following options. Any arguments not intended only for the linker wrapper will be forwarded to `nvlink`.

OVERVIEW: A utility that wraps around the NVIDIA 'nvlink' linker.
This enables static linking and LTO handling for NVPTX targets.

USAGE: clang-nvlink-wrapper \[options\] <options to passed to nvlink>

OPTIONS:
  --arch <value>       Specify the 'sm\_' name of the target architecture.
  --cuda-path=<dir>    Set the system CUDA path
  --dry-run            Print generated commands without running.
  --feature <value>    Specify the '+ptx' freature to use for LTO.
  -g                   Specify that this was a debug compile.
  -help-hidden         Display all available options
  -help                Display available options (--help-hidden for more)
  -L <dir>             Add <dir> to the library search path
  -l <libname>         Search for library <libname>
  -mllvm <arg>         Arguments passed to LLVM, including Clang invocations,
                       for which the '-mllvm' prefix is preserved. Use '-mllvm
                       --help' for a list of options.
  -o <path>            Path to file to write output
  --plugin-opt=jobs=<value>
                       Number of LTO codegen partitions
  --plugin-opt=lto-partitions=<value>
                       Number of LTO codegen partitions
  --plugin-opt=O<O0, O1, O2, or O3>
                       Optimization level for LTO
  --plugin-opt=thinlto<value>
                       Enable the thin-lto backend
  --plugin-opt=<value> Arguments passed to LLVM, including Clang invocations,
                       for which the '-mllvm' prefix is preserved. Use '-mllvm
                       --help' for a list of options.
  --save-temps         Save intermediate results
  --version            Display the version number and exit
  -v                   Print verbose information

[Example](#id4)[¶](#example "Link to this heading")
---------------------------------------------------

This tool is intended to be invoked when targeting the NVPTX toolchain directly as a cross-compiling target. This can be used to create standalone GPU executables with normal linking semantics similar to standard compilation.

clang --target=nvptx64-nvidia-cuda -march=native -flto=full input.c