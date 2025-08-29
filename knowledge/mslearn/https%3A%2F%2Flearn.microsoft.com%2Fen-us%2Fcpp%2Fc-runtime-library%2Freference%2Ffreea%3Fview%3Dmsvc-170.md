---
title: "_freea"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freea?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Deallocates or frees a memory block.

## Syntax

```
void _freea(
   void *memblock
);
```

### Parameters

_`memblock`_  
Previously allocated memory block to be freed.

## Return value

None.

The **`_freea`** function deallocates a memory block (_`memblock`_) that was previously allocated by a call to [`_malloca`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloca?view=msvc-170). **`_freea`** checks to see if the memory was allocated on the heap or the stack. If it was allocated on the stack, **`_freea`** does nothing. If it was allocated on the heap, the number of freed bytes is equivalent to the number of bytes requested when the block was allocated. If _`memblock`_ is `NULL`, the pointer is ignored, and **`_freea`** immediately returns. Attempting to free an invalid pointer (a pointer to a memory block that wasn't allocated by `_malloca`) might affect subsequent allocation requests and cause errors.

**`_freea`** calls `free` internally if it finds that the memory is allocated on the heap. Whether the memory is on the heap or the stack is determined by a marker placed in memory at the address immediately preceding the allocated memory.

If an error occurs in freeing the memory, `errno` is set with information from the operating system on the nature of the failure. For more information, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

After a memory block has been freed, [`_heapmin`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapmin?view=msvc-170) minimizes the amount of free memory on the heap by coalescing the unused regions and releasing them back to the operating system. Freed memory that isn't released to the operating system is restored to the free pool and is available for allocation again.

A call to **`_freea`** must accompany all calls to `_malloca`. It's also an error to call **`_freea`** twice on the same memory. When the application is linked with a debug version of the C run-time libraries, particularly with [`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170) features enabled by defining `_CRTDBG_MAP_ALLOC`, it's easier to find missing or duplicated calls to **`_freea`**. For more information about how the heap is managed during the debugging process, see [The CRT debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170).

**`_freea`** is marked `__declspec(noalias)`, meaning that the function is guaranteed not to modify global variables. For more information, see [`noalias`](https://learn.microsoft.com/en-us/cpp/cpp/noalias?view=msvc-170).

## Requirements

Function

Required header

**`_freea`**

<stdlib.h> and <malloc.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`_malloca`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloca?view=msvc-170).

## See also

[Memory allocation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170)  
[`_malloca`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloca?view=msvc-170)  
[`calloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc?view=msvc-170)  
[`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170)  
[`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170)  
[`realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc?view=msvc-170)  
[`_free_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free-dbg?view=msvc-170)  
[`_heapmin`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapmin?view=msvc-170)