---
title: "Math and floating-point support"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The Universal C Runtime library (UCRT) provides many integral and floating-point math library functions, including all of the functions required by ISO C99. The floating-point functions are implemented to balance performance with correctness. Because producing the correctly rounded result may be prohibitively expensive, these functions are designed to efficiently produce a close approximation to the correctly rounded result. In most cases, the result produced is within +/-1 ULP (unit of least precision) of the correctly rounded result, though there may be cases where there's greater inaccuracy.

For ISO C Standard 11 (C11) and later, the `<tgmath.h>` header, in addition to including `<math.h>` and `<complex.h>`, provides macros that invoke a corresponding math function based on the types of the parameters. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

Many of the floating-point math library functions have different implementations for different CPU architectures. For example, the 32-bit x86 CRT may have a different implementation than the 64-bit x64 CRT. In addition, some of the functions may have multiple implementations for a given CPU architecture. The most efficient implementation is selected dynamically at run-time depending on the instruction sets supported by the CPU. For example, in the 32-bit x86 CRT, some functions have both an x87 implementation and an SSE2 implementation. When running on a CPU that supports SSE2, the faster SSE2 implementation is used. When running on a CPU that doesn't support SSE2, the slower x87 implementation is used. Because different implementations of the math library functions may use different CPU instructions and different algorithms to produce their results, the functions may produce different results across CPUs. In most cases, the results are within +/-1 ULP of the correctly rounded result, but the actual results may vary across CPUs.

Newer versions of the UCRT might improve the precision and accuracy of the floating-point math library functions. Since the UCRT is part of the Windows operating system, you might get different results for these functions on different operating system versions or between debug and release builds. Although it is not recommended, you can statically link to the UCRT to guarantee consistent results if you need these functions will produce identical results everywhere.

Previous 16-bit versions of Microsoft C/C++ and Microsoft Visual C++ supported the **`long double`** type as an 80-bit precision floating-point data type. In later versions of Visual C++, the **`long double`** data type is a 64-bit precision floating-point data type identical to the **`double`** type. The compiler treats **`long double`** and **`double`** as distinct types, but the **`long double`** functions are identical to their **`double`** counterparts. The CRT provides **`long double`** versions of the math functions for ISO C99 source code compatibility, but note that the binary representation may differ from other compilers.

## Supported math and floating-point routines

Routine

Use

[`abs`, `labs`, `llabs`, `_abs64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abs-labs-llabs-abs64?view=msvc-170)

Computes the absolute value of an integer type

[`acos`, `acosf`, `acosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/acos-acosf-acosl?view=msvc-170)

Computes the arc cosine

[`acosh`, `acoshf`, `acoshl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/acosh-acoshf-acoshl?view=msvc-170)

Computes the hyperbolic arc cosine

[`asin`, `asinf`, `asinl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asin-asinf-asinl?view=msvc-170)

Computes the arc sine

[`asinh`, `asinhf`, `asinhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asinh-asinhf-asinhl?view=msvc-170)

Computes the hyperbolic arc sine

[`atan`, `atanf`, `atanl`, `atan2`, `atan2f`, `atan2l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atan-atanf-atanl-atan2-atan2f-atan2l?view=msvc-170)

Computes the arc tangent

[`atanh`, `atanhf`, `atanhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atanh-atanhf-atanhl?view=msvc-170)

Computes the hyperbolic arc tangent

[`_atodbl`, `_atodbl_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atodbl-atodbl-l-atoldbl-atoldbl-l-atoflt-atoflt-l?view=msvc-170)

Converts a locale-specific string to a **`double`**

[`atof`, `_atof_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atof-atof-l-wtof-wtof-l?view=msvc-170)

Converts a string to a **`double`**

[`_atoflt`, `_atoflt_l`, `_atoldbl`, `_atoldbl_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atodbl-atodbl-l-atoldbl-atoldbl-l-atoflt-atoflt-l?view=msvc-170)

Converts a locale-specific string to a **`float`** or **`long double`**

[`cbrt`, `cbrtf`, `cbrtl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cbrt-cbrtf-cbrtl?view=msvc-170)

Computes the cube root

[`ceil`, `ceilf`, `ceill`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ceil-ceilf-ceill?view=msvc-170)

Computes the ceiling

[`_chgsign`, `_chgsignf`, `_chgsignl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chgsign-chgsignf-chgsignl?view=msvc-170)

