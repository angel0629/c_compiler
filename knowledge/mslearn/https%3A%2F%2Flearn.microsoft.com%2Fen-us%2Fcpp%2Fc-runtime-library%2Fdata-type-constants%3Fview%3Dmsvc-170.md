---
title: "Data Type Constants"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-type-constants?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Data type constants are implementation-dependent ranges of values allowed for integral and floating-point data types.

## Integral type constants

These constants give the ranges for the integral data types. To use these constants, include the limits.h header in your source file:

```
#include <limits.h>
```

Note

The [`/J`](https://learn.microsoft.com/en-us/cpp/build/reference/j-default-char-type-is-unsigned?view=msvc-170) compiler option changes the default **`char`** type from **`signed char`** to **`unsigned char`**.

Constant

Value

Description

`CHAR_BIT`

8

Number of bits in a **`char`**

`SCHAR_MIN`

(-128)

Minimum **`signed char`** value

`SCHAR_MAX`

127

Maximum **`signed char`** value

`UCHAR_MAX`

255 (0xff)

Maximum **`unsigned char`** value

`CHAR_MIN`

(-128) (0 if **`/J`** option used)

Minimum **`char`** value

`CHAR_MAX`

127 (255 if **`/J`** option used)

Maximum **`char`** value

`MB_LEN_MAX`

5

Maximum number of bytes in multibyte **`char`**

`SHRT_MIN`

\-32768

Minimum **`signed short`** value

`SHRT_MAX`

32767

Maximum **`signed short`** value

`USHRT_MAX`

65535 (0xffff)

Maximum **`unsigned short`** value

`INT_MIN`

(-2147483647 - 1)

Minimum **`signed int`** value

`INT_MAX`

2147483647

Maximum **`signed int`** value

`UINT_MAX`

4294967295 (0xffffffff)

Maximum **`unsigned int`** value

`LONG_MIN`

(-2147483647L - 1)

Minimum **`signed long`** value

`LONG_MAX`

2147483647L

Maximum **`signed long`** value

`ULONG_MAX`

4294967295UL (0xfffffffful)

Maximum **`unsigned long`** value

`LLONG_MIN`

(-9223372036854775807LL - 1)

Minimum **`signed long long`** or **`__int64`** value

`LLONG_MAX`

9223372036854775807LL

Maximum **`signed long long`** or **`__int64`** value

`ULLONG_MAX`

0xffffffffffffffffull

Maximum **`unsigned long long`** value

`_I8_MIN`

(-127i8 - 1)

Minimum signed 8-bit value

`_I8_MAX`

127i8

Maximum signed 8-bit value

`_UI8_MAX`

0xffui8

Maximum unsigned 8-bit value

`_I16_MIN`

(-32767i16 - 1)

Minimum signed 16-bit value

`_I16_MAX`

32767i16

Maximum signed 16-bit value

`_UI16_MAX`

0xffffui16

Maximum unsigned 16-bit value

`_I32_MIN`

(-2147483647i32 - 1)

Minimum signed 32-bit value

`_I32_MAX`

2147483647i32

Maximum signed 32-bit value

`_UI32_MAX`

0xffffffffui32

Maximum unsigned 32-bit value

`_I64_MIN`

(-9223372036854775807 - 1)

Minimum signed 64-bit value

`_I64_MAX`

9223372036854775807

Maximum signed 64-bit value

`_UI64_MAX`

0xffffffffffffffffui64

Maximum unsigned 64-bit value

`_I128_MIN`

(-170141183460469231731687303715884105727i128 - 1)

Minimum signed 128-bit value

`_I128_MAX`

170141183460469231731687303715884105727i128

Maximum signed 128-bit value

`_UI128_MAX`

0xffffffffffffffffffffffffffffffffui128

Maximum unsigned 128-bit value

`SIZE_MAX`

same as `_UI64_MAX` if `_WIN64` is defined, or `UINT_MAX`

Maximum native integer size

`RSIZE_MAX`

same as (`SIZE_MAX` >> 1)

Maximum secure library integer size

## Floating-point type constants

The following constants give the range and other characteristics of the **`long double`**, **`double`** and **`float`** data types. To use these constants, include the float.h header in your source file:

```
#include <float.h>
```

Constant

Value

Description

`DBL_DECIMAL_DIG`

17

\# of decimal digits of rounding precision

`DBL_DIG`

15

\# of decimal digits of precision

`DBL_EPSILON`

2.2204460492503131e-016

Smallest such that 1.0 + `DBL_EPSILON` != 1.0

`DBL_HAS_SUBNORM`

1

Type supports subnormal (denormal) numbers

`DBL_MANT_DIG`

53

\# of bits in significand (mantissa)

`DBL_MAX`

1.7976931348623158e+308

Maximum value

`DBL_MAX_10_EXP`

308

Maximum decimal exponent

`DBL_MAX_EXP`

1024

Maximum binary exponent

`DBL_MIN`

2.2250738585072014e-308

Minimum normalized positive value

`DBL_MIN_10_EXP`

(-307)

Minimum decimal exponent

`DBL_MIN_EXP`

(-1021)

Minimum binary exponent

`_DBL_RADIX`

2

Exponent radix

`DBL_TRUE_MIN`

4.9406564584124654e-324

Minimum positive subnormal value

`FLT_DECIMAL_DIG`

9

Number of decimal digits of rounding precision

`FLT_DIG`

6

Number of decimal digits of precision

`FLT_EPSILON`

1.192092896e-07F

Smallest such that 1.0 + `FLT_EPSILON` != 1.0

`FLT_HAS_SUBNORM`

1

Type supports subnormal (denormal) numbers

`FLT_MANT_DIG`

24

Number of bits in significand (mantissa)

`FLT_MAX`

3.402823466e+38F

Maximum value

`FLT_MAX_10_EXP`

38

Maximum decimal exponent

`FLT_MAX_EXP`

128

Maximum binary exponent

`FLT_MIN`

1.175494351e-38F

Minimum normalized positive value

`FLT_MIN_10_EXP`

(-37)

Minimum decimal exponent

`FLT_MIN_EXP`

(-125)

Minimum binary exponent

`FLT_RADIX`

2

Exponent radix

`FLT_TRUE_MIN`

1.401298464e-45F

Minimum positive subnormal value

`LDBL_DIG`

15

\# of decimal digits of precision

`LDBL_EPSILON`

2.2204460492503131e-016

Smallest such that 1.0 + `LDBL_EPSILON` != 1.0

`LDBL_HAS_SUBNORM`

1

Type supports subnormal (denormal) numbers

`LDBL_MANT_DIG`

53

\# of bits in significand (mantissa)

`LDBL_MAX`

1.7976931348623158e+308

Maximum value

`LDBL_MAX_10_EXP`

308

Maximum decimal exponent

`LDBL_MAX_EXP`

1024

Maximum binary exponent

`LDBL_MIN`

2.2250738585072014e-308

Minimum normalized positive value

`LDBL_MIN_10_EXP`

(-307)

Minimum decimal exponent

`LDBL_MIN_EXP`

(-1021)

Minimum binary exponent

`_LDBL_RADIX`

2

Exponent radix

`LDBL_TRUE_MIN`

4.9406564584124654e-324

Minimum positive subnormal value

`DECIMAL_DIG`

same as `DBL_DECIMAL_DIG`

Default (double) decimal digits of rounding precision

## See also

[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)