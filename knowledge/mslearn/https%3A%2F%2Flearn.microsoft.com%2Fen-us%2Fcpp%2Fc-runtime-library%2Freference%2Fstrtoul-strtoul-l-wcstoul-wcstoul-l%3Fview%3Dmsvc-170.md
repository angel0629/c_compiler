---
title: "strtoul, _strtoul_l, wcstoul, _wcstoul_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtoul-strtoul-l-wcstoul-wcstoul-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Convert strings to an unsigned long-integer value.

## Syntax

```
unsigned long strtoul(
   const char *strSource,
   char **endptr,
   int base
);
unsigned long _strtoul_l(
   const char *strSource,
   char **endptr,
   int base,
   _locale_t locale
);
unsigned long wcstoul(
   const wchar_t *strSource,
   wchar_t **endptr,
   int base
);
unsigned long _wcstoul_l(
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
Pointer to character that stops scan.

_`base`_  
Number base to use.

_`locale`_  
Locale to use.

## Return value

**`strtoul`** returns the converted value, if any, or `ULONG_MAX` on overflow. **`strtoul`** returns 0 if no conversion can be performed. **`wcstoul`** returns values analogously to **`strtoul`**. For both functions, `errno` is set to `ERANGE` if overflow or underflow occurs.

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

Each of these functions converts the input string _`strSource`_ to an **`unsigned long`**.

**`strtoul`** stops reading the string _`strSource`_ at the first character it can't recognize as part of a number. This character may be the terminating `NULL`, or it may be the first numeric character greater than or equal to _`base`_. The `LC_NUMERIC` category setting of the locale determines recognition of the radix character in _`strSource`_; for more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). **`strtoul`** and **`wcstoul`** use the current locale; **`_strtoul_l`** and **`_wcstoul_l`** are identical except that they use the locale passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

If _`endptr`_ isn't `NULL`, a pointer to the character that stopped the scan is stored at the location pointed to by _`endptr`_. If no conversion can be performed (no valid digits were found or an invalid base was specified), the value of _`strSource`_ is stored at the location pointed to by _`endptr`_.

**`wcstoul`** is a wide-character version of **`strtoul`**; its _`strSource`_ argument is a wide-character string. Otherwise these functions behave identically.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcstoul`

**`strtoul`**

**`strtoul`**

**`wcstoul`**

`_tcstoul_l`

**`strtoul_l`**

**`_strtoul_l`**

**`_wcstoul_l`**

**`strtoul`** expects _`strSource`_ to point to a string of the following form:

> `[whitespace] [{+ | -}] [0 [{ x | X }]] [digits | letters]`

A _`whitespace`_ may consist of space and tab characters, which are ignored. _`digits`_ are one or more decimal digits. _`letters`_ are one or more of the letters `a` through `z` (or `A` through `Z`). The first character that doesn't fit this form stops the scan. If _`base`_ is between 2 and 36, then it's used as the base of the number. If _`base`_ is 0, the initial characters of the string pointed to by _`strSource`_ are used to determine the base. If the first character is 0 and the second character isn't `x` or `X`, the string is interpreted as an octal integer. If the first character is '0' and the second character is `x` or `X`, the string is interpreted as a hexadecimal integer. If the first character is '1' through '9', the string is interpreted as a decimal integer. The letters `a` through `z` (or `A` through `Z`) are assigned the values 10 through 35; only letters whose assigned values are less than _`base`_ are permitted. The first character outside the range of the base stops the scan. For example, if _`base`_ is 0 and the first character scanned is '0', an octal integer is assumed and an '8' or '9' character will stop the scan. **`strtoul`** allows a plus (**`+`**) or minus (**`-`**) sign prefix; a leading minus sign indicates that the return value is negated.

## Requirements

Routine

Required header

**`strtoul`**

`<stdlib.h>`

**`wcstoul`**

`<stdlib.h>` or `<wchar.h>`

**`_strtoul_l`**

`<stdlib.h>`

**`_wcstoul_l`**

`<stdlib.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`strtod`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtod-strtod-l-wcstod-wcstod-l?view=msvc-170).

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`localeconv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localeconv?view=msvc-170)  
[`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170)  
[String to numeric value functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-to-numeric-value-functions?view=msvc-170)  
[`strtod`, `_strtod_l`, `wcstod`, `_wcstod_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtod-strtod-l-wcstod-wcstod-l?view=msvc-170)  
[`strtol`, `wcstol`, `_strtol_l`, `_wcstol_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtol-wcstol-strtol-l-wcstol-l?view=msvc-170)  
[`atof`, `_atof_l`, `_wtof`, `_wtof_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atof-atof-l-wtof-wtof-l?view=msvc-170)