---
title: "_tempnam_dbg, _wtempnam_dbg"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tempnam-dbg-wtempnam-dbg?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Function versions of [`_tempnam`, `_wtempnam`, `tmpnam`, `_wtmpnam`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tempnam-wtempnam-tmpnam-wtmpnam?view=msvc-170) that use the debug version of `malloc`, `_malloc_dbg`.

## Syntax

```
char *_tempnam_dbg(
   const char *dir,
   const char *prefix,
   int blockType,
   const char *filename,
   int linenumber
);
wchar_t *_wtempnam_dbg(
   const wchar_t *dir,
   const wchar_t *prefix,
   int blockType,
   const char *filename,
   int linenumber
);
```

### Parameters

_`dir`_  
The path used in the file name if there's no TMP environment variable, or if TMP isn't a valid directory.

_`prefix`_  
The string that will be pre-pended to names returned by `_tempnam`.

_`blockType`_  
Requested type of memory block: `_CLIENT_BLOCK` or `_NORMAL_BLOCK`.

_`filename`_  
Pointer to name of source file that requested allocation operation or `NULL`.

_`linenumber`_  
Line number in source file where allocation operation was requested or `NULL`.

## Return value

Each function returns a pointer to the name generated or `NULL` if there's a failure. Failure can occur if there's an invalid directory name specified in the TMP environment variable and in the _`dir`_ parameter.

Note

`free` (or `free_dbg`) does need to be called for pointers allocated by **`_tempnam_dbg`** and **`_wtempnam_dbg`**.

The **`_tempnam_dbg`** and **`_wtempnam_dbg`** functions are identical to `_tempnam` and `_wtempnam` except that, when `_DEBUG` is defined, these functions use the debug version of `malloc` and `_malloc_dbg`, to allocate memory if `NULL` is passed as the first parameter. For more information, see [`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170).

You don't need to call these functions explicitly in most cases. Instead, you can define the flag `_CRTDBG_MAP_ALLOC`. When `_CRTDBG_MAP_ALLOC` is defined, calls to `_tempnam` and `_wtempnam` are remapped to **`_tempnam_dbg`** and **`_wtempnam_dbg`**, respectively, with the _`blockType`_ set to `_NORMAL_BLOCK`. Thus, you don't need to call these functions explicitly unless you want to mark the heap blocks as `_CLIENT_BLOCK`. For more information, see [Types of blocks on the debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#types-of-blocks-on-the-debug-heap).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_ttempnam_dbg`

**`_tempnam_dbg`**

**`_tempnam_dbg`**

**`_wtempnam_dbg`**

## Requirements

Routine

Required header

**`_tempnam_dbg`**, **`_wtempnam_dbg`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[`_tempnam`, `_wtempnam`, `tmpnam`, `_wtmpnam`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tempnam-wtempnam-tmpnam-wtmpnam?view=msvc-170)  
[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[Debug versions of heap allocation functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-versions-of-heap-allocation-functions?view=msvc-170)