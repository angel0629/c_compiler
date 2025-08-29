---
title: "fmod, fmodf, fmodl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmod-fmodf?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates the floating-point remainder.

## Syntax

```
double fmod(
   double x,
   double y
);
float fmod(
   float x,
   float y
);  // C++ only
long double fmod(
   long double x,
   long double y
);  // C++ only
float fmodf(
   float x,
   float y
);
long double fmodl(
   long double x,
   long double y
);

#define fmod(X, Y) // Requires C11 or later
```

### Parameters

_`x`_, _`y`_  
Floating-point values.

## Return value

**`fmod`** returns the floating-point remainder of `x / y`. If the value of _`y`_ is 0.0, **`fmod`** returns a quiet `NaN`. For information about representation of a quiet `NaN` by the **`printf`** family, see [`printf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170).

The **`fmod`** function calculates the floating-point remainder _`f`_ of `x / y` such that `x = i * y + f`, where _`i`_ is an integer, _`f`_ has the same sign as _`x`_, and the absolute value of _`f`_ is less than the absolute value of _`y`_.

C++ allows overloading, so you can call overloads of **`fmod`** that take and return **`float`** and **`long double`** values. In a C program, unless you're using the `<tgmath.h>` macro to call this function, **`fmod`** always takes two **`double`** arguments and returns a **`double`**.

If you use the `fmod` macro from `<tgmath.h>`, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`fmod`**, **`fmodf`**, **`fmodl`**

`<math.h>`

**`fmod`** macro

`<tgmath.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_fmod.c
// This program displays a floating-point remainder.

#include <math.h>
#include <stdio.h>

int main( void )
{
   double w = -10.0, x = 3.0, z;

   z = fmod( w, x );
   printf( "The remainder of %.2f / %.2f is %f\n", w, x, z );
}
```

```
The remainder of -10.00 / 3.00 is -1.000000
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`ceil`, `ceilf`, `ceill`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ceil-ceilf-ceill?view=msvc-170)  
[`fabs`, `fabsf`, `fabsl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fabs-fabsf-fabsl?view=msvc-170)  
[`floor`, `floorf`, `floorl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/floor-floorf-floorl?view=msvc-170)  
[`_CIfmod`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/cifmod?view=msvc-170)