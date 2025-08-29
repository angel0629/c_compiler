---
title: "_mbsnbcat, _mbsnbcat_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcat-mbsnbcat-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Appends, at most, the first **n** bytes of one multibyte-character string to another. More secure versions of these functions are available; see [`_mbsnbcat_s`, `_mbsnbcat_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcat-s-mbsnbcat-s-l?view=msvc-170).

## Syntax

```
unsigned char *_mbsnbcat(
   unsigned char *dest,
   const unsigned char *src,
   size_t count
);
unsigned char *_mbsnbcat_l(
   unsigned char *dest,
   const unsigned char *src,
   size_t count,
   _locale_t locale
);
template <size_t size>
unsigned char *_mbsnbcat(
   unsigned char (&dest)[size],
   const unsigned char *src,
   size_t count
); // C++ only
template <size_t size>
unsigned char *_mbsnbcat_l(
   unsigned char (&dest)[size],
   const unsigned char *src,
   size_t count,
   _locale_t locale
); // C++ only
```

### Parameters

_`dest`_  
Null-terminated multibyte-character destination string.

_`src`_  
Null-terminated multibyte-character source string.

_`count`_  
Number of bytes from _`src`_ to append to _`dest`_.

_`locale`_  
Locale to use.

## Return value

**`_mbsnbcat`** returns a pointer to the destination string. No return value is reserved to indicate an error.

The **`_mbsnbcat`** function appends, at most, the first _`count`_ bytes of _`src`_ to _`dest`_. If the byte immediately preceding the null character in _`dest`_ is a lead byte, the initial byte of _`src`_ overwrites this lead byte. Otherwise, the initial byte of _`src`_ overwrites the terminating null character of _`dest`_. If a null byte appears in _`src`_ before _`count`_ bytes are appended, **`_mbsnbcat`** appends all bytes from _`src`_, up to the null character. If _`count`_ is greater than the length of _`src`_, the length of _`src`_ is used in place of _`count`_. The resulting string is terminated with a null character. If copying takes place between strings that overlap, the behavior is undefined.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The **`_mbsnbcat`** version of the function uses the current locale for this locale-dependent behavior; the **`_mbsnbcat_l`** version is identical except that they use the locale parameter passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

**Security Note** Use a null-terminated string. The null-terminated string must not exceed the size of the destination buffer. For more information, see [Avoiding buffer overruns](https://learn.microsoft.com/en-us/windows/win32/SecBP/avoiding-buffer-overruns).

If _`dest`_ or _`src`_ is `NULL`, the function will generate an invalid parameter error, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If the error is handled, the function returns `EINVAL` and sets `errno` to `EINVAL`.

In C++, these functions have template overloads that invoke the newer, secure counterparts of these functions. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsncat`

[`strncat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-strncat-l-wcsncat-wcsncat-l-mbsncat-mbsncat-l?view=msvc-170)

**`_mbsnbcat`**

[`wcsncat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-strncat-l-wcsncat-wcsncat-l-mbsncat-mbsncat-l?view=msvc-170)

`_tcsncat_l`

`_strncat_l`

**`_mbsnbcat_l`**

`_wcsncat_l`

## Requirements

Routine

Required header

**`_mbsnbcat`**

<mbstring.h>

**`_mbsnbcat_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`_mbsnbcmp`, `_mbsnbcmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcmp-mbsnbcmp-l?view=msvc-170)  
[`_strncnt`, `_wcsncnt`, `_mbsnbcnt`, `_mbsnbcnt_l`, `_mbsnccnt`, `_mbsnccnt_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncnt-wcsncnt-mbsnbcnt-mbsnbcnt-l-mbsnccnt-mbsnccnt-l?view=msvc-170)  
[`_mbsnbcpy`, `_mbsnbcpy_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcpy-mbsnbcpy-l?view=msvc-170)  
[`_mbsnbicmp`, `_mbsnbicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbicmp-mbsnbicmp-l?view=msvc-170)  
[`_mbsnbset`, `_mbsnbset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbset-mbsnbset-l?view=msvc-170)  
[`strncat`, `_strncat_l`, `wcsncat`, `_wcsncat_l`, `_mbsncat`, `_mbsncat_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-strncat-l-wcsncat-wcsncat-l-mbsncat-mbsncat-l?view=msvc-170)  
[`_mbsnbcat_s`, `_mbsnbcat_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcat-s-mbsnbcat-s-l?view=msvc-170)