---
title: "cpow, cpowf, cpowl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cpow-cpowf-cpowl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Retrieves the value of a number raised to the specified power, where the base and exponent are complex numbers. This function has a branch cut for the exponent along the negative real axis.

## Syntax

```
_Dcomplex cpow(
   _Dcomplex x, _Dcomplex y
);
_Fcomplex cpow(
   _Fcomplex x, _Fcomplex y
);  // C++ only
_Lcomplex cpow(
   _Lcomplex x, _Lcomplex y
);  // C++ only
_Fcomplex cpowf(
   _Fcomplex x, _Fcomplex y
);
_Lcomplex cpowl(
   _Lcomplex x, _Lcomplex y
);
```

### Parameters

_`x`_  
The base.

_`y`_  
The exponent.

## Return value

The value of _`x`_ raised to the power of _`y`_ with a branch cut for _`x`_ along the negative real axis.

## Remarks

Because C++ allows overloading, you can call overloads of **`cpow`** that take and return `_Fcomplex` and `_Lcomplex` values. In a C program, **`cpow`** always takes and returns a `_Dcomplex` value.

## Requirements

Routine

C header

C++ header

**`cpow`**, **`cpowf`**, **`cpowl`**

<complex.h>

<ccomplex>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`cexp`, `cexpf`, `cexpl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cexp-cexpf-cexpl?view=msvc-170)  
[`clog10`, `clog10f`, `clog10l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clog10-clog10f-clog10l?view=msvc-170)  
[`clog`, `clogf`, `clogl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clog-clogf-clogl?view=msvc-170)