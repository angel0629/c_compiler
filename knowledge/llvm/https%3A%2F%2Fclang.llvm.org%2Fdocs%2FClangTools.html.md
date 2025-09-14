---
title: "Overview — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/ClangTools.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
Clang Tools are standalone command line (and potentially GUI) tools designed for use by C++ developers who are already using and enjoying Clang as their compiler. These tools provide developer-oriented functionality such as fast syntax checking, automatic formatting, refactoring, etc.

Only a couple of the most basic and fundamental tools are kept in the primary Clang tree. The rest of the tools are kept in a separate directory tree, [clang-tools-extra](https://github.com/llvm/llvm-project/tree/main/clang-tools-extra).

This document describes a high-level overview of the organization of Clang Tools within the project as well as giving an introduction to some of the more important tools. However, it should be noted that this document is currently focused on Clang and Clang Tool developers, not on end users of these tools.

Clang Tools Organization[¶](#clang-tools-organization "Link to this heading")
-----------------------------------------------------------------------------

Clang Tools are CLI or GUI programs that are intended to be directly used by C++ developers. That is they are _not_ primarily for use by Clang developers, although they are hopefully useful to C++ developers who happen to work on Clang, and we try to actively dogfood their functionality. They are developed in three components: the underlying infrastructure for building a standalone tool based on Clang, core shared logic used by many different tools in the form of refactoring and rewriting libraries, and the tools themselves.

The underlying infrastructure for Clang Tools is the [LibTooling](https://clang.llvm.org/docs/LibTooling.html) platform. See its documentation for much more detailed information about how this infrastructure works. The common refactoring and rewriting toolkit-style library is also part of LibTooling organizationally.

A few Clang Tools are developed along side the core Clang libraries as examples and test cases of fundamental functionality. However, most of the tools are developed in a side repository to provide easy separation from the core libraries. We intentionally do not support public libraries in the side repository, as we want to carefully review and find good APIs for libraries as they are lifted out of a few tools and into the core Clang library set.

Regardless of which repository Clang Tools’ code resides in, the development process and practices for all Clang Tools are exactly those of Clang itself. They are entirely within the Clang _project_, regardless of the version control scheme.

Core Clang Tools[¶](#core-clang-tools "Link to this heading")
-------------------------------------------------------------

The core set of Clang tools that are within the main repository are tools that very specifically complement, and allow use and testing of _Clang_ specific functionality.

### `clang-check`[¶](#clang-check "Link to this heading")

[ClangCheck](https://clang.llvm.org/docs/ClangCheck.html) combines the LibTooling framework for running a Clang tool with the basic Clang diagnostics by syntax checking specific files in a fast, command line interface. It can also accept flags to re-display the diagnostics in different formats with different flags, suitable for use driving an IDE or editor. Furthermore, it can be used in fixit-mode to directly apply fixit-hints offered by clang. See [How To Setup Clang Tooling For LLVM](https://clang.llvm.org/docs/HowToSetupToolingForLLVM.html) for instructions on how to setup and used clang-check.

### `clang-format`[¶](#clang-format "Link to this heading")

Clang-format is both a [library](https://clang.llvm.org/docs/LibFormat.html) and a [stand-alone tool](https://clang.llvm.org/docs/ClangFormat.html) with the goal of automatically reformatting C++ sources files according to configurable style guides. To do so, clang-format uses Clang’s `Lexer` to transform an input file into a token stream and then changes all the whitespace around those tokens. The goal is for clang-format to serve both as a user tool (ideally with powerful IDE integrations) and as part of other refactoring tools, e.g. to do a reformatting of all the lines changed during a renaming.

Ideas for new Tools[¶](#ideas-for-new-tools "Link to this heading")
-------------------------------------------------------------------

*   C++ cast conversion tool. Will convert C-style casts (`(type) value`) to appropriate C++ cast (`static_cast`, `const_cast` or `reinterpret_cast`).
    
*   Non-member `begin()` and `end()` conversion tool. Will convert `foo.begin()` into `begin(foo)` and similarly for `end()`, where `foo` is a standard container. We could also detect similar patterns for arrays.
    
*   `tr1` removal tool. Will migrate source code from using TR1 library features to C++11 library. For example:
    
    #include <tr1/unordered\_map>
    int main()
    {
        std::tr1::unordered\_map <int, int\> ma;
        std::cout << ma.size () << std::endl;
        return 0;
    }
    
    should be rewritten to:
    
    #include <unordered\_map>
    int main()
    {
        std::unordered\_map <int, int\> ma;
        std::cout << ma.size () << std::endl;
        return 0;
    }
    
*   A tool to remove `auto`. Will convert `auto` to an explicit type or add comments with deduced types. The motivation is that there are developers that don’t want to use `auto` because they are afraid that they might lose control over their code.
    
*   C++14: less verbose operator function objects ([N3421](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3421.htm)). For example:
    
    sort(v.begin(), v.end(), greater<ValueType\>());
    
    should be rewritten to:
    
    sort(v.begin(), v.end(), greater<>());