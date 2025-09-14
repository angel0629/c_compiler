---
title: "cbrt, cbrtf, cbrtl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cbrt-cbrtf-cbrtl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates the cube root.

## Syntax

```
double cbrt(
   double x
);
float cbrt(
   float x
);  // C++ only
long double cbrt(
   long double x
);  // C++ only
float cbrtf(
   float x
);
long double cbrtl(
   long double x
);
#define cbrt(X) // Requires C11 or later
```

### Parameters

_`x`_  
Floating-point value

## Return value

The **`cbrt`** functions return the cube-root of _`x`_.

Input

SEH exception

`_matherr` exception

± INF, QNaN, IND

none

none

Because C++ allows overloading, you can call overloads of **`cbrt`** that take **`float`** or **`long double`** types. In a C program, unless you're using the <tgmath.h> macro to call this function, **`cbrt`** always takes and returns **`double`**.

If you use the <tgmath.h> `cbrt()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

C header

C++ header

**`cbrt`**, **`cbrtf`**, **`cbrtl`**

<math.h>

<cmath>

**`cbrt`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_cbrt.c
// Compile using: cl /W4 crt_cbrt.c
// This program calculates a cube root.

#include <math.h>
#include <stdio.h>

int main( void )
{
   double question = -64.64;
   double answer;

   answer = cbrt(question);
   printf("The cube root of %.2f is %.6f\n", question, answer);
}
```

```
The cube root of -64.64 is -4.013289
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`exp`, `expf`, `expl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exp-expf?view=msvc-170)  
[`log`, `logf`, `log10`, `log10f`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log-logf-log10-log10f?view=msvc-170)  
[`pow`, `powf`, `powl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/pow-powf-powl?view=msvc-170)