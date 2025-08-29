---
title: "fma, fmaf, fmal"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fma-fmaf-fmal?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Multiplies two values together, adds a third value, and then rounds the result, while only losing a small amount of precision due to intermediary rounding.

## Syntax

```
double fma(
   double x,
   double y,
   double z
);

float fma(
   float  x,
   float  y,
   float z
); //C++ only

long double fma(
   long double  x,
   long double  y,
   long double z
); //C++ only

float fmaf(
   float  x,
   float  y,
   float z
);

long double fmal(
   long double  x,
   long double  y,
   long double z
);

#define fma(X, Y, Z) // Requires C11 or later
```

### Parameters

_`x`_  
The first value to multiply.

_`y`_  
The second value to multiply.

_`z`_  
The value to add.

## Return value

Returns approximately `(x * y) + z`. The return value is then rounded using the current rounding format, although in many cases, it returns incorrectly rounded results and thus the value may be inexact by up to half an ulp from the correct value.

Otherwise, may return one of the following values:

Issue

Return

_`x`_ = INFINITY, _`y`_ = 0 or

_`x`_ = 0, _`y`_ = INFINITY

NaN

_`x`_ or _`y`_ = exact ± INFINITY, _`z`_ = INFINITY with the opposite sign

NaN

_`x`_ or _`y`_ = NaN

NaN

not (_`x`_ = 0, _`y`_\= indefinite) and _`z`_ = NaN

not (_`x`_\=indefinite, _`y`_\=0) and _`z`_ = NaN

NaN

Overflow range error

±`HUGE_VAL`, ±`HUGE_VALF`, or ±`HUGE_VALL`

Underflow range error

correct value, after rounding.

Errors are reported as specified in [`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170).

Because C++ allows overloading, you can call overloads of **`fma`** that take and return **`float`** and **`long double`** types. In a C program, unless you're using the <tgmath.h> macro to call this function, **`fma`** always takes and returns a **`double`**.

If you use the <tgmath.h> `fma()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

This function computes the value as though it were taken to infinite precision, and then rounds the final result.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

C header

C++ header

**`fma`**, **`fmaf`**, **`fmal`**

<math.h>

<cmath>

**`fma`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`remainder`, `remainderf`, `remainderl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/remainder-remainderf-remainderl?view=msvc-170)  
[`remquo`, `remquof`, `remquol`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/remquo-remquof-remquol?view=msvc-170)