---
title: "Clang SYCL Linker — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/ClangSYCLLinker.html"
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

This tool works as a wrapper around the SYCL device code linking process. The purpose of this tool is to provide an interface to link SYCL device bitcode in LLVM IR format, SYCL device bitcode in SPIR-V IR format, and native binary objects, and then use the SPIR-V LLVM Translator tool on fully linked device objects to produce the final output. After the linking stage, the fully linked device code in LLVM IR format may undergo several SYCL-specific finalization steps before the SPIR-V code generation step. The tool will also support the Ahead-Of-Time (AOT) compilation flow. AOT compilation is the process of invoking the back-end at compile time to produce the final binary, as opposed to just-in-time (JIT) compilation when final code generation is deferred until application runtime.

Device code linking for SYCL offloading has several known quirks that make it difficult to use in a unified offloading setting. Two of the primary issues are: 1. Several finalization steps are required to be run on the fully linked LLVM IR bitcode to guarantee conformance to SYCL standards. This step is unique to the SYCL offloading compilation flow. 2. The SPIR-V LLVM Translator tool is an external tool and hence SPIR-V IR code generation cannot be done as part of LTO. This limitation can be lifted once the SPIR-V backend is available as a viable LLVM backend.

This tool has been proposed to work around these issues.

[Usage](#id3)[¶](#usage "Link to this heading")
-----------------------------------------------

This tool can be used with the following options. Several of these options will be passed down to downstream tools like ‘llvm-link’, ‘llvm-spirv’, etc.

OVERVIEW: A utility that wraps around the SYCL device code linking process.
This enables linking and code generation for SPIR-V JIT targets and AOT
targets.

USAGE: clang-sycl-linker \[options\]

OPTIONS:
  --arch <value>                Specify the name of the target architecture.
  --dry-run                     Print generated commands without running.
  -g                            Specify that this was a debug compile.
  -help-hidden                  Display all available options
  -help                         Display available options (--help-hidden for more)
  --library-path=<dir>          Set the library path for SYCL device libraries
  --device-libs=<value>         A comma separated list of device libraries that are linked during the device link
  -o <path>                     Path to file to write output
  --save-temps                  Save intermediate results
  --triple <value>              Specify the target triple.
  --version                     Display the version number and exit
  -v                            Print verbose information
  -spirv-dump-device-code=<dir> Directory to dump SPIR-V IR code into
  -is-windows-msvc-env          Specify if we are compiling under windows environment
  -llvm-spirv-options=<value>   Pass options to llvm-spirv tool
  --llvm-spirv-path=<dir>       Set the system llvm-spirv path

[Example](#id4)[¶](#example "Link to this heading")
---------------------------------------------------

This tool is intended to be invoked when targeting any of the target offloading toolchains. When the –sycl-link option is passed to the clang driver, the driver will invoke the linking job of the target offloading toolchain, which in turn will invoke this tool. This tool can be used to create one or more fully linked device images that are ready to be wrapped and linked with host code to generate the final executable.

clang-sycl-linker --triple spirv64 --arch native input.bc