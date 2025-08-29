---
title: "Floating-point primitives"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/floating-point-primitives?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Microsoft-specific primitive functions that are used to implement some standard C runtime library (CRT) floating-point functions. They're documented here for completeness, but aren't recommended for use. Some of these functions are noted as unused, because they're known to have issues in precision, exception handling, and conformance to IEEE-754 behavior. They exist in the library only for backward compatibility. For correct behavior, portability, and adherence to standards, prefer the standard floating-point functions over these functions.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## `_dclass`, `_ldclass`, `_fdclass`

### Syntax

```
short __cdecl _dclass(double x);
short __cdecl _ldclass(long double x);
short __cdecl _fdclass(float x);
```

### Parameters

_`x`_  
Floating-point function argument.

These floating-point primitives implement the C versions of the CRT macro [`fpclassify`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclassify?view=msvc-170) for floating-point types. The classification of the argument _`x`_ is returned as one of these constants, defined in math.h:

Value

Description

`FP_NAN`

A quiet, signaling, or indeterminate NaN

`FP_INFINITE`

A positive or negative infinity

`FP_NORMAL`

A positive or negative normalized non-zero value

`FP_SUBNORMAL`

A positive or negative subnormal (denormalized) value

`FP_ZERO`

A positive or negative zero value

For more detail, you can use the Microsoft-specific [`_fpclass`, `_fpclassf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclass-fpclassf?view=msvc-170) functions. Use the [`fpclassify`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclassify?view=msvc-170) macro or function for portability.

## `_dsign`, `_ldsign`, `_fdsign`

### Syntax

```
int __cdecl _dsign(double x);
int __cdecl _ldsign(long double x);
int __cdecl _fdsign(float x);
```

### Parameters

_`x`_  
Floating-point function argument.

These floating-point primitives implement the [`signbit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/signbit?view=msvc-170) macro or function in the CRT. They return a non-zero value if the sign bit is set in the significand (mantissa) of the argument _`x`_. Otherwise, they return 0 if the sign bit isn't set.

## \_dpcomp, \_ldpcomp, \_fdpcomp

### Syntax

```
int __cdecl _dpcomp(double x, double y);
int __cdecl _ldpcomp(long double x, long double y);
int __cdecl _fdpcomp(float x, float y);
```

### Parameters

_`x`_, _`y`_  
Floating-point function arguments.

These floating-point primitives take two arguments, _`x`_ and _`y`_, and return a value that shows their ordering relationship, expressed as the bitwise or of these constants, defined in math.h:

Value

Description

`_FP_LT`

_`x`_ can be considered less than _`y`_

`_FP_EQ`

_`x`_ can be considered equal to _`y`_

`_FP_GT`

_`x`_ can be considered greater than _`y`_

These primitives implement the [`isgreater`, `isgreaterequal`, `isless`, `islessequal`, `islessgreater`, and `isunordered`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/floating-point-ordering?view=msvc-170) macros and functions in the CRT.

## \_dtest, \_ldtest, \_fdtest

### Syntax

```
short __cdecl _dtest(double* px);
short __cdecl _ldtest(long double* px);
short __cdecl _fdtest(float* px);
```

### Parameters

_`px`_  
Pointer to a floating-point argument.

These floating-point primitives implement the C++ versions of the CRT function [`fpclassify`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclassify?view=msvc-170) for floating-point types. The argument _`x`_ is evaluated and the classification is returned as one of these constants, defined in math.h:

Value

Description

`FP_NAN`

A quiet, signaling, or indeterminate NaN

`FP_INFINITE`

A positive or negative infinity

`FP_NORMAL`

A positive or negative normalized non-zero value

`FP_SUBNORMAL`

A positive or negative subnormal (denormalized) value

`FP_ZERO`

A positive or negative zero value

