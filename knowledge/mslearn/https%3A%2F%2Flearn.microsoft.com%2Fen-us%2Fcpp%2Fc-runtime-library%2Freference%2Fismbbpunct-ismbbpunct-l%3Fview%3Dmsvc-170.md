---
title: "_ismbbpunct, _ismbbpunct_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbpunct-ismbbpunct-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines whether a particular character is a punctuation character.

## Syntax

```
int _ismbbpunct(
   unsigned int c
);
int _ismbbpunct_l(
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

**`_ismbbpunct`** returns a nonzero value if the integer _`c`_ is a non-ASCII punctuation symbol. **`_ismbbpunct`** uses the current locale for any locale-dependent character settings. **`_ismbbpunct_l`** is identical except that it uses the locale that's passed in. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

## Remarks

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_ismbbpunct`**

<mbctype.h>

**`_ismbbpunct_l`**

<mbctype.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Byte classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/byte-classification?view=msvc-170)  
[`_ismbb` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbb-routines?view=msvc-170)