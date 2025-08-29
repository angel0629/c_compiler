---
title: "iscntrl, iswcntrl, _iscntrl_l, _iswcntrl_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/iscntrl-iswcntrl-iscntrl-l-iswcntrl-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines whether an integer represents a control character.

## Syntax

```
int iscntrl(
   int c
);
int iswcntrl(
   wint_t c
);
int _iscntrl_l(
   int c,
   _locale_t locale
);
int _iswcntrl_l(
   wint_t c,
   _locale_t locale
);
```

### Parameters

_`c`_  
Integer to test

_`locale`_  
The locale to use.

## Return value

Each of these routines returns nonzero if _`c`_ is a particular representation of a control character. **`iscntrl`** returns a nonzero value if _`c`_ is a control character (0x00 - 0x1F or 0x7F). **`iswcntrl`** returns a nonzero value if _`c`_ is a control wide character. Each of these routines returns 0 if _`c`_ doesn't satisfy the test condition.

The versions of these functions that have the `_l` suffix use the locale parameter that's passed in instead of the current locale. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

The behavior of **`iscntrl`** and **`_iscntrl_l`** is undefined if _`c`_ isn't EOF or in the range 0 through 0xFF, inclusive. When a debug CRT library is used and _`c`_ isn't one of these values, the functions raise an assertion.

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_istcntrl`

**`iscntrl`**

**`iscntrl`**

**`iswcntrl`**

`_istcntrl_l`

**`_iscntrl_l`**

**`_iscntrl_l`**

**`_iswcntrl_l`**

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`iscntrl`**

<ctype.h>

**`iswcntrl`**

<ctype.h> or <wchar.h>

**`_iscntrl_l`**

<ctype.h>

**`_iswcntrl_l`**

<ctype.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Character classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/character-classification?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)