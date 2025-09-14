---
title: "modf, modff, modfl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/modf-modff-modfl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Splits a floating-point value into fractional and integer parts.

## Syntax

```
double modf( double x, double * intptr );
float modff( float x, float * intptr );
long double modfl( long double x, long double * intptr );
```

```
float modf( float x, float * intptr );  // C++ only
long double modf( long double x, long double * intptr );  // C++ only
```

### Parameters

_`x`_  
Floating-point value.

_`intptr`_  
Pointer to stored integer portion.

## Return value

This function returns the signed fractional portion of _`x`_. There's no error return.

The **`modf`** functions break down the floating-point value _`x`_ into fractional and integer parts, each of which has the same sign as _`x`_. The signed fractional portion of _`x`_ is returned. The integer portion is stored as a floating-point value at _`intptr`_.

**`modf`** has an implementation that uses Streaming SIMD Extensions 2 (SSE2). See [`_set_SSE2_enable`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-sse2-enable?view=msvc-170) for information and restrictions on using the SSE2 implementation.

C++ allows overloading, so you can call overloads of **`modf`** that take and return **`float`** or **`long double`** parameters. In a C program, **`modf`** always takes two double values and returns a double value.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`modf`**, **`modff`**, **`modfl`**

C: `<math.h>`

C++: , `<cmath>` or `<math.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_modf.c

#include <math.h>
#include <stdio.h>

int main( void )
{
   double x, y, n;

   x = -14.87654321;      /* Divide x into its fractional */
   y = modf( x, &n );     /* and integer parts            */

   printf( "For %f, the fraction is %f and the integer is %.f\n",
           x, y, n );
}
```

```
For -14.876543, the fraction is -0.876543 and the integer is -14
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`frexp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/frexp?view=msvc-170)  
[`ldexp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ldexp?view=msvc-170)