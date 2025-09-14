---
title: "clang diagnostics tool — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/CommandGuide/diagtool.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
diagtool - clang diagnostics tool[¶](#diagtool-clang-diagnostics-tool "Link to this heading")
---------------------------------------------------------------------------------------------

SYNOPSIS[¶](#synopsis "Link to this heading")
---------------------------------------------

**diagtool** _command_ \[_args_\]

DESCRIPTION[¶](#description "Link to this heading")
---------------------------------------------------

**diagtool** is a combination of four tools for dealing with diagnostics in **clang**.

SUBCOMMANDS[¶](#subcommands "Link to this heading")
---------------------------------------------------

**diagtool** is separated into several subcommands each tailored to a different purpose. A brief summary of each command follows, with more detail in the sections that follow.

> *   [find-diagnostic-id](#find-diagnostic-id) - Print the id of the given diagnostic.
>     
> *   [list-warnings](#list-warnings) - List warnings and their corresponding flags.
>     
> *   [show-enabled](#show-enabled) - Show which warnings are enabled for a given command line.
>     
> *   [tree](#tree) - Show warning flags in a tree view.
>     

### find-diagnostic-id[¶](#find-diagnostic-id "Link to this heading")

**diagtool** find-diagnostic-id _diagnostic-name_

### list-warnings[¶](#list-warnings "Link to this heading")

**diagtool** list-warnings

### show-enabled[¶](#show-enabled "Link to this heading")

**diagtool** show-enabled \[_options_\] _filename …_

### tree[¶](#tree "Link to this heading")

**diagtool** tree \[_diagnostic-group_\]