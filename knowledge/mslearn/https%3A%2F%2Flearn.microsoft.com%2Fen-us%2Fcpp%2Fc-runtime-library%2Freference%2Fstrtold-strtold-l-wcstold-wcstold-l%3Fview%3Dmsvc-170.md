---
title: "strtold, _strtold_l, wcstold, _wcstold_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtold-strtold-l-wcstold-wcstold-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts strings to a long double-precision floating-point value.

## Syntax

```
long double strtold(
   const char *strSource,
   char **endptr
);
long double _strtold_l(
   const char *strSource,
   char **endptr,
   _locale_t locale
);
long double wcstold(
   const wchar_t *strSource,
   wchar_t **endptr
);
long double wcstold_l(
   const wchar_t *strSource,
   wchar_t **endptr,
   _locale_t locale
);
```

### Parameters

_`strSource`_  
Null-terminated string to convert.

_`endptr`_  
Pointer to the character that stops the scan.

_`locale`_  
The locale to use.

## Return value

**`strtold`** returns the value of the floating-point number as a **`long double`**, except when the representation would cause an overflow—in that case, the function returns +/-`HUGE_VALL`. The sign of `HUGE_VALL` matches the sign of the value that can't be represented. **`strtold`** returns 0 if no conversion can be performed or an underflow occurs.

**`wcstold`** returns values analogously to **`strtold`**. For both functions, `errno` is set to `ERANGE` if overflow or underflow occurs and the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170).

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

Each function converts the input string _`strSource`_ to a **`long double`**. The **`strtold`** function stops reading the string _`strSource`_ at the first character it can't recognize as part of a number. It may be the terminating null character. The wide-character version of **`strtold`** is **`wcstold`**; its _`strSource`_ argument is a wide-character string. Otherwise, these functions behave identically.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcstold`

**`strtold`**

**`strtold`**

**`wcstold`**

`_tcstold_l`

**`_strtold_l`**

**`_strtold_l`**

**`_wcstold_l`**

The `LC_NUMERIC` category setting of the current locale determines the recognition of the radix character in _`strSource`_. For more information, see [`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The functions without the `_l` suffix use the current locale; **`_strtold_l`** and **`_wcstold_l`** are identical to **`_strtold`** and **`_wcstold`** except that they instead use the locale that's passed in. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

If _`endptr`_ isn't `NULL`, a pointer to the character that stopped the scan is stored at the location that's pointed to by _`endptr`_. If no conversion can be performed (no valid digits were found or an invalid base was specified), the value of _`strSource`_ is stored at the location that's pointed to by _`endptr`_.

**`strtold`** expects _`strSource`_ to point to a string of the following form:

> \[_`whitespace`_\]\[_`sign`_\]\[_`digits`_\]\[._`digits`_\]\[{**`d`** | **`D`** | **`e`** | **`E`**}\[_`sign`_\]_`digits`_\]

A _`whitespace`_ may consist of space and tab characters, which are ignored; _`sign`_ is either plus (**`+`**) or minus (**`-`**); and _`digits`_ are one or more decimal digits. If no digits appear before the radix character, at least one must appear after the radix character. The decimal digits can be followed by an exponent, which consists of an introductory letter (**`d`**, **`D`**, **`e`**, or **`E`**) and an optionally signed integer. If no exponent part or radix character appears, a radix character is assumed to follow the last digit in the string. The first character that doesn't fit this form stops the scan.

## Requirements

Routine

Required header

**`strtold`**, **`_strtold_l`**

<stdlib.h>

**`wcstold`**, **`_wcstold_l`**

<stdlib.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_strtold.c
// Build with: cl /W4 /Tc crt_strtold.c
// This program uses strtold to convert a
// string to a long double-precision value.

#include <stdlib.h>
#include <stdio.h>

int main( void )
{
   char *string;
   char *stopstring;
   long double x;

   string = "3.1415926535898This stopped it";
   x = strtold(string, &stopstring);
   printf("string = %s\n", string);
   printf("   strtold = %.13Lf\n", x);
   printf("   Stopped scan at: %s\n\n", stopstring);
}
```

```
string = 3.1415926535898This stopped it
   strtold = 3.1415926535898
   Stopped scan at: This stopped it
```

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[String to numeric value functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-to-numeric-value-functions?view=msvc-170)  
[`strtod`, `_strtod_l`, `wcstod`, `_wcstod_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtod-strtod-l-wcstod-wcstod-l?view=msvc-170)  
[`strtol`, `wcstol`, `_strtol_l`, `_wcstol_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtol-wcstol-strtol-l-wcstol-l?view=msvc-170)  
[`strtoul`, `_strtoul_l`, `wcstoul`, `_wcstoul_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtoul-strtoul-l-wcstoul-wcstoul-l?view=msvc-170)  
[`atof`, `_atof_l`, `_wtof`, `_wtof_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atof-atof-l-wtof-wtof-l?view=msvc-170)  
[`localeconv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localeconv?view=msvc-170)  
[`_create_locale`, `_wcreate_locale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/create-locale-wcreate-locale?view=msvc-170)  
[`_free_locale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free-locale?view=msvc-170)