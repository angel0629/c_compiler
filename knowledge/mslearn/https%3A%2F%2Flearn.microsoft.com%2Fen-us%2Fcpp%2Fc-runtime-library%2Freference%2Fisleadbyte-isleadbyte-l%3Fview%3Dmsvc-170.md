---
title: "isleadbyte, _isleadbyte_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isleadbyte-isleadbyte-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines whether a character is the lead byte of a multibyte character.

## Syntax

```
int isleadbyte( int c );
int _isleadbyte_l( int c );
```

### Parameters

_`c`_  
Integer to test.

## Return value

**`isleadbyte`** returns a nonzero value if the argument satisfies the test condition. Otherwise, it returns 0. In the "C" locale and in single-byte character set (SBCS) locales, **`isleadbyte`** always returns 0.

The **`isleadbyte`** macro returns a nonzero value if its argument is the first byte of a multibyte character. **`isleadbyte`** produces a meaningful result for any integer argument from -1 (`EOF`) to `UCHAR_MAX` (0xFF), inclusive.

The expected argument type of **`isleadbyte`** is **`int`**; if a signed character is passed, the compiler may convert it to an integer by sign extension, yielding unpredictable results.

The version of this function with the `_l` suffix is identical except that it uses the locale passed in instead of the current locale for its locale-dependent behavior.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_istleadbyte`**

Always returns false

**`_isleadbyte`**

Always returns false

## Requirements

Routine

Required header

**`isleadbyte`**

<ctype.h>

**`_isleadbyte_l`**

<ctype.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Byte classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/byte-classification?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`_ismbb` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbb-routines?view=msvc-170)