---
title: "_fcvt_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fcvt-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a floating-point number to a string. This function is a version of [`_fcvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fcvt?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t _fcvt_s(
   char* buffer,
   size_t sizeInBytes,
   double value,
   int count,
   int *dec,
   int *sign
);
template <size_t size>
errno_t _fcvt_s(
   char (&buffer)[size],
   double value,
   int count,
   int *dec,
   int *sign
); // C++ only
```

### Parameters

_`buffer`_  
The supplied buffer that will hold the result of the conversion.

_`sizeInBytes`_  
The size of the buffer in bytes.

_`value`_  
Number to be converted.

_`count`_  
Number of digits after the decimal point.

_`dec`_  
Pointer to the stored decimal-point position.

_`sign`_  
Pointer to the stored sign indicator.

## Return value

Zero if successful. The return value is an error code if there's a failure. Error codes are defined in `errno.h`. For a listing of these errors, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

When there's an invalid parameter, as listed in the following table, this function invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function sets `errno` to `EINVAL` and returns `EINVAL`.

### Error conditions

_`buffer`_

_`sizeInBytes`_

_`value`_

_`count`_

_`dec`_

_`sign`_

Return

Value in _`buffer`_

`NULL`

any

any

any

any

any

`EINVAL`

Not modified.

Not `NULL` (points to valid memory)

<=0

any

any

any

any

`EINVAL`

Not modified.

any

any

any

any

`NULL`

any

`EINVAL`

Not modified.

any

any

any

any

any

`NULL`

`EINVAL`

Not modified.

## Security Issues

**`_fcvt_s`** might generate an access violation if _`buffer`_ doesn't point to valid memory and isn't `NULL`.

The **`_fcvt_s`** function converts a floating-point number to a null-terminated character string. The _`value`_ parameter is the floating-point number to be converted. **`_fcvt_s`** stores the digits of _`value`_ as a string and appends a null character ('\\0'). The _`count`_ parameter specifies the number of digits to be stored after the decimal point. Excess digits are rounded off to _`count`_ places. If there are fewer than _`count`_ digits of precision, the string is padded with zeros.

Only digits are stored in the string. The position of the decimal point and the sign of _`value`_ can be obtained from _`dec`_ and _`sign`_ after the call. The _`dec`_ parameter points to an integer value; this integer value gives the position of the decimal point with respect to the beginning of the string. A zero or negative integer value indicates that the decimal point lies to the left of the first digit. The parameter _`sign`_ points to an integer indicating the sign of _`value`_. The integer is set to 0 if _`value`_ is positive and is set to a nonzero number if _`value`_ is negative.

A buffer of length `_CVTBUFSIZE` is sufficient for any floating point value.

The difference between `_ecvt_s` and **`_fcvt_s`** is in the interpretation of the _`count`_ parameter. `_ecvt_s` interprets _`count`_ as the total number of digits in the output string, and **`_fcvt_s`** interprets _`count`_ as the number of digits after the decimal point.

In C++, using this function is simplified by a template overload; the overload can infer buffer length automatically, eliminating the need to specify a size argument. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

The debug version of this function first fills the buffer with 0xFE. To disable this behavior, use [`_CrtSetDebugFillThreshold`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdebugfillthreshold?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

Optional header

**`_fcvt_s`**

<stdlib.h>

<errno.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

**Libraries:** All versions of the [C runtime libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// fcvt_s.c
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>

int main()
{
    char * buf = 0;
    int decimal;
    int sign;
    int err;

    buf = (char*) malloc(_CVTBUFSIZE);
    err = _fcvt_s(buf, _CVTBUFSIZE, 1.2, 5, &decimal, &sign);

    if (err != 0)
    {
        printf("_fcvt_s failed with error code %d\n", err);
        exit(1);
    }

    printf("Converted value: %s\n", buf);
}
```

```
Converted value: 120000
```

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`atof`, `_atof_l`, `_wtof`, `_wtof_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atof-atof-l-wtof-wtof-l?view=msvc-170)  
[`_ecvt_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ecvt-s?view=msvc-170)  
[`_gcvt_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gcvt-s?view=msvc-170)  
[`_fcvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fcvt?view=msvc-170)