---
title: "_strtime, _wstrtime"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtime-wstrtime?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Copy the time to a buffer. More secure versions of these functions are available; see [`_strtime_s`, `_wstrtime_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtime-s-wstrtime-s?view=msvc-170).

## Syntax

```
char *_strtime(
   char *timestr
);
wchar_t *_wstrtime(
   wchar_t *timestr
);
template <size_t size>
char *_strtime(
   char (&timestr)[size]
); // C++ only
template <size_t size>
wchar_t *_wstrtime(
   wchar_t (&timestr)[size]
); // C++ only
```

### Parameters

_`timestr`_  
Time string.

## Return value

Returns a pointer to the resulting character string _`timestr`_.

The **`_strtime`** function copies the current local time into the buffer pointed to by _`timestr`_. The time is formatted as _`hh:mm:ss`_, where _`hh`_ is two digits that represent the hour in 24-hour notation. _`mm`_ is two digits for the minutes past the hour, and _`ss`_ is two digits for seconds. For example, the string _`18:23:44`_ represents 23 minutes and 44 seconds after 6 P.M. The buffer must be at least 9 bytes long.

**`_wstrtime`** is a wide-character version of **`_strtime`**; the argument and return value of **`_wstrtime`** are wide-character strings. These functions behave identically otherwise. If _`timestr`_ is a `NULL` pointer or if _`timestr`_ is formatted incorrectly, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If the exception is allowed to continue, these functions return a `NULL`, and set `errno` to `EINVAL` if _`timestr`_ was a `NULL` or set `errno` to `ERANGE` if _`timestr`_ is formatted incorrectly.

In C++, these functions have template overloads that invoke the newer, secure counterparts of these functions. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tstrtime`

**`_strtime`**

**`_strtime`**

**`_wstrtime`**

## Requirements

Routine

Required header

**`_strtime`**

<time.h>

**`_wstrtime`**

<time.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_strtime.c
// compile with: /W3

#include <time.h>
#include <stdio.h>

int main( void )
{
   char tbuffer [9];
   _strtime( tbuffer ); // C4996
   // Note: _strtime is deprecated; consider using _strtime_s instead
   printf( "The current time is %s \n", tbuffer );
}
```

```
The current time is 14:21:44
```

## See also

[Time management](https://learn.microsoft.com/en-us/cpp/c-runtime-library/time-management?view=msvc-170)  
[`asctime`, `_wasctime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-wasctime?view=msvc-170)  
[`ctime`, `_ctime32`, `_ctime64`, `_wctime`, `_wctime32`, `_wctime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-ctime32-ctime64-wctime-wctime32-wctime64?view=msvc-170)  
[`gmtime`, `_gmtime32`, `_gmtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-gmtime32-gmtime64?view=msvc-170)  
[`localtime`, `_localtime32`, `_localtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-localtime32-localtime64?view=msvc-170)  
[`mktime`, `_mktime32`, `_mktime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktime-mktime32-mktime64?view=msvc-170)  
[`time`, `_time32`, `_time64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170)  
[`_tzset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tzset?view=msvc-170)