---
title: "_chdrive"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chdrive?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Changes the current working drive.

## Syntax

```
int _chdrive(
   int drive
);
```

### Parameters

_`drive`_  
An integer from 1 through 26 that specifies the current working drive (1=A, 2=B, and so forth).

## Return value

Zero (0) if the current working drive was changed successfully; otherwise, -1.

If _`drive`_ isn't in the range from 1 through 26, the invalid-parameter handler is invoked as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the **`_chdrive`** function returns -1, `errno` is set to `EACCES`, and `_doserrno` is set to `ERROR_INVALID_DRIVE`.

The **`_chdrive`** function isn't thread-safe because it depends on the `SetCurrentDirectory` function, which is itself not thread-safe. To use **`_chdrive`** safely in a multi-threaded application, you must provide your own thread synchronization. For more information, see [`SetCurrentDirectory`](https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-setcurrentdirectory).

The **`_chdrive`** function changes only the current working drive; `_chdir` changes the current working directory.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_chdrive`**

<direct.h>

For more information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`_getdrive`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdrive?view=msvc-170).

## See also

[Directory control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/directory-control?view=msvc-170)  
[`_chdir`, `_wchdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chdir-wchdir?view=msvc-170)  
[`_fullpath`, `_wfullpath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fullpath-wfullpath?view=msvc-170)  
[`_getcwd`, `_wgetcwd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getcwd-wgetcwd?view=msvc-170)  
[`_getdrive`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdrive?view=msvc-170)  
[`_mkdir`, `_wmkdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mkdir-wmkdir?view=msvc-170)  
[`_rmdir`, `_wrmdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rmdir-wrmdir?view=msvc-170)  
[`system`, `_wsystem`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/system-wsystem?view=msvc-170)