---
title: "scalbn, scalbnf, scalbnl, scalbln, scalblnf, scalblnl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scalbn-scalbnf-scalbnl-scalbln-scalblnf-scalblnl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Multiplies a floating-point number by an integral power of `FLT_RADIX`.

## Syntax

```
double scalbn(
   double x,
   int exp
);
float scalbn(
   float x,
   int exp
);  // C++ only
long double scalbn(
   long double x,
   int exp
);  // C++ only
float scalbnf(
   float x,
   int exp
);
long double scalbnl(
   long double x,
   int exp
);

#define scalbn(X, INT) // Requires C11 or later

double scalbln(
   double x,
   long exp
);

float scalblnf(
   float x,
   long exp
);
long double scalblnl(
   long double x,
   long exp
);

#define scalbln(X, LONG) // Requires C11 or later

float scalbln(
   float x,
   long exp
);  // C++ only
long double scalbln(
   long double x,
   long exp
);  // C++ only
```

### Parameters

_`x`_  
Floating-point value.

_`exp`_  
Integer exponent.

## Return value

The **`scalbn`** functions return the value of _`x`_ \* `FLT_RADIX`exp when successful. On overflow (depending on the sign of _`x`_), **`scalbn`** returns +/- `HUGE_VAL`; the `errno` value is set to `ERANGE`.

For more information about `errno` and possible error return values, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

`FLT_RADIX` is defined in <float.h> as the native floating-point radix; on binary systems, it has a value of 2, and **`scalbn`** is equivalent to [`ldexp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ldexp?view=msvc-170).

Because C++ allows overloading, you can call **`scalbn`** and **`scalbln`** overloads that take and return **`float`** or **`long double`** types. In a C program, unless you're using the <tgmath.h> macro to call this function, **`scalbn`** always takes a **`double`** and an **`int`** and returns a **`double`**, and **`scalbln`** always takes a **`double`** and a **`long`** and returns a **`double`**.

If you use the <tgmath.h> `scalbn()` or `scalbln` macros, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

C header

C++ header

**`scalbn`**, **`scalbnf`**, **`scalbnl`**, **`scalbln`**, **`scalblnf`**, **`scalblnl`**

<math.h>

<cmath>

**`scalbn`** or **`scalbln`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_scalbn.c
// Compile using: cl /W4 crt_scalbn.c
#include <math.h>
#include <stdio.h>

int main( void )
{
   double x = 6.4, y;
   int p = 3;

   y = scalbn( x, p );
   printf( "%2.1f times FLT_RADIX to the power of %d is %2.1f\n", x, p, y );
}
```

### Output

```
6.4 times FLT_RADIX to the power of 3 is 51.2
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`frexp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/frexp?view=msvc-170)  
[`ldexp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ldexp?view=msvc-170)  
[`modf`, `modff`, `modfl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/modf-modff-modfl?view=msvc-170)