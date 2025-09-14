---
title: "fwide"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fwide?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Unimplemented.

## Syntax

```
int fwide(
   FILE *stream,
   int mode
);
```

### Parameters

_`stream`_  
Pointer to `FILE` structure (ignored).

_`mode`_  
The new width of the stream: positive for wide character, negative for byte, zero to leave unchanged. (This value is ignored.)

## Return value

This function currently just returns _`mode`_.

## Remarks

The current version of this function doesn't conform to the C Standard.

## Requirements

Function

Required header

**`fwide`**

<wchar.h>

For more information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).