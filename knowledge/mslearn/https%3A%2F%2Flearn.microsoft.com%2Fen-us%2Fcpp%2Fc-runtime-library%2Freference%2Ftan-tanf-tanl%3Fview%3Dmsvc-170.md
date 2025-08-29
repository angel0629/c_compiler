---
title: "tan, tanf, tanl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tan-tanf-tanl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates the tangent.

## Syntax

```
double tan( double x );
float tanf( float x );
long double tanl( long double x );
#define tan(x) // Requires C11 or later
```

```
float tan( float x );  // C++ only
long double tan( long double x );  // C++ only
```

### Parameters

_`x`_  
Angle in radians.

## Return value

The **`tan`** functions return the tangent of _`x`_. If _`x`_ is greater than or equal to 263, or less than or equal to -263, a loss of significance in the result occurs.

Input

SEH exception

`_matherr` exception

± QNaN, IND

none

`_DOMAIN`

± INF

`INVALID`

`_DOMAIN`

Because C++ allows overloading, you can call overloads of **`tan`** that take and return **`float`** or **`long double`** values. In a C program, unless you're using the `<tgmath.h>` macro to call this function, **`tan`** always takes and returns **`double`**.

If you use the `tan` macro from `<tgmath.h>`, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header (C)

Required header (C++)

**`tan`**, **`tanf`**, **`tanl`**

`<math.h>`

`<cmath>` or `<math.h>`

**`tan`** macro

`<tgmath.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_tan.c
// This program displays the tangent of pi / 4
// Compile by using: cl crt_tan.c

#include <math.h>
#include <stdio.h>

int main( void )
{
   double pi = 3.1415926535;
   double x;

   x = tan( pi / 4 );
   printf( "tan( %f ) = %f\n", pi/4, x );
}
```

```
tan( 0.785398 ) = 1.000000
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`acos`, `acosf`, `acosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/acos-acosf-acosl?view=msvc-170)  
[`asin`, `asinf`, `asinl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asin-asinf-asinl?view=msvc-170)  
[`atan`, `atanf`, `atanl`, `atan2`, `atan2f`, `atan2l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atan-atanf-atanl-atan2-atan2f-atan2l?view=msvc-170)  
[`cos`, `cosf`, `cosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cos-cosf-cosl?view=msvc-170)  
[`sin`, `sinf`, `sinl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sin-sinf-sinl?view=msvc-170)  
[`_CItan`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/citan?view=msvc-170)