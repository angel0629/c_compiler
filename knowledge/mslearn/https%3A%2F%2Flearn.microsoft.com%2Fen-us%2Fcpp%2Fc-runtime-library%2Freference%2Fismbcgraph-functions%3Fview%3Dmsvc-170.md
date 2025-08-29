---
title: "_ismbcgraph, _ismbcgraph_l, _ismbcprint, _ismbcprint_l, _ismbcpunct, _ismbcpunct_l, _ismbcblank, _ismbcblank_l, _ismbcspace, _ismbcspace_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcgraph-functions?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines whether character is a graphical character, a display character, a punctuation character, or a space character.

## Syntax

```
int _ismbcgraph(
   unsigned int c
);
int _ismbcgraph_l(
   unsigned int c,
   _locale_t locale
);
int _ismbcprint(
   unsigned int c
);
int _ismbcprint_l(
   unsigned int c,
   _locale_t locale
);
int _ismbcpunct(
   unsigned int c
);
int _ismbcpunct_l(
   unsigned int c,
   _locale_t locale
);
int _ismbcblank(
   unsigned int c
);
int _ismbcblank_l(
   unsigned int c,
   _locale_t locale
);
int _ismbcspace(
   unsigned int c
);
int _ismbcspace_l(
   unsigned int c,
   _locale_t locale
);
```

### Parameters

_`c`_  
Character to be determined.

_`locale`_  
Locale to use.

## Return value

Each of these routines returns a nonzero value if the character satisfies the test condition. Otherwise, they return 0. If _`c`_ <= 255 and there's a corresponding `_ismbb` routine (for example, **`_ismbcalnum`** corresponds to `_ismbbalnum`), the result is the return value of the corresponding `_ismbb` routine.

The versions of these functions are identical, except that the ones that have the `_l` suffix use the locale that's passed in for their locale-dependent behavior, instead of the current locale. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

Each of these functions tests a given multibyte character for a given condition.

Routine

Test condition

Code page 932 example

**`_ismbcgraph`**

Graphic

Returns nonzero if and only if _`c`_ is a single-byte representation of any ASCII or katakana printable character except a white space.

**`_ismbcprint`**

Printable

Returns nonzero if and only if _`c`_ is a single-byte representation of any ASCII or katakana printable character including a white space.

**`_ismbcpunct`**

Punctuation

Returns nonzero if and only if _`c`_ is a single-byte representation of any ASCII or katakana punctuation character.

**`_ismbcblank`**

Space or horizontal tab

Returns nonzero if and only if _`c`_ is a space or horizontal tab character: _`c`_\=0x20 or _`c`_\=0x09.

**`_ismbcspace`**

White space

Returns nonzero if and only if _`c`_ is a white-space character: _`c`_\=0x20 or 0x09<=_`c`_<=0x0D.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_ismbcgraph`**

<mbstring.h>

**`_ismbcgraph_l`**

<mbstring.h>

**`_ismbcprint`**

<mbstring.h>

**`_ismbcprint_l`**

<mbstring.h>

**`_ismbcpunct`**

<mbstring.h>

**`_ismbcpunct_l`**

<mbstring.h>

**`_ismbcblank`**

<mbstring.h>

**`_ismbcblank_l`**

<mbstring.h>

**`_ismbcspace`**

<mbstring.h>

**`_ismbcspace_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[Character classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/character-classification?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`_ismbc` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbc-routines?view=msvc-170)  
[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)  
[`_ismbb` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbb-routines?view=msvc-170)