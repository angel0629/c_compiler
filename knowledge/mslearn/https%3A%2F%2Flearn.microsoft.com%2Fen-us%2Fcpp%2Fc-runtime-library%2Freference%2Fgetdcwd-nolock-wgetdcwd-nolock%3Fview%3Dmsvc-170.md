---
title: "_getdcwd_nolock, _wgetdcwd_nolock"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdcwd-nolock-wgetdcwd-nolock?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets the full path of the current working directory on the specified drive.

## Syntax

```
char *_getdcwd_nolock(
   int drive,
   char *buffer,
   int maxlen
);
wchar_t *_wgetdcwd_nolock(
   int drive,
   wchar_t *buffer,
   int maxlen
);
```

### Parameters

_`drive`_  
Disk drive.

_`buffer`_  
Storage location for the path.

_`maxlen`_  
Maximum length of path in characters: **`char`** for **`_getdcwd_nolock`** and **`wchar_t`** for **`_wgetdcwd_nolock`**.

## Return value

See [`_getdcwd`, `_wgetdcwd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdcwd-wgetdcwd?view=msvc-170).

## Remarks

**`_getdcwd_nolock`** and **`_wgetdcwd_nolock`** are identical to `_getdcwd` and `_wgetdcwd`, respectively, except that they aren't protected from interference by other threads. They might be faster because they don't incur the overhead of locking out other threads. Use these functions only in thread-safe contexts such as single-threaded applications or where the calling scope already handles thread isolation.

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_tgetdcwd_nolock`**

**`_getdcwd_nolock`**

**`_getdcwd_nolock`**

**`_wgetdcwd_nolock`**

## Requirements

Routine

Required header

**`_getdcwd_nolock`**

<direct.h>

**`_wgetdcwd_nolock`**

<direct.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Directory control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/directory-control?view=msvc-170)  
[`_chdir`, `_wchdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chdir-wchdir?view=msvc-170)  
[`_getcwd`, `_wgetcwd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getcwd-wgetcwd?view=msvc-170)  
[`_getdrive`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdrive?view=msvc-170)  
[`_mkdir`, `_wmkdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mkdir-wmkdir?view=msvc-170)  
[`_rmdir`, `_wrmdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rmdir-wrmdir?view=msvc-170)