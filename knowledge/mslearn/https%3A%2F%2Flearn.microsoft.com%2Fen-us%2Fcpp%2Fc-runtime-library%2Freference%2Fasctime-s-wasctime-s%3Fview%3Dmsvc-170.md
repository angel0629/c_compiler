---
title: "asctime_s, _wasctime_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-s-wasctime-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Convert a `tm` time structure to a character string. These functions are versions of [`asctime`, `_wasctime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-wasctime?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t asctime_s(
   char* buffer,
   size_t numberOfElements,
   const struct tm *tmSource
);
errno_t _wasctime_s(
   wchar_t* buffer,
   size_t numberOfElements,
   const struct tm *tmSource
);
template <size_t size>
errno_t asctime_s(
   char (&buffer)[size],
   const struct tm *tmSource
); // C++ only
template <size_t size>
errno_t _wasctime_s(
   wchar_t (&buffer)[size],
   const struct tm *tmSource
); // C++ only
```

### Parameters

_`buffer`_  
A pointer to a buffer to store the character string result. This function assumes a pointer to a valid memory location with a size specified by _`numberOfElements`_.

_`numberOfElements`_  
The size of the buffer used to store the result.

_`tmSource`_  
Time/date structure. This function assumes a pointer to a valid `struct tm` object.

## Return value

Zero if successful. If there's a failure, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the return value is an error code. Error codes are defined in ERRNO.H. For more information, see [`errno` constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-constants?view=msvc-170). The actual error codes returned for each error condition are shown in the following table.

### Error conditions

_`buffer`_

_`numberOfElements`_

_`tmSource`_

Return

Value in _`buffer`_

`NULL`

Any

Any

`EINVAL`

Not modified

Not `NULL` (points to valid memory)

0

Any

`EINVAL`

Not modified

Not `NULL`

0< _`numberOfElements`_ < 26

Any

`EINVAL`

Empty string

Not `NULL`

\>= 26

`NULL`

`EINVAL`

Empty string

Not `NULL`

\>= 26

Invalid time structure or out of range values for components of the time

`EINVAL`

Empty string

Note

Error conditions for **`wasctime_s`** are similar to **`asctime_s`** with the exception that the size limit is measured in words.

The `asctime` function converts a time stored as a structure to a character string. The _`tmSource`_ value is typically obtained from a call to `gmtime` or `localtime`. Both functions can be used to fill in a `tm` structure, as defined in TIME.H.

timeptr member

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

The converted character string is also adjusted according to the local time zone settings. For information about configuring the local time, see the [`time`, `_time32`, `_time64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170), [`_ftime`, `_ftime32`, `_ftime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170), and [`localtime_s`, `_localtime32_s`, `_localtime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-s-localtime32-s-localtime64-s?view=msvc-170) functions. For information about defining the time zone environment and global variables, see [`_tzset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tzset?view=msvc-170).

The string result produced by **`asctime_s`** contains exactly 26 characters and has the form `Wed Jan 2 02:03:55 1980\n\0`. A 24-hour clock is used. All fields have a constant width. The new line character and the null character occupy the last two positions of the string. The value passed in as _`numberOfElements`_ should be at least this size. If it's less, an error code, `EINVAL`, will be returned.

**`_wasctime_s`** is a wide-character version of **`asctime_s`**. **`_wasctime_s`** and **`asctime_s`** behave identically otherwise.

The debug library versions of these functions first fill the buffer with 0xFE. To disable this behavior, use [`_CrtSetDebugFillThreshold`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdebugfillthreshold?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mapping

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_tasctime_s`**

**`asctime_s`**

**`asctime_s`**

**`_wasctime_s`**

In C++, using these functions is simplified by template overloads; the overloads can infer buffer length automatically, eliminating the need to specify a size argument. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

## Requirements

Routine

Required header

**`asctime_s`**

<time.h>

**`_wasctime_s`**

<time.h> or <wchar.h>

## Security

If the buffer pointer isn't `NULL` and the pointer doesn't point to a valid buffer, the function will overwrite whatever is at the location. This error can also result in an access violation.

A [buffer overrun](https://learn.microsoft.com/en-us/windows/win32/SecBP/avoiding-buffer-overruns) can occur if the size argument passed in is greater than the actual size of the buffer.

## Example

This program places the system time in the long integer `aclock`, translates it into the structure `newtime`, and then converts it to string form for output, using the **`asctime_s`** function.

```
// crt_asctime_s.c
#include <time.h>
#include <stdio.h>

struct tm newtime;
__time32_t aclock;

int main( void )
{
   char buffer[32];
   errno_t errNum;
   _time32( &aclock );   // Get time in seconds.
   _localtime32_s( &newtime, &aclock );   // Convert time to struct tm form.

   // Print local time as a string.

   errNum = asctime_s(buffer, 32, &newtime);
   if (errNum)
   {
       printf("Error code: %d", (int)errNum);
       return 1;
   }
   printf( "Current date and time: %s", buffer );
   return 0;
}
```

```
Current date and time: Wed May 14 15:30:17 2003
```

## See also

[Time management](https://learn.microsoft.com/en-us/cpp/c-runtime-library/time-management?view=msvc-170)  
[`ctime_s`, `_ctime32_s`, `_ctime64_s`, `_wctime_s`, `_wctime32_s`, `_wctime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-s-ctime32-s-ctime64-s-wctime-s-wctime32-s-wctime64-s?view=msvc-170)  
[`_ftime`, `_ftime32`, `_ftime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170)  
[`gmtime_s`, `_gmtime32_s`, `_gmtime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-s-gmtime32-s-gmtime64-s?view=msvc-170)  
[`localtime_s`, `_localtime32_s`, `_localtime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-s-localtime32-s-localtime64-s?view=msvc-170)  
[`time`, `_time32`, `_time64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170)  
[`_tzset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tzset?view=msvc-170)