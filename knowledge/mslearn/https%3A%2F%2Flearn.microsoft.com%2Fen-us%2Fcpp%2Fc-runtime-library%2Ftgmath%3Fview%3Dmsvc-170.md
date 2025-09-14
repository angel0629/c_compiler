---
title: "Type-generic math"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
For ISO C Standard 11 (C11) and later, the `<tgmath.h>` header, in addition to including `<math.h>` and `<complex.h>`, provides macros that invoke a corresponding math function based on the types of the parameters.

C runtime library math functions come in real and complex variants. Each variant comes in three flavors, depending on the type of the argument: `float`, `double`, and `long double`. Because C doesn't support overloading like C++ does, each variant has a different name. For example, to get the absolute value of a real floating-point value, you'd call either `fabsf`, `fabs`, or `fabsl` depending on whether you're passing a `float`, `double`, or `long double` value, respectively. To get the complex absolute value, you'd call one of `cabsf`, `cabs`, or `cabsl` depending on whether you're passing a `float`, `double`, and `long double` complex value, respectively. If the arguments don't match any of the above mentioned types, the function is chosen as though the arguments were doubles.

`<tgmath.h>` contains macros that simplify the selection of the right math function to call. The macros examine the type they're passed and then call the right function. For example, the `sqrt` macro binds `sqrt(9.9f)` to `sqrtf()`, but it binds `sqrt(9.9)` to `sqrt()`. If at least one macro argument for a generic parameter is complex, then the macro binds to a complex function; otherwise, it invokes a real function.

The type-generic macros in `<tgmath.h>` allow you to write more portable code because you don't need to manage casting or selecting different function names depending on the type of argument.

These macros are in their own header so that programs written using the `<math.h>` header won't break. So `double x = sin(42);` behaves as it always has when you include <math.h>. Even so, most existing C programs are expected to be unaffected when the `<tgmath.h>` header is included instead of `<math.h>` or `<complex.h>`.

The following table lists the macros that are available in `<tgmath.h>` and what they expand to. `modf` isn't included in this table because it doesn't have a corresponding type-generic macro because it isn't clear how to make it safe without complicating type resolution.

Macro

Real  
`float`

Real  
`double`

Real  
`long double`

Complex  
`float`

Complex  
`double`

Complex  
`long double`

`acos`

[`acosf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbicmp-mbsnbicmp-l?view=msvc-170)

[`acos`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbicmp-mbsnbicmp-l?view=msvc-170)

[`acosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbicmp-mbsnbicmp-l?view=msvc-170)

[`cacosf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cacos-cacosf-cacosl?view=msvc-170)

[`cacos`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cacos-cacosf-cacosl?view=msvc-170)

[`cacosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cacos-cacosf-cacosl?view=msvc-170)

`acosh`

[`acoshf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/acosh-acoshf-acoshl?view=msvc-170)

[`acosh`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/acosh-acoshf-acoshl?view=msvc-170)

[`acoshl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/acosh-acoshf-acoshl?view=msvc-170)

[`cacoshf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cacosh-cacoshf-cacoshl?view=msvc-170)

[`cacosh`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cacosh-cacoshf-cacoshl?view=msvc-170)

[`cacoshl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cacosh-cacoshf-cacoshl?view=msvc-170)

`asin`

[`asinf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asin-asinf-asinl?view=msvc-170)

[`asin`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asin-asinf-asinl?view=msvc-170)

[`asinl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asin-asinf-asinl?view=msvc-170)

[`casinf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/casin-casinf-casinl?view=msvc-170)

[`casin`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/casin-casinf-casinl?view=msvc-170)

[`casinl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/casin-casinf-casinl?view=msvc-170)

`asinh`

[`asinhf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asin-asinf-asinl?view=msvc-170)

[`asinh`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asin-asinf-asinl?view=msvc-170)

[`asinhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asin-asinf-asinl?view=msvc-170)

[`casinhf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/casinh-casinhf-casinhl?view=msvc-170)

[`casinh`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/casinh-casinhf-casinhl?view=msvc-170)

[`casinhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/casinh-casinhf-casinhl?view=msvc-170)

`atan`

[`atanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atan-atanf-atanl-atan2-atan2f-atan2l?view=msvc-170)

[`atan`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atan-atanf-atanl-atan2-atan2f-atan2l?view=msvc-170)

[`atanl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atan-atanf-atanl-atan2-atan2f-atan2l?view=msvc-170)

[`catanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/catan-catanf-catanl?view=msvc-170)

[`catan`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/catan-catanf-catanl?view=msvc-170)

[`catanl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/catan-catanf-catanl?view=msvc-170)

