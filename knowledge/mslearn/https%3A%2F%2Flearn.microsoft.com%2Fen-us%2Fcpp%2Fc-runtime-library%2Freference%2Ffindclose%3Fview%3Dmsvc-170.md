---
title: "_findclose"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/findclose?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Closes the specified search handle and releases associated resources.

## Syntax

```
int _findclose(
   intptr_t handle
);
```

### Parameters

_`handle`_  
The search handle returned by a previous call to `_findfirst`.

## Return value

If successful, **`_findclose`** returns 0. Otherwise, it returns -1 and sets `errno` to `ENOENT`, indicating that no more matching files could be found.

## Remarks

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`_findclose`**

<io.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[System calls](https://learn.microsoft.com/en-us/cpp/c-runtime-library/system-calls?view=msvc-170)  
[Filename search functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/filename-search-functions?view=msvc-170)