---
title: "_setmaxstdio"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmaxstdio?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sets a maximum for the number of simultaneously open files at the stream I/O level.

## Syntax

```
int _setmaxstdio(
   int new_max
);
```

### Parameters

_`new_max`_  
New maximum for the number of simultaneously open files at the stream I/O level.

## Return value

Returns _`new_max`_ if successful; -1 otherwise.

If _`new_max`_ is less than `_IOB_ENTRIES`, or greater than the maximum number of handles available in the operating system, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function returns -1 and sets `errno` to `EINVAL`.

For information about these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_setmaxstdio`** function changes the maximum value for the number of files that may be open simultaneously at the stream I/O level.

C run-time I/O now supports up to 8,192 files open simultaneously at the [low I/O level](https://learn.microsoft.com/en-us/cpp/c-runtime-library/low-level-i-o?view=msvc-170). This level includes files opened and accessed using the **`_open`**, **`_read`**, and **`_write`** family of I/O functions. By default, up to 512 files can be open simultaneously at the [stream I/O level](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170). This level includes files opened and accessed using the **`fopen`**, **`fgetc`**, and **`fputc`** family of functions. The limit of 512 open files at the stream I/O level can be increased to a maximum of 8,192 by use of the **`_setmaxstdio`** function.

Because stream I/O-level functions, such as **`fopen`**, are built on top of the low I/O-level functions, the maximum of 8,192 is a hard upper limit for the number of simultaneously open files accessed through the C run-time library.

Note

This upper limit might be beyond what's supported by a particular Win32 platform and configuration.

## Requirements

Routine

Required header

**`_setmaxstdio`**

`<stdio.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See [`_getmaxstdio`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getmaxstdio?view=msvc-170) for an example of using **`_setmaxstdio`**.

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)