---
title: "clog, clogf, clogl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clog-clogf-clogl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Retrieves the natural logarithm of a complex number, with a branch cut along the negative real axis.

## Syntax

```
_Dcomplex clog(
   _Dcomplex z
);
_Fcomplex clog(
   _Fcomplex z
);  // C++ only
_Lcomplex clog(
   _Lcomplex z
);  // C++ only
_Fcomplex clogf(
   _Fcomplex z
);
_Lcomplex clogl(
   _Lcomplex z
);
```

### Parameters

_`z`_  
The base of the logarithm.

## Return value

The natural logarithm of _`z`_. The result is unbounded along the real axis and in the interval \[-iπ, +iπ\] along the imaginary axis.

The possible return values are:

_`z`_ parameter

Return value

Positive

The logarithm (base 10) of _`z`_

Zero

\- INF

Negative

NaN

NaN

NaN

\+ INF

\+ INF

## Remarks

Because C++ allows overloading, you can call overloads of **`clog`** that take and return `_Fcomplex` and `_Lcomplex` values. In a C program, **`clog`** always takes and returns a `_Dcomplex` value.

## Requirements

Routine

C header

C++ header

**`clog`**, **`clogf`**, **`clogl`**

<complex.h>

<ccomplex>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`cexp`, `cexpf`, `cexpl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cexp-cexpf-cexpl?view=msvc-170)  
[`cpow`, `cpowf`, `cpowl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cpow-cpowf-cpowl?view=msvc-170)  
[`clog10`, `clog10f`, `clog10l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clog10-clog10f-clog10l?view=msvc-170)