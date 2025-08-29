---
title: "pow, powf, powl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/pow-powf-powl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates _`x`_ raised to the power of _`y`_.

## Syntax

```
double pow( double x, double y );
float powf( float x, float y );
long double powl( long double x, long double y );
define pow(X, Y) // Requires C11 or later

double pow( double x, int y );  // C++ only
float pow( float x, float y );  // C++ only
float pow( float x, int y );  // C++ only
long double pow( long double x, long double y );  // C++ only
long double pow( long double x, int y );  // C++ only
```

### Parameters

_`x`_  
Base.

_`y`_  
Exponent.

## Return value

Returns the value of _`x`__`y`_. No error message is printed on overflow or underflow.

Values of _`x`_ and _`y`_

Return value of **`pow`**

_`x`_ != 0.0 and _`y`_ == 0.0

1

_`x`_ == 0.0 and _`y`_ == 0.0

1

_`x`_ == 0.0 and _`y`_ < 0

INF

**`pow`** doesn't recognize integral floating-point values greater than 264 (for example, 1.0E100).

**`pow`** has an implementation that uses Streaming SIMD Extensions 2 (SSE2). For information and restrictions about using the SSE2 implementation, see [`_set_SSE2_enable`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-sse2-enable?view=msvc-170).

Because C++ allows overloading, you can call any of the various overloads of **`pow`**. In a C program, unless you're using the `<tgmath.h>` macro to call this function, **`pow`** always takes two **`double`** values and returns a **`double`** value.

If you use the `pow` macro from `<tgmath.h>`, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

The `pow(int, int)` overload is no longer available. If you use this overload, the compiler may emit [C2668](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-errors-2/compiler-error-c2668?view=msvc-170). To avoid this problem, cast the first parameter to **`double`**, **`float`**, or **`long double`**.

Originally, the `pow(T, int)` overloads unrolled the `pow` call into a sequence of inline multiplication operations. While it was faster, it was also much less accurate. This implementation was removed in Visual Studio 2015 Update 1. For more information, see [Conformance improvements in Visual Studio 2015 Update 1](https://learn.microsoft.com/en-us/cpp/porting/visual-cpp-what-s-new-2003-through-2015?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header (C)

Required header (C++)

**`pow`**, **`powf`**, **`powl`**

`<math.h>`

`<math.h>` or `<cmath>`

**`pow`** macro

`<tgmath.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_pow.c

#include <math.h>
#include <stdio.h>

int main( void )
{
   double x = 2.0, y = 3.0, z;

   z = pow( x, y );
   printf( "%.1f to the power of %.1f is %.1f\n", x, y, z );
}
```

```
2.0 to the power of 3.0 is 8.0
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`exp`, `expf`, `expl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exp-expf?view=msvc-170)  
[`log`, `logf`, `log10`, `log10f`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log-logf-log10-log10f?view=msvc-170)  
[`sqrt`, `sqrtf`, `sqrtl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sqrt-sqrtf-sqrtl?view=msvc-170)  
[`_CIpow`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/cipow?view=msvc-170)