---
title: "btowc"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/btowc?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determine whether an integer represents a valid single-byte character in the initial shift state.

## Syntax

```
wint_t btowc(
   int character
);
```

### Parameters

_`character`_  
Integer to test.

## Return value

Returns the wide-character representation of the character if the integer represents a valid single-byte character in the initial shift state. Returns `WEOF` if the integer is `EOF` or isn't a valid single-byte character in the initial shift state. The output of this function is affected by the current `LC_TYPE` locale.

## Remarks

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`btowc`**

<stdio.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[`mbtowc`, `_mbtowc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbtowc-mbtowc-l?view=msvc-170)