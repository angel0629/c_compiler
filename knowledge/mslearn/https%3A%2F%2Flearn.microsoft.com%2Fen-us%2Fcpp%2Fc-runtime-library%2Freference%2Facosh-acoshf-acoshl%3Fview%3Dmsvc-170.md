---
title: "acosh, acoshf, acoshl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/acosh-acoshf-acoshl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates the inverse hyperbolic cosine.

## Syntax

```
double acosh( double x );
float acoshf( float x );
long double acoshl( long double x );
#define acosh(X) // Requires C11 or later

float acosh( float x );  // C++ only
long double acosh( long double x );  // C++ only
```

### Parameters

_`x`_  
Floating-point value.

## Return value

The **`acosh`** functions return the inverse hyperbolic cosine (arc hyperbolic cosine) of _`x`_. These functions are valid over the domain _`x`_ ≥ 1. If _`x`_ is less than 1, `errno` is set to `EDOM`, and the result is a quiet NaN. If _`x`_ is a quiet NaN, indefinite, or infinity, the same value is returned.

Input

SEH exception

`_matherr` exception

± QNaN, IND, INF

none

none

_`x`_ < 1

none

none

When you use C++, you can call overloads of **`acosh`** that take and return **`float`** or **`long double`** values. In a C program, unless you're using the <tgmath.h> macro to call this function, **`acosh`** always takes and returns **`double`**.

If you use the <tgmath.h> `acosh()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

C header

C++ header

**`acosh`**, **`acoshf`**, **`acoshl`**

<math.h>

<cmath>

**`acosh`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_acosh.c
// Compile by using: cl /W4 crt_acosh.c
// This program displays the hyperbolic cosine of pi / 4
// and the arc hyperbolic cosine of the result.

#include <math.h>
#include <stdio.h>

int main( void )
{
   double pi = 3.1415926535;
   double x, y;

   x = cosh( pi / 4 );
   y = acosh( x );
   printf( "cosh( %f ) = %f\n", pi/4, x );
   printf( "acosh( %f ) = %f\n", x, y );
}
```

```
cosh( 0.785398 ) = 1.324609
acosh( 1.324609 ) = 0.785398
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`asinh`, `asinhf`, `asinhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asinh-asinhf-asinhl?view=msvc-170)  
[`atanh`, `atanhf`, `atanhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atanh-atanhf-atanhl?view=msvc-170)  
[`cosh`, `coshf`, `coshl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cosh-coshf-coshl?view=msvc-170)  
[`sinh`, `sinhf`, `sinhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sinh-sinhf-sinhl?view=msvc-170)  
[`tanh`, `tanhf`, `tanhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tanh-tanhf-tanhl?view=msvc-170)