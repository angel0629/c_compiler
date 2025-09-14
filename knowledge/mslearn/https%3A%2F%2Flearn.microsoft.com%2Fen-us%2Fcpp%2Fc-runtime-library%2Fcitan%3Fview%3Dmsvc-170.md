---
title: "_CItan"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/citan?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates the tangent of the top value on the floating-point stack.

## Syntax

```
void __cdecl _CItan();
```

## Remarks

This version of the [`tan`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tan-tanf-tanl?view=msvc-170) function has a specialized calling convention that the compiler understands. The function speeds up the execution because it prevents copies from being generated and helps with register allocation.

The resulting value is pushed onto the top of the floating-point stack.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

**Platform:** x86

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`tan`, `tanf`, `tanl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tan-tanf-tanl?view=msvc-170)