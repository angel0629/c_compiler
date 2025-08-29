---
title: "tolower, _tolower, towlower, _tolower_l, _towlower_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tolower-tolower-towlower-tolower-l-towlower-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a character to lowercase.

## Syntax

```
int tolower(
   int c
);
int _tolower(
   int c
);
int towlower(
   wint_t c
);
int _tolower_l(
   int c,
   _locale_t locale
);
int _towlower_l(
   wint_t c,
   _locale_t locale
);
```

### Parameters

_`c`_  
Character to convert.

_`locale`_  
Locale to use for locale-specific translation.

## Return value

Each of these routines converts a copy of _`c`_ to lower case if the conversion is possible, and returns the result. There's no return value reserved to indicate an error.

Each of these routines converts a given uppercase letter to a lowercase letter if it's possible and relevant. The case conversion of **`towlower`** is locale-specific. Only the characters relevant to the current locale are changed in case. The functions without the `_l` suffix use the currently set locale. The versions of these functions that have the `_l` suffix take the locale as a parameter and use that instead of the currently set locale. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

In order for **`_tolower`** to give the expected results, [`__isascii`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isascii-isascii-iswascii?view=msvc-170) and [`isupper`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isupper-isupper-l-iswupper-iswupper-l?view=msvc-170) must both return nonzero.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_totlower`

**`tolower`**

`_mbctolower`

**`towlower`**

`_totlower_l`

**`_tolower_l`**

`_mbctolower_l`

**`_towlower_l`**

Note

**`_tolower_l`** and **`_towlower_l`** have no locale dependence and are not meant to be called directly. They are provided for internal use by **`_totlower_l`**.

## Requirements

Routine

Required header

**`tolower`**

<ctype.h>

**`_tolower`**

<ctype.h>

**`towlower`**

<ctype.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example in [`to` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/to-functions?view=msvc-170).

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)  
[`to` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/to-functions?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)