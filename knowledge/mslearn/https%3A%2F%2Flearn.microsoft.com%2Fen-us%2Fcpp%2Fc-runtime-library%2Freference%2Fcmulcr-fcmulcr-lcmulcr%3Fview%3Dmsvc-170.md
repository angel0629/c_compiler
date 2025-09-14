---
title: "_Cmulcr, _FCmulcr, _LCmulcr"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cmulcr-fcmulcr-lcmulcr?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Multiplies a complex number by a floating-point number.

## Syntax

```
_Dcomplex _Cmulcr( _Dcomplex x, double y );
_Fcomplex _FCmulcr( _Fcomplex x, float y );
_Lcomplex _LCmulcr( _Lcomplex x, long double y );
```

### Parameters

_`x`_  
One of the complex operands to multiply.

_`y`_  
The floating-point operand to multiply.

## Return value

A `_Dcomplex`, `_Fcomplex`, or `_Lcomplex` structure that represents the complex product of the complex number _`x`_ and floating-point number _`y`_.

Because the built-in arithmetic operators don't work on the Microsoft implementation of the complex types, the **`_Cmulcr`**, **`_FCmulcr`**, and **`_LCmulcr`** functions simplify multiplication of complex types by floating-point types.

## Requirements

Routine

C header

C++ header

**`_Cmulcr`**, **`_FCmulcr`**, **`_LCmulcr`**

<complex.h>

<complex.h>

These functions are Microsoft-specific. The types `_Dcomplex`, `_Fcomplex`, and `_Lcomplex` are Microsoft-specific equivalents to the unimplemented C99 native types **`double _Complex`**, **`float _Complex`**, and **`long double _Complex`**, respectively. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`_Cbuild`, `_FCbuild`, `_LCbuild`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cbuild-fcbuild-lcbuild?view=msvc-170)  
[`_Cmulcc`, `_FCmulcc`, `_LCmulcc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cmulcc-fcmulcc-lcmulcc?view=msvc-170)  
[`norm`, `normf`, `norml`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/norm-normf-norml1?view=msvc-170)  
[`cproj`, `cprojf`, `cprojl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cproj-cprojf-cprojl?view=msvc-170)  
[`conj`, `conjf`, `conjl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/conj-conjf-conjl?view=msvc-170)  
[`creal`, `crealf`, `creall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creal-crealf-creall?view=msvc-170)  
[`cimag`, `cimagf`, `cimagl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cimag-cimagf-cimagl?view=msvc-170)  
[`carg`, `cargf`, `cargl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/carg-cargf-cargl?view=msvc-170)  
[`cabs`, `cabsf`, `cabsl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cabs-cabsf-cabsl?view=msvc-170)