---
title: "_ismbbgraph, _ismbbgraph_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbgraph-ismbbgraph-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines whether a particular multibyte character is a graphical character.

## Syntax

```
int _ismbbgraph (
   unsigned int c
);
int _ismbbgraph_l (
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

Returns a nonzero value when the expression:

`isctype(c, ( _PUNCT | _UPPER | _LOWER | _DIGIT )) || _ismbbkprint(c)`

is nonzero for _`c`_, or 0 when it's zero. **`_ismbbgraph`** uses the current locale for any locale-dependent behavior. **`_ismbbgraph_l`** is identical except that it uses the locale passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

## Remarks

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_ismbbgraph`**

<mbctype.h>

**`_ismbbgraph_l`**

<mbctype.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[Byte classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/byte-classification?view=msvc-170)  
[`_ismbb` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbb-routines?view=msvc-170)