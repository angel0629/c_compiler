---
title: "strtol, wcstol, _strtol_l, _wcstol_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtol-wcstol-strtol-l-wcstol-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Convert strings to a **`long`** integer value.

## Syntax

```
long strtol(
   const char *string,
   char **end_ptr,
   int base
);
long wcstol(
   const wchar_t *string,
   wchar_t **end_ptr,
   int base
);
long _strtol_l(
   const char *string,
   char **end_ptr,
   int base,
   _locale_t locale
);
long _wcstol_l(
   const wchar_t *string,
   wchar_t **end_ptr,
   int base,
   _locale_t locale
);
```

### Parameters

_`string`_  
Null-terminated string to convert.

_`end_ptr`_  
An output parameter, set to point to the character after the last interpreted character. Ignored, if `NULL`.

_`base`_  
Number base to use.

_`locale`_  
Locale to use.

## Return value

**`strtol`**, **`wcstol`**, **`_strtol_l`**, and **`_wcstol_l`** return the value represented in _`string`_. They return 0 if no conversion is possible. When the representation would cause an overflow, they return `LONG_MAX` or `LONG_MIN`.

`errno` is set to `ERANGE` if overflow or underflow occurs. It's set to `EINVAL` if _`string`_ is `NULL`. Or, if _`base`_ is nonzero and less than 2, or greater than 36. For more information on `ERANGE`, `EINVAL`, and other return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`strtol`**, **`wcstol`**, **`_strtol_l`**, and **`_wcstol_l`** functions convert _`string`_ to a **`long`**. They stop reading _`string`_ at the first character not recognized as part of a number. It may be the terminating-null character, or the first alphanumeric character greater than or equal to _`base`_.

**`wcstol`** and **`_wcstol_l`** are wide-character versions of **`strtol`** and **`_strtol_l`**. Their _`string`_ argument is a wide-character string. These functions behave identically to **`strtol`** and **`_strtol_l`** otherwise. The locale's `LC_NUMERIC` category setting determines recognition of the radix character (the fractional marker or decimal point) in _`string`_. The functions **`strtol`** and **`wcstol`** use the current locale. **`_strtol_l`** and **`_wcstol_l`** use the locale passed in instead. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170) and [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

When _`end_ptr`_ is `NULL`, it's ignored. Otherwise, a pointer to the character that stopped the scan is stored at the location pointed to by _`end_ptr`_. No conversion is possible if no valid digits are found, or an invalid base is specified. The value of _`string`_ is then stored at the location pointed to by _`end_ptr`_.

**`strtol`** expects _`string`_ to point to a string of the following form:

> \[_`whitespace`_\] \[{**`+`** | **`-`**}\] \[**`0`** \[{ **`x`** | **`X`** }\]\] \[_`alphanumerics`_\]

Square brackets (`[ ]`) surround optional elements. Curly braces and a vertical bar (`{ | }`) surround alternatives for a single element. _`whitespace`_ may consist of space and tab characters, which are ignored. _`alphanumerics`_ are decimal digits or the letters `'a'` through `'z'` (or `'A'` through `'Z'`). The first character that doesn't fit this form stops the scan. If _`base`_ is between 2 and 36, then it's used as the base of the number. If _`base`_ is `0`, the initial characters of the string pointed to by _`string`_ are used to determine the base. If the first character is `0`, and the second character isn't `'x'` or `'X'`, the string is interpreted as an octal integer. If the first character is `'0'` and the second character is `'x'` or `'X'`, the string is interpreted as a hexadecimal integer. If the first character is `'1'` through `'9'`, the string is interpreted as a decimal integer. The letters `'a'` through `'z'` (or `'A'` through `'Z'`) are assigned the values 10 through 35. The scan only allows letters whose values are less than _`base`_. The first character outside the range of the base stops the scan. For example, suppose _`string`_ starts with `"01"`. If _`base`_ is `0`, the scanner assumes it's an octal integer. An `'8'` or `'9'` character stops the scan.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcstol`

**`strtol`**

**`strtol`**

**`wcstol`**

`_tcstol_l`

**`_strtol_l`**

**`_strtol_l`**

**`_wcstol_l`**

## Requirements

Routine

Required header

**`strtol`**

`<stdlib.h>`

**`wcstol`**

`<stdlib.h>` or `<wchar.h>`

**`_strtol_l`**

`<stdlib.h>`

**`_wcstol_l`**

`<stdlib.h>` or `<wchar.h>`

The **`_strtol_l`** and **`_wcstol_l`** functions are Microsoft-specific, not part of the Standard C library. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`strtod`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtod-strtod-l-wcstod-wcstod-l?view=msvc-170).

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`localeconv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localeconv?view=msvc-170)  
[`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170)  
[String to numeric value functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-to-numeric-value-functions?view=msvc-170)  
[`strtod`, `_strtod_l`, `wcstod`, `_wcstod_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtod-strtod-l-wcstod-wcstod-l?view=msvc-170)  
[`strtoll`, `_strtoll_l`, `wcstoll`, `_wcstoll_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtoll-strtoll-l-wcstoll-wcstoll-l?view=msvc-170)  
[`strtoul`, `_strtoul_l`, `wcstoul`, `_wcstoul_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtoul-strtoul-l-wcstoul-wcstoul-l?view=msvc-170)  
[`atof`, `_atof_l`, `_wtof`, `_wtof_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atof-atof-l-wtof-wtof-l?view=msvc-170)