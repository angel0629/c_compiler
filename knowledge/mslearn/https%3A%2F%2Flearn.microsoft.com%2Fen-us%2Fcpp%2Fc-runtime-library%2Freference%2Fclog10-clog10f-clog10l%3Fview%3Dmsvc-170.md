---
title: "clog10, clog10f, clog10l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clog10-clog10f-clog10l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Retrieves the logarithm (base 10) of a complex number.

## Syntax

```
_Dcomplex clog10( _Dcomplex z );
_Fcomplex clog10f( _Fcomplex z );
_Lcomplex clog10l( _Lcomplex z );
```

```
_Fcomplex clog10( _Fcomplex z );  // C++ only
_Lcomplex clog10( _Lcomplex z );  // C++ only
```

### Parameters

_`z`_  
The base of the logarithm.

## Return value

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

Because C++ allows overloading, you can call overloads of **`clog10`** that take and return `_Fcomplex` and `_Lcomplex` values. In a C program, **`clog10`** always takes and returns a `_Dcomplex` value.

## Requirements

Routine

C header

C++ header

**`clog10`**, **`clog10f`**, **`clog10l`**

<complex.h>

<ccomplex>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`cexp`, `cexpf`, `cexpl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cexp-cexpf-cexpl?view=msvc-170)  
[`cpow`, `cpowf`, `cpowl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cpow-cpowf-cpowl?view=msvc-170)  
[`clog`, `clogf`, `clogl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clog-clogf-clogl?view=msvc-170)