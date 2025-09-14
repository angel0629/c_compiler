---
title: "_gcvt"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gcvt?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a floating-point value to a string, which it stores in a buffer. A more secure version of this function is available; see [`_gcvt_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gcvt-s?view=msvc-170).

## Syntax

```
char *_gcvt(
   double value,
   int digits,
   char *buffer
);
```

### Parameters

_`value`_  
Value to be converted.

_`digits`_  
Number of significant digits stored.

_`buffer`_  
Storage location for the result.

## Return value

**`_gcvt`** returns a pointer to the string of digits.

The **`_gcvt`** function converts a floating-point _`value`_ to a character string (which includes a decimal point and a possible sign byte) and stores the string in _`buffer`_. The _`buffer`_ should be large enough to accommodate the converted value plus a terminating null character, which is appended automatically. If a buffer size of _`digits`_ + 1 is used, the function overwrites the end of the buffer. The overwrite happens because the converted string includes a decimal point and can also contain sign and exponent information. The function doesn't account for the overflow. **`_gcvt`** attempts to produce _`digits`_ digits in decimal format. If it can't, it produces _`digits`_ digits in exponential format. Trailing zeros might be suppressed in the conversion.

A _`buffer`_ of length `_CVTBUFSIZE` is sufficient for any floating point value.

This function validates its parameters. If _`buffer`_ is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function sets `errno` to `EINVAL` and returns `NULL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_gcvt`**

<stdlib.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_gcvt.c
// compile with: /W3
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main( void )
{
   char buffer[_CVTBUFSIZE];
   double value = -1234567890.123;
   printf( "The following numbers were converted by _gcvt(value,12,buffer):\n" );
   _gcvt( value, 12, buffer ); // C4996
   // Note: _gcvt is deprecated; consider using _gcvt_s instead
   printf( "buffer: '%s' (%d chars)\n", buffer, strlen(buffer) );
   value *= 10;
   _gcvt( value, 12, buffer ); // C4996
   printf( "buffer: '%s' (%d chars)\n", buffer, strlen(buffer) );
   value *= 10;
   _gcvt( value, 12, buffer ); // C4996
   printf( "buffer: '%s' (%d chars)\n", buffer, strlen(buffer) );
   value *= 10;
   _gcvt( value, 12, buffer ); // C4996
   printf( "buffer: '%s' (%d chars)\n", buffer, strlen(buffer) );

   printf( "\n" );
   value = -12.34567890123;
   _gcvt( value, 12, buffer ); // C4996
   printf( "buffer: '%s' (%d chars)\n", buffer, strlen(buffer) );
   value /= 10;
   _gcvt( value, 12, buffer ); // C4996
   printf( "buffer: '%s' (%d chars)\n", buffer, strlen(buffer) );
   value /= 10;
   _gcvt( value, 12, buffer ); // C4996
   printf( "buffer: '%s' (%d chars)\n", buffer, strlen(buffer) );
   value /= 10;
   _gcvt( value, 12, buffer ); // C4996
   printf( "buffer: '%s' (%d chars)\n", buffer, strlen(buffer) );
}
```

```
The following numbers were converted by _gcvt(value,12,buffer):
buffer: '-1234567890.12' (14 chars)
buffer: '-12345678901.2' (14 chars)
buffer: '-123456789012' (13 chars)
buffer: '-1.23456789012e+012' (19 chars)

buffer: '-12.3456789012' (14 chars)
buffer: '-1.23456789012' (14 chars)
buffer: '-0.123456789012' (15 chars)
buffer: '-1.23456789012e-002' (19 chars)
```

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`atof`, `_atof_l`, `_wtof`, `_wtof_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atof-atof-l-wtof-wtof-l?view=msvc-170)  
[`_ecvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ecvt?view=msvc-170)  
[`_fcvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fcvt?view=msvc-170)