`atanh`

[`atanhf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atanh-atanhf-atanhl?view=msvc-170)

[`atanh`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atanh-atanhf-atanhl?view=msvc-170)

[`atanhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atanh-atanhf-atanhl?view=msvc-170)

[`catanhf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/catanh-catanhf-catanhl?view=msvc-170)

[`catanh`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/catanh-catanhf-catanhl?view=msvc-170)

[`catanhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/catanh-catanhf-catanhl?view=msvc-170)

`cos`

[`cosf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cos-cosf-cosl?view=msvc-170)

[`cos`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cos-cosf-cosl?view=msvc-170)

[`cosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cos-cosf-cosl?view=msvc-170)

[`ccosf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ccos-ccosf-ccosl?view=msvc-170)

[`ccos`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ccos-ccosf-ccosl?view=msvc-170)

[`ccosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ccos-ccosf-ccosl?view=msvc-170)

`cosh`

[`coshf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cosh-coshf-coshl?view=msvc-170)

[`cosh`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cosh-coshf-coshl?view=msvc-170)

[`coshl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cosh-coshf-coshl?view=msvc-170)

[`ccoshf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ccosh-ccoshf-ccoshl?view=msvc-170)

[`ccosh`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ccosh-ccoshf-ccoshl?view=msvc-170)

[`ccoshl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ccosh-ccoshf-ccoshl?view=msvc-170)

`exp`

[`expf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exp-expf?view=msvc-170)

[`exp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exp-expf?view=msvc-170)

[`expl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exp-expf?view=msvc-170)

[`cexpf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cexp-cexpf-cexpl?view=msvc-170)

[`cexp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cexp-cexpf-cexpl?view=msvc-170)

[`cexpl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cexp-cexpf-cexpl?view=msvc-170)

`fabs`

[`fabsf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fabs-fabsf-fabsl?view=msvc-170)

[`fabs`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fabs-fabsf-fabsl?view=msvc-170)

[`fabsl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fabs-fabsf-fabsl?view=msvc-170)

[`cabsf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cabs-cabsf-cabsl?view=msvc-170)

[`cabs`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cabs-cabsf-cabsl?view=msvc-170)

[`cabsl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cabs-cabsf-cabsl?view=msvc-170)

`log`

[`logf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log-logf-log10-log10f?view=msvc-170)

[`log`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log-logf-log10-log10f?view=msvc-170)

[`logl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log-logf-log10-log10f?view=msvc-170)

[`clogf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clog-clogf-clogl?view=msvc-170)

[`clog`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clog-clogf-clogl?view=msvc-170)

[`clogl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clog-clogf-clogl?view=msvc-170)

`pow`

[`powf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/pow-powf-powl?view=msvc-170)

[`pow`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/pow-powf-powl?view=msvc-170)

[`powl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/pow-powf-powl?view=msvc-170)

[`cpowf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cpow-cpowf-cpowl?view=msvc-170)

[`cpow`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cpow-cpowf-cpowl?view=msvc-170)

[`cpowl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cpow-cpowf-cpowl?view=msvc-170)

`sin`

[`sinf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sin-sinf-sinl?view=msvc-170)

[`sin`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sin-sinf-sinl?view=msvc-170)

[`sinl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sin-sinf-sinl?view=msvc-170)

[`csinf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/csin-csinf-csinl?view=msvc-170)

[`csin`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/csin-csinf-csinl?view=msvc-170)

[`csinl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/csin-csinf-csinl?view=msvc-170)

`sinh`

[`sinhf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sinh-sinhf-sinhl?view=msvc-170)

[`sinh`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sinh-sinhf-sinhl?view=msvc-170)

[`sinhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sinh-sinhf-sinhl?view=msvc-170)

[`csinhf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/csinh-csinhf-csinhl?view=msvc-170)

[`csinh`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/csinh-csinhf-csinhl?view=msvc-170)

[`csinhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/csinh-csinhf-csinhl?view=msvc-170)

`sqrt`

[`sqrtf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sqrt-sqrtf-sqrtl?view=msvc-170)

[`sqrt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sqrt-sqrtf-sqrtl?view=msvc-170)

[`sqrtl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sqrt-sqrtf-sqrtl?view=msvc-170)

[`csqrtf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/csqrt-csqrtf-csqrtl?view=msvc-170)

[`csqrt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/csqrt-csqrtf-csqrtl?view=msvc-170)

[`csqrtl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/csqrt-csqrtf-csqrtl?view=msvc-170)

`tan`

