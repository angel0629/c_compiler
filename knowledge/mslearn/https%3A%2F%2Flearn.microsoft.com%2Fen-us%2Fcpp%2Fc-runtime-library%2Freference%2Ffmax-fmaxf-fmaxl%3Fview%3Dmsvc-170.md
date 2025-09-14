---
title: "fmax, fmaxf, fmaxl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmax-fmaxf-fmaxl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determine the larger of two specified numeric values.

## Syntax

```
double fmax(
   double x,
   double y
);

float fmax(
   float x,
   float y
); //C++ only

long double fmax(
   long double x,
   long double y
); //C++ only

float fmaxf(
   float x,
   float y
);

long double fmaxl(
   long double x,
   long double y
);

#define fmax(X, Y) // Requires C11 or later
```

### Parameters

_`x`_  
The first value to compare.

_`y`_  
The second value to compare.

## Return value

If successful, returns the larger of _`x`_ or _`y`_. The value returned is exact, and doesn't depend on any form of rounding.

Otherwise, may return one of the following values:

Issue

Return

_`x`_ = NaN

_`y`_

_`y`_ = NaN

_`x`_

_`x`_ and _`y`_ = NaN

NaN

This function doesn't use the errors specified in [`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170).

Because C++ allows overloading, you can call overloads of fmax that take and return `float` and `long double` types. In a C program, unless you're using the <tgmath.h> macro to call this function, `fmax` always takes and returns a double.

If you use the <tgmath.h> `fmax()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

## Requirements

Function

C header

C++ header

**`fmax`**, **`fmaxf`**, **`fmaxl`**

<math.h>

<cmath> or <math.h>

**`fmax`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`fmin`, `fminf`, `fminl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmin-fminf-fminl?view=msvc-170)