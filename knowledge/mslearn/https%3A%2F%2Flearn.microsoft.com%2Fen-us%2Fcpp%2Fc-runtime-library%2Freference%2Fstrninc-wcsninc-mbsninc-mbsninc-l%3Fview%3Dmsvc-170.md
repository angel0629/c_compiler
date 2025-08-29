---
title: "_strninc, _wcsninc, _mbsninc, _mbsninc_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strninc-wcsninc-mbsninc-mbsninc-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Advances a string pointer by **n** characters.

## Syntax

```
char *_strninc(
   const char *str,
   size_t count
);
wchar_t *_wcsninc(
   const wchar_t *str,
   size_t count
);
unsigned char *_mbsninc(
   const unsigned char *str,
   size_t count
);
unsigned char *_mbsninc(
   const unsigned char *str,
   size_t count,
   _locale_t locale
);
```

### Parameters

_`str`_  
Source string.

_`count`_  
Number of characters to increment a string pointer.

_`locale`_  
Locale to use.

## Return value

Each of these routines returns a pointer to _`str`_ after _`str`_ has been incremented by _`count`_ characters or `NULL` if the supplied pointer is `NULL`. If _`count`_ is greater than or equal to the number of characters in _`str`_, the result is undefined.

The **`_mbsninc`** function increments _`str`_ by _`count`_ multibyte characters. **`_mbsninc`** recognizes multibyte-character sequences according to the [multibyte code page](https://learn.microsoft.com/en-us/cpp/c-runtime-library/code-pages?view=msvc-170) currently in use.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsninc`

**`_strninc`**

**`_mbsninc`**

**`_wcsninc`**

**`_strninc`** and **`_wcsninc`** are single-byte-character string and wide-character string versions of **`_mbsninc`**. **`_wcsninc`** and **`_strninc`** are provided only for this mapping and shouldn't be used otherwise. For more information, see [Using generic-text mappings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/using-generic-text-mappings?view=msvc-170) and [Generic-text mappings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/generic-text-mappings?view=msvc-170).

**`_mbsninc_l`** is identical except that it uses the locale parameter passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

## Requirements

Routine

Required header

**`_mbsninc`**

<mbstring.h>

**`_mbsninc_l`**

<mbstring.h>

**`_strninc`**

<tchar.h>

**`_wcsninc`**

<tchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`_strdec`, `_wcsdec`, `_mbsdec`, `_mbsdec_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdec-wcsdec-mbsdec-mbsdec-l?view=msvc-170)  
[`_strinc`, `_wcsinc`, `_mbsinc`, `_mbsinc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strinc-wcsinc-mbsinc-mbsinc-l?view=msvc-170)  
[`_strnextc`, `_wcsnextc`, `_mbsnextc`, `_mbsnextc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnextc-wcsnextc-mbsnextc-mbsnextc-l?view=msvc-170)