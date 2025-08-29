---
title: "_access_s, _waccess_s, _taccess_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/access-s-waccess-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines file read/write permissions. These functions are versions of [`_access`, `_waccess`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/access-waccess?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

For `_taccess_s`, see [Generic-text function mappings](#generic-text-function-mappings).

## Syntax

```
errno_t _access_s(
   const char *path,
   int mode
);
errno_t _waccess_s(
   const wchar_t *path,
   int mode
);
```

### Parameters

_`path`_  
File or directory path.

_`mode`_  
Permission setting.

## Return value

Each function returns 0 if the file has the given mode. The function returns an error code if the named file doesn't exist or isn't accessible in the given mode. In this case, the function returns an error code from the set as follows and also sets `errno` to the same value.

`errno` value

Condition

`EACCES`

Access denied. The file's permission setting doesn't allow specified access.

`ENOENT`

File name or path not found.

`EINVAL`

Invalid parameter.

For more information, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

When used with files, the **`_access_s`** function determines whether the specified file exists and can be accessed as specified by the value of _`mode`_. When used with directories, **`_access_s`** determines only whether the specified directory exists. In Windows 2000 and later operating systems, all directories have read and write access.

_`mode`_ value

Checks file for

00

Existence only.

02

Write permission.

04

Read permission.

06

Read and write permission.

Permission to read or write the file isn't enough to ensure the ability to open a file. For example, if a file is locked by another process, it might not be accessible even though **`_access_s`** returns 0.

**`_waccess_s`** is a wide-character version of **`_access_s`**, where the _`path`_ argument to **`_waccess_s`** is a wide-character string. Otherwise, **`_waccess_s`** and **`_access_s`** behave identically.

These functions validate their parameters. If _`path`_ is `NULL` or _`mode`_ doesn't specify a valid mode, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EINVAL` and return `EINVAL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text function mappings

The function in the `tchar.h` column maps to the function in the other columns depending on the character set that is defined at compile time.

`tchar.h` function

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_taccess_s`

`_access_s`

`_access_s`

`_waccess_s`

## Requirements

Routine

Required header

Optional header

**`_access_s`**

`<io.h>`

`<errno.h>`

**`_waccess_s`**

`<wchar.h>` or `<io.h>`

`<errno.h>`

## Example

This example uses **`_access_s`** to check the file named crt\_access\_s.c to see whether it exists and whether writing is allowed.

```
// crt_access_s.c

#include <io.h>
#include <stdio.h>
#include <stdlib.h>

int main( void )
{
    errno_t err = 0;

    // Check for existence.
    if ((err = _access_s( "crt_access_s.c", 0 )) == 0 )
    {
        printf_s( "File crt_access_s.c exists.\n" );

        // Check for write permission.
        if ((err = _access_s( "crt_access_s.c", 2 )) == 0 )
        {
            printf_s( "File crt_access_s.c does have "
                      "write permission.\n" );
        }
        else
        {
            printf_s( "File crt_access_s.c does not have "
                      "write permission.\n" );
        }
    }
    else
    {
        printf_s( "File crt_access_s.c does not exist.\n" );
    }
}
```

```
File crt_access_s.c exists.
File crt_access_s.c does not have write permission.
```

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`_access`, `_waccess`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/access-waccess?view=msvc-170)  
[`_chmod`, `_wchmod`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chmod-wchmod?view=msvc-170)  
[`_fstat`, `_fstat32`, `_fstat64`, `_fstati64`, `_fstat32i64`, `_fstat64i32`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fstat-fstat32-fstat64-fstati64-fstat32i64-fstat64i32?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)  
[`_stat`, `_wstat` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stat-functions?view=msvc-170)