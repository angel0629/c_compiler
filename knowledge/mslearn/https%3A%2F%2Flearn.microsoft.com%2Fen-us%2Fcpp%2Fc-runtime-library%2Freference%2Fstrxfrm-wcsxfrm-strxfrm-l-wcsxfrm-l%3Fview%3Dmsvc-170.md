---
title: "strxfrm, wcsxfrm, _strxfrm_l, _wcsxfrm_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strxfrm-wcsxfrm-strxfrm-l-wcsxfrm-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Transform a string based on locale-specific information.

## Syntax

```
size_t strxfrm(
   char *strDest,
   const char *strSource,
   size_t count
);
size_t wcsxfrm(
   wchar_t *strDest,
   const wchar_t *strSource,
   size_t count
);
size_t _strxfrm_l(
   char *strDest,
   const char *strSource,
   size_t count,
   _locale_t locale
);
size_t wcsxfrm_l(
   wchar_t *strDest,
   const wchar_t *strSource,
   size_t count,
   _locale_t locale
);
```

### Parameters

_`strDest`_  
Destination string.

_`strSource`_  
Source string.

_`count`_  
Maximum number of characters to place in _`strDest`_.

_`locale`_  
The locale to use.

## Return value

Returns the length of the transformed string, not counting the terminating null character. If the return value is greater than or equal to _`count`_, the content of _`strDest`_ is unpredictable. On an error, each function sets `errno` and returns `INT_MAX`. For an invalid character, `errno` is set to `EILSEQ`.

The **`strxfrm`** function transforms the string pointed to by _`strSource`_ into a new collated form that is stored in _`strDest`_. No more than _`count`_ characters, including the null character, are transformed and placed into the resulting string. The transformation is made using the locale's `LC_COLLATE` category setting. For more information on `LC_COLLATE`, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). **`strxfrm`** uses the current locale for its locale-dependent behavior; **`_strxfrm_l`** is identical except that it uses the locale passed in instead of the current locale. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

After the transformation, a call to `strcmp` with the two transformed strings yields results identical to the results of a call to `strcoll` applied to the original two strings. As with `strcoll` and `stricoll`, **`strxfrm`** automatically handles multibyte-character strings as appropriate.

**`wcsxfrm`** is a wide-character version of **`strxfrm`**; the string arguments of **`wcsxfrm`** are wide-character pointers. For **`wcsxfrm`**, after the string transformation, a call to `wcscmp` with the two transformed strings yields results identical to the results of a call to `wcscoll` applied to the original two strings. **`wcsxfrm`** and **`strxfrm`** behave identically otherwise. **`wcsxfrm`** uses the current locale for its locale-dependent behavior; **`_wcsxfrm_l`** uses the locale passed in instead of the current locale.

These functions validate their parameters. If _`strSource`_ is a null pointer, or _`strDest`_ is a `NULL` pointer (unless count is zero), or if _`count`_ is greater than `INT_MAX`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170) . If execution is allowed to continue, these functions set `errno` to `EINVAL` and return `INT_MAX`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsxfrm`

**`strxfrm`**

**`strxfrm`**

**`wcsxfrm`**

`_tcsxfrm_l`

**`_strxfrm_l`**

**`_strxfrm_l`**

**`_wcsxfrm_l`**

In the "C" locale, the order of the characters in the character set (ASCII character set) is the same as the lexicographic order of the characters. However, in other locales, the order of characters in the character set may differ from the lexicographic character order. For example, in certain European locales, the character 'a' (value 0x61) precedes the character '&#x00E4;' (value 0xE4) in the character set, but the character 'ä' precedes the character 'a' lexicographically.

In locales for which the character set and the lexicographic character order differ, use **`strxfrm`** on the original strings and then `strcmp` on the resulting strings to produce a lexicographic string comparison according to the current locale's `LC_COLLATE` category setting. Thus, to compare two strings lexicographically in the above locale, use **`strxfrm`** on the original strings, then `strcmp` on the resulting strings. Alternately, you can use `strcoll` rather than `strcmp` on the original strings.

**`strxfrm`** is basically a wrapper around [`LCMapString`](https://learn.microsoft.com/en-us/windows/win32/api/winnls/nf-winnls-lcmapstringw) with `LCMAP_SORTKEY`.

The value of the following expression is the size of the array needed to hold the **`strxfrm`** transformation of the source string:

`1 + strxfrm( NULL, string, 0 )`

In the "C" locale only, **`strxfrm`** is equivalent to the following function calls:

```
strncpy( _string1, _string2, _count );
return( strlen( _string1 ) );
```

## Requirements

Routine

Required header

**`strxfrm`**

<string.h>

**`wcsxfrm`**

<string.h> or <wchar.h>

**`_strxfrm_l`**

<string.h>

**`_wcsxfrm_l`**

<string.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[`localeconv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localeconv?view=msvc-170)  
[`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`strcoll` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/strcoll-functions?view=msvc-170)  
[`strcmp`, `wcscmp`, `_mbscmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcmp-wcscmp-mbscmp?view=msvc-170)  
[`strncmp`, `wcsncmp`, `_mbsncmp`, `_mbsncmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncmp-wcsncmp-mbsncmp-mbsncmp-l?view=msvc-170)