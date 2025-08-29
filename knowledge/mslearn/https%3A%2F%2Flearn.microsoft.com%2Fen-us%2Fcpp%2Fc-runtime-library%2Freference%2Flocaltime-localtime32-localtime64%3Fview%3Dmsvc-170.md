---
title: "localtime, _localtime32, _localtime64"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-localtime32-localtime64?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a time value and corrects for the local time zone. More secure versions of these functions are available; see [`localtime_s`, `_localtime32_s`, `_localtime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-s-localtime32-s-localtime64-s?view=msvc-170).

## Syntax

```
struct tm *localtime( const time_t *sourceTime );
struct tm *_localtime32( const __time32_t *sourceTime );
struct tm *_localtime64( const __time64_t *sourceTime );
```

### Parameters

_`sourceTime`_  
Pointer to stored time.

## Return value

Return a pointer to the structure result, or `NULL` if the date passed to the function is:

*   Before midnight, January 1, 1970.
    
*   After 03:14:07, January 19, 2038, UTC (using **`_time32`** and **`time32_t`**).
    
*   After 23:59:59, December 31, 3000, UTC (using **`_time64`** and **`__time64_t`**).
    

**`_localtime64`**, which uses the **`__time64_t`** structure, allows dates to be expressed up through 23:59:59, December 31, 3000, coordinated universal time (UTC), whereas **`_localtime32`** represents dates through 23:59:59 January 18, 2038, UTC.

**`localtime`** is an inline function that evaluates to **`_localtime64`**, and **`time_t`** is equivalent to **`__time64_t`**. If you need to force the compiler to interpret **`time_t`** as the old 32-bit **`time_t`**, you can define `_USE_32BIT_TIME_T`. `_USE_32BIT_TIME_T` causes **`localtime`** to evaluate to **`_localtime32`**. We don't recommend `_USE_32BIT_TIME_T`, because your application may fail after January 18, 2038, and it isn't allowed on 64-bit platforms.

The fields of the structure type [`tm`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170) store the following values, each of which is an **`int`**:

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

If the **`TZ`** environment variable is set, the C run-time library assumes rules appropriate to the United States for implementing the calculation of daylight-saving time (DST).

The **`localtime`** function converts a time stored as a [`time_t`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170) value and stores the result in a structure of type [`tm`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170). The **`long`** value _`sourceTime`_ represents the seconds elapsed since midnight (00:00:00), January 1, 1970, UTC. This value is often obtained from the [`time`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170) function.

Both the 32-bit and 64-bit versions of [`gmtime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-gmtime32-gmtime64?view=msvc-170), [`mktime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktime-mktime32-mktime64?view=msvc-170), [`mkgmtime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mkgmtime-mkgmtime32-mkgmtime64?view=msvc-170), and **`localtime`** all use a single **`tm`** structure per thread for the conversion. Each call to one of these routines destroys the result of the previous call.

**`localtime`** corrects for the local time zone if the user first sets the global environment variable **`TZ`**. When **`TZ`** is set, three other environment variables (**`_timezone`**, **`_daylight`**, and **`_tzname`**) are automatically set as well. If the **`TZ`** variable isn't set, **`localtime`** attempts to use the time zone information specified in the Date/Time application in Control Panel. If this information can't be obtained, PST8PDT, which signifies the Pacific Time Zone, is used by default. See [`_tzset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tzset?view=msvc-170) for a description of these variables. **`TZ`** is a Microsoft extension and not part of the ANSI standard definition of **`localtime`**.

Note

The target environment should try to determine whether daylight saving time is in effect.

These functions validate their parameters. If _`sourceTime`_ is a null pointer, or if the _`sourceTime`_ value is negative, these functions invoke an invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the functions return `NULL` and set `errno` to `EINVAL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required C header

Required C++ header

**`localtime`**, **`_localtime32`**, **`_localtime64`**

`<time.h>`

`<ctime>` or `<time.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_localtime.cpp
// compile with: /W3
// This program uses _time64 to get the current time
// and then uses localtime64() to convert this time to a structure
// representing the local time. The program converts the result
// from a 24-hour clock to a 12-hour clock and determines the
// proper extension (AM or PM).

#include <stdio.h>
#include <string.h>
#include <time.h>

int main( void )
{
    struct tm *newtime;
    char am_pm[] = "AM";
    __time64_t long_time;

    _time64( &long_time );             // Get time as 64-bit integer.
                                       // Convert to local time.
    newtime = _localtime64( &long_time ); // C4996
    // Note: _localtime64 deprecated; consider _localetime64_s

    if( newtime->tm_hour > 12 )        // Set up extension.
        strcpy_s( am_pm, sizeof(am_pm), "PM" );
    if( newtime->tm_hour > 12 )        // Convert from 24-hour
        newtime->tm_hour -= 12;        //   to 12-hour clock.
    if( newtime->tm_hour == 0 )        // Set hour to 12 if midnight.
        newtime->tm_hour = 12;

    char buff[30];
    asctime_s( buff, sizeof(buff), newtime );
    printf( "%.19s %s\n", buff, am_pm );
}
```

```
Tue Feb 12 10:05:58 AM
```

## See also

[Time management](https://learn.microsoft.com/en-us/cpp/c-runtime-library/time-management?view=msvc-170)  
[`asctime`, `_wasctime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-wasctime?view=msvc-170)  
[`ctime`, `_ctime32`, `_ctime64`, `_wctime`, `_wctime32`, `_wctime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-ctime32-ctime64-wctime-wctime32-wctime64?view=msvc-170)  
[`_ftime`, `_ftime32`, `_ftime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170)  
[`gmtime`, `_gmtime32`, `_gmtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-gmtime32-gmtime64?view=msvc-170)  
[`localtime_s`, `_localtime32_s`, `_localtime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-s-localtime32-s-localtime64-s?view=msvc-170)  
[`time`, `_time32`, `_time64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170)  
[`_tzset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tzset?view=msvc-170)