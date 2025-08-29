---
title: "isdigit, iswdigit, _isdigit_l, _iswdigit_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isdigit-iswdigit-isdigit-l-iswdigit-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines whether an integer represents a decimal-digit character.

## Syntax

```
int isdigit(
   int c
);
int iswdigit(
   wint_t c
);
int _isdigit_l(
   int c,
   _locale_t locale
);
int _iswdigit_l(
   wint_t c,
   _locale_t locale
);
```

### Parameters

_`c`_  
Integer to test.

_`locale`_  
The locale to use.

## Return value

Each of these routines returns nonzero if _`c`_ is a particular representation of a decimal-digit character. **`isdigit`** returns a nonzero value if _`c`_ is a decimal digit (0 - 9). **`iswdigit`** returns a nonzero value if _`c`_ is a wide character that corresponds to a decimal-digit character. Each of these routines returns 0 if _`c`_ doesn't satisfy the test condition.

The versions of these functions that have the `_l` suffix use the locale that's passed in instead of the current locale for their locale-dependent behavior. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

The behavior of **`isdigit`** and **`_isdigit_l`** is undefined if _`c`_ isn't EOF or in the range 0 through 0xFF, inclusive. When a debug CRT library is used and _`c`_ isn't one of these values, the functions raise an assertion.

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_istdigit`

**`isdigit`**

[`_ismbcdigit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcalnum-functions?view=msvc-170)

**`iswdigit`**

`_istdigit_l`

**`_isdigit_l`**

[`_ismbcdigit_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcalnum-functions?view=msvc-170)

**`_iswdigit_l`**

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`isdigit`**

<ctype.h>

**`iswdigit`**

<ctype.h> or <wchar.h>

**`_isdigit_l`**

<ctype.h>

**`_iswdigit_l`**

<ctype.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Character classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/character-classification?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)