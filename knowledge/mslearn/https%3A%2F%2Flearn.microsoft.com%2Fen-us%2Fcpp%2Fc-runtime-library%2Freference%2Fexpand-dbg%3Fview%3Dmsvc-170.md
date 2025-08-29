---
title: "_expand_dbg"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/expand-dbg?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Resizes a specified block of memory in the heap by expanding or contracting the block (debug version only).

## Syntax

```
void *_expand_dbg(
   void *userData,
   size_t newSize,
   int blockType,
   const char *filename,
   int lineNumber
);
```

### Parameters

_`userData`_  
Pointer to the previously allocated memory block.

_`newSize`_  
Requested new size for the block (in bytes).

_`blockType`_  
Requested type for resized block: `_CLIENT_BLOCK` or `_NORMAL_BLOCK`.

_`filename`_  
Pointer to the name of the source file that requested expand operation or `NULL`.

_`lineNumber`_  
Line number in the source file where the expand operation was requested or `NULL`.

The _`filename`_ and _`lineNumber`_ parameters are only available when **`_expand_dbg`** has been called explicitly or the [`_CRTDBG_MAP_ALLOC`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crtdbg-map-alloc?view=msvc-170) preprocessor constant has been defined.

## Return value

On successful completion, **`_expand_dbg`** returns a pointer to the resized memory block. Because the memory isn't moved, the address is the same as the userData. If an error occurred or the block couldn't be expanded to the requested size, it returns `NULL`. If a failure occurs, `errno` is with information from the operating system about the nature of the failure. For more information about `errno`, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_expand_dbg`** function is a debug version of the \_[`expand`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/expand?view=msvc-170) function. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, each call to **`_expand_dbg`** is reduced to a call to `_expand`. Both `_expand` and **`_expand_dbg`** resize a memory block in the base heap, but **`_expand_dbg`** accommodates several debugging features: buffers on either side of the user portion of the block to test for leaks, a block type parameter to track specific allocation types, and _`filename`_/_`lineNumber`_ information to determine the origin of allocation requests.

**`_expand_dbg`** resizes the specified memory block with slightly more space than the requested _`newSize`_. _`newSize`_ might be greater or less than the size of the originally allocated memory block. The extra space is used by the debug heap manager to link the debug memory blocks and to provide the application with debug header information and overwrite buffers. The resize is accomplished by either expanding or contracting the original memory block. **`_expand_dbg`** doesn't move the memory block, as does the [`_realloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc-dbg?view=msvc-170) function.

When _`newSize`_ is greater than the original block size, the memory block is expanded. During an expansion, if the memory block can't be expanded to accommodate the requested size, `NULL` is returned. When _`newSize`_ is less than the original block size, the memory block is contracted until the new size is obtained.

For information about how memory blocks are allocated, initialized, and managed in the debug version of the base heap, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170). For information about the allocation block types and how they're used, see [Types of blocks on the debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#types-of-blocks-on-the-debug-heap). For information about the differences between standard heap functions and debug versions, see [Debug versions of heap allocation functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-versions-of-heap-allocation-functions?view=msvc-170).

This function validates its parameters. If _`userData`_ is a null pointer, or if size is greater than `_HEAP_MAXREQ`, this function invokes an invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the function returns `NULL`.

## Requirements

Routine

Required header

**`_expand_dbg`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## Example

```
// crt_expand_dbg.c
//
// This program allocates a block of memory using _malloc_dbg
// and then calls _msize_dbg to display the size of that block.
// Next, it uses _expand_dbg to expand the amount of
// memory used by the buffer and then calls _msize_dbg again to
// display the new amount of memory allocated to the buffer.
//

#include <stdio.h>
#include <malloc.h>
#include <stdlib.h>
#include <crtdbg.h>

int main( void )
{
   long *buffer;
   size_t size;

   // Call _malloc_dbg to include the filename and line number
   // of our allocation request in the header
   buffer = (long *)_malloc_dbg( 40 * sizeof(long),
                                 _NORMAL_BLOCK, __FILE__, __LINE__ );
   if( buffer == NULL )
      exit( 1 );

   // Get the size of the buffer by calling _msize_dbg
   size = _msize_dbg( buffer, _NORMAL_BLOCK );
   printf( "Size of block after _malloc_dbg of 40 longs: %u\n", size );

   // Expand the buffer using _expand_dbg and show the new size
   buffer = (long *)_expand_dbg( buffer, size + sizeof(long),
                                 _NORMAL_BLOCK, __FILE__, __LINE__ );

   if( buffer == NULL )
      exit( 1 );
   size = _msize_dbg( buffer, _NORMAL_BLOCK );
   printf( "Size of block after _expand_dbg of 1 more long: %u\n",
           size );

   free( buffer );
   exit( 0 );
}
```

```
Size of block after _malloc_dbg of 40 longs: 160
Size of block after _expand_dbg of 1 more long: 164
```

The output of this program depends on your computer's ability to expand all the sections. If all sections are expanded, the output is reflected in the Output section.

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)  
[`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170)