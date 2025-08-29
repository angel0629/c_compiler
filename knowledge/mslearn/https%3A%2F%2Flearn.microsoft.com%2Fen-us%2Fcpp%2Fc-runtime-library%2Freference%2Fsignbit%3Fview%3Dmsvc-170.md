---
title: "signbit"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/signbit?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines whether a floating-point value is negative.

## Syntax

```
int signbit(
   /* floating-point */ x
); /* C-only macro */

inline bool signbit(
   float x
) throw(); /* C++-only overloaded function */

inline bool signbit(
   double x
) throw(); /* C++-only overloaded function */

inline bool signbit(
   long double x
) throw(); /* C++-only overloaded function */
```

### Parameters

_`x`_  
The floating-point value to test.

## Return value

**`signbit`** returns a non-zero value (**`true`** in C++) if the argument _`x`_ is negative or negative infinity. It returns 0 (**`false`** in C++) if the argument is non-negative, positive infinity, or a NAN.

## Remarks

**`signbit`** is a macro when compiled as C, and an overloaded inline function when compiled as C++.

## Requirements

Function

Required header (C)

Required header (C++)

**`signbit`**

<math.h>

<math.h> or <cmath>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`isfinite`, `_finite`, `_finitef`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/finite-finitef?view=msvc-170)  
[`isinf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isinf?view=msvc-170)  
[`isnan`, `_isnan`, `_isnanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isnan-isnan-isnanf?view=msvc-170)  
[`isnormal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isnormal?view=msvc-170)  
[`_fpclass`, `_fpclassf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclass-fpclassf?view=msvc-170)