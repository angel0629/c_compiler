---
title: "_mbsbtype, _mbsbtype_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsbtype-mbsbtype-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns the type of byte within a string.

## Syntax

```
int _mbsbtype(
   const unsigned char *mbstr,
   size_t count
);
int _mbsbtype_l(
   const unsigned char *mbstr,
   size_t count,
   _locale_t locale
);
```

### Parameters

_`mbstr`_  
Address of a sequence of multibyte characters.

_`count`_  
Byte offset from head of string.

_`locale`_  
Locale to use.

## Return value

**`_mbsbtype`** and **`_mbsbtype_l`** returns an integer value indicating the result of the test on the specified byte. The manifest constants in the following table are defined in Mbctype.h.

Return value

Byte type

`_MBC_SINGLE` (0)

Single-byte character. For example, in code page 932, **`_mbsbtype`** returns 0 if the specified byte is within the range 0x20 - 0x7E or 0xA1 - 0xDF.

`_MBC_LEAD` (1)

Lead byte of multibyte character. For example, in code page 932, **`_mbsbtype`** returns 1 if the specified byte is within the range 0x81 - 0x9F or 0xE0 - 0xFC.

`_MBC_TRAIL` (2)

Trailing byte of multibyte character. For example, in code page 932, **`_mbsbtype`** returns 2 if the specified byte is within the range 0x40 - 0x7E or 0x80 - 0xFC.

`_MBC_ILLEGAL` (-1)

`NULL` string, invalid character, or null byte found before the byte at offset _`count`_ in _`mbstr`_.

The **`_mbsbtype`** function determines the type of a byte in a multibyte character string. The function examines only the byte at offset _`count`_ in _`mbstr`_, ignoring invalid characters before the specified byte.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The version of this function without the `_l` suffix uses the current locale for this locale-dependent behavior; the version with the `_l` suffix is identical except that it uses the locale parameter passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

If the input string is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the function returns `_MBC_ILLEGAL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

Optional header

**`_mbsbtype`**

<mbstring.h>

<mbctype.h>\*

**`_mbsbtype_l`**

<mbstring.h>

<mbctype.h>\*

\* For manifest constants used as return values.

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Byte classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/byte-classification?view=msvc-170)