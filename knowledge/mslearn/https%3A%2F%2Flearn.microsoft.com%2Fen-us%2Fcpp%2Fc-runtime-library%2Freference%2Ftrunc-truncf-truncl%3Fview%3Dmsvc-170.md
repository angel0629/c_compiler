---
title: "trunc, truncf, truncl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/trunc-truncf-truncl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines the nearest integer that is less than or equal to the specified floating-point value.

## Syntax

```
double trunc( double x );
long double truncl( long double x );
#define trunc(X) // Requires C11 or later

long double trunc( long double x ); //C++ only
float trunc( float x ); //C++ only
```

### Parameters

_`x`_  
The value to truncate.

## Return value

If successful, the functions return an integer value of _`x`_, rounded towards zero.

Otherwise, the functions may return one of the following values:

Issue

Return

_`x`_ = ±INFINITY

x

_`x`_ = ±0

x

_`x`_ = NaN

NaN

Errors are reported as specified in [`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170).

Because C++ allows overloading, you can call overloads of **`trunc`** that take and return **`float`** and **`long double`** types. In a C program, unless you're using the <tgmath.h> macro to call this function, **`trunc`** always takes and returns a **`double`**.

If you use the <tgmath.h> `trunc()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

Because the largest floating-point values are exact integers, this function won't overflow on its own. However, you may cause the function to overflow by returning a value into an integer type.

You can also round down by implicitly converting from floating-point to integral; however, doing so is limited to the values that can be stored in the target type.

## Requirements

Function

C header

C++ header

**`trunc`**, **`truncf`**, **`truncl`**

<math.h>

<cmath>

**`trunc`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`floor`, `floorf`, `floorl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/floor-floorf-floorl?view=msvc-170)  
[`ceil`, `ceilf`, `ceill`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ceil-ceilf-ceill?view=msvc-170)  
[`round`, `roundf`, `roundl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/round-roundf-roundl?view=msvc-170)