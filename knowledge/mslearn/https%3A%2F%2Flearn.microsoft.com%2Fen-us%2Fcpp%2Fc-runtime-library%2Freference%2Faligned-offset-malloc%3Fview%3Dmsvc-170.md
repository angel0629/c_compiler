---
title: "_aligned_offset_malloc"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Allocates memory on a specified alignment boundary.

## Syntax

```
void * _aligned_offset_malloc(
   size_t size,
   size_t alignment,
   size_t offset
);
```

### Parameters

_`size`_  
The size of the requested memory allocation.

_`alignment`_  
The alignment value, which must be an integer power of 2.

_`offset`_  
The offset into the memory allocation to force the alignment.

## Return value

A pointer to the memory block that was allocated or `NULL` if the operation failed.

**`_aligned_offset_malloc`** is useful in situations where alignment is needed on a nested element; for example, if alignment was needed on a nested class.

**`_aligned_offset_malloc`** is based on `malloc`; for more information, see [`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170).

**`_aligned_offset_malloc`** is marked `__declspec(noalias)` and `__declspec(restrict)`, meaning that the function is guaranteed not to modify global variables and that the pointer returned isn't aliased. For more information, see [`noalias`](https://learn.microsoft.com/en-us/cpp/cpp/noalias?view=msvc-170) and [`restrict`](https://learn.microsoft.com/en-us/cpp/cpp/restrict?view=msvc-170).

This function sets `errno` to `ENOMEM` if the memory allocation failed or if the requested size was greater than `_HEAP_MAXREQ`. For more information about `errno`, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170). Also, **`_aligned_offset_malloc`** validates its parameters. If _`alignment`_ isn't a power of 2, or if _`offset`_ is non-zero and greater than or equal to _`size`_, this function invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function returns `NULL` and sets `errno` to `EINVAL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_aligned_offset_malloc`**

<malloc.h>

## Example

For more information, see [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170).

## See also

[Data alignment](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-alignment?view=msvc-170)