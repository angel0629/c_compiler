---
title: "atof, _atof_l, _wtof, _wtof_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atof-atof-l-wtof-wtof-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Convert a string to double.

## Syntax

```
double atof(
   const char *str
);
double _atof_l(
   const char *str,
   _locale_t locale
);
double _wtof(
   const wchar_t *str
);
double _wtof_l(
   const wchar_t *str,
   _locale_t locale
);
```

## Parameters

_`str`_  
String to be converted.

_`locale`_  
Locale to use.

## Return value

Each function returns the **`double`** value produced by interpreting the input characters as a number. The return value is 0.0 if the input can't be converted to a value of that type.

In all out-of-range cases, `errno` is set to `ERANGE`. If the parameter passed in is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EINVAL` and return 0.

These functions convert a character string to a double-precision, floating-point value.

The input string is a sequence of characters that can be interpreted as a numerical value of the specified type. The function stops reading the input string at the first character that it can't recognize as part of a number. This character may be the null character ('\\0' or L'\\0') terminating the string.

The _`str`_ argument to **`atof`** and **`_wtof`** has the following form:

\[_`whitespace`_\] \[_`sign`_\] \[_`digits`_\] \[**`.`**_`digits`_\] \[ {**`e`** | **`E`** }\[_`sign`_\]_`digits`_\]

A _`whitespace`_ consists of space or tab characters, which are ignored; _`sign`_ is either plus (+) or minus (-); and _`digits`_ are one or more decimal digits. If no digits appear before the decimal point, at least one must appear after the decimal point. The decimal digits may be followed by an exponent, which consists of an introductory letter (**`e`**, or **`E`**) and an optionally signed decimal integer.

The UCRT versions of these functions don't support conversion of Fortran-style (**`d`** or **`D`**) exponent letters. This non-standard extension was supported by earlier versions of the CRT, and may be a breaking change for your code.

The versions of these functions with the **`_l`** suffix are identical except that they use the _`locale`_ parameter passed in instead of the current locale.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_tstof`**

**`atof`**

**`atof`**

**`_wtof`**

**`_ttof`**

**`atof`**

**`atof`**

**`_wtof`**

## Requirements

Routine(s)

Required header

**`atof`**, **`_atof_l`**

C: `<math.h>` or `<stdlib.h>` C++: `<cstdlib>`, `<stdlib.h>`, `<cmath>` or `<math.h>`

**`_wtof`**, **`_wtof_l`**

C: `<stdlib.h>` or `<wchar.h>` C++: `<cstdlib>`, `<stdlib.h>` or `<wchar.h>`

## Example

This program shows how numbers stored as strings can be converted to numeric values using the **`atof`** and **`_atof_l`** functions.

```
// crt_atof.c
//
// This program shows how numbers stored as
// strings can be converted to numeric
// values using the atof and _atof_l functions.

#include <stdlib.h>
#include <stdio.h>
#include <locale.h>

int main(void)
{
    char    *str = NULL;
    double value = 0;
    _locale_t fr = _create_locale(LC_NUMERIC, "fr-FR");

    // An example of the atof function
    // using leading and training spaces.
    str = "  3336402735171707160320 ";
    value = atof(str);
    printf("Function: atof(\"%s\") = %e\n", str, value);

    // Another example of the atof function
    // using the 'E' exponential formatting keyword.
    str = "3.1412764583E210";
    value = atof(str);
    printf("Function: atof(\"%s\") = %e\n", str, value);

    // An example of the atof and _atof_l functions
    // using the 'e' exponential formatting keyword
    // and showing different decimal point interpretations.
    str = "  -2,309e-25";
    value = atof(str);
    printf("Function: atof(\"%s\") = %e\n", str, value);
    value = _atof_l(str, fr);
    printf("Function: _atof_l(\"%s\", fr)) = %e\n", str, value);
}
```

```
Function: atof("  3336402735171707160320 ") = 3.336403e+21
Function: atof("3.1412764583E210") = 3.141276e+210
Function: atof("  -2,309e-25") = -2.000000e+00
Function: _atof_l("  -2,309e-25", fr)) = -2.309000e-25
```

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`_ecvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ecvt?view=msvc-170)  
[`_fcvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fcvt?view=msvc-170)  
[`_gcvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gcvt?view=msvc-170)  
[`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170)  
[`_atodbl`, `_atodbl_l`, `_atoldbl`, `_atoldbl_l`, `_atoflt`, `_atoflt_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atodbl-atodbl-l-atoldbl-atoldbl-l-atoflt-atoflt-l?view=msvc-170)