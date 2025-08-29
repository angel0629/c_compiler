---
title: "nearbyint, nearbyintf, nearbyintl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/nearbyint-nearbyintf-nearbyintl1?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Rounds the specified floating-point value to an integer, and returns that value in a floating-point format.

## Syntax

```
double nearbyint( double x );
float nearbyintf( float x );
long double nearbyintl( long double x );
#define nearbyint( X ) // Requires C11 or later

float nearbyint( float x ); //C++ only
long double nearbyint( long double x ); //C++ only
```

### Parameters

_`x`_  
The value to round.

## Return value

If successful, returns _`x`_, rounded to the nearest integer, using the current rounding format as reported by [`fegetround`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetround-fesetround2?view=msvc-170). Otherwise, the function may return one of the following values:

Issue

Return

_`x`_ = ±INFINITY

±INFINITY, unmodified

_`x`_ = ±0

±0, unmodified

_`x`_ = NaN

NaN

Errors aren't reported through [`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170); specifically, this function doesn't report any `FE_INEXACT` exceptions.

The primary difference between this function and [`rint`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rint-rintf-rintl?view=msvc-170) is that this function doesn't raise the inexact floating point exception.

Because the maximum floating-point values are exact integers, this function will never overflow by itself; rather, the output may overflow the return value, depending on which version of the function you use.

C++ allows overloading, so you can call overloads of **`nearbyint`** that take and return **`float`** or **`long double`** parameters. In a C program, unless you're using the <tgmath.h> macro to call this function, **`nearbyint`** always takes two double values and returns a double value.

If you use the <tgmath.h> `nearbyint()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

C header

C++ header

**`nearbyint`**, **`nearbyintf`**, **`nearbyintl`**

<math.h>

<cmath> or <math.h>

**`nearbyint`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)