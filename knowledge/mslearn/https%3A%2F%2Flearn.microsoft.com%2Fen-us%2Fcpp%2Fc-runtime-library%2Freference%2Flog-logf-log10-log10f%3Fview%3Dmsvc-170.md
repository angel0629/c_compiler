---
title: "log, logf, logl, log10, log10f, log10l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log-logf-log10-log10f?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates logarithms.

## Syntax

```
double log(double x);
float logf(float x);
long double logl(double x);
double log10(double x);
float log10f (float x);
long double log10l(double x);
#define log(X) // Requires C11 or later
#define log10(X) // Requires C11 or later

float log(float x);  // C++ only
long double log(long double x);  // C++ only
float log10(float x);  // C++ only
long double log10(long double x);  // C++ only
```

### Parameters

_`x`_  
Value whose logarithm is to be found.

## Return value

The **`log`** functions return the natural logarithm (base _`e`_) of _`x`_ if successful. The **`log10`** functions return the base-10 logarithm. If _`x`_ is negative, these functions return an indefinite (`IND`), by default. If _`x`_ is 0, they return infinity (`INF`).

Input

SEH exception

`_matherr` exception

± QNaN, IND

none

`_DOMAIN`

± 0

`ZERODIVIDE`

`_SING`

_`x < 0`_

`INVALID`

`_DOMAIN`

**`log`** and **`log10`** have an implementation that uses Streaming SIMD Extensions 2 (SSE2). See [`_set_SSE2_enable`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-sse2-enable?view=msvc-170) for information and restrictions on using the SSE2 implementation.

C++ allows overloading, so you can call overloads of **`log`** and **`log10`** that take and return **`float`** or **`long double`** values. In a C program, unless you're using the `<tgmath.h>` macro to call this function, **`log`** and **`log10`** always take and return a **`double`**.

If you use the `<tgmath.h> log()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`log`**, **`logf`**, **`logl`**, **`log10`**, **`log10f`**, **`log10l`**

`<math.h>`

**`log`** macro

`<tgmath.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_log.c
/* This program uses log and log10
* to calculate the natural logarithm and
* the base-10 logarithm of 9,000.
*/

#include <math.h>
#include <stdio.h>

int main( void )
{
   double x = 9000.0;
   double y;

   y = log( x );
   printf( "log( %.2f ) = %f\n", x, y );
   y = log10( x );
   printf( "log10( %.2f ) = %f\n", x, y );
}
```

```
log( 9000.00 ) = 9.104980
log10( 9000.00 ) = 3.954243
```

To generate logarithms for other bases, use the mathematical relation: log base b of a == natural log (a) / natural log (b).

```
// logbase.cpp
#include <math.h>
#include <stdio.h>

double logbase(double a, double base)
{
   return log(a) / log(base);
}

int main()
{
   double x = 65536;
   double result;

   result = logbase(x, 2);
   printf("Log base 2 of %lf is %lf\n", x, result);
}
```

```
Log base 2 of 65536.000000 is 16.000000
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`exp`, `expf`, `expl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exp-expf?view=msvc-170)  
[`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170)  
[`pow`, `powf`, `powl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/pow-powf-powl?view=msvc-170)  
[`_CIlog`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/cilog?view=msvc-170)  
[`_CIlog10`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/cilog10?view=msvc-170)