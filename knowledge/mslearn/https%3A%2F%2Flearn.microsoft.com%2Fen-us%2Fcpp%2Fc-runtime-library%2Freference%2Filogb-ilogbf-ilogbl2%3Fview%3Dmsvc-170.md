---
title: "ilogb, ilogbf, ilogbl2"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ilogb-ilogbf-ilogbl2?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Retrieves an integer that represents the unbiased base-2 exponent of the specified value.

## Syntax

```
int ilogb(
   double x
);

int ilogb(
   float x
); //C++ only

int ilogb(
   long double x
); //C++ only

int ilogbf(
   float x
);

int ilogbl(
   long double x
);

#define ilogbl(X) // Requires C11 or later
```

### Parameters

_`x`_  
The specified value.

## Return value

If successful, these functions return the base-2 exponent of _`x`_ as a **`signed int`** value.

Otherwise, the functions return one of the following values, defined in <math.h>:

Input

Result

±0

`FP_ILOGB0`

± INF, ± NAN, IND

`FP_ILOGBNAN`

Errors are reported as specified in [`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170).

Because C++ allows overloading, you can call overloads of **`ilogb`** that take and return **`float`** and **`long double`** types. In a C program, unless you're using the <tgmath.h> macro to call this function, **`ilogb`** always takes and returns a **`double`**.

If you use the <tgmath.h> `ilogb()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

Calling this function is similar to calling the equivalent `logb` function, then casting the return value to **`int`**.

## Requirements

Routine

C header

C++ header

**`ilogb`**, **`ilogbf`**, **`ilogbl`**

<math.h>

<cmath>

**`ilogb`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`frexp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/frexp?view=msvc-170)  
[`logb`, `logbf`, `logbl`, `_logb`, `_logbf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/logb-logbf-logbl-logb-logbf?view=msvc-170)