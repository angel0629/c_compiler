---
title: "casinh, casinhf, casinhl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/casinh-casinhf-casinhl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Retrieves the inverse hyperbolic sine of a complex number, with branch cuts outside the interval \[-i, +i\] along the imaginary axis.

## Syntax

```
_Dcomplex casinh(
   _Dcomplex z
);
_Fcomplex casinh(
   _Fcomplex z
);  // C++ only
_Lcomplex casinh(
   _Lcomplex z
);  // C++ only
_Fcomplex casinhf(
   _Fcomplex z
);
_Lcomplex casinhl(
   _Lcomplex z
);
```

### Parameters

_`z`_  
A complex number that represents an angle, in radians.

## Return value

The inverse hyperbolic sine of _`z`_, in radians. The result is unbound along the real axis, and in the interval \[-iπ/2, +iπ/2\] along the imaginary axis.

Because C++ allows overloading, you can call overloads of **`casinh`** that take and return `_Fcomplex` and `_Lcomplex` values. In a C program, **`casinh`** always takes and returns a `_Dcomplex` value.

## Requirements

Routine

C header

C++ header

**`casinh`**, **`casinhf`**, **`casinhl`**

<complex.h>

<ccomplex>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`catanh`, `catanhf`, `catanhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/catanh-catanhf-catanhl?view=msvc-170)  
[`ctanh`, `ctanhf`, `ctanhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctanh-ctanhf-ctanhl?view=msvc-170)  
[`catan`, `catanf`, `catanl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/catan-catanf-catanl?view=msvc-170)  
[`csinh`, `csinhf`, `csinhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/csinh-csinhf-csinhl?view=msvc-170)  
[`ccosh`, `ccoshf`, `ccoshl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ccosh-ccoshf-ccoshl?view=msvc-170)  
[`cacosh`, `cacoshf`, `cacoshl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cacosh-cacoshf-cacoshl?view=msvc-170)  
[`cacos`, `cacosf`, `cacosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cacos-cacosf-cacosl?view=msvc-170)  
[`ctan`, `ctanf`, `ctanl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctan-ctanf-ctanl?view=msvc-170)  
[`csin`, `csinf`, `csinl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/csin-csinf-csinl?view=msvc-170)  
[`casin`, `casinf`, `casinl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/casin-casinf-casinl?view=msvc-170)  
[`ccos`, `ccosf`, `ccosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ccos-ccosf-ccosl?view=msvc-170)  
[`csqrt`, `csqrtf`, `csqrtl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/csqrt-csqrtf-csqrtl?view=msvc-170)