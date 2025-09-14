---
title: "isgraph, iswgraph, _isgraph_l, _iswgraph_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isgraph-iswgraph-isgraph-l-iswgraph-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines whether an integer represents a graphical character.

## Syntax

```
int isgraph(
   int c
);
int iswgraph(
   wint_t c
);
int _isgraph_l(
   int c,
   _locale_t locale
);
int _iswgraph_l(
   wint_t c,
   _locale_t locale
);
```

### Parameters

_`c`_  
Integer to test.

## Return value

Each of these routines returns nonzero if _`c`_ is a particular representation of a printable character other than a space. **`isgraph`** returns a nonzero value if _`c`_ is a printable character other than a space. **`iswgraph`** returns a nonzero value if _`c`_ is a printable wide character other than a wide character space. Each of these routines returns 0 if _`c`_ doesn't satisfy the test condition.

The versions of these functions that have the `_l` suffix use the locale that's passed in instead of the current locale for their locale-dependent behavior. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

The behavior of **`isgraph`** and **`_isgraph_l`** is undefined if _`c`_ isn't EOF or in the range 0 through 0xFF, inclusive. When a debug CRT library is used and _`c`_ isn't one of these values, the functions raise an assertion.

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_istgraph`

**`isgraph`**

[`_ismbcgraph`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcgraph-functions?view=msvc-170)

**`iswgraph`**

**`_istgraph_l`**

**`_isgraph_l`**

[`_ismbcgraph_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcgraph-functions?view=msvc-170)

**`_iswgraph_l`**

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`isgraph`**

<ctype.h>

**`iswgraph`**

<ctype.h> or <wchar.h>

**`_isgraph_l`**

<ctype.h>

**`_iswgraph_l`**

<ctype.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Character classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/character-classification?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)