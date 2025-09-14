---
title: "towctrans"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/towctrans?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Transforms a character.

## Syntax

```
wint_t towctrans(
   wint_t c,
   wctrans_t category
);
```

### Parameters

_`c`_  
The character you want to transform.

_`category`_  
An identifier that contains the return value of [`wctrans`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctrans?view=msvc-170).

## Return value

The character _`c`_, after **`towctrans`** used the transform rule in _`category`_.

## Remarks

The value of _`category`_ must have been returned by an earlier successful call to [`wctrans`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctrans?view=msvc-170).

## Requirements

Routine

Required header

**`towctrans`**

<wctype.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See `wctrans` for a sample that uses **`towctrans`**.

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)