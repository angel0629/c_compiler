---
title: "2.3. Configuring the Analyzer — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/analyzer/user-docs/Options.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
2.3.2. List of analyzer options[¶](#list-of-analyzer-options "Link to this heading")
------------------------------------------------------------------------------------

Warning

These options are primarily intended for development purposes and non-default values are usually unsupported. Changing their values may drastically alter the behavior of the analyzer, and may even result in instabilities or crashes! Crash reports are welcome and depending on the severity they may be fixed.

### 2.3.2.1. mode[¶](#mode "Link to this heading")

(string) Controls the high-level analyzer mode, which influences the default settings for some of the lower-level config options (such as IPAMode).

Accepted values: “deep”, “shallow”.

Default value: “deep”

### 2.3.2.2. cfg-implicit-dtors[¶](#cfg-implicit-dtors "Link to this heading")

Whether or not implicit destructors for C++ objects should be included in the CFG.

Default value: true

### 2.3.2.3. cfg-temporary-dtors[¶](#cfg-temporary-dtors "Link to this heading")

Whether or not the destructors for C++ temporary objects should be included in the CFG.

Default value: true

### 2.3.2.4. cfg-lifetime[¶](#cfg-lifetime "Link to this heading")

Whether or not end-of-lifetime information should be included in the CFG.

Default value: false

### 2.3.2.5. cfg-loopexit[¶](#cfg-loopexit "Link to this heading")

Whether or not the end of the loop information should be included in the CFG.

Default value: false

### 2.3.2.6. cfg-rich-constructors[¶](#cfg-rich-constructors "Link to this heading")

Whether or not construction site information should be included in the CFG C++ constructor elements.

Default value: true

### 2.3.2.7. cfg-scopes[¶](#cfg-scopes "Link to this heading")

Whether or not scope information should be included in the CFG.

Default value: false

### 2.3.2.8. cfg-expand-default-aggr-inits[¶](#cfg-expand-default-aggr-inits "Link to this heading")

Whether or not inline CXXDefaultInitializers for aggregate initialization in the CFG.

Default value: false

### 2.3.2.9. c++-template-inlining[¶](#c-template-inlining "Link to this heading")

Whether or not templated functions may be considered for inlining.

Default value: true

### 2.3.2.10. c++-stdlib-inlining[¶](#c-stdlib-inlining "Link to this heading")

Whether or not C++ standard library functions may be considered for inlining.

Default value: true

### 2.3.2.11. c++-allocator-inlining[¶](#c-allocator-inlining "Link to this heading")

Whether or not allocator and deallocator calls may be considered for inlining.

Default value: true

### 2.3.2.12. c++-shared\_ptr-inlining[¶](#c-shared-ptr-inlining "Link to this heading")

Whether or not the destructor of C++ ‘shared\_ptr’ may be considered for inlining. This covers std::shared\_ptr, std::tr1::shared\_ptr, and boost::shared\_ptr, and indeed any destructor named ‘~shared\_ptr’.

Default value: false

### 2.3.2.13. c++-temp-dtor-inlining[¶](#c-temp-dtor-inlining "Link to this heading")

Whether C++ temporary destructors should be inlined during analysis. If temporary destructors are disabled in the CFG via the ‘cfg-temporary-dtors’ option, temporary destructors would not be inlined anyway.

Default value: true

### 2.3.2.14. suppress-null-return-paths[¶](#suppress-null-return-paths "Link to this heading")

Whether or not paths that go through null returns should be suppressed. This is a heuristic for avoiding bug reports with paths that go through inlined functions that are more defensive than their callers.

Default value: true

### 2.3.2.15. avoid-suppressing-null-argument-paths[¶](#avoid-suppressing-null-argument-paths "Link to this heading")

Whether a bug report should not be suppressed if its path includes a call with a null argument, even if that call has a null return. This option has no effect when ShouldSuppressNullReturnPaths is false. This is a counter-heuristic to avoid false negatives.

Default value: false

### 2.3.2.16. suppress-inlined-defensive-checks[¶](#suppress-inlined-defensive-checks "Link to this heading")

Whether or not diagnostics containing inlined defensive NULL checks should be suppressed.

Default value: true

### 2.3.2.17. c++-container-inlining[¶](#c-container-inlining "Link to this heading")

Whether or not methods of C++ container objects may be considered for inlining.

Default value: false

### 2.3.2.18. suppress-c++-stdlib[¶](#suppress-c-stdlib "Link to this heading")

Whether or not diagnostics reported within the C++ standard library should be suppressed.

Default value: true

### 2.3.2.19. crosscheck-with-z3[¶](#crosscheck-with-z3 "Link to this heading")

Whether bug reports should be crosschecked with the Z3 constraint manager backend.

Default value: false

### 2.3.2.20. crosscheck-with-z3-eqclass-timeout-threshold[¶](#crosscheck-with-z3-eqclass-timeout-threshold "Link to this heading")

Set a timeout for bug report equivalence classes in milliseconds. If we exhaust this threshold, we will drop the bug report eqclass instead of doing more Z3 queries. Setting this to 700 ms in conjunction with “crosscheck-with-z3-timeout- threshold” of 300 ms, would nicely guarantee that no bug report equivalence class can take longer than 1 second, effectively mitigating Z3 hangs during refutation. If there were Z3 retries, only the minimum query time is considered when accumulating query times within a report equivalence class. Set 0 for no timeout.

Default value: 0

### 2.3.2.21. crosscheck-with-z3-timeout-threshold[¶](#crosscheck-with-z3-timeout-threshold "Link to this heading")

Set a timeout for individual Z3 queries in milliseconds. On fast machines, 300 worked well in some cases. The lower it is, the higher the chances of having flaky issues. Having no timeout may hang the analyzer indefinitely. Set 0 for no timeout.

Default value: 15000

### 2.3.2.22. crosscheck-with-z3-rlimit-threshold[¶](#crosscheck-with-z3-rlimit-threshold "Link to this heading")

Set the Z3 resource limit threshold. This sets a supposedly deterministic cutoff point for Z3 queries, as longer queries usually consume more resources. 400’000 should on average make Z3 queries run for up to 100ms on modern hardware. Set 0 for unlimited.

Default value: 0

### 2.3.2.23. crosscheck-with-z3-max-attempts-per-query[¶](#crosscheck-with-z3-max-attempts-per-query "Link to this heading")

Set how many times the oracle is allowed to run a Z3 query. This must be a positive value. Set 1 to not allow any retry attempts. Increasing the number of attempts is often more effective at reducing the number of nondeterministic diagnostics than “crosscheck-with-z3-timeout-threshold” in practice.

Default value: 3

### 2.3.2.24. report-in-main-source-file[¶](#report-in-main-source-file "Link to this heading")

Whether or not the diagnostic report should be always reported in the main source file and not the headers.

Default value: false

### 2.3.2.25. stable-report-filename[¶](#stable-report-filename "Link to this heading")

Deprecated: report filenames are now always stable. See also ‘verbose-report- filename’.

Default value: false

### 2.3.2.26. verbose-report-filename[¶](#verbose-report-filename "Link to this heading")

Whether or not the report filename should contain extra information about the issue.

Default value: false

### 2.3.2.27. serialize-stats[¶](#serialize-stats "Link to this heading")

Whether the analyzer should serialize statistics to plist output. Statistics would be serialized in JSON format inside the main dictionary under the statistics key. Available only if compiled in assert mode or with LLVM statistics explicitly enabled.

Default value: false

### 2.3.2.28. objc-inlining[¶](#objc-inlining "Link to this heading")

Whether ObjectiveC inlining is enabled, false otherwise.

Default value: true

### 2.3.2.29. prune-paths[¶](#prune-paths "Link to this heading")

Whether irrelevant parts of a bug report path should be pruned out of the final output.

Default value: true

### 2.3.2.30. add-pop-up-notes[¶](#add-pop-up-notes "Link to this heading")

Whether pop-up notes should be added to the final output.

Default value: true

### 2.3.2.31. cfg-conditional-static-initializers[¶](#cfg-conditional-static-initializers "Link to this heading")

Whether ‘static’ initializers should be in conditional logic in the CFG.

Default value: true

### 2.3.2.32. faux-bodies[¶](#faux-bodies "Link to this heading")

Whether the analyzer engine should synthesize fake bodies for well-known functions.

Default value: true

### 2.3.2.33. elide-constructors[¶](#elide-constructors "Link to this heading")

Whether elidable C++ copy-constructors and move-constructors should be actually elided during analysis. Both behaviors are allowed by the C++ standard, and the analyzer, like CodeGen, defaults to eliding. Starting with C++17 some elisions become mandatory, and in these cases the option will be ignored.

Default value: true

### 2.3.2.34. inline-lambdas[¶](#inline-lambdas "Link to this heading")

Whether lambdas should be inlined. Otherwise a sink node will be generated each time a LambdaExpr is visited.

Default value: true

### 2.3.2.35. widen-loops[¶](#widen-loops "Link to this heading")

Whether the analysis should try to widen loops.

Default value: false

### 2.3.2.36. unroll-loops[¶](#unroll-loops "Link to this heading")

Whether the analysis should try to unroll loops with known bounds.

Default value: false

### 2.3.2.37. assume-at-least-one-iteration[¶](#assume-at-least-one-iteration "Link to this heading")

Whether the analyzer should always assume at least one iteration in loops where the loop condition is opaque (i.e. the analyzer cannot determine if it’s true or false). Setting this to true eliminates some false positives (where e.g. a structure is nonempty, but the analyzer does not notice this); but it also eliminates some true positives (e.g. cases where a structure can be empty and this causes buggy behavior).

Default value: false

### 2.3.2.38. notes-as-events[¶](#notes-as-events "Link to this heading")

Whether the bug reporter should transparently treat extra note diagnostic pieces as event diagnostic pieces. Useful when the diagnostic consumer doesn’t support the extra note pieces.

Default value: false

### 2.3.2.39. aggressive-binary-operation-simplification[¶](#aggressive-binary-operation-simplification "Link to this heading")

Whether SValBuilder should rearrange comparisons and additive operations of symbolic expressions which consist of a sum of a symbol and a concrete integer into the format where symbols are on the left-hand side and the integer is on the right. This is only done if both symbols and both concrete integers are signed, greater than or equal to the quarter of the minimum value of the type and less than or equal to the quarter of the maximum value of that type. A + n <OP> B + m becomes A - B <OP> m - n, where A and B symbolic, n and m are integers. <OP> is any of ‘==’, ‘!=’, ‘<’, ‘<=’, ‘>’, ‘>=’, ‘+’ or ‘-’. The rearrangement also happens with ‘-’ instead of ‘+’ on either or both side and also if any or both integers are missing.

Default value: false

### 2.3.2.40. eagerly-assume[¶](#eagerly-assume "Link to this heading")

If this is enabled (the default behavior), when the analyzer encounters a comparison operator or logical negation, it immediately splits the state to separate the case when the expression is true and the case when it’s false. The upside is that this can increase analysis precision until we have a better way to lazily evaluate such logic; the downside is that it eagerly bifurcates paths.

Default value: true

### 2.3.2.41. experimental-enable-naive-ctu-analysis[¶](#experimental-enable-naive-ctu-analysis "Link to this heading")

Whether naive cross translation unit analysis is enabled. This is an experimental feature to inline functions from other translation units.

Default value: false

### 2.3.2.42. expand-macros[¶](#expand-macros "Link to this heading")

Whether macros related to the bugpath should be expanded and included in the plist output.

Default value: false

### 2.3.2.43. display-ctu-progress[¶](#display-ctu-progress "Link to this heading")

Whether to emit verbose output about the analyzer’s progress related to ctu.

Default value: false

### 2.3.2.44. dump-entry-point-stats-to-csv[¶](#dump-entry-point-stats-to-csv "Link to this heading")

If provided, the analyzer will dump statistics per entry point into the specified CSV file.

Default value: (empty string)

### 2.3.2.45. track-conditions[¶](#track-conditions "Link to this heading")

Whether to track conditions that are a control dependency of an already tracked variable.

Default value: true

### 2.3.2.46. track-conditions-debug[¶](#track-conditions-debug "Link to this heading")

Whether to place an event at each tracked condition.

Default value: false

### 2.3.2.47. apply-fixits[¶](#apply-fixits "Link to this heading")

Apply the fix-it hints to the files

Default value: false

### 2.3.2.48. display-checker-name[¶](#display-checker-name "Link to this heading")

Display the checker name for textual outputs

Default value: true

### 2.3.2.49. support-symbolic-integer-casts[¶](#support-symbolic-integer-casts "Link to this heading")

Produce cast symbols for integral types.

Default value: false

### 2.3.2.50. assume-controlled-environment[¶](#assume-controlled-environment "Link to this heading")

Whether the analyzed application runs in a controlled environment. We will assume that environment variables exist in queries and they hold no malicious data. For instance, if this option is enabled, ‘getenv()’ might be modeled by the analyzer to never return NULL.

Default value: false

### 2.3.2.51. ignore-bison-generated-files[¶](#ignore-bison-generated-files "Link to this heading")

If enabled, any files containing the “/\* A Bison parser, made by” won’t be analyzed.

Default value: true

### 2.3.2.52. ignore-flex-generated-files[¶](#ignore-flex-generated-files "Link to this heading")

If enabled, any files containing the “/\* A lexical scanner generated by flex” won’t be analyzed.

Default value: true

### 2.3.2.53. suppress-dereferences-from-any-address-space[¶](#suppress-dereferences-from-any-address-space "Link to this heading")

The analyzer does not report dereferences on memory that use address space #256, #257, and #258. Those address spaces are used when dereferencing address spaces relative to the GS, FS, and SS segments on x86/x86-64 targets. Dereferencing a null pointer in these address spaces is not defined as an error. All other null dereferences in other address spaces are defined as an error unless explicitly defined. When this option is turned on, the special behavior of address spaces #256, #257, #258 is extended to all pointers with address spaces and on any target.

Default value: true

### 2.3.2.54. inline-functions-with-ambiguous-loops[¶](#inline-functions-with-ambiguous-loops "Link to this heading")

If disabled (the default), the analyzer puts functions on a “do not inline this” list if it finds an execution path within that function that may potentially perform ‘analyzer-max-loop’ (= 4 by default) iterations in a loop. (Note that functions that \_definitely\_ reach the loop limit on some execution path are currently marked as “do not inline” even if this option is enabled.) Enabling this option eliminates this (somewhat arbitrary) restriction from the analysis scope, which increases the analysis runtime (on average by ~10%, but a few translation units may see much larger slowdowns).

Default value: false

### 2.3.2.55. ipa-always-inline-size[¶](#ipa-always-inline-size "Link to this heading")

The size of the functions (in basic blocks), which should be considered to be small enough to always inline.

Default value: 3

### 2.3.2.56. graph-trim-interval[¶](#graph-trim-interval "Link to this heading")

How often nodes in the ExplodedGraph should be recycled to save memory. To disable node reclamation, set the option to 0.

Default value: 1000

### 2.3.2.57. min-cfg-size-treat-functions-as-large[¶](#min-cfg-size-treat-functions-as-large "Link to this heading")

The number of basic blocks a function needs to have to be considered large for the ‘max-times-inline-large’ config option.

Default value: 14

### 2.3.2.58. max-symbol-complexity[¶](#max-symbol-complexity "Link to this heading")

The maximum complexity of symbolic constraint.

Default value: 35

### 2.3.2.59. max-tainted-symbol-complexity[¶](#max-tainted-symbol-complexity "Link to this heading")

\[DEPRECATED\] The maximum complexity of a symbol to carry taint

Default value: 9

### 2.3.2.60. max-times-inline-large[¶](#max-times-inline-large "Link to this heading")

The maximum times a large function could be inlined.

Default value: 32

### 2.3.2.61. max-inlinable-size[¶](#max-inlinable-size "Link to this heading")

The bound on the number of basic blocks in an inlined function.

Default value: 4 (in shallow mode) / 100 (in deep mode)

### 2.3.2.62. max-nodes[¶](#max-nodes "Link to this heading")

The maximum number of nodes the analyzer can generate while exploring a top level function (for each exploded graph). 0 means no limit.

Default value: 75000 (in shallow mode) / 225000 (in deep mode)

### 2.3.2.63. ctu-max-nodes-pct[¶](#ctu-max-nodes-pct "Link to this heading")

The percentage of single-TU analysed nodes that the CTU analysis is allowed to visit.

Default value: 50

### 2.3.2.64. ctu-max-nodes-min[¶](#ctu-max-nodes-min "Link to this heading")

The maximum number of nodes in CTU mode is determinded by ‘ctu-max-nodes-pct’. However, if the number of nodes in single-TU analysis is too low, it is meaningful to provide a minimum value that serves as an upper bound instead.

Default value: 10000

### 2.3.2.65. region-store-small-struct-limit[¶](#region-store-small-struct-limit "Link to this heading")

The largest number of fields a struct can have and still be considered small. This is currently used to decide whether or not it is worth forcing a LazyCompoundVal on bind. To disable all small-struct-dependent behavior, set the option to 0.

Default value: 2

### 2.3.2.66. region-store-small-array-limit[¶](#region-store-small-array-limit "Link to this heading")

The largest number of elements an array can have and still be considered small. This is currently used to decide whether or not it is worth forcing a LazyCompoundVal on bind. To disable all small-array-dependent behavior, set the option to 0.

Default value: 5

### 2.3.2.67. region-store-max-binding-fanout[¶](#region-store-max-binding-fanout "Link to this heading")

This option limits how many sub-bindings a single binding operation can scatter into. For example, binding an array would scatter into binding each individual element. Setting this to zero means unlimited, but then modelling large array initializers may take proportional time to their size.

Default value: 128

### 2.3.2.68. ctu-dir[¶](#ctu-dir "Link to this heading")

The directory containing the CTU related files.

Default value: (empty string)

### 2.3.2.69. ctu-index-name[¶](#ctu-index-name "Link to this heading")

The name of the file containing the CTU index of definitions. The index file maps USR-names to identifiers. An identifier can end with an ‘.ast’ suffix, indicating the indentifier is a path to a pch-dump. Otherwise the identifier is regarded as path to a source file which is parsed on-demand. Relative paths are prefixed with ctu-dir, absolute paths are used unmodified during lookup.

Default value: “externalDefMap.txt”

### 2.3.2.70. ctu-invocation-list[¶](#ctu-invocation-list "Link to this heading")

The path to the YAML format file containing a mapping from source file paths to command-line invocations represented as a list of arguments. This invocation is used produce the source-file’s AST in case on-demand loading is performed.

Example file content:

{/main.cpp: \[clang++, /main.cpp\], other.cpp: \[clang++, /other.cpp\]}

Default value: “invocations.yaml”

### 2.3.2.71. model-path[¶](#model-path "Link to this heading")

The analyzer can inline an alternative implementation written in C at the call site if the called function’s body is not available. This is a path where to look for those alternative implementations (called models).

Default value: (empty string)

### 2.3.2.72. ctu-phase1-inlining[¶](#ctu-phase1-inlining "Link to this heading")

Controls which functions will be inlined during the first phase of the ctu analysis. If the value is set to ‘all’ then all foreign functions are inlinied immediately during the first phase, thus rendering the second phase a noop. The ‘ctu-max-nodes-\*’ budge has no effect in this case. If the value is ‘small’ then only functions with a linear CFG and with a limited number of statements would be inlined during the first phase. The long and/or nontrivial functions are handled in the second phase and are controlled by the ‘ctu-max-nodes-\*’ budge. The value ‘none’ means that all foreign functions are inlined only in the second phase, ‘ctu-max-nodes-\*’ budge limits the second phase.

Accepted values: “none”, “small”, “all”.

Default value: “small”

### 2.3.2.73. c++-inlining[¶](#c-inlining "Link to this heading")

Controls which C++ member functions will be considered for inlining.

Accepted values: “constructors”, “destructors”, “methods”.

Default value: “destructors”

### 2.3.2.74. exploration\_strategy[¶](#exploration-strategy "Link to this heading")

Accepted values: “dfs”, “bfs”, “unexplored\_first”, “unexplored\_first\_queue”, “unexplored\_first\_location\_queue”, “bfs\_block\_dfs\_contents”.

Default value: “unexplored\_first\_queue”

### 2.3.2.75. silence-checkers[¶](#silence-checkers "Link to this heading")

A semicolon separated list of checker and package names to silence. Silenced checkers will not emit reports, but the modeling remain enabled.

Default value: (empty string)

### 2.3.2.76. ipa[¶](#ipa "Link to this heading")

Controls the mode of inter-procedural analysis.

Accepted values: “none”, “basic-inlining”, “inlining”, “dynamic”, “dynamic- bifurcate”.

Default value: “inlining” (in shallow mode) / “dynamic-bifurcate” (in deep mode)