[`tanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tan-tanf-tanl?view=msvc-170)

[`tan`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tan-tanf-tanl?view=msvc-170)

[`tanl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tan-tanf-tanl?view=msvc-170)

[`ctanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctan-ctanf-ctanl?view=msvc-170)

[`ctan`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctan-ctanf-ctanl?view=msvc-170)

[`ctanl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctan-ctanf-ctanl?view=msvc-170)

`tanh`

[`tanhf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tanh-tanhf-tanhl?view=msvc-170)

[`tanh`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tanh-tanhf-tanhl?view=msvc-170)

[`tanhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tanh-tanhf-tanhl?view=msvc-170)

[`ctanhf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctanh-ctanhf-ctanhl?view=msvc-170)

[`ctanh`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctanh-ctanhf-ctanhl?view=msvc-170)

[`ctanhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctanh-ctanhf-ctanhl?view=msvc-170)

`atan2`

[`atan2f`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atan-atanf-atanl-atan2-atan2f-atan2l?view=msvc-170)

[`atan2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atan-atanf-atanl-atan2-atan2f-atan2l?view=msvc-170)

[`atan2l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atan-atanf-atanl-atan2-atan2f-atan2l?view=msvc-170)

\-

\-

\-

`cbrt`

[`cbrtf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cbrt-cbrtf-cbrtl?view=msvc-170)

[`cbrt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cbrt-cbrtf-cbrtl?view=msvc-170)

[`cbrtl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cbrt-cbrtf-cbrtl?view=msvc-170)

\-

\-

\-

`ceil`

[`ceilf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ceil-ceilf-ceill?view=msvc-170)

[`ceil`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ceil-ceilf-ceill?view=msvc-170)

[`ceill`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ceil-ceilf-ceill?view=msvc-170)

\-

\-

\-

`copysign`

[`copysignf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/copysign-copysignf-copysignl-copysign-copysignf-copysignl?view=msvc-170)

[`copysign`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/copysign-copysignf-copysignl-copysign-copysignf-copysignl?view=msvc-170)

[`copysignl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/copysign-copysignf-copysignl-copysign-copysignf-copysignl?view=msvc-170)

\-

\-

\-

`erf`

[`erff`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/erf-erff-erfl-erfc-erfcf-erfcl?view=msvc-170)

[`erf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/erf-erff-erfl-erfc-erfcf-erfcl?view=msvc-170)

[`erfl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/erf-erff-erfl-erfc-erfcf-erfcl?view=msvc-170)

\-

\-

\-

`erfc`

[`erfcf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/erf-erff-erfl-erfc-erfcf-erfcl?view=msvc-170)

[`erfc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/erf-erff-erfl-erfc-erfcf-erfcl?view=msvc-170)

[`erfcl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/erf-erff-erfl-erfc-erfcf-erfcl?view=msvc-170)

\-

\-

\-

`exp2`

[`exp2f`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exp2-exp2f-exp2l?view=msvc-170)

[`exp2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exp2-exp2f-exp2l?view=msvc-170)

[`exp2l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exp2-exp2f-exp2l?view=msvc-170)

\-

\-

\-

`expm1`

[`expm1f`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/expm1-expm1f-expm1l?view=msvc-170)

[`expm1`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/expm1-expm1f-expm1l?view=msvc-170)

[`expm1l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/expm1-expm1f-expm1l?view=msvc-170)

\-

\-

\-

`fdim`

[`fdimf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fdim-fdimf-fdiml?view=msvc-170)

[`fdim`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fdim-fdimf-fdiml?view=msvc-170)

[`fdiml`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fdim-fdimf-fdiml?view=msvc-170)

\-

\-

\-

`floor`

[`floorf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/floor-floorf-floorl?view=msvc-170)

[`floor`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/floor-floorf-floorl?view=msvc-170)

[`floorl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/floor-floorf-floorl?view=msvc-170)

\-

\-

\-

`fma`

[`fmaf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fma-fmaf-fmal?view=msvc-170)

[`fma`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fma-fmaf-fmal?view=msvc-170)

[`fmal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fma-fmaf-fmal?view=msvc-170)

\-

\-

\-

`fmax`

[`fmaxf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmax-fmaxf-fmaxl?view=msvc-170)

[`fmax`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmax-fmaxf-fmaxl?view=msvc-170)

[`fmaxl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmax-fmaxf-fmaxl?view=msvc-170)

\-

\-

\-

`fmin`

[`fminf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmin-fminf-fminl?view=msvc-170)

[`fmin`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmin-fminf-fminl?view=msvc-170)

