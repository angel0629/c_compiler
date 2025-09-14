---
title: "_ismbchira, _ismbchira_l, _ismbckata, _ismbckata_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbchira-ismbchira-l-ismbckata-ismbckata-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
**Code Page 932 Specific functions**

## Syntax

```
int _ismbchira(
   unsigned int c
);
int _ismbchira_l(
   unsigned int c,
   _locale_t locale
);
int _ismbckata(
   unsigned int c
);
int _ismbckata_l(
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

Each of these routines returns a nonzero value if the character satisfies the test condition. Otherwise, they return 0. If _`c`_ <= 255 and there's a corresponding `_ismbb` routine (for example, **`_ismbcalnum`** corresponds to `_ismbbalnum`), the result is the return value of the corresponding `_ismbb` routine.

Each of these functions tests a given multibyte character for a given condition.

The versions of these functions with the `_l` suffix are identical except that they use the locale passed in instead of the current locale for their locale-dependent behavior. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

Routine

Test condition (code page 932 only)

**`_ismbchira`**

Double-byte Hiragana: 0x829F<=_`c`_<=0x82F1.

**`_ismbchira_l`**

Double-byte Hiragana: 0x829F<=_`c`_<=0x82F1.

**`_ismbckata`**

Double-byte katakana: 0x8340<=_`c`_<=0x8396.

**`_ismbckata_l`**

Double-byte katakana: 0x8340<=_`c`_<=0x8396.

**End Code Page 932 Specific**

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_ismbchira`**

<mbstring.h>

**`_ismbchira_l`**

<mbstring.h>

**`_ismbckata`**

<mbstring.h>

**`_ismbckata_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Character classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/character-classification?view=msvc-170)  
[`_ismbc` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbc-routines?view=msvc-170)  
[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)