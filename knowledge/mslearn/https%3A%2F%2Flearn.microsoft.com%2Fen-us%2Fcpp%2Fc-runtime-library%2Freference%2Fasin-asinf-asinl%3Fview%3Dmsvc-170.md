---
title: "asin, asinf, asinl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asin-asinf-asinl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates the arcsine.

## Syntax

```
double asin( double x );
float asinf ( float x );
long double asinl( long double x );
#define asin(X) // Requires C11 or later

float asin( float x );  // C++ only
long double asin( long double x );  // C++ only
```

### Parameters

_`x`_  
Value whose arcsine is to be calculated.

## Return value

The **`asin`** function returns the arcsine (the inverse sine function) of _`x`_ in the range -π/2 to π/2 radians.

By default, if _`x`_ is less than -1 or greater than 1, **`asin`** returns an indefinite.

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

Because C++ allows overloading, you can call overloads of **`asin`** with **`float`** and **`long double`** values. In a C program, unless you're using the `<tgmath.h>` macro to call this function, **`asin`** always takes and returns a **`double`**.

If you use the `asin` macro from `<tgmath.h>`, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header (C)

Required header (C++)

**`asin`**, **`asinf`**, **`asinl`**

`<math.h>`

`<cmath>` or `<math.h>`

**`asin`** macro

`<tgmath.h>`

## Example

For more information, see [`acos`, `acosf`, `acosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/acos-acosf-acosl?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`acos`, `acosf`, `acosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/acos-acosf-acosl?view=msvc-170)  
[`atan`, `atanf`, `atanl`, `atan2`, `atan2f`, `atan2l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atan-atanf-atanl-atan2-atan2f-atan2l?view=msvc-170)  
[`cos`, `cosf`, `cosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cos-cosf-cosl?view=msvc-170)  
[`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170)  
[`sin`, `sinf`, `sinl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sin-sinf-sinl?view=msvc-170)  
[`tan`, `tanf`, `tanl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tan-tanf-tanl?view=msvc-170)