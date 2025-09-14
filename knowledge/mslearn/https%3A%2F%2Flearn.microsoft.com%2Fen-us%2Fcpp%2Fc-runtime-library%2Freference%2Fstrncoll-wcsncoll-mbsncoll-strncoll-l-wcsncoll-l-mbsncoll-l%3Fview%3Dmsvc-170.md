---
title: "_strncoll, _wcsncoll, _mbsncoll, _strncoll_l, _wcsncoll_l, _mbsncoll_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncoll-wcsncoll-mbsncoll-strncoll-l-wcsncoll-l-mbsncoll-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Compares strings by using locale-specific information.

## Syntax

```
int _strncoll(
   const char *string1,
   const char *string2,
   size_t count
);
int _wcsncoll(
   const wchar_t *string1,
   const wchar_t *string2,
   size_t count
);
int _mbsncoll(
   const unsigned char *string1,
   const unsigned char *string2,
   size_t count
);
int _strncoll_l(
   const char *string1,
   const char *string2,
   size_t count,
   _locale_t locale
);
int _wcsncoll_l(
   const wchar_t *string1,
   const wchar_t *string2,
   size_t count,
   _locale_t locale
);
int _mbsncoll_l(
   const unsigned char *string1,
   const unsigned char *string2,
   size_t count,
   _locale_t locale
);
```

### Parameters

_`string1`_, _`string2`_  
Null-terminated strings to compare.

_`count`_  
The number of characters to compare.

_`locale`_  
The locale to use.

## Return value

Each of these functions returns a value that indicates the relationship of the substrings of _`string1`_ and _`string2`_, as follows.

Return value

Relationship of _`string1`_ to _`string2`_

< 0

_`string1`_ is less than _`string2`_.

0

_`string1`_ is identical to _`string2`_.

\> 0

_`string1`_ is greater than _`string2`_.

Each of these functions returns `_NLSCMPERROR`. To use `_NLSCMPERROR`, include either STRING.h or MBSTRING.h. **`_wcsncoll`** can fail if either _`string1`_ or _`string2`_ contains wide-character codes that are outside the domain of the collating sequence. When an error occurs, **`_wcsncoll`** may set `errno` to `EINVAL`. To check for an error on a call to **`_wcsncoll`**, set `errno` to 0, and then check `errno` after the **`_wcsncoll`** call.

Each of these functions performs a case-sensitive comparison of the first _`count`_ characters in _`string1`_ and _`string2`_, according to the code page that's currently in use. Use these functions only when there's a difference between the character set order and the lexicographic character order in the code page, and when this difference matters for the string comparison. The character set order is locale-dependent. The versions of these functions that don't have the `_l` suffix use the current locale, but the versions that have the `_l` suffix use the locale that's passed in. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

All of these functions validate their parameters. If either _`string1`_ or _`string2`_ is a null pointer, or _`count`_ is greater than `INT_MAX`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return `_NLSCMPERROR` and set `errno` to `EINVAL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsnccoll`

**`_strncoll`**

**`_mbsncoll`**

**`_wcsncoll`**

`_tcsncoll`

**`_strncoll`**

[`_mbsnbcoll`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcoll-mbsnbcoll-l-mbsnbicoll-mbsnbicoll-l?view=msvc-170)

**`_wcsncoll`**

## Requirements

Routine

Required header

**`_strncoll`**, **`_strncoll_l`**

<string.h>

**`_wcsncoll`**, **`_wcsncoll_l`**

<wchar.h> or <string.h>

**`_mbsncoll`**, **`_mbsncoll_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`strcoll` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/strcoll-functions?view=msvc-170)  
[`localeconv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localeconv?view=msvc-170)  
[`_mbsnbcoll`, `_mbsnbcoll_l`, `_mbsnbicoll`, `_mbsnbicoll_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcoll-mbsnbcoll-l-mbsnbicoll-mbsnbicoll-l?view=msvc-170)  
[`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170)  
[`strcmp`, `wcscmp`, `_mbscmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcmp-wcscmp-mbscmp?view=msvc-170)  
[`_stricmp`, `_wcsicmp`, `_mbsicmp`, `_stricmp_l`, `_wcsicmp_l`, `_mbsicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stricmp-wcsicmp-mbsicmp-stricmp-l-wcsicmp-l-mbsicmp-l?view=msvc-170)  
[`strncmp`, `wcsncmp`, `_mbsncmp`, `_mbsncmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncmp-wcsncmp-mbsncmp-mbsncmp-l?view=msvc-170)  
[`_strnicmp`, `_wcsnicmp`, `_mbsnicmp`, `_strnicmp_l`, `_wcsnicmp_l`, `_mbsnicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnicmp-wcsnicmp-mbsnicmp-strnicmp-l-wcsnicmp-l-mbsnicmp-l?view=msvc-170)  
[`strxfrm`, `wcsxfrm`, `_strxfrm_l`, `_wcsxfrm_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strxfrm-wcsxfrm-strxfrm-l-wcsxfrm-l?view=msvc-170)