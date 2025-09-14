---
title: "_strinc, _wcsinc, _mbsinc, _mbsinc_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strinc-wcsinc-mbsinc-mbsinc-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Advances a string pointer by one character.

## Syntax

```
char *_strinc(
   const char *current,
   _locale_t locale
);
wchar_t *_wcsinc(
   const wchar_t *current,
   _locale_t locale
);
unsigned char *_mbsinc(
   const unsigned char *current
);
unsigned char *_mbsinc_l(
   const unsigned char *current,
   _locale_t locale
);
```

### Parameters

_`current`_  
Character pointer.

_`locale`_  
Locale to use.

## Return value

Each of these routines returns a pointer to the character that immediately follows _`current`_.

The **`_mbsinc`** function returns a pointer to the first byte of the multibyte character that immediately follows _`current`_. **`_mbsinc`** recognizes multibyte-character sequences according to the [multibyte code page](https://learn.microsoft.com/en-us/cpp/c-runtime-library/code-pages?view=msvc-170) that's currently in use; **`_mbsinc_l`** is identical except that it instead uses the locale parameter that's passed in. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

The generic-text function `_tcsinc`, defined in Tchar.h, maps to **`_mbsinc`** if `_MBCS` has been defined, or to **`_wcsinc`** if `_UNICODE` has been defined. Otherwise, `_tcsinc` maps to **`_strinc`**. **`_strinc`** and **`_wcsinc`** are single-byte-character and wide-character versions of **`_mbsinc`**. **`_strinc`** and **`_wcsinc`** are provided only for this mapping and shouldn't be used otherwise. For more information, see [Using generic-text mappings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/using-generic-text-mappings?view=msvc-170) and [Generic-text mappings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/generic-text-mappings?view=msvc-170).

If _`current`_ is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function returns `EINVAL` and sets `errno` to `EINVAL`.

Important

These functions might be vulnerable to buffer overrun threats. Buffer overruns can be used for system attacks because they can cause an unwarranted elevation of privilege. For more information, see [Avoiding buffer overruns](https://learn.microsoft.com/en-us/windows/win32/SecBP/avoiding-buffer-overruns).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_mbsinc`**

<mbstring.h>

**`_mbsinc_l`**

<mbstring.h>

**`_strinc`**

<tchar.h>

**`_wcsinc`**

<tchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`_strdec`, `_wcsdec`, `_mbsdec`, `_mbsdec_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdec-wcsdec-mbsdec-mbsdec-l?view=msvc-170)  
[`_strnextc`, `_wcsnextc`, `_mbsnextc`, `_mbsnextc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnextc-wcsnextc-mbsnextc-mbsnextc-l?view=msvc-170)  
[`_strninc`, `_wcsninc`, `_mbsninc`, `_mbsninc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strninc-wcsninc-mbsninc-mbsninc-l?view=msvc-170)