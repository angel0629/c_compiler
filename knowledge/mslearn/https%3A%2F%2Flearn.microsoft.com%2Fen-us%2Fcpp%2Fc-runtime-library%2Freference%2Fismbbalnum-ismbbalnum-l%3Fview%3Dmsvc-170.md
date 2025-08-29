---
title: "_ismbbalnum, _ismbbalnum_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbalnum-ismbbalnum-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines whether a specified multibyte character is alpha or numeric.

## Syntax

```
int _ismbbalnum(
   unsigned int c
);
int _ismbbalnum_l(
   unsigned int c
);
```

### Parameters

_`c`_  
Integer to be tested.

_`locale`_  
Locale to use.

## Return value

**`_ismbbalnum`** returns a nonzero value when the expression:

`isalnum(c) || _ismbbkalnum(c)`

is nonzero for _`c`_, or 0 when the expression is zero.

The version of this function with the `_l` suffix is identical except that it uses the locale passed in instead of the current locale for its locale-dependent behavior.

## Remarks

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_ismbbalnum`**

<mbctype.h>

**`_ismbbalnum_l`**

<mbctype.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[Byte classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/byte-classification?view=msvc-170)  
[`_ismbb` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbb-routines?view=msvc-170)