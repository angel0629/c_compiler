---
title: "fmin, fminf, fminl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmin-fminf-fminl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines the smaller of the two specified values.

## Syntax

```
double fmin(
   double x,
   double y
);

float fmin(
   float x,
   float y
); //C++ only

long double fmin(
   long double x,
   long double y
); //C++ only

float fminf(
   float x,
   float y
);

long double fminl(
   long double x,
   long double y
);

#define fmin(x) // Requires C11 or later
```

### Parameters

_`x`_  
The first value to compare.

_`y`_  
The second value to compare.

## Return value

If successful, returns the smaller of _`x`_ or _`y`_.

Input

Result

_`x`_ is NaN

_`y`_

_`y`_ is NaN

_`x`_

_`x`_ and _`y`_ are NaN

NaN

The function doesn't cause [`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170) to be invoked, cause any floating-point exceptions, or change the value of `errno`.

Because C++ allows overloading, you can call overloads of **`fmin`** that take and return **`float`** and **`long double`** types. In a C program, unless you're using the <tgmath.h> macro to call this function, **`fmin`** always takes and returns a **`double`**.

If you use the <tgmath.h> `fmin()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

## Requirements

Routine

Required header

**`fmin`**, **`fminf`**, **`fminl`**

C: <math.h>  
C++: <math.h> or <cmath>

**`fmin`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`fmax`, `fmaxf`, `fmaxl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmax-fmaxf-fmaxl?view=msvc-170)