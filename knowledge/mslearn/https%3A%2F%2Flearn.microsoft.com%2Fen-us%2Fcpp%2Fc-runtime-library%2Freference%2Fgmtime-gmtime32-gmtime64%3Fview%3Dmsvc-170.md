---
title: "gmtime, _gmtime32, _gmtime64"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-gmtime32-gmtime64?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a `time_t` time value to a `tm` structure. More secure versions of these functions are available; see [`gmtime_s`, `_gmtime32_s`, `_gmtime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-s-gmtime32-s-gmtime64-s?view=msvc-170).

## Syntax

```
struct tm *gmtime( const time_t *sourceTime );
struct tm *_gmtime32( const __time32_t *sourceTime );
struct tm *_gmtime64( const __time64_t *sourceTime );
```

### Parameters

_`sourceTime`_  
Pointer to the stored time. The time is represented as seconds elapsed since midnight (00:00:00), January 1, 1970, coordinated universal time (UTC).

## Return value

A pointer to a structure of type [`tm`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170). The fields of the returned structure hold the evaluated value of the _`sourceTime`_ argument in UTC rather than in local time. Each of the structure fields is of type `int`, as follows:

Field

Description

`tm_sec`

Seconds after minute (0 - 59).

`tm_min`

Minutes after hour (0 - 59).

`tm_hour`

Hours since midnight (0 - 23).

`tm_mday`

Day of month (1 - 31).

`tm_mon`

Month (0 - 11; January = 0).

`tm_year`

Year (current year minus 1900).

`tm_wday`

Day of week (0 - 6; Sunday = 0).

`tm_yday`

Day of year (0 - 365; January 1 = 0).

`tm_isdst`

Always 0 for **`gmtime`**.

Both the 32-bit and 64-bit versions of **`gmtime`**, [`mktime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktime-mktime32-mktime64?view=msvc-170), [`mkgmtime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mkgmtime-mkgmtime32-mkgmtime64?view=msvc-170), and [`localtime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-localtime32-localtime64?view=msvc-170) all use one common `tm` structure per thread for the conversion. Each call to one of these functions destroys the result of any previous call. If _`sourceTime`_ represents a date before midnight, January 1, 1970, **`gmtime`** returns `NULL`. There's no error return.

**`_gmtime64`**, which uses the `__time64_t` structure, enables dates to be expressed up through 23:59:59, December 31, 3000, UTC. **`_gmtime32`** only represent dates through 23:59:59 January 18, 2038, UTC. Midnight, January 1, 1970, is the lower bound of the date range for both functions.

**`gmtime`** is an inline function that evaluates to **`_gmtime64`**, and `time_t` is equivalent to `__time64_t` unless `_USE_32BIT_TIME_T` is defined. If you must force the compiler to interpret `time_t` as the old 32-bit `time_t`, you can define `_USE_32BIT_TIME_T`, but doing so causes **`gmtime`** to be in-lined to **`_gmtime32`** and `time_t` to be defined as `__time32_t`. We don't recommend use of `_USE_32BIT_TIME_T`, because it isn't allowed on 64-bit platforms. In any case, your application may fail after January 18, 2038.

These functions validate their parameters. If _`sourceTime`_ is a `NULL` pointer, or if the _`sourceTime`_ value is negative, these functions invoke an invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the functions return `NULL` and set `errno` to `EINVAL`.

The **`_gmtime32`** function breaks down the _`sourceTime`_ value and stores it in a statically allocated structure of type `tm`, defined in `TIME.H`. The value of _`sourceTime`_ is typically obtained from a call to the [`time`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170) function.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required C header

Required C++ header

**`gmtime`**, **`_gmtime32`**, **`_gmtime64`**

`<time.h>`

`<ctime>` or `<time.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_gmtime.c
// compile with: /W3
// This program uses _gmtime64 to convert a long-
// integer representation of coordinated universal time
// to a structure named newtime, then uses asctime to
// convert this structure to an output string.

#include <time.h>
#include <stdio.h>

int main(void)
{
   struct tm *newtime;
   __int64 ltime;
   char buff[80];

   _time64( &ltime );

   // Obtain coordinated universal time:
   newtime = _gmtime64( &ltime ); // C4996
   // Note: _gmtime64 is deprecated; consider using _gmtime64_s
   asctime_s( buff, sizeof(buff), newtime );
   printf( "Coordinated universal time is %s\n", buff );
}
```

```
Coordinated universal time is Tue Feb 12 23:11:31 2002
```

## See also

[Time management](https://learn.microsoft.com/en-us/cpp/c-runtime-library/time-management?view=msvc-170)  
[`asctime`, `_wasctime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-wasctime?view=msvc-170)  
[`ctime`, `_ctime32`, `_ctime64`, `_wctime`, `_wctime32`, `_wctime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-ctime32-ctime64-wctime-wctime32-wctime64?view=msvc-170)  
[`_ftime`, `_ftime32`, `_ftime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170)  
[`gmtime_s`, `_gmtime32_s`, `_gmtime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-s-gmtime32-s-gmtime64-s?view=msvc-170)  
[`localtime`, `_localtime32`, `_localtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-localtime32-localtime64?view=msvc-170)  
[`_mkgmtime`, `_mkgmtime32`, `_mkgmtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mkgmtime-mkgmtime32-mkgmtime64?view=msvc-170)  
[`mktime`, `_mktime32`, `_mktime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktime-mktime32-mktime64?view=msvc-170)  
[`time`, `_time32`, `_time64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170)