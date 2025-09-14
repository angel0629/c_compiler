---
title: "_get_daylight"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-daylight?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Retrieves the daylight saving time offset in hours.

## Syntax

```
error_t _get_daylight( int* hours );
```

### Parameters

_`hours`_  
The offset in hours of daylight saving time.

## Return value

Zero if successful or an `errno` value if an error occurs.

## Remarks

The **`_get_daylight`** function retrieves the number of hours in daylight saving time as an integer. If daylight saving time is in effect, the default offset is one hour (although a few regions do observe a two-hour offset).

If _`hours`_ is `NULL`, the invalid parameter handler is invoked as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function sets `errno` to `EINVAL` and returns `EINVAL`.

We recommend you use this function instead of the macro `_daylight` or the deprecated function `__daylight`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_get_daylight`**

<time.h>

For more information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Time management](https://learn.microsoft.com/en-us/cpp/c-runtime-library/time-management?view=msvc-170)  
[`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170)  
[`_get_dstbias`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-dstbias?view=msvc-170)  
[`_get_timezone`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-timezone?view=msvc-170)  
[`_get_tzname`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-tzname?view=msvc-170)