---
title: "Standard C++ Modules — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/StandardCPlusPlusModules.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
*   [Introduction](#introduction)
    
*   [Standard C++ Named modules](#standard-c-named-modules)
    
    *   [Background and terminology](#background-and-terminology)
        
        *   [Module and module unit](#module-and-module-unit)
            
        *   [Built Module Interface](#built-module-interface)
            
        *   [Global module fragment](#global-module-fragment)
            
    *   [How to build projects using modules](#how-to-build-projects-using-modules)
        
        *   [Quick Start](#quick-start)
            
        *   [How to enable standard C++ modules](#how-to-enable-standard-c-modules)
            
        *   [How to produce a BMI](#how-to-produce-a-bmi)
            
        *   [File name requirements](#file-name-requirements)
            
        *   [Module name requirements](#module-name-requirements)
            
        *   [Specifying BMI dependencies](#specifying-bmi-dependencies)
            
        *   [Remember that module units still have an object counterpart to the BMI](#remember-that-module-units-still-have-an-object-counterpart-to-the-bmi)
            
        *   [clang-cl](#clang-cl)
            
        *   [Consistency Requirements](#consistency-requirements)
            
            *   [Options consistency](#options-consistency)
                
            *   [Source Files Consistency](#source-files-consistency)
                
            *   [Object definition consistency](#object-definition-consistency)
                
    *   [Privacy Issue](#privacy-issue)
        
    *   [ABI Impacts](#abi-impacts)
        
        *   [Name Mangling](#name-mangling)
            
        *   [Module Initializers](#module-initializers)
            
    *   [Reduced BMI](#reduced-bmi)
        
    *   [Experimental Non-Cascading Changes](#experimental-non-cascading-changes)
        
        *   [Interactions with Reduced BMI](#interactions-with-reduced-bmi)
            
    *   [Performance Tips](#performance-tips)
        
        *   [Reduce duplications](#reduce-duplications)
            
    *   [Transitioning to modules](#transitioning-to-modules)
        
        *   [ABI non-breaking styles](#abi-non-breaking-styles)
            
            *   [export-using style](#export-using-style)
                
            *   [export extern-C++ style](#export-extern-c-style)
                
        *   [ABI breaking style](#abi-breaking-style)
            
            *   [What if there are headers only included by the source files](#what-if-there-are-headers-only-included-by-the-source-files)
                
        *   [Providing a header to skip parsing redundant headers](#providing-a-header-to-skip-parsing-redundant-headers)
            
        *   [Importing modules](#importing-modules)
            
            *   [All library dependencies providing modules](#all-library-dependencies-providing-modules)
                
            *   [Partial library dependencies providing modules](#partial-library-dependencies-providing-modules)
                
    *   [Reachability of internal partition units](#reachability-of-internal-partition-units)
        
    *   [Known Issues](#known-issues)
        
        *   [Including headers after import is not well-supported](#including-headers-after-import-is-not-well-supported)
            
        *   [Ignored `preferred_name` Attribute](#ignored-preferred-name-attribute)
            
        *   [Don’t emit macros about module declaration](#don-t-emit-macros-about-module-declaration)
            
        *   [Inconsistent filename suffix requirement for importable module units](#inconsistent-filename-suffix-requirement-for-importable-module-units)
            
        *   [Incorrect ODR violation diagnostics](#incorrect-odr-violation-diagnostics)
            
        *   [Using TU-local entity in other units](#using-tu-local-entity-in-other-units)
            
*   [Header Units](#header-units)
    
    *   [How to build projects using header units](#how-to-build-projects-using-header-units)
        
        *   [Quick Start](#id10)
            
        *   [How to produce BMIs](#how-to-produce-bmis)
            
        *   [How to specify BMI dependencies](#how-to-specify-bmi-dependencies)
            
        *   [Compiling a header unit to an object file](#compiling-a-header-unit-to-an-object-file)
            
        *   [Include translation](#include-translation)
            
    *   [Differences between Clang modules and header units](#differences-between-clang-modules-and-header-units)
        
*   [Discovering Dependencies](#discovering-dependencies)
    
    *   [Possible Issues: Failed to find system headers](#possible-issues-failed-to-find-system-headers)
        
*   [Import modules with clang-repl](#import-modules-with-clang-repl)
    
*   [Possible Questions](#possible-questions)
    
    *   [How modules speed up compilation](#how-modules-speed-up-compilation)
        
    *   [Interoperability with Clang Modules](#interoperability-with-clang-modules)
        

[Introduction](#id11)[¶](#introduction "Link to this heading")
--------------------------------------------------------------

The term `module` is ambiguous, as it is used to mean multiple things in Clang. For Clang users, a module may refer to an `Objective-C Module`, [Clang Module](https://clang.llvm.org/docs/Modules.html) (also called a `Clang Header Module`) or a `C++20 Module` (or a `Standard C++ Module`). The implementation of all these kinds of modules in Clang shares a lot of code, but from the perspective of users their semantics and command line interfaces are very different. This document is an introduction to the use of C++20 modules in Clang. In the remainder of this document, the term `module` will refer to Standard C++20 modules and the term `Clang module` will refer to the Clang Modules extension.

In terms of the C++ Standard, modules consist of two components: “Named Modules” or “Header Units”. This document covers both.

[Standard C++ Named modules](#id12)[¶](#standard-c-named-modules "Link to this heading")
----------------------------------------------------------------------------------------

In order to better understand the compiler’s behavior, it is helpful to understand some terms and definitions for readers who are not familiar with the C++ feature. This document is not a tutorial on C++; it only introduces necessary concepts to better understand use of modules in a project.

### [Background and terminology](#id13)[¶](#background-and-terminology "Link to this heading")

#### [Module and module unit](#id14)[¶](#module-and-module-unit "Link to this heading")

A module consists of one or more module units. A module unit is a special kind of translation unit. A module unit should almost always start with a module declaration. The syntax of the module declaration is:

\[export\] module module\_name\[:partition\_name\];

Terms enclosed in `[]` are optional. `module_name` and `partition_name` follow the rules for a C++ identifier, except that they may contain one or more period (`.`) characters. Note that a `.` in the name has no semantic meaning and does not imply any hierarchy.

In this document, module units are classified as:

*   Primary module interface unit
    
*   Module implementation unit
    
*   Module partition interface unit
    
*   Internal module partition unit
    

A primary module interface unit is a module unit whose module declaration is `export module module_name;` where `module_name` denotes the name of the module. A module should have one and only one primary module interface unit.

A module implementation unit is a module unit whose module declaration is `module module_name;`. Multiple module implementation units can be declared in the same module.

A module partition interface unit is a module unit whose module declaration is `export module module_name:partition_name;`. The `partition_name` should be unique within any given module.

An internal module partition unit is a module unit whose module declaration is `module module_name:partition_name;`. The `partition_name` should be unique within any given module.

In this document, we use the following terms:

*   A `module interface unit` refers to either a `primary module interface unit` or a `module partition interface unit`.
    
*   An `importable module unit` refers to either a `module interface unit` or an `internal module partition unit`.
    
*   A `module partition unit` refers to either a `module partition interface unit` or an `internal module partition unit`.
    

#### [Built Module Interface](#id15)[¶](#built-module-interface "Link to this heading")

A `Built Module Interface` (or `BMI`) is the precompiled result of an importable module unit.

#### [Global module fragment](#id16)[¶](#global-module-fragment "Link to this heading")

The `global module fragment` (or `GMF`) is the code between the `module;` and the module declaration within a module unit.

### [How to build projects using modules](#id17)[¶](#how-to-build-projects-using-modules "Link to this heading")

#### [Quick Start](#id18)[¶](#quick-start "Link to this heading")

Let’s see a “hello world” example that uses modules.

// Hello.cppm
module;
#include <iostream>
export module Hello;
export void hello() {
  std::cout << "Hello World!\\n";
}

// use.cpp
import Hello;
int main() {
  hello();
  return 0;
}

Then, on the command line, invoke Clang like:

$ clang++ \-std\=c++20 Hello.cppm \--precompile \-o Hello.pcm
$ clang++ \-std\=c++20 use.cpp \-fmodule-file\=Hello\=Hello.pcm Hello.pcm \-o Hello.out
$ ./Hello.out
Hello World!

In this example, we make and use a simple module `Hello` which contains only a primary module interface unit named `Hello.cppm`.

A more complex “hello world” example which uses the 4 kinds of module units is:

// M.cppm
export module M;
export import :interface\_part;
import :impl\_part;
export void Hello();

// interface\_part.cppm
export module M:interface\_part;
export void World();

// impl\_part.cppm
module;
#include <iostream>
#include <string>
module M:impl\_part;
import :interface\_part;

std::string W \= "World.";
void World() {
  std::cout << W << std::endl;
}

// Impl.cpp
module;
#include <iostream>
module M;
void Hello() {
  std::cout << "Hello ";
}

// User.cpp
import M;
int main() {
  Hello();
  World();
  return 0;
}

Then, back on the command line, invoke Clang with:

\# Precompiling the module
$ clang++ \-std\=c++20 interface\_part.cppm \--precompile \-o M-interface\_part.pcm
$ clang++ \-std\=c++20 impl\_part.cppm \--precompile \-fprebuilt-module-path\=. \-o M-impl\_part.pcm
$ clang++ \-std\=c++20 M.cppm \--precompile \-fprebuilt-module-path\=. \-o M.pcm
$ clang++ \-std\=c++20 Impl.cpp \-fprebuilt-module-path\=. \-c \-o Impl.o

\# Compiling the user
$ clang++ \-std\=c++20 User.cpp \-fprebuilt-module-path\=. \-c \-o User.o

\# Compiling the module and linking it together
$ clang++ \-std\=c++20 M-interface\_part.pcm \-fprebuilt-module-path\=. \-c \-o M-interface\_part.o
$ clang++ \-std\=c++20 M-impl\_part.pcm \-fprebuilt-module-path\=. \-c \-o M-impl\_part.o
$ clang++ \-std\=c++20 M.pcm \-fprebuilt-module-path\=. \-c \-o M.o
$ clang++ User.o M-interface\_part.o  M-impl\_part.o M.o Impl.o \-o a.out

We explain the options in the following sections.

#### [How to enable standard C++ modules](#id19)[¶](#how-to-enable-standard-c-modules "Link to this heading")

Standard C++ modules are enabled automatically when the language standard mode is `-std=c++20` or newer.

#### [How to produce a BMI](#id20)[¶](#how-to-produce-a-bmi "Link to this heading")

To generate a BMI for an importable module unit, use either the `--precompile` or `-fmodule-output` command line options.

The `--precompile` option generates the BMI as the output of the compilation with the output path specified using the `-o` option.

The `-fmodule-output` option generates the BMI as a by-product of the compilation. If `-fmodule-output=` is specified, the BMI will be emitted to the specified location. If `-fmodule-output` and `-c` are specified, the BMI will be emitted in the directory of the output file with the name of the input file with the extension `.pcm`. Otherwise, the BMI will be emitted in the working directory with the name of the input file with the extension `.pcm`.

Generating BMIs with `--precompile` is referred to as two-phase compilation because it takes two steps to compile a source file to an object file. Generating BMIs with `-fmodule-output` is called one-phase compilation. The one-phase compilation model is simpler for build systems to implement while the two-phase compilation has the potential to compile faster due to higher parallelism. As an example, if there are two module units `A` and `B`, and `B` depends on `A`, the one-phase compilation model needs to compile them serially, whereas the two-phase compilation model can be compiled as soon as `A.pcm` is available, and thus can be compiled simultaneously with the `A.pcm` to `A.o` compilation step.

#### [File name requirements](#id21)[¶](#file-name-requirements "Link to this heading")

By convention, `importable module unit` files should use `.cppm` (or `.ccm`, `.cxxm`, or `.c++m`) as a file extension. `Module implementation unit` files should use `.cpp` (or `.cc`, `.cxx`, or `.c++`) as a file extension.

A BMI should use `.pcm` as a file extension. The file name of the BMI for a `primary module interface unit` should be `module_name.pcm`. The file name of a BMI for a `module partition unit` should be `module_name-partition_name.pcm`.

Clang may fail to build the module if different extensions are used. For example, if the filename of an `importable module unit` ends with `.cpp` instead of `.cppm`, then Clang cannot generate a BMI for the `importable module unit` with the `--precompile` option because the `--precompile` option would only run the preprocessor (`-E`). If using a different extension than the conventional one for an `importable module unit` you can specify `-x c++-module` before the file. For example,

// Hello.cpp
module;
#include <iostream>
export module Hello;
export void hello() {
  std::cout << "Hello World!\\n";
}

// use.cpp
import Hello;
int main() {
  hello();
  return 0;
}

In this example, the extension used by the `module interface` is `.cpp` instead of `.cppm`, so it cannot be compiled like the previous example, but it can be compiled with:

$ clang++ \-std\=c++20 \-x c++-module Hello.cpp \--precompile \-o Hello.pcm
$ clang++ \-std\=c++20 use.cpp \-fprebuilt-module-path\=. Hello.pcm \-o Hello.out
$ ./Hello.out
Hello World!

#### [Module name requirements](#id22)[¶](#module-name-requirements "Link to this heading")

> \[module.unit\]p1:
> 
> All module-names either beginning with an identifier consisting of std followed by zero or more digits or containing a reserved identifier (\[lex.name\]) are reserved and shall not be specified in a module-declaration; no diagnostic is required. If any identifier in a reserved module-name is a reserved identifier, the module name is reserved for use by C++ implementations; otherwise it is reserved for future standardization.

Therefore, none of the following names are valid by default:

std
std1
std.foo
\_\_test
// and so on ...

Using a reserved module name is strongly discouraged, but `-Wno-reserved-module-identifier` can be used to suppress the warning.

#### [Specifying BMI dependencies](#id23)[¶](#specifying-bmi-dependencies "Link to this heading")

There are 3 ways to specify a BMI dependency:

1.  `-fprebuilt-module-path=<path/to/directory>`.
    
2.  `-fmodule-file=<path/to/BMI>` (Deprecated).
    
3.  `-fmodule-file=<module-name>=<path/to/BMI>`.
    

The `-fprebuilt-module-path` option specifies the path to search for BMI dependencies. Multiple paths may be specified, similar to using `-I` to specify a search path for header files. When importing a module `M`, the compiler looks for `M.pcm` in the directories specified by `-fprebuilt-module-path`. Similarly, when importing a partition module unit `M:P`, the compiler looks for `M-P.pcm` in the directories specified by `-fprebuilt-module-path`.

The `-fmodule-file=<path/to/BMI>` option causes the compiler to load the specified BMI directly. The `-fmodule-file=<module-name>=<path/to/BMI>` option causes the compiler to load the specified BMI for the module specified by `<module-name>` when necessary. The main difference is that `-fmodule-file=<path/to/BMI>` will load the BMI eagerly, whereas `-fmodule-file=<module-name>=<path/to/BMI>` will only load the BMI lazily, as will `-fprebuilt-module-path`. The `-fmodule-file=<path/to/BMI>` option for named modules is deprecated and will be removed in a future version of Clang.

When these options are specified in the same invocation of the compiler, the `-fmodule-file=<path/to/BMI>` option takes precedence over `-fmodule-file=<module-name>=<path/to/BMI>`, which takes precedence over `-fprebuilt-module-path=<path/to/directory>`.

Note: all BMI dependencies must be specified explicitly, either directly or indirectly. See [https://github.com/llvm/llvm-project/issues/62707](https://github.com/llvm/llvm-project/issues/62707) for details.

When compiling a `module implementation unit`, the BMI of the corresponding `primary module interface unit` must be specified because a module implementation unit implicitly imports the primary module interface unit.

> \[module.unit\]p8
> 
> A module-declaration that contains neither an export-keyword nor a module-partition implicitly imports the primary module interface unit of the module as if by a module-import-declaration.

The `-fprebuilt-module-path=<path/to/directory>`, `-fmodule-file=<path/to/BMI>`, and `-fmodule-file=<module-name>=<path/to/BMI>` options may be specified multiple times. For example, the command line to compile `M.cppm` in the previous example could be rewritten as:

$ clang++ \-std\=c++20 M.cppm \--precompile \-fmodule-file\=M:interface\_part\=M-interface\_part.pcm \-fmodule-file\=M:impl\_part\=M-impl\_part.pcm \-o M.pcm

When there are multiple `-fmodule-file=<module-name>=` options for the same `<module-name>`, the last `-fmodule-file=<module-name>=` overrides the previous `-fmodule-file=<module-name>=` option.

#### [Remember that module units still have an object counterpart to the BMI](#id24)[¶](#remember-that-module-units-still-have-an-object-counterpart-to-the-bmi "Link to this heading")

While module interfaces resemble traditional header files, they still require compilation. Module units are translation units, and need to be compiled to object files, which then need to be linked together as the following examples show.

For example, the traditional compilation processes for headers are like:

src1.cpp -+> clang++ src1.cpp --> src1.o ---,
hdr1.h  --'                                 +-> clang++ src1.o src2.o ->  executable
hdr2.h  --,                                 |
src2.cpp -+> clang++ src2.cpp --> src2.o ---'

And the compilation processes for module units are like:

              src1.cpp ----------------------------------------+> clang++ src1.cpp -------> src1.o -,
(header unit) hdr1.h    -> clang++ hdr1.h ...    -> hdr1.pcm --'                                    +-> clang++ src1.o mod1.o src2.o ->  executable
              mod1.cppm -> clang++ mod1.cppm ... -> mod1.pcm --,--> clang++ mod1.pcm ... -> mod1.o -+
              src2.cpp ----------------------------------------+> clang++ src2.cpp -------> src2.o -'

As the diagrams show, we need to compile the BMI from module units to object files and then link the object files. (However, this cannot be done for the BMI from header units. See the section on [header units](#header-units) for more details.)

BMIs cannot be shipped in an archive to create a module library. Instead, the BMIs(`*.pcm`) are compiled into object files(`*.o`) and those object files are added to the archive instead.

#### [clang-cl](#id25)[¶](#clang-cl "Link to this heading")

`clang-cl` supports the same options as `clang++` for modules as detailed above; there is no need to prefix these options with `/clang:`. Note that `cl.exe` options to emit/consume IFC files <https://devblogs.microsoft.com/cppblog/using-cpp-modules-in-msvc-from-the-command-line-part-1/> are _not_ supported. The resulting precompiled modules are also not compatible for use with `cl.exe`.

We recommend that build system authors use the above-mentioned `clang++` options with `clang-cl` to build modules.

#### [Consistency Requirements](#id26)[¶](#consistency-requirements "Link to this heading")

Modules can be viewed as a kind of cache to speed up compilation. Thus, like other caching techniques, it is important to maintain cache consistency, which is why Clang does very strict checking for consistency.

##### [Options consistency](#id27)[¶](#options-consistency "Link to this heading")

Compiler options related to the language dialect for a module unit and its non-module-unit uses need to be consistent. Consider the following example:

// M.cppm
export module M;

// Use.cpp
import M;

$ clang++ \-std\=c++20 M.cppm \--precompile \-o M.pcm
$ clang++ \-std\=c++23 Use.cpp \-fprebuilt-module-path\=.

Clang rejects the example due to the inconsistent language standard modes. Not all compiler options are language-dialect options, though. For example:

$ clang++ \-std\=c++20 M.cppm \--precompile \-o M.pcm
\# Inconsistent optimization level.
$ clang++ \-std\=c++20 \-O3 Use.cpp \-fprebuilt-module-path\=.
\# Inconsistent debugging level.
$ clang++ \-std\=c++20 \-g Use.cpp \-fprebuilt-module-path\=.

Although the optimization and debugging levels are inconsistent, these compilations are accepted because the compiler options do not impact the language dialect.

Note that the compiler **currently** doesn’t reject inconsistent macro definitions (this may change in the future). For example:

$ clang++ \-std\=c++20 M.cppm \--precompile \-o M.pcm
\# Inconsistent optimization level.
$ clang++ \-std\=c++20 \-O3 \-DNDEBUG Use.cpp \-fprebuilt-module-path\=.

Currently, Clang accepts the above example, though it may produce surprising results if the debugging code depends on consistent use of `NDEBUG` in other translation units.

##### [Source Files Consistency](#id28)[¶](#source-files-consistency "Link to this heading")

Clang may open the input files [\[1\]](#id2) of a BMI during the compilation. This implies that when Clang consumes a BMI, all the input files need to be present in the original path and with the original contents.

To overcome these requirements and simplify cases like distributed builds and sandboxed builds, users can use the `-fmodules-embed-all-files` flag to embed all input files into the BMI so that Clang does not need to open the corresponding file on disk.

When the `-fmodules-embed-all-files` flag is enabled, Clang explicitly emits the source code into the BMI file; the BMI file contains a sufficiently verbose representation to reproduce the original source file.

##### [Object definition consistency](#id29)[¶](#object-definition-consistency "Link to this heading")

The C++ language requires that declarations of the same entity in different translation units have the same definition, which is known as the One Definition Rule (ODR). Without modules, the compiler cannot perform strong ODR violation checking because it only sees one translation unit at a time. With the use of modules, the compiler can perform checks for ODR violations across translation units.

However, the current ODR checking mechanisms are not perfect. There are a significant number of false positive ODR violation diagnostics, where the compiler incorrectly diagnoses two identical declarations as having different definitions. Further, true positive ODR violations are not always reported.

To give a better user experience, improve compilation performance, and for consistency with MSVC, ODR checking of declarations in the global module fragment is disabled by default. These checks can be enabled by specifying `-Xclang -fno-skip-odr-check-in-gmf` when compiling. If the check is enabled and you encounter incorrect or missing diagnostics, please report them via the [community issue tracker](https://github.com/llvm/llvm-project/issues/).

### [Privacy Issue](#id30)[¶](#privacy-issue "Link to this heading")

BMIs are not and should not be treated as an information hiding mechanism. They should always be assumed to contain all the information that was used to create them, in a recoverable form.

### [ABI Impacts](#id31)[¶](#abi-impacts "Link to this heading")

This section describes the new ABI changes brought by modules. Only changes to the Itanium C++ ABI are covered.

#### [Name Mangling](#id32)[¶](#name-mangling "Link to this heading")

The declarations in a module unit which are not in the global module fragment have new linkage names.

For example,

export module M;
namespace NS {
  export int foo();
}

The linkage name of `NS::foo()` is `_ZN2NSW1M3fooEv`. This couldn’t be demangled by previous versions of the debugger or demangler. As of LLVM 15.x, `llvm-cxxfilt` can be used to demangle this:

$ llvm-cxxfilt \_ZN2NSW1M3fooEv
  NS::foo@M()

The result should be read as `NS::foo()` in module `M`.

The ABI implies that something cannot be declared in a module unit and defined in a non-module unit (or vice-versa), as this would result in linking errors.

Despite this, it is possible to implement declarations with a compatible ABI in a module unit by using a language linkage specifier because the declarations in the language linkage specifier are attached to the global module fragment. For example:

export module M;
namespace NS {
  export extern "C++" int foo();
}

Now the linkage name of `NS::foo()` will be `_ZN2NS3fooEv`.

#### [Module Initializers](#id33)[¶](#module-initializers "Link to this heading")

All importable module units are required to emit an initializer function to handle the dynamic initialization of non-inline variables in the module unit. The importable module unit has to emit the initializer even if there is no dynamic initialization; otherwise, the importer may call a nonexistent function. The initializer function emits calls to imported modules first followed by calls to all of the dynamic initializers in the current module unit.

Translation units that explicitly or implicitly import a named module must call the initializer functions of the imported named module within the sequence of the dynamic initializers in the translation unit. Initializations of entities at namespace scope are appearance-ordered. This (recursively) extends to imported modules at the point of appearance of the import declaration.

If the imported module is known to be empty, the call to its initializer may be omitted. Additionally, if the imported module is known to have already been imported, the call to its initializer may be omitted.

### [Reduced BMI](#id34)[¶](#reduced-bmi "Link to this heading")

To support the two-phase compilation model, Clang puts everything needed to produce an object into the BMI. However, other consumers of the BMI generally don’t need that information. This makes the BMI larger and may introduce unnecessary dependencies for the BMI. To mitigate the problem, Clang has a compiler option to reduce the information contained in the BMI. These two formats are known as Full BMI and Reduced BMI, respectively.

Users can use the `-fmodules-reduced-bmi` option to produce a Reduced BMI.

For the one-phase compilation model (CMake implements this model), with `-fmodules-reduced-bmi`, the generated BMI will be a Reduced BMI automatically. (The output path of the BMI is specified by `-fmodule-output=` as usual with the one-phase compilation model).

It is also possible to produce a Reduced BMI with the two-phase compilation model. When `-fmodules-reduced-bmi`, `--precompile`, and `-fmodule-output=` are specified, the generated BMI specified by `-o` will be a full BMI and the BMI specified by `-fmodule-output=` will be a Reduced BMI. The dependency graph in this case would look like:

module-unit.cppm --> module-unit.full.pcm -> module-unit.o
                  |
                  -> module-unit.reduced.pcm -> consumer1.cpp
                                             -> consumer2.cpp
                                             -> ...
                                             -> consumer\_n.cpp

Clang does not emit diagnostics when `-fmodules-reduced-bmi` is used with a non-module unit. This design permits users of the one-phase compilation model to try using reduced BMIs without needing to modify the build system. The two-phase compilation module requires build system support.

In a Reduced BMI, Clang does not emit unreachable entities from the global module fragment, or definitions of non-inline functions and non-inline variables. This may not be a transparent change.

Consider the following example:

// foo.h
namespace N {
  struct X {};
  int d();
  int e();
  inline int f(X, int \= d()) { return e(); }
  int g(X);
  int h(X);
}

// M.cppm
module;
#include "foo.h"
export module M;
template<typename T\> int use\_f() {
  N::X x;                       // N::X, N, and :: are decl-reachable from use\_f
  return f(x, 123);             // N::f is decl-reachable from use\_f,
                                // N::e is indirectly decl-reachable from use\_f
                                //   because it is decl-reachable from N::f, and
                                // N::d is decl-reachable from use\_f
                                //   because it is decl-reachable from N::f
                                //   even though it is not used in this call
}
template<typename T\> int use\_g() {
  N::X x;                       // N::X, N, and :: are decl-reachable from use\_g
  return g((T(), x));           // N::g is not decl-reachable from use\_g
}
template<typename T\> int use\_h() {
  N::X x;                       // N::X, N, and :: are decl-reachable from use\_h
  return h((T(), x));           // N::h is not decl-reachable from use\_h, but
                                // N::h is decl-reachable from use\_h<int>
}
int k \= use\_h<int\>();
  // use\_h<int> is decl-reachable from k, so
  // N::h is decl-reachable from k

// M-impl.cpp
module M;
int a \= use\_f<int\>();           // OK
int b \= use\_g<int\>();           // error: no viable function for call to g;
                                // g is not decl-reachable from purview of
                                // module M's interface, so is discarded
int c \= use\_h<int\>();           // OK

In the above example, the function definition of `N::g` is elided from the Reduced BMI of `M.cppm`. Then the use of `use_g<int>` in `M-impl.cpp` fails to instantiate. For such issues, users can add references to `N::g` in the [module purview](https://eel.is/c++draft/module.unit#5) of `M.cppm` to ensure it is reachable, e.g. `using N::g;`.

As of Clang 22.x, the Reduced BMI is enabled by default. You may still want to use Full BMI with `-fno-modules-reduced-bmi` in the following case: 1. Your build system uses two-phase compilation, but it hasn’t adjusted the implementation for reduced BMI. 2. You encounter a regression with Reduced BMI that you cannot work around. Please report an issue for this case.

### [Experimental Non-Cascading Changes](#id35)[¶](#experimental-non-cascading-changes "Link to this heading")

This section is primarily for build system vendors. For end compiler users, if you don’t want to read it all, this is helpful to reduce recompilations. We encourage build system vendors and end users to try this out and bring feedback.

Before Clang 19, a change in BMI of any (transitive) dependency would cause the outputs of the BMI to change. Starting with Clang 19, changes to non-direct dependencies should not directly affect the output BMI, unless they affect the results of the compilations. We expect that there are many more opportunities for this optimization than we currently have realized and would appreciate feedback about missed optimization opportunities. For example,

// m-partA.cppm
export module m:partA;

// m-partB.cppm
export module m:partB;
export int getB() { return 44; }

// m.cppm
export module m;
export import :partA;
export import :partB;

// useBOnly.cppm
export module useBOnly;
import m;
export int B() {
  return getB();
}

// Use.cc
import useBOnly;
int get() {
  return B();
}

To compile the project (for brevity, some commands are omitted.):

$ clang++ \-std\=c++20 m-partA.cppm \--precompile \-o m-partA.pcm
$ clang++ \-std\=c++20 m-partB.cppm \--precompile \-o m-partB.pcm
$ clang++ \-std\=c++20 m.cppm \--precompile \-o m.pcm \-fprebuilt-module-path\=.
$ clang++ \-std\=c++20 useBOnly.cppm \--precompile \-o useBOnly.pcm \-fprebuilt-module-path\=.
$ md5sum useBOnly.pcm
07656bf4a6908626795729295f9608da  useBOnly.pcm

If the interface of `m-partA.cppm` is changed to:

// m-partA.v1.cppm
export module m:partA;
export int getA() { return 43; }

and the BMI for `useBOnly` is recompiled as in:

$ clang++ \-std\=c++20 m-partA.cppm \--precompile \-o m-partA.pcm
$ clang++ \-std\=c++20 m-partB.cppm \--precompile \-o m-partB.pcm
$ clang++ \-std\=c++20 m.cppm \--precompile \-o m.pcm \-fprebuilt-module-path\=.
$ clang++ \-std\=c++20 useBOnly.cppm \--precompile \-o useBOnly.pcm \-fprebuilt-module-path\=.
$ md5sum useBOnly.pcm
07656bf4a6908626795729295f9608da  useBOnly.pcm

then the contents of `useBOnly.pcm` remain unchanged. Consequently, if the build system only bases recompilation decisions on directly imported modules, it becomes possible to skip the recompilation of `Use.cc`. It should be fine because the altered interfaces do not affect `Use.cc` in any way; the changes do not cascade.

When `Clang` generates a BMI, it records the hash values of all potentially contributory BMIs for the BMI being produced. This ensures that build systems are not required to consider transitively imported modules when deciding whether to recompile.

What is considered to be a potential contributory BMIs is currently unspecified. However, it is a severe bug for a BMI to remain unchanged following an observable change in the module source files that affects the module consumers.

Build systems may utilize this optimization by doing an update-if-changed operation to the BMI that is consumed from the BMI that is output by the compiler.

We encourage build systems to add an experimental mode that reuses the cached BMI when **direct** dependencies did not change, even if **transitive** dependencies did change.

Given that there are potential compiler bugs, we recommend that build systems support this feature as a configurable option so that users can go back to the transitive change mode safely at any time.

#### [Interactions with Reduced BMI](#id36)[¶](#interactions-with-reduced-bmi "Link to this heading")

With reduced BMI, non-cascading changes can be more powerful. For example,

// A.cppm
export module A;
export int a() { return 44; }

// B.cppm
export module B;
import A;
export int b() { return a(); }

$ clang++ \-std\=c++20 A.cppm \-c \-fmodule-output\=A.pcm  \-fmodules-reduced-bmi \-o A.o
$ clang++ \-std\=c++20 B.cppm \-c \-fmodule-output\=B.pcm  \-fmodules-reduced-bmi \-o B.o \-fmodule-file\=A\=A.pcm
$ md5sum B.pcm
6c2bd452ca32ab418bf35cd141b060b9  B.pcm

And let’s change the implementation for `A.cppm` to:

export module A;
int a\_impl() { return 99; }
export int a() { return a\_impl(); }

and recompile the example:

$ clang++ \-std\=c++20 A.cppm \-c \-fmodule-output\=A.pcm  \-fmodules-reduced-bmi \-o A.o
$ clang++ \-std\=c++20 B.cppm \-c \-fmodule-output\=B.pcm  \-fmodules-reduced-bmi \-o B.o \-fmodule-file\=A\=A.pcm
$ md5sum B.pcm
6c2bd452ca32ab418bf35cd141b060b9  B.pcm

We should find the contents of `B.pcm` remain the same. In this case, the build system is allowed to skip recompilations of TUs which solely and directly depend on module `B`.

This only happens with a reduced BMI. With reduced BMIs, we won’t record the function body of `int b()` in the BMI for `B` so that the module `A` doesn’t contribute to the BMI of `B` and we have less dependencies.

### [Performance Tips](#id37)[¶](#performance-tips "Link to this heading")

#### [Reduce duplications](#id38)[¶](#reduce-duplications "Link to this heading")

While it is valid to have duplicated declarations in the global module fragments of different module units, it is not free for Clang to deal with the duplicated declarations. A translation unit will compile more slowly if there are a lot of duplicated declarations between the translation unit and modules it imports. For example:

// M-partA.cppm
module;
#include "big.header.h"
export module M:partA;
...

// M-partB.cppm
module;
#include "big.header.h"
export module M:partB;
...

// other partitions
...

// M-partZ.cppm
module;
#include "big.header.h"
export module M:partZ;
...

// M.cppm
export module M;
export import :partA;
export import :partB;
...
export import :partZ;

// use.cpp
import M;
... // use declarations from module M.

When `big.header.h` is big enough and there are a lot of partitions, the compilation of `use.cpp` may be significantly slower than the following approach:

module;
#include "big.header.h"
export module m:big.header.wrapper;
export ... // export the needed declarations

// M-partA.cppm
export module M:partA;
import :big.header.wrapper;
...

// M-partB.cppm
export module M:partB;
import :big.header.wrapper;
...

// other partitions
...

// M-partZ.cppm
export module M:partZ;
import :big.header.wrapper;
...

// M.cppm
export module M;
export import :partA;
export import :partB;
...
export import :partZ;

// use.cpp
import M;
... // use declarations from module M.

Reducing the duplication from textual includes is what improves compile-time performance.

To help users to identify such issues, we add a warning `-Wdecls-in-multiple-modules`. This warning is disabled by default and it needs to be explicitly enabled or by `-Weverything`.

### [Transitioning to modules](#id39)[¶](#transitioning-to-modules "Link to this heading")

It is best for new code and libraries to use modules from the start if possible. However, it may be a breaking change for existing code or libraries to switch to modules. As a result, many existing libraries need to provide both headers and module interfaces for a while to not break existing users.

This section provides some suggestions on how to ease the transition process for existing libraries. **Note that this information is only intended as guidance, rather than as requirements to use modules in Clang.** It presumes the project is starting with no module-based dependencies.

#### [ABI non-breaking styles](#id40)[¶](#abi-non-breaking-styles "Link to this heading")

##### [export-using style](#id41)[¶](#export-using-style "Link to this heading")

module;
#include "header\_1.h"
#include "header\_2.h"
...
#include "header\_n.h"
export module your\_library;
export namespace your\_namespace {
  using decl\_1;
  using decl\_2;
  ...
  using decl\_n;
}

This example shows how to include all the headers containing declarations which need to be exported, and uses using declarations in an export block to produce the module interface.

##### [export extern-C++ style](#id42)[¶](#export-extern-c-style "Link to this heading")

module;
#include "third\_party/A/headers.h"
#include "third\_party/B/headers.h"
...
#include "third\_party/Z/headers.h"
export module your\_library;
#define IN\_MODULE\_INTERFACE
extern "C++" {
  #include "header\_1.h"
  #include "header\_2.h"
  ...
  #include "header\_n.h"
}

Headers (from `header_1.h` to `header_n.h`) need to define the macro:

#ifdef IN\_MODULE\_INTERFACE
#define EXPORT export
#else
#define EXPORT
#endif

and put `EXPORT` on the declarations you want to export.

Also, it is recommended to refactor headers to include third-party headers conditionally:

#ifndef IN\_MODULE\_INTERFACE
#include "third\_party/A/headers.h"
#endif

#include "header\_x.h"

...

This can be helpful because it gives better diagnostic messages if the module interface unit is not properly updated when modifying code.

This approach works because the declarations with language linkage are attached to the global module. Thus, the ABI of the modular form of the library does not change.

While this style is more involved than the export-using style, it makes it easier to further refactor the library to other styles.

#### [ABI breaking style](#id43)[¶](#abi-breaking-style "Link to this heading")

The term `ABI breaking` may sound like a bad approach. However, this style forces consumers of the library use it in a consistent way. e.g., either always include headers for the library or always import modules. The style prevents the ability to mix includes and imports for the library.

The pattern for ABI breaking style is similar to the export extern-C++ style.

module;
#include "third\_party/A/headers.h"
#include "third\_party/B/headers.h"
...
#include "third\_party/Z/headers.h"
export module your\_library;
#define IN\_MODULE\_INTERFACE
#include "header\_1.h"
#include "header\_2.h"
...
#include "header\_n.h"

#if the number of .cpp files in your project are small
module :private;
#include "source\_1.cpp"
#include "source\_2.cpp"
...
#include "source\_n.cpp"
#else // the number of .cpp files in your project are a lot
// Using all the declarations from third-party libraries which are
// used in the .cpp files.
namespace third\_party\_namespace {
  using third\_party\_decl\_used\_in\_cpp\_1;
  using third\_party\_decl\_used\_in\_cpp\_2;
  ...
  using third\_party\_decl\_used\_in\_cpp\_n;
}
#endif

(And add EXPORT and conditional include to the headers as suggested in the export extern-C++ style section.)

The ABI with modules is different and thus we need to compile the source files into the new ABI. This is done by an additional part of the interface unit:

#if the number of .cpp files in your project are small
module :private;
#include "source\_1.cpp"
#include "source\_2.cpp"
...
#include "source\_n.cpp"
#else // the number of .cpp files in your project are a lot
// Using all the declarations from third-party libraries which are
// used in the .cpp files.
namespace third\_party\_namespace {
  using third\_party\_decl\_used\_in\_cpp\_1;
  using third\_party\_decl\_used\_in\_cpp\_2;
  ...
  using third\_party\_decl\_used\_in\_cpp\_n;
}
#endif

If the number of source files is small, everything can be put in the private module fragment directly (it is recommended to add conditional includes to the source files as well). However, compile time performance will be bad if there are a lot of source files to compile.

**Note that the private module fragment can only be in the primary module interface unit and the primary module interface unit containing the private module fragment should be the only module unit of the corresponding module.**

In this case, source files (.cpp files) must be converted to module implementation units:

#ifndef IN\_MODULE\_INTERFACE
// List all the includes here.
#include "third\_party/A/headers.h"
...
#include "header.h"
#endif

module your\_library;

// Following off should be unchanged.
...

The module implementation unit will import the primary module implicitly. Do not include any headers in the module implementation units as it avoids duplicated declarations between translation units. This is why non-exported using declarations should be added from third-party libraries in the primary module interface unit.

If the library is provided as `libyour_library.so`, a modular library (e.g., `libyour_library_modules.so`) may also need to be provided for ABI compatibility.

#### [Importing modules](#id46)[¶](#importing-modules "Link to this heading")

When there are library dependencies providing modules, the module dependencies should be imported in your module as well. Many existing libraries will fall into this category once the `std` module is more widely available.

##### [All library dependencies providing modules](#id47)[¶](#all-library-dependencies-providing-modules "Link to this heading")

Of course, most of the complexity disappears if all the library dependencies provide modules.

Headers need to be converted to include third-party headers conditionally. Then, for the export-using style:

module;
import modules\_from\_third\_party;
#define IN\_MODULE\_INTERFACE
#include "header\_1.h"
#include "header\_2.h"
...
#include "header\_n.h"
export module your\_library;
export namespace your\_namespace {
  using decl\_1;
  using decl\_2;
  ...
  using decl\_n;
}

or, for the export extern-C++ style:

export module your\_library;
import modules\_from\_third\_party;
#define IN\_MODULE\_INTERFACE
extern "C++" {
  #include "header\_1.h"
  #include "header\_2.h"
  ...
  #include "header\_n.h"
}

or, for the ABI-breaking style,

export module your\_library;
import modules\_from\_third\_party;
#define IN\_MODULE\_INTERFACE
#include "header\_1.h"
#include "header\_2.h"
...
#include "header\_n.h"

#if the number of .cpp files in your project are small
module :private;
#include "source\_1.cpp"
#include "source\_2.cpp"
...
#include "source\_n.cpp"
#endif

Non-exported `using` declarations are unnecessary if using implementation module units. Instead, third-party modules can be imported directly in implementation module units.

##### [Partial library dependencies providing modules](#id48)[¶](#partial-library-dependencies-providing-modules "Link to this heading")

If the library has to mix the use of `include` and `import` in its module, the primary goal is still the removal of duplicated declarations in translation units as much as possible. If the imported modules provide headers to skip parsing their headers, those should be included after the import. If the imported modules don’t provide such a header, one can be made manually for improved compile time performance.

### [Reachability of internal partition units](#id49)[¶](#reachability-of-internal-partition-units "Link to this heading")

The internal partition units are sometimes called implementation partition units in other documentation. However, the name may be confusing since implementation partition units are not implementation units.

According to [\[module.reach\]p1](https://eel.is/c++draft/module.reach#1) and [\[module.reach\]p2](https://eel.is/c++draft/module.reach#2) (from N4986):

> A translation unit U is necessarily reachable from a point P if U is a module interface unit on which the translation unit containing P has an interface dependency, or the translation unit containing P imports U, in either case prior to P.
> 
> All translation units that are necessarily reachable are reachable. Additional translation units on which the point within the program has an interface dependency may be considered reachable, but it is unspecified which are and under what circumstances.

For example,

// a.cpp
import B;
int main()
{
    g<void\>();
}

// b.cppm
export module B;
import :C;
export template <typename T\> inline void g() noexcept
{
    return f<T\>();
}

// c.cppm
module B:C;
template<typename\> inline void f() noexcept {}

The internal partition unit `c.cppm` is not necessarily reachable by `a.cpp` because `c.cppm` is not a module interface unit and `a.cpp` doesn’t import `c.cppm`. This leaves it up to the compiler to decide if `c.cppm` is reachable by `a.cpp` or not. Clang’s behavior is that indirectly imported internal partition units are not reachable.

The suggested approach for using an internal partition unit in Clang is to only import them in the implementation unit.

### [Known Issues](#id50)[¶](#known-issues "Link to this heading")

The following describes issues in the current implementation of modules. Please see [the issues list for modules](https://github.com/llvm/llvm-project/labels/clang%3Amodules) for a list of issues or to file a new issue if you don’t find an existing one. When creating a new issue for standard C++ modules, please start the title with `[C++20] [Modules]` (or `[C++23] [Modules]`, etc) and add the label `clang:modules` if possible.

A high-level overview of support for standards features, including modules, can be found on the [C++ Feature Status](https://clang.llvm.org/cxx_status.html) page.

#### [Ignored `preferred_name` Attribute](#id52)[¶](#ignored-preferred-name-attribute "Link to this heading")

When Clang writes BMIs, it will ignore the `preferred_name` attribute on declarations which use it. Thus, the preferred name will not be displayed in the debugger as expected. This is tracked by [#56490](https://github.com/llvm/llvm-project/issues/56490).

#### [Don’t emit macros about module declaration](#id53)[¶](#don-t-emit-macros-about-module-declaration "Link to this heading")

This is covered by [P1857R3](https://wg21.link/P1857R3). It is mentioned here because we want users to be aware that we don’t yet implement it.

A direct approach to write code that can be compiled by both modules and non-module builds may look like:

MODULE
IMPORT header\_name
EXPORT\_MODULE MODULE\_NAME;
IMPORT header\_name
EXPORT ...

The intent of this is that this file can be compiled like a module unit or a non-module unit depending on the definition of some macros. However, this usage is forbidden by P1857R3 which is not yet implemented in Clang. This means that is possible to write invalid modules which will no longer be accepted once P1857R3 is implemented. This is tracked by [#54047](https://github.com/llvm/llvm-project/issues/54047).

Until then, it is recommended not to mix macros with module declarations.

#### [Inconsistent filename suffix requirement for importable module units](#id54)[¶](#inconsistent-filename-suffix-requirement-for-importable-module-units "Link to this heading")

Currently, Clang requires the file name of an `importable module unit` to have `.cppm` (or `.ccm`, `.cxxm`, `.c++m`) as the file extension. However, the behavior is inconsistent with other compilers. This is tracked by [#57416](https://github.com/llvm/llvm-project/issues/57416).

#### [Incorrect ODR violation diagnostics](#id55)[¶](#incorrect-odr-violation-diagnostics "Link to this heading")

ODR violations are a common issue when using modules. Clang sometimes produces false-positive diagnostics or fails to produce true-positive diagnostics of the One Definition Rule. One often-reported example is:

// part.cc
module;
typedef long T;
namespace ns {
inline void fun() {
    (void)(T)0;
}
}
export module repro:part;

// repro.cc
module;
typedef long T;
namespace ns {
    using ::T;
}
namespace ns {
inline void fun() {
    (void)(T)0;
}
}
export module repro;
export import :part;

Currently the compiler incorrectly diagnoses the inconsistent definition of `fun()` in two module units. Because both definitions of `fun()` have the same spelling and `T` refers to the same type entity, there is no ODR violation. This is tracked by [#78850](https://github.com/llvm/llvm-project/issues/78850).

#### [Using TU-local entity in other units](#id56)[¶](#using-tu-local-entity-in-other-units "Link to this heading")

Module units are translation units, so the entities which should be local to the module unit itself should never be used by other units.

The C++ standard defines the concept of `TU-local` and `exposure` in [basic.link/p14](https://eel.is/c++draft/basic.link#14), [basic.link/p15](https://eel.is/c++draft/basic.link#15), [basic.link/p16](https://eel.is/c++draft/basic.link#16), [basic.link/p17](https://eel.is/c++draft/basic.link#17), and [basic.link/p18](https://eel.is/c++draft/basic.link#18).

However, Clang doesn’t formally support these two concepts. This results in unclear or confusing diagnostic messages. Further, Clang may import `TU-local` entities to other units without any diagnostics. This is tracked by [#78173](https://github.com/llvm/llvm-project/issues/78173).

[Discovering Dependencies](#id65)[¶](#discovering-dependencies "Link to this heading")
--------------------------------------------------------------------------------------

Without use of modules, all the translation units in a project can be compiled in parallel. However, the presence of module units requires compiling the translation units in a topological order.

The `clang-scan-deps` tool can extract dependency information and produce a JSON file conforming to the specification described in [P1689](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1689r5.html). Only named modules are supported currently.

A compilation database is needed when using `clang-scan-deps`. See [JSON Compilation Database Format Specification](https://clang.llvm.org/docs/JSONCompilationDatabase.html) for more information about compilation databases. Note that the `output` JSON attribute is necessary for `clang-scan-deps` to scan using the P1689 format. For example:

//--- M.cppm
export module M;
export import :interface\_part;
import :impl\_part;
export int Hello();

//--- interface\_part.cppm
export module M:interface\_part;
export void World();

//--- Impl.cpp
module;
#include <iostream>
module M;
void Hello() {
    std::cout << "Hello ";
}

//--- impl\_part.cppm
module;
#include <string>
#include <iostream>
module M:impl\_part;
import :interface\_part;

std::string W \= "World.";
void World() {
    std::cout << W << std::endl;
}

//--- User.cpp
import M;
import third\_party\_module;
int main() {
  Hello();
  World();
  return 0;
}

And here is the compilation database:

\[
{
    "directory": ".",
    "command": "<path-to-compiler-executable>/clang++ -std=c++20 M.cppm -c -o M.o",
    "file": "M.cppm",
    "output": "M.o"
},
{
    "directory": ".",
    "command": "<path-to-compiler-executable>/clang++ -std=c++20 Impl.cpp -c -o Impl.o",
    "file": "Impl.cpp",
    "output": "Impl.o"
},
{
    "directory": ".",
    "command": "<path-to-compiler-executable>/clang++ -std=c++20 impl\_part.cppm -c -o impl\_part.o",
    "file": "impl\_part.cppm",
    "output": "impl\_part.o"
},
{
    "directory": ".",
    "command": "<path-to-compiler-executable>/clang++ -std=c++20 interface\_part.cppm -c -o interface\_part.o",
    "file": "interface\_part.cppm",
    "output": "interface\_part.o"
},
{
    "directory": ".",
    "command": "<path-to-compiler-executable>/clang++ -std=c++20 User.cpp -c -o User.o",
    "file": "User.cpp",
    "output": "User.o"
}
\]

To get the dependency information in P1689 format, use:

$ clang-scan-deps \-format\=p1689 \-compilation-database P1689.json

to get:

{
  "revision": 0,
  "rules": \[
    {
      "primary-output": "Impl.o",
      "requires": \[
        {
          "logical-name": "M",
          "source-path": "M.cppm"
        }
      \]
    },
    {
      "primary-output": "M.o",
      "provides": \[
        {
          "is-interface": true,
          "logical-name": "M",
          "source-path": "M.cppm"
        }
      \],
      "requires": \[
        {
          "logical-name": "M:interface\_part",
          "source-path": "interface\_part.cppm"
        },
        {
          "logical-name": "M:impl\_part",
          "source-path": "impl\_part.cppm"
        }
      \]
    },
    {
      "primary-output": "User.o",
      "requires": \[
        {
          "logical-name": "M",
          "source-path": "M.cppm"
        },
        {
          "logical-name": "third\_party\_module"
        }
      \]
    },
    {
      "primary-output": "impl\_part.o",
      "provides": \[
        {
          "is-interface": false,
          "logical-name": "M:impl\_part",
          "source-path": "impl\_part.cppm"
        }
      \],
      "requires": \[
        {
          "logical-name": "M:interface\_part",
          "source-path": "interface\_part.cppm"
        }
      \]
    },
    {
      "primary-output": "interface\_part.o",
      "provides": \[
        {
          "is-interface": true,
          "logical-name": "M:interface\_part",
          "source-path": "interface\_part.cppm"
        }
      \]
    }
  \],
  "version": 1
}

See the P1689 paper for the meaning of the fields.

Getting dependency information per file with finer-grained control (such as scanning generated source files) is possible. For example:

$ clang-scan-deps \-format\=p1689 \-- <path-to-compiler-executable>/clang++ \-std\=c++20 impl\_part.cppm \-c \-o impl\_part.o

will produce:

{
  "revision": 0,
  "rules": \[
    {
      "primary-output": "impl\_part.o",
      "provides": \[
        {
          "is-interface": false,
          "logical-name": "M:impl\_part",
          "source-path": "impl\_part.cppm"
        }
      \],
      "requires": \[
        {
          "logical-name": "M:interface\_part"
        }
      \]
    }
  \],
  "version": 1
}

Individual command line options can be specified after `--`. `clang-scan-deps` will extract the necessary information from the specified options. Note that the path to the compiler executable needs to be specified explicitly instead of using `clang++` directly.

Users may want the scanner to get the transitive dependency information for headers. Otherwise, the project has to be scanned twice, once for headers and once for modules. To address this, `clang-scan-deps` will recognize the specified preprocessor options in the given command line and generate the corresponding dependency information. For example:

$ clang-scan-deps \-format\=p1689 \-- ../bin/clang++ \-std\=c++20 impl\_part.cppm \-c \-o impl\_part.o \-MD \-MT impl\_part.ddi \-MF impl\_part.dep
$ cat impl\_part.dep

will produce:

impl\_part.ddi: \\
  /usr/include/bits/wchar.h /usr/include/bits/types/wint\_t.h \\
  /usr/include/bits/types/mbstate\_t.h \\
  /usr/include/bits/types/\_\_mbstate\_t.h /usr/include/bits/types/\_\_FILE.h \\
  /usr/include/bits/types/FILE.h /usr/include/bits/types/locale\_t.h \\
  /usr/include/bits/types/\_\_locale\_t.h \\
  ...

When `clang-scan-deps` detects the `-MF` option, it will try to write the dependency information for headers to the file specified by `-MF`.

[Import modules with clang-repl](#id67)[¶](#import-modules-with-clang-repl "Link to this heading")
--------------------------------------------------------------------------------------------------

`clang-repl` supports importing C++20 named modules. For example:

// M.cppm
export module M;
export const char\* Hello() {
    return "Hello Interpreter for Modules!";
}

The named module still needs to be compiled ahead of time.

$ clang++ \-std\=c++20 M.cppm \--precompile \-o M.pcm
$ clang++ M.pcm \-c \-o M.o
$ clang++ \-shared M.o \-o libM.so

Note that the module unit needs to be compiled as a dynamic library so that `clang-repl` can load the object files of the module units. Then it is possible to import module `M` in clang-repl.

$ clang-repl \-Xcc\=\-std\=c++20 \-Xcc\=\-fprebuilt-module-path\=.
\# We need to load the dynamic library first before importing the modules.
clang-repl> %lib libM.so
clang-repl> import M;
clang-repl> extern "C" int printf(const char \*, ...);
clang-repl> printf("%s\\n", Hello());
Hello Interpreter for Modules!
clang-repl> %quit

[Possible Questions](#id68)[¶](#possible-questions "Link to this heading")
--------------------------------------------------------------------------

### [How modules speed up compilation](#id69)[¶](#how-modules-speed-up-compilation "Link to this heading")

A classic theory for the reason why modules speed up the compilation is: if there are `n` headers and `m` source files and each header is included by each source file, then the complexity of the compilation is `O(n*m)`. However, if there are `n` module interfaces and `m` source files, the complexity of the compilation is `O(n+m)`. Therefore, using modules would be a significant improvement at scale. More simply, use of modules causes many of the redundant compilations to no longer be necessary.

While this is accurate at a high level, this depends greatly on the optimization level, as illustrated below.

First is `-O0`. The compilation process is described in the following graph.

├-------------frontend----------┼-------------middle end----------------┼----backend----┤
│                               │                                       │               │
└---parsing----sema----codegen--┴----- transformations ---- codegen ----┴---- codegen --┘

├---------------------------------------------------------------------------------------┐
|                                                                                       │
|                                     source file                                       │
|                                                                                       │
└---------------------------------------------------------------------------------------┘

            ├--------┐
            │        │
            │imported│
            │        │
            │  code  │
            │        │
            └--------┘

In this case, the source file (which could be a non-module unit or a module unit) would get processed by the entire pipeline. However, the imported code would only get involved in semantic analysis, which, for the most part, is name lookup, overload resolution, and template instantiation. All of these processes are fast relative to the whole compilation process. More importantly, the imported code only needs to be processed once during frontend code generation, as well as the whole middle end and backend. So we could get a big win for the compilation time in `-O0`.

But with optimizations, things are different (the `code generation` part for each end is omitted due to limited space):

├-------- frontend ---------┼--------------- middle end --------------------┼------ backend ----┤
│                           │                                               │                   │
└--- parsing ---- sema -----┴--- optimizations --- IPO ---- optimizations---┴--- optimizations -┘

├-----------------------------------------------------------------------------------------------┐
│                                                                                               │
│                                         source file                                           │
│                                                                                               │
└-----------------------------------------------------------------------------------------------┘
              ├---------------------------------------┐
              │                                       │
              │                                       │
              │            imported code              │
              │                                       │
              │                                       │
              └---------------------------------------┘

It would be very unfortunate if we end up with worse performance when using modules. The main concern is that when a source file is compiled, the compiler needs to see the body of imported module units so that it can perform IPO (InterProcedural Optimization, primarily inlining in practice) to optimize functions in the current source file with the help of the information provided by the imported module units. In other words, the imported code would be processed again and again in importee units by optimizations (including IPO itself). The optimizations before IPO and IPO itself are the most time-consuming part in whole compilation process. So from this perspective, it might not be possible to get the compile time improvements described, but there could be time savings for optimizations after IPO and the whole backend.

Overall, at `-O0` the implementations of functions defined in a module will not impact module users, but at higher optimization levels the definitions of such functions are provided to user compilations for the purposes of optimization (but definitions of these functions are still not included in the use’s object file). This means the build speedup at higher optimization levels may be lower than expected given `-O0` experience, but does provide more optimization opportunities.

### [Interoperability with Clang Modules](#id70)[¶](#interoperability-with-clang-modules "Link to this heading")

We **wish** to support Clang modules and standard C++ modules at the same time, but the mixing them together is not well used/tested yet. Please file new GitHub issues as you find interoperability problems.