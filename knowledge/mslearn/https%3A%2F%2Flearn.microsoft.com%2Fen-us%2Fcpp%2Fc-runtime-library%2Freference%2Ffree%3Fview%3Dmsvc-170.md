---
title: "free"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Deallocates or frees a memory block.

## Syntax

```
void free(
   void *memblock
);
```

### Parameters

_`memblock`_  
Previously allocated memory block to be freed.

The **`free`** function deallocates a memory block (_`memblock`_) that was previously allocated by a call to **`calloc`**, **`malloc`**, or **`realloc`**. The number of freed bytes is equivalent to the number of bytes requested when the block was allocated (or reallocated, for **`realloc`**). If _`memblock`_ is `NULL`, the pointer is ignored, and **`free`** immediately returns. Attempting to free an invalid pointer (a pointer to a memory block that wasn't allocated by **`calloc`**, **`malloc`**, or **`realloc`**) may affect subsequent allocation requests and cause errors.

If an error occurs in freeing the memory, `errno` is set with information from the operating system on the nature of the failure. For more information, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

After a memory block has been freed, [`_heapmin`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapmin?view=msvc-170) minimizes the amount of free memory on the heap by coalescing the unused regions and releasing them back to the operating system. Freed memory that isn't released to the operating system is restored to the free pool and is available for allocation again.

When the application is linked with a debug version of the C run-time libraries, **`free`** resolves to [`_free_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free-dbg?view=msvc-170). For more information about how the heap is managed during the debugging process, see [The CRT debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170).

**`free`** is marked `__declspec(noalias)`, meaning that the function is guaranteed not to modify global variables. For more information, see [`noalias`](https://learn.microsoft.com/en-us/cpp/cpp/noalias?view=msvc-170).

To free memory allocated with [`_malloca`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloca?view=msvc-170), use [`_freea`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freea?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`free`**

`<stdlib.h>` and `<malloc.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170).

## See also

[Memory allocation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170)  
[`_alloca`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/alloca?view=msvc-170)  
[`calloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc?view=msvc-170)  
[`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170)  
[`realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc?view=msvc-170)  
[`_free_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free-dbg?view=msvc-170)  
[`_heapmin`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapmin?view=msvc-170)  
[`_freea`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freea?view=msvc-170)