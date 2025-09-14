---
title: "_aligned_realloc"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-realloc?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Changes the size of a memory block that was allocated with [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) or [`_aligned_offset_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170).

## Syntax

```
void * _aligned_realloc(
   void *memblock,
   size_t size,
   size_t alignment
);
```

### Parameters

_`memblock`_  
The current memory block pointer.

_`size`_  
The size of the requested memory allocation.

_`alignment`_  
The alignment value, which must be an integer power of 2.

## Return value

**`_aligned_realloc`** returns a void pointer to the reallocated (and possibly moved) memory block. The return value is `NULL` if the size is zero and the buffer argument isn't `NULL`, or if there isn't enough available memory to expand the block to the given size. In the first case, the original block is freed. In the second, the original block is unchanged. The return value points to a storage space that is suitably aligned for storage of any type of object. To get a pointer to a type other than void, use a type cast on the return value.

It's an error to reallocate memory and change the alignment of a block.

**`_aligned_realloc`** is based on `malloc`. For more information about using `_aligned_offset_malloc`, see [`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170).

This function sets `errno` to `ENOMEM` if the memory allocation failed or if the requested size was greater than `_HEAP_MAXREQ`. For more information about `errno`, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170). Also, **`_aligned_realloc`** validates its parameters. If _`alignment`_ isn't a power of 2, this function invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function returns `NULL` and sets `errno` to `EINVAL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_aligned_realloc`**

<malloc.h>

## Example

For more information, see [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170).

## See also

[Data alignment](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-alignment?view=msvc-170)