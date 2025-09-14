---
title: "atoi, _atoi_l, _wtoi, _wtoi_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atoi-atoi-l-wtoi-wtoi-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Convert a string to integer.

## Syntax

```
int atoi(
   const char *str
);
int _wtoi(
   const wchar_t *str
);
int _atoi_l(
   const char *str,
   _locale_t locale
);
int _wtoi_l(
   const wchar_t *str,
   _locale_t locale
);
```

### Parameters

_`str`_  
String to be converted.

_`locale`_  
Locale to use.

## Return value

Each function returns the **`int`** value produced by interpreting the input characters as a number. The return value is 0 for **`atoi`** and **`_wtoi`**, if the input can't be converted to a value of that type.

When the functions overflow with large negative integral values, `LONG_MIN` is returned. **`atoi`** and **`_wtoi`** return `INT_MAX` and `INT_MIN` on these conditions. In all out-of-range cases, `errno` is set to `ERANGE`. If the parameter passed in is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EINVAL` and return 0.

These functions convert a character string to an integer value (**`atoi`** and **`_wtoi`**). The input string is a sequence of characters that can be interpreted as a numerical value of the specified type. The function stops reading the input string at the first character that it can't recognize as part of a number. This character may be the null character ('\\0' or L'\\0') terminating the string.

The _`str`_ argument to **`atoi`** and **`_wtoi`** has the following form:

> \[_`whitespace`_\] \[_`sign`_\] \[_`digits`_\]

A _`whitespace`_ consists of space or tab characters, which are ignored; _`sign`_ is either plus (+) or minus (-); and _`digits`_ are one or more digits.

The versions of these functions with the **`_l`** suffix are identical except that they use the locale parameter passed in instead of the current locale. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_tstoi`**

**`atoi`**

**`atoi`**

**`_wtoi`**

**`_ttoi`**

**`atoi`**

**`atoi`**

**`_wtoi`**

## Requirements

Routines

Required header

**`atoi`**

`<stdlib.h>`

**`_atoi_l`**, **`_wtoi`**, **`_wtoi_l`**

`<stdlib.h>` or `<wchar.h>`

## Example

This program shows how numbers stored as strings can be converted to numeric values using the **`atoi`** functions.

```
// crt_atoi.c
// This program shows how numbers
// stored as strings can be converted to
// numeric values using the atoi functions.

#include <stdlib.h>
#include <stdio.h>
#include <errno.h>

int main( void )
{
    char    *str = NULL;
    int     value = 0;

    // An example of the atoi function.
    str = "  -2309 ";
    value = atoi( str );
    printf( "Function: atoi( \"%s\" ) = %d\n", str, value );

    // Another example of the atoi function.
    str = "31412764";
    value = atoi( str );
    printf( "Function: atoi( \"%s\" ) = %d\n", str, value );

    // Another example of the atoi function
    // with an overflow condition occurring.
    str = "3336402735171707160320";
    value = atoi( str );
    printf( "Function: atoi( \"%s\" ) = %d\n", str, value );
    if (errno == ERANGE)
    {
       printf("Overflow condition occurred.\n");
    }
}
```

```
Function: atoi( "  -2309 " ) = -2309
Function: atoi( "31412764" ) = 31412764
Function: atoi( "3336402735171707160320" ) = 2147483647
Overflow condition occurred.
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