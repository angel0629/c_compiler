---
title: "_mbcjistojms, _mbcjistojms_l, _mbcjmstojis, _mbcjmstojis_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbcjistojms-mbcjistojms-l-mbcjmstojis-mbcjmstojis-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts between Japan Industry Standard (JIS) and Japan Microsoft (JMS) characters.

## Syntax

```
unsigned int _mbcjistojms(
   unsigned int c
);
unsigned int _mbcjistojms_l(
   unsigned int c,
   _locale_t locale
);
unsigned int _mbcjmstojis(
   unsigned int c
);
unsigned int _mbcjmstojis_l(
   unsigned int c,
   _locale_t locale
);
```

### Parameters

_`c`_  
Character to convert.

_`locale`_  
Locale to use.

## Return value

On Japanese locale, these functions return a converted character or return 0 if no conversion is possible. On a non-Japanese locale, these functions return the character passed in.

The **`_mbcjistojms`** function converts a Japan Industry Standard (JIS) character to a Microsoft Kanji (Shift JIS) character. The character is converted only if the lead and trail bytes are in the range 0x21 - 0x7E. If the lead or trial byte is outside this range, `errno` is set to `EILSEQ`. For more information about this and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_mbcjmstojis`** function converts a Shift JIS character to a JIS character. The character is converted only if the lead byte is in the range 0x81 - 0x9F or 0xE0 - 0xFC and the trail byte is in the range 0x40 - 0x7E or 0x80 - 0xFC. Some code points in that range don't have a character assigned, and so can't be converted.

The value _`c`_ should be a 16-bit value whose upper 8 bits represent the lead byte of the character to convert and whose lower 8 bits represent the trail byte.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of these functions without the `_l` suffix use the current locale for this locale-dependent behavior; the versions with the `_l` suffix are identical except that they use the locale parameter passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

In earlier versions, **`_mbcjistojms`** and **`_mbcjmstojis`** were called `jistojms` and `jmstojis`, respectively. **`_mbcjistojms`**, **`_mbcjistojms_l`**, **`_mbcjmstojis`** and **`_mbcjmstojis_l`** should be used instead.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_mbcjistojms`**

<mbstring.h>

**`_mbcjistojms_l`**

<mbstring.h>

**`_mbcjmstojis`**

<mbstring.h>

**`_mbcjmstojis_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[`_ismbb` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbb-routines?view=msvc-170)