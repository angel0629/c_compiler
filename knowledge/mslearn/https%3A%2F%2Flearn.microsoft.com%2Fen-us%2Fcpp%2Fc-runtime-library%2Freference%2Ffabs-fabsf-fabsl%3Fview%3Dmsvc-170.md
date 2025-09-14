---
title: "fabs, fabsf, fabsl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fabs-fabsf-fabsl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates the absolute value of the floating-point argument.

## Syntax

```
double fabs(
   double x
);
float fabs(
   float x
); // C++ only
long double fabs(
   long double x
); // C++ only
float fabsf(
   float x
);
long double fabsl(
   long double x
);

#define fabs(X) // Requires C11 or later
```

### Parameters

_`x`_  
Floating-point value.

## Return value

The **`fabs`** functions return the absolute value of the argument _`x`_. There's no error return.

Input

SEH exception

`_matherr` exception

± QNaN, IND

none

`_DOMAIN`

## Remarks

C++ allows overloading, so you can call overloads of **`fabs`** if you include the `<cmath>` header. In a C program, unless you're using the `<tgmath.h>` macro to call this function, **`fabs`** always takes and returns a **`double`**.

If you use the `fabs` macro from `<tgmath.h>`, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required C header

Required C++ header

**`fabs`**, **`fabsf`**, **`fabsl`**

`<math.h>`

`<cmath>` or `<math.h>`

**`fabs`** macro

`<tgmath.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`abs`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abs-labs-llabs-abs64?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`abs`, `labs`, `llabs`, `_abs64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abs-labs-llabs-abs64?view=msvc-170)  
[`_cabs`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cabs?view=msvc-170)