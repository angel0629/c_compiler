---
title: "_aligned_msize_dbg"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-msize-dbg?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns the size of a memory block allocated in the heap (debug version only).

## Syntax

```
size_t _aligned_msize_dbg(
   void *memblock,
   size_t alignment,
   size_t offset
);
```

### Parameters

_`memblock`_  
Pointer to the memory block.

_`alignment`_  
The alignment value, which must be an integer power of 2.

_`offset`_  
The offset into the memory allocation to force the alignment.

## Return value

Returns the size (in bytes) as an unsigned integer.

The _`alignment`_ and _`offset`_ values must be the same as the values passed to the function that allocated the block.

**`_aligned_msize_dbg`** is a debug version of the [`_aligned_msize`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-msize?view=msvc-170) function. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, each call to **`_aligned_msize_dbg`** is reduced to a call to `_aligned_msize`. Both `_aligned_msize` and **`_aligned_msize_dbg`** calculate the size of a memory block in the base heap, but **`_aligned_msize_dbg`** adds a debugging feature: It includes the buffers on either side of the user portion of the memory block in the returned size.

This function validates its parameter. If _`memblock`_ is a null pointer or _`alignment`_ isn't a power of 2, `_msize` invokes an invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If the error is handled, the function sets `errno` to `EINVAL` and returns -1.

For information about how memory blocks are allocated, initialized, and managed in the debug version of the base heap, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170). For information about the allocation block types and how they're used, see [Types of blocks on the debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#types-of-blocks-on-the-debug-heap). For information about the differences between standard heap functions and their debug versions, see [Debug versions of heap allocation functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-versions-of-heap-allocation-functions?view=msvc-170).

## Requirements

Routine

Required header

**`_aligned_msize_dbg`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## See also

[Memory allocation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170)