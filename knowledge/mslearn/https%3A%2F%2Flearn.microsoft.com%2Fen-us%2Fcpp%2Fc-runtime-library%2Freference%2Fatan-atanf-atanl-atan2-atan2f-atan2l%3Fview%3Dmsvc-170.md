---
title: "atan, atanf, atanl, atan2, atan2f, atan2l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atan-atanf-atanl-atan2-atan2f-atan2l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates the arctangent of **`x`** (**`atan`**, **`atanf`**, and **`atanl`**) or the arctangent of **`y`**/**`x`** (**`atan2`**, **`atan2f`**, and **`atan2l`**).

## Syntax

```
double atan( double x );
float atanf( float x );
long double atanl( long double x );
#define atan(X) // Requires C11 or later

float atan( float x );  // C++ only
long double atan( long double x );  // C++ only

double atan2( double y, double x );
float atan2f( float y, float x );
long double atan2l( long double y, long double x );
#define atan2(Y, X) // Requires C11 or later

float atan2( float y, float x );  // C++ only
long double atan2( long double y, long double x );  // C++ only
```

### Parameters

_`x`_, _`y`_  
Any numbers.

## Return value

**`atan`** returns the arctangent of _`x`_ in the range -π/2 to π/2 radians. **`atan2`** returns the arctangent of _`y`_/_`x`_ in the range -π to π radians. If _`x`_ is 0, **`atan`** returns 0. If both parameters of **`atan2`** are 0, the function returns 0. All results are in radians.

**`atan2`** uses the signs of both parameters to determine the quadrant of the return value.

Input

SEH exception

`_matherr` exception

± QNaN, IND

none

`_DOMAIN`

The **`atan`** function calculates the arctangent (the inverse tangent function) of _`x`_. **`atan2`** calculates the arctangent of _`y`_/_`x`_ (if _`x`_ equals 0, **`atan2`** returns π/2 if _`y`_ is positive, -π/2 if _`y`_ is negative, or 0 if _`y`_ is 0.)

If you use the `atan` or `atan2` macro from `<tgmath.h>`, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

**`atan`** has an implementation that uses Streaming SIMD Extensions 2 (SSE2). For information and restrictions about using the SSE2 implementation, see [`_set_SSE2_enable`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-sse2-enable?view=msvc-170).

Because C++ allows overloading, you can call overloads of **`atan`** and **`atan2`** that take **`float`** or **`long double`** arguments. In a C program, unless you're using the `<tgmath.h>` macro to call this function, **`atan`** and **`atan2`** always take **`double`** arguments and return a **`double`**.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header (C)

Required header (C++)

**`atan`**, **`atan2`**, **`atanf`**, **`atan2f`**, **`atanl`**, **`atan2l`**

`<math.h>`

`<cmath>` or `<math.h>`

**`atan`**, **`atan2`** macros

`<tgmath.h>`

## Example

```
// crt_atan.c
// arguments: 5 0.5
#include <math.h>
#include <stdio.h>
#include <errno.h>

int main( int ac, char* av[] )
{
   double x, y, theta;
   if( ac != 3 ){
      fprintf( stderr, "Usage: %s <x> <y>\n", av[0] );
      return 1;
   }
   x = atof( av[1] );
   theta = atan( x );
   printf( "Arctangent of %f: %f\n", x, theta );
   y = atof( av[2] );
   theta = atan2( y, x );
   printf( "Arctangent of %f / %f: %f\n", y, x, theta );
   return 0;
}
```

```
Arctangent of 5.000000: 1.373401
Arctangent of 0.500000 / 5.000000: 0.099669
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`acos`, `acosf`, `acosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/acos-acosf-acosl?view=msvc-170)  
[`asin`, `asinf`, `asinl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asin-asinf-asinl?view=msvc-170)  
[`cos`, `cosf`, `cosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cos-cosf-cosl?view=msvc-170)  
[`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170)  
[`sin`, `sinf`, `sinl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sin-sinf-sinl?view=msvc-170)  
[`tan`, `tanf`, `tanl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tan-tanf-tanl?view=msvc-170)  
[`_CIatan`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ciatan?view=msvc-170)  
[`_CIatan2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ciatan2?view=msvc-170)