---
title: "rint, rintf, rintl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rint-rintf-rintl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Rounds a floating-point value to the nearest integer in floating-point format.

## Syntax

```
double rint( double x );
float rintf( float x );
long double rintl( long double x );
#define rint(X) // Requires C11 or later

float rint( float x );  // C++ only
long double rint( long double x );  // C++ only
```

### Parameters

_`x`_  
The floating-point value to round.

## Return value

The **`rint`** functions return a floating-point value that represents the nearest integer to _`x`_. Halfway values are rounded according to the current setting of the floating-point rounding mode, the same as the `nearbyint` functions. Unlike the `nearbyint` functions, the **`rint`** functions may raise the `FE_INEXACT` floating-point exception if the result differs in value from the argument. There's no error return.

Input

SEH exception

`_matherr` exception

± INF, QNaN, IND

none

none

Denormals

`EXCEPTION_FLT_UNDERFLOW`

none

Because C++ allows overloading, you can call overloads of **`rint`** that take and return **`float`** and **`long double`** values. In a C program, unless you're using the <tgmath.h> macro to call this function, **`rint`** always takes and returns a **`double`**.

If you use the <tgmath.h> `rint()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

C header

C++ header

**`rint`**, **`rintf`**, **`rintl`**

<math.h>

<cmath>

**`rint`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_rint.c
// Build with: cl /W3 /Tc crt_rint.c
// This example displays the rounded results of
// the floating-point values 2.499999, -2.499999,
// 2.8, -2.8, 2.5 and -2.5.

#include <math.h>
#include <stdio.h>

int main( void )
{
   double x = 2.499999;
   float y = 2.8f;
   long double z = 2.5;

   printf("rint(%f) is %.0f\n", x, rint (x));
   printf("rint(%f) is %.0f\n", -x, rint (-x));
   printf("rintf(%f) is %.0f\n", y, rintf(y));
   printf("rintf(%f) is %.0f\n", -y, rintf(-y));
   printf("rintl(%Lf) is %.0Lf\n", z, rintl(z));
   printf("rintl(%Lf) is %.0Lf\n", -z, rintl(-z));
}
```

```
rint(2.499999) is 2
rint(-2.499999) is -2
rintf(2.800000) is 3
rintf(-2.800000) is -3
rintl(2.500000) is 3
rintl(-2.500000) is -3
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`ceil`, `ceilf`, `ceill`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ceil-ceilf-ceill?view=msvc-170)  
[`floor`, `floorf`, `floorl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/floor-floorf-floorl?view=msvc-170)  
[`fmod`, `fmodf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmod-fmodf?view=msvc-170)  
[`lrint`, `lrintf`, `lrintl`, `llrint`, `llrintf`, `llrintl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lrint-lrintf-lrintl-llrint-llrintf-llrintl?view=msvc-170)  
[`lround`, `lroundf`, `lroundl`, `llround`, `llroundf`, `llroundl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lround-lroundf-lroundl-llround-llroundf-llroundl?view=msvc-170)  
[`nearbyint`, `nearbyintf`, `nearbyintl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/nearbyint-nearbyintf-nearbyintl1?view=msvc-170)  
[`rint`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rint-rintf-rintl?view=msvc-170)