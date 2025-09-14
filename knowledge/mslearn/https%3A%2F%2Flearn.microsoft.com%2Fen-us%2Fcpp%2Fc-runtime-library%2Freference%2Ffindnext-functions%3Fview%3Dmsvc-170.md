---
title: "_findnext, _findnext32, _findnext32i64, _findnext64, _findnext64i32, _findnexti64, _wfindnext, _wfindnext32, _wfindnext32i64, _wfindnext64, _wfindnext64i32, _wfindnexti64"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/findnext-functions?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Find the next name, if any, that matches the _`filespec`_ argument in a previous call to [`_findfirst`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/findfirst-functions?view=msvc-170), and then alter the _`fileinfo`_ structure contents accordingly.

## Syntax

```
int _findnext(
   intptr_t handle,
   struct _finddata_t *fileinfo
);
int _findnext32(
   intptr_t handle,
   struct _finddata32_t *fileinfo
);
int _findnext64(
   intptr_t handle,
   struct __finddata64_t *fileinfo
);
int _findnexti64(
   intptr_t handle,
   struct __finddatai64_t *fileinfo
);
int _findnext32i64(
   intptr_t handle,
   struct _finddata32i64_t *fileinfo
);
int _findnext64i32(
   intptr_t handle,
   struct _finddata64i32_t *fileinfo
);
int _wfindnext(
   intptr_t handle,
   struct _wfinddata_t *fileinfo
);
int _wfindnext32(
   intptr_t handle,
   struct _wfinddata32_t *fileinfo
);
int _wfindnext64(
   intptr_t handle,
   struct _wfinddata64_t *fileinfo
);
int _wfindnexti64(
   intptr_t handle,
   struct _wfinddatai64_t *fileinfo
);
int _wfindnext32i64(
   intptr_t handle,
   struct _wfinddatai64_t *fileinfo
);
int _wfindnext64i32(
   intptr_t handle,
   struct _wfinddata64i32_t *fileinfo
);
```

### Parameters

_`handle`_  
The search handle returned by a previous call to `_findfirst`.

_`fileinfo`_  
File information buffer.

## Return value

If successful, returns 0. Otherwise, returns -1 and sets `errno` to a value indicating the nature of the failure. Possible error codes are shown in the following table.

`errno` value

Condition

`EINVAL`

Invalid parameter: _`fileinfo`_ was `NULL`. Or, the operating system returned an unexpected error.

`ENOENT`

No more matching files could be found.

`ENOMEM`

Not enough memory or the file name's length exceeded `MAX_PATH`.

If an invalid parameter is passed in, these functions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170).

You must call [`_findclose`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/findclose?view=msvc-170) after you're finished using either the `_findfirst` or **`_findnext`** function (or any variants). `_findclose` frees up resources used by these functions in your application.

The variations of these functions with the **w** prefix are wide-character versions; otherwise, they're identical to the corresponding single-byte functions.

Variations of these functions support 32-bit or 64-bit time types and 32-bit or 64-bit file sizes. The first numerical suffix (**`32`** or **`64`**) indicates the size of the time type used; the second suffix is either **`i32`** or **`i64`**, indicating whether the file size is represented as a 32-bit or 64-bit integer. For information about which versions support 32-bit and 64-bit time types and file sizes, see the following table. The variations that use a 64-bit time type allow file-creation dates to be expressed up through 23:59:59, December 31, 3000, UTC; whereas those using 32-bit time types only represent dates through 23:59:59 January 18, 2038, UTC. Midnight, January 1, 1970, is the lower bound of the date range for all these functions.

Unless you have a specific reason to use the versions that specify the time size explicitly, use **`_findnext`** or **`_wfindnext`** or, if you need to support file sizes greater than 3 GB, use **`_findnexti64`** or **`_wfindnexti64`**. All these functions use the 64-bit time type. In previous versions, these functions used a 32-bit time type. If this change is a breaking change for an application, you might define `_USE_32BIT_TIME_T` to get the old behavior. If `_USE_32BIT_TIME_T` is defined, **`_findnext`**, **`_findnexti64`** and their corresponding Unicode versions use a 32-bit time.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Time Type and File Length Type Variations of \_findnext

Functions

`_USE_32BIT_TIME_T` defined?

Time type

File length type

**`_findnext`**, **`_wfindnext`**

Not defined

64-bit

32-bit

**`_findnext`**, **`_wfindnext`**

Defined

32-bit

32-bit

**`_findnext32`**, **`_wfindnext32`**

Not affected by the macro definition

32-bit

32-bit

**`_findnext64`**, **`_wfindnext64`**

Not affected by the macro definition

64-bit

64-bit

**`_findnexti64`**, **`_wfindnexti64`**

Not defined

64-bit

64-bit

**`_findnexti64`**, **`_wfindnexti64`**

Defined

32-bit

64-bit

**`_findnext32i64`**, **`_wfindnext32i64`**

Not affected by the macro definition

32-bit

64-bit

**`_findnext64i32`**, **`_wfindnext64i32`**

Not affected by the macro definition

64-bit

32-bit

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tfindnext`

**`_findnext`**

**`_findnext`**

**`_wfindnext`**

`_tfindnext32`

**`_findnext32`**

**`_findnext32`**

**`_wfindnext32`**

`_tfindnext64`

**`_findnext64`**

**`_findnext64`**

**`_wfindnext64`**

`_tfindnexti64`

**`_findnexti64`**

**`_findnexti64`**

**`_wfindnexti64`**

**`_tfindnext32i64`**

**`_findnext32i64`**

**`_findnext32i64`**

**`_wfindnext32i64`**

**`_tfindnext64i32`**

**`_findnext64i32`**

**`_findnext64i32`**

**`_wfindnext64i32`**

## Requirements

Function

Required header

**`_findnext`**

<io.h>

**`_findnext32`**

<io.h>

**`_findnext64`**

<io.h>

**`_findnexti64`**

<io.h>

**`_findnext32i64`**

<io.h>

**`_findnext64i32`**

<io.h>

**`_wfindnext`**

<io.h> or <wchar.h>

**`_wfindnext32`**

<io.h> or <wchar.h>

**`_wfindnext64`**

<io.h> or <wchar.h>

**`_wfindnexti64`**

<io.h> or <wchar.h>

**`_wfindnext32i64`**

<io.h> or <wchar.h>

**`_wfindnext64i32`**

<io.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[System calls](https://learn.microsoft.com/en-us/cpp/c-runtime-library/system-calls?view=msvc-170)  
[Filename search functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/filename-search-functions?view=msvc-170)