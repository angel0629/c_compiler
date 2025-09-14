---
title: "nan, nanf, nanl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/nan-nanf-nanl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns a quiet NaN value.

## Syntax

```
double nan( const char* input );
float nanf( const char* input );
long double nanl( const char* input );
```

### Parameters

_`input`_  
A string value.

## Return value

The **`nan`** functions return a quiet NaN value.

## Remarks

The **`nan`** functions return a floating-point value that corresponds to a quiet (non-signalling) NaN. The _`input`_ value is ignored. For information about how a NaN is represented for output, see [`printf`, `_printf_l`, `wprintf`, `_wprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

C header

C++ header

**`nan`**, **`nanf`**, **`nanl`**

<math.h>

<cmath> or <math.h>

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`fpclassify`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclassify?view=msvc-170)  
[`_fpclass`, `_fpclassf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclass-fpclassf?view=msvc-170)  
[`isfinite`, `_finite`, `_finitef`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/finite-finitef?view=msvc-170)  
[`isinf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isinf?view=msvc-170)  
[`isnan`, `_isnan`, `_isnanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isnan-isnan-isnanf?view=msvc-170)  
[`isnormal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isnormal?view=msvc-170)