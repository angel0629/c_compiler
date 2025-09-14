---
title: "ctime, _ctime32, _ctime64, _wctime, _wctime32, _wctime64"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-ctime32-ctime64-wctime-wctime32-wctime64?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Convert a time value to a string and adjust for local time zone settings. More secure versions of these functions are available; see [`ctime_s`, `_ctime32_s`, `_ctime64_s`, `_wctime_s`, `_wctime32_s`, `_wctime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-s-ctime32-s-ctime64-s-wctime-s-wctime32-s-wctime64-s?view=msvc-170).

## Syntax

```
char *ctime( const time_t *sourceTime );
char *_ctime32( const __time32_t *sourceTime );
char *_ctime64( const __time64_t *sourceTime );
wchar_t *_wctime( const time_t *sourceTime );
wchar_t *_wctime32( const __time32_t *sourceTime );
wchar_t *_wctime64( const __time64_t *sourceTime );
```

### Parameters

_`sourceTime`_  
Pointer to stored time to convert.

## Return value

A pointer to the character string result. `NULL` is returned when:

*   _`sourceTime`_ represents a date before midnight, January 1, 1970, UTC.
    
*   You use **`_ctime32`** or **`_wctime32`**, and _`sourceTime`_ represents a date after 23:59:59 January 18, 2038, UTC.
    
*   You use **`_ctime64`** or **`_wctime64`**, and _`sourceTime`_ represents a date after 23:59:59, December 31, 3000, UTC.
    

**`ctime`** is an inline function that evaluates to **`_ctime64`**, and `time_t` is equivalent to `__time64_t`. If you need to force the compiler to interpret `time_t` as the old 32-bit `time_t`, you can define `_USE_32BIT_TIME_T`. This macro causes **`ctime`** to evaluate to **`_ctime32`**. We don't recommend you use it, because your application may fail after January 18, 2038, and it isn't allowed on 64-bit platforms.

The **`ctime`** function converts a time value stored as a [`time_t`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170) value into a character string. The _`sourceTime`_ value is typically obtained from a call to [`time`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170), which returns the number of seconds elapsed since midnight (00:00:00), January 1, 1970, coordinated universal time (UTC). The return value string contains exactly 26 characters and has the form:

```
Wed Jan 02 02:03:55 1980\n\0
```

A 24-hour clock is used. All fields have a constant width. The newline character ('\\n') and the null character ('\\0') occupy the last two positions of the string.

The converted character string is also adjusted according to the local time zone settings. For information on configuring the local time, see the [`time`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170), [`_ftime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170), and [`localtime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-localtime32-localtime64?view=msvc-170) functions. For details about defining the time zone environment and global variables, see the [`_tzset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tzset?view=msvc-170) function.

A call to **`ctime`** modifies the single statically allocated buffer used by the `gmtime` and `localtime` functions. Each call to one of these routines destroys the result of the previous call. **`ctime`** shares a static buffer with the `asctime` function. Thus, a call to **`ctime`** destroys the results of any previous call to `asctime`, `localtime`, or `gmtime`.

**`_wctime`** and **`_wctime64`** are the wide-character version of **`ctime`** and **`_ctime64`**; returning a pointer to wide-character string. Otherwise, **`_ctime64`**, **`_wctime`**, and **`_wctime64`** behave identically to **`ctime`**.

These functions validate their parameters. If _`sourceTime`_ is a null pointer, or if the _`sourceTime`_ value is negative, these functions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the functions return `NULL` and set `errno` to `EINVAL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tctime`

**`ctime`**

**`ctime`**

**`_wctime`**

`_tctime32`

**`_ctime32`**

**`_ctime32`**

**`_wctime32`**

`_tctime64`

**`_ctime64`**

**`_ctime64`**

**`_wctime64`**

## Requirements

Routine

Required header

**`ctime`**

<time.h>

**`_ctime32`**

<time.h>

**`_ctime64`**

<time.h>

**`_wctime`**

<time.h> or <wchar.h>

**`_wctime32`**

<time.h> or <wchar.h>

**`_wctime64`**

<time.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_ctime64.c
// compile with: /W3
/* This program gets the current
* time in _time64_t form, then uses ctime to
* display the time in string form.
*/

#include <time.h>
#include <stdio.h>

int main( void )
{
   __time64_t ltime;

   _time64( &ltime );
   printf( "The time is %s\n", _ctime64( &ltime ) ); // C4996
   // Note: _ctime64 is deprecated; consider using _ctime64_s
}
```

```
The time is Wed Feb 13 16:04:43 2002
```

## See also

[Time management](https://learn.microsoft.com/en-us/cpp/c-runtime-library/time-management?view=msvc-170)  
[`asctime`, `_wasctime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-wasctime?view=msvc-170)  
[`ctime_s`, `_ctime32_s`, `_ctime64_s`, `_wctime_s`, `_wctime32_s`, `_wctime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-s-ctime32-s-ctime64-s-wctime-s-wctime32-s-wctime64-s?view=msvc-170)  
[`_ftime`, `_ftime32`, `_ftime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170)  
[`gmtime`, `_gmtime32`, `_gmtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-gmtime32-gmtime64?view=msvc-170)  
[`localtime`, `_localtime32`, `_localtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-localtime32-localtime64?view=msvc-170)  
[`time`, `_time32`, `_time64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170)