[`fminl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmin-fminf-fminl?view=msvc-170)

\-

\-

\-

`fmod`

[`fmodf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmod-fmodf?view=msvc-170)

[`fmod`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmod-fmodf?view=msvc-170)

[`fmodl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmod-fmodf?view=msvc-170)

\-

\-

\-

`frexp`

[`frexpf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/frexp?view=msvc-170)

[`frexp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/frexp?view=msvc-170)

[`frexpl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/frexp?view=msvc-170)

\-

\-

\-

`hypot`

[`hypotf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/hypot-hypotf-hypotl-hypot-hypotf-hypotl?view=msvc-170)

[`hypot`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/hypot-hypotf-hypotl-hypot-hypotf-hypotl?view=msvc-170)

[`hypotl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/hypot-hypotf-hypotl-hypot-hypotf-hypotl?view=msvc-170)

\-

\-

\-

`ilogb`

[`ilogbf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ilogb-ilogbf-ilogbl2?view=msvc-170)

[`ilogb`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ilogb-ilogbf-ilogbl2?view=msvc-170)

[`ilogbl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ilogb-ilogbf-ilogbl2?view=msvc-170)

\-

\-

\-

`ldexp`

[`ldexpf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ldexp?view=msvc-170)

[`ldexp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ldexp?view=msvc-170)

[`ldexpl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ldexp?view=msvc-170)

\-

\-

\-

`lgamma`

[`lgammaf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lgamma-lgammaf-lgammal?view=msvc-170)

[`lgamma`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lgamma-lgammaf-lgammal?view=msvc-170)

[`lgammal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lgamma-lgammaf-lgammal?view=msvc-170)

\-

\-

\-

`llrint`

[`llrintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lrint-lrintf-lrintl-llrint-llrintf-llrintl?view=msvc-170)

[`llrint`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lrint-lrintf-lrintl-llrint-llrintf-llrintl?view=msvc-170)

[`llrintl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lrint-lrintf-lrintl-llrint-llrintf-llrintl?view=msvc-170)

\-

\-

\-

`llround`

[`llroundf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lround-lroundf-lroundl-llround-llroundf-llroundl?view=msvc-170)

[`llround`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lround-lroundf-lroundl-llround-llroundf-llroundl?view=msvc-170)

[`llroundl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lround-lroundf-lroundl-llround-llroundf-llroundl?view=msvc-170)

\-

\-

\-

`log10`

[`log10f`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log-logf-log10-log10f?view=msvc-170)

[`log10`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log-logf-log10-log10f?view=msvc-170)

[`log10l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log-logf-log10-log10f?view=msvc-170)

\-

\-

\-

`log1p`

[`log1pf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log1p-log1pf-log1pl2?view=msvc-170)

[`log1p`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log1p-log1pf-log1pl2?view=msvc-170)

[`log1pl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log1p-log1pf-log1pl2?view=msvc-170)

\-

\-

\-

`log2`

[`log2f`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log2-log2f-log2l?view=msvc-170)

[`log2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log2-log2f-log2l?view=msvc-170)

[`log2l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log2-log2f-log2l?view=msvc-170)

\-

\-

\-

`logb`

[`logbf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/logb-logbf-logbl-logb-logbf?view=msvc-170)

[`logb`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/logb-logbf-logbl-logb-logbf?view=msvc-170)

[`logbl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/logb-logbf-logbl-logb-logbf?view=msvc-170)

\-

\-

\-

`lrint`

[`lrintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lrint-lrintf-lrintl-llrint-llrintf-llrintl?view=msvc-170)

[`lrint`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lrint-lrintf-lrintl-llrint-llrintf-llrintl?view=msvc-170)

[`lrintl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lrint-lrintf-lrintl-llrint-llrintf-llrintl?view=msvc-170)

\-

\-

\-

`lround`

[`lroundf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lround-lroundf-lroundl-llround-llroundf-llroundl?view=msvc-170)

[`lround`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lround-lroundf-lroundl-llround-llroundf-llroundl?view=msvc-170)

[`lroundl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lround-lroundf-lroundl-llround-llroundf-llroundl?view=msvc-170)

\-

\-

\-

`nearbyint`

[`nearbyintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/nearbyint-nearbyintf-nearbyintl1?view=msvc-170)

[`nearbyint`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/nearbyint-nearbyintf-nearbyintl1?view=msvc-170)

[`nearbyintl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/nearbyint-nearbyintf-nearbyintl1?view=msvc-170)

\-

\-

\-

`nextafter`

[`nextafterf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/nextafter-functions?view=msvc-170)

[`nextafter`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/nextafter-functions?view=msvc-170)

[`nextafterl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/nextafter-functions?view=msvc-170)

