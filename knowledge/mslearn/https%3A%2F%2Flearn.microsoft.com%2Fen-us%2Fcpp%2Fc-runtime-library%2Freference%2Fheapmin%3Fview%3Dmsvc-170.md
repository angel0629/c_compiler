---
title: "_heapmin"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapmin?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Releases unused heap memory to the operating system.

## Syntax

```
int _heapmin( void );
```

## Return value

If successful, **`_heapmin`** returns 0; otherwise, the function returns -1 and sets `errno` to `ENOSYS`.

For more information about this and other return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

## Remarks

The **`_heapmin`** function minimizes the heap by releasing unused heap memory to the operating system. If the operating system doesn't support **`_heapmin`** (for example, Windows 98), the function returns -1 and sets `errno` to `ENOSYS`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

Optional header

**`_heapmin`**

<malloc.h>

<errno.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Memory allocation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170)  
[`free`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free?view=msvc-170)  
[`_heapadd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/heapadd?view=msvc-170)  
[`_heapchk`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapchk?view=msvc-170)  
[`_heapset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/heapset?view=msvc-170)  
[`_heapwalk`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapwalk?view=msvc-170)  
[`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170)