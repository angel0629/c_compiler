---
title: "iscsym, iscsymf, __iscsym, __iswcsym, __iscsymf, __iswcsymf, _iscsym_l, _iswcsym_l, _iscsymf_l, _iswcsymf_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/iscsym-functions?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determine if an integer represents a character that may be used in an identifier.

## Syntax

```
int __iscsym(
   int c
);
int __iswcsym(
   wint_t c
);
int __iscsymf(
   int c
);
int __iswcsymf(
   wint_t c
);
int _iscsym_l(
   int c,
   _locale_t locale
);
int _iswcsym_l(
   wint_t c,
   _locale_t locale
);
int _iscsymf_l(
   int c,
   _locale_t locale
);
int _iswcsymf_l(
   wint_t c,
   _locale_t locale
);
#define iscsym __iscsym
#define iscsymf __iscsymf
```

### Parameters

_`c`_  
Integer to test. _`c`_ should be in the range of 0-255 for the narrow character version of the function.

_`locale`_  
The locale to use.

## Return value

Both **`__iscsym`** and **`__iswcsym`** return a nonzero value if _`c`_ is a letter, underscore, or digit. Both **`__iscsymf`** and **`__iswcsymf`** return a nonzero value if _`c`_ is a letter or an underscore. Each of these routines returns 0 if _`c`_ doesn't satisfy the test condition. The versions of these functions with the `_l` suffix are identical except that they use the _`locale`_ passed in instead of the current locale for their locale-dependent behavior. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

These routines are defined as macros unless the preprocessor macro \_CTYPE\_DISABLE\_MACROS is defined. When you use the macro versions of these routines, the arguments can be evaluated more than once. Be careful when you use expressions that have side effects within the argument list.

For backward compatibility, **`iscsym`** and **`iscsymf`** are defined as macros only when [`__STDC__`](https://learn.microsoft.com/en-us/cpp/preprocessor/predefined-macros?view=msvc-170) isn't defined or is defined as 0; otherwise they're undefined.

## Requirements

Routine

Required header

**`iscsym`**, **`iscsymf`**, **`__iscsym`**, **`__iswcsym`**, **`__iscsymf`**, **`__iswcsymf`**, **`_iscsym_l`**, **`_iswcsym_l`**, **`_iscsymf_l`**, **`_iswcsymf_l`**

C: <ctype.h>

C++: <cctype> or <ctype.h>

The **`iscsym`**, **`iscsymf`**, **`__iscsym`**, **`__iswcsym`**, **`__iscsymf`**, **`__iswcsymf`**, **`_iscsym_l`**, **`_iswcsym_l`**, **`_iscsymf_l`**, and **`_iswcsymf_l`** routines are Microsoft-specific. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Character classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/character-classification?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)