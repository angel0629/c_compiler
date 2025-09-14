---
title: "_ismbclegal, _ismbclegal_l, _ismbcsymbol, _ismbcsymbol_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbclegal-ismbclegal-l-ismbcsymbol-ismbcsymbol-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Checks whether a multibyte character is a legal or symbol character.

## Syntax

```
int _ismbclegal(
   unsigned int c
);
int _ismbclegal_l(
   unsigned int c,
   _locale_t locale
);
int _ismbcsymbol(
   unsigned int c
);
int _ismbcsymbol_l(
   unsigned int c,
   _locale_t locale
);
```

### Parameters

_`c`_  
Character to be tested.

_`locale`_  
Locale to use.

## Return value

Each of these routines returns a nonzero value if the character satisfies the test condition. Otherwise, they return 0. If _`c`_<= 255 and there's a corresponding `_ismbb` routine (for example, **`_ismbcalnum`** corresponds to `_ismbbalnum`), the result is the return value of the corresponding `_ismbb` routine.

Each of these functions tests a given multibyte character for a given condition.

The versions of these functions with the `_l` suffix are identical except that they use the locale passed in instead of the current locale for their locale-dependent behavior. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

Routine

Test condition

Code page 932 example

**`_ismbclegal`**

Valid multibyte

Returns nonzero if and only if the first byte of _`c`_ is within ranges 0x81 - 0x9F or 0xE0 - 0xFC, while the second byte is within ranges 0x40 - 0x7E or 0x80 - FC.

**`_ismbcsymbol`**

Multibyte symbol

Returns nonzero if and only if 0x8141<=_`c`_<=0x81AC.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_istlegal`

Always returns false

**`_ismbclegal`**

Always returns false.

`_istlegal_l`

Always returns false

**`_ismbclegal_l`**

Always returns false.

## Requirements

Routine

Required header

**`_ismbclegal`**, **`_ismbclegal_l`**

<mbstring.h>

**`_ismbcsymbol`**, **`_ismbcsymbol_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Character classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/character-classification?view=msvc-170)  
[`_ismbc` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbc-routines?view=msvc-170)  
[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)  
[`_ismbb` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbb-routines?view=msvc-170)