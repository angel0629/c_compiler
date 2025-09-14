---
title: "isupper, _isupper_l, iswupper, _iswupper_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isupper-isupper-l-iswupper-iswupper-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines whether an integer represents an uppercase character.

## Syntax

```
int isupper(
   int c
);
int _isupper_l (
   int c,
   _locale_t locale
);
int iswupper(
   wint_t c
);
int _iwsupper_l(
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

Each of these routines returns nonzero if _`c`_ is a particular representation of an uppercase letter. **`isupper`** returns a nonzero value if _`c`_ is an uppercase character (A - Z). **`iswupper`** returns a nonzero value if _`c`_ is a wide character that corresponds to an uppercase letter, or if _`c`_ is one of an implementation-defined set of wide characters for which none of `iswcntrl`, `iswdigit`, `iswpunct`, or `iswspace` is nonzero. Each of these routines returns 0 if _`c`_ doesn't satisfy the test condition.

The versions of these functions that have the `_l` suffix use the locale that's passed in instead of the current locale for their locale-dependent behavior. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

The behavior of **`isupper`** and **`_isupper_l`** is undefined if _`c`_ isn't EOF or in the range 0 through 0xFF, inclusive. When a debug CRT library is used and _`c`_ isn't one of these values, the functions raise an assertion.

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_istupper`

**`isupper`**

[`_ismbcupper`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbclower-ismbclower-l-ismbcupper-ismbcupper-l?view=msvc-170)

**`iswupper`**

`_istupper_l`

**`_isupper_l`**

[`_ismbclower`, `_ismbclower_l`, `_ismbcupper`, `_ismbcupper_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbclower-ismbclower-l-ismbcupper-ismbcupper-l?view=msvc-170)

**`_iswupper_l`**

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`isupper`**

<ctype.h>

**`_isupper_l`**

<ctype.h>

**`iswupper`**

<ctype.h> or <wchar.h>

**`_iswupper_l`**

<ctype.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Character classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/character-classification?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)