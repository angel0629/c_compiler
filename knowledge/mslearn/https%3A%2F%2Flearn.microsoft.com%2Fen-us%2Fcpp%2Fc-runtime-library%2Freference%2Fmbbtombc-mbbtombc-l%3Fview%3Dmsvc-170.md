---
title: "_mbbtombc, _mbbtombc_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbbtombc-mbbtombc-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a single-byte multibyte character to a corresponding double-byte multibyte character.

## Syntax

```
unsigned int _mbbtombc(
   unsigned int c
);
unsigned int _mbbtombc_l(
   unsigned int c,
   _locale_t locale
);
```

### Parameters

_`c`_  
Single-byte character to convert.

_`locale`_  
Locale to use.

## Return value

If **`_mbbtombc`** successfully converts _`c`_, it returns a multibyte character; otherwise, it returns _`c`_.

The **`_mbbtombc`** function converts a given single-byte multibyte character to a corresponding double-byte multibyte character. Characters must be within the range 0x20 - 0x7E or 0xA1 - 0xDF to be converted.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of this function are identical, except that **`_mbbtombc`** uses the current locale for this locale-dependent behavior and **`_mbbtombc_l`** instead uses the locale parameter that's passed in. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

In earlier versions, **`_mbbtombc`** was named `hantozen`. For new code, use **`_mbbtombc`**.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_mbbtombc`**

<mbstring.h>

**`_mbbtombc_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[`_mbctombb`, `_mbctombb_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbctombb-mbctombb-l?view=msvc-170)