---
title: "isnormal"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isnormal?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines whether a floating-point value is a normal value.

## Syntax

```
int isnormal(
   /* floating-point */ x
); /* C-only macro */

template <class FloatingType>
inline bool isnormal(
   FloatingType x
) throw(); /* C++-only function template */
```

### Parameters

_`x`_  
The floating-point value to test.

## Return value

**`isnormal`** returns a nonzero value (**`true`** in C++ code) if the argument _`x`_ isn't zero, subnormal, infinite, or a NaN. Otherwise, **`isnormal`** returns 0 (**`false`** in C++ code).

## Remarks

**`isnormal`** is a macro when compiled as C, and an inline function template when compiled as C++.

## Requirements

Function

Required header (C)

Required header (C++)

**`isnormal`**

<math.h>

<math.h> or <cmath>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`isfinite`, `_finite`, `_finitef`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/finite-finitef?view=msvc-170)  
[`isinf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isinf?view=msvc-170)  
[`isnan`, `_isnan`, `_isnanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isnan-isnan-isnanf?view=msvc-170)  
[`_fpclass`, `_fpclassf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclass-fpclassf?view=msvc-170)