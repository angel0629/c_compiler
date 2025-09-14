---
title: "_findfirst, _findfirst32, _findfirst32i64, _findfirst64, _findfirst64i32, _findfirsti64, _wfindfirst, _wfindfirst32, _wfindfirst32i64, _wfindfirst64, _wfindfirst64i32, _wfindfirsti64"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/findfirst-functions?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Provide information about the first instance of a file name that matches the file specified in the _`filespec`_ argument.

## Syntax

```
intptr_t _findfirst(
   const char *filespec,
   struct _finddata_t *fileinfo
);
intptr_t _findfirst32(
   const char *filespec,
   struct _finddata32_t *fileinfo
);
intptr_t _findfirst64(
   const char *filespec,
   struct _finddata64_t *fileinfo
);
intptr_t _findfirsti64(
   const char *filespec,
   struct _finddatai64_t *fileinfo
);
intptr_t _findfirst32i64(
   const char *filespec,
   struct _finddata32i64_t *fileinfo
);
intptr_t _findfirst64i32(
   const char *filespec,
   struct _finddata64i32_t *fileinfo
);
intptr_t _wfindfirst(
   const wchar_t *filespec,
   struct _wfinddata_t *fileinfo
);
intptr_t _wfindfirst32(
   const wchar_t *filespec,
   struct _wfinddata32_t *fileinfo
);
intptr_t _wfindfirst64(
   const wchar_t *filespec,
   struct _wfinddata64_t *fileinfo
);
intptr_t _wfindfirsti64(
   const wchar_t *filespec,
   struct _wfinddatai64_t *fileinfo
);
intptr_t _wfindfirst32i64(
   const wchar_t *filespec,
   struct _wfinddata32i64_t *fileinfo
);
intptr_t _wfindfirst64i32(
   const wchar_t *filespec,
   struct _wfinddata64i32_t *fileinfo
);
```

### Parameters

_`filespec`_  
Target file specification (can include wildcard characters).

_`fileinfo`_  
File information buffer. For more information about the `fileinfo` structs, see the Remarks in [Filename search functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/filename-search-functions?view=msvc-170) and see [Data type mappings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-type-mappings?view=msvc-170). The structs are defined in the same header file as the function that uses them as a parameter.

## Return value

If successful, **`_findfirst`** returns a unique search handle identifying the file or group of files that match the _`filespec`_ specification, which can be used in a subsequent call to [`_findnext`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/findnext-functions?view=msvc-170) or to [`_findclose`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/findclose?view=msvc-170). Otherwise, **`_findfirst`** returns -1 and sets `errno` to one of the following values.

errno value

Condition

`EINVAL`

Invalid parameter: _`filespec`_ or _`fileinfo`_ was `NULL`. Or, the operating system returned an unexpected error.

`ENOENT`

File specification that couldn't be matched.

`ENOMEM`

Insufficient memory.

`EINVAL`

Invalid file name specification or the file name given was larger than `MAX_PATH`.

For more information about these and other return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

If an invalid parameter is passed in, these functions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170).

You must call [`_findclose`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/findclose?view=msvc-170) after you're finished with either the **`_findfirst`** or [`_findnext`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/findnext-functions?view=msvc-170) function (or any variants) provided the call to `_findfirst` succeeded. `_findclose` frees resources used by these functions in your application. Calling `_findclose` on an invalid handle returns `-1` and sets `errno` to `EINVAL`.

The variations of these functions that have the **`w`** prefix are wide-character versions; otherwise, they're identical to the corresponding single-byte functions.

Variations of these functions support 32-bit or 64-bit time types and 32-bit or 64-bit file sizes. The first numeric suffix (**`32`** or **`64`**) indicates the size of the time type; the second suffix is either **`i32`** or **`i64`**, and indicates whether the file size is represented as a 32-bit or 64-bit integer. For information about which versions support 32-bit and 64-bit time types and file sizes, see the following table. The **`i32`** or **`i64`** suffix is omitted if it's the same as the size of the time type, so **`_findfirst64`** also supports 64-bit file lengths and **`_findfirst32`** supports only 32-bit file lengths.

