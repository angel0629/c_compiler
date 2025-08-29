---
title: "localtime_s, _localtime32_s, _localtime64_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-s-localtime32-s-localtime64-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a **`time_t`** time value to a **`tm`** structure, and corrects for the local time zone. These functions are versions of [`localtime`, `_localtime32`, `_localtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-localtime32-localtime64?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t localtime_s(
   struct tm* const tmDest,
   time_t const* const sourceTime
);
errno_t _localtime32_s(
   struct tm* tmDest,
   __time32_t const* sourceTime
);
errno_t _localtime64_s(
   struct tm* tmDest,
   __time64_t const* sourceTime
);
```

### Parameters

_`tmDest`_  
Pointer to the time structure to be filled in.

_`sourceTime`_  
Pointer to the stored time.

## Return value

Zero if successful. The return value is an error code if there's a failure. Error codes are defined in _`Errno.h`_. For a listing of these errors, see [`errno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

### Error conditions

_`tmDest`_

_`sourceTime`_

Return value

Value in _`tmDest`_

Invokes invalid parameter handler

`NULL`

any

`EINVAL`

Not modified

Yes

Not `NULL` (points to valid memory)

`NULL`

`EINVAL`

All fields set to -1

Yes

Not `NULL` (points to valid memory)

less than 0 or greater than `_MAX__TIME64_T`

`EINVAL`

All fields set to -1

No

The first two error conditions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EINVAL` and return `EINVAL`.

The **`localtime_s`** function converts a time stored as a [`time_t`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170) value and stores the result in a structure of type [`tm`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170). The **`time_t`** value _`sourceTime`_ represents the seconds elapsed since midnight (00:00:00), January 1, 1970, UTC. This value is often obtained from the [`time`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170) function.

**`localtime_s`** corrects for the local time zone if the user first sets the global environment variable **`TZ`**. When **`TZ`** is set, three other environment variables (**`_timezone`**, **`_daylight`**, and **`_tzname`**) are automatically set as well. If the **`TZ`** variable isn't set, **`localtime_s`** attempts to use the time zone information specified in the Date/Time application in Control Panel. If this information can't be obtained, PST8PDT, which signifies the Pacific time zone, is used by default. See [`_tzset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tzset?view=msvc-170) for a description of these variables. **`TZ`** is a Microsoft extension and not part of the ANSI standard definition of **`localtime`**.

Note

The target environment should try to determine whether daylight saving time is in effect.

**`_localtime64_s`**, which uses the **`__time64_t`** structure, allows dates to be expressed up through 23:59:59, January 18, 3001, coordinated universal time (UTC), whereas **`_localtime32_s`** represents dates through 23:59:59 January 18, 2038, UTC.

**`localtime_s`** is an inline function that evaluates to **`_localtime64_s`**, and **`time_t`** is equivalent to **`__time64_t`**. If you need to force the compiler to interpret **`time_t`** as the old 32-bit **`time_t`**, you can define `_USE_32BIT_TIME_T`, which causes **`localtime_s`** to evaluate to **`_localtime32_s`**. We don't recommend `_USE_32BIT_TIME_T`, because your application may fail after January 18, 2038, and it isn't allowed on 64-bit platforms.

The fields of the structure type [`tm`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170) store the following values, each of which is an **`int`**.

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

Positive value if daylight saving time is in effect; 0 if daylight saving time isn't in effect; negative value if status of daylight saving time is unknown.

If the **`TZ`** environment variable is set, the C run-time library assumes rules appropriate to the United States for implementing the calculation of daylight saving time (DST).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required C header

Required C++ header

**`localtime_s`**, **`_localtime32_s`**, **`_localtime64_s`**

`<time.h>`

`<ctime>` or `<time.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_localtime_s.c
// This program uses _time64 to get the current time
// and then uses _localtime64_s() to convert this time to a structure
// representing the local time. The program converts the result
// from a 24-hour clock to a 12-hour clock and determines the
// proper extension (AM or PM).

#include <stdio.h>
#include <string.h>
#include <time.h>

int main( void )
{
    struct tm newtime;
    char am_pm[] = "AM";
    __time64_t long_time;
    char timebuf[26];
    errno_t err;

    // Get time as 64-bit integer.
    _time64( &long_time );
    // Convert to local time.
    err = _localtime64_s( &newtime, &long_time );
    if (err)
    {
        printf("Invalid argument to _localtime64_s.");
        exit(1);
    }
    if( newtime.tm_hour > 12 )        // Set up extension.
        strcpy_s( am_pm, sizeof(am_pm), "PM" );
    if( newtime.tm_hour > 12 )        // Convert from 24-hour
        newtime.tm_hour -= 12;        // to 12-hour clock.
    if( newtime.tm_hour == 0 )        // Set hour to 12 if midnight.
        newtime.tm_hour = 12;

    // Convert to an ASCII representation.
    err = asctime_s(timebuf, 26, &newtime);
    if (err)
    {
        printf("Invalid argument to asctime_s.");
        exit(1);
    }
    printf( "%.19s %s\n", timebuf, am_pm );
}
```

```
Fri Apr 25 01:19:27 PM
```

## See also

[Time management](https://learn.microsoft.com/en-us/cpp/c-runtime-library/time-management?view=msvc-170)  
[`asctime_s`, `_wasctime_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-s-wasctime-s?view=msvc-170)  
[`ctime`, `_ctime32`, `_ctime64`, `_wctime`, `_wctime32`, `_wctime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-ctime32-ctime64-wctime-wctime32-wctime64?view=msvc-170)  
[`_ftime`, `_ftime32`, `_ftime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170)  
[`gmtime_s`, `_gmtime32_s`, `_gmtime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-s-gmtime32-s-gmtime64-s?view=msvc-170)  
[`localtime`, `_localtime32`, `_localtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-localtime32-localtime64?view=msvc-170)  
[`time`, `_time32`, `_time64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170)  
[`_tzset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tzset?view=msvc-170)