---
title: "toupper, _toupper, towupper, _toupper_l, _towupper_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/toupper-toupper-towupper-toupper-l-towupper-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Convert character to uppercase.

## Syntax

```
int toupper(
   int c
);
int _toupper(
   int c
);
int towupper(
   wint_t c
);
int _toupper_l(
   int c ,
   _locale_t locale
);
int _towupper_l(
   wint_t c ,
   _locale_t locale
);
```

### Parameters

_`c`_  
Character to convert.

_`locale`_  
Locale to use.

## Return value

Each of these routines converts a copy of _`c`_, if possible, and returns the result.

If _`c`_ is a wide character for which `iswlower` is nonzero and there's a corresponding wide character for which [`iswupper`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isupper-isupper-l-iswupper-iswupper-l?view=msvc-170) is nonzero, **`towupper`** returns the corresponding wide character; otherwise, **`towupper`** returns _`c`_ unchanged.

There's no return value reserved to indicate an error.

Each of these routines converts a given lowercase letter to an uppercase letter if possible and appropriate. The case conversion of **`towupper`** is locale-specific. Only the characters relevant to the current locale are changed in case. The functions without the `_l` suffix use the currently set locale. The versions of these functions with the `_l` suffix take the locale as a parameter and use that instead of the currently set locale. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

For **`toupper`** to give the expected results, [`__isascii`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isascii-isascii-iswascii?view=msvc-170) must return nonzero.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_totupper`

**`toupper`**

**`_mbctoupper`**

**`towupper`**

`_totupper_l`

**`_toupper_l`**

**`_mbctoupper_l`**

**`_towupper_l`**

Note

**`_toupper_l`** and **`_towupper_l`** have no locale dependence and are not meant to be called directly. They are provided for internal use by **`_totupper_l`**.

## Requirements

Routine

Required header

**`toupper`**

<ctype.h>

**`_toupper`**

<ctype.h>

**`towupper`**

<ctype.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example in [`to` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/to-functions?view=msvc-170).

## See also

[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)  
[`to` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/to-functions?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)