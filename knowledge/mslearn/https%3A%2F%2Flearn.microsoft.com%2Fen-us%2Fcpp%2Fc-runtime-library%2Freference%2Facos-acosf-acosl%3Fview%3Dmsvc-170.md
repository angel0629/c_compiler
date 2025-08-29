---
title: "acos, acosf, acosl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/acos-acosf-acosl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates the arccosine.

## Syntax

```
double acos( double x );
float acosf( float x );
long double acosl( long double x );
#define acos(X) // Requires C11 or later

float acos( float x );   // C++ only
long double acos( long double x );   // C++ only
```

### Parameters

_`x`_  
Value between -1 and 1, for which to calculate the arccosine (the inverse cosine).

## Return value

The **`acos`** function returns the arccosine of _`x`_ in the range 0 to π radians.

By default, if _`x`_ is less than -1 or greater than 1, **`acos`** returns an indefinite.

Input

SEH exception

`_matherr` exception

± INF

`INVALID`

`_DOMAIN`

± QNaN, IND

none

`_DOMAIN`

`|x| > 1`

`INVALID`

`_DOMAIN`

Because C++ allows overloading, you can call overloads of **`acos`** that take and return **`float`** and **`long double`** types. In a C program, unless you're using the `<tgmath.h>` macro to call this function, **`acos`** always takes and returns a **`double`**.

If you use the `acos` macro from `<tgmath.h>`, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

Optional headers

**`acos`**, **`acosf`**, **`acosl`**

`<math.h>`

`<errno.h>`

**`acos`** macro

`<tgmath.h>`

## Example

This program prompts for a value in the range -1 to 1. Input values outside this range produce `_DOMAIN` error messages. If a valid value is entered, the program prints the arcsine and the arccosine of that value.

```
// crt_asincos.c
// arguments: 0

#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>

int main( int ac, char* av[] )
{
    double  x,
            y;
    errno_t err;

    // argument checking
    if (ac != 2)
    {
        fprintf_s( stderr, "Usage: %s <number between -1 and 1>\n",
                   av[0]);
        return 1;
    }

    // Convert argument into a double value
    if ((err = sscanf_s( av[1], "%lf", &x )) != 1)
    {
        fprintf_s( stderr, "Error converting argument into ",
                   "double value.\n");
        return 1;
    }

    // Arcsine of X
    y = asin( x );
    printf_s( "Arcsine of %f = %f\n", x, y );

    // Arccosine of X
    y = acos( x );
    printf_s( "Arccosine of %f = %f\n", x, y );
}
```

```
Arcsine of 0.000000 = 0.000000
Arccosine of 0.000000 = 1.570796
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`asin`, `asinf`, `asinl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asin-asinf-asinl?view=msvc-170)  
[`atan`, `atanf`, `atanl`, `atan2`, `atan2f`, `atan2l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atan-atanf-atanl-atan2-atan2f-atan2l?view=msvc-170)  
[`cos`, `cosf`, `cosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cos-cosf-cosl?view=msvc-170)  
[`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170)  
[`sin`, `sinf`, `sinl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sin-sinf-sinl?view=msvc-170)  
[`tan`, `tanf`, `tanl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tan-tanf-tanl?view=msvc-170)