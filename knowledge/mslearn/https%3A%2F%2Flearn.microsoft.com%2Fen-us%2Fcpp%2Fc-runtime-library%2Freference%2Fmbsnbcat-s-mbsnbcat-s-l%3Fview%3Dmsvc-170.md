---
title: "`_mbsnbcat_s`, `_mbsnbcat_s_l`"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcat-s-mbsnbcat-s-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Appends to a multibyte character string, at most, the first **n** bytes of another multibyte-character string. These functions are versions of [`_mbsnbcat`, `_mbsnbcat_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcat-mbsnbcat-l?view=msvc-170) that have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t _mbsnbcat_s(
   unsigned char *dest,
   size_t sizeInBytes,
   const unsigned char *src,
   size_t count
);
errno_t _mbsnbcat_s_l(
   unsigned char *dest,
   size_t sizeInBytes,
   const unsigned char *src,
   size_t count,
   _locale_t locale
);
template <size_t size>
errno_t _mbsnbcat_s(
   unsigned char (&dest)[size],
   const unsigned char *src,
   size_t count
); // C++ only
template <size_t size>
errno_t _mbsnbcat_s_l(
   unsigned char (&dest)[size],
   const unsigned char *src,
   size_t count,
   _locale_t locale
); // C++ only
```

### Parameters

_`dest`_  
Null-terminated multibyte-character destination string.

_`sizeInBytes`_  
Size of the _`dest`_ buffer in bytes.

_`src`_  
Null-terminated multibyte-character source string.

_`count`_  
Number of bytes from _`src`_ to append to _`dest`_.

_`locale`_  
Locale to use.

## Return value

Zero if successful; otherwise, an error code.

### Error conditions

**`dest`**

_`sizeInBytes`_

_`src`_

Return value

`NULL`

any

any

`EINVAL`

Any

<= 0

any

`EINVAL`

Any

any

`NULL`

`EINVAL`

If any of the error conditions occurs, the function generates an invalid parameter error, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If the error is handled, the function returns `EINVAL` and sets `errno` to `EINVAL`.

The **`_mbsnbcat_s`** function appends to _`dest`_, at most, the first _`count`_ bytes of _`src`_. If the byte that immediately precedes the null character in _`dest`_ is a lead byte, it's overwritten by the initial byte of _`src`_. Otherwise, the initial byte of _`src`_ overwrites the terminating null character of _`dest`_. If a null byte appears in _`src`_ before _`count`_ bytes are appended, **`_mbsnbcat_s`** appends all bytes from _`src`_, up to the null character. If _`count`_ is greater than the length of _`src`_, the length of _`src`_ is used in place of _`count`_. The resulting string is terminated by a null character. If copying takes place between strings that overlap, the behavior is undefined.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of these functions are identical, except that the ones that don't have the **`_l`** suffix use the current locale and the ones that do have the **`_l`** suffix instead use the locale parameter that's passed in. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

In C++, the use of these functions is simplified by template overloads. The overloads can infer buffer length automatically, which eliminates the need to specify a size argument, and they can automatically use the newer, more secure functions to replace older, less-secure functions. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

The debug library versions of these functions first fill the buffer with 0xFE. To disable this behavior, use [`_CrtSetDebugFillThreshold`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdebugfillthreshold?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`Tchar.h` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsncat_s`

[`strncat_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-s-strncat-s-l-wcsncat-s-wcsncat-s-l-mbsncat-s-mbsncat-s-l?view=msvc-170)

**`_mbsnbcat_s`**

[`wcsncat_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-s-strncat-s-l-wcsncat-s-wcsncat-s-l-mbsncat-s-mbsncat-s-l?view=msvc-170)

`_tcsncat_s_l`

**`_strncat_s_l`**

**`_mbsnbcat_s_l`**

**`_wcsncat_s_l`**

## Requirements

Routine

Required header

**`_mbsnbcat_s`**

<mbstring.h>

**`_mbsnbcat_s_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`_mbsnbcmp`, `_mbsnbcmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcmp-mbsnbcmp-l?view=msvc-170)  
[`_strncnt`, `_wcsncnt`, `_mbsnbcnt`, `_mbsnbcnt_l`, `_mbsnccnt`, `_mbsnccnt_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncnt-wcsncnt-mbsnbcnt-mbsnbcnt-l-mbsnccnt-mbsnccnt-l?view=msvc-170)  
[`_mbsnbcpy`, `_mbsnbcpy_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcpy-mbsnbcpy-l?view=msvc-170)  
[`_mbsnbcpy_s`, `_mbsnbcpy_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcpy-s-mbsnbcpy-s-l?view=msvc-170)  
[`_mbsnbset`, `_mbsnbset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbset-mbsnbset-l?view=msvc-170)  
[`strncat`, `_strncat_l`, `wcsncat`, `_wcsncat_l`, `_mbsncat`, `_mbsncat_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-strncat-l-wcsncat-wcsncat-l-mbsncat-mbsncat-l?view=msvc-170)  
[`strncat_s`, `_strncat_s_l`, `wcsncat_s`, `_wcsncat_s_l`, `_mbsncat_s`, `_mbsncat_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-s-strncat-s-l-wcsncat-s-wcsncat-s-l-mbsncat-s-mbsncat-s-l?view=msvc-170)