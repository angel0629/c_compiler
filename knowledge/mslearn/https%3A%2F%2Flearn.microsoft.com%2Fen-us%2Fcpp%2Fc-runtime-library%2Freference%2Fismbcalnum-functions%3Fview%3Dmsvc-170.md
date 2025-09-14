---
title: "_ismbcalnum, _ismbcalnum_l, _ismbcalpha, _ismbcalpha_l, _ismbcdigit, _ismbcdigit_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcalnum-functions?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Checks whether a multibyte character is an alphanumeric, alpha, or digit character.

## Syntax

```
int _ismbcalnum
(
   unsigned int c
);
int _ismbcalnum_l
(
   unsigned int c,
   _locale_t locale
);
int _ismbcalpha
(
   unsigned int c
);
int _ismbcalpha_l
(
   unsigned int c,
   _locale_t locale
);
int _ismbcdigit
(
   unsigned int c
);
int _ismbcdigit_l
(
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

Each of these routines tests a given multibyte character for a given condition.

The versions of these functions with the `_l` suffix are identical except that they use the locale passed in instead of the current locale for their locale-dependent behavior. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

Routine

Test condition

Code page 932 example

**`_ismbcalnum`**, **`_ismbcalnum_l`**

Alphanumeric

Returns nonzero if and only if _`c`_ is a single-byte representation of an ASCII English letter: See examples for **`_ismbcdigit`** and **`_ismbcalpha`**.

**`_ismbcalpha`**, **`_ismbcalpha_l`**

Alphabetic

Returns nonzero if and only if _`c`_ is a single-byte representation of an ASCII English letter: 0x41<=_`c`_<=0x5A or 0x61<=_`c`_<=0x7A; or a katakana letter: 0xA6<=_`c`_<=0xDF.

**`_ismbcdigit`**, **`_ismbcdigit_l`**

Digit

Returns nonzero if and only if _`c`_ is a single-byte representation of an ASCII digit: 0x30<=_`c`_<=0x39.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_ismbcalnum`**, **`_ismbcalnum_l`**

<mbstring.h>

**`_ismbcalpha`**, **`_ismbcalpha_l`**

<mbstring.h>

**`_ismbcdigit`**, **`_ismbcdigit_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Character classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/character-classification?view=msvc-170)  
[`_ismbc` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbc-routines?view=msvc-170)  
[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)  
[`_ismbb` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbb-routines?view=msvc-170)