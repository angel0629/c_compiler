---
title: "fsetpos"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fsetpos?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sets the stream-position indicator.

## Syntax

```
int fsetpos(
   FILE *stream,
   const fpos_t *pos
);
```

### Parameters

_`stream`_  
Pointer to `FILE` structure.

_`pos`_  
Position-indicator storage.

## Return value

If successful, **`fsetpos`** returns 0. On failure, the function returns a nonzero value and sets `errno` to one of the following manifest constants (defined in ERRNO.H): `EBADF`, which means the file isn't accessible or the object that _`stream`_ points to isn't a valid file structure; or `EINVAL`, which means an invalid value for _`stream`_ or _`pos`_ was passed. If an invalid parameter is passed in, these functions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170).

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`fsetpos`** function sets the file-position indicator for _`stream`_ to the value of _`pos`_, which is obtained in a prior call to `fgetpos` against _`stream`_. The function clears the end-of-file indicator and undoes any effects of [`ungetc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ungetc-ungetwc?view=msvc-170) on _`stream`_. After a call to **`fsetpos`**, the next operation on _`stream`_ may be either input or output.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`fsetpos`**

<stdio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`fgetpos`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgetpos?view=msvc-170).

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fgetpos`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgetpos?view=msvc-170)