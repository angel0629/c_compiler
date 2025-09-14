---
title: "_ismbslead, _ismbstrail, _ismbslead_l, _ismbstrail_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbslead-ismbstrail-ismbslead-l-ismbstrail-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Performs context-sensitive tests for multibyte-character-string lead bytes and trail bytes and determines whether a given substring pointer points to a lead byte or a trail byte.

## Syntax

```
int _ismbslead(
   const unsigned char *str,
   const unsigned char *current
);
int _ismbstrail(
   const unsigned char *str,
   const unsigned char *current
);
int _ismbslead_l(
   const unsigned char *str,
   const unsigned char *current,
   _locale_t locale
);
int _ismbstrail_l(
   const unsigned char *str,
   const unsigned char *current,
   _locale_t locale
);
```

### Parameters

_`str`_  
Pointer to the start of the string or the previous known lead byte.

_`current`_  
Pointer to the position in the string to be tested.

_`locale`_  
The locale to use.

## Return value

**`_ismbslead`** returns -1 if the character is a lead byte and **`_ismbstrail`** returns -1 if the character is a trail byte. If the input strings are valid but aren't a lead byte or trail byte, these functions return zero. If either argument is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return `NULL` and set `errno` to `EINVAL`.

**`_ismbslead`** and **`_ismbstrail`** are slower than the **`_ismbblead`** and **`_ismbbtrail`** versions because they take the string context into account.

The versions of these functions that have the `_l` suffix are identical except that for their locale-dependent behavior they use the locale that's passed in instead of the current locale. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

Optional header

**`_ismbslead`**

<mbctype.h> or <mbstring.h>

<ctype.h>,\* <limits.h>, <stdlib.h>

**`_ismbstrail`**

<mbctype.h> or <mbstring.h>

<ctype.h>,\* <limits.h>, <stdlib.h>

**`_ismbslead_l`**

<mbctype.h> or <mbstring.h>

<ctype.h>,\* <limits.h>, <stdlib.h>

**`_ismbstrail_l`**

<mbctype.h> or <mbstring.h>

<ctype.h>,\* <limits.h>, <stdlib.h>

\* For manifest constants for the test conditions.

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Character classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/character-classification?view=msvc-170)  
[`_ismbc` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbc-routines?view=msvc-170)  
[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)  
[`_ismbb` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbb-routines?view=msvc-170)