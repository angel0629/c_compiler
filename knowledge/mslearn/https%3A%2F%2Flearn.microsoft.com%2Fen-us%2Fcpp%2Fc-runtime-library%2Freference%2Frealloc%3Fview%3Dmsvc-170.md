---
title: "realloc"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reallocate memory blocks.

## Syntax

```
void *realloc(
   void *memblock,
   size_t size
);
```

### Parameters

_`memblock`_  
Pointer to previously allocated memory block.

_`size`_  
New size in bytes.

## Return value

**`realloc`** returns a **`void`** pointer to the reallocated (and possibly moved) memory block.

If there isn't enough available memory to expand the block to the given size, the original block is left unchanged, and `NULL` is returned.

If _`size`_ is zero, then the block pointed to by _`memblock`_ is freed; the return value is `NULL`, and _`memblock`_ is left pointing at a freed block.

The return value points to a storage space that is suitably aligned for storage of any type of object. To get a pointer to a type other than **`void`**, use a type cast on the return value.

Note

**`realloc`** hasn't been updated to implement C17 behavior because the new behavior isn't compatible with the Windows operating system.

The **`realloc`** function changes the size of an allocated memory block. The _`memblock`_ argument points to the beginning of the memory block. If _`memblock`_ is `NULL`, **`realloc`** behaves the same way as **`malloc`** and allocates a new block of _`size`_ bytes. If _`memblock`_ isn't `NULL`, it should be a pointer returned by a previous call to **`calloc`**, **`malloc`**, or **`realloc`**.

The _`size`_ argument gives the new size of the block, in bytes. The contents of the block are unchanged up to the shorter of the new and old sizes, although the new block can be in a different location. Because the new block can be in a new memory location, the pointer returned by **`realloc`** isn't guaranteed to be the pointer passed through the _`memblock`_ argument. **`realloc`** doesn't zero newly allocated memory if there's buffer growth.

**`realloc`** sets `errno` to `ENOMEM` if the memory allocation fails or if the amount of memory requested exceeds `_HEAP_MAXREQ`. For information on this and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

**`realloc`** calls **`malloc`** in order to use the C++ [`_set_new_mode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-mode?view=msvc-170) function to set the new handler mode. The new handler mode indicates whether, on failure, **`malloc`** is to call the new handler routine as set by [`_set_new_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-handler?view=msvc-170). By default, **`malloc`** doesn't call the new handler routine on failure to allocate memory. You can override this default behavior so that, when **`realloc`** fails to allocate memory, **`malloc`** calls the new handler routine in the same way that the **`new`** operator does when it fails for the same reason. To override the default, call

```
_set_new_mode(1);
```

early in ones program, or link with NEWMODE.OBJ (see [Link options](https://learn.microsoft.com/en-us/cpp/c-runtime-library/link-options?view=msvc-170)).

When the application is linked with a debug version of the C run-time libraries, **`realloc`** resolves to [`_realloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc-dbg?view=msvc-170). For more information about how the heap is managed during the debugging process, see [The CRT debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170).

**`realloc`** is marked `__declspec(noalias)` and `__declspec(restrict)`, meaning that the function is guaranteed not to modify global variables, and that the pointer returned isn't aliased. For more information, see [`noalias`](https://learn.microsoft.com/en-us/cpp/cpp/noalias?view=msvc-170) and [`restrict`](https://learn.microsoft.com/en-us/cpp/cpp/restrict?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`realloc`**

`<stdlib.h>` and `<malloc.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_realloc.c
// This program allocates a block of memory for
// buffer and then uses _msize to display the size of that
// block. Next, it uses realloc to expand the amount of
// memory used by buffer and then calls _msize again to
// display the new amount of memory allocated to buffer.

#include <stdio.h>
#include <malloc.h>
#include <stdlib.h>

int main( void )
{
   long *buffer, *oldbuffer;
   size_t size;

   if( (buffer = (long *)malloc( 1000 * sizeof( long ) )) == NULL )
      exit( 1 );

   size = _msize( buffer );
   printf_s( "Size of block after malloc of 1000 longs: %u\n", size );

   // Reallocate and show new size:
   oldbuffer = buffer;     // save pointer in case realloc fails
   if( (buffer = realloc( buffer, size + (1000 * sizeof( long )) ))
        ==  NULL )
   {
      free( oldbuffer );  // free original block
      exit( 1 );
   }
   size = _msize( buffer );
   printf_s( "Size of block after realloc of 1000 more longs: %u\n",
            size );

   free( buffer );
   exit( 0 );
}
```

```
Size of block after malloc of 1000 longs: 4000
Size of block after realloc of 1000 more longs: 8000
```

## See also

[Memory allocation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170)  
[`calloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc?view=msvc-170)  
[`free`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free?view=msvc-170)  
[`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170)