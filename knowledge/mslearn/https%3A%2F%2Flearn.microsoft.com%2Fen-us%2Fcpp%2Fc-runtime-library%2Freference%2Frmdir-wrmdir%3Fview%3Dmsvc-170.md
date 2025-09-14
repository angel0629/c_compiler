---
title: "_rmdir, _wrmdir"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rmdir-wrmdir?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Deletes a directory.

## Syntax

```
int _rmdir(
   const char *dirname
);
int _wrmdir(
   const wchar_t *dirname
);
```

### Parameters

_`dirname`_  
Path of the directory to be removed.

## Return value

Each of these functions returns 0 if the directory is successfully deleted. A return value of -1 indicates an error and `errno` is set to one of the following values:

`errno` value

Condition

`ENOTEMPTY`

Given path isn't a directory, the directory isn't empty, or the directory is either the current working directory or the root directory.

`ENOENT`

Path is invalid.

`EACCES`

A program has an open handle to the directory.

For more information about these and other return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_rmdir`** function deletes the directory specified by _`dirname`_. The directory must be empty, and it must not be the current working directory or the root directory.

**`_wrmdir`** is a wide-character version of **`_rmdir`**; the _`dirname`_ argument to **`_wrmdir`** is a wide-character string. **`_wrmdir`** and **`_rmdir`** behave identically otherwise.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_trmdir`

**`_rmdir`**

**`_rmdir`**

**`_wrmdir`**

## Requirements

Routine

Required header

**`_rmdir`**

<direct.h>

**`_wrmdir`**

<direct.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

See the example for [`_mkdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mkdir-wmkdir?view=msvc-170).

## See also

[Directory control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/directory-control?view=msvc-170)  
[`_chdir`, `_wchdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chdir-wchdir?view=msvc-170)  
[`_mkdir`, `_wmkdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mkdir-wmkdir?view=msvc-170)