Computes the additive inverse

[`_clear87`, `_clearfp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clear87-clearfp?view=msvc-170)

Gets and clears the floating-point status register

[`_control87`, `_controlfp`, `__control87_2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/control87-controlfp-control87-2?view=msvc-170)

Gets and sets the floating-point control word

[`_controlfp_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/controlfp-s?view=msvc-170)

Secure version of **`_controlfp`**

[`copysign`, `copysignf`, `copysignl`, `_copysign`, `_copysignf`, `_copysignl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/copysign-copysignf-copysignl-copysign-copysignf-copysignl?view=msvc-170)

Returns a value that has the magnitude of one argument and the sign of another

[`cos`, `cosf`, `cosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cos-cosf-cosl?view=msvc-170)

Computes the sine

[`cosh`, `coshf`, `coshl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cosh-coshf-coshl?view=msvc-170)

Computes the hyperbolic sine

[`div`, `ldiv`, `lldiv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/div?view=msvc-170)

Computes the quotient and the remainder of two integer values

[`_ecvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ecvt?view=msvc-170), [`ecvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/posix-ecvt?view=msvc-170)

Converts a **`double`** to a string

[`_ecvt_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ecvt-s?view=msvc-170)

Secure version of **`_ecvt`**

[`erf`, `erff`, `erfl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/erf-erff-erfl-erfc-erfcf-erfcl?view=msvc-170)

Computes the error function

[`erfc`, `erfcf`, `erfcl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/erf-erff-erfl-erfc-erfcf-erfcl?view=msvc-170)

Computes the complementary error function

[`exp`, `expf`, `expl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exp-expf?view=msvc-170)

Computes the exponential _e_x

[`exp2`, `exp2f`, `exp2l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exp2-exp2f-exp2l?view=msvc-170)

Computes the exponential 2x

[`expm1`, `expm1f`, `expm1l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/expm1-expm1f-expm1l?view=msvc-170)

Computes _e_x\-1

[`fabs`, `fabsf`, `fabsl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fabs-fabsf-fabsl?view=msvc-170)

Computes the absolute value of a floating-point type

[`_fcvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fcvt?view=msvc-170), [`fcvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/posix-fcvt?view=msvc-170)

Converts a floating-point number to a string

[`_fcvt_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fcvt-s?view=msvc-170)

Secure version of **`_fcvt`**

[`fdim`, `fdimf`, `fdiml`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fdim-fdimf-fdiml?view=msvc-170)

Determines the positive difference between two values

[`feclearexcept`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feclearexcept1?view=msvc-170)

Clears specified floating-point exceptions

[`fegetenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetenv1?view=msvc-170)

Stores the current floating-point environment

[`fegetexceptflag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetexceptflag2?view=msvc-170)

Gets the specified floating-point exception status

[`fegetround`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetround-fesetround2?view=msvc-170)

Gets the floating-point rounding mode

[`feholdexcept`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feholdexcept2?view=msvc-170)

Sets non-stop floating-point exception mode

[`feraiseexcept`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feraiseexcept?view=msvc-170)

Raises the specified floating-point exceptions

[`fesetenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fesetenv1?view=msvc-170)

Sets the current floating-point environment

[`fesetexceptflag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fesetexceptflag2?view=msvc-170)

Sets the specified floating-point status flags

[`fesetround`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetround-fesetround2?view=msvc-170)

Sets the specified floating-point rounding mode

[`fetestexcept`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fetestexcept1?view=msvc-170)

Determines which floating-point exception status flags are set

[`feupdateenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feupdateenv?view=msvc-170)

Restores a floating-point environment then raises previous exceptions

[`floor`, `floorf`, `floorl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/floor-floorf-floorl?view=msvc-170)

Computes the floor

[`fma`, `fmaf`, `fmal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fma-fmaf-fmal?view=msvc-170)

Computes a fused multiply-add

[`fmax`, `fmaxf`, `fmaxl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmax-fmaxf-fmaxl?view=msvc-170)

Computes the maximum of the arguments

[`fmin`, `fminf`, `fminl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmin-fminf-fminl?view=msvc-170)

Computes the minimum of the arguments

