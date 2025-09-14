---
title: "_recalloc_dbg"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/recalloc-dbg?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reallocates an array and initializes its elements to 0 (debug version only).

## Syntax

```
void *_recalloc_dbg(
   void *userData,
   size_t num,
   size_t size,
   int blockType,
   const char *filename,
   int linenumber
);
```

### Parameters

_`userData`_  
Pointer to the previously allocated memory block.

_`number`_  
Requested number of memory blocks.

_`size`_  
Requested size of each memory block (bytes).

_`blockType`_  
Requested type of memory block: `_CLIENT_BLOCK` or `_NORMAL_BLOCK`.

For information about the allocation block types and how they're used, see [Types of blocks on the debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#types-of-blocks-on-the-debug-heap).

_`filename`_  
Pointer to name of the source file that requested allocation operation or `NULL`.

_`linenumber`_  
Line number in the source file where allocation operation was requested or `NULL`.

The _`filename`_ and _`linenumber`_ parameters are only available when **`_recalloc_dbg`** has been called explicitly or the [`_CRTDBG_MAP_ALLOC`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crtdbg-map-alloc?view=msvc-170) preprocessor constant has been defined.

## Return value

On successful completion, this function either returns a pointer to the user portion of the reallocated memory block, calls the new handler function, or returns `NULL`. For a complete description of the return behavior, see the following Remarks section. For more information about how the new handler function is used, see the [`_recalloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/recalloc?view=msvc-170) function.

**`_recalloc_dbg`** is a debug version of the [`_recalloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/recalloc?view=msvc-170) function. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, each call to **`_recalloc_dbg`** is reduced to a call to `_recalloc`. Both `_recalloc` and **`_recalloc_dbg`** reallocate a memory block in the base heap, but **`_recalloc_dbg`** accommodates several debugging features: buffers on either side of the user portion of the block to test for leaks, a block type parameter to track specific allocation types, and _`filename`_/_`linenumber`_ information to determine the origin of allocation requests.

**`_recalloc_dbg`** reallocates the specified memory block with slightly more space than the requested size (_`number`_ \* _`size`_) which might be greater or less than the size of the originally allocated memory block. The extra space is used by the debug heap manager to link the debug memory blocks and to provide the application with debug header information and overwrite buffers. The reallocation might result in both moving the original memory block to a different location in the heap, and changing the size of the memory block. The user portion of the block is filled with the value 0xCD and each of the overwrite buffers are filled with 0xFD.

**`_recalloc_dbg`** sets `errno` to `ENOMEM` if a memory allocation fails; `EINVAL` is returned if the amount of memory needed (including the overhead mentioned previously) exceeds `_HEAP_MAXREQ`. For information about this and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

For information about how memory blocks are allocated, initialized, and managed in the debug version of the base heap, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170). For information about the differences between standard heap functions and debug versions, see [Debug versions of heap allocation functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-versions-of-heap-allocation-functions?view=msvc-170).

## Requirements

Routine

Required header

**`_recalloc_dbg`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)