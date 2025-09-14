---
title: "_get_fmode"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-fmode?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets the default file translation mode for file I/O operations.

## Syntax

```
errno_t _get_fmode(
   int * pmode
);
```

### Parameters

_`pmode`_  
A pointer to an integer to be filled with the current default mode: `_O_TEXT` or `_O_BINARY`.

## Return value

Returns zero if successful; an error code on failure. If _`pmode`_ is `NULL`, the invalid parameter handler is invoked as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the function returns `EINVAL`.

## Remarks

The function gets the value of the [`_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/fmode?view=msvc-170) global variable. This variable specifies the default file translation mode for both low-level and stream file I/O operations, such as `_open`, `_pipe`, `fopen`, and [`freopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freopen-wfreopen?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

Optional header

**`_get_fmode`**

<stdlib.h>

<fcntl.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example in [`_set_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-fmode?view=msvc-170).

## See also

[`_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/fmode?view=msvc-170)  
[`_set_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-fmode?view=msvc-170)  
[`_setmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmode?view=msvc-170)  
[Text and binary mode file I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/text-and-binary-mode-file-i-o?view=msvc-170)