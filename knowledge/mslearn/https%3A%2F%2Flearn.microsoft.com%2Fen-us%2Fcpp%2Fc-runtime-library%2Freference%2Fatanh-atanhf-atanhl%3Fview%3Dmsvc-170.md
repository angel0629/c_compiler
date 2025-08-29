---
title: "atanh, atanhf, atanhl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atanh-atanhf-atanhl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates the inverse hyperbolic tangent.

## Syntax

```
double atanh( double x );
float atanhf( float x );
long double atanhl( long double x );
#define atanh(X) // Requires C11 or later

float atanh( float x );  // C++ only
long double atanh( long double x );  // C++ only
```

### Parameters

_`x`_  
Floating-point value.

## Return value

The **`atanh`** functions return the inverse hyperbolic tangent (arc hyperbolic tangent) of _`x`_. If _`x`_ is greater than 1, or less than -1, `errno` is set to `EDOM` and the result is a quiet NaN. If _`x`_ is equal to 1 or -1, a positive or negative infinity is returned, respectively, and `errno` is set to `ERANGE`.

Input

SEH exception

`_matherr` exception

± QNaN, IND

none

none

_`X`_ ≥ 1; _`x`_ ≤ -1

none

none

Because C++ allows overloading, you can call overloads of **`atanh`** that take and return **`float`** or **`long double`** values. In a C program, unless you're using the <tgmath.h> macro to call this function, **`atanh`** always takes and returns **`double`**.

If you use the <tgmath.h> `atanh()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

C header

C++ header

**`atanh`**, **`atanhf`**, **`atanhl`**

<math.h>

<cmath> or <math.h>

**`atanh`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_atanh.c
// This program displays the hyperbolic tangent of pi / 4
// and the arc hyperbolic tangent of the result.
//

#include <math.h>
#include <stdio.h>

int main( void )
{
   double pi = 3.1415926535;
   double x, y;

   x = tanh( pi / 4 );
   y = atanh( x );
   printf( "tanh( %f ) = %f\n", pi/4, x );
   printf( "atanh( %f ) = %f\n", x, y );
}
```

```
tanh( 0.785398 ) = 0.655794
atanh( 0.655794 ) = 0.785398
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`acosh`, `acoshf`, `acoshl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/acosh-acoshf-acoshl?view=msvc-170)  
[`asinh`, `asinhf`, `asinhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asinh-asinhf-asinhl?view=msvc-170)  
[`cosh`, `coshf`, `coshl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cosh-coshf-coshl?view=msvc-170)  
[`sinh`, `sinhf`, `sinhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sinh-sinhf-sinhl?view=msvc-170)  
[`tanh`, `tanhf`, `tanhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tanh-tanhf-tanhl?view=msvc-170)