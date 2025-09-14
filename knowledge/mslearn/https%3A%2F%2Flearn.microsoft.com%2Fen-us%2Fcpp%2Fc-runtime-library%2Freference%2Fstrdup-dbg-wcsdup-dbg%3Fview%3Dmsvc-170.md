---
title: "_strdup_dbg, _wcsdup_dbg"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdup-dbg-wcsdup-dbg?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Versions of [`_strdup` and `_wcsdup`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdup-wcsdup-mbsdup?view=msvc-170) that use the debug version of `malloc`.

## Syntax

```
char *_strdup_dbg(
   const char *strSource,
   int blockType,
   const char *filename,
   int linenumber
);
wchar_t *_wcsdup_dbg(
   const wchar_t *strSource,
   int blockType,
   const char *filename,
   int linenumber
);
```

### Parameters

_`strSource`_  
Null-terminated source string.

_`blockType`_  
Requested type of memory block: `_CLIENT_BLOCK` or `_NORMAL_BLOCK`.

_`filename`_  
Pointer to name of source file that requested allocation operation or `NULL`.

_`linenumber`_  
Line number in source file where allocation operation was requested or `NULL`.

## Return value

Each of these functions returns a pointer to the storage location for the copied string or `NULL` if storage can't be allocated.

The **`_strdup_dbg`** and **`_wcsdup_dbg`** functions are identical to `_strdup` and `_wcsdup` except that, when `_DEBUG` is defined, these functions use the debug version of `malloc`, `_malloc_dbg`, to allocate memory for the duplicated string. For information on the debugging features of `_malloc_dbg`, see [`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170).

You don't need to call these functions explicitly in most cases. Instead, you can define the flag `_CRTDBG_MAP_ALLOC`. When `_CRTDBG_MAP_ALLOC` is defined, calls to `_strdup` and `_wcsdup` are remapped to **`_strdup_dbg`** and **`_wcsdup_dbg`**, respectively, with the _`blockType`_ set to `_NORMAL_BLOCK`. Thus, you don't need to call these functions explicitly unless you want to mark the heap blocks as `_CLIENT_BLOCK`. For more information on block types, see [Types of blocks on the debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#types-of-blocks-on-the-debug-heap).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsdup_dbg`

**`_strdup_dbg`**

`_mbsdup`

**`_wcsdup_dbg`**

## Requirements

Routine

Required header

**`_strdup_dbg`**, **`_wcsdup_dbg`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All debug versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`_strdup`, `_wcsdup`, `_mbsdup`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdup-wcsdup-mbsdup?view=msvc-170)  
[Debug versions of heap allocation functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-versions-of-heap-allocation-functions?view=msvc-170)