---
title: "asinh, asinhf, asinhl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asinh-asinhf-asinhl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates the inverse hyperbolic sine.

## Syntax

```
double asinh( double x );
float asinhf( float x );
long double asinhl( long double x );
#define asinh(X) // Requires C11 or later

float asinh( float x );  // C++ only
long double asinh( long double x );  // C++ only
```

### Parameters

_`x`_  
Floating-point value.

## Return value

The **`asinh`** functions return the inverse hyperbolic sine (arc hyperbolic sine) of _`x`_. This function is valid over the floating-point domain. If _`x`_ is a quiet NaN, indefinite, or infinity, the same value is returned.

Input

SEH exception

`_matherr` exception

± QNaN, IND, INF

none

none

When you use C++, you can call overloads of **`asinh`** that take and return **`float`** or **`long double`** values. In a C program, unless you're using the <tgmath.h> macro to call this function, **`asinh`** always takes and returns **`double`**.

If you use the <tgmath.h> `asinh()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required C header

Required C++ header

**`asinh`**, **`asinhf`**, **`asinhl`**

<math.h>

<cmath> or <math.h>

**asinh()** macro

<tgmath.h>

For additional compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_asinh.c
// Compile by using: cl /W4 crt_asinh.c
// This program displays the hyperbolic sine of pi / 4
// and the arc hyperbolic sine of the result.

#include <math.h>
#include <stdio.h>

int main( void )
{
   double pi = 3.1415926535;
   double x, y;

   x = sinh( pi / 4 );
   y = asinh( x );
   printf( "sinh( %f ) = %f\n", pi/4, x );
   printf( "asinh( %f ) = %f\n", x, y );
}
```

```
sinh( 0.785398 ) = 0.868671
asinh( 0.868671 ) = 0.785398
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`acosh`, `acoshf`, `acoshl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/acosh-acoshf-acoshl?view=msvc-170)  
[`atanh`, `atanhf`, `atanhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atanh-atanhf-atanhl?view=msvc-170)  
[`cosh`, `coshf`, `coshl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cosh-coshf-coshl?view=msvc-170)  
[`sinh`, `sinhf`, `sinhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sinh-sinhf-sinhl?view=msvc-170)  
[`tanh`, `tanhf`, `tanhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tanh-tanhf-tanhl?view=msvc-170)