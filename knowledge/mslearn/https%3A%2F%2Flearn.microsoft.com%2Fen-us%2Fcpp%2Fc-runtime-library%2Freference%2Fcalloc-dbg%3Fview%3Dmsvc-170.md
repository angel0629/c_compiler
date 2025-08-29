---
title: "_calloc_dbg"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc-dbg?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Allocates memory blocks in the heap with extra space for a debugging header and overwrite buffers (debug version only).

## Syntax

```
void *_calloc_dbg(
   size_t num,
   size_t size,
   int blockType,
   const char *filename,
   int linenumber
);
```

### Parameters

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

The _`filename`_ and _`linenumber`_ parameters are only available when **`_calloc_dbg`** has been called explicitly or the [`_CRTDBG_MAP_ALLOC`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crtdbg-map-alloc?view=msvc-170) preprocessor constant has been defined.

## Return value

On successful completion, this function returns a pointer to the user portion of the last allocated memory block, calls the new handler function, or returns `NULL`. For a complete description of the return behavior, see the Remarks section. For more information about how the new handler function is used, see the [`calloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc?view=msvc-170) function.

**`_calloc_dbg`** is a debug version of the [`calloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc?view=msvc-170) function. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, each call to **`_calloc_dbg`** is reduced to a call to `calloc`. Both `calloc` and **`_calloc_dbg`** allocate _`number`_ memory blocks in the base heap, but **`_calloc_dbg`** offers several debugging features:

*   Buffers on either side of the user portion of the block to test for leaks.
    
*   A block type parameter to track specific allocation types.
    
*   _`filename`_/_`linenumber`_ information to determine the origin of allocation requests.
    

**`_calloc_dbg`** allocates each memory block with slightly more space than the requested _`size`_. The extra space is used by the debug heap manager to link the debug memory blocks and to provide the application with debug header information and overwrite buffers. When the block is allocated, the user portion of the block is filled with the value 0xCD, and each of the overwrite buffers are filled with 0xFD.

**`_calloc_dbg`** sets `errno` to `ENOMEM` if a memory allocation fails; `EINVAL` is returned if the amount of memory needed (including the overhead mentioned previously) exceeds `_HEAP_MAXREQ`. For information about this and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

For information about how memory blocks are allocated, initialized, and managed in the debug version of the base heap, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170). For information about the differences between calling a standard heap function and the debug version, see [Debug versions of heap allocation functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-versions-of-heap-allocation-functions?view=msvc-170).

## Requirements

Routine

Required header

**`_calloc_dbg`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_callocd.c
// This program uses _calloc_dbg to allocate space for
// 40 long integers. It initializes each element to zero.

#include <stdio.h>
#include <malloc.h>
#include <crtdbg.h>

int main( void )
{
    long *bufferN, *bufferC;

    // Call _calloc_dbg to include the filename and line number
    // of our allocation request in the header and also so we can
    // allocate CLIENT type blocks specifically
    bufferN = (long *)_calloc_dbg( 40, sizeof(long), _NORMAL_BLOCK, __FILE__, __LINE__ );
    bufferC = (long *)_calloc_dbg( 40, sizeof(long), _CLIENT_BLOCK, __FILE__, __LINE__ );
    if( bufferN != NULL && bufferC != NULL )
        printf( "Allocated memory successfully\n" );
    else
        printf( "Problem allocating memory\n" );

    // _free_dbg must be called to free CLIENT type blocks
    free( bufferN );
    _free_dbg( bufferC, _CLIENT_BLOCK );
}
```

```
Allocated memory successfully
```

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)  
[`calloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc?view=msvc-170)  
[`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170)  
[`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170)