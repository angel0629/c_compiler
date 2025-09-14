---
title: "_strupr_s, _strupr_s_l, _mbsupr_s, _mbsupr_s_l, _wcsupr_s, _wcsupr_s_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strupr-s-strupr-s-l-mbsupr-s-mbsupr-s-l-wcsupr-s-wcsupr-s-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a string to uppercase, by using the current locale or a specified locale that's passed in. These versions of [`_strupr`, `_strupr_l`, `_mbsupr`, `_mbsupr_l`, `_wcsupr_l`, `_wcsupr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strupr-strupr-l-mbsupr-mbsupr-l-wcsupr-l-wcsupr?view=msvc-170) have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t _strupr_s(
   char *str,
   size_t numberOfElements
);
errno_t _wcsupr_s(
   wchar_t * str,
   size_t numberOfElements
);
errno_t _strupr_s_l(
   char * str,
   size_t numberOfElements,
   _locale_t locale
);
errno_t _wcsupr_s_l(
   wchar_t * str,
   size_t numberOfElements,
   _locale_t locale
);
errno_t _mbsupr_s(
   unsigned char *str,
   size_t numberOfElements
);
errno_t _mbsupr_s_l(
   unsigned char *str,
   size_t numberOfElements,
   _locale_t locale
);
template <size_t size>
errno_t _strupr_s(
   char (&str)[size]
); // C++ only
template <size_t size>
errno_t _wcsupr_s(
   wchar_t (&str)[size]
); // C++ only
template <size_t size>
errno_t _strupr_s_l(
   char (&str)[size],
   _locale_t locale
); // C++ only
template <size_t size>
errno_t _wcsupr_s_l(
   wchar_t (&str)[size],
   _locale_t locale
); // C++ only
template <size_t size>
errno_t _mbsupr_s(
   unsigned char (&str)[size]
); // C++ only
template <size_t size>
errno_t _mbsupr_s_l(
   unsigned char (&str)[size],
   _locale_t locale
); // C++ only
```

### Parameters

_`str`_  
String to capitalize.

_`numberOfElements`_  
Size of the buffer.

_`locale`_  
The locale to use.

## Return value

Zero if successful; a non-zero error code on failure.

These functions validate their parameters. If _`str`_ is a `NULL` pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170) . If execution is allowed to continue, the functions return `EINVAL` and set `errno` to `EINVAL`. If _`numberOfElements`_ is less than the length of the string, the functions return `ERANGE` and set `errno` to `ERANGE`.

The **`_strupr_s`** function converts, in place, each lowercase letter in _`str`_ to uppercase. **`_wcsupr_s`** is the wide-character version of **`_strupr_s`**. **`_mbsupr_s`** is the multi-byte character version of **`_strupr_s`**.

The conversion is determined by the `LC_CTYPE` category setting of the locale. Other characters aren't affected. For more information on `LC_CTYPE`, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of these functions without the `_l` suffix use the current locale; the visions with the `_l` suffix are identical except that they use the locale passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

In C++, using these functions is simplified by template overloads; the overloads can infer buffer length automatically (eliminating the need to specify a size argument) and they can automatically replace older, non-secure functions with their newer, secure counterparts. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

The debug library versions of these functions first fill the buffer with 0xFE. To disable this behavior, use [`_CrtSetDebugFillThreshold`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdebugfillthreshold?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsupr_s`

**`_strupr_s`**

**`_mbsupr_s`**

**`_wcsupr_s`**

`_tcsupr_s_l`

**`_strupr_s_l`**

**`_mbsupr_s_l`**

**`_wcsupr_s_l`**

## Requirements

Routine

Required header

**`_strupr_s`**, **`_strupr_s_l`**

<string.h>

**`_wcsupr_s`**, **`_wcsupr_s_l`**, **`_mbsupr_s`**, **`_mbsupr_s_l`**

<string.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`_strlwr_s`, `_strlwr_s_l`, `_mbslwr_s`, `_mbslwr_s_l`, `_wcslwr_s`, `_wcslwr_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strlwr-s-strlwr-s-l-mbslwr-s-mbslwr-s-l-wcslwr-s-wcslwr-s-l?view=msvc-170) .

## See also

[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`_strlwr_s`, `_strlwr_s_l`, `_mbslwr_s`, `_mbslwr_s_l`, `_wcslwr_s`, `_wcslwr_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strlwr-s-strlwr-s-l-mbslwr-s-mbslwr-s-l-wcslwr-s-wcslwr-s-l?view=msvc-170)