---
title: "_mbbtype, _mbbtype_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbbtype-mbbtype-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns the byte type, based on the previous byte.

## Syntax

```
int _mbbtype(
   unsigned char c,
   int type
);
int _mbbtype_l(
   unsigned char c,
   int type,
   _locale_t locale
);
```

### Parameters

_`c`_  
The character to test.

_`type`_  
The type of byte to test for.

_`locale`_  
The locale to use.

## Return value

**`_mbbtype`** returns the type of byte in a string. This decision is context-sensitive, as specified by the value of _`type`_, which provides the control test condition. _`type`_ is the type of the previous byte in the string. The manifest constants in the following table are defined in Mbctype.h.

Value of _`type`_

**`_mbbtype`** tests for

Return value

_`c`_

Any value except 1

Valid single byte or lead byte

`_MBC_SINGLE` (0)

Single byte (0x20 - 0x7E, 0xA1 - 0xDF)

Any value except 1

Valid single byte or lead byte

`_MBC_LEAD` (1)

Lead byte of multibyte character (0x81 - 0x9F, 0xE0 - 0xFC)

Any value except 1

Valid single-byte or lead byte

`_MBC_ILLEGAL` (-1)

Invalid character: not single or lead (0x00 - 0x1F, 0x7F, 0x80, 0xA0, 0xFD, 0xFE, 0xFF)

1

Valid trail byte

`_MBC_TRAIL` (2)

Trailing byte of multibyte character (0x40 - 0x7E, 0x80 - 0xFC)

1

Valid trail byte

`_MBC_ILLEGAL` (-1)

Invalid character: not trailing (0x00 - 0x3F, 0x7F, 0xFD, 0xFE, 0xFF)

The **`_mbbtype`** function determines the type of a byte in a multibyte character. If the value of _`type`_ is any value except 1, **`_mbbtype`** tests for a valid single-byte or lead byte of a multibyte character. If the value of _`type`_ is 1, **`_mbbtype`** tests for a valid trail byte of a multibyte character.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The **`_mbbtype`** version of this function uses the current locale for this locale-dependent behavior; the **`_mbbtype_l`** version is identical except that it uses the locale parameter that's passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

In earlier versions, **`_mbbtype`** was named `chkctype`. For new code, use **`_mbbtype`** instead.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

Optional header

**`_mbbtype`**

<mbstring.h>

<mbctype.h>\*

**`_mbbtype_l`**

<mbstring.h>

<mbctype.h>\*

\* For definitions of manifest constants that are used as return values.

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Byte classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/byte-classification?view=msvc-170)