These functions use various forms of the **`_finddata_t`** structure for the _`fileinfo`_ parameter. For more information about the structure, see [Filename search functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/filename-search-functions?view=msvc-170).

The variations that use a 64-bit time type enable file-creation dates to be expressed up through 23:59:59, December 31, 3000, UTC. The ones that use 32-bit time types represent dates only through 23:59:59 January 18, 2038, UTC. Midnight, January 1, 1970, is the lower bound of the date range for all these functions.

Unless you have a specific reason to use the versions that specify the time size explicitly, use **`_findfirst`** or **`_wfindfirst`** or, if you need to support file sizes larger than 3 GB, use **`_findfirsti64`** or **`_wfindfirsti64`**. All these functions use the 64-bit time type. In earlier versions, these functions used a 32-bit time type. If this change is a breaking change for an application, you might define `_USE_32BIT_TIME_T` to revert to the old behavior. If `_USE_32BIT_TIME_T` is defined, **`_findfirst`**, **`_findfirsti64`**, and their corresponding Unicode versions use a 32-bit time.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Time Type and File Length Type Variations of \_findfirst

Functions

`_USE_32BIT_TIME_T` defined?

Time type

File length type

**`_findfirst`**, **`_wfindfirst`**

Not defined

64-bit

32-bit

**`_findfirst`**, **`_wfindfirst`**

Defined

32-bit

32-bit

**`_findfirst32`**, **`_wfindfirst32`**

Not affected by the macro definition

32-bit

32-bit

**`_findfirst64`**, **`_wfindfirst64`**

Not affected by the macro definition

64-bit

64-bit

**`_findfirsti64`**, **`_wfindfirsti64`**

Not defined

64-bit

64-bit

**`_findfirsti64`**, **`_wfindfirsti64`**

Defined

32-bit

64-bit

**`_findfirst32i64`**, **`_wfindfirst32i64`**

Not affected by the macro definition

32-bit

64-bit

**`_findfirst64i32`**, **`_wfindfirst64i32`**

Not affected by the macro definition

64-bit

32-bit

### Generic-text routine mappings

`Tchar.h` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_tfindfirst`**

**`_findfirst`**

**`_findfirst`**

**`_wfindfirst`**

**`_tfindfirst32`**

**`_findfirst32`**

**`_findfirst32`**

**`_wfindfirst32`**

**`_tfindfirst64`**

**`_findfirst64`**

**`_findfirst64`**

**`_wfindfirst64`**

**`_tfindfirsti64`**

**`_findfirsti64`**

**`_findfirsti64`**

**`_wfindfirsti64`**

**`_tfindfirst32i64`**

**`_findfirst32i64`**

**`_findfirst32i64`**

**`_wfindfirst32i64`**

**`_tfindfirst64i32`**

**`_findfirst64i32`**

**`_findfirst64i32`**

**`_wfindfirst64i32`**

## Requirements

Function

Required header

**`_findfirst`**

`<io.h>`

**`_findfirst32`**

`<io.h>`

**`_findfirst64`**

`<io.h>`

**`_findfirsti64`**

`<io.h>`

**`_findfirst32i64`**

`<io.h>`

**`_findfirst64i32`**

`<io.h>`

**`_wfindfirst`**

`<io.h>` or `<wchar.h>`

**`_wfindfirst32`**

`<io.h>` or `<wchar.h>`

**`_wfindfirst64`**

`<io.h>` or `<wchar.h>`

**`_wfindfirsti64`**

`<io.h>` or `<wchar.h>`

**`_wfindfirst32i64`**

`<io.h>` or `<wchar.h>`

**`_wfindfirst64i32`**

`<io.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[System calls](https://learn.microsoft.com/en-us/cpp/c-runtime-library/system-calls?view=msvc-170)  
[Filename search functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/filename-search-functions?view=msvc-170)