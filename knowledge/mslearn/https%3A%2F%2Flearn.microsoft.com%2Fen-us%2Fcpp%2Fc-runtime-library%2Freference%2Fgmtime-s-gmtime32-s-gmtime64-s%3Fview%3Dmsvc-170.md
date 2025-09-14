---
title: "gmtime_s, _gmtime32_s, _gmtime64_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-s-gmtime32-s-gmtime64-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a time value to a `tm` structure. These functions are versions of [`_gmtime32`, `_gmtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-gmtime32-gmtime64?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t gmtime_s(
   struct tm* tmDest,
   const __time_t* sourceTime
);
errno_t _gmtime32_s(
   struct tm* tmDest,
   const __time32_t* sourceTime
);
errno_t _gmtime64_s(
   struct tm* tmDest,
   const __time64_t* sourceTime
);
```

### Parameters

_`tmDest`_  
Pointer to a [`tm`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170) structure. The fields of the returned structure hold the evaluated value of the _`timer`_ argument in UTC rather than in local time.

_`sourceTime`_  
Pointer to stored time. The time is represented as seconds elapsed since midnight (00:00:00), January 1, 1970, coordinated universal time (UTC).

## Return value

Zero if successful. The return value is an error code if there's a failure. Error codes are defined in `Errno.h`; for a listing of these errors, see [`errno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-constants?view=msvc-170).

### Error conditions

_`tmDest`_

_`sourceTime`_

Return

Value in _`tmDest`_

`NULL`

any

`EINVAL`

Not modified.

Not `NULL` (points to valid memory)

`NULL`

`EINVAL`

All fields set to -1.

Not `NULL`

< 0

`EINVAL`

All fields set to -1.

The first two error conditions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EINVAL` and return `EINVAL`.

The **`_gmtime32_s`** function breaks down the _`sourceTime`_ value and stores it in a structure of type `tm`, defined in `Time.h`. The address of the structure is passed in _`tmDest`_. The value of _`sourceTime`_ is often obtained from a call to the [`time`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170) function.

Each of the structure fields is of type **`int`**, as shown in the following table.

Field

Description

**`tm_sec`**

Seconds after minute (0 - 59).

**`tm_min`**

Minutes after hour (0 - 59).

**`tm_hour`**

Hours since midnight (0 - 23).

**`tm_mday`**

Day of month (1 - 31).

**`tm_mon`**

Month (0 - 11; January = 0).

**`tm_year`**

Year (current year minus 1900).

**`tm_wday`**

Day of week (0 - 6; Sunday = 0).

**`tm_yday`**

Day of year (0 - 365; January 1 = 0).

**`tm_isdst`**

Always 0 for **`gmtime_s`**.

**`_gmtime64_s`**, which uses the **`__time64_t`** structure, allows dates to be expressed up through 23:59:59, December 31, 3000, UTC; whereas **`gmtime32_s`** only represent dates through 23:59:59 January 18, 2038, UTC. Midnight, January 1, 1970, is the lower bound of the date range for both these functions.

**`gmtime_s`** is an inline function that evaluates to **`_gmtime64_s`** and **`time_t`** is equivalent to **`__time64_t`**. If you need to force the compiler to interpret **`time_t`** as the old 32-bit **`time_t`**, you can define `_USE_32BIT_TIME_T`. `_USE_32BIT_TIME_T` causes **`gmtime_s`** to be inlined as **`_gmtime32_s`**. We don't recommend `_USE_32BIT_TIME_T`, because your application may fail after January 18, 2038, and because it isn't allowed on 64-bit platforms.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required C header

Required C++ header

**`gmtime_s`**, **`_gmtime32_s`**, **`_gmtime64_s`**

`<time.h>`

`<ctime>` or `<time.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_gmtime64_s.c
// This program uses _gmtime64_s to convert a 64-bit
// integer representation of coordinated universal time
// to a structure named newtime, then uses asctime_s to
// convert this structure to an output string.

#include <time.h>
#include <stdio.h>

int main( void )
{
   struct tm newtime;
   __int64 ltime;
   char buf[26];
   errno_t err;

   _time64( &ltime );

   // Obtain coordinated universal time:
   err = _gmtime64_s( &newtime, &ltime );
   if (err)
   {
      printf("Invalid Argument to _gmtime64_s.");
   }

   // Convert to an ASCII representation
   err = asctime_s(buf, 26, &newtime);
   if (err)
   {
      printf("Invalid Argument to asctime_s.");
   }

   printf( "Coordinated universal time is %s\n",
           buf );
}
```

```
Coordinated universal time is Fri Apr 25 20:12:33 2003
```

## See also

[Time management](https://learn.microsoft.com/en-us/cpp/c-runtime-library/time-management?view=msvc-170)  
[`asctime_s`, `_wasctime_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-s-wasctime-s?view=msvc-170)  
[`ctime`, `_ctime32`, `_ctime64`, `_wctime`, `_wctime32`, `_wctime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-ctime32-ctime64-wctime-wctime32-wctime64?view=msvc-170)  
[`_ftime`, `_ftime32`, `_ftime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170)  
[`gmtime`, `_gmtime32`, `_gmtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-gmtime32-gmtime64?view=msvc-170)  
[`localtime_s`, `_localtime32_s`, `_localtime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-s-localtime32-s-localtime64-s?view=msvc-170)  
[`_mkgmtime`, `_mkgmtime32`, `_mkgmtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mkgmtime-mkgmtime32-mkgmtime64?view=msvc-170)  
[`mktime`, `_mktime32`, `_mktime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktime-mktime32-mktime64?view=msvc-170)  
[`time`, `_time32`, `_time64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170)