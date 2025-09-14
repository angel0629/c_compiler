---
title: "strtod, _strtod_l, wcstod, _wcstod_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtod-strtod-l-wcstod-wcstod-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Convert strings to a double-precision value.

## Syntax

```
double strtod(
   const char *strSource,
   char **endptr
);
double _strtod_l(
   const char *strSource,
   char **endptr,
   _locale_t locale
);
double wcstod(
   const wchar_t *strSource,
   wchar_t **endptr
);
double _wcstod_l(
   const wchar_t *strSource,
   wchar_t **endptr,
   _locale_t locale
);
```

### Parameters

_`strSource`_  
Null-terminated string to convert.

_`endptr`_  
Pointer to character that stops scan.

_`locale`_  
The locale to use.

## Return value

**`strtod`** returns the value of the floating-point number, except when the representation would cause an overflow, in which case the function returns +/-`HUGE_VAL`. The sign of `HUGE_VAL` matches the sign of the value that can't be represented. **`strtod`** returns `0` if no conversion can be performed or an underflow occurs.

**`wcstod`** returns values analogously to **`strtod`**:

*   For both functions, `errno` is set to `ERANGE` if overflow or underflow occurs.
*   If there are invalid parameters, `errno` is set to `EINVAL` and the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170).

For more information on this and other return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

Each function converts the input string _`strSource`_ to a **`double`**. The **`strtod`** function converts _`strSource`_ to a double-precision value. **`strtod`** stops reading the string _`strSource`_ at the first character it can't recognize as part of a number. This character may be the terminating null character. **`wcstod`** is a wide-character version of **`strtod`**; its _`strSource`_ argument is a wide-character string. These functions behave identically otherwise.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_tcstod`**

**`strtod`**

**`strtod`**

**`wcstod`**

**`_tcstod_l`**

**`_strtod_l`**

**`_strtod_l`**

**`_wcstod_l`**

The `LC_NUMERIC` category setting of the current locale determines recognition of the radix point character in _`strSource`_. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The functions without the **`_l`** suffix use the current locale; **`_strtod_l`** is identical to **`_strtod`** except the former uses the _`locale`_ passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

If _`endptr`_ isn't `NULL`, a pointer to the character that stopped the scan is stored at the location pointed to by _`endptr`_. If no conversion can be performed (no valid digits were found or an invalid base was specified), the value of _`strSource`_ is stored at the location pointed to by _`endptr`_.

**`strtod`** expects _`strSource`_ to point to a string of one of the following forms:

\[_`whitespace`_\] \[_`sign`_\] {_`digits`_ \[_`radix`_ _`digits`_\] | _`radix`_ _`digits`_} \[{**`e`** | **`E`**} \[_`sign`_\] _`digits`_\]  
\[_`whitespace`_\] \[_`sign`_\] {**`0x`** | **`0X`**} {_`hexdigits`_ \[_`radix`_ _`hexdigits`_\] | _`radix`_ _`hexdigits`_} \[{**`p`** | **`P`**} \[_`sign`_\] _`digits`_\]  
\[_`whitespace`_\] \[_`sign`_\] {**`INF`** | **`INFINITY`**}  
\[_`whitespace`_\] \[_`sign`_\] **`NAN`** \[_`sequence`_\]

The optional leading _`whitespace`_ may consist of space and tab characters, which are ignored.  
_`sign`_ is either plus (+) or minus (-).  
_`digits`_ are one or more decimal digits.  
_`hexdigits`_ are one or more hexadecimal digits.  
_`radix`_ is the radix point character, either a period (.) in the default "C" locale, or the locale-specific value if the current locale is different or when _`locale`_ is specified.  
A _`sequence`_ is a sequence of alphanumeric or underscore characters.

In both decimal and hexadecimal number forms, if no digits appear before the radix point character, at least one must appear after the radix point character.

In the decimal form, the decimal digits can be followed by an exponent, which consists of an introductory letter (**`e`** or **`E`**) and an optionally signed integer.

In the hexadecimal form, the hexadecimal digits can be followed by an exponent, which consists of an introductory letter (**`p`** or **`P`**) and an optionally signed decimal integer that represents the exponent as a power of 2.

