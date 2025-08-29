---
title: "fdim, fdimf, fdiml"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fdim-fdimf-fdiml?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines the positive difference between the first and second values.

## Syntax

```
double fdim(
   double x,
   double y
);

float fdim(
   float x,
   float y
); //C++ only

long double fdim(
   long double x,
   long double y
); //C++ only

float fdimf(
   float x,
   float y
);

long double fdiml(
   long double x,
   long double y
);

#define fdim(X) // Requires C11 or later
```

### Parameters

_`x`_  
The first value.

_`y`_  
The second value.

## Return value

Returns the positive difference between _`x`_ and _`y`_:

Return value

Scenario

`x-y`

if _`x`_ > _`y`_

0

if _`x`_ <= _`y`_

Otherwise, may return one of the following errors:

Issue

Return

Overflow range error

+HUGE\_VAL, +HUGE\_VALF, or +HUGE\_VALL

Underflow range error

correct value (after rounding)

_`x`_ or _`y`_ is NaN

NaN

Errors are reported as specified in [`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170).

Because C++ allows overloading, you can call overloads of **`fdim`** that take and return **`float`** and **`long double`** types. In a C program, unless you're using the <tgmath.h> macro to call this function, **`fdim`** always takes and returns a **`double`**.

If you use the <tgmath.h> `fdim()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

Except for the NaN handling, this function is equivalent to `fmax(x - y, 0)`.

## Requirements

Function

C header

C++ header

**`fdim`**, **`fdimf`**, **`fdiml`**

<math.h>

<cmath>

**`fdim`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`fmax`, `fmaxf`, `fmaxl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmax-fmaxf-fmaxl?view=msvc-170)  
[`abs`, `labs`, `llabs`, `_abs64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abs-labs-llabs-abs64?view=msvc-170)