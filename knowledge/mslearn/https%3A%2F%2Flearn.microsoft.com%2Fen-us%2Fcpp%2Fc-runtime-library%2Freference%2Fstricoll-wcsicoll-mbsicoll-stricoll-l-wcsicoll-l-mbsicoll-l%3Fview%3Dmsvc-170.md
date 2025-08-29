---
title: "_stricoll, _wcsicoll, _mbsicoll, _stricoll_l, _wcsicoll_l, _mbsicoll_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stricoll-wcsicoll-mbsicoll-stricoll-l-wcsicoll-l-mbsicoll-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Compares strings by using locale-specific information.

## Syntax

```
int _stricoll(
   const char *string1,
   const char *string2
);
int _wcsicoll(
   const wchar_t *string1,
   const wchar_t *string2
);
int _mbsicoll(
   const unsigned char *string1,
   const unsigned char *string2
);
int _stricoll_l(
   const char *string1,
   const char *string2,
   _locale_t locale
);
int _wcsicoll_l(
   const wchar_t *string1,
   const wchar_t *string2,
   _locale_t locale
);
int _mbsicoll_l(
   const unsigned char *string1,
   const unsigned char *string2,
   _locale_t locale
);
```

### Parameters

_`string1`_, _`string2`_  
Null-terminated strings to compare.

_`locale`_  
The locale to use.

## Return value

Each of these functions returns a value indicating the relationship of _`string1`_ to _`string2`_, as follows.

Return value

Relationship of _`string1`_ to _`string2`_

< 0

_`string1`_ less than _`string2`_

0

_`string1`_ identical to _`string2`_

\> 0

_`string1`_ greater than _`string2`_

`_NLSCMPERROR`

An error occurred.

Each of these functions returns `_NLSCMPERROR`. To use `_NLSCMPERROR`, include either <string.h> or <mbstring.h>. **`_wcsicoll`** can fail if either _`string1`_ or _`string2`_ contains wide-character codes outside the domain of the collating sequence. When an error occurs, **`_wcsicoll`** may set `errno` to `EINVAL`. To check for an error on a call to **`_wcsicoll`**, set `errno` to 0 and then check `errno` after calling **`_wcsicoll`**.

Each of these functions performs a case-insensitive comparison of _`string1`_ and _`string2`_ according to the code page currently in use. These functions should be used only when there's a difference between the character set order and the lexicographic character order in the current code page and this difference is of interest for the string comparison.

`_stricmp` differs from **`_stricoll`** in that the `_stricmp` comparison is affected by `LC_CTYPE`, whereas the **`_stricoll`** comparison is according to the `LC_CTYPE` and `LC_COLLATE` categories of the locale. For more information on the `LC_COLLATE` category, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170) and [Locale categories](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale-categories?view=msvc-170). The versions of these functions without the `_l` suffix use the current locale; the versions with the `_l` suffix are identical except that they use the locale passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

All of these functions validate their parameters. If either _`string1`_ or _`string2`_ are `NULL` pointers, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return `_NLSCMPERROR` and set `errno` to `EINVAL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsicoll`

**`_stricoll`**

**`_mbsicoll`**

**`_wcsicoll`**

## Requirements

Routine

Required header

**`_stricoll`**, **`_stricoll_l`**

<string.h>

**`_wcsicoll`**, **`_wcsicoll_l`**

<wchar.h>, <string.h>

**`_mbsicoll`**, **`_mbsicoll_l`**

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