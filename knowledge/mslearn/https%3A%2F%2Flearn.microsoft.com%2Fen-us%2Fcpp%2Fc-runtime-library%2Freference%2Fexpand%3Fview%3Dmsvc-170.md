---
title: "_expand"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/expand?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Changes the size of a memory block.

## Syntax

```
void *_expand(
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

**`_expand`** returns a void pointer to the reallocated memory block. **`_expand`**, unlike `realloc`, can't move a block to change its size. Thus, if there's sufficient memory available to expand the block without moving it, the _`memblock`_ parameter to **`_expand`** is the same as the return value.

**`_expand`** returns `NULL` when an error is detected during its operation. For example, if **`_expand`** is used to shrink a memory block, it might detect corruption in the small block heap or an invalid block pointer and return `NULL`.

If there isn't sufficient memory available to expand the block without moving it, the function returns `NULL`. **`_expand`** never returns a block expanded to a size less than requested. If a failure occurs, `errno` indicates the nature of the failure. For more information about `errno`, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The return value points to a storage space that is suitably aligned for storage of any type of object. To check the new size of the item, use `_msize`. To get a pointer to a type other than **`void`**, use a type cast on the return value.

The **`_expand`** function changes the size of a previously allocated memory block by trying to expand or contract the block without moving its location in the heap. The _`memblock`_ parameter points to the beginning of the block. The _`size`_ parameter gives the new size of the block, in bytes. The contents of the block are unchanged up to the shorter of the new and old sizes. _`memblock`_ shouldn't be a block that has been freed.

Note

On 64-bit platforms, **`_expand`** might not contract the block if the new size is less than the current size; in particular, if the block was less than 16K in size and therefore allocated in the Low Fragmentation Heap, **`_expand`** leaves the block unchanged and returns _`memblock`_.

When the application is linked with a debug version of the C run-time libraries, **`_expand`** resolves to [`_expand_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/expand-dbg?view=msvc-170). For more information about how the heap is managed during the debugging process, see [The CRT debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170).

This function validates its parameters. If _`memblock`_ is a null pointer, this function invokes an invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the function returns `NULL`. If _`size`_ is greater than `_HEAP_MAXREQ`, `errno` is set to `ENOMEM`, and the function returns `NULL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`_expand`**

<malloc.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_expand.c

#include <stdio.h>
#include <malloc.h>
#include <stdlib.h>

int main( void )
{
   char *bufchar;
   printf( "Allocate a 512 element buffer\n" );
   if( (bufchar = (char *)calloc( 512, sizeof( char ) )) == NULL )
      exit( 1 );
   printf( "Allocated %d bytes at %Fp\n",
         _msize( bufchar ), (void *)bufchar );
   if( (bufchar = (char *)_expand( bufchar, 1024 )) == NULL )
      printf( "Can't expand" );
   else
      printf( "Expanded block to %d bytes at %Fp\n",
            _msize( bufchar ), (void *)bufchar );
   // Free memory
   free( bufchar );
   exit( 0 );
}
```

```
Allocate a 512 element buffer
Allocated 512 bytes at 002C12BC
Expanded block to 1024 bytes at 002C12BC
```

## See also

[Memory allocation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170)  
[`calloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc?view=msvc-170)  
[`free`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free?view=msvc-170)  
[`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170)  
[`_msize`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/msize?view=msvc-170)  
[`realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc?view=msvc-170)