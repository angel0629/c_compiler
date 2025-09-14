---
title: "_set_doserrno"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-doserrno?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sets the value of the [`_doserrno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170) global variable.

## Syntax

```
errno_t _set_doserrno( int error_value );
```

### Parameters

_`error_value`_  
The new value of `_doserrno`.

## Return value

Returns zero if successful.

## Remarks

Possible values are defined in Errno.h.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

Optional header

**`_set_doserrno`**

<stdlib.h>

<errno.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[`_get_doserrno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-doserrno?view=msvc-170)  
[`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170)