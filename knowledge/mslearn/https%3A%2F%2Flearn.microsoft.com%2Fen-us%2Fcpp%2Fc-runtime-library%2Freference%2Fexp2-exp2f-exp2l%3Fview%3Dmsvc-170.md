---
title: "exp2, exp2f, exp2l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exp2-exp2f-exp2l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Computes 2 raised to the specified value.

## Syntax

```
double exp2(
   double x
);

float exp2(
   float x
);  // C++ only

long double exp2(
   long double x
); // C++ only

float exp2f(
   float x
);

long double exp2l(
   long double x
);
#define exp2(X) // Requires C11 or later
```

### Parameters

_`x`_  
The value of the exponent.

## Return value

If successful, returns the base-2 exponent of _`x`_, that is, 2x. Otherwise, it returns one of the following values:

Issue

Return

_`x`_ = ±0

1

_`x`_ = -INFINITY

+0

_`x`_ = +INFINITY

+INFINITY

_`x`_ = NaN

NaN

Overflow range error

+HUGE\_VAL, +HUGE\_VALF, or +HUGE\_VALL

Underflow range error

Correct result, after rounding

Errors are reported as specified in [`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170).

Because C++ allows overloading, you can call overloads of **`exp2`** that take and return **`float`** and **`long double`** types. In a C program, unless you're using the <tgmath.h> macro to call this function, **`exp2`** always takes and returns a **`double`**, unless you use the macro in <tgmath.h>.

If you use the <tgmath.h> `exp2()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

C header

C++ header

**`exp2`**, **`expf2`**, **`expl2`**

<math.h>

<cmath>

**`exp2`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`exp`, `expf`, `expl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exp-expf?view=msvc-170)  
[`log2`, `log2f`, `log2l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log2-log2f-log2l?view=msvc-170)