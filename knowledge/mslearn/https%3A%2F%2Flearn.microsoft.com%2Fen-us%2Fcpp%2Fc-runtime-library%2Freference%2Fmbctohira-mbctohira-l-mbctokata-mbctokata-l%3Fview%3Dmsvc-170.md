---
title: "_mbctohira, _mbctohira_l, _mbctokata, _mbctokata_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbctohira-mbctohira-l-mbctokata-mbctokata-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts between hiragana and katakana characters.

## Syntax

```
unsigned int _mbctohira(
   unsigned int c
);
unsigned int _mbctohira_l(
   unsigned int c,
   _locale_t locale
);
unsigned int _mbctokata(
   unsigned int c
);
unsigned int _mbctokata_l(
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

The **`_mbctohira`** and **`_mbctokata`** functions test a character _`c`_ and, if possible, apply one of the following conversions.

Routines

Converts

**`_mbctohira`**, **`_mbctohira_l`**

Multibyte katakana to multibyte hiragana.

**`_mbctokata`**, **`_mbctokata_l`**

Multibyte hiragana to multibyte katakana.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of these functions are identical, except that the ones that don't have the `_l` suffix use the current locale for this locale-dependent behavior and the ones that do have the `_l` suffix instead use the locale parameter that's passed in. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

In earlier versions, **`_mbctohira`** was named `jtohira` and **`_mbctokata`** was named `jtokata`. For new code, use the new names.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_mbctohira`**

<mbstring.h>

**`_mbctohira_l`**

<mbstring.h>

**`_mbctokata`**

<mbstring.h>

**`_mbctokata_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[`_mbcjistojms`, `_mbcjistojms_l`, `_mbcjmstojis`, `_mbcjmstojis_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbcjistojms-mbcjistojms-l-mbcjmstojis-mbcjmstojis-l?view=msvc-170)  
[`_mbctolower`, `_mbctolower_l`, `_mbctoupper`, `_mbctoupper_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbctolower-mbctolower-l-mbctoupper-mbctoupper-l?view=msvc-170)  
[`_mbctombb`, `_mbctombb_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbctombb-mbctombb-l?view=msvc-170)