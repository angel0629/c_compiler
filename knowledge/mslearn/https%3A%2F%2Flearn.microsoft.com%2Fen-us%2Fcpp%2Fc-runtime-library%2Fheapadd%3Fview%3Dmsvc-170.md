---
title: "_heapadd"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/heapadd?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Adds memory to the heap.

Important

This function is obsolete. Beginning in Visual Studio 2015, it is not available in the CRT.

## Syntax

```
int _heapadd(
   void *memblock,
   size_t size
);
```

### Parameters

_`memblock`_  
Pointer to the heap memory.

_`size`_  
Size of memory to add, in bytes.

## Return value

If successful, **`_heapadd`** returns 0; otherwise, the function returns -1 and sets `errno` to `ENOSYS`.

For more information about this and other return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

## Remarks

Beginning with Visual C++ version 4.0, the underlying heap structure was moved to the C run-time libraries to support the new debugging features. As a result, **`_heapadd`** is no longer supported on any platform that is based on the Win32 API.

## Requirements

Routine

Required header

Optional header

**`_heapadd`**

<malloc.h>

<errno.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170) in the Introduction.

## See also

[Memory allocation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170)  
[`free`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free?view=msvc-170)  
[`_heapchk`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapchk?view=msvc-170)  
[`_heapmin`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapmin?view=msvc-170)  
[`_heapset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/heapset?view=msvc-170)  
[`_heapwalk`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapwalk?view=msvc-170)  
[`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170)  
[`realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc?view=msvc-170)