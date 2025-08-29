---
title: "cabs, cabsf, cabsl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cabs-cabsf-cabsl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Retrieves the absolute value of a complex number.

## Syntax

```
double cabs(
   _Dcomplex z
);
float cabs(
   _Fcomplex z
);  // C++ only
long double cabs(
   _Lcomplex z
);  // C++ only
float cabsf(
   _Fcomplex z
);
long double cabsl(
   _Lcomplex z
);
```

### Parameters

_`z`_  
A complex number.

## Return value

The absolute value of _`z`_.

## Remarks

Because C++ allows overloading, you can call overloads of **`cabs`** that take `_Fcomplex` or `_Lcomplex` values, and return **`float`** or **`long double`** values. In a C program, **`cabs`** always takes a `_Dcomplex` value and returns a **`double`** value.

## Requirements

Routine

C header

C++ header

**`cabs`**, **`cabsf`**, **`cabsl`**

<complex.h>

<ccomplex>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`norm`, `normf`, `norml`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/norm-normf-norml1?view=msvc-170)  
[`creal`, `crealf`, `creall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creal-crealf-creall?view=msvc-170)  
[`cproj`, `cprojf`, `cprojl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cproj-cprojf-cprojl?view=msvc-170)  
[`conj`, `conjf`, `conjl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/conj-conjf-conjl?view=msvc-170)  
[`cimag`, `cimagf`, `cimagl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cimag-cimagf-cimagl?view=msvc-170)  
[`carg`, `cargf`, `cargl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/carg-cargf-cargl?view=msvc-170)