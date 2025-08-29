---
title: "strtof, _strtof_l, wcstof, _wcstof_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtof-strtof-l-wcstof-wcstof-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts strings to a single-precision floating-point value.

## Syntax

```
float strtof(
   const char *strSource,
   char **endptr
);
float _strtof_l(
   const char *strSource,
   char **endptr,
   _locale_t locale
);
float wcstof(
   const wchar_t *strSource,
   wchar_t **endptr
);
float wcstof_l(
   const wchar_t *strSource,
   wchar_t **endptr,
   _locale_t locale
);
```

## Parameters

_`strSource`_  
Null-terminated string to convert.

_`endptr`_  
Pointer to the character that stops the scan.

_`locale`_  
The locale to use.

## Return value

**`strtof`** returns the value of the floating-point number, except when the representation would cause an overflow, in which case the function returns +/-`HUGE_VALF`. The sign of `HUGE_VALF` matches the sign of the value that can't be represented. **`strtof`** returns 0 if no conversion can be performed or an underflow occurs.

**`wcstof`** returns values analogously to **`strtof`**. For both functions, `errno` is set to `ERANGE` if overflow or underflow occurs and the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170).

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

Each function converts the input string _`strSource`_ to a **`float`**. The **`strtof`** function converts _`strSource`_ to a single-precision value. **`strtof`** stops reading the string _`strSource`_ at the first character it can't recognize as part of a number. This character may be the terminating null character. **`wcstof`** is a wide-character version of **`strtof`**; its _`strSource`_ argument is a wide-character string. Otherwise, these functions behave identically.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcstof`

**`strtof`**

**`strtof`**

**`wcstof`**

`_tcstof_l`

**`_strtof_l`**

**`_strtof_l`**

**`_wcstof_l`**

The `LC_NUMERIC` category setting of the current locale determines recognition of the radix character in _`strSource`_; for more information, see [`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The functions that don't have the `_l` suffix use the current locale; the ones that have the suffix are identical except that they use the locale that's passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

If _`endptr`_ isn't `NULL`, a pointer to the character that stopped the scan is stored at the location that's pointed to by _`endptr`_. If no conversion can be performed (no valid digits were found or an invalid base was specified), the value of _`strSource`_ is stored at the location that's pointed to by _`endptr`_.

**`strtof`** expects _`strSource`_ to point to a string of the following form:

\[_`whitespace`_\] \[_`sign`_\] \[_`digits`_\] \[._`digits`_\] \[{**`e`** | **`E`**} \[_`sign`_\] _`digits`_\]

A _`whitespace`_ may consist of space and tab characters, which are ignored; _`sign`_ is either plus (**`+`**) or minus (**`-`**); and _`digits`_ are one or more decimal digits. If no digits appear before the radix character, at least one must appear after the radix character. The decimal digits can be followed by an exponent, which consists of an introductory letter (**`e`** or **`E`**) and an optionally signed integer. If no exponent part or radix character appears, a radix character is assumed to follow the last digit in the string. The first character that doesn't fit this form stops the scan.

The UCRT versions of these functions don't support conversion of Fortran-style (**`d`** or **`D`**) exponent letters. This non-standard extension was supported by earlier versions of the CRT, and may be a breaking change for your code.

## Requirements

Routine

Required header

**`strtof`**, **`_strtof_l`**

C: <stdlib.h> C++: <cstdlib> or <stdlib.h>

**`wcstof`**, **`_wcstof_l`**

C: <stdlib.h> or <wchar.h> C++: <cstdlib>, <stdlib.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_strtof.c
// This program uses strtof to convert a
// string to a single-precision value.

#include <stdlib.h>
#include <stdio.h>

int main( void )
{
   char *string;
   char *stopstring;
   float x;

   string = "3.14159This stopped it";
   x = strtof(string, &stopstring);
   printf("string = %s\n", string);
   printf("   strtof = %f\n", x);
   printf("   Stopped scan at: %s\n\n", stopstring);
}
```

```
string = 3.14159This stopped it
   strtof = 3.141590
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