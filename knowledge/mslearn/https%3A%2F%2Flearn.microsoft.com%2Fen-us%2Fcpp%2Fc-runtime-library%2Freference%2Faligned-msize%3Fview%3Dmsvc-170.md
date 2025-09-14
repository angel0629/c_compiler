---
title: "_aligned_msize"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-msize?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns the size of a memory block allocated in the heap.

## Syntax

```
size_t _aligned_msize(
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

The **`_aligned_msize`** function returns the size, in bytes, of the memory block allocated by a call to [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) or [`_aligned_realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-realloc?view=msvc-170). The _`alignment`_ and _`offset`_ values must be the same as the values passed to the function that allocated the block.

When the application is linked with a debug version of the C run-time libraries, **`_aligned_msize`** resolves to [`_aligned_msize_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-msize-dbg?view=msvc-170). For more information about how the heap is managed during the debugging process, see [The CRT debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170).

This function validates its parameter. If _`memblock`_ is a null pointer or _`alignment`_ isn't a power of 2, **`_aligned_msize`** invokes an invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If the error is handled, the function sets `errno` to `EINVAL` and returns -1.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_aligned_msize`**

<malloc.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[Memory allocation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170)