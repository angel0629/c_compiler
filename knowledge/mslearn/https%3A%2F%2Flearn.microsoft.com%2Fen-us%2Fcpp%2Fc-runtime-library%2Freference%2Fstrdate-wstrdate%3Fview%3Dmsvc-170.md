---
title: "_strdate, _wstrdate"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdate-wstrdate?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Copy current system date to a buffer. More secure versions of these functions are available; see [`_strdate_s`, `_wstrdate_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdate-s-wstrdate-s?view=msvc-170).

## Syntax

```
char *_strdate(
   char *datestr
);
wchar_t *_wstrdate(
   wchar_t *datestr
);
template <size_t size>
char *_strdate(
   char (&datestr)[size]
); // C++ only
template <size_t size>
wchar_t *_wstrdate(
   wchar_t (&datestr)[size]
); // C++ only
```

### Parameters

_`datestr`_  
A pointer to a buffer containing the formatted date string.

## Return value

Each of these functions returns a pointer to the resulting character string _`datestr`_.

More secure versions of these functions are available; see [`_strdate_s`, `_wstrdate_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdate-s-wstrdate-s?view=msvc-170). It's recommended that the more secure functions be used wherever possible.

The **`_strdate`** function copies the current system date to the buffer pointed to by _`datestr`_, formatted _mm/dd/yy_, where _mm_ is two digits representing the month, _dd_ is two digits representing the day, and _yy_ is the last two digits of the year. For example, the string _`12/05/99`_ represents December 5, 1999. The buffer must be at least 9 bytes long.

If _`datestr`_ is a `NULL` pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return -1 and set `errno` to `EINVAL`.

**`_wstrdate`** is a wide-character version of **`_strdate`**; the argument and return value of **`_wstrdate`** are wide-character strings. These functions behave identically otherwise.

In C++, these functions have template overloads that invoke the newer, secure counterparts of these functions. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tstrdate`

**`_strdate`**

**`_strdate`**

**`_wstrdate`**

## Requirements

Routine

Required header

**`_strdate`**

<time.h>

**`_wstrdate`**

<time.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// strdate.c
// compile with: /W3
#include <time.h>
#include <stdio.h>
int main()
{
    char tmpbuf[9];

    // Set time zone from TZ environment variable. If TZ is not set,
    // the operating system is queried to obtain the default value
    // for the variable.
    //
    _tzset();

    printf( "OS date: %s\n", _strdate(tmpbuf) ); // C4996
    // Note: _strdate is deprecated; consider using _strdate_s instead
}
```

```
OS date: 04/25/03
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