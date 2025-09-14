---
title: "calloc"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Allocates an array in memory with elements initialized to 0.

## Syntax

```
void *calloc(
   size_t number,
   size_t size
);
```

### Parameters

_`number`_  
Number of elements.

_`size`_  
Length in bytes of each element.

## Return value

**`calloc`** returns a pointer to the allocated space. The storage space pointed to by the return value is suitably aligned for storage of any type of object. To get a pointer to a type other than **`void`**, use a type cast on the return value.

The **`calloc`** function allocates storage space for an array of _`number`_ elements, each of length _`size`_ bytes. Each element is initialized to 0.

**`calloc`** sets `errno` to `ENOMEM` if a memory allocation fails or if the amount of memory requested exceeds `_HEAP_MAXREQ`. For information on this and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

In the Microsoft implementation, if _`number`_ or _`size`_ is zero, **`calloc`** returns a pointer to an allocated block of non-zero size. An attempt to read or write through the returned pointer leads to undefined behavior.

**`calloc`** uses the C++ [`_set_new_mode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-mode?view=msvc-170) function to set the _new handler mode_. The new handler mode indicates whether, on failure, **`calloc`** is to call the new handler routine as set by [`_set_new_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-handler?view=msvc-170). By default, **`calloc`** doesn't call the new handler routine on failure to allocate memory. You can override this default behavior so that, when **`calloc`** fails to allocate memory, it calls the new handler routine in the same way that the **`new`** operator does when it fails for the same reason. To override the default, call

```
_set_new_mode(1);
```

early in your program, or link with _`NEWMODE.OBJ`_ (see [Link options](https://learn.microsoft.com/en-us/cpp/c-runtime-library/link-options?view=msvc-170)).

When the application is linked with a debug version of the C run-time libraries, **`calloc`** resolves to [`_calloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc-dbg?view=msvc-170). For more information about how the heap is managed during the debugging process, see [The CRT debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170).

**`calloc`** is marked `__declspec(noalias)` and `__declspec(restrict)`, meaning that the function is guaranteed not to modify global variables, and that the pointer returned isn't aliased. For more information, see [`noalias`](https://learn.microsoft.com/en-us/cpp/cpp/noalias?view=msvc-170) and [`restrict`](https://learn.microsoft.com/en-us/cpp/cpp/restrict?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`calloc`**

`<stdlib.h>` and `<malloc.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_calloc.c
// This program uses calloc to allocate space for
// 40 long integers. It initializes each element to zero.

#include <stdio.h>
#include <malloc.h>

int main( void )
{
   long *buffer;

   buffer = (long *)calloc( 40, sizeof( long ) );
   if( buffer != NULL )
      printf( "Allocated 40 long integers\n" );
   else
      printf( "Can't allocate memory\n" );
   free( buffer );
}
```

```
Allocated 40 long integers
```

## See also

[Memory allocation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170)  
[`free`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free?view=msvc-170)  
[`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170)  
[`realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc?view=msvc-170)