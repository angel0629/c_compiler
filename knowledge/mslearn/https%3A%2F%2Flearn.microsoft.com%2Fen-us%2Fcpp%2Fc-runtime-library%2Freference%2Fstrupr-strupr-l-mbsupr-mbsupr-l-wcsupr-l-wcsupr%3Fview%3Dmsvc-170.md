---
title: "_strupr, _strupr_l, _mbsupr, _mbsupr_l, _wcsupr_l, _wcsupr"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strupr-strupr-l-mbsupr-mbsupr-l-wcsupr-l-wcsupr?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a string to uppercase. More secure versions of these functions are available; see [`_strupr_s`, `_strupr_s_l`, `_mbsupr_s`, `_mbsupr_s_l`, `_wcsupr_s`, `_wcsupr_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strupr-s-strupr-s-l-mbsupr-s-mbsupr-s-l-wcsupr-s-wcsupr-s-l?view=msvc-170).

## Syntax

```
char *_strupr(
   char *str
);
wchar_t *_wcsupr(
   wchar_t *str
);
unsigned char *_mbsupr(
   unsigned char *str
);
char *_strupr_l(
   char *str,
   _locale_t locale
);
wchar_t *_wcsupr_l(
   wchar_t *str,
   _locale_t locale
);
unsigned char *_mbsupr_l(
   unsigned char *str,
   _locale_t locale
);
template <size_t size>
char *_strupr(
   char (&str)[size]
); // C++ only
template <size_t size>
wchar_t *_wcsupr(
   wchar_t (&str)[size]
); // C++ only
template <size_t size>
unsigned char *_mbsupr(
   unsigned char (&str)[size]
); // C++ only
template <size_t size>
char *_strupr_l(
   char (&str)[size],
   _locale_t locale
); // C++ only
template <size_t size>
wchar_t *_wcsupr_l(
   wchar_t (&str)[size],
   _locale_t locale
); // C++ only
template <size_t size>
unsigned char *_mbsupr_l(
   unsigned char (&str)[size],
   _locale_t locale
); // C++ only
```

### Parameters

_`str`_  
String to capitalize.

_`locale`_  
The locale to use.

## Return value

Returns a pointer to the altered string. Because the modification is done in place, the pointer returned is the same as the pointer passed as the input argument. No return value is reserved to indicate an error.

The **`_strupr`** function converts, in place, each lowercase letter in _`str`_ to uppercase. The conversion is determined by the `LC_CTYPE` category setting of the locale. Other characters aren't affected. For more information on `LC_CTYPE`, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of these functions without the `_l` suffix use the current locale; the versions with the `_l` suffix are identical except that they use the locale passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

**`_wcsupr`** and **`_mbsupr`** are wide-character and multibyte-character versions of **`_strupr`**. The argument and return value of **`_wcsupr`** are wide-character strings. The argument and return value of **`_mbsupr`** are multibyte-character strings. These three functions behave identically otherwise.

If _`str`_ is a null pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170) . If execution is allowed to continue, these functions return the original string and set `errno` to `EINVAL`.

In C++, these functions have template overloads that invoke the newer, secure counterparts of these functions. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsupr`

**`_strupr`**

**`_mbsupr`**

**`_wcsupr`**

`_tcsupr_l`

**`_strupr_l`**

**`_mbsupr_l`**

**`_wcsupr_l`**

## Requirements

Routine

Required header

**`_strupr`**, **`_strupr_l`**

<string.h>

**`_wcsupr`**, **`_wcsupr_l`**

<string.h> or <wchar.h>

**`_mbsupr`**, **`_mbsupr_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`_strlwr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strlwr-wcslwr-mbslwr-strlwr-l-wcslwr-l-mbslwr-l?view=msvc-170).

## See also

[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`_strlwr`, `_wcslwr`, `_mbslwr`, `_strlwr_l`, `_wcslwr_l`, `_mbslwr_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strlwr-wcslwr-mbslwr-strlwr-l-wcslwr-l-mbslwr-l?view=msvc-170)