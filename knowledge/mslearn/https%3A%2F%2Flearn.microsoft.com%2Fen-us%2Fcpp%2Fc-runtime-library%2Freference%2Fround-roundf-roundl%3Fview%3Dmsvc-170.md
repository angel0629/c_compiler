---
title: "round, roundf, roundl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/round-roundf-roundl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Rounds a floating-point value to the nearest integer value.

## Syntax

```
double round(
   double x
);
float round(
   float x
);  // C++ only
long double round(
   long double x
);  // C++ only
float roundf(
   float x
);
long double roundl(
   long double x
);
#define round(X) // Requires C11 or later
```

### Parameters

_`x`_  
The floating-point value to round.

## Return value

The **`round`** functions return a floating-point value that represents the nearest integer to _`x`_. Halfway values are rounded away from zero, regardless of the setting of the floating-point rounding mode. There's no error return.

Input

SEH exception

`_matherr` exception

± QNaN, IND

none

`_DOMAIN`

Because C++ allows overloading, you can call overloads of **`round`** that take and return **`float`** and **`long double`** values. In a C program, unless you're using the `<tgmath.h>` macro to call this function, **`round`** always takes and returns a **`double`**.

If you use the `round` macro from `<tgmath.h>`, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`round`**, **`roundf`**, **`roundl`**

`<math.h>`

**`round`** macro

`<tgmath.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// Build with: cl /W3 /Tc
// This example displays the rounded
// results of floating-point values

#include <math.h>
#include <stdio.h>

int main()
{
    printf("===== Round a float\n\n");
    float floatValue = 2.4999999f; // float stores a value close to, but not exactly equal to, the initializer below. floatValue will contain 2.5 because it is the closest single precision value
    printf("roundf(%.1000g) is %.1000g\n", floatValue, roundf(floatValue));
    printf("roundf(%.1000g) is %.1000g\n", -floatValue, roundf(-floatValue));

    // double stores a value close to, but not exactly equal to, the initializer below. The closest double value is just slightly larger.
    double doubleValue = 2.4999999;
    printf("\n===== Round a double\n\n");
    printf("round(%.1000g) is %.1000g\n", doubleValue, round(doubleValue));
    printf("round(%.1000g) is %.1000g\n", -doubleValue, round(-doubleValue));

    // long double stores a value close to, but not exactly equal to, the initializer below. The closest long double value is just slightly larger.
    long double longDoubleValue = 2.4999999L;
    printf("\n===== Round a long double\n\n");
    printf("roundl(%.1000g) is %.1000g\n", longDoubleValue, roundl(longDoubleValue));
    printf("roundl(%.1000g) is %.1000g\n", -longDoubleValue, roundl(-longDoubleValue));

    return 0;
}
```

```
===== Round a float

roundf(2.5) is 3
roundf(-2.5) is -3

===== Round a double

round(2.499999900000000163657887242152355611324310302734375) is 2
round(-2.499999900000000163657887242152355611324310302734375) is -2

===== Round a long double

roundl(2.499999900000000163657887242152355611324310302734375) is 2
roundl(-2.499999900000000163657887242152355611324310302734375) is -2
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`ceil`, `ceilf`, `ceill`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ceil-ceilf-ceill?view=msvc-170)  
[`floor`, `floorf`, `floorl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/floor-floorf-floorl?view=msvc-170)  
[`fmod`, `fmodf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmod-fmodf?view=msvc-170)  
[`lrint`, `lrintf`, `lrintl`, `llrint`, `llrintf`, `llrintl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lrint-lrintf-lrintl-llrint-llrintf-llrintl?view=msvc-170)  
[`lround`, `lroundf`, `lroundl`, `llround`, `llroundf`, `llroundl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lround-lroundf-lroundl-llround-llroundf-llroundl?view=msvc-170)  
[`nearbyint`, `nearbyintf`, `nearbyintl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/nearbyint-nearbyintf-nearbyintl1?view=msvc-170)  
[`rint`, `rintf`, `rintl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rint-rintf-rintl?view=msvc-170)