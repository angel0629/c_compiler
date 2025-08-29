---
title: "2.7. Taint Analysis Configuration — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/analyzer/user-docs/TaintAnalysisConfiguration.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
The Clang Static Analyzer uses taint analysis to detect injection vulnerability related issues in code. The backbone of taint analysis in the Clang SA is the `TaintPropagation` modeling checker. The reports are emitted via the [optin.taint.GenericTaint (C, C++)](https://clang.llvm.org/docs/analyzer/checkers.html#optin-taint-generictaint) checker. The `TaintPropagation` checker has a default taint-related configuration. The built-in default settings are defined in code, and they are always in effect. The checker also provides a configuration interface for extending the default settings via the `optin.taint.TaintPropagation:Config` checker config parameter by providing a configuration file to the in [YAML](http://llvm.org/docs/YamlIO.html#introduction-to-yaml) format. This documentation describes the syntax of the configuration file and gives the informal semantics of the configuration options.

*   [Overview](#overview)
    
*   [Example configuration file](#example-configuration-file)
    
*   [Configuration file syntax and semantics](#configuration-file-syntax-and-semantics)
    
    *   [Filter syntax and semantics](#filter-syntax-and-semantics)
        
    *   [Propagation syntax and semantics](#propagation-syntax-and-semantics)
        
    *   [Sink syntax and semantics](#sink-syntax-and-semantics)
        

[2.7.1. Overview](#id5)[¶](#overview "Link to this heading")
------------------------------------------------------------

Taint analysis works by checking for the occurrence of special operations during the symbolic execution of the program. Taint analysis defines sources, sinks, and propagation rules. It identifies errors by detecting a flow of information that originates from a taint source, reaches a taint sink, and propagates through the program paths via propagation rules. A source, sink, or an operation that propagates taint is mainly domain-specific knowledge, but there are some built-in defaults provided by the `TaintPropagation` checker. It is possible to express that a statement sanitizes tainted values by providing a `Filters` section in the external configuration (see [Example configuration file](#clangsa-taint-configuration-example) and [Filter syntax and semantics](#clangsa-taint-filter-details)). There are no default filters defined in the built-in settings. The checker’s documentation also specifies how to provide a custom taint configuration with command-line options.

[2.7.2. Example configuration file](#id6)[¶](#example-configuration-file "Link to this heading")
------------------------------------------------------------------------------------------------

\# The entries that specify arguments use 0-based indexing when specifying
\# input arguments, and -1 is used to denote the return value.

Filters:
  \# Filter functions
  \# Taint is sanitized when tainted variables are pass arguments to filters.

  \# Filter function
  \#   void cleanse\_first\_arg(int\* arg)
  #
  \# Result example:
  \#   int x; // x is tainted
  \#   cleanse\_first\_arg(&x); // x is not tainted after the call
  \- Name: cleanse\_first\_arg
    Args: \[0\]

Propagations:
  \# Source functions
  \# The omission of SrcArgs key indicates unconditional taint propagation,
  \# which is conceptually what a source does.

  \# Source function
  \#   size\_t fread(void \*ptr, size\_t size, size\_t nmemb, FILE \* stream)
  #
  \# Result example:
  \#   FILE\* f = fopen("file.txt");
  \#   char buf\[1024\];
  \#   size\_t read = fread(buf, sizeof(buf\[0\]), sizeof(buf)/sizeof(buf\[0\]), f);
  \#   // both read and buf are tainted
  \- Name: fread
    DstArgs: \[0, \-1\]

  \# Propagation functions
  \# The presence of SrcArgs key indicates conditional taint propagation,
  \# which is conceptually what a propagator does.

  \# Propagation function
  \#   char \*dirname(char \*path)
  #
  \# Result example:
  \#   char\* path = read\_path();
  \#   char\* dir = dirname(path);
  \#   // dir is tainted if path was tainted
  \- Name: dirname
    SrcArgs: \[0\]
    DstArgs: \[\-1\]

Sinks:
  \# Sink functions
  \# If taint reaches any of the arguments specified, a warning is emitted.

  \# Sink function
  \#   int system(const char\* command)
  #
  \# Result example:
  \#   const char\* command = read\_command();
  \#   system(command); // emit diagnostic if command is tainted
  \- Name: system
    Args: \[0\]

In the example file above, the entries under the Propagation key implement the conceptual sources and propagations, and sinks have their dedicated Sinks key. The user can define operations (function calls) where the tainted values should be cleansed by listing entries under the Filters key. Filters model the sanitization of values done by the programmer, and providing these is key to avoiding false-positive findings.

[2.7.3. Configuration file syntax and semantics](#id7)[¶](#configuration-file-syntax-and-semantics "Link to this heading")
--------------------------------------------------------------------------------------------------------------------------

The configuration file should have valid [YAML](http://llvm.org/docs/YamlIO.html#introduction-to-yaml) syntax.

The configuration file can have the following top-level keys:

*   Filters
    
*   Propagations
    
*   Sinks
    

Under the Filters key, the user can specify a list of operations that remove taint (see [Filter syntax and semantics](#clangsa-taint-filter-details) for details).

Under the Propagations key, the user can specify a list of operations that introduce and propagate taint (see [Propagation syntax and semantics](#clangsa-taint-propagation-details) for details). The user can mark taint sources with a SrcArgs key in the Propagation key, while propagations have none. The lack of the SrcArgs key means unconditional propagation, which is how sources are modeled. The semantics of propagations are such, that if any of the source arguments are tainted (specified by indexes in SrcArgs) then all of the destination arguments (specified by indexes in DstArgs) also become tainted.

Under the Sinks key, the user can specify a list of operations where the checker should emit a bug report if tainted data reaches it (see [Sink syntax and semantics](#clangsa-taint-sink-details) for details).

### [2.7.3.1. Filter syntax and semantics](#id8)[¶](#filter-syntax-and-semantics "Link to this heading")

An entry under Filters is a [YAML](http://llvm.org/docs/YamlIO.html#introduction-to-yaml) object with the following mandatory keys:

*   Name is a string that specifies the name of a function. Encountering this function during symbolic execution the checker will sanitize taint from the memory region referred to by the given arguments or return a sanitized value.
    
*   Args is a list of numbers in the range of `[-1..int_max]`. It indicates the indexes of arguments in the function call. The number `-1` signifies the return value; other numbers identify call arguments. The values of these arguments are considered clean after the function call.
    

The following keys are optional:

*   Scope is a string that specifies the prefix of the function’s name in its fully qualified name. This option restricts the set of matching function calls. It can encode not only namespaces but struct/class names as well to match member functions.
    

### [2.7.3.2. Propagation syntax and semantics](#id9)[¶](#propagation-syntax-and-semantics "Link to this heading")

An entry under Propagation is a [YAML](http://llvm.org/docs/YamlIO.html#introduction-to-yaml) object with the following mandatory keys:

*   Name is a string that specifies the name of a function. Encountering this function during symbolic execution propagate taint from one or more arguments to other arguments and possibly the return value. It helps model the taint-related behavior of functions that are not analyzable otherwise.
    

The following keys are optional:

*   Scope is a string that specifies the prefix of the function’s name in its fully qualified name. This option restricts the set of matching function calls.
    
*   SrcArgs is a list of numbers in the range of `[0..int_max]` that indicates the indexes of arguments in the function call. Taint-propagation considers the values of these arguments during the evaluation of the function call. If any SrcArgs arguments are tainted, the checker will consider all DstArgs arguments tainted after the call.
    
*   DstArgs is a list of numbers in the range of `[-1..int_max]` that indicates the indexes of arguments in the function call. The number `-1` specifies the return value of the function. If any SrcArgs arguments are tainted, the checker will consider all DstArgs arguments tainted after the call.
    
*   VariadicType is a string that can be one of `None`, `Dst`, `Src`. It is used in conjunction with VariadicIndex to specify arguments inside a variadic argument. The value of `Src` will treat every call site argument that is part of a variadic argument list as a source concerning propagation rules (as if specified by SrcArg). The value of `Dst` will treat every call site argument that is part of a variadic argument list a destination concerning propagation rules. The value of `None` will not consider the arguments that are part of a variadic argument list (this option is redundant but can be used to temporarily switch off handling of a particular variadic argument option without removing the VariadicIndex key).
    
*   VariadicIndex is a number in the range of `[0..int_max]`. It indicates the starting index of the variadic argument in the signature of the function.
    

### [2.7.3.3. Sink syntax and semantics](#id10)[¶](#sink-syntax-and-semantics "Link to this heading")

An entry under Sinks is a [YAML](http://llvm.org/docs/YamlIO.html#introduction-to-yaml) object with the following mandatory keys:

*   Name is a string that specifies the name of a function. Encountering this function during symbolic execution will emit a taint-related diagnostic if any of the arguments specified with Args are tainted at the call site.
    
*   Args is a list of numbers in the range of `[0..int_max]` that indicates the indexes of arguments in the function call. The checker reports an error if any of the specified arguments are tainted.
    

The following keys are optional:

*   Scope is a string that specifies the prefix of the function’s name in its fully qualified name. This option restricts the set of matching function calls.