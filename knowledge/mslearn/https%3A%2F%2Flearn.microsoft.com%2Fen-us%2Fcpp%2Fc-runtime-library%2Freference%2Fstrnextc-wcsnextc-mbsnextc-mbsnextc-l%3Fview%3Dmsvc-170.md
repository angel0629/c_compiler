---
title: "_strnextc, _wcsnextc, _mbsnextc, _mbsnextc_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnextc-wcsnextc-mbsnextc-mbsnextc-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Finds the next character in a string.

## Syntax

```
unsigned int _strnextc(
   const char *str
);
unsigned int _wcsnextc(
   const wchar_t *str
);
unsigned int _mbsnextc(
   const unsigned char *str
);
unsigned int _mbsnextc_l(
   const unsigned char *str,
   _locale_t locale
);
```

### Parameters

_`str`_  
Source string.

_`locale`_  
Locale to use.

## Return value

Each of these functions returns the integer value of the next character in _`str`_.

The **`_mbsnextc`** function returns the integer value of the next multibyte character in _`str`_, without advancing the string pointer. **`_mbsnextc`** recognizes multibyte-character sequences according to the [multibyte code page](https://learn.microsoft.com/en-us/cpp/c-runtime-library/code-pages?view=msvc-170) currently in use.

If _`str`_ is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the function returns 0.

**Security Note** This API incurs a potential threat brought about by a buffer overrun problem. Buffer overrun problems are a frequent method of system attack, resulting in an unwarranted elevation of privilege. For more information, see [Avoiding buffer overruns](https://learn.microsoft.com/en-us/windows/win32/SecBP/avoiding-buffer-overruns).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsnextc`

**`_strnextc`**

**`_mbsnextc`**

**`_wcsnextc`**

**`_strnextc`** and **`_wcsnextc`** are single-byte-character string and wide-character string versions of **`_mbsnextc`**. **`_wcsnextc`** returns the integer value of the next wide character in _`str`_; **`_strnextc`** returns the integer value of the next single-byte character in _`str`_. **`_strnextc`** and **`_wcsnextc`** are provided only for this mapping and shouldn't be used otherwise. For more information, see [Using generic-text mappings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/using-generic-text-mappings?view=msvc-170) and [Generic-text mappings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/generic-text-mappings?view=msvc-170).

**`_mbsnextc_l`** is identical except that it uses the locale parameter passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

## Requirements

Routine

Required header

**`_mbsnextc`**

<mbstring.h>

**`_mbsnextc_l`**

<mbstring.h>

**`_strnextc`**

<tchar.h>

**`_wcsnextc`**

<tchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`_strdec`, `_wcsdec`, `_mbsdec`, `_mbsdec_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdec-wcsdec-mbsdec-mbsdec-l?view=msvc-170)  
[`_strinc`, `_wcsinc`, `_mbsinc`, `_mbsinc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strinc-wcsinc-mbsinc-mbsinc-l?view=msvc-170)  
[`_strninc`, `_wcsninc`, `_mbsninc`, `_mbsninc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strninc-wcsninc-mbsninc-mbsninc-l?view=msvc-170)