---
title: "cosh, coshf, coshl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cosh-coshf-coshl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates the hyperbolic cosine.

## Syntax

```
double cosh( double x );
float coshf( float x );
long double coshl( long double x );
#define cosh(X) // Requires C11 or later

float cosh( float x );  // C++ only
long double cosh( long double x );  // C++ only
```

### Parameters

_`x`_  
Angle in radians.

## Return value

The hyperbolic cosine of _`x`_.

By default, if the result is too large in a **`cosh`**, **`coshf`**, or **`coshl`** call, the function returns `HUGE_VAL` and sets `errno` to `ERANGE`.

Input

SEH exception

`_matherr` exception

± QNaN, IND

none

`_DOMAIN`

_`x`_ ≥ 7.104760e+002

`INEXACT`+`OVERFLOW`

`OVERFLOW`

Because C++ allows overloading, you can call overloads of **`cosh`** that take and return **`float`** or **`long double`** values. In a C program, unless you're using the `<tgmath.h>` macro to call this function, **`cosh`** always takes and returns a **`double`**.

If you use the `cosh` macro from `<tgmath.h>`, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header (C)

Required header (C++)

**`coshf`**, **`cosl`**, **`coshl`**

`<math.h>`

`<cmath>` or `<math.h>`

**`coshf`** macro

`<tgmath.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example in [`sinh`, `sinhf`, `sinhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sinh-sinhf-sinhl?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`acosh`, `acoshf`, `acoshl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/acosh-acoshf-acoshl?view=msvc-170)  
[`asinh`, `asinhf`, `asinhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asinh-asinhf-asinhl?view=msvc-170)  
[`atanh`, `atanhf`, `atanhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atanh-atanhf-atanhl?view=msvc-170)  
[`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170)  
[`sinh`, `sinhf`, `sinhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sinh-sinhf-sinhl?view=msvc-170)  
[`tanh`, `tanhf`, `tanhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tanh-tanhf-tanhl?view=msvc-170)