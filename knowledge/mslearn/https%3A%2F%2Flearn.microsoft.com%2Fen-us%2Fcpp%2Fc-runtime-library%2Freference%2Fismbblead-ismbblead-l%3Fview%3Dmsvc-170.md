---
title: "_ismbblead, _ismbblead_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbblead-ismbblead-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Tests a character to determine whether it's a lead byte of a multibyte character.

## Syntax

```
int _ismbblead(
   unsigned int c
);
int _ismbblead_l(
   unsigned int c,
   _locale_t locale
);
```

### Parameters

_`c`_  
Integer to be tested.

_`locale`_  
Locale to use.

## Return value

Returns a nonzero value if the integer _`c`_ is the first byte of a multibyte character.

Multibyte characters consist of a lead byte followed by a trailing byte. Lead bytes are distinguished by being in a particular range for a given character set. For example, in code page 932 only, lead bytes range from 0x81 - 0x9F and 0xE0 - 0xFC.

**`_ismbblead`** uses the current locale for locale-dependent behavior. **`_ismbblead_l`** is identical except that it uses the locale passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

When the locale is UTF-8, **`_ismbblead`** and **`_ismbblead_l`** always return 0 (false), whether _`c`_ is a lead byte or not.

**`_ismbblead`** and **`_ismbblead_l`** are Microsoft-specific, not part of the Standard C library. We don't recommend you use them where you want portable code. For Standard C compatibility, use `mbrlen` instead.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_istlead`

Always returns false

**`_ismbblead`**

Always returns false

## Requirements

Routine

Required header

Optional header

**`_ismbblead`**

<mbctype.h> or <mbstring.h>

<ctype.h>,\* <limits.h>, <stdlib.h>

**`_ismbblead_l`**

<mbctype.h> or <mbstring.h>

<ctype.h>,\* <limits.h>, <stdlib.h>

\* For manifest constants for the test conditions.

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Byte classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/byte-classification?view=msvc-170)  
[`_ismbb` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbb-routines?view=msvc-170)  
[`mbrlen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbrlen?view=msvc-170)