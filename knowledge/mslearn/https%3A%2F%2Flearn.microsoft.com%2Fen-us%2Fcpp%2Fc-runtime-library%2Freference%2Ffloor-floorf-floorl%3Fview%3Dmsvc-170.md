---
title: "floor, floorf, floorl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/floor-floorf-floorl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates the floor of a value.

## Syntax

```
double floor(
   double x
);
float floor(
   float x
); // C++ only
long double floor(
   long double x
); // C++ only
float floorf(
   float x
);
long double floorl(
   long double x
);
#define floor(X) // Requires C11 or later
```

### Parameters

_`x`_  
Floating-point value.

## Return value

The **`floor`** functions return a floating-point value that represents the largest integer that is less than or equal to _`x`_. There's no error return.

Input

SEH exception

`_matherr` exception

± QNaN, IND

none

`_DOMAIN`

**`floor`** has an implementation that uses Streaming SIMD Extensions 2 (SSE2). For information and restrictions about using the SSE2 implementation, see [`_set_SSE2_enable`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-sse2-enable?view=msvc-170).

C++ allows overloading, so you can call overloads of **`floor`** that take and return **`float`** and **`long double`** values. In a C program, unless you're using the <tgmath.h> macro to call this function, **`floor`** always takes and returns a **`double`**.

If you use the <tgmath.h> `floor()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`floor`**, **`floorf`**, **`floorl`**

<math.h>

**`floor`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_floor.c
// This example displays the largest integers
// less than or equal to the floating-point values 2.8
// and -2.8. It then shows the smallest integers greater
// than or equal to 2.8 and -2.8.

#include <math.h>
#include <stdio.h>

int main( void )
{
   double y;

   y = floor( 2.8 );
   printf( "The floor of 2.8 is %f\n", y );
   y = floor( -2.8 );
   printf( "The floor of -2.8 is %f\n", y );

   y = ceil( 2.8 );
   printf( "The ceil of 2.8 is %f\n", y );
   y = ceil( -2.8 );
   printf( "The ceil of -2.8 is %f\n", y );
}
```

```
The floor of 2.8 is 2.000000
The floor of -2.8 is -3.000000
The ceil of 2.8 is 3.000000
The ceil of -2.8 is -2.000000
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`ceil`, `ceilf`, `ceill`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ceil-ceilf-ceill?view=msvc-170)  
[`round`, `roundf`, `roundl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/round-roundf-roundl?view=msvc-170)  
[`fmod`, `fmodf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmod-fmodf?view=msvc-170)