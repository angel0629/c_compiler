---
title: "_fpclass, _fpclassf"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclass-fpclassf?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns a value indicating the floating-point classification of the argument.

## Syntax

```
int _fpclass(
   double x
);

int _fpclassf(
   float x
); /* x64 only */
```

### Parameters

_`x`_  
The floating-point value to test.

## Return value

The **`_fpclass`** and **`_fpclassf`** functions return an integer value that indicates the floating-point classification of the argument _`x`_. The classification may have one of the following values, defined in `<float.h>`.

Value

Description

`_FPCLASS_SNAN`

Signaling NaN

`_FPCLASS_QNAN`

Quiet NaN

`_FPCLASS_NINF`

Negative infinity (`-INF`)

`_FPCLASS_NN`

Negative normalized non-zero

`_FPCLASS_ND`

Negative denormalized

`_FPCLASS_NZ`

Negative zero (-0)

`_FPCLASS_PZ`

Positive 0 (+0)

`_FPCLASS_PD`

Positive denormalized

`_FPCLASS_PN`

Positive normalized non-zero

`_FPCLASS_PINF`

Positive infinity (`+INF`)

## Remarks

The **`_fpclass`** and **`_fpclassf`** functions are Microsoft-specific. They're similar to [`fpclassify`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclassify?view=msvc-170), but return more detailed information about the argument. The **`_fpclassf`** function is only available when compiled for the x64 platform.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`_fpclass`**, **`_fpclassf`**

`<float.h>`

For more compatibility and conformance information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`isnan`, `_isnan`, `_isnanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isnan-isnan-isnanf?view=msvc-170)  
[`fpclassify`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclassify?view=msvc-170)