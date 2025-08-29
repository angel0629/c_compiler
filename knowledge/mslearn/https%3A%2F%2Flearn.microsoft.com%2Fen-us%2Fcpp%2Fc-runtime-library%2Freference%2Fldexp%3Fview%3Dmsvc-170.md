---
title: "ldexp, ldexpf, ldexpl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ldexp?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Multiplies a floating-point number by an integral power of two.

## Syntax

```
double ldexp(
   double x,
   int exp
);
float ldexpf(
   float x,
   int exp
);
long double ldexpl(
   long double x,
   int exp
);
#define ldexp(X, INT) // Requires C11 or later

float ldexp(
   float x,
   int exp
);  // C++ only
long double ldexp(
   long double x,
   int exp
);  // C++ only
```

### Parameters

_`x`_  
Floating-point value.

_`exp`_  
Integer exponent.

## Return value

The **`ldexp`** functions return the value of _`x`_ \* 2_`exp`_ if successful. On overflow, and depending on the sign of _`x`_, **`ldexp`** returns +/- `HUGE_VAL`; the `errno` value is set to `ERANGE`.

For more information about `errno` and possible error return values, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

Because C++ allows overloading, you can call overloads of **`ldexp`** that take **`float`** or **`long double`** types. In a C program, unless you're using the <tgmath.h> macro to call this function, **`ldexp`** always takes a **`double`** and an **`int`** and returns a **`double`**.

If you use the <tgmath.h> `ldexp()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

C header

C++ header

**`ldexp`**, **`ldexpf`**, **`ldexpl`**

<math.h>

<cmath>

**`ldexp`** macro

<tgmath.h>

For compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_ldexp.c

#include <math.h>
#include <stdio.h>

int main( void )
{
   double x = 4.0, y;
   int p = 3;

   y = ldexp( x, p );
   printf( "%2.1f times two to the power of %d is %2.1f\n", x, p, y );
}
```

## Output

```
4.0 times two to the power of 3 is 32.0
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`frexp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/frexp?view=msvc-170)  
[`modf`, `modff`, `modfl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/modf-modff-modfl?view=msvc-170)