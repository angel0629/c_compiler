---
title: "copysign, copysignf, copysignl, _copysign, _copysignf, _copysignl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/copysign-copysignf-copysignl-copysign-copysignf-copysignl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns a value that has the magnitude of one argument and the sign of another.

## Syntax

```
double copysign(
   double x,
   double y
);
float copysign(
   float x,
   float y
); // C++ only
long double copysign(
   long double x,
   long double y
); // C++ only
float copysignf(
   float x,
   float y
); // C++ only
long double copysignl(
   long double x,
   long double y
); // C++ only
double _copysign(
   double x,
   double y
);
long double _copysignl(
   long double x,
   long double y
);
#define copysign(X, Y) // Requires C11 or later
```

### Parameters

_`x`_  
The floating-point value that's returned as the magnitude of the result.

_`y`_  
The floating-point value that's returned as the sign of the result.

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)

## Return value

The **`copysign`** functions return a floating-point value that combines the magnitude of _`x`_ and the sign of _`y`_. There's no error return.

Because C++ allows overloading, you can call overloads of **`copysign`** that take and return **`float`** or **`long double`** values. In a C program, unless you're using the <tgmath.h> macro to call this function, **`copysign`** always takes and returns a **`double`**.

If you use the <tgmath.h> `copysign()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

## Requirements

Routine

Required header

**`_copysign`**

<float.h>

**`copysign`**, **`copysignf`**, **`copysignl`**, **`_copysignf`**, **`_copysignl`**

<math.h>

**`copysign`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[`fabs`, `fabsf`, `fabsl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fabs-fabsf-fabsl?view=msvc-170)  
[`_chgsign`, `_chgsignf`, `_chgsignl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chgsign-chgsignf-chgsignl?view=msvc-170)