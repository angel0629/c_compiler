---
title: "_aligned_recalloc_dbg"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-recalloc-dbg?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Changes the size of a memory block that was allocated with [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) or [`_aligned_offset_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170) and initializes the memory to 0 (debug version only).

## Syntax

```
void * _aligned_recalloc_dbg(
   void * memblock,
   size_t num,
   size_t size,
   size_t alignment,
   const char *filename,
   int linenumber
);
```

### Parameters

_`memblock`_  
The current memory block pointer.

_`number`_  
The number of elements.

_`size`_  
The size in bytes of each element.

_`alignment`_  
The alignment value, which must be an integer power of 2.

_`filename`_  
Pointer to name of the source file that requested allocation operation or `NULL`.

_`linenumber`_  
Line number in the source file where allocation operation was requested or `NULL`.

## Return value

**`_aligned_recalloc_dbg`** returns a `void` pointer to the reallocated (and possibly moved) memory block. The return value is `NULL` if the size is zero and the buffer argument isn't `NULL`, or if there isn't enough available memory to expand the block to the given size. In the first case, the original block is freed. In the second case, the original block is unchanged. The return value points to a storage space that is suitably aligned for storage of any type of object. To get a pointer to a type other than `void`, use a type cast on the return value.

It's an error to reallocate memory and change the alignment of a block.

**`_aligned_recalloc_dbg`** is a debug version of the [`_aligned_recalloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-recalloc?view=msvc-170) function. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, each call to **`_aligned_recalloc_dbg`** is reduced to a call to `_aligned_recalloc`. Both `_aligned_recalloc` and **`_aligned_recalloc_dbg`** reallocate a memory block in the base heap, but **`_aligned_recalloc_dbg`** accommodates several debugging features: buffers on either side of the user portion of the block to test for leaks, and _`filename`_/_`linenumber`_ information to determine the origin of allocation requests. Tracking specific allocation types with a block type parameter isn't a supported debug feature for aligned allocations. Aligned allocations will appear as a `_NORMAL_BLOCK` block type.

**`_aligned_recalloc_dbg`** reallocates the specified memory block with slightly more space than the requested size (_`number`_ \* _`size`_) which might be greater or less than the size of the originally allocated memory block. The extra space is used by the debug heap manager to link the debug memory blocks and to provide the application with debug header information and overwrite buffers. The reallocation might both move the original memory block to a different location in the heap, and change the size of the memory block. The user portion of the block is filled with the value 0xCD, and the overwrite buffers are filled with 0xFD.

**`_aligned_recalloc_dbg`** sets `errno` to `ENOMEM` if a memory allocation fails; `EINVAL` is returned if the amount of memory needed (including the overhead mentioned previously) exceeds `_HEAP_MAXREQ`. For information about this and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

Also, **`_aligned_recalloc_dbg`** validates its parameters. If _`alignment`_ isn't a power of 2, this function invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function returns `NULL` and sets `errno` to `EINVAL`.

For information about how memory blocks are allocated, initialized, and managed in the debug version of the base heap, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170). For information about the allocation block types and how they're used, see [Types of blocks on the debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#types-of-blocks-on-the-debug-heap). For information about the differences between standard heap functions and their debug versions, see [Debug versions of heap allocation functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-versions-of-heap-allocation-functions?view=msvc-170).

## Requirements

Routine

Required header

**`_aligned_recalloc_dbg`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)