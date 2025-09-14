---
title: "_ismbbtrail, _ismbbtrail_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbtrail-ismbbtrail-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines whether a byte is a trailing byte of a multibyte character.

## Syntax

```
int _ismbbtrail(
   unsigned int c
);
int _ismbbtrail_l(
   unsigned int c,
   _locale_t locale
);
```

### Parameters

_`c`_  
The integer to be tested.

_`locale`_  
The locale to use.

## Return value

**`_ismbbtrail`** returns a nonzero value if the integer _`c`_ is the second byte of a multibyte character. For example, in code page 932 only, valid ranges are 0x40 to 0x7E and 0x80 to 0xFC.

**`_ismbbtrail`** uses the current locale for locale-dependent behavior. **`_ismbbtrail_l`** is identical except that it uses the locale that's passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

Optional header

**`_ismbbtrail`**

<mbctype.h> or <mbstring.h>

<ctype.h>,\* <limits.h>, <stdlib.h>

**`_ismbbtrail_l`**

<mbctype.h> or <mbstring.h>

<ctype.h>,\* <limits.h>, <stdlib.h>

\* For manifest constants for the test conditions.

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Byte classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/byte-classification?view=msvc-170)  
[`_ismbb` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbb-routines?view=msvc-170)