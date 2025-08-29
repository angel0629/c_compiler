---
title: "HLSL Resource Types — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/HLSL/ResourceTypes.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
*   [Introduction](#introduction)
    
*   [Implementation Details](#implementation-details)
    

[Introduction](#id1)[¶](#introduction "Link to this heading")
-------------------------------------------------------------

HLSL Resources are runtime-bound data that is provided as input, output or both to shader programs written in HLSL. Resource Types in HLSL provide key user abstractions for reading and writing resource data.

[Implementation Details](#id2)[¶](#implementation-details "Link to this heading")
---------------------------------------------------------------------------------

In Clang resource types are forward declared by the `HLSLExternalSemaSource` on initialization. They are then lazily completed when `requiresCompleteType` is called later in Sema.

Resource types are classes that have the “intangible” resource handle type, \_\_hlsl\_resource\_t, as a member. These are generally templated class declarations that specify the type of data that can be loaded from or stored into the resource. The handle is annotated with hlsl-specific attributes describing properties of the resource. Member functions of a resource type are generally fairly simple wrappers around builtins that operate on the handle member.

During code generation resource types are lowered to target extension types in IR. These types are target specific and differ between DXIL and SPIR-V generation, providing the necessary information for the targets to generate binding metadata for their respective target runtimes.