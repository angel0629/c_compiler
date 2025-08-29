---
title: "_access, _waccess"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/access-waccess?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines if a file is read-only or not. More secure versions are available; see [`_access_s`, `_waccess_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/access-s-waccess-s?view=msvc-170).

For `_taccess`, see [Generic-text function mappings](#generic-text-function-mappings).

## Syntax

```
int _access(
   const char *path,
   int mode
);
int _waccess(
   const wchar_t *path,
   int mode
);
```

### Parameters

_`path`_  
File or directory path.

_`mode`_  
Read/write attribute.

## Return value

Each function returns 0 if the file has the given mode. The function returns -1 if the named file doesn't exist or doesn't have the given mode; in this case, `errno` is set as shown in the following table.

Value

Description

`EACCES`

Access denied: the file's permission setting doesn't allow specified access.

`ENOENT`

File name or path not found.

`EINVAL`

Invalid parameter.

For more information about these and other return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

When used with files, the **`_access`** function determines whether the specified file or directory exists and has the attributes specified by the value of _`mode`_. When used with directories, **`_access`** determines only whether the specified directory exists; in Windows 2000 and later operating systems, all directories have read and write access.

_`mode`_ value

Checks file for

00

Existence only

02

Write-only

04

Read-only

06

Read and write

This function only checks whether the file and directory are read-only or not, it doesn't check the filesystem security settings. For that you need an access token. For more information on filesystem security, see [Access tokens](https://learn.microsoft.com/en-us/windows/win32/SecAuthZ/access-tokens). An ATL class exists to provide this functionality; see [`CAccessToken` Class](https://learn.microsoft.com/en-us/cpp/atl/reference/caccesstoken-class?view=msvc-170).

**`_waccess`** is a wide-character version of **`_access`**; the _`path`_ argument to **`_waccess`** is a wide-character string. **`_waccess`** and **`_access`** behave identically otherwise.

This function validates its parameters. If _`path`_ is `NULL` or _`mode`_ doesn't specify a valid mode, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the function sets `errno` to `EINVAL` and returns -1.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text function mappings

`Tchar.h` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_taccess`

**`_access`**

**`_access`**

**`_waccess`**

## Requirements

Routine

Required header

Optional headers

**`_access`**

`<io.h>`

`<errno.h>`

**`_waccess`**

`<wchar.h>` or `<io.h>`

`<errno.h>`

## Example

The following example uses **`_access`** to check the file named _`crt_ACCESS.C`_ to see whether it exists and whether writing is allowed.

```
// crt_access.c
// compile with: /W1
// This example uses _access to check the file named
// crt_ACCESS.C to see if it exists and if writing is allowed.

#include <io.h>
#include <stdio.h>
#include <stdlib.h>

int main( void )
{
    // Check for existence.
    if( (_access( "crt_ACCESS.C", 0 )) != -1 )
    {
        printf_s( "File crt_ACCESS.C exists.\n" );

        // Check for write permission.
        // Assume file is read-only.
        if( (_access( "crt_ACCESS.C", 2 )) == -1 )
            printf_s( "File crt_ACCESS.C does not have write permission.\n" );
    }
}
```

```
File crt_ACCESS.C exists.
File crt_ACCESS.C does not have write permission.
```

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`_chmod`, `_wchmod`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chmod-wchmod?view=msvc-170)  
[`_fstat`, `_fstat32`, `_fstat64`, `_fstati64`, `_fstat32i64`, `_fstat64i32`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fstat-fstat32-fstat64-fstati64-fstat32i64-fstat64i32?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)  
[`_stat`, `_wstat` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stat-functions?view=msvc-170)