---
title: "log2, log2f, log2l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log2-log2f-log2l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines the binary (base-2) logarithm of the specified value.

## Syntax

```
double log2(
   double x
);

float log2(
   float x
); //C++ only

long double log2(
   long double x
); //C++ only

float log2f(
   float x
);

long double log2l(
   long double x
);

#define log2(X) // Requires C11 or later
```

### Parameters

_`x`_  
The value to determine the base-2 logarithm of.

## Return value

On success, the functions return the base-2 log of _`x`_.

Otherwise, the functions may return one of the following values:

Issue

Return

_`x`_ < 0

NaN

_`x`_ = ±0

\-INFINITY

_`x`_ = 1

+0

+INFINITY

+INFINITY

NaN

NaN

domain error

NaN

pole error

\-`HUGE_VAL`, -`HUGE_VALF`, or -`HUGE_VALL`

Errors are reported as specified in [`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170).

If _`x`_ is an integer, this function essentially returns the zero-based index of the most significant 1 bit of _`x`_.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

C header

C++ header

**`log2`**, **`log2f`**, **`log2l`**

<math.h>

<cmath>

**`log2`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`exp2`, `exp2f`, `exp2l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exp2-exp2f-exp2l?view=msvc-170)  
[`log`, `logf`, `log10`, `log10f`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log-logf-log10-log10f?view=msvc-170)