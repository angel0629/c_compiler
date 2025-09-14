---
title: "_recalloc"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/recalloc?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
A combination of `realloc` and `calloc`. Reallocates an array in memory and initializes its elements to 0.

## Syntax

```
void *_recalloc(
   void *memblock,
   size_t num,
   size_t size
);
```

### Parameters

_`memblock`_  
Pointer to previously allocated memory block.

_`number`_  
Number of elements.

_`size`_  
Length in bytes of each element.

## Return value

**`_recalloc`** returns a **`void`** pointer to the reallocated (and possibly moved) memory block.

If there isn't enough available memory to expand the block to the given size, the original block is left unchanged, and `NULL` is returned.

If the requested size is zero, then the block pointed to by _`memblock`_ is freed; the return value is `NULL`, and _`memblock`_ is left pointing at a freed block.

The return value points to a storage space that is suitably aligned for storage of any type of object. To get a pointer to a type other than **`void`**, use a type cast on the return value.

The **`_recalloc`** function changes the size of an allocated memory block. The _`memblock`_ argument points to the beginning of the memory block. If _`memblock`_ is `NULL`, **`_recalloc`** behaves the same way as [`calloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc?view=msvc-170) and allocates a new block of _`number`_ \* _`size`_ bytes. Each element is initialized to 0. If _`memblock`_ isn't `NULL`, it should be a pointer returned by a previous call to `calloc`, [`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170), or [`realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc?view=msvc-170).

Because the new block can be in a new memory location, the pointer returned by **`_recalloc`** isn't guaranteed to be the pointer passed through the _`memblock`_ argument.

**`_recalloc`** sets `errno` to `ENOMEM` if the memory allocation fails or if the amount of memory requested exceeds `_HEAP_MAXREQ`. For information on this and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

**`recalloc`** calls `realloc` in order to use the C++ [`_set_new_mode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-mode?view=msvc-170) function to set the new handler mode. The new handler mode indicates whether, on failure, `realloc` is to call the new handler routine as set by [`_set_new_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-handler?view=msvc-170). By default, `realloc` doesn't call the new handler routine on failure to allocate memory. You can override this default behavior so that, when **`_recalloc`** fails to allocate memory, `realloc` calls the new handler routine in the same way that the **`new`** operator does when it fails for the same reason. To override the default, call

```
_set_new_mode(1);
```

early in the program, or link with NEWMODE.OBJ.

When the application is linked with a debug version of the C run-time libraries, **`_recalloc`** resolves to [`_recalloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/recalloc-dbg?view=msvc-170). For more information about how the heap is managed during the debugging process, see [The CRT debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170).

**`_recalloc`** is marked `__declspec(noalias)` and `__declspec(restrict)`, meaning that the function is guaranteed not to modify global variables, and that the pointer returned isn't aliased. For more information, see [`noalias`](https://learn.microsoft.com/en-us/cpp/cpp/noalias?view=msvc-170) and [`restrict`](https://learn.microsoft.com/en-us/cpp/cpp/restrict?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_recalloc`**

<stdlib.h> and <malloc.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Memory allocation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170)  
[`_recalloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/recalloc-dbg?view=msvc-170)  
[`_aligned_recalloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-recalloc?view=msvc-170)  
[`_aligned_offset_recalloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-recalloc?view=msvc-170)  
[`free`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free?view=msvc-170)  
[Link options](https://learn.microsoft.com/en-us/cpp/c-runtime-library/link-options?view=msvc-170)