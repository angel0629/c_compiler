---
title: "isspace, iswspace, _isspace_l, _iswspace_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isspace-iswspace-isspace-l-iswspace-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines whether an integer represents a space character.

## Syntax

```
int isspace(
   int c
);
int iswspace(
   wint_t c
);
int _isspace_l(
   int c,
   _locale_t locale
);
int _iswspace_l(
   wint_t c,
   _locale_t locale
);
```

### Parameters

_`c`_  
Integer to test.

_`locale`_  
Locale to use.

## Return value

Each of these routines returns nonzero if _`c`_ is a particular representation of a space character. **`isspace`** returns a nonzero value if _`c`_ is a white-space character (0x09 - 0x0D or 0x20). The result of the test condition for the **`isspace`** function depends on the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of these functions that don't have the `_l` suffix use the current locale for any locale-dependent behavior; the versions that do have the `_l` suffix are identical except that they use the locale that's passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

**`iswspace`** returns a nonzero value if _`c`_ is a wide character that corresponds to a standard white-space character.

The behavior of **`isspace`** and **`_isspace_l`** is undefined if _`c`_ isn't EOF or in the range 0 through 0xFF, inclusive. When a debug CRT library is used and _`c`_ isn't one of these values, the functions raise an assertion.

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_istspace`

**`isspace`**

[`_ismbcspace`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcgraph-functions?view=msvc-170)

**`iswspace`**

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`isspace`**

<ctype.h>

**`iswspace`**

<ctype.h> or <wchar.h>

**`_isspace_l`**

<ctype.h>

**`_iswspace_l`**

<ctype.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Character classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/character-classification?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)