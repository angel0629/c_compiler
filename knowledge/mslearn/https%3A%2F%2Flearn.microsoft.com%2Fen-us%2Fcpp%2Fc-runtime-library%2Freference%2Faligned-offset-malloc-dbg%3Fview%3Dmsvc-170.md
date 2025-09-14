---
title: "_aligned_offset_malloc_dbg"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc-dbg?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Allocates memory on a specified alignment boundary (debug version only).

## Syntax

```
void * _aligned_offset_malloc_dbg(
   size_t size,
   size_t alignment,
   size_t offset,
   const char *filename,
   int linenumber
);
```

### Parameters

_`size`_  
The size of the requested memory allocation.

_`alignment`_  
The alignment value, which must be an integer power of 2.

_`offset`_  
The offset into the memory allocation to force the alignment.

_`filename`_  
Pointer to the name of the source file that requested the allocation operation or `NULL`.

_`linenumber`_  
Line number in the source file where the allocation operation was requested or `NULL`.

## Return value

A pointer to the memory block that was allocated or `NULL` if the operation failed.

**`_aligned_offset_malloc_dbg`** is a debug version of the [`_aligned_offset_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170) function. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, each call to **`_aligned_offset_malloc_dbg`** is reduced to a call to **`_aligned_offset_malloc`**. Both **`_aligned_offset_malloc`** and **`_aligned_offset_malloc_dbg`** allocate a block of memory in the base heap, but **`_aligned_offset_malloc_dbg`** offers several debugging features: buffers on either side of the user portion of the block to test for leaks, and _`filename`_/_`linenumber`_ information to determine the origin of allocation requests. Tracking specific allocation types with a block type parameter isn't a supported debug feature for aligned allocations. Aligned allocations will appear as a `_NORMAL_BLOCK` block type.

**`_aligned_offset_malloc_dbg`** allocates the memory block with slightly more space than the requested _`size`_. The extra space is used by the debug heap manager to link the debug memory blocks and to provide the application with debug header information and overwrite buffers. When the block is allocated, the user portion of the block is filled with the value 0xCD, and each of the overwrite buffers are filled with 0xFD.

**`_aligned_offset_malloc_dbg`** is useful in situations where alignment is needed on a nested element; for example, if alignment was needed on a nested class.

**`_aligned_offset_malloc_dbg`** is based on `malloc`; for more information, see [`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170).

This function sets `errno` to `ENOMEM` if the memory allocation failed or if the requested size was greater than `_HEAP_MAXREQ`. For more information about `errno`, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170). Also, `_aligned_offset_malloc` validates its parameters. If _`alignment`_ isn't a power of 2, or if _`offset`_ is non-zero and greater than or equal to _`size`_, this function invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function returns `NULL` and sets `errno` to `EINVAL`.

For information about how memory blocks are allocated, initialized, and managed in the debug version of the base heap, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170).

For information about the allocation block types and how they're used, see [Types of blocks on the debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#types-of-blocks-on-the-debug-heap).

## Requirements

Routine

Required header

**`_aligned_offset_malloc_dbg`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)