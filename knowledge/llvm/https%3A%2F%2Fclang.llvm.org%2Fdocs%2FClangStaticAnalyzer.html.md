---
title: "Clang Static Analyzer — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/ClangStaticAnalyzer.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
Clang Static Analyzer[¶](#clang-static-analyzer "Link to this heading")
-----------------------------------------------------------------------

The Clang Static Analyzer is a source code analysis tool that finds bugs in C, C++, and Objective-C programs. It implements _path-sensitive_, _inter-procedural analysis_ based on _symbolic execution_ technique.

This is the Static Analyzer documentation page.

See the [Official Tool Page](https://clang-analyzer.llvm.org/).

Table of Contents

*   [1\. Available Checkers](https://clang.llvm.org/docs/analyzer/checkers.html)
    *   [1.1. Default Checkers](https://clang.llvm.org/docs/analyzer/checkers.html#default-checkers)
    *   [1.2. Experimental Checkers](https://clang.llvm.org/docs/analyzer/checkers.html#experimental-checkers)
    *   [1.3. Debug Checkers](https://clang.llvm.org/docs/analyzer/checkers.html#debug-checkers)
*   [2\. User Docs](https://clang.llvm.org/docs/analyzer/user-docs.html)
    *   [2.1. Obtaining the Static Analyzer](https://clang.llvm.org/docs/analyzer/user-docs/Installation.html)
    *   [2.2. Command Line Usage: scan-build and CodeChecker](https://clang.llvm.org/docs/analyzer/user-docs/CommandLineUsage.html)
    *   [2.3. Configuring the Analyzer](https://clang.llvm.org/docs/analyzer/user-docs/Options.html)
    *   [2.4. Running the analyzer within Xcode](https://clang.llvm.org/docs/analyzer/user-docs/UsingWithXCode.html)
    *   [2.5. Filing Bugs and Feature Requests](https://clang.llvm.org/docs/analyzer/user-docs/FilingBugs.html)
    *   [2.6. Cross Translation Unit (CTU) Analysis](https://clang.llvm.org/docs/analyzer/user-docs/CrossTranslationUnit.html)
    *   [2.7. Taint Analysis Configuration](https://clang.llvm.org/docs/analyzer/user-docs/TaintAnalysisConfiguration.html)
    *   [2.8. Source Annotations](https://clang.llvm.org/docs/analyzer/user-docs/Annotations.html)
    *   [2.9. FAQ and How to Deal with Common False Positives](https://clang.llvm.org/docs/analyzer/user-docs/FAQ.html)
*   [3\. Developer Docs](https://clang.llvm.org/docs/analyzer/developer-docs.html)
    *   [3.1. Debug Checks](https://clang.llvm.org/docs/analyzer/developer-docs/DebugChecks.html)
    *   [3.2. Inlining](https://clang.llvm.org/docs/analyzer/developer-docs/IPA.html)
    *   [3.3. Initializer List](https://clang.llvm.org/docs/analyzer/developer-docs/InitializerLists.html)
    *   [3.4. Nullability Checks](https://clang.llvm.org/docs/analyzer/developer-docs/nullability.html)
    *   [3.5. Region Store](https://clang.llvm.org/docs/analyzer/developer-docs/RegionStore.html)
    *   [3.6. Performance Investigation](https://clang.llvm.org/docs/analyzer/developer-docs/PerformanceInvestigation.html)
    *   [3.7. Analysis Statistics](https://clang.llvm.org/docs/analyzer/developer-docs/Statistics.html)