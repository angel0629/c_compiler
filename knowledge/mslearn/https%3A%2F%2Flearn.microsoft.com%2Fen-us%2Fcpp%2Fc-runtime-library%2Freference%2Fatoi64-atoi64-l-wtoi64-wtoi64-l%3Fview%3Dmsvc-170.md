---
title: "_atoi64, _atoi64_l, _wtoi64, _wtoi64_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atoi64-atoi64-l-wtoi64-wtoi64-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a string to a 64-bit integer.

## Syntax

```
__int64 _atoi64(
   const char *str
);
__int64 _wtoi64(
   const wchar_t *str
);
__int64 _atoi64_l(
   const char *str,
   _locale_t locale
);
__int64 _wtoi64_l(
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

Each function returns the **`__int64`** value produced by interpreting the input characters as a number. The return value is 0 for **`_atoi64`** if the input can't be converted to a value of that type.

If the functions overflow with large positive integral values, they return `I64_MAX`. The functions return `I64_MIN` if they overflow with large negative integral values.

In all out-of-range cases, `errno` is set to `ERANGE`. If the parameter passed in is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EINVAL` and return 0.

These functions convert a character string to a 64-bit integer value.

The input string is a sequence of characters that can be interpreted as a numerical value of the specified type. The function stops reading the input string at the first character that it can't recognize as part of a number. This character might be the null character ('\\0' or L'\\0') terminating the string.

The _`str`_ argument to **`_atoi64`** has the following form:

> \[_`whitespace`_\] \[_`sign`_\] \[_`digits`_\]

A _`whitespace`_ consists of space or tab characters, which are ignored; _`sign`_ is either plus (+) or minus (-); and _`digits`_ are one or more digits.

**`_wtoi64`** is identical to **`_atoi64`** except that it takes a wide character string as a parameter.

The versions of these functions with the `_l` suffix are identical except that they use the locale parameter passed in instead of the current locale. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tstoi64`

**`_atoi64`**

**`_atoi64`**

**`_wtoi64`**

`_ttoi64`

**`_atoi64`**

**`_atoi64`**

**`_wtoi64`**

## Requirements

Routines

Required header

**`_atoi64`**, **`_atoi64_l`**

<stdlib.h>

**`_wtoi64`**, **`_wtoi64_l`**

<stdlib.h> or <wchar.h>

## Example

This program shows how numbers stored as strings can be converted to numeric values using the **`_atoi64`** functions.

```
// crt_atoi64.c
// This program shows how numbers stored as
// strings can be converted to numeric values
// using the _atoi64 functions.
#include <stdlib.h>
#include <stdio.h>
#include <errno.h>

int main( void )
{
    char    *str = NULL;
    __int64 value = 0;

    // An example of the _atoi64 function
    // with leading and trailing white spaces.
    str = "  -2309 ";
    value = _atoi64( str );
    printf( "Function: _atoi64( \"%s\" ) = %d\n", str, value );

    // Another example of the _atoi64 function
    // with an arbitrary decimal point.
    str = "314127.64";
    value = _atoi64( str );
    printf( "Function: _atoi64( \"%s\" ) = %d\n", str, value );

    // Another example of the _atoi64 function
    // with an overflow condition occurring.
    str = "3336402735171707160320";
    value = _atoi64( str );
    printf( "Function: _atoi64( \"%s\" ) = %d\n", str, value );
    if (errno == ERANGE)
    {
       printf("Overflow condition occurred.\n");
    }
}
```

```
Function: _atoi64( "  -2309 " ) = -2309
Function: _atoi64( "314127.64" ) = 314127
Function: _atoi64( "3336402735171707160320" ) = -1
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