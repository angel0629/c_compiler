---
title: "timespec_get, _timespec32_get, _timespec64_get1"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/timespec-get-timespec32-get-timespec64-get1?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sets the interval pointed to by the first argument to the current calendar time, based on the specified time base.

## Syntax

```
int timespec_get(
    struct timespec* const time_spec,
    int const base
);
int _timespec32_get(
    struct _timespec32* const time_spec,
    int const base
);
int _timespec64_get(
    struct _timespec64* const time_spec,
    int const base
);
```

### Parameters

_`time_spec`_  
Pointer to a struct that is set to the time in seconds and nanoseconds since the start of the epoch.

_`base`_  
A non-zero implementation-specific value that specifies the time base.

## Return value

The value of _`base`_ if successful, otherwise it returns zero.

The **`timespec_get`** functions set the current time in the struct pointed to by the _`time_spec`_ argument. All versions of this struct have two members, `tv_sec` and `tv_nsec`. The `tv_sec` value is set to the whole number of seconds and `tv_nsec` to the integral number of nanoseconds, rounded to the resolution of the system clock, since the start of the epoch specified by _`base`_.

**Microsoft Specific**

These functions support only `TIME_UTC` as the _`base`_ value. `TIME_UTC` sets the _`time_spec`_ value to the number of seconds and nanoseconds since the epoch start, Midnight, January 1, 1970, Coordinated Universal Time (UTC). In a `_timespec32`, `tv_sec` is a `__time32_t` value. In a `_timespec64`, `tv_sec` is a `__time64_t` value. In a `timespec`, `tv_sec` is a `time_t` type, which is 32 bits or 64 bits in length depending on whether the preprocessor macro \_USE\_32BIT\_TIME\_T is defined. The **`timespec_get`** function is an inline function that calls **`_timespec32_get`** if `_USE_32BIT_TIME_T` is defined; otherwise it calls **`_timespec64_get`**.

**End Microsoft Specific**

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`timespec_get`**, **`_timespec32_get`**, **`_timespec64_get`**

C: <time.h>, C++: <ctime> or <time.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Time management](https://learn.microsoft.com/en-us/cpp/c-runtime-library/time-management?view=msvc-170)  
[`asctime`, `_wasctime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-wasctime?view=msvc-170)  
[`asctime_s`, `_wasctime_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-s-wasctime-s?view=msvc-170)  
[`_ftime`, `_ftime32`, `_ftime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170)  
[`gmtime`, `_gmtime32`, `_gmtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-gmtime32-gmtime64?view=msvc-170)  
[`gmtime_s`, `_gmtime32_s`, `_gmtime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-s-gmtime32-s-gmtime64-s?view=msvc-170)  
[`localtime`, `_localtime32`, `_localtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-localtime32-localtime64?view=msvc-170)  
[`localtime_s`, `_localtime32_s`, `_localtime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-s-localtime32-s-localtime64-s?view=msvc-170)  
[`time`, `_time32`, `_time64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170)  
[`_utime`, `_utime32`, `_utime64`, `_wutime`, `_wutime32`, `_wutime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/utime-utime32-utime64-wutime-wutime32-wutime64?view=msvc-170)