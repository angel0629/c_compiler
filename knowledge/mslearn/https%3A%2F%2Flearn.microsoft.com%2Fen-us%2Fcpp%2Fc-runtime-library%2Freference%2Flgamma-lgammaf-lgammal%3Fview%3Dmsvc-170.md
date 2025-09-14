---
title: "lgamma, lgammaf, lgammal"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lgamma-lgammaf-lgammal?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines the natural logarithm of the absolute value of the gamma function of the specified value.

## Syntax

```
double lgamma( double x );
float lgammaf( float x );
long double lgammal( long double x );
#define lgammal(X) // Requires C11 or later

float lgamma( float x ); //C++ only
long double lgamma( long double x ); //C++ only
```

### Parameters

_`x`_  
The value to compute.

## Return value

If successful, return the natural logarithm of the absolute value of the gamma function of _`x`_.

Issue

Return

_`x`_ = NaN

NaN

_`x`_ = ±0

+INFINITY

_`x`_\= negative integer

+INFINITY

±INFINITY

+INFINITY

pole error

+`HUGE_VAL`, +`HUGE_VALF`, or +`HUGE_VALL`

overflow range error

±`HUGE_VAL`, ±`HUGE_VALF`, or ±`HUGE_VALL`

Errors are reported as specified in [`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170).

Because C++ allows overloading, you can call overloads of **`lgamma`** that take and return **`float`** and **`long double`** types. In a C program, unless you're using the <tgmath.h> macro to call this function, **`lgamma`** always takes and returns a **`double`**.

If you use the <tgmath.h> `lgamma()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

If x is a rational number, this function returns the logarithm of the factorial of (x - 1).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

C header

C++ header

**`lgamma`**, **`lgammaf`**, **`lgammal`**

<math.h>

<cmath>

**`lgamma`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`tgamma`, `tgammaf`, `tgammal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tgamma-tgammaf-tgammal?view=msvc-170)