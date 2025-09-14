---
title: "_get_doserrno"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-doserrno?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets the error value returned by the operating system before it's translated into an `errno` value.

## Syntax

```
errno_t _get_doserrno(
   int * pValue
);
```

### Parameters

_`pValue`_  
A pointer to an integer to be filled with the current value of the `_doserrno` global macro.

## Return value

If **`_get_doserrno`** succeeds, it returns zero; if it fails, it returns an error code. If _`pValue`_ is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function sets `errno` to `EINVAL` and returns `EINVAL`.

The `_doserrno` global macro is set to zero during CRT initialization, before process execution begins. It's set to the operating-system error value returned by any system-level function call that returns an operating-system error, and it's never reset to zero during execution. When you write code to check the error value returned by a function, always clear `_doserrno` by using [`_set_doserrno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-doserrno?view=msvc-170) before the function call. Because another function call may overwrite `_doserrno`, check the value by using **`_get_doserrno`** immediately after the function call.

We recommend [`_get_errno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-errno?view=msvc-170) instead of **`_get_doserrno`** for portable error codes.

Possible values of `_doserrno` are defined in <errno.h>.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

Optional header

**`_get_doserrno`**

<stdlib.h>, <cstdlib> (C++)

<errno.h>, <cerrno> (C++)

**`_get_doserrno`** is a Microsoft extension. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[`_set_doserrno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-doserrno?view=msvc-170)  
[`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170)