For more detail, you can use the Microsoft-specific [`_fpclass`, `_fpclassf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclass-fpclassf?view=msvc-170) functions. Use the [`fpclassify`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclassify?view=msvc-170) function for portability.

## \_d\_int, \_ld\_int, \_fd\_int

### Syntax

```
short __cdecl _d_int(double* px, short exp);
short __cdecl _ld_int(long double* px, short exp);
short __cdecl _fd_int(float* px, short exp);
```

### Parameters

_`px`_  
Pointer to a floating-point argument.

_`exp`_  
An exponent as an integral type.

These floating-point primitives take a pointer to a floating-point value _`px`_ and an exponent value _`exp`_, and remove the fractional part of the floating-point value below the given exponent, if possible. The value returned is the result of `fpclassify` on the input value in _`px`_ if it's a NaN or infinity, and on the output value in _`px`_ otherwise.

## \_dscale, \_ldscale, \_fdscale

### Syntax

```
short __cdecl _dscale(double* px, long exp);
short __cdecl _ldscale(long double* px, long exp);
short __cdecl _fdscale(float* px, long exp);
```

### Parameters

_`px`_  
Pointer to a floating-point argument.

_`exp`_  
An exponent as an integral type.

These floating-point primitives take a pointer to a floating-point value _`px`_ and an exponent value _`exp`_, and scale the value in _`px`_ by 2_`exp`_, if possible. The value returned is the result of `fpclassify` on the input value in _`px`_ if it's a NaN or infinity, and on the output value in _`px`_ otherwise. For portability, prefer the [`ldexp`, `ldexpf`, `ldexpl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ldexp?view=msvc-170) functions.

## \_dunscale, \_ldunscale, \_fdunscale

### Syntax

```
short __cdecl _dunscale(short* pexp, double* px);
short __cdecl _ldunscale(short* pexp, long double* px);
short __cdecl _fdunscale(short* pexp, float* px);
```

### Parameters

_`pexp`_  
A pointer to an exponent as an integral type.

_`px`_  
Pointer to a floating-point argument.

These floating-point primitives break down the floating-point value pointed at by _`px`_ into a significand (mantissa) and an exponent, if possible. The significand is scaled such that the absolute value is greater than or equal to 0.5 and less than 1.0. The exponent is the value _`n`_, where the original floating-point value is equal to the scaled significand times 2n. This integer exponent _`n`_ is stored at the location pointed to by _`pexp`_. The value returned is the result of `fpclassify` on the input value in _`px`_ if it's a NaN or infinity, and on the output value otherwise. For portability, prefer the [`frexp`, `frexpf`, `frexpl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/frexp?view=msvc-170) functions.

## \_dexp, \_ldexp, \_fdexp

### Syntax

```
short __cdecl _dexp(double* px, double y, long exp);
short __cdecl _ldexp(long double* px, long double y, long exp);
short __cdecl _fdexp(float* px, float y, long exp);
```

### Parameters

_`y`_  
Floating-point function argument.

_`px`_  
Pointer to a floating-point argument.

_`exp`_  
An exponent as an integral type.

These floating-point primitives construct a floating-point value in the location pointed at by _`px`_ equal to _`y`_ \* 2exp. The value returned is the result of `fpclassify` on the input value in _`y`_ if it's a NaN or infinity, and on the output value in _`px`_ otherwise. For portability, prefer the [`ldexp`, `ldexpf`, `ldexpl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ldexp?view=msvc-170) functions.

## \_dnorm, \_fdnorm

### Syntax

```
short __cdecl _dnorm(unsigned short* ps);
short __cdecl _fdnorm(unsigned short* ps);
```

### Parameters

_`ps`_  
Pointer to the bitwise representation of a floating-point value expressed as an array of **`unsigned short`**.

These floating-point primitives normalize the fractional part of an underflowed floating-point value and adjust the _characteristic_, or biased exponent, to match. The value is passed as the bitwise representation of the floating-point type converted to an array of **`unsigned short`** through the `_double_val`, `_ldouble_val`, or `_float_val` type-punning union declared in math.h. The return value is the result of `fpclassify` on the input floating-point value if it's a NaN or infinity, and on the output value otherwise.

