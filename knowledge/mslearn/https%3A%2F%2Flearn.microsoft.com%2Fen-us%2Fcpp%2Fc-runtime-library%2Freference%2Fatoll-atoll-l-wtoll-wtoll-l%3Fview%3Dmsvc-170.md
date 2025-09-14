---
title: "atoll, _atoll_l, _wtoll, _wtoll_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atoll-atoll-l-wtoll-wtoll-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a string to a **`long long`** integer.

## Syntax

```
long long atoll(
   const char *str
);
long long _wtoll(
   const wchar_t *str
);
long long _atoll_l(
   const char *str,
   _locale_t locale
);
long long _wtoll_l(
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

Each function returns the **`long long`** value that's produced by interpreting the input characters as a number. The return value for **`atoll`** is 0 if the input can't be converted to a value of that type.

For overflow with large positive integral values, **`atoll`** returns `LLONG_MAX`, and for overflow with large negative integral values, it returns `LLONG_MIN`.

In all out-of-range cases, `errno` is set to `ERANGE`. If the parameter that's passed in is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EINVAL` and return 0.

These functions convert a character string to a **`long long`** integer value.

The input string is a sequence of characters that can be interpreted as a numerical value of the specified type. The function stops reading the input string at the first character that it can't recognize as part of a number. This character might be the null character ('\\0' or L'\\0') that terminates the string.

The _`str`_ argument to **`atoll`** has the following form:

> \[_`whitespace`_\] \[_`sign`_\] \[_`digits`_\]

A _`whitespace`_ consists of space or tab characters, which are ignored; _`sign`_ is either plus (+) or minus (-); and _`digits`_ are one or more digits.

**`_wtoll`** is identical to **`atoll`** except that it takes a wide character string as a parameter.

The versions of these functions that have the `_l` suffix are identical to the versions that don't have it, except that they use the locale parameter that's passed in instead of the current locale. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tstoll`

**`atoll`**

**`atoll`**

**`_wtoll`**

`_tstoll_l`

**`_atoll_l`**

**`_atoll_l`**

**`_wtoll_l`**

`_ttoll`

**`_atoll`**

**`_atoll`**

**`_wtoll`**

## Requirements

Routines

Required header

**`atoll`**, **`_atoll_l`**

<stdlib.h>

**`_wtoll`**, **`_wtoll_l`**

<stdlib.h> or <wchar.h>

## Example

This program shows how to use the **`atoll`** functions to convert numbers stored as strings to numeric values.

```
// crt_atoll.c
// Build with: cl /W4 /Tc crt_atoll.c
// This program shows how to use the atoll
// functions to convert numbers stored as
// strings to numeric values.
#include <stdlib.h>
#include <stdio.h>
#include <errno.h>

int main(void)
{
    char *str = NULL;
    long long value = 0;

    // An example of the atoll function
    // with leading and trailing white spaces.
    str = "  -27182818284 ";
    value = atoll(str);
    printf("Function: atoll(\"%s\") = %lld\n", str, value);

    // Another example of the atoll function
    // with an arbitrary decimal point.
    str = "314127.64";
    value = atoll(str);
    printf("Function: atoll(\"%s\") = %lld\n", str, value);

    // Another example of the atoll function
    // with an overflow condition occurring.
    str = "3336402735171707160320";
    value = atoll(str);
    printf("Function: atoll(\"%s\") = %lld\n", str, value);
    if (errno == ERANGE)
    {
       printf("Overflow condition occurred.\n");
    }
}
```

```
Function: atoll("  -27182818284 ") = -27182818284
Function: atoll("314127.64") = 314127
Function: atoll("3336402735171707160320") = 9223372036854775807
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