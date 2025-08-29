---
title: "_Cbuild, _FCbuild, _LCbuild"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cbuild-fcbuild-lcbuild?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Constructs a complex number from real and imaginary parts.

## Syntax

```
_Dcomplex _Cbuild( double real, double imaginary );
_Fcomplex _FCbuild( float real, float imaginary );
_Lcomplex _LCbuild( long double real, long double imaginary );
```

### Parameters

_`real`_  
The real part of the complex number to construct.

_`imaginary`_  
The imaginary part of the complex number to construct.

## Return value

A `_Dcomplex`, `_Fcomplex`, or `_Lcomplex` structure that represents the complex number (_`real`_, _`imaginary`_ \* i) for values of the specified floating-point type.

The **`_Cbuild`**, **`_FCbuild`**, and **`_LCbuild`** functions simplify creation of complex types. Use the [`creal`, `crealf`, `creall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creal-crealf-creall?view=msvc-170) and [`cimag`, `cimagf`, `cimagl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cimag-cimagf-cimagl?view=msvc-170) functions to retrieve the real and imaginary portions of the represented complex numbers.

## Requirements

Routine

C header

C++ header

**`_Cbuild`**, **`_FCbuild`**, **`_LCbuild`**

<complex.h>

<ccomplex>

These functions are Microsoft-specific. The types `_Dcomplex`, `_Fcomplex`, and `_Lcomplex` are Microsoft-specific equivalents to the unimplemented C99 native types **`double _Complex`**, **`float _Complex`**, and **`long double _Complex`**, respectively. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`_Cmulcc`, `_FCmulcc`, `_LCmulcc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cmulcc-fcmulcc-lcmulcc?view=msvc-170)  
[`_Cmulcr`, `_FCmulcr`, `_LCmulcr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cmulcr-fcmulcr-lcmulcr?view=msvc-170)  
[`norm`, `normf`, `norml`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/norm-normf-norml1?view=msvc-170)  
[`cproj`, `cprojf`, `cprojl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cproj-cprojf-cprojl?view=msvc-170)  
[`conj`, `conjf`, `conjl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/conj-conjf-conjl?view=msvc-170)  
[`creal`, `crealf`, `creall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creal-crealf-creall?view=msvc-170)  
[`cimag`, `cimagf`, `cimagl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cimag-cimagf-cimagl?view=msvc-170)  
[`carg`, `cargf`, `cargl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/carg-cargf-cargl?view=msvc-170)  
[`cabs`, `cabsf`, `cabsl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cabs-cabsf-cabsl?view=msvc-170)