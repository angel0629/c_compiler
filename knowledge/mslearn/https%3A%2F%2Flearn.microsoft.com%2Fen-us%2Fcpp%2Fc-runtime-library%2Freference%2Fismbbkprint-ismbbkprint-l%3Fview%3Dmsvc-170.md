---
title: "_ismbbkprint, _ismbbkprint_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbkprint-ismbbkprint-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines whether a particular multibyte character is a punctuation symbol.

## Syntax

```
int _ismbbkprint(
   unsigned int c
);
int _ismbbkprint_l(
   unsigned int c,
   _locale_t locale
);
```

### Parameters

_`c`_  
Integer to be tested.

_`locale`_  
Locale to use.

## Return value

**`_ismbbkprint`** returns a nonzero value if the integer _`c`_ is a non-ASCII text or non-ASCII punctuation symbol. Otherwise, it returns 0. For example, in code page 932 only, **`_ismbbkprint`** tests for katakana alphanumeric or katakana punctuation (range: 0xA1 - 0xDF). **`_ismbbkprint`** uses the current locale for locale-dependent character settings. **`_ismbbkprint_l`** is identical except that it uses the locale passed in. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

## Remarks

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_ismbbkprint`**

<mbctype.h>

**`_ismbbkprint_l`**

<mbctype.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Byte classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/byte-classification?view=msvc-170)  
[`_ismbb` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbb-routines?view=msvc-170)