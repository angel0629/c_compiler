---
title: "_get_pgmptr"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-pgmptr?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets the current value of the `_pgmptr` global variable.

## Syntax

```
errno_t _get_pgmptr(
   char **pValue
);
```

### Parameters

_`pValue`_  
A pointer to a string to be filled with the current value of the `_pgmptr` variable.

## Return value

Returns zero if successful; an error code on failure. If _`pValue`_ is `NULL`, the invalid parameter handler is invoked as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function sets `errno` to `EINVAL` and returns `EINVAL`.

## Remarks

Only call **`_get_pgmptr`** if your program has a narrow entry point, like **main()** or **WinMain()**. The `_pgmptr` global variable contains the full path to the executable associated with the process. For more information, see [`_pgmptr`, `_wpgmptr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/pgmptr-wpgmptr?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_get_pgmptr`**

<stdlib.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[`_get_wpgmptr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-wpgmptr?view=msvc-170)