---
title: "_fcvt"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fcvt?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a floating-point number to a string. A more secure version of this function is available; see [`_fcvt_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fcvt-s?view=msvc-170).

## Syntax

```
char *_fcvt(
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
Number of digits after the decimal point.

_`dec`_  
Pointer to the stored decimal-point position.

_`sign`_  
Pointer to the stored sign indicator.

## Return value

**`_fcvt`** returns a pointer to the string of digits, `NULL` on error.

The **`_fcvt`** function converts a floating-point number to a null-terminated character string. The _`value`_ parameter is the floating-point number to be converted. **`_fcvt`** stores the digits of _`value`_ as a string and appends a null character ('\\0'). The _`count`_ parameter specifies the number of digits to be stored after the decimal point. Excess digits are rounded off to _`count`_ places. If there are fewer than _`count`_ digits of precision, the string is padded with zeros.

The total number of digits returned by **`_fcvt`** won't exceed `_CVTBUFSIZE`.

Only digits are stored in the string. The position of the decimal point and the sign of _`value`_ can be obtained from _`dec`_ and sign after the call. The _`dec`_ parameter points to an integer value; this integer value gives the position of the decimal point with respect to the beginning of the string. A zero or negative integer value indicates that the decimal point lies to the left of the first digit. The parameter _`sign`_ points to an integer indicating the sign of _`value`_. The integer is set to 0 if _`value`_ is positive and is set to a nonzero number if _`value`_ is negative.

The difference between `_ecvt` and **`_fcvt`** is in the interpretation of the _`count`_ parameter. `_ecvt` interprets _`count`_ as the total number of digits in the output string, whereas **`_fcvt`** interprets _`count`_ as the number of digits after the decimal point.

`_ecvt` and **`_fcvt`** use a single statically allocated buffer for the conversion. Each call to one of these routines destroys the results of the previous call.

This function validates its parameters. If _`dec`_ or _`sign`_ is `NULL`, or _`count`_ is 0, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL`, and `NULL` is returned.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`_fcvt`**

<stdlib.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_fcvt.c
// compile with: /W3
// This program converts the constant
// 3.1415926535 to a string and sets the pointer
// buffer to point to that string.

#include <stdlib.h>
#include <stdio.h>

int main( void )
{
   int  decimal, sign;
   char *buffer;
   double source = 3.1415926535;

   buffer = _fcvt( source, 7, &decimal, &sign ); // C4996
   // Note: _fcvt is deprecated; consider using _fcvt_s instead
   printf( "source: %2.10f   buffer: '%s'   decimal: %d   sign: %d\n",
            source, buffer, decimal, sign );
}
```

```
source: 3.1415926535   buffer: '31415927'   decimal: 1   sign: 0
```

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`atof`, `_atof_l`, `_wtof`, `_wtof_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atof-atof-l-wtof-wtof-l?view=msvc-170)  
[`_ecvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ecvt?view=msvc-170)  
[`_gcvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gcvt?view=msvc-170)