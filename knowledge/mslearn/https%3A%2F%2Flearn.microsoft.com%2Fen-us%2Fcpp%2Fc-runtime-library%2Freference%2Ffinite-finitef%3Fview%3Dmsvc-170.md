---
title: "isfinite, _finite, _finitef"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/finite-finitef?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines whether a floating-point value is finite.

## Syntax

```
int isfinite(
   /* floating-point */ x
); /* C-only macro */

template <class FloatingType>
inline bool isfinite(
   FloatingType x
) throw(); /* C++-only template function */

int _finite(
   double x
);

int _finitef(
   float x
); /* x64 and ARM/ARM64 only */
```

### Parameters

_`x`_  
The floating-point value to test.

## Return value

The `isfinite` macro and the `_finite` and `_finitef` functions return a non-zero value if _`x`_ is either a normal or subnormal finite value. They return 0 if the argument is infinite or a NaN. The C++ inline template function `isfinite` behaves the same way, but returns **`true`** or **`false`**.

## Remarks

`isfinite` is a macro when compiled as C, and an inline template function when compiled as C++. The `_finite` and `_finitef` functions are Microsoft-specific. The `_finitef` function is only available when compiled for x86, ARM, or ARM64 platforms.

## Requirements

Function

Required header (C)

Required header (C++)

`_finite`

<float.h> or <math.h>

<float.h>, <math.h>, <cfloat>, or <cmath>

`isfinite`, `_finitef`

<math.h>

<math.h> or <cmath>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`fpclassify`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclassify?view=msvc-170)  
[`_fpclass`, `_fpclassf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclass-fpclassf?view=msvc-170)  
[`isinf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isinf?view=msvc-170)  
[`isnan`, `_isnan`, `_isnanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isnan-isnan-isnanf?view=msvc-170)  
[`isnormal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isnormal?view=msvc-170)