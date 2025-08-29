---
title: "isascii, __isascii, iswascii"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isascii-isascii-iswascii?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines whether a particular character is an ASCII character.

## Syntax

```
int __isascii(
   int c
);
int iswascii(
   wint_t c
);

#define isascii __isascii
```

### Parameters

_`c`_  
Integer to test.

## Return value

Each of these routines returns nonzero if _`c`_ is a particular representation of an ASCII character. **`__isascii`** returns a nonzero value if _`c`_ is an ASCII character (in the range 0x00 - 0x7F). **`iswascii`** returns a nonzero value if _`c`_ is a wide-character representation of an ASCII character. Each of these routines returns 0 if _`c`_ doesn't satisfy the test condition.

Both **`__isascii`** and **`iswascii`** are implemented as macros unless the preprocessor macro `_CTYPE_DISABLE_MACROS` is defined.

For backward compatibility, **`isascii`** is implemented as a macro only if [`__STDC__`](https://learn.microsoft.com/en-us/cpp/preprocessor/predefined-macros?view=msvc-170) isn't defined or is defined as 0; otherwise it's undefined.

By default, this function's global state is scoped to the application. To change this scope, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_istascii`**

**`__isascii`**

**`__isascii`**

**`iswascii`**

## Requirements

Routine

Required header

**`isascii`**, **`__isascii`**

C: <ctype.h>

C++: <cctype> or <ctype.h>

**`iswascii`**

C: <wctype.h>, <ctype.h>, or <wchar.h>

C++: <cwctype>, <cctype>, <wctype.h>, <ctype.h>, or <wchar.h>

The **`isascii`**, **`__isascii`**, and **`iswascii`** functions are Microsoft-specific. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Character classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/character-classification?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)