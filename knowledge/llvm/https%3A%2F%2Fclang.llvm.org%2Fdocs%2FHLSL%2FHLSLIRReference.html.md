---
title: "HLSL IR Reference — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/HLSL/HLSLIRReference.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
HLSL IR Reference[¶](#hlsl-ir-reference "Link to this heading")
---------------------------------------------------------------

*   [Introduction](#introduction)
    
*   [Function Attributes](#function-attributes)
    
    *   [`hlsl.shader`](#hlsl-shader)
        

[Introduction](#id1)[¶](#introduction "Link to this heading")
-------------------------------------------------------------

The goal of this document is to provide a reference for all the special purpose IR metadata and attributes used by the HLSL code generation path.

[Function Attributes](#id2)[¶](#function-attributes "Link to this heading")
---------------------------------------------------------------------------

### [`hlsl.shader`](#id3)[¶](#hlsl-shader "Link to this heading")

The `hlsl.shader` function attribute is a string attribute applied to entry functions. The value is the string representation of the shader stage (i.e. `compute`, `pixel`, etc).