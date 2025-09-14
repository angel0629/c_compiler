---
title: "_get_osfhandle"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-osfhandle?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Retrieves the operating-system file handle that is associated with the specified file descriptor.

## Syntax

```
intptr_t _get_osfhandle(
   int fd
);
```

### Parameters

_`fd`_  
An existing file descriptor.

## Return value

Returns an operating-system file handle if _`fd`_ is valid. Otherwise, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, it returns `INVALID_HANDLE_VALUE` (-1). It also sets `errno` to `EBADF`, indicating an invalid file handle. To avoid a warning when the result is used as a Win32 file handle, cast it to a `HANDLE` type.

Note

When **`stdin`**, **`stdout`**, and **`stderr`** aren't associated with a stream (for example, in a Windows application without a console window), the file descriptor values for these streams are returned from [`_fileno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fileno?view=msvc-170) as the special value -2. Similarly, if you use a 0, 1, or 2 as the file descriptor parameter instead of the result of a call to **`_fileno`**, **`_get_osfhandle`** also returns the special value -2 when the file descriptor is not associated with a stream, and does not set `errno`. However, this is not a valid file handle value, and subsequent calls that attempt to use it are likely to fail.

For more information about `EBADF` and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

To close a file whose operating system (OS) file handle is obtained by **`_get_osfhandle`**, call [`_close`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/close?view=msvc-170) on the file descriptor _`fd`_. Never call `CloseHandle` on the return value of this function. The underlying OS file handle is owned by the _`fd`_ file descriptor, and is closed when [`_close`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/close?view=msvc-170) is called on _`fd`_. If the file descriptor is owned by a `FILE *` stream, then calling [`fclose`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fclose-fcloseall?view=msvc-170) on that `FILE *` stream closes both the file descriptor and the underlying OS file handle. In this case, don't call [`_close`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/close?view=msvc-170) on the file descriptor.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_get_osfhandle`**

`<io.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`_close`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/close?view=msvc-170)  
[`_creat`, `_wcreat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creat-wcreat?view=msvc-170)  
[`_dup`, `_dup2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/dup-dup2?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)  
[`_open_osfhandle`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-osfhandle?view=msvc-170)