## \_dpoly, \_ldpoly, \_fdpoly

### Syntax

```
double __cdecl _dpoly(double x, double const* table, int n);
long double __cdecl _ldpoly(long double x, long double const* table, int n);
float __cdecl _fdpoly(float x, _float const* table, int n);
```

### Parameters

_`x`_  
Floating-point function argument.

_`table`_  
Pointer to a table of constant coefficients for a polynomial.

_`n`_  
Order of the polynomial to evaluate.

These floating-point primitives return the evaluation of _`x`_ in the polynomial of order _`n`_ whose coefficients are represented by the corresponding constant values in _`table`_. For example, if _`table[0]`_ = 3.0, _`table[1]`_ = 4.0, _`table[2]`_ = 5.0, and _`n`_ = 2, it represents the polynomial 5.0x2 + 4.0x + 3.0. If this polynomial is evaluated for _`x`_ of 2.0, the result is 31.0. These functions aren't used internally.

## \_dlog, \_dlog, \_dlog

### Syntax

```
double __cdecl _dlog(double x, int base_flag);
long double __cdecl _ldlog(long double x, int base_flag);
float __cdecl _fdlog(float x, int base_flag);
```

### Parameters

_`x`_  
Floating-point function argument.

_`base_flag`_  
Flag that controls the base to use, 0 for base _e_ and non-zero for base 10.

These floating-point primitives return the natural log of _`x`_ (ln(x) or log_e_(x)), when _`base_flag`_ is 0. They return the log base 10 of _`x`_, or log10(x), when _`base_flag`_ is non-zero. These functions aren't used internally. For portability, prefer the functions [`log`, `logf`, `logl`, `log10`, `log10f`, and `log10l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log-logf-log10-log10f?view=msvc-170).

## \_dsin, \_ldsin, \_fdsin

### Syntax

```
double __cdecl _dsin(double x, unsigned int quadrant);
long double __cdecl _ldsin(long double x, unsigned int quadrant);
float __cdecl _fdsin(float x, unsigned int quadrant);
```

### Parameters

_`x`_  
Floating-point function argument.

_`quadrant`_  
Quadrant offset of 0, 1, 2, or 3 to use to produce `sin`, `cos`, `-sin`, and `-cos` results.

These floating-point primitives return the sine of _`x`_ offset by the _`quadrant`_ modulo 4. Effectively, they return the sine, cosine, -sine, and -cosine of _`x`_ when _`quadrant`_ modulo 4 is 0, 1, 2, or 3, respectively. These functions aren't used internally. For portability, prefer the [`sin`, `sinf`, `sinl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sin-sinf-sinl?view=msvc-170), [`cos`, `cosf`, `cosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cos-cosf-cosl?view=msvc-170) functions.

## Requirements

Header: <math.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`fpclassify`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclassify?view=msvc-170)  
[`_fpclass`, `_fpclassf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclass-fpclassf?view=msvc-170)  
[`isfinite`, `_finite`, `_finitef`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/finite-finitef?view=msvc-170)  
[`isinf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isinf?view=msvc-170)  
[`isnan`, `_isnan`, `_isnanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isnan-isnan-isnanf?view=msvc-170)  
[`isnormal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isnormal?view=msvc-170)  
[`cos`, `cosf`, `cosl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cos-cosf-cosl?view=msvc-170)  
[`frexp`, `frexpf`, `frexpl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/frexp?view=msvc-170)  
[`ldexp`, `ldexpf`, `ldexpl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ldexp?view=msvc-170)  
[`log`, `logf`, `logl`, `log10`, `log10f`, `log10l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log-logf-log10-log10f?view=msvc-170)  
[`sin`, `sinf`, `sinl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sin-sinf-sinl?view=msvc-170)