\-

\-

\-

`nexttoward`

[`nexttowardf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/nextafter-functions?view=msvc-170)

[`nexttoward`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/nextafter-functions?view=msvc-170)

[`nexttowardl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/nextafter-functions?view=msvc-170)

\-

\-

\-

`remainder`

[`remainderf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/remainder-remainderf-remainderl?view=msvc-170)

[`remainder`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/remainder-remainderf-remainderl?view=msvc-170)

[`remainderl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/remainder-remainderf-remainderl?view=msvc-170)

\-

\-

\-

`remquo`

[`remquof`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/remquo-remquof-remquol?view=msvc-170)

[`remquo`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/remquo-remquof-remquol?view=msvc-170)

[`remquol`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/remquo-remquof-remquol?view=msvc-170)

\-

\-

\-

`rint`

[`rintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rint-rintf-rintl?view=msvc-170)

[`rint`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rint-rintf-rintl?view=msvc-170)

[`rintl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rint-rintf-rintl?view=msvc-170)

\-

\-

\-

`round`

[`roundf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/round-roundf-roundl?view=msvc-170)

[`round`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/round-roundf-roundl?view=msvc-170)

[`roundl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/round-roundf-roundl?view=msvc-170)

\-

\-

\-

`scalbln`

[`scalblnf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scalbn-scalbnf-scalbnl-scalbln-scalblnf-scalblnl?view=msvc-170)

[`scalbln`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scalbn-scalbnf-scalbnl-scalbln-scalblnf-scalblnl?view=msvc-170)

[`scalblnl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scalbn-scalbnf-scalbnl-scalbln-scalblnf-scalblnl?view=msvc-170)

\-

\-

\-

`scalbn`

[`scalbnf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scalbn-scalbnf-scalbnl-scalbln-scalblnf-scalblnl?view=msvc-170)

[`scalbn`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scalbn-scalbnf-scalbnl-scalbln-scalblnf-scalblnl?view=msvc-170)

[`scalbnl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scalbn-scalbnf-scalbnl-scalbln-scalblnf-scalblnl?view=msvc-170)

\-

\-

\-

`tgamma`

[`tgammaf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tgamma-tgammaf-tgammal?view=msvc-170)

[`tgamma`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tgamma-tgammaf-tgammal?view=msvc-170)

[`tgammal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tgamma-tgammaf-tgammal?view=msvc-170)

\-

\-

\-

`trunc`

[`truncf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/trunc-truncf-truncl?view=msvc-170)

[`trunc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/trunc-truncf-truncl?view=msvc-170)

[`truncl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/trunc-truncf-truncl?view=msvc-170)

\-

\-

\-

`carg`

\-

\-

\-

[`cargf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/carg-cargf-cargl?view=msvc-170)

[`carg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/carg-cargf-cargl?view=msvc-170)

[`cargl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/carg-cargf-cargl?view=msvc-170)

`conj`

\-

\-

\-

[`conjf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/conj-conjf-conjl?view=msvc-170)

[`conj`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/conj-conjf-conjl?view=msvc-170)

[`conjl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/conj-conjf-conjl?view=msvc-170)

`creal`

\-

\-

\-

[`crealf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creal-crealf-creall?view=msvc-170)

[`creal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creal-crealf-creall?view=msvc-170)

[`creall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creal-crealf-creall?view=msvc-170)

`cimag`

\-

\-

\-

[`cimagf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cimag-cimagf-cimagl?view=msvc-170)

[`cimag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cimag-cimagf-cimagl?view=msvc-170)

[`cimagl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cimag-cimagf-cimagl?view=msvc-170)

`cproj`

\-

\-

\-

[`cprojf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cproj-cprojf-cprojl?view=msvc-170)

[`cproj`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cproj-cprojf-cprojl?view=msvc-170)

[`cprojl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cproj-cprojf-cprojl?view=msvc-170)

## Requirements

Compile with [`/std:c11`](https://learn.microsoft.com/en-us/cpp/build/reference/std-specify-language-standard-version?view=msvc-170).

Windows SDK 10.0.20348.0 (version 2104) or later. See [Windows SDK](https://developer.microsoft.com/windows/downloads/windows-sdk/) to download the latest SDK. For instructions to install and use the SDK for C11 and C17 development, see [Install C11 and C17 support in Visual Studio](https://learn.microsoft.com/en-us/cpp/overview/install-c17-support?view=msvc-170).

## See also

[C Run-Time library reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/c-run-time-library-reference?view=msvc-170)