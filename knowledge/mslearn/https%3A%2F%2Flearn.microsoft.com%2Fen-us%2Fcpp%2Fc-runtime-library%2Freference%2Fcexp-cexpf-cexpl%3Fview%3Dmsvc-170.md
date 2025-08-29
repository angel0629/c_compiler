---
title: "cexp, cexpf, cexpl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cexp-cexpf-cexpl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Compute the base-e exponential of a complex number.

## Syntax

```
_Dcomplex cexp( _Dcomplex z );
_Fcomplex cexpf( _Fcomplex z );
_Lcomplex cexpl( _Lcomplex z );

_Fcomplex cexp( _Fcomplex z );  // C++ only
_Lcomplex cexp( _Lcomplex z );  // C++ only
```

### Parameters

_`z`_  
A complex number that represents the exponent.

## Return value

The value of **e** raised to the power of _`z`_.

## Remarks

Because C++ allows overloading, you can call overloads of **`cexp`** that take and return `_Fcomplex` and `_Lcomplex` values. In a C program, **`cexp`** always takes and returns a `_Dcomplex` value.

## Requirements

Routine

C header

C++ header

**`cexp`**, **`cexpf`**, **`cexpl`**

<complex.h>

<complex.h>

For compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`cpow`, `cpowf`, `cpowl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cpow-cpowf-cpowl?view=msvc-170)  
[`clog10`, `clog10f`, `clog10l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clog10-clog10f-clog10l?view=msvc-170)  
[`clog`, `clogf`, `clogl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clog-clogf-clogl?view=msvc-170)