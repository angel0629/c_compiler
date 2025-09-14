---
title: "_fullpath_dbg, _wfullpath_dbg"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fullpath-dbg-wfullpath-dbg?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Versions of [`_fullpath`, `_wfullpath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fullpath-wfullpath?view=msvc-170) that use the debug version of `malloc` to allocate memory.

## Syntax

```
char *_fullpath_dbg(
   char *absPath,
   const char *relPath,
   size_t maxLength,
   int blockType,
   const char *filename,
   int linenumber
);
wchar_t *_wfullpath_dbg(
   wchar_t *absPath,
   const wchar_t *relPath,
   size_t maxLength,
   int blockType,
   const char *filename,
   int linenumber
);
```

### Parameters

_`absPath`_  
Pointer to a buffer containing the absolute or full path name, or `NULL`.

_`relPath`_  
Relative path name.

_`maxLength`_  
Maximum length of the absolute path name buffer (_`absPath`_). This length is in bytes for **`_fullpath_dbg`** but in wide characters (**`wchar_t`**) for **`_wfullpath_dbg`**.

_`blockType`_  
Requested type of memory block: `_CLIENT_BLOCK` or `_NORMAL_BLOCK`.

_`filename`_  
Pointer to the name of the source file that requested allocation operation or `NULL`.

_`linenumber`_  
Line number in the source file where the allocation operation was requested or `NULL`.

## Return value

Each function returns a pointer to a buffer containing the absolute path name (_`absPath`_). If there's an error (for example, if the value passed in _`relPath`_ includes a drive letter that isn't valid or can't be found, or if the length of the created absolute path name (_`absPath`_) is greater than _`maxLength`_) the function returns `NULL`.

The **`_fullpath_dbg`** and **`_wfullpath_dbg`** functions are identical to `_fullpath` and `_wfullpath` except that, when `_DEBUG` is defined, these functions use the debug version of `malloc`, `_malloc_dbg`, to allocate memory if `NULL` is passed as the first parameter. For information on the debugging features of `_malloc_dbg`, see [`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170).

You don't need to call these functions explicitly in most cases. Instead, you can define the `_CRTDBG_MAP_ALLOC` flag. When `_CRTDBG_MAP_ALLOC` is defined, calls to `_fullpath` and `_wfullpath` are remapped to **`_fullpath_dbg`** and **`_wfullpath_dbg`**, respectively, with the _`blockType`_ set to `_NORMAL_BLOCK`. Thus, you don't need to call these functions explicitly unless you want to mark the heap blocks as `_CLIENT_BLOCK`. For more information, see [Types of blocks on the debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#types-of-blocks-on-the-debug-heap).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tfullpath_dbg`

**`_fullpath_dbg`**

**`_fullpath_dbg`**

**`_wfullpath_dbg`**

## Requirements

Function

Required header

**`_fullpath_dbg`**

<crtdbg.h>

**`_wfullpath_dbg`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`_fullpath`, `_wfullpath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fullpath-wfullpath?view=msvc-170)  
[Debug versions of heap allocation functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-versions-of-heap-allocation-functions?view=msvc-170)