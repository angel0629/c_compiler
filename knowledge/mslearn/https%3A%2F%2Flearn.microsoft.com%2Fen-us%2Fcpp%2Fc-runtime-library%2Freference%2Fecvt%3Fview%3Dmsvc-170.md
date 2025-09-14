---
title: "_ecvt"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ecvt?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a **`double`** number to a string. A more secure version of this function is available; see [`_ecvt_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ecvt-s?view=msvc-170).

## Syntax

```
char *_ecvt(
   double value,
   int count,
   int *dec,
   int *sign
);
```

### Parameters

_`value`_  
Number to be converted.

_`count`_  
Number of digits stored.

_`dec`_  
Stored decimal-point position.

_`sign`_  
Sign of the converted number.

## Return value

**`_ecvt`** returns a pointer to the string of digits; `NULL` if an error occurred.

The **`_ecvt`** function converts a floating-point number to a character string. The _`value`_ parameter is the floating-point number to be converted. This function stores up to _`count`_ digits of _`value`_ as a string and appends a null character ('\\0'). If the number of digits in _`value`_ exceeds _`count`_, the low-order digit is rounded. If there are fewer than _`count`_ digits, the string is padded with zeros.

The total number of digits returned by **`_ecvt`** won't exceed `_CVTBUFSIZE`.

Only digits are stored in the string. The position of the decimal point and the sign of _`value`_ can be obtained from _`dec`_ and _`sign`_ after the call. The _`dec`_ parameter points to an integer value giving the position of the decimal point with respect to the beginning of the string. A 0 or negative integer value indicates that the decimal point lies to the left of the first digit. The _`sign`_ parameter points to an integer that indicates the sign of the converted number. If the integer value is 0, the number is positive. Otherwise, the number is negative.

The difference between **`_ecvt`** and `_fcvt` is in the interpretation of the _`count`_ parameter. **`_ecvt`** interprets _`count`_ as the total number of digits in the output string, whereas `_fcvt` interprets _`count`_ as the number of digits after the decimal point.

**`_ecvt`** and `_fcvt` use a single statically allocated buffer for the conversion. Each call to one of these routines destroys the result of the previous call.

This function validates its parameters. If _`dec`_ or _`sign`_ is `NULL`, or _`count`_ is 0, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to **EINVAL,** and `NULL` is returned.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`_ecvt`**

<stdlib.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_ecvt.c
// compile with: /W3
// This program uses _ecvt to convert a
// floating-point number to a character string.

#include <stdlib.h>
#include <stdio.h>

int main( void )
{
   int     decimal,   sign;
   char    *buffer;
   int     precision = 10;
   double  source = 3.1415926535;

   buffer = _ecvt( source, precision, &decimal, &sign ); // C4996
   // Note: _ecvt is deprecated; consider using _ecvt_s instead
   printf( "source: %2.10f   buffer: '%s'  decimal: %d  sign: %d\n",
           source, buffer, decimal, sign );
}
```

```
source: 3.1415926535   buffer: '3141592654'  decimal: 1  sign: 0
```

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`atof`, `_atof_l`, `_wtof`, `_wtof_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atof-atof-l-wtof-wtof-l?view=msvc-170)  
[`_fcvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fcvt?view=msvc-170)  
[`_gcvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gcvt?view=msvc-170)