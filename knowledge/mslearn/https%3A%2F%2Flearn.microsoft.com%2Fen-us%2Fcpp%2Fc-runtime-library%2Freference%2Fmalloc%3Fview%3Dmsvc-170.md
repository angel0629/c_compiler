---
title: "malloc"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Allocates memory blocks.

## Syntax

```
void *malloc(
   size_t size
);
```

### Parameters

_`size`_  
Bytes to allocate.

## Return value

**`malloc`** returns a void pointer to the allocated space, or `NULL` if there's insufficient memory available. To return a pointer to a type other than **`void`**, use a type cast on the return value. The storage space pointed to by the return value is suitably aligned for storage of any type of object that has an alignment requirement less than or equal to that of the fundamental alignment. (In Visual C++, the fundamental alignment is the alignment that's required for a **`double`**, or 8 bytes. In code that targets 64-bit platforms, it's 16 bytes.) Use [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) to allocate storage for objects that have a larger alignment requirement—for example, the SSE types [`__m128`](https://learn.microsoft.com/en-us/cpp/cpp/m128?view=msvc-170) and **`__m256`**, and types that are declared by using `__declspec(align( n ))` where **`n`** is greater than 8. If _`size`_ is 0, **`malloc`** allocates a zero-length item in the heap and returns a valid pointer to that item. Always check the return from **`malloc`**, even if the amount of memory requested is small.

The **`malloc`** function allocates a memory block of at least _`size`_ bytes. The block may be larger than _`size`_ bytes because of the space that's required for alignment and maintenance information.

**`malloc`** sets `errno` to `ENOMEM` if a memory allocation fails or if the amount of memory requested exceeds `_HEAP_MAXREQ`. For information about this and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The startup code uses **`malloc`** to allocate storage for the **`_environ`**, _`envp`_, and _`argv`_ variables. The following functions and their wide-character counterparts also call **`malloc`**.

The C++ [`_set_new_mode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-mode?view=msvc-170) function sets the new handler mode for **`malloc`**. The new handler mode indicates whether, on failure, **`malloc`** is to call the new handler routine as set by [`_set_new_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-handler?view=msvc-170). By default, **`malloc`** doesn't call the new handler routine on failure to allocate memory. You can override this default behavior so that, when **`malloc`** fails to allocate memory, **`malloc`** calls the new handler routine in the same way that the **`new`** operator does when it fails for the same reason. To override the default, call `_set_new_mode(1)` early in your program, or link with `NEWMODE.OBJ` (see [Link options](https://learn.microsoft.com/en-us/cpp/c-runtime-library/link-options?view=msvc-170)).

When the application is linked with a debug version of the C run-time libraries, **`malloc`** resolves to [`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170). For more information about how the heap is managed during the debugging process, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170).

**`malloc`** is marked `__declspec(noalias)` and `__declspec(restrict)`. These attributes mean that the function is guaranteed not to modify global variables, and that the pointer returned isn't aliased. For more information, see [`noalias`](https://learn.microsoft.com/en-us/cpp/cpp/noalias?view=msvc-170) and [`restrict`](https://learn.microsoft.com/en-us/cpp/cpp/restrict?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`malloc`**

`<stdlib.h>` and `<malloc.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_malloc.c
// This program allocates memory with
// malloc, then frees the memory with free.

#include <stdlib.h>   // For _MAX_PATH definition
#include <stdio.h>
#include <malloc.h>

int main( void )
{
   char *string;

   // Allocate space for a path name
   string = malloc( _MAX_PATH );

   // In a C++ file, explicitly cast malloc's return.  For example,
   // string = (char *)malloc( _MAX_PATH );

   if( string == NULL )
      printf( "Insufficient memory available\n" );
   else
   {
      printf( "Memory space allocated for path name\n" );
      free( string );
      printf( "Memory freed\n" );
   }
}
```

```
Memory space allocated for path name
Memory freed
```

## See also

[Memory allocation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170)  
[`calloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc?view=msvc-170)  
[`free`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free?view=msvc-170)  
[`realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc?view=msvc-170)  
[`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170)