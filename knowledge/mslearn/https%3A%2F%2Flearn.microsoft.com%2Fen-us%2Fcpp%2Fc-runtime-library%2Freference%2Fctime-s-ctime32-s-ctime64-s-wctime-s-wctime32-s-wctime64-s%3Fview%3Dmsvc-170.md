---
title: "ctime_s, _ctime32_s, _ctime64_s, _wctime_s, _wctime32_s, _wctime64_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-s-ctime32-s-ctime64-s-wctime-s-wctime32-s-wctime64-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Convert a time value to a string and adjust for local time zone settings. These functions are versions of [`ctime`, `_ctime64`, `_wctime`, `_wctime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-ctime32-ctime64-wctime-wctime32-wctime64?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t ctime_s(
   char* buffer,
   size_t numberOfElements,
   const time_t *sourceTime
);
errno_t _ctime32_s(
   char* buffer,
   size_t numberOfElements,
   const __time32_t *sourceTime
);
errno_t _ctime64_s(
   char* buffer,
   size_t numberOfElements,
   const __time64_t *sourceTime
);
errno_t _wctime_s(
   wchar_t* buffer,
   size_t numberOfElements,
   const time_t *sourceTime
);
errno_t _wctime32_s(
   wchar_t* buffer,
   size_t numberOfElements,
   const __time32_t *sourceTime
);
errno_t _wctime64_s(
   wchar_t* buffer,
   size_t numberOfElements,
   const __time64_t *sourceTime
);
```

```
template <size_t size>
errno_t _ctime32_s(
   char (&buffer)[size],
   const __time32_t *sourceTime
); // C++ only
template <size_t size>
errno_t _ctime64_s(
   char (&buffer)[size],
   const __time64_t *sourceTime
); // C++ only
template <size_t size>
errno_t _wctime32_s(
   wchar_t (&buffer)[size],
   const __time32_t *sourceTime
); // C++ only
template <size_t size>
errno_t _wctime64_s(
   wchar_t (&buffer)[size],
   const __time64_t *sourceTime
); // C++ only
```

### Parameters

_`buffer`_  
Must be large enough to hold 26 characters. A pointer to the character string result, or `NULL` if:

*   _`sourceTime`_ represents a date before midnight, January 1, 1970, UTC.
    
*   If you use **`_ctime32_s`** or **`_wctime32_s`** and _`sourceTime`_ represents a date after 23:59:59 January 18, 2038, UTC.
    
*   If you use **`_ctime64_s`** or **`_wctime64_s`** and _`sourceTime`_ represents a date after 23:59:59, December 31, 3000, UTC.
    
*   If you use **`_ctime_s`** or **`_wctime_s`**, these functions are wrappers to the previous functions. See the Remarks section.
    

_`numberOfElements`_  
The size of the buffer.

_`sourceTime`_  
Pointer to stored time.

## Return value

Zero if successful. If there's a failure due to an invalid parameter, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, an error code is returned. Error codes are defined in ERRNO.H; for a listing of these errors, see [`errno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-constants?view=msvc-170). The actual error codes thrown for each error condition are shown in the following table.

## Error conditions

_`buffer`_

_`numberOfElements`_

_`sourceTime`_

Return

Value in _`buffer`_

`NULL`

any

any

`EINVAL`

Not modified

Not `NULL` (points to valid memory)

0

any

`EINVAL`

Not modified

Not `NULL`

0< size < 26

any

`EINVAL`

Empty string

Not `NULL`

\>= 26

NULL

`EINVAL`

Empty string

Not `NULL`

\>= 26

< 0

`EINVAL`

Empty string

The **`ctime_s`** function converts a time value stored as a [`time_t`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170) structure into a character string. The _`sourceTime`_ value is typically obtained from a call to [`time`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170), which returns the number of seconds elapsed since midnight (00:00:00), January 1, 1970, coordinated universal time (UTC). The return value string contains exactly 26 characters and has the form:

`Wed Jan 2 02:03:55 1980\n\0`

A 24-hour clock is used. All fields have a constant width. The new line character ('\\n') and the null character ('\\0') occupy the last two positions of the string.

The converted character string is also adjusted according to the local time zone settings. For information on configuring the local time, see the [`time`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170), [`_ftime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170), and [`localtime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-localtime32-localtime64?view=msvc-170) functions. For details about defining the time zone environment and global variables, see the [`_tzset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tzset?view=msvc-170) function.

**`_wctime32_s`** and **`_wctime64_s`** are the wide-character version of **`_ctime32_s`** and **`_ctime64_s`**; returning a pointer to wide-character string. Otherwise, **`_ctime64_s`**, **`_wctime32_s`**, and **`_wctime64_s`** behave identically to **`_ctime32_s`**.

**`ctime_s`** is an inline function that evaluates to **`_ctime64_s`** and `time_t` is equivalent to `__time64_t`. If you need to force the compiler to interpret `time_t` as the old 32-bit `time_t`, you can define `_USE_32BIT_TIME_T`. This macro causes **`ctime_s`** to evaluate to **`_ctime32_s`**. We don't recommend it, because your application may fail after January 18, 2038, and it isn't allowed on 64-bit platforms.

In C++, using these functions is simplified by template overloads; the overloads can infer buffer length automatically, eliminating the need to specify a size argument. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

The debug library versions of these functions first fill the buffer with 0xFE. To disable this behavior, use [`_CrtSetDebugFillThreshold`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdebugfillthreshold?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tctime_s`

**`ctime_s`**

**`ctime_s`**

**`_wctime_s`**

`_tctime32_s`

**`_ctime32_s`**

**`_ctime32_s`**

**`_wctime32_s`**

`_tctime64_s`

**`_ctime64_s`**

**`_ctime64_s`**

**`_wctime64_s`**

## Requirements

Routine

Required header

**`ctime_s`**, **`_ctime32_s`**, **`_ctime64_s`**

<time.h>

**`_wctime_s`**, **`_wctime32_s`**, **`_wctime64_s`**

<time.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_wctime_s.c
// This program gets the current
// time in time_t form and then uses _wctime_s to
// display the time in string form.

#include <time.h>
#include <stdio.h>

#define SIZE 26

int main( void )
{
   time_t ltime;
   wchar_t buf[SIZE];
   errno_t err;

   time( &ltime );

   err = _wctime_s( buf, SIZE, &ltime );
   if (err != 0)
   {
      printf("Invalid Arguments for _wctime_s. Error Code: %d\n", err);
   }
   wprintf_s( L"The time is %s\n", buf );
}
```

```
The time is Fri Apr 25 13:03:39 2003
```

## See also

[Time management](https://learn.microsoft.com/en-us/cpp/c-runtime-library/time-management?view=msvc-170)  
[`asctime_s`, `_wasctime_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-s-wasctime-s?view=msvc-170)  
[`ctime`, `_ctime32`, `_ctime64`, `_wctime`, `_wctime32`, `_wctime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-ctime32-ctime64-wctime-wctime32-wctime64?view=msvc-170)  
[`_ftime`, `_ftime32`, `_ftime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170)  
[`gmtime_s`, `_gmtime32_s`, `_gmtime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-s-gmtime32-s-gmtime64-s?view=msvc-170)  
[`localtime_s`, `_localtime32_s`, `_localtime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-s-localtime32-s-localtime64-s?view=msvc-170)  
[`time`, `_time32`, `_time64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170)