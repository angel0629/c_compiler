---
title: "lrint, lrintf, lrintl, llrint, llrintf, llrintl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lrint-lrintf-lrintl-llrint-llrintf-llrintl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Rounds the specified floating-point value to the nearest integral value, by using the current rounding mode and direction.

## Syntax

```
long int lrint(
   double x
);

long int lrint(
   float x
); //C++ only

long int lrint(
   long double x
); //C++ only

long int lrintf(
   float x
);

long int lrintl(
   long double x
);

long long int llrint(
   double x
);

long long int llrint(
   float x
); //C++ only

long long int llrint(
   long double x
); //C++ only

long long int llrintf(
   float x
);

long long int llrintl(
   long double x
);

#define lrint(X) // Requires C11 or later
```

### Parameters

_`x`_  
The value to round.

## Return value

If successful, returns the rounded integral value of _`x`_.

Issue

Return

_`x`_ is outside the range of the return type

_`x`_ = ±INF

_`x`_ = NaN

Raises `FE_INVALID` and returns zero (0).

Because C++ allows overloading, you can call overloads of **`lrint`** and **`llrint`** that take **`float`** and **`long double`** types. In a C program, unless you're using the <tgmath.h> macro to call this function, **`lrint`** and **`llrint`** always take a **`double`**.

If you use the <tgmath.h> `llrint()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

If _`x`_ doesn't represent the floating-point equivalent of an integral value, these functions raise `FE_INEXACT`.

**Microsoft-specific**: When the result is outside the range of the return type, or when the parameter is a NaN or infinity, the return value is implementation defined. The Microsoft compiler returns a zero (0) value.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

C header

C++ header

**`lrint`**, **`lrintf`**, **`lrintl`**, **`llrint`**, **`llrintf`**, **`llrintl`**

<math.h>

<cmath>

**`lrint`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)