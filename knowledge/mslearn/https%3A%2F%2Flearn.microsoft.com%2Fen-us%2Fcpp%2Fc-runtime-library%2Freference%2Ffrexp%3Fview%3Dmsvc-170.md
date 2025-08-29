---
title: "frexp, frexpf, frexpl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/frexp?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets the mantissa and exponent of a floating-point number.

## Syntax

```
double frexp(
   double x,
   int *expptr
);
float frexpf(
   float x,
   int * expptr
);
long double frexpl(
   long double x,
   int * expptr
);
#define frexpl(X, INT_PTR) // Requires C11 or later
```

```
float frexp(
   float x,
   int * expptr
);  // C++ only
long double frexp(
   long double x,
   int * expptr
);  // C++ only
```

### Parameters

_`x`_  
Floating-point value.

_`expptr`_  
Pointer to stored integer exponent.

## Return value

**`frexp`** returns the mantissa. If _`x`_ is 0, the function returns 0 for both the mantissa and the exponent. If _`expptr`_ is `NULL`, the invalid parameter handler is invoked as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function sets `errno` to `EINVAL` and returns 0.

The **`frexp`** function breaks down the floating-point value (_`x`_) into a mantissa (`m`) and an exponent (`n`), such that the absolute value of `m` is greater than or equal to 0.5 and less than 1.0, and _`x`_ = `m` \* 2`n`. The integer exponent `n` is stored at the location pointed to by _`expptr`_.

C++ allows overloading, so you can call overloads of **`frexp`**. In a C program, unless you're using the <tgmath.h> macro to call this function, **`frexp`** always takes a **`double`** and an **`int`** pointer and returns a **`double`**.

If you use the <tgmath.h> `frexp()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`frexp`**, **`frexpf`**, **`frexpl`**

<math.h>

**`frexp`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_frexp.c
// This program calculates frexp( 16.4, &n )
// then displays y and n.

#include <math.h>
#include <stdio.h>

int main( void )
{
   double x, y;
   int n;

   x = 16.4;
   y = frexp( x, &n );
   printf( "frexp( %f, &n ) = %f, n = %d\n", x, y, n );
}
```

```
frexp( 16.400000, &n ) = 0.512500, n = 5
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`ldexp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ldexp?view=msvc-170)  
[`modf`, `modff`, `modfl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/modf-modff-modfl?view=msvc-170)