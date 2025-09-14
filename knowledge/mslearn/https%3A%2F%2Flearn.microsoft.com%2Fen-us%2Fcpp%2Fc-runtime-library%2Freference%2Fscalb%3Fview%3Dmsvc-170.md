---
title: "_scalb, _scalbf"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scalb?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Scales argument by a power of 2.

## Syntax

```
double _scalb(
   double x,
   long exp
);
float _scalbf(
   float x,
   long exp
); /* x64 only */
```

### Parameters

_`x`_  
Double-precision, floating-point value.

_`exp`_  
Long integer exponent.

## Return value

Returns an exponential value if successful. On overflow (depending on the sign of _`x`_), **`_scalb`** returns +/- `HUGE_VAL`; the `errno` variable is set to `ERANGE`.

For more information about this and other return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

## Remarks

The **`_scalb`** function calculates the value of _`x`_ \* 2_`exp`_.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_scalb`**, **`_scalbf`**

`<float.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`ldexp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ldexp?view=msvc-170)