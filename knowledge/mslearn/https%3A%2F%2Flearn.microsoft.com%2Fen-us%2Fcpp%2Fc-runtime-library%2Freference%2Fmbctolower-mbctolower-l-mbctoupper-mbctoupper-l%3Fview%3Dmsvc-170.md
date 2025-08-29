---
title: "_mbctolower, _mbctolower_l, _mbctoupper, _mbctoupper_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbctolower-mbctolower-l-mbctoupper-mbctoupper-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Tests and converts the case of a multibyte character.

## Syntax

```
unsigned int _mbctolower(
   unsigned int c
);
unsigned int _mbctolower_l(
   unsigned int c,
   _locale_t locale
);
unsigned int _mbctoupper(
   unsigned int c
);
unsigned int _mbctoupper_l(
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

Each of these functions returns the converted character _`c`_, if possible. Otherwise it returns the character _`c`_ unchanged.

The functions test a character _`c`_ and, if possible, apply one of the following conversions.

Routines

Converts

**`_mbctolower`**, **`_mbctolower_l`**

Uppercase character to lowercase character.

**`_mbctoupper`**, **`_mbctoupper_l`**

Lowercase character to uppercase character.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The version of this function without the `_l` suffix uses the current locale for this locale-dependent behavior; the version with the `_l` suffix is identical except that it uses the locale parameter passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

In previous versions, **`_mbctolower`** was called `jtolower`, and **`_mbctoupper`** was called `jtoupper`. For new code, use the new names instead.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_totlower`

`tolower`

**`_mbctolower`**

`towlower`

`_totlower_l`

`_tolower_l`

**`_mbctolower_l`**

`_towlower_t`

`_totupper`

`toupper`

**`_mbctoupper`**

`towupper`

`_totupper_l`

`toupper_l`

**`_mbctoupper_l`**

`_towupper_l`

## Requirements

Routines

Required header

**`_mbctolower`**, **`_mbctolower_l`**

<mbstring.h>

**`_mbctoupper`**, **`_mbctoupper_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[`_mbbtombc`, `_mbbtombc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbbtombc-mbbtombc-l?view=msvc-170)  
[`_mbcjistojms`, `_mbcjistojms_l`, `_mbcjmstojis`, `_mbcjmstojis_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbcjistojms-mbcjistojms-l-mbcjmstojis-mbcjmstojis-l?view=msvc-170)  
[`_mbctohira`, `_mbctohira_l`, `_mbctokata`, `_mbctokata_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbctohira-mbctohira-l-mbctokata-mbctokata-l?view=msvc-170)  
[`_mbctombb`, `_mbctombb_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbctombb-mbctombb-l?view=msvc-170)