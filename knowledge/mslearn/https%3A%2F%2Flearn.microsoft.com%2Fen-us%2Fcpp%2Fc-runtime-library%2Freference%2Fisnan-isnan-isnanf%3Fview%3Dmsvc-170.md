---
title: "isnan, _isnan, _isnanf"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isnan-isnan-isnanf?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Tests if a floating-point value is a NaN ("Not a Number").

## Syntax

```
int isnan(
   /* floating-point */ x
); /* C-only macro */

int _isnan(
   double x
);

int _isnanf(
   float x
); /* x64 only */

template <class T>
bool isnan(
   T x
) throw(); /* C++ only */
```

### Parameters

_`x`_  
The floating-point value to test.

## Return value

In C, the **`isnan`** macro and the **`_isnan`** and **`_isnanf`** functions return a non-zero value if the argument _`x`_ is a NaN; otherwise they return 0.

In C++, the **`isnan`** template function returns **`true`** if the argument _`x`_ is a NaN; otherwise it returns **`false`**.

Because a NaN value doesn't compare as equal to itself or to any other NaN value, to detect one, you must use one of these functions or macros. A NaN is generated when the result of a floating-point operation can't be represented in IEEE-754 floating-point format for the specified type. For information about how a NaN is represented for output, see [`printf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170).

When compiled as C++, the **`isnan`** macro isn't defined, and an **`isnan`** template function is defined instead. It behaves the same way as the macro, but returns a value of type **`bool`** instead of an integer.

The **`_isnan`** and **`_isnanf`** functions are Microsoft-specific. The **`_isnanf`** function is only available when compiled for x64.

## Requirements

Routine

Required header (C)

Required header (C++)

**`isnan`**, **`_isnanf`**

<math.h>

<math.h> or <cmath>

**`_isnan`**

<float.h>

<float.h> or <cfloat>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`fpclassify`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclassify?view=msvc-170)  
[`_fpclass`, `_fpclassf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclass-fpclassf?view=msvc-170)  
[`isfinite`, `_finite`, `_finitef`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/finite-finitef?view=msvc-170)  
[`isinf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isinf?view=msvc-170)  
[`isnormal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isnormal?view=msvc-170)