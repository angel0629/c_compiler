---
title: "sqrt, sqrtf, sqrtl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sqrt-sqrtf-sqrtl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates the square root.

## Syntax

```
double sqrt(
   double x
);
float sqrt(
   float x
);  // C++ only
long double sqrt(
   long double x
);  // C++ only
float sqrtf(
   float x
);
long double sqrtl(
   long double x
);
#define sqrt(x) // Requires C11 or later
```

### Parameters

_`x`_  
Non-negative floating-point value

Because C++ allows overloading, you can call overloads of **`sqrt`** that take **`float`** or **`long double`** types. In a C program, unless you're using the `<tgmath.h>` macro to call this function, **`sqrt`** always takes and returns **`double`**.

If you use the `<tgmath.h> sqrt()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Return value

The **`sqrt`** functions return the square-root of _`x`_. By default, if _`x`_ is negative, **`sqrt`** returns an indefinite `NaN`.

Input

SEH exception

`_matherr` exception

± QNaN, IND

none

`_DOMAIN`

\- INF

none

`_DOMAIN`

`x < 0`

none

`_DOMAIN`

## Requirements

Function

C header

C++ header

**`sqrt`**, **`sqrtf`**, **`sqrtl`**

`<math.h>`

`<cmath>`

**`sqrt`** macro

`<tgmath.h>`

For compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_sqrt.c
// This program calculates a square root.

#include <math.h>
#include <stdio.h>
#include <stdlib.h>

int main( void )
{
   double question = 45.35, answer;
   answer = sqrt( question );
   if( question < 0 )
      printf( "Error: sqrt returns %f\n", answer );
   else
      printf( "The square root of %.2f is %.2f\n", question, answer );
}
```

```
The square root of 45.35 is 6.73
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`exp`, `expf`, `expl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exp-expf?view=msvc-170)  
[`log`, `logf`, `log10`, `log10f`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log-logf-log10-log10f?view=msvc-170)  
[`pow`, `powf`, `powl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/pow-powf-powl?view=msvc-170)  
[`_CIsqrt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/cisqrt?view=msvc-170)