[`fmod`, `fmodf`, `fmodl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fmod-fmodf?view=msvc-170)

Computes the floating-point remainder

[`_fpclass`, `_fpclassf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclass-fpclassf?view=msvc-170)

Returns the classification of a floating-point value

[`fpclassify`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclassify?view=msvc-170)

Returns the classification of a floating-point value

[`_fpieee_flt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpieee-flt?view=msvc-170)

Sets a handler for floating-point exceptions

[`_fpreset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpreset?view=msvc-170)

Resets the floating-point environment

[`frexp`, `frexpf`, `frexpl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/frexp?view=msvc-170)

Gets the mantissa and exponent of a floating-point number

[`_gcvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gcvt?view=msvc-170), [`gcvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/posix-gcvt?view=msvc-170)

Converts a floating-point number to a string

[`_gcvt_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gcvt-s?view=msvc-170)

Secure version of **`_gcvt`**

[`_get_FMA3_enable`, `_set_FMA3_enable`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-fma3-enable-set-fma3-enable?view=msvc-170)

Gets or sets a flag for use of FMA3 instructions on x64

[`hypot`, `hypotf`, `hypotl`, `_hypot`, `_hypotf`, `_hypotl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/hypot-hypotf-hypotl-hypot-hypotf-hypotl?view=msvc-170)

Computes the hypotenuse

[`ilogb`, `ilogbf`, `ilogbl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ilogb-ilogbf-ilogbl2?view=msvc-170)

Computes the integer base-2 exponent

[`imaxabs`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/imaxabs?view=msvc-170)

Computes the absolute value of an integer type

[`imaxdiv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/imaxdiv?view=msvc-170)

Computes the quotient and the remainder of two integer values

[`isfinite`, `_finite`, `_finitef`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/finite-finitef?view=msvc-170)

Determines whether a value is finite

[`isgreater`, `isgreaterequal`, `isless`, `islessequal`, `islessgreater`, `isunordered`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/floating-point-ordering?view=msvc-170)

Compare the order of two floating-point values

[`isinf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isinf?view=msvc-170)

Determines whether a floating-point value is infinite

[`isnan`, `_isnan`, `_isnanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isnan-isnan-isnanf?view=msvc-170)

Tests a floating-point value for NaN

[`isnormal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isnormal?view=msvc-170)

Tests whether a floating-point value is both finite and not subnormal

[`_j0`, `_j1`, `_jn`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/bessel-functions-j0-j1-jn-y0-y1-yn?view=msvc-170)

Computes the Bessel function

[`ldexp`, `ldexpf`, `ldexpl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ldexp?view=msvc-170)

Computes x\*2n

[`lgamma`, `lgammaf`, `lgammal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lgamma-lgammaf-lgammal?view=msvc-170)

Computes the natural logarithm of the absolute value of the gamma function

[`llrint`, `llrintf`, `llrintl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lrint-lrintf-lrintl-llrint-llrintf-llrintl?view=msvc-170)

Rounds a floating-point value to the nearest **`long long`** value

[`llround`, `llroundf`, `llroundl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lround-lroundf-lroundl-llround-llroundf-llroundl?view=msvc-170)

Rounds a floating-point value to the nearest **`long long`** value

[`log`, `logf`, `logl`, `log10`, `log10f`, `log10l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log-logf-log10-log10f?view=msvc-170)

Computes the natural or base-10 logarithm

[`log1p`, `log1pf`, `log1pl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log1p-log1pf-log1pl2?view=msvc-170)

Computes the natural logarithm of 1+x

[`log2`, `log2f`, `log2l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log2-log2f-log2l?view=msvc-170)

Computes the base-2 logarithm

[`logb`, `logbf`, `logbl`, `_logb`, `_logbf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/logb-logbf-logbl-logb-logbf?view=msvc-170)

Returns the exponent of a floating-point value

[`lrint`, `lrintf`, `lrintl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lrint-lrintf-lrintl-llrint-llrintf-llrintl?view=msvc-170)

Rounds a floating-point value to the nearest **`long`** value

[`_lrotl`, `_lrotr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lrotl-lrotr?view=msvc-170)

Rotates an integer value left or right

[`lround`, `lroundf`, `lroundl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lround-lroundf-lroundl-llround-llroundf-llroundl?view=msvc-170)

Rounds a floating-point value to the nearest **`long`** value

[`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170)

