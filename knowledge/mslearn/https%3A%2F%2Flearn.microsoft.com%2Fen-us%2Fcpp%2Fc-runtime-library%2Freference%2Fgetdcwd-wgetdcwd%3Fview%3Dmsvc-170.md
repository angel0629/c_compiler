---
title: "_getdcwd, _wgetdcwd"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdcwd-wgetdcwd?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets the full path of the current working directory on the specified drive.

## Syntax

```
char *_getdcwd(
   int drive,
   char *buffer,
   int maxlen
);
wchar_t *_wgetdcwd(
   int drive,
   wchar_t *buffer,
   int maxlen
);
```

### Parameters

_`drive`_  
A non-negative integer that specifies the drive (0 = default drive, 1 = A, 2 = B, and so on).

If the specified drive isn't available, the invalid parameter handler is invoked. It's also invoked when the kind of drive (for example, removable, fixed, CD-ROM, RAM disk, or network drive) can't be determined. For more information, see [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170).

_`buffer`_  
Storage location for the path, or `NULL`.

If `NULL` is specified, this function allocates a buffer of at least _`maxlen`_ size by using `malloc`, and the return value of **`_getdcwd`** is a pointer to the allocated buffer. The buffer can be freed by calling `free` and passing it the pointer.

_`maxlen`_  
A nonzero positive integer that specifies the maximum length of the path, in characters: **`char`** for **`_getdcwd`** and **`wchar_t`** for **`_wgetdcwd`**.

If _`maxlen`_ is less than or equal to zero, the invalid-parameter handler is invoked. For more information, see [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170).

## Return value

Pointer to a string that represents the full path of the current working directory on the specified drive, or `NULL`, which indicates an error.

If _`buffer`_ is specified as `NULL` and there's insufficient memory to allocate _`maxlen`_ characters, an error occurs and `errno` is set to `ENOMEM`. If the length of the path including the terminating null character exceeds _`maxlen`_, an error occurs, and `errno` is set to `ERANGE`. For more information about these error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_getdcwd`** function gets the full path of the current working directory on the specified drive and stores it at _`buffer`_. If the current working directory is set to the root, the string ends with a backslash (\\). If the current working directory is set to a directory other than the root, the string ends with the name of the directory and not with a backslash.

**`_wgetdcwd`** is a wide-character version of **`_getdcwd`**, and its _`buffer`_ parameter and return value are wide-character strings. Otherwise, **`_wgetdcwd`** and **`_getdcwd`** behave identically.

This function is thread-safe even though it depends on `GetFullPathName`, which is itself not thread-safe. However, you can violate thread safety if your multithreaded application calls both this function and [`GetFullPathName`](https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-getfullpathnamew).

The version of this function that has the `_nolock` suffix behaves identically to this function except that it isn't thread-safe and isn't protected from interference by other threads. For more information, see [`_getdcwd_nolock`, `_wgetdcwd_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdcwd-nolock-wgetdcwd-nolock?view=msvc-170).

When `_DEBUG` and `_CRTDBG_MAP_ALLOC` are defined, calls to **`_getdcwd`** and **`_wgetdcwd`** are replaced by calls to `_getdcwd_dbg` and `_wgetdcwd_dbg`, so that you can debug memory allocations. For more information, see[`_getdcwd_dbg`, `_wgetdcwd_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdcwd-dbg-wgetdcwd-dbg?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tgetdcwd`

**`_getdcwd`**

**`_getdcwd`**

**`_wgetdcwd`**

## Requirements

Routine

Required header

**`_getdcwd`**

<direct.h>

**`_wgetdcwd`**

<direct.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example in [`_getdrive`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdrive?view=msvc-170).

## See also

[Directory control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/directory-control?view=msvc-170)  
[`_chdir`, `_wchdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chdir-wchdir?view=msvc-170)  
[`_getcwd`, `_wgetcwd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getcwd-wgetcwd?view=msvc-170)  
[`_getdrive`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdrive?view=msvc-170)  
[`_mkdir`, `_wmkdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mkdir-wmkdir?view=msvc-170)  
[`_rmdir`, `_wrmdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rmdir-wrmdir?view=msvc-170)