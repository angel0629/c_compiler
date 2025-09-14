---
title: "Bessel Functions: _j0, _j1, _jn, _y0, _y1, _yn"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/bessel-functions-j0-j1-jn-y0-y1-yn?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Computes the Bessel function of the first or second kind, of orders 0, 1, or n. The Bessel functions are commonly used in the mathematics of electromagnetic wave theory.

## Syntax

```
double _j0(
   double x
);
double _j1(
   double x
);
double _jn(
   int n,
   double x
);
double _y0(
   double x
);
double _y1(
   double x
);
double _yn(
   int n,
   double x
);
```

### Parameters

_`x`_  
Floating-point value.

_`n`_  
Integer order of Bessel function.

## Return value

Each of these routines returns a Bessel function of _`x`_. If _`x`_ is negative in the **`_y0`**, **`_y1`**, or **`_yn`** functions, the routine sets `errno` to `EDOM`, prints a `_DOMAIN` error message to `stderr`, and returns `HUGE_VAL`. You can modify error handling by using `_matherr`.

The **`_j0`**, **`_j1`**, and **`_jn`** routines return Bessel functions of the first kind: orders 0, 1, and n, respectively.

Input

SEH exception

`_matherr` exception

± QNaN, IND

`INVALID`

`_DOMAIN`

The **`_y0`**, **`_y1`**, and **`_yn`** routines return Bessel functions of the second kind: orders 0, 1, and n, respectively.

Input

SEH exception

`_matherr` exception

± QNaN, IND

`INVALID`

`_DOMAIN`

± 0

`ZERODIVIDE`

`_SING`

`|x| < 0.0`

`INVALID`

`_DOMAIN`

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_j0`**, **`_j1`**, **`_jn`**, **`_y0`**, **`_y1`**, **`_yn`**

<cmath> (C++), <math.h> (C, C++)

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_bessel1.c
#include <math.h>
#include <stdio.h>

int main( void )
{
   double x = 2.387;
   int n = 3, c;

   printf( "Bessel functions for x = %f:\n", x );
   printf( "   Kind   Order  Function     Result\n\n" );
   printf( "   First  0      _j0( x )     %f\n", _j0( x ) );
   printf( "   First  1      _j1( x )     %f\n", _j1( x ) );
   for( c = 2; c < 5; c++ )
      printf( "   First  %d      _jn( %d, x )  %f\n", c, c, _jn( c, x ) );
   printf( "   Second 0      _y0( x )     %f\n", _y0( x ) );
   printf( "   Second 1      _y1( x )     %f\n", _y1( x ) );
   for( c = 2; c < 5; c++ )
      printf( "   Second %d      _yn( %d, x )  %f\n", c, c, _yn( c, x ) );
}
```

```
Bessel functions for x = 2.387000:
   Kind   Order  Function     Result

   First  0      _j0( x )     0.009288
   First  1      _j1( x )     0.522941
   First  2      _jn( 2, x )  0.428870
   First  3      _jn( 3, x )  0.195734
   First  4      _jn( 4, x )  0.063131
   Second 0      _y0( x )     0.511681
   Second 1      _y1( x )     0.094374
   Second 2      _yn( 2, x )  -0.432608
   Second 3      _yn( 3, x )  -0.819314
   Second 4      _yn( 4, x )  -1.626833
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170)