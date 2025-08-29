---
title: "fpclassify"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclassify?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns the floating-point classification of the argument.

## Syntax

```
int fpclassify(
   /* floating-point */ x
);

int fpclassify(
   float x
); // C++ only

int fpclassify(
   double x
); // C++ only

int fpclassify(
   long double x
); // C++ only
```

### Parameters

_`x`_  
The floating-point value to test.

## Return value

**`fpclassify`** returns an integer value that indicates the floating-point class of the argument _`x`_. This table shows the possible values returned by **`fpclassify`**, defined in <math.h>.

Value

Description

`FP_NAN`

A quiet, signaling, or indeterminate NaN

`FP_INFINITE`

A positive or negative infinity

`FP_NORMAL`

A positive or negative normalized non-zero value

`FP_SUBNORMAL`

A positive or negative denormalized value

`FP_ZERO`

A positive or negative zero value

In C, **`fpclassify`** is a macro; in C++, **`fpclassify`** is a function overloaded using argument types of **`float`**, **`double`**, or **`long double`**. In either case, the value returned depends on the effective type of the argument expression, and not on any intermediate representation. For example, a normal **`double`** or **`long double`** value can become an infinity, denormal, or zero value when converted to a **`float`**.

## Requirements

Function/Macro

Required header (C)

Required header (C++)

**`fpclassify`**

<math.h>

<math.h> or <cmath>

The **`fpclassify`** macro and **`fpclassify`** functions conform to the ISO C99 and C++11 specifications. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`isnan`, `_isnan`, `_isnanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isnan-isnan-isnanf?view=msvc-170)