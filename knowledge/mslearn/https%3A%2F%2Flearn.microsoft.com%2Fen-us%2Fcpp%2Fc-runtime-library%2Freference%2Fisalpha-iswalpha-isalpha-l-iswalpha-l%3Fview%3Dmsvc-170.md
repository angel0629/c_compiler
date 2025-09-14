---
title: "isalpha, iswalpha, _isalpha_l, _iswalpha_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isalpha-iswalpha-isalpha-l-iswalpha-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines whether an integer represents an alphabetic character.

## Syntax

```
int isalpha(
   int c
);
int iswalpha(
   wint_t c
);
int _isalpha_l(
   int c,
   _locale_t locale
);
int _iswalpha_l(
   wint_t c,
   _locale_t locale
);
```

### Parameters

_`c`_  
Integer to test.

_`locale`_  
The locale to use instead of the current locale.

## Return value

Each of these routines returns nonzero if _`c`_ is a particular representation of an alphabetic character. **`isalpha`** returns a nonzero value if _`c`_ is within the ranges A - Z or a - z. **`iswalpha`** returns a nonzero value only for wide characters for which [`iswupper`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isupper-isupper-l-iswupper-iswupper-l?view=msvc-170) or `iswlower` is nonzero; that is, for any wide character that is one of an implementation-defined set for which none of `iswcntrl`, `iswdigit`, `iswpunct`, or `iswspace` is nonzero. Each of these routines returns 0 if _`c`_ doesn't satisfy the test condition.

The versions of these functions that have the `_l` suffix use the locale parameter that's passed in instead of the current locale. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

The behavior of **`isalpha`** and **`_isalpha_l`** is undefined if _`c`_ isn't EOF or in the range 0 through 0xFF, inclusive. When a debug CRT library is used and _`c`_ isn't one of these values, the functions raise an assertion.

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_istalpha`

**`isalpha`**

**`_ismbcalpha`**

**`iswalpha`**

`_istalpha_l`

**`_isalpha_l`**

**`_ismbcalpha_l`**

**`_iswalpha_l`**

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`isalpha`**

<ctype.h>

**`iswalpha`**

<ctype.h> or <wchar.h>

**`_isalpha_l`**

<ctype.h>

**`_iswalpha_l`**

<ctype.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Character classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/character-classification?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)