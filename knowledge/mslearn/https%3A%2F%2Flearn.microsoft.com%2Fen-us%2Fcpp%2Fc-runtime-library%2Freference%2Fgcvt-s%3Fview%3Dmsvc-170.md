---
title: "_gcvt_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gcvt-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a floating-point value to a string. This function is a version of [`_gcvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gcvt?view=msvc-170) with security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t _gcvt_s(
   char *buffer,
   size_t sizeInBytes,
   double value,
   int digits
);
template <size_t cchStr>
errno_t _gcvt_s(
   char (&buffer)[cchStr],
   double value,
   int digits
); // C++ only
```

### Parameters

_`buffer`_  
Buffer to store the result of the conversion.

_`sizeInBytes`_  
Size of the buffer.

_`value`_  
Value to be converted.

_`digits`_  
Number of significant digits stored.

## Return value

Zero if successful. If a failure occurs due to an invalid parameter (see the following table for invalid values), the invalid parameter handler is invoked as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, an error code is returned. Error codes are defined in Errno.h. For a listing of these errors, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

### Error conditions

_`buffer`_

_`sizeInBytes`_

_`value`_

_`digits`_

Return

Value in _`buffer`_

`NULL`

any

any

any

`EINVAL`

Not modified.

Not `NULL` (points to valid memory)

zero

any

any

`EINVAL`

Not modified.

Not `NULL` (points to valid memory)

any

any

\>= _`sizeInBytes`_

`EINVAL`

Not modified.

**Security Issues**

**`_gcvt_s`** can generate an access violation if _`buffer`_ doesn't point to valid memory and isn't `NULL`.

The **`_gcvt_s`** function converts a floating-point _`value`_ to a character string (which includes a decimal point and a possible sign byte) and stores the string in _`buffer`_. _`buffer`_ should be large enough to accommodate the converted value plus a terminating null character, which is appended automatically. A buffer of length `_CVTBUFSIZE` is sufficient for any floating point value. If a buffer size of _`digits`_ + 1 is used, the function won't overwrite the end of the buffer, so be sure to supply a sufficient buffer for this operation. **`_gcvt_s`** attempts to produce _`digits`_ digits in decimal format. If it can't, it produces _`digits`_ digits in exponential format. Trailing zeros can be suppressed in the conversion.

In C++, using this function is simplified by a template overload; the overload can infer buffer length automatically, eliminating the need to specify a size argument. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

The debug version of this function first fills the buffer with 0xFE. To disable this behavior, use [`_CrtSetDebugFillThreshold`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdebugfillthreshold?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

Optional header

**`_gcvt_s`**

<stdlib.h>

<error.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_gcvt_s.c
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>

int main()
{
    char buf[_CVTBUFSIZE];
    int decimal;
    int sign;
    int err;

    err = _gcvt_s(buf, _CVTBUFSIZE, 1.2, 5);

    if (err != 0)
    {
        printf("_gcvt_s failed with error code %d\n", err);
        exit(1);
    }

    printf("Converted value: %s\n", buf);
}
```

```
Converted value: 1.2
```

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`atof`, `_atof_l`, `_wtof`, `_wtof_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atof-atof-l-wtof-wtof-l?view=msvc-170)  
[`_ecvt_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ecvt-s?view=msvc-170)  
[`_fcvt_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fcvt-s?view=msvc-170)  
[`_gcvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gcvt?view=msvc-170)