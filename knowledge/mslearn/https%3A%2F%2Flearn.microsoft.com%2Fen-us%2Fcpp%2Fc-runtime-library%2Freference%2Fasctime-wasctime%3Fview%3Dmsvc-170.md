---
title: "asctime, _wasctime"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-wasctime?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Convert a `tm` time structure to a character string. More secure versions of these functions are available; see [`asctime_s`, `_wasctime_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-s-wasctime-s?view=msvc-170).

## Syntax

```
char *asctime(
   const struct tm *timeptr
);
wchar_t *_wasctime(
   const struct tm *timeptr
);
```

### Parameters

_`timeptr`_  
Time/date structure.

## Return value

**`asctime`** returns a pointer to the character string result; **`_wasctime`** returns a pointer to the wide-character string result. There's no error return value.

More secure versions of these functions are available; see [`asctime_s`, `_wasctime_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-s-wasctime-s?view=msvc-170).

The **`asctime`** function converts a time stored as a structure to a character string. The _`timeptr`_ value is typically obtained from a call to `gmtime` or `localtime`, which both return a pointer to a `tm` structure, defined in TIME.H.

`timeptr` member

Value

`tm_hour`

Hours since midnight (0-23)

`tm_isdst`

Positive if daylight saving time is in effect; 0 if daylight saving time isn't in effect; negative if status of daylight saving time is unknown. The C run-time library assumes the United States' rules for implementing the calculation of Daylight Saving Time (DST).

`tm_mday`

Day of month (1-31)

`tm_min`

Minutes after hour (0-59)

`tm_mon`

Month (0-11; January = 0)

`tm_sec`

Seconds after minute (0-59)

`tm_wday`

Day of week (0-6; Sunday = 0)

`tm_yday`

Day of year (0-365; January 1 = 0)

`tm_year`

Year (current year minus 1900)

For information about configuring the local time, see the [`time`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170), [`_ftime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170), and [`localtime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-localtime32-localtime64?view=msvc-170) functions. For information about defining the time zone environment and global variables, see the [`_tzset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tzset?view=msvc-170) function.

The string result produced by **`asctime`** contains exactly 26 characters and has the form `Wed Jan 2 02:03:55 1980\n\0`. A 24-hour clock is used. All fields have a constant width. The newline character and the null character occupy the last two positions of the string. **`asctime`** uses a single, statically allocated buffer to hold the return string. Each call to this function destroys the result of the previous call.

**`_wasctime`** is a wide-character version of **`asctime`**, and otherwise behaves identically to **`asctime`**.

These functions validate their parameters. If _`timeptr`_ is a null pointer, or if it contains out-of-range values, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the function returns `NULL` and sets `errno` to `EINVAL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mapping

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tasctime`

**`asctime`**

**`asctime`**

**`_wasctime`**

## Requirements

Routine

Required header

**`asctime`**

`<time.h>`

**`_wasctime`**

`<time.h>` or `<wchar.h>`

## Example

This program places the system time in the long integer `aclock`, translates it into the structure `newtime`, and then converts it to string form for output using the **`asctime`** function.

```
// crt_asctime.c
// compile with: /W3

#include <time.h>
#include <stdio.h>

int main( void )
{
    struct tm   *newTime;
    time_t      szClock;

    // Get time in seconds
    time( &szClock );

    // Convert time to struct tm form
    newTime = localtime( &szClock );

    // Print local time as a string.
    printf_s( "Current date and time: %s", asctime( newTime ) ); // C4996
    // Note: asctime is deprecated; consider using asctime_s instead
}
```

```
Current date and time: Sun Feb  3 11:38:58 2002
```

## See also

[Time management](https://learn.microsoft.com/en-us/cpp/c-runtime-library/time-management?view=msvc-170)  
[`ctime`, `_ctime32`, `_ctime64`, `_wctime`, `_wctime32`, `_wctime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-ctime32-ctime64-wctime-wctime32-wctime64?view=msvc-170)  
[`_ftime`, `_ftime32`, `_ftime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170)  
[`gmtime`, `_gmtime32`, `_gmtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-gmtime32-gmtime64?view=msvc-170)  
[`localtime`, `_localtime32`, `_localtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-localtime32-localtime64?view=msvc-170)  
[`time`, `_time32`, `_time64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170)  
[`_tzset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tzset?view=msvc-170)  
[`asctime_s`, `_wasctime_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-s-wasctime-s?view=msvc-170)