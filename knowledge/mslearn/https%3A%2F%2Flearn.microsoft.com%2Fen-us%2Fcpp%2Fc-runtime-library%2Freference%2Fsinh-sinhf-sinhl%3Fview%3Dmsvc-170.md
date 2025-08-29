---
title: "sinh, sinhf, sinhl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sinh-sinhf-sinhl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates the hyperbolic sine.

## Syntax

```
double sinh(double x);
float sinhf(float x);
long double sinhl(long double x);
#define sinh(x) // Requires C11 or later

float sinh(float x);  // C++ only
long double sinh(long double x);  // C++ only
```

### Parameters

_`x`_  
Angle in radians.

## Return value

The **`sinh`** functions return the hyperbolic sine of _`x`_. By default, if the result is too large, **`sinh`** sets `errno` to `ERANGE` and returns ±`HUGE_VAL`.

Input

SEH exception

`_matherr` exception

± QNaN, IND

None

`_DOMAIN`

`|x| ≥ 7.104760e+002`

`OVERFLOW`+`INEXACT`

`OVERFLOW`

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

Because C++ allows overloading, you can call overloads of **`sinh`** that take and return **`float`** or **`long double`** values. In a C program, unless you're using the `<tgmath.h>` macro to call this function, **`sinh`** always takes and returns **`double`**.

If you use the `sinh` macro from `<tgmath.h>`, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header (C)

Required header (C++)

**`sinh`**, **`sinhf`**, **`sinhl`**

`<math.h>`

`<cmath>` or `<math.h>`

**`sinh`** macro

`<tgmath.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_sinhcosh.c
// This program displays the hyperbolic
// sine and hyperbolic cosine of pi / 2.
// Compile by using: cl /W4 crt_sinhcosh.c

#include <math.h>
#include <stdio.h>

int main( void)
{
   double pi = 3.1415926535;
   double x, y;

   x = pi / 2;
   y = sinh( x );
   printf( "sinh( %f ) = %f\n",x, y );
   y = cosh( x );
   printf( "cosh( %f ) = %f\n",x, y );
}
```

```
sinh( 1.570796 ) = 2.301299
cosh( 1.570796 ) = 2.509178
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`acosh`, `acoshf`, `acoshl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/acosh-acoshf-acoshl?view=msvc-170)  
[`asinh`, `asinhf`, `asinhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asinh-asinhf-asinhl?view=msvc-170)  
[`atanh`, `atanhf`, `atanhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atanh-atanhf-atanhl?view=msvc-170)  
[`cosh`, `coshf`, `coshl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cosh-coshf-coshl?view=msvc-170)  
[`tanh`, `tanhf`, `tanhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tanh-tanhf-tanhl?view=msvc-170)