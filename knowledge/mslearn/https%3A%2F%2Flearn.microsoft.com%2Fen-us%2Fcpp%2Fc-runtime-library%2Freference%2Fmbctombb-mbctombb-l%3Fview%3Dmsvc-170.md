---
title: "_mbctombb, _mbctombb_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbctombb-mbctombb-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a double-byte multibyte character to a corresponding single-byte multibyte character.

## Syntax

```
unsigned int _mbctombb(
   unsigned int c
);
unsigned int _mbctombb_l(
   unsigned int c,
   _locale_t locale
);
```

### Parameters

_`c`_  
Multibyte character to convert.

_`locale`_  
Locale to use.

## Return value

If successful, **`_mbctombb`** and **`_mbctombb_l`** returns the single-byte character that corresponds to _`c`_; otherwise it returns _`c`_.

The **`_mbctombb`** and **`_mbctombb_l`** functions convert a given multibyte character to a corresponding single-byte multibyte character. Characters must correspond to single-byte characters within the range 0x20 - 0x7E or 0xA1 - 0xDF to be converted.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The version of this function without the `_l` suffix uses the current locale for this locale-dependent behavior; the version with the `_l` suffix is identical except that it uses the locale parameter passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

In previous versions, **`_mbctombb`** was called `zentohan`. Use **`_mbctombb`** instead.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_mbctombb`**

<mbstring.h>

**`_mbctombb_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[`_mbbtombc`, `_mbbtombc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbbtombc-mbbtombc-l?view=msvc-170)  
[`_mbcjistojms`, `_mbcjistojms_l`, `_mbcjmstojis`, `_mbcjmstojis_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbcjistojms-mbcjistojms-l-mbcjmstojis-mbcjmstojis-l?view=msvc-170)  
[`_mbctohira`, `_mbctohira_l`, `_mbctokata`, `_mbctokata_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbctohira-mbctohira-l-mbctokata-mbctokata-l?view=msvc-170)  
[`_mbctolower`, `_mbctolower_l`, `_mbctoupper`, `_mbctoupper_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbctolower-mbctolower-l-mbctoupper-mbctoupper-l?view=msvc-170)