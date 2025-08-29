---
title: "remainder, remainderf, remainderl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/remainder-remainderf-remainderl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Computes the remainder of the quotient of two floating-point values, rounded to the nearest integral value.

## Syntax

```
double remainder( double x, double y );
float remainderf( float x, float y );
long double remainderl( long double x, long double y );
#define remainder(X, Y) // Requires C11 or later

float remainder( float x, float y ); /* C++ only */
long double remainder( long double x, long double y ); /* C++ only */
```

### Parameters

_`x`_  
The numerator.

_`y`_  
The denominator.

## Return value

The floating-point remainder of _`x`_ / _`y`_. If the value of _`y`_ is 0.0, **`remainder`** returns a quiet NaN. For information about the representation of a quiet NaN by the `printf` family, see [`printf`, `_printf_l`, `wprintf`, `_wprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170).

The **`remainder`** functions calculate the floating-point remainder `r` of `x / y` such that `x = n * y + r`, where `n` is the integer nearest in value to `x / y` and `n` is even whenever `|n - x / y| = 1/2`. When `r = 0`, `r` has the same sign as _`x`_.

Because C++ allows overloading, you can call overloads of **`remainder`** that take and return **`float`** or **`long double`** values. In a C program, unless you're using the <tgmath.h> macro to call this function, **`remainder`** always takes two **`double`** arguments and returns a **`double`**.

If you use the <tgmath.h> `remainder()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header (C)

Required header (C++)

**`remainder`**, **`remainderf`**, **`remainderl`**

<math.h>

<cmath> or <math.h>

**`remainder`** macro

<tgmath.h>

For compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_remainder.c
// This program displays a floating-point remainder.

#include <math.h>
#include <stdio.h>

int main( void )
{
   double w = -10.0, x = 3.0, z;

   z = remainder(w, x);
   printf("The remainder of %.2f / %.2f is %f\n", w, x, z);
}
```

```
The remainder of -10.00 / 3.00 is -1.000000
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`ldiv`, `lldiv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/div?view=msvc-170)  
[`imaxdiv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/imaxdiv?view=msvc-170)  
[`fmod`, `fmodf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmod-fmodf?view=msvc-170)  
[`remquo`, `remquof`, `remquol`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/remquo-remquof-remquol?view=msvc-170)