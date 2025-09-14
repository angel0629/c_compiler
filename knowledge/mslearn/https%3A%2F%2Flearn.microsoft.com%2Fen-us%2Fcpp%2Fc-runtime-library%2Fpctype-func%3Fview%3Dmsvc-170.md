---
title: "__pctype_func"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/pctype-func?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Retrieves a pointer to an array of character classification information.

## Syntax

```
const unsigned short *__pctype_func(
   )
```

## Return value

A pointer to an array of character classification information.

## Remarks

The information in the character classification table is for internal use only, and is used by various functions that classify characters of type **`char`**. For more information, see the `Remarks` section of [`_pctype`, `_pwctype`, `_wctype`, `_mbctype`, `_mbcasemap`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/pctype-pwctype-wctype-mbctype-mbcasemap?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`__pctype_func`**

`<ctype.h>`

## See also

[`_pctype`, `_pwctype`, `_wctype`, `_mbctype`, `_mbcasemap`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/pctype-pwctype-wctype-mbctype-mbcasemap?view=msvc-170)