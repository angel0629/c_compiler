---
title: "cproj, cprojf, cprojl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cproj-cprojf-cprojl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Retrieves the projection of a complex number on the Reimann sphere.

## Syntax

```
_Dcomplex cproj(
   _Dcomplex z
);
_Fcomplex cproj(
   _Fcomplex z
);  // C++ only
_Lcomplex cproj(
   _Lcomplex z
);  // C++ only
_Fcomplex cprojf(
   _Fcomplex z
);
_Lcomplex cprojl(
   _Lcomplex z
);
#define cproj(X) // Requires C11 or later
```

### Parameters

_`z`_  
A complex number.

## Return value

The projection of _`z`_ on the Reimann sphere.

## Remarks

Because C++ allows overloading, you can call overloads of **`cproj`** that take and return `_Fcomplex` and `_Lcomplex` values. In a C program, unless you're using the <tgmath.h> macro to call this function, **`cproj`** always takes and returns a `_Dcomplex` value.

If you use the <tgmath.h> `cproj()` macro, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

## Requirements

Routine

C header

C++ header

**`cproj`**, **`cprojf`**, **`cprojl`**

<complex.h>

<ccomplex>

**`cproj`** macro

<tgmath.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`norm`, `normf`, `norml`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/norm-normf-norml1?view=msvc-170)  
[`creal`, `crealf`, `creall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creal-crealf-creall?view=msvc-170)  
[`conj`, `conjf`, `conjl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/conj-conjf-conjl?view=msvc-170)  
[`cimag`, `cimagf`, `cimagl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cimag-cimagf-cimagl?view=msvc-170)  
[`carg`, `cargf`, `cargl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/carg-cargf-cargl?view=msvc-170)  
[`cabs`, `cabsf`, `cabsl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cabs-cabsf-cabsl?view=msvc-170)