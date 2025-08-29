---
title: "_open_osfhandle"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-osfhandle?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Associates a C run-time file descriptor with an existing operating system file handle.

## Syntax

```
int _open_osfhandle (
   intptr_t osfhandle,
   int flags
);
```

### Parameters

_`osfhandle`_  
Operating system file handle.

_`flags`_  
Types of operations allowed.

## Return value

If successful, **`_open_osfhandle`** returns a C run-time file descriptor. Otherwise, it returns -1.

The **`_open_osfhandle`** function allocates a C run-time file descriptor. It associates this file descriptor with the operating system file handle specified by _`osfhandle`_. To avoid a compiler warning, cast the _`osfhandle`_ argument from `HANDLE` to **`intptr_t`**. The _`flags`_ argument is an integer expression formed from one or more of the manifest constants defined in `<fcntl.h>`. You can use the bitwise "or" (`|`) operator to combine two or more manifest constants to form the _`flags`_ argument.

These manifest constants are defined in `<fcntl.h>`:

Constant

Description

`_O_APPEND`

Positions a file pointer to the end of the file before every write operation.

`_O_RDONLY`

Opens the file for reading only.

`_O_TEXT`

Opens the file in ANSI text (translated) mode.

`_O_WTEXT`

Opens the file in Unicode (translated UTF-16) mode.

The **`_open_osfhandle`** call transfers ownership of the Win32 file handle to the file descriptor. To close a file opened by using **`_open_osfhandle`**, call [`_close`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/close?view=msvc-170). The underlying OS file handle is also closed by a call to **`_close`**. Don't call the Win32 function `CloseHandle` on the original handle. If the file descriptor is owned by a `FILE *` stream, then a call to [`fclose`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fclose-fcloseall?view=msvc-170) closes both the file descriptor and the underlying handle. In this case, don't call **`_close`** on the file descriptor or `CloseHandle` on the original handle.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_open_osfhandle`**

`<io.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`_get_osfhandle`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-osfhandle?view=msvc-170)