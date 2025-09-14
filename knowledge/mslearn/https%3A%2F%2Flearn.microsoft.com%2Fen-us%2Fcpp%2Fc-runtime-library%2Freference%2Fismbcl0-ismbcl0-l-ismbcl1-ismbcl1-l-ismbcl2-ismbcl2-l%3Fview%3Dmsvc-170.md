---
title: "_ismbcl0, _ismbcl0_l, _ismbcl1, _ismbcl1_l, _ismbcl2, _ismbcl2_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcl0-ismbcl0-l-ismbcl1-ismbcl1-l-ismbcl2-ismbcl2-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
**Code Page 932 Specific functions**, using the current locale or a specified LC\_CTYPE conversion state category.

## Syntax

```
int _ismbcl0(
   unsigned int c
);
int _ismbcl0_l(
   unsigned int c,
   _locale_t locale
);
int _ismbcl1(
   unsigned int c
);
int _ismbcl1_l(
   unsigned int c ,
   _locale_t locale
);
int _ismbcl2(
   unsigned int c
);
int _ismbcl2_l(
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

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of these functions without the `_l` suffix use the current locale for this locale-dependent behavior; the versions with the `_l` suffix are identical except that they use the locale parameter passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

Routine

Test condition (code page 932 only)

**`_ismbcl0`**

JIS non-Kanji: 0x8140<=_`c`_<=0x889E.

**`_ismbcl0_l`**

JIS non-Kanji: 0x8140<=_`c`_<=0x889E.

**`_ismbcl1`**

JIS level-1: 0x889F<=_`c`_<=0x9872.

**`_ismbcl1_l`**

JIS level-1: 0x889F<=_`c`_<=0x9872.

**`_ismbcl2`**

JIS level-2: 0x989F<=_`c`_<=0xEAA4.

**`_ismbcl2_l`**

JIS level-2: 0x989F<=_`c`_<=0xEAA4.

The functions check that the specified value _`c`_ matches the test conditions described above, but don't check that _`c`_ is a valid multibyte character. If the lower byte is in the ranges 0x00 - 0x3F, 0x7F, or 0xFD - 0xFF, these functions return a nonzero value, indicating that the character satisfies the test condition. Use [`_ismbbtrail`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbtrail-ismbbtrail-l?view=msvc-170) to test whether the multibyte character is defined.

**End Code Page 932 Specific**

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_ismbcl0`**

<mbstring.h>

**`_ismbcl0_l`**

<mbstring.h>

**`_ismbcl1`**

<mbstring.h>

**`_ismbcl1_l`**

<mbstring.h>

**`_ismbcl2`**

<mbstring.h>

**`_ismbcl2_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Character classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/character-classification?view=msvc-170)  
[`_ismbc` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbc-routines?view=msvc-170)  
[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)