---
title: "_msize"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/msize?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns the size of a memory block allocated in the heap.

## Syntax

```
size_t _msize(
   void *memblock
);
```

### Parameters

_`memblock`_  
Pointer to the memory block.

## Return value

**`_msize`** returns the size (in bytes) as an unsigned integer.

The **`_msize`** function returns the size, in bytes, of the memory block allocated by a call to **`calloc`**, **`malloc`**, or **`realloc`**.

When the application is linked with a debug version of the C run-time libraries, **`_msize`** resolves to [`_msize_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/msize-dbg?view=msvc-170). For more information about how the heap is managed during the debugging process, see [The CRT debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170).

This function validates its parameter. If _`memblock`_ is a `NULL` pointer, **`_msize`** invokes an invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If the error is handled, the function sets `errno` to `EINVAL` and returns -1 (18,446,744,073,709,551,615 unsigned).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_msize`**

`<malloc.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

See the example for [`realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc?view=msvc-170).

## See also

[Memory allocation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170)  
[`calloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc?view=msvc-170)  
[`_expand`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/expand?view=msvc-170)  
[`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170)  
[`realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc?view=msvc-170)