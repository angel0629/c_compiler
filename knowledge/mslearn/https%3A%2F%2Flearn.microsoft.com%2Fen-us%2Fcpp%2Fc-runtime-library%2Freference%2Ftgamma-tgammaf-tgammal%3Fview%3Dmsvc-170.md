---
title: "tgamma, tgammaf, tgammal"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tgamma-tgammaf-tgammal?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines the gamma function of the specified value.

## Syntax

```
double tgamma(
   double x
);

float tgammaf(
   float x
);

long double tgammal(
   long double x
);

#define tgamma(X) // Requires C11 or later

float tgamma(
   float x
); //C++ only

long double tgamma(
   long double x
); //C++ only
```

### Parameters

_`x`_  
The value to find the gamma of.

## Return value

If successful, returns the gamma of _`x`_.

A range error may occur if the magnitude of _`x`_ is too large or too small for the data type. A domain error or range error may occur if _`x`_ <= 0.

Issue

Return

_`x`_ = ±0

±INFINITY

_`x`_ = negative integer

NaN

_`x`_ = -INFINITY

NaN

_`x`_ = +INFINITY

+INFINITY

_`x`_ = NaN

NaN

domain error

NaN

pole error

±`HUGE_VAL`, ±`HUGE_VALF`, or ±`HUGE_VALL`

overflow range error

±`HUGE_VAL`, ±`HUGE_VALF`, or ±`HUGE_VALL`

underflow range error

the correct value, after rounding.

Errors are reported as specified in [`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170).

Because C++ allows overloading, you can call overloads of **`tgamma`** that take and return **`float`** and **`long double`** types. In a C program, unless you're using the <tgmath.h> macro to call this function, **`tgamma`** always takes and returns a **`double`**.

If you use the <tgmath.h> `tgamma()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

If x is a natural number, this function returns the factorial of (x-1).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

C header

C++ header

**`tgamma`**, **`tgammaf`**, **`tgammal`**

<math.h>

<cmath>

**`tgamma`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`lgamma`, `lgammaf`, `lgammal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lgamma-lgammaf-lgammal?view=msvc-170)