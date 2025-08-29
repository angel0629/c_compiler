---
title: "_getcwd_dbg, _wgetcwd_dbg"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getcwd-dbg-wgetcwd-dbg?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Debug versions of the [`_getcwd`, `_wgetcwd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getcwd-wgetcwd?view=msvc-170) functions (only available during debug).

## Syntax

```
char *_getcwd_dbg(
   char *buffer,
   int maxlen,
   int blockType,
   const char *filename,
   int linenumber
);
wchar_t *_wgetcwd_dbg(
   wchar_t *buffer,
   int maxlen,
   int blockType,
   const char *filename,
   int linenumber
);
```

### Parameters

_`buffer`_  
Storage location for the path.

_`maxlen`_  
Maximum length of the path in characters: **`char`** for **`_getcwd_dbg`** and **`wchar_t`** for **`_wgetcwd_dbg`**.

_`blockType`_  
Requested type of the memory block: `_CLIENT_BLOCK` or `_NORMAL_BLOCK`.

_`filename`_  
Pointer to the name of the source file that requested the allocation operation or `NULL`.

_`linenumber`_  
Line number in the source file where the allocation operation was requested or `NULL`.

## Return value

Returns a pointer to _`buffer`_. A `NULL` return value indicates an error, and `errno` is set either to `ENOMEM`, indicating that there's insufficient memory to allocate _`maxlen`_ bytes (when a `NULL` argument is given as _`buffer`_), or to `ERANGE`, indicating that the path is longer than _`maxlen`_ characters.

For more information, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_getcwd_dbg`** and **`_wgetcwd_dbg`** functions are identical to `_getcwd` and `_wgetcwd` except that, when `_DEBUG` is defined, these functions use the debug version of `malloc` and `_malloc_dbg` to allocate memory if `NULL` is passed as the first parameter. For more information, see [`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170).

You don't need to call these functions explicitly in most cases. Instead, you can define the `_CRTDBG_MAP_ALLOC` flag. When `_CRTDBG_MAP_ALLOC` is defined, calls to `_getcwd` and `_wgetcwd` are remapped to **`_getcwd_dbg`** and **`_wgetcwd_dbg`**, respectively, with the _`blockType`_ set to `_NORMAL_BLOCK`. Thus, you don't need to call these functions explicitly unless you want to mark the heap blocks as `_CLIENT_BLOCK`. For more information, see [Types of blocks on the debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#types-of-blocks-on-the-debug-heap).

## Generic-text routine mapping

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tgetcwd_dbg`

**`_getcwd_dbg`**

**`_getcwd_dbg`**

**`_wgetcwd_dbg`**

## Requirements

Routine

Required header

**`_getcwd_dbg`**

<crtdbg.h>

**`_wgetcwd_dbg`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[`_getcwd`, `_wgetcwd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getcwd-wgetcwd?view=msvc-170)  
[Directory control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/directory-control?view=msvc-170)  
[Debug versions of heap allocation functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-versions-of-heap-allocation-functions?view=msvc-170)