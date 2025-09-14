---
title: "C complex math support"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/complex-math-support?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The Microsoft C Runtime library (CRT) provides complex math library functions, including all of the ones required by ISO C99. The compiler doesn't directly support a **`complex`** or **`_Complex`** keyword, therefore the Microsoft implementation uses structure types to represent complex numbers.

These functions are implemented to balance performance with correctness. Because producing the correctly rounded result may be prohibitively expensive, these functions are designed to efficiently produce a close approximation to the correctly rounded result. In most cases, the result produced is within +/-1 unit of least precision (ULP) of the correctly rounded result, though there may be cases where there's greater inaccuracy.

The complex math routines rely on the floating point math library functions for their implementation. These functions have different implementations for different CPU architectures. For example, the 32-bit x86 CRT may have a different implementation than the 64-bit x64 CRT. In addition, some of the functions may have multiple implementations for a given CPU architecture. The most efficient implementation is selected dynamically at run-time depending on the instruction sets supported by the CPU. For example, in the 32-bit x86 CRT, some functions have both an x87 implementation and an SSE2 implementation. When running on a CPU that supports SSE2, the faster SSE2 implementation is used. When running on a CPU that doesn't support SSE2, the slower x87 implementation is used. Because different implementations of the math library functions may use different CPU instructions and different algorithms to produce their results, the functions may produce different results across CPUs. In most cases, the results are within +/-1 ULP of the correctly rounded result, but the actual results may vary across CPUs.

## Types used in complex math

The Microsoft implementation of the `complex.h` header defines these types as equivalents for the C99 standard native complex types:

Standard type

Microsoft type

**`float complex`** or **`float _Complex`**

**`_Fcomplex`**

**`double complex`** or **`double _Complex`**

**`_Dcomplex`**

**`long double complex`** or **`long double _Complex`**

**`_Lcomplex`**

The `math.h` header defines a separate type, **`struct _complex`**, used for the [`_cabs`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cabs?view=msvc-170) function. The **`struct _complex`** type isn't used by the equivalent complex math functions [`cabs`, `cabsf`, `cabsl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cabs-cabsf-cabsl?view=msvc-170).

## Complex constants and macros

**`I`** is defined as the complex type **`_Fcomplex`** initialized by `{ 0.0f, 1.0f }`.

## Trigonometric functions

Function

Description

[`cacos`, `cacosf`, `cacosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cacos-cacosf-cacosl?view=msvc-170)

Compute the complex arc cosine of a complex number

[`casin`, `casinf`, `casinl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/casin-casinf-casinl?view=msvc-170)

Compute the complex arc sine of a complex number

[`catan`, `catanf`, `catanl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/catan-catanf-catanl?view=msvc-170)

Compute the complex arc tangent of a complex number

[`ccos`, `ccosf`, `ccosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ccos-ccosf-ccosl?view=msvc-170)

Compute the complex cosine of a complex number

[`csin`, `csinf`, `csinl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/csin-csinf-csinl?view=msvc-170)

Compute the complex sine of a complex number

[`ctan`, `ctanf`, `ctanl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctan-ctanf-ctanl?view=msvc-170)

Compute the complex tangent of a complex number

## Hyperbolic functions

Function

Description

[`cacosh`, `cacoshf`, `cacoshl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cacosh-cacoshf-cacoshl?view=msvc-170)

Compute the complex arc hyperbolic cosine of a complex number

[`casinh`, `casinhf`, `casinhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/casinh-casinhf-casinhl?view=msvc-170)

Compute the complex arc hyperbolic sine of a complex number

[`catanh`, `catanhf`, `catanhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/catanh-catanhf-catanhl?view=msvc-170)

Compute the complex arc hyperbolic tangent of a complex number

[`ccosh`, `ccoshf`, `ccoshl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ccosh-ccoshf-ccoshl?view=msvc-170)

Compute the complex hyperbolic cosine of a complex number

[`csinh`, `csinhf`, `csinhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/csinh-csinhf-csinhl?view=msvc-170)

Compute the complex hyperbolic sine of a complex number

[`ctanh`, `ctanhf`, `ctanhl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctanh-ctanhf-ctanhl?view=msvc-170)

Compute the complex hyperbolic tangent of a complex number

## Exponential and logarithmic functions

Function

Description

[`cexp`, `cexpf`, `cexpl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cexp-cexpf-cexpl?view=msvc-170)

Compute the complex base-_e_ exponential of a complex number

[`clog`, `clogf`, `clogl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clog-clogf-clogl?view=msvc-170)

Compute the complex natural (base-_e_) logarithm of a complex number

[`clog10`, `clog10f`, `clog10l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clog10-clog10f-clog10l?view=msvc-170)

Compute the complex base-10 logarithm of a complex number

## Power and absolute-value functions

Function

Description

[`cabs`, `cabsf`, `cabsl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cabs-cabsf-cabsl?view=msvc-170)

Compute the complex absolute value (also called the norm, modulus, or magnitude) of a complex number

[`cpow`, `cpowf`, `cpowl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cpow-cpowf-cpowl?view=msvc-170)

Compute the complex power function

[`csqrt`, `csqrtf`, `csqrtl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/csqrt-csqrtf-csqrtl?view=msvc-170)

Compute the complex square root of a complex number

## Manipulation functions

Function

Description

[`_Cbuild`, `_FCbuild`, `_LCbuild`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cbuild-fcbuild-lcbuild?view=msvc-170)

Construct a complex number from real and imaginary parts

[`carg`, `cargf`, `cargl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/carg-cargf-cargl?view=msvc-170)

Compute the argument (also called the phase angle) of a complex number

[`cimag`, `cimagf`, `cimagl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cimag-cimagf-cimagl?view=msvc-170)

Compute the imaginary part of a complex number

[`conj`, `conjf`, `conjl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/conj-conjf-conjl?view=msvc-170)

Compute the complex conjugate of a complex number

[`cproj`, `cprojf`, `cprojl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cproj-cprojf-cprojl?view=msvc-170)

Compute a projection of a complex number onto the Riemann sphere

[`creal`, `crealf`, `creall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creal-crealf-creall?view=msvc-170)

Compute the real part of a complex number

[`norm`, `normf`, `norml`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/norm-normf-norml1?view=msvc-170)

Compute the squared magnitude of a complex number

## Operation functions

Because complex numbers aren't a native type in the Microsoft compiler, the standard arithmetic operators aren't defined on complex types. For convenience, these complex math library functions are provided to enable limited manipulation of complex numbers in user code:

Function

Description

[`_Cmulcc`, `_FCmulcc`, `_LCmulcc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cmulcc-fcmulcc-lcmulcc?view=msvc-170)

Multiply two complex numbers

[`_Cmulcr`, `_FCmulcr`, `_LCmulcr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cmulcr-fcmulcr-lcmulcr?view=msvc-170)

Multiply a complex and a floating-point number

## See also

[Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170)  
[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)