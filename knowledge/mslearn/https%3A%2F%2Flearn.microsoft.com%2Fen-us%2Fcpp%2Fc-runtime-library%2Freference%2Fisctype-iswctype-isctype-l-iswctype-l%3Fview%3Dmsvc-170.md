---
title: "_isctype, iswctype, _isctype_l, _iswctype_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isctype-iswctype-isctype-l-iswctype-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Tests _`c`_ for the `ctype` property specified by the _`desc`_ argument. For each valid value of _`desc`_, there's an equivalent wide-character classification routine.

## Syntax

```
int _isctype(
   int c,
   _ctype_t desc
);
int _isctype_l(
   int c,
   _ctype_t desc,
   _locale_t locale
);
int iswctype(
   wint_t c,
   wctype_t desc
);
int _iswctype_l(
   wint_t c,
   wctype_t desc,
   _locale_t locale
);
```

### Parameters

_`c`_  
Integer to test.

_`desc`_  
Property to test for. The property is normally retrieved using `ctype` or [`wctype`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctype?view=msvc-170).

_`locale`_  
The locale to use for any locale-dependent tests.

## Return value

**`_isctype`** and **`iswctype`** return a nonzero value if _`c`_ has the property specified by _`desc`_ in the current locale. Otherwise, they return 0. The versions of these functions with the `_l` suffix are identical except that they use the locale passed in instead of the current locale for their locale-dependent behavior. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

The behavior of **`_isctype`** and **`_isctype_l`** is undefined if _`c`_ isn't EOF or in the range 0 through 0xFF, inclusive. When a debug CRT library is used and _`c`_ isn't one of these values, the functions raise an assertion.

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

n/a

**`_isctype`**

n/a

**`_iswctype`**

n/a

**`_isctype_l`**

n/a

**`_iswctype_l`**

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_isctype`**

<ctype.h>

**`iswctype`**

<ctype.h> or <wchar.h>

**`_isctype_l`**

<ctype.h>

**`_iswctype_l`**

<ctype.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[Character classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/character-classification?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)