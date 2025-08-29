---
title: "expm1, expm1f, expm1l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/expm1-expm1f-expm1l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Computes the base-e exponential of a value, minus one.

## Syntax

```
double expm1(
   double x
);
float expm1(
   float x
);  // C++ only
long double expm1(
   long double x
);  // C++ only
float expm1f(
   float x
);
long double expm1l(
   long double x
);
#define expm1(X) // Requires C11 or later
```

### Parameters

_`x`_  
The floating-point exponential value.

## Return value

The **`expm1`** functions return a floating-point value that represents ex - 1, if successful. On overflow, **`expm1`** returns `HUGE_VAL`, **`expm1f`** returns `HUGE_VALF`, **`expm1l`** returns `HUGE_VALL`, and `errno` is set to `ERANGE`. For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

Because C++ allows overloading, you can call overloads of **`expm1`** that take and return **`float`** and **`long double`** values. In a C program, unless you're using the <tgmath.h> macro to call this function, **`expm1`** always takes and returns a **`double`**.

If you use the <tgmath.h> `expm1()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

## Requirements

Routine

Required header

**`expm1`**, **`expm1f`**, **`expm1l`**

<math.h>

**`expm1`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`exp2`, `exp2f`, `exp2l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exp2-exp2f-exp2l?view=msvc-170)  
[`pow`, `powf`, `powl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/pow-powf-powl?view=msvc-170)