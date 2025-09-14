---
title: "remquo, remquof, remquol"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/remquo-remquof-remquol?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Computes the remainder of two integer values, and stores an integer value with the sign and approximate magnitude of the quotient in a parameter.

## Syntax

```
double remquo( double numer, double denom, int* quo );
float remquof( float numer, float denom, int* quo );
long double remquol( long double numer, long double denom, int* quo );
#define remquo(X, Y, INT_PTR) // Requires C11 or later

float remquo( float numer, float denom, int* quo ); /* C++ only */
long double remquo( long double numer, long double denom, int* quo ); /* C++ only */
```

### Parameters

_`numer`_  
The numerator.

_`denom`_  
The denominator.

_`quo`_  
A pointer to an integer to store a value that has the sign and approximate magnitude of the quotient.

## Return value

**`remquo`** returns the floating-point remainder of _`x`_ / _`y`_. If the value of _`y`_ is 0.0, **`remquo`** returns a quiet NaN. For information about the representation of a quiet NaN by the `printf` family, see [`printf`, `_printf_l`, `wprintf`, `_wprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170).

The **`remquo`** function calculates the floating-point remainder `f` of _`x`_ / _`y`_ such that _`x`_ = `n` \* _`y`_ + _`f`_, where `n` is an integer, `f` has the same sign as _`x`_, and the absolute value of `f` is less than the absolute value of _`y`_.

C++ allows overloading, so you can call overloads of **`remquo`** that take and return **`float`** or **`long double`** values. In a C program, unless you're using the <tgmath.h> macro to call this function, **`remquo`** always takes two **`double`** arguments and returns a **`double`**.

If you use the <tgmath.h> `remquo()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header (C)

Required header (C++)

**`remquo`**, **`remquof`**, **`remquol`**

<math.h>

<cmath> or <math.h>

**`remquo`** macro

<tgmath.h>

For compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_remquo.c
// This program displays a floating-point remainder.

#include <math.h>
#include <stdio.h>

int main( void )
{
   double w = -10.0, x = 3.0, z;
   int quo = 0;

   z = remquo(w, x, &quo);
   printf("The remainder of %.2f / %.2f is %f\n", w, x, z);
   printf("Approximate signed quotient is %d\n", quo);
}
```

```
The remainder of -10.00 / 3.00 is -1.000000
Approximate signed quotient is -3
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`ldiv`, `lldiv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/div?view=msvc-170)  
[`imaxdiv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/imaxdiv?view=msvc-170)  
[`fmod`, `fmodf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmod-fmodf?view=msvc-170)  
[`remainder`, `remainderf`, `remainderl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/remainder-remainderf-remainderl?view=msvc-170)