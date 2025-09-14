---
title: "_realloc_dbg"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc-dbg?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reallocates a specified block of memory in the heap by moving and/or resizing the block (debug version only).

## Syntax

```
void *_realloc_dbg(
   void *userData,
   size_t newSize,
   int blockType,
   const char *filename,
   int linenumber
);
```

### Parameters

_`userData`_  
Pointer to the previously allocated memory block.

_`newSize`_  
Requested size for the reallocated block (bytes).

_`blockType`_  
Requested type for the reallocated block: `_CLIENT_BLOCK` or `_NORMAL_BLOCK`.

_`filename`_  
Pointer to the name of the source file that requested the `realloc` operation or `NULL`.

_`linenumber`_  
Line number in the source file where the `realloc` operation was requested or `NULL`.

The _`filename`_ and _`linenumber`_ parameters are only available when **`_realloc_dbg`** has been called explicitly or the [`_CRTDBG_MAP_ALLOC`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crtdbg-map-alloc?view=msvc-170) preprocessor constant has been defined.

## Return value

On successful completion, this function either returns a pointer to the user portion of the reallocated memory block, calls the new handler function, or returns `NULL`. For a complete description of the return behavior, see the following Remarks section. For more information about how the new handler function is used, see the [`realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc?view=msvc-170) function.

**`_realloc_dbg`** is a debug version of the [`realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc?view=msvc-170) function. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, each call to **`_realloc_dbg`** is reduced to a call to `realloc`. Both `realloc` and **`_realloc_dbg`** reallocate a memory block in the base heap, but **`_realloc_dbg`** accommodates several debugging features: buffers on either side of the user portion of the block to test for leaks, a block type parameter to track specific allocation types, and _`filename`_/_`linenumber`_ information to determine the origin of allocation requests.

**`_realloc_dbg`** reallocates the specified memory block with slightly more space than the requested _`newSize`_. _`newSize`_ might be greater or less than the size of the originally allocated memory block. The extra space is used by the debug heap manager to link the debug memory blocks and to provide the application with debug header information and overwrite buffers. The reallocation might result in both moving the original memory block to a different location in the heap, and changing the size of the memory block. If the memory block is moved, the contents of the original block are overwritten.

**`_realloc_dbg`** sets `errno` to `ENOMEM` if a memory allocation fails or if the amount of memory needed (including the overhead mentioned previously) exceeds `_HEAP_MAXREQ`. For information about this and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

For information about how memory blocks are allocated, initialized, and managed in the debug version of the base heap, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170). For information about the allocation block types and how they're used, see [Types of blocks on the debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#types-of-blocks-on-the-debug-heap). For information about the differences between standard heap functions and debug versions, see [Debug versions of heap allocation functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-versions-of-heap-allocation-functions?view=msvc-170).

## Requirements

Routine

Required header

**`_realloc_dbg`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## Example

See the example in the [`_msize_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/msize-dbg?view=msvc-170) article.

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)  
[`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170)