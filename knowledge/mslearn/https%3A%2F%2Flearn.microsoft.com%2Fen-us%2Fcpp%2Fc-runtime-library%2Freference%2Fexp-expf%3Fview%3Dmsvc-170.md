---
title: "exp, expf, expl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exp-expf?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates the exponential.

## Syntax

```
double exp(
   double x
);
float exp(
   float x
);  // C++ only
long double exp(
   long double x
);  // C++ only
float expf(
   float x
);
long double expl(
   long double x
);
#define exp(z) // Requires C11 or later
```

### Parameters

_`x`_  
The floating-point value to exponentiate the natural logarithm base _e_ by.

## Return value

The **`exp`** functions return the exponential value of the floating-point parameter, _`x`_, if successful. That is, the result is _e__`x`_, where _e_ is the base of the natural logarithm. On overflow, the function returns `INF` (infinity) and on underflow, **`exp`** returns 0.

Input

SEH exception

`_matherr` exception

± Quiet NaN, indeterminate

None

`_DOMAIN`

± Infinity

`INVALID`

`_DOMAIN`

_`x`_ ≥ 7.097827e+002

`INEXACT`+`OVERFLOW`

`OVERFLOW`

_`x`_ ≤ -7.083964e+002

`INEXACT`+`UNDERFLOW`

`UNDERFLOW`

The **`exp`** function has an implementation that uses Streaming SIMD Extensions 2 (SSE2). See [`_set_SSE2_enable`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-sse2-enable?view=msvc-170) for information and restrictions on using the SSE2 implementation.

C++ allows overloading, so you can call overloads of **`exp`** that take a **`float`** or **`long double`** argument. In a C program, unless you're using the `<tgmath.h>` macro to call this function, **`exp`** always takes and returns a **`double`**.

If you use the `exp` macro from `<tgmath.h>`, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required C header

Required C++ header

**`exp`**, **`expf`**, **`expl`**

`<math.h>`

`<cmath>` or `<math.h>`

**`exp`** macro

`<tgmath.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_exp.c

#include <math.h>
#include <stdio.h>

int main( void )
{
   double x = 2.302585093, y;

   y = exp( x );
   printf( "exp( %f ) = %f\n", x, y );
}
```

```
exp( 2.302585 ) = 10.000000
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`log`, `logf`, `log10`, `log10f`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log-logf-log10-log10f?view=msvc-170)  
[`_CIexp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ciexp?view=msvc-170)