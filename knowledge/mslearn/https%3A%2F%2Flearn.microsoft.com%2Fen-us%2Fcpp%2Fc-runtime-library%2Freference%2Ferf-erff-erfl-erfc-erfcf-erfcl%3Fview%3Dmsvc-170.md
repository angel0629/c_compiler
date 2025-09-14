---
title: "erf, erff, erfl, erfc, erfcf, erfcl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/erf-erff-erfl-erfc-erfcf-erfcl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Computes the error function or the complementary error function of a value.

## Syntax

```
double erf(
   double x
);
float erf(
   float x
); // C++ only
long double erf(
   long double x
); // C++ only
float erff(
   float x
);
long double erfl(
   long double x
);
double erfc(
   double x
);
float erfc(
   float x
); // C++ only
long double erfc(
   long double x
); // C++ only
float erfcf(
   float x
);
long double erfcl(
   long double x
);
#define erf(X) // Requires C11 or later
#define erfc(X) // Requires C11 or later
```

### Parameters

_`x`_  
A floating-point value.

## Return value

The **`erf`** functions return the Gauss error function of _`x`_. The **`erfc`** functions return the complementary Gauss error function of _`x`_.

The **`erf`** functions calculate the Gauss error function of _`x`_, which is defined as:

![The error function of x equals two over the square root of pi times the integral from zero to x of e to the minus t squared d t. ](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/media/crt_erf_formula.png?view=msvc-170 "The error function of x")

The complementary Gauss error function is defined as 1 - erf(x). The **`erf`** functions return a value in the range -1.0 to 1.0. There's no error return. The **`erfc`** functions return a value in the range 0 to 2. If _`x`_ is too large for **`erfc`**, the `errno` variable is set to `ERANGE`.

Because C++ allows overloading, you can call **`erf`** and **`erfc`** overloads that take and return **`float`** and **`long double`** types. In a C program, unless you're using the <tgmath.h> macro to call this function, **`erf`** and **`erfc`** always take and return a **`double`**.

If you use the <tgmath.h> `erf()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`erf`**, **`erff`**, **`erfl`**, **`erfc`**, **`erfcf`**, **`erfcl`**

<math.h>

**`erf`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)