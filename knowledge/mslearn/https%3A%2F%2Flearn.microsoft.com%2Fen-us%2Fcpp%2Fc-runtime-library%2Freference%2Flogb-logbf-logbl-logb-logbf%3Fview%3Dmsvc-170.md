---
title: "logb, logbf, logbl, _logb, _logbf"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/logb-logbf-logbl-logb-logbf?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Extracts the exponent value of a floating-point argument.

## Syntax

```
double logb(
   double x
);
float logb(
   float x
); // C++ only
long double logb(
   long double x
); // C++ only
float logbf(
   float x
);
long double logbl(
   long double x
);
double _logb(
   double x
);
float _logbf(
   float x
);
#define logb(X) // Requires C11 or later
```

### Parameters

_`x`_  
A floating-point value.

## Return value

**`logb`** returns the unbiased exponent value of _`x`_ as a signed integer represented as a floating-point value.

The **`logb`** functions extract the exponential value of the floating-point argument _`x`_, as though _`x`_ were represented with infinite range. If the argument _`x`_ is denormalized, it's treated as if it were normalized.

Because C++ allows overloading, you can call overloads of **`logb`** that take and return **`float`** or **`long double`** values. In a C program, unless you're using the `<tgmath.h>` macro to call this function, **`logb`** always takes and returns a **`double`**.

If you use the `logb` macro from `<tgmath.h>`, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

Input

SEH exception

`_matherr` exception

± QNaN, IND

None

`_DOMAIN`

± 0

`ZERODIVIDE`

`_SING`

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_logb`**

`<float.h>`

**`logb`**, **`logbf`**, **`logbl`**, **`_logbf`**

`<math.h>`

**`logb`** macro

`<tgmath.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`frexp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/frexp?view=msvc-170)