The default math error handler

[`__max`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/max?view=msvc-170)

Macro that returns the larger of two values

[`__min`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/min?view=msvc-170)

Macro that returns the smaller of two values

[`modf`, `modff`, `modfl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/modf-modff-modfl?view=msvc-170)

Splits a floating-point value into fractional and integer parts

[`nan`, `nanf`, `nanl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/nan-nanf-nanl?view=msvc-170)

Returns a quiet NaN value

[`nearbyint`, `nearbyintf`, `nearbyintl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/nearbyint-nearbyintf-nearbyintl1?view=msvc-170)

Returns the rounded value

[`nextafter`, `nextafterf`, `nextafterl`, `_nextafter`, `_nextafterf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/nextafter-functions?view=msvc-170)

Returns the next representable floating-point value

[`nexttoward`, `nexttowardf`, `nexttowardl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/nextafter-functions?view=msvc-170)

Returns the next representable floating-point value

[`pow`, `powf`, `powl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/pow-powf-powl?view=msvc-170)

Returns the value of _`x`__`y`_

[`remainder`, `remainderf`, `remainderl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/remainder-remainderf-remainderl?view=msvc-170)

Computes the remainder of the quotient of two floating-point values

[`remquo`, `remquof`, `remquol`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/remquo-remquof-remquol?view=msvc-170)

Computes the remainder of two integer values

[`rint`, `rintf`, `rintl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rint-rintf-rintl?view=msvc-170)

Rounds a floating-point value

[`_rotl`, `_rotl64`, `_rotr`, `_rotr64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rotl-rotl64-rotr-rotr64?view=msvc-170)

Rotates bits in integer types

[`round`, `roundf`, `roundl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/round-roundf-roundl?view=msvc-170)

Rounds a floating-point value

[`_scalb`, `_scalbf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scalb?view=msvc-170)

Scales argument by a power of 2

[`scalbn`, `scalbnf`, `scalbnl`, `scalbln`, `scalblnf`, `scalblnl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scalbn-scalbnf-scalbnl-scalbln-scalblnf-scalblnl?view=msvc-170)

Multiplies a floating-point number by an integral power of `FLT_RADIX`

[`_set_controlfp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-controlfp?view=msvc-170)

Sets the floating-point control word

[`_set_SSE2_enable`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-sse2-enable?view=msvc-170)

Enables or disables SSE2 instructions

[`signbit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/signbit?view=msvc-170)

Tests the sign bit of a floating-point value

[`sin`, `sinf`, `sinl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sin-sinf-sinl?view=msvc-170)

Computes the sine

[`sinh`, `sinhf`, `sinhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sinh-sinhf-sinhl?view=msvc-170)

Computes the hyperbolic sine

[`sqrt`, `sqrtf`, `sqrtl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sqrt-sqrtf-sqrtl?view=msvc-170)

Computes the square root

[`_status87`, `_statusfp`, `_statusfp2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/status87-statusfp-statusfp2?view=msvc-170)

Gets the floating-point status word

[`strtof`, `_strtof_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtof-strtof-l-wcstof-wcstof-l?view=msvc-170)

Converts a string to a **`float`**

[`strtold`, `_strtold_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtold-strtold-l-wcstold-wcstold-l?view=msvc-170)

Converts a string to a **`long double`**

[`tan`, `tanf`, `tanl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tan-tanf-tanl?view=msvc-170)

Computes the tangent

[`tanh`, `tanhf`, `tanhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tanh-tanhf-tanhl?view=msvc-170)

Computes the hyperbolic tangent

[`tgamma`, `tgammaf`, `tgammal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tgamma-tgammaf-tgammal?view=msvc-170)

Computes the gamma function

[`trunc`, `truncf`, `truncl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/trunc-truncf-truncl?view=msvc-170)

Truncates the fractional part

[`_wtof`, `_wtof_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atof-atof-l-wtof-wtof-l?view=msvc-170)

Converts a wide string to a **`double`**

[`_y0`, `_y1`, `_yn`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/bessel-functions-j0-j1-jn-y0-y1-yn?view=msvc-170)

Computes the Bessel function

## See also

[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)  
[Floating-point primitives](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/floating-point-primitives?view=msvc-170)