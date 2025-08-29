---
title: "_aligned_offset_realloc_dbg"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-realloc-dbg?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Changes the size of a memory block that was allocated with [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) or [`_aligned_offset_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170) (debug version only).

## Syntax

```
void * _aligned_offset_realloc_dbg(
   void *memblock,
   size_t size,
   size_t alignment,
   size_t offset,
   const char *filename,
   int linenumber
);
```

### Parameters

_`memblock`_  
The current memory block pointer.

_`size`_  
The size of the memory allocation.

_`alignment`_  
The alignment value, which must be an integer power of 2.

_`offset`_  
The offset into the memory allocation to force the alignment.

_`filename`_  
Pointer to the name of the source file that requested the **`aligned_offset_realloc`** operation or `NULL`.

_`linenumber`_  
Line number in the source file where the **`aligned_offset_realloc`** operation was requested or `NULL`.

## Return value

**`_aligned_offset_realloc_dbg`** returns a void pointer to the reallocated (and possibly moved) memory block. The return value is `NULL` if the size is zero and the buffer argument isn't `NULL`, or if there isn't enough available memory to expand the block to the given size. In the first case, the original block is freed. In the second case, the original block is unchanged. The return value points to a storage space that's suitably aligned for storage of any type of object. To get a pointer to a type other than void, use a type cast on the return value.

**`_aligned_offset_realloc_dbg`** is a debug version of the [`_aligned_offset_realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-realloc?view=msvc-170) function. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, each call to **`_aligned_offset_realloc_dbg`** is reduced to a call to **`_aligned_offset_realloc`**. Both **`_aligned_offset_realloc`** and **`_aligned_offset_realloc_dbg`** reallocate a memory block in the base heap, but **`_aligned_offset_realloc_dbg`** accommodates several debugging features: buffers on either side of the user portion of the block to test for leaks, and _`filename`_/_`linenumber`_ information to determine the origin of allocation requests. Tracking specific allocation types with a block type parameter isn't a supported debug feature for aligned allocations. Aligned allocations will appear as a `_NORMAL_BLOCK` block type.

Like [`_aligned_offset_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170), **`_aligned_offset_realloc_dbg`** allows a structure to be aligned at an offset within the structure.

`_realloc_dbg` reallocates the specified memory block with slightly more space than the requested _`newSize`_. _`newSize`_ might be greater or less than the size of the originally allocated memory block. The extra space is used by the debug heap manager to link the debug memory blocks and to provide the application with debug header information and overwrite buffers. The reallocation might both move the original memory block to a different location in the heap, and also change the size of the memory block. If the memory block is moved, the contents of the original block are overwritten.

This function sets `errno` to `ENOMEM` if the memory allocation failed or if the requested size was greater than `_HEAP_MAXREQ`. For more information about `errno`, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170). Also, **`_aligned_offset_realloc_dbg`** validates its parameters. If _`alignment`_ isn't a power of 2 or if _`offset`_ is non-zero and greater than or equal to _`size`_, this function invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function returns `NULL` and sets `errno` to `EINVAL`.

For information about how memory blocks are allocated, initialized, and managed in the debug version of the base heap, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170). For information about the allocation block types and how they're used, see [Types of blocks on the debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#types-of-blocks-on-the-debug-heap). For information about the differences between standard heap functions and their debug versions, see [Debug versions of heap allocation functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-versions-of-heap-allocation-functions?view=msvc-170).

## Requirements

Routine

Required header

**`_aligned_offset_realloc_dbg`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)