---
title: "_getdcwd_dbg, _wgetdcwd_dbg"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdcwd-dbg-wgetdcwd-dbg?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Debug versions of the [`_getdcwd`, `_wgetdcwd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdcwd-wgetdcwd?view=msvc-170) functions (only available during debug).

## Syntax

```
char *_getdcwd_dbg(
   int drive,
   char *buffer,
   int maxlen,
   int blockType,
   const char *filename,
   int linenumber
);
wchar_t *_wgetdcwd_dbg(
   int drive,
   wchar_t *buffer,
   int maxlen,
   int blockType,
   const char *filename,
   int linenumber
);
```

### Parameters

_`drive`_  
Name of the disk drive.

_`buffer`_  
Storage location for the path.

_`maxlen`_  
Maximum length of the path in characters: **`char`** for **`_getdcwd_dbg`** and **`wchar_t`** for **`_wgetdcwd_dbg`**.

_`blockType`_  
Requested type of the memory block: `_CLIENT_BLOCK` or `_NORMAL_BLOCK`.

_`filename`_  
Pointer to the name of the source file that requested the allocation operation or `NULL`.

_`linenumber`_  
Line number in the source file where the allocation operation was requested or `NULL`.

## Return value

Returns a pointer to _`buffer`_. A `NULL` return value indicates an error, and `errno` is set either to `ENOMEM`, indicating that there's insufficient memory to allocate _`maxlen`_ bytes (when a `NULL` argument is given as _`buffer`_), or to `ERANGE`, indicating that the path is longer than _`maxlen`_ characters. For more information, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_getdcwd_dbg`** and **`_wgetdcwd_dbg`** functions are identical to `_getdcwd` and `_wgetdcwd` except that, when `_DEBUG` is defined, these functions use the debug version of `malloc` and `_malloc_dbg` to allocate memory if `NULL` is passed as the _`buffer`_ parameter. For more information, see [`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170).

You don't need to call these functions explicitly in most cases. Instead, you can define the `_CRTDBG_MAP_ALLOC` flag. When `_CRTDBG_MAP_ALLOC` is defined, calls to `_getdcwd` and `_wgetdcwd` are remapped to **`_getdcwd_dbg`** and **`_wgetdcwd_dbg`**, respectively, with the _`blockType`_ set to `_NORMAL_BLOCK`. Thus, you don't need to call these functions explicitly unless you want to mark the heap blocks as `_CLIENT_BLOCK`. For more information, see [Types of blocks on the debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#types-of-blocks-on-the-debug-heap).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_tgetdcwd_dbg`**

**`_getdcwd_dbg`**

**`_getdcwd_dbg`**

**`_wgetdcwd_dbg`**

## Requirements

Routine

Required header

**`_getdcwd_dbg`**

<crtdbg.h>

**`_wgetdcwd_dbg`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[`_getdcwd`, `_wgetdcwd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdcwd-wgetdcwd?view=msvc-170)  
[Directory control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/directory-control?view=msvc-170)  
[Debug versions of heap allocation functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-versions-of-heap-allocation-functions?view=msvc-170)