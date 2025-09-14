---
title: "_cgets_s, _cgetws_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cgets-s-cgetws-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets a character string from the console. These versions of [`_cgets` and `_cgetws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/cgets-cgetws?view=msvc-170) have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t _cgets_s(
   char *buffer,
   size_t numberOfElements,
   size_t *pSizeRead
);
errno_t _cgetws_s(
   wchar_t *buffer,
   size_t numberOfElements,
   size_t *pSizeRead
);
template <size_t size>
errno_t _cgets_s(
   char (&buffer)[size],
   size_t *pSizeRead
); // C++ only
template <size_t size>
errno_t _cgetws_s(
   wchar_t (&buffer)[size],
   size_t *pSizeRead
); // C++ only
```

### Parameters

_`buffer`_  
Storage location for data.

_`numberOfElements`_  
The size of the buffer in single-byte or wide characters, which is also the maximum number of characters to be read.

_`pSizeRead`_  
The number of characters actually read.

## Return value

The return value is zero if successful; otherwise, an error code if a failure occurs.

### Error conditions

_`buffer`_

_`numberOfElements`_

_`pSizeRead`_

Return

Contents of _`buffer`_

`NULL`

any

any

`EINVAL`

n/a

not `NULL`

zero

any

`EINVAL`

not modified

not `NULL`

any

`NULL`

`EINVAL`

zero-length string

**`_cgets_s`** and **`_cgetws_s`** read a string from the console and copy the string (with a null terminator) into _`buffer`_. **`_cgetws_s`** is the wide character version of the function; other than the character size, the behavior of these two functions is identical. The maximum size of the string to be read is passed in as the _`numberOfElements`_ parameter. This size should include an extra character for the terminating null. The actual number of characters read is placed in _`pSizeRead`_.

If an error occurs during the operation or in the validating of the parameters, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL`, and `EINVAL` is returned.

In C++, the use of these functions is simplified by template overloads. The overloads can infer buffer length automatically, which eliminates the need to specify a size argument. They can also automatically replace older, less-secure functions with their newer, more secure counterparts. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

The debug library versions of these functions first fill the buffer with 0xFE. To disable this behavior, use [`_CrtSetDebugFillThreshold`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdebugfillthreshold?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_cgetts_s`

**`_cgets_s`**

**`_cgets_s`**

**`_cgetws_s`**

## Requirements

Routine

Required header

**`_cgets_s`**

<conio.h>

**`_cgetws_s`**

<conio.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Console and port I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/console-and-port-i-o?view=msvc-170)  
[`_getch`, `_getwch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getch-getwch?view=msvc-170)