In either form, if there isn't an exponent part or a radix point character, a radix point character is assumed to follow the last digit in the string.

Case is ignored in both the **`INF`** and **`NAN`** forms. The first character that doesn't fit one of these forms stops the scan.

The UCRT versions of these functions don't support conversion of Fortran-style (**`d`** or **`D`**) exponent letters. This non-standard extension was supported by earlier versions of the CRT, and may be a breaking change for your code. The UCRT versions support hexadecimal strings and round-tripping of `INF` and `NAN` values, which weren't supported in earlier versions. This support can also cause breaking changes in your code. For example, the string "`0x1a`" would be interpreted by **`strtod`** as 0.0 in previous versions, but as 26.0 in the UCRT version.

## Requirements

Routine

Required header

**`strtod`**, **`_strtod_l`**

C: `<stdlib.h>` C++: `<cstdlib>` or `<stdlib.h>`

**`wcstod`**, **`_wcstod_l`**

C: `<stdlib.h>` or `<wchar.h>` C++: `<cstdlib>`, `<stdlib.h>`, or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_strtod.c
// This program uses strtod to convert a
// string to a double-precision value; strtol to
// convert a string to long integer values; and strtoul
// to convert a string to unsigned long-integer values.
//

#include <stdlib.h>
#include <stdio.h>

int main(void)
{
    char *string, *stopstring;
    double x;
    long   l;
    int    base;
    unsigned long ul;

    string = "3.1415926This stopped it";
    x = strtod(string, &stopstring);
    printf("string = %s\n", string);
    printf("   strtod = %f\n", x);
    printf("   Stopped scan at: %s\n\n", stopstring);

    string = "-10110134932This stopped it";
    l = strtol(string, &stopstring, 10);
    printf("string = %s\n", string);
    printf("   strtol = %ld\n", l);
    printf("   Stopped scan at: %s\n\n", stopstring);

    string = "10110134932";
    printf("string = %s\n", string);

    // Convert string using base 2, 4, and 8:
    for (base = 2; base <= 8; base *= 2)
    {
        // Convert the string:
        ul = strtoul(string, &stopstring, base);
        printf("   strtol = %ld (base %d)\n", ul, base);
        printf("   Stopped scan at: %s\n", stopstring);
    }

    // NaN
    x = strtod("+nan", &stopstring);
    printf("\n%f\n", x);

    // INF
    x = strtod("-INF", &stopstring);
    printf("\n%f\n", x);

    // e - exponent
    x = strtod("1.18973e+49", &stopstring);
    printf("\n%f\n", x);

    // doesn't handle Fortran style
    x = strtod("1.18973d+49", &stopstring);
    printf("\n%f\n", x);
    printf("No Fortran style support. Stopped parsing at %s\n", stopstring);
}
```

```
string = 3.1415926This stopped it
   strtod = 3.141593
   Stopped scan at: This stopped it

string = -10110134932This stopped it
   strtol = -2147483648
   Stopped scan at: This stopped it

string = 10110134932
   strtol = 45 (base 2)
   Stopped scan at: 34932
   strtol = 4423 (base 4)
   Stopped scan at: 4932
   strtol = 2134108 (base 8)
   Stopped scan at: 932

nan

-inf

11897299999999999421285862642874618947301378359296.000000

1.189730
No Fortran style support. Stopped parsing at d+49
```

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[String to numeric value functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-to-numeric-value-functions?view=msvc-170)  
[`strtol`, `wcstol`, `_strtol_l`, `_wcstol_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtol-wcstol-strtol-l-wcstol-l?view=msvc-170)  
[`strtoul`, `_strtoul_l`, `wcstoul`, `_wcstoul_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtoul-strtoul-l-wcstoul-wcstoul-l?view=msvc-170)  
[`atof`, `_atof_l`, `_wtof`, `_wtof_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atof-atof-l-wtof-wtof-l?view=msvc-170)  
[`localeconv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localeconv?view=msvc-170)  
[`_create_locale`, `_wcreate_locale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/create-locale-wcreate-locale?view=msvc-170)  
[`_free_locale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free-locale?view=msvc-170)