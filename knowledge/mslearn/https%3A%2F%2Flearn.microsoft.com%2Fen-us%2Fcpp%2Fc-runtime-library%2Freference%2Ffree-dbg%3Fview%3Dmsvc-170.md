---
title: "_free_dbg"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free-dbg?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Frees a block of memory in the heap (debug version only).

## Syntax

```
void _free_dbg(
   void *userData,
   int blockType
);
```

### Parameters

_`userData`_  
Pointer to the allocated memory block to be freed.

_`blockType`_  
Type of allocated memory block to be freed: `_CLIENT_BLOCK`, `_NORMAL_BLOCK`, or `_IGNORE_BLOCK`.

The **`_free_dbg`** function is a debug version of the [`free`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free?view=msvc-170) function. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, each call to **`_free_dbg`** is reduced to a call to `free`. Both `free` and **`_free_dbg`** free a memory block in the base heap, but **`_free_dbg`** accommodates two debugging features: the ability to keep freed blocks in the heap's linked list to simulate low memory conditions and a block type parameter to free specific allocation types.

**`_free_dbg`** performs a validity check on all specified files and block locations before performing the free operation. The application isn't expected to provide this information. When a memory block is freed, the debug heap manager automatically checks the integrity of the buffers on either side of the user portion. It issues an error report if it detects an overwrite. If the `_CRTDBG_DELAY_FREE_MEM_DF` bit field of the [`_crtDbgFlag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crtdbgflag?view=msvc-170) flag is set, the freed block is filled with the value 0xDD, assigned the `_FREE_BLOCK` block type, and kept in the heap's linked list of memory blocks.

If an error occurs in freeing the memory, `errno` is set with information from the operating system on the nature of the failure. For more information, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

For information about how memory blocks are allocated, initialized, and managed in the debug version of the base heap, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170). For information about the allocation block types and how they're used, see [Types of blocks on the debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#types-of-blocks-on-the-debug-heap). For information about the differences between calling a standard heap function and the debug version, see [Debug versions of heap allocation functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-versions-of-heap-allocation-functions?view=msvc-170).

## Requirements

Routine

Required header

**`_free_dbg`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

For a sample of how to use **`_free_dbg`**, see [`crt_dbg2`](https://github.com/Microsoft/VCSamples/tree/master/VC2010Samples/crt/crt_dbg2).

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)  
[`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170)