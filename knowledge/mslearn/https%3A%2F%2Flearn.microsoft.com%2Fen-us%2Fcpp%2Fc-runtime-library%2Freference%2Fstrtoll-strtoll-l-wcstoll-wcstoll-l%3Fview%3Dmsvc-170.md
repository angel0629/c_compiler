---
title: "strtoll, _strtoll_l, wcstoll, _wcstoll_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtoll-strtoll-l-wcstoll-wcstoll-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a string to a **`long long`** value.

## Syntax

```
long long strtoll(
   const char *strSource,
   char **endptr,
   int base
);
long long wcstoll(
   const wchar_t *strSource,
   wchar_t **endptr,
   int base
);
long long _strtoll_l(
   const char *strSource,
   char **endptr,
   int base,
   _locale_t locale
);
long long _wcstoll_l(
   const wchar_t *strSource,
   wchar_t **endptr,
   int base,
   _locale_t locale
);
```

### Parameters

_`strSource`_  
Null-terminated string to convert.

_`endptr`_  
Pointer to the character that stops the scan.

_`base`_  
Number base to use.

_`locale`_  
The locale to use.

## Return value

**`strtoll`** returns the value that's represented in the string _`strSource`_, except when the representation would cause an overflow—in that case, it returns `LLONG_MAX` or `LLONG_MIN`. The function returns 0 if no conversion can be performed. **`wcstoll`** returns values analogously to **`strtoll`**.

`LLONG_MAX` and `LLONG_MIN` are defined in LIMITS.H.

If _`strSource`_ is `NULL` or the _`base`_ is nonzero and either less than 2 or greater than 36, `errno` is set to `EINVAL`.

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`strtoll`** function converts _`strSource`_ to a **`long long`**. Both functions stop reading the string _`strSource`_ at the first character they can't recognize as part of a number. It may be the terminating null character, or it may be the first numeric character that's greater than or equal to _`base`_. **`wcstoll`** is a wide-character version of **`strtoll`**; its _`strSource`_ argument is a wide-character string. Otherwise, these functions behave identically.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcstoll`

**`strtoll`**

**`strtoll`**

**`wcstoll`**

`_tcstoll_l`

**`_strtoll_l`**

**`_strtoll_l`**

**`_wcstoll_l`**

The locale's `LC_NUMERIC` category setting determines recognition of the radix character in _`strSource`_; for more information, see [`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The functions that don't have the `_l` suffix use the current locale; **`_strtoll_l`** and **`_wcstoll_l`** are identical to the corresponding functions that don't have the suffix, except that they instead use the locale that's passed in. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

If _`endptr`_ isn't `NULL`, a pointer to the character that stopped the scan is stored at the location that's pointed to by _`endptr`_. If no conversion can be performed (no valid digits were found or an invalid base was specified), the value of _`strSource`_ is stored at the location that's pointed to by _`endptr`_.

**`strtoll`** expects _`strSource`_ to point to a string of the following form:

> \[_`whitespace`_\] \[{**`+`** | **`-`**}\] \[**`0`** \[{ **`x`** | **`X`** }\]\] \[_`digits`_ | _`letters`_\]

A _`whitespace`_ may consist of space and tab characters, which are ignored; _`digits`_ are one or more decimal digits; _`letters`_ are one or more of the letters 'a' through 'z' (or 'A' through 'Z'). The first character that doesn't fit this form stops the scan. If _`base`_ is between 2 and 36, then it's used as the base of the number. If _`base`_ is 0, the initial characters of the string that's pointed to by _`strSource`_ are used to determine the base. If the first character is '0' and the second character isn't 'x' or 'X', the string is interpreted as an octal integer. If the first character is '0' and the second character is 'x' or 'X', the string is interpreted as a hexadecimal integer. If the first character is '1' through '9', the string is interpreted as a decimal integer. The letters 'a' through 'z' (or 'A' through 'Z') are assigned the values 10 through 35; only letters whose assigned values are less than _`base`_ are permitted. The first character outside the range of the base stops the scan. For example, if _`base`_ is 0 and the first character scanned is '0', an octal integer is assumed and an '8' or '9' character stops the scan.

## Requirements

Routine

Required header

**`strtoll`**, **`_strtoll_l`**

<stdlib.h>

**`wcstoll`**, **`_wcstoll_l`**

<stdlib.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`localeconv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localeconv?view=msvc-170)  
[`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170)  
[String to numeric value functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-to-numeric-value-functions?view=msvc-170)  
[`strtod`, `_strtod_l`, `wcstod`, `_wcstod_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtod-strtod-l-wcstod-wcstod-l?view=msvc-170)  
[`strtol`, `wcstol`, `_strtol_l`, `_wcstol_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtol-wcstol-strtol-l-wcstol-l?view=msvc-170)  
[`strtoul`, `_strtoul_l`, `wcstoul`, `_wcstoul_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtoul-strtoul-l-wcstoul-wcstoul-l?view=msvc-170)  
[`atof`, `_atof_l`, `_wtof`, `_wtof_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atof-atof-l-wtof-wtof-l?view=msvc-170)