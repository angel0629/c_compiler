---
title: "Math Error Constants"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/math-error-constants?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
## Syntax

```
#include <math.h>
```

## Remarks

The math routines of the run-time library can generate math error constants.

These errors, described as follows, correspond to the exception types defined in MATH.H and are returned by the `_matherr` function when a math error occurs.

Constant

Meaning

`_DOMAIN`

Argument to function is outside domain of function.

`_OVERFLOW`

Result is too large to be represented in function's return type.

`_PLOSS`

Partial loss of significance occurred.

`_SING`

Argument singularity: argument to function has illegal value. (For example, value 0 is passed to function that requires nonzero value.)

`_TLOSS`

Total loss of significance occurred.

`_UNDERFLOW`

Result is too small to be represented.

## See also

[`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)