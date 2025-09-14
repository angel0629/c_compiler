---
title: "_get_dstbias"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-dstbias?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Retrieves the daylight saving time offset in seconds.

## Syntax

```
error_t _get_dstbias( long* seconds );
```

### Parameters

_`seconds`_  
The offset in seconds of daylight saving time.

## Return value

Zero if successful or an `errno` value if an error occurs.

The **`_get_dstbias`** function retrieves the number of seconds in daylight saving time as an integer. If daylight saving time is in effect, the default offset is 3600 seconds, which is the number of seconds in one hour (though a few regions do observe a two-hour offset).

If _`seconds`_ is `NULL`, the invalid parameter handler is invoked as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function sets `errno` to `EINVAL` and returns `EINVAL`.

We recommend you use this function instead of the macro **`_dstbias`** or the deprecated function **`__dstbias`**.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_get_dstbias`**

`<time.h>`

For more information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Time management](https://learn.microsoft.com/en-us/cpp/c-runtime-library/time-management?view=msvc-170)  
[`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170)  
[`_get_daylight`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-daylight?view=msvc-170)  
[`_get_timezone`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-timezone?view=msvc-170)  
[`_get_tzname`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-tzname?view=msvc-170)