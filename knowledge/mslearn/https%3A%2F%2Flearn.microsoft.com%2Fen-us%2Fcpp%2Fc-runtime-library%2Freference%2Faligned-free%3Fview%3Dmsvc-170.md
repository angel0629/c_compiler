---
title: "_aligned_free"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-free?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Frees a block of memory that was allocated with [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) or [`_aligned_offset_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170).

## Syntax

```
void _aligned_free (
   void *memblock
);
```

### Parameters

_`memblock`_  
A pointer to the memory block that was returned to the `_aligned_malloc` or `_aligned_offset_malloc` function.

## Remarks

**`_aligned_free`** is marked `__declspec(noalias)`, meaning that the function is guaranteed not to modify global variables. For more information, see [`noalias`](https://learn.microsoft.com/en-us/cpp/cpp/noalias?view=msvc-170).

This function doesn't validate its parameter, unlike the other \_aligned CRT functions. If _`memblock`_ is a `NULL` pointer, this function simply performs no actions. It doesn't change `errno` and it doesn't invoke the invalid parameter handler. If an error occurs in the function because `_aligned` functions weren't used to allocate the block of memory, or a misalignment of memory occurs due to some unforeseen calamity, the function generates a debug report from the [`_RPT`, `_RPTF`, `_RPTW`, `_RPTFW` macros](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rpt-rptf-rptw-rptfw-macros?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_aligned_free`**

<malloc.h>

## Example

For more information, see [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170).

## See also

[Data alignment](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-alignment?view=msvc-170)