---
title: "_mbsnbcpy_s, _mbsnbcpy_s_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcpy-s-mbsnbcpy-s-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Copies **n** bytes of a string to a destination string. These versions of [`_mbsnbcpy`, `_mbsnbcpy_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcpy-mbsnbcpy-l?view=msvc-170) have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t _mbsnbcpy_s(
   unsigned char * strDest,
   size_t sizeInBytes,
   const unsigned char * strSource,
   size_t count
);
errno_t _mbsnbcpy_s_l(
   unsigned char * strDest,
   size_t sizeInBytes,
   const unsigned char * strSource,
   size_t count,
   _locale_t locale
);
template <size_t size>
errno_t _mbsnbcpy_s(
   unsigned char (&strDest)[size],
   const unsigned char * strSource,
   size_t count
); // C++ only
template <size_t size>
errno_t _mbsnbcpy_s_l(
   unsigned char (&strDest)[size],
   const unsigned char * strSource,
   size_t count,
   _locale_t locale
); // C++ only
```

### Parameters

_`strDest`_  
Destination for character string to be copied.

_`sizeInBytes`_  
Destination buffer size.

_`strSource`_  
Character string to be copied.

_`count`_  
Number of bytes to be copied.

_`locale`_  
Locale to use.

## Return value

Zero if successful; `EINVAL` if a bad parameter was passed in.

The **`_mbsnbcpy_s`** function copies _`count`_ bytes from _`strSource`_ to _`strDest`_. If _`count`_ exceeds the size of _`strDest`_, either of the input strings is a null pointer, or _`sizeInBytes`_ or _`count`_ is 0, the function invokes the invalid parameter handler as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170) . If execution is allowed to continue, the function returns `EINVAL`. If the source and destination strings overlap, the behavior of **`_mbsnbcpy_s`** is undefined.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of these functions without the `_l` suffix use the current locale for this locale-dependent behavior; the versions with the `_l` suffix are identical except that they use the locale parameter passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

Note

Unlike the non-secure version of this function, **`_mbsnbcpy_s`** does not do any null padding and always null terminates the string.

In C++, using these functions is simplified by template overloads; the overloads can infer buffer length automatically (eliminating the need to specify a size argument) and they can automatically replace older, non-secure functions with their newer, secure counterparts. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

The debug library versions of these functions first fill the buffer with 0xFE. To disable this behavior, use [`_CrtSetDebugFillThreshold`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdebugfillthreshold?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsncpy_s`

`_strncpy_s`

**`_mbsnbcpy_s`**

`_wcsncpy_s`

`_tcsncpy_s_l`

`_strncpy_s_l`

**`_mbsnbcpy_s_l`**

`_wcsncpy_s_l`

## Requirements

Routine

Required header

**`_mbsnbcpy_s`**

<mbstring.h>

**`_mbsnbcpy_s_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`_mbsnbcat`, `_mbsnbcat_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcat-mbsnbcat-l?view=msvc-170)  
[`_mbsnbcmp`, `_mbsnbcmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcmp-mbsnbcmp-l?view=msvc-170)  
[`_strncnt`, `_wcsncnt`, `_mbsnbcnt`, `_mbsnbcnt_l`, `_mbsnccnt`, `_mbsnccnt_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncnt-wcsncnt-mbsnbcnt-mbsnbcnt-l-mbsnccnt-mbsnccnt-l?view=msvc-170)  
[`_mbsnbicmp`, `_mbsnbicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbicmp-mbsnbicmp-l?view=msvc-170)  
[`_mbsnbset`, `_mbsnbset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbset-mbsnbset-l?view=msvc-170)  
[`strncpy`, `_strncpy_l`, `wcsncpy`, `_wcsncpy_l`, `_mbsncpy`, `_mbsncpy_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-strncpy-l-wcsncpy-wcsncpy-l-mbsncpy-mbsncpy-l?view=msvc-170)