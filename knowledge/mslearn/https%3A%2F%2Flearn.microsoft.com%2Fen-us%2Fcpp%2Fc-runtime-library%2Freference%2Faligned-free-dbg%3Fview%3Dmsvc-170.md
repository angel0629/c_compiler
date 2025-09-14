---
title: "_aligned_free_dbg"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-free-dbg?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Frees a block of memory that was allocated with [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) or [`_aligned_offset_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170) (debug only).

## Syntax

```
void _aligned_free_dbg(
   void *memblock
);
```

### Parameters

_`memblock`_  
A pointer to the memory block that was returned to the [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) or [`_aligned_offset_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170) function.

The **`_aligned_free_dbg`** function is a debug version of the [`_aligned_free`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-free?view=msvc-170) function. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, each call to **`_aligned_free_dbg`** is reduced to a call to `_aligned_free`. Both `_aligned_free` and **`_aligned_free_dbg`** free a memory block in the base heap, but **`_aligned_free_dbg`** accommodates a debugging feature: the ability to keep freed blocks in the heap's linked list to simulate low memory conditions.

**`_aligned_free_dbg`** performs a validity check on all specified files and block locations before performing the free operation. The application isn't expected to provide this information. When a memory block is freed, the debug heap manager automatically checks the integrity of the buffers on either side of the user portion. It issues an error report if overwriting has occurred. If the `_CRTDBG_DELAY_FREE_MEM_DF` bit field of the [`_crtDbgFlag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crtdbgflag?view=msvc-170) flag is set, the freed block is filled with the value 0xDD, assigned the `_FREE_BLOCK` block type, and kept in the heap's linked list of memory blocks.

If an error occurs in freeing the memory, `errno` is set with information from the operating system on the nature of the failure. For more information, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

For information about how memory blocks are allocated, initialized, and managed in the debug version of the base heap, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170). For information about the allocation block types and how they're used, see [Types of blocks on the debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#types-of-blocks-on-the-debug-heap). For information about the differences between standard heap functions and their debug versions, see [Debug versions of heap allocation functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-versions-of-heap-allocation-functions?view=msvc-170).

## Requirements

Routine

Required header

**`_aligned_free_dbg`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)