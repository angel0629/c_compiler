---
title: "_creat, _wcreat"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creat-wcreat?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Creates a new file. **`_creat`** and **`_wcreat`** have been deprecated; use [`_sopen_s`, `_wsopen_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sopen-s-wsopen-s?view=msvc-170) instead.

## Syntax

```
int _creat(
   const char *filename,
   int pmode
);
int _wcreat(
   const wchar_t *filename,
   int pmode
);
```

### Parameters

_`filename`_  
Name of new file.

_`pmode`_  
Permission setting.

## Return value

These functions, if successful, return a file descriptor to the created file. Otherwise, the functions return -1 and set `errno` as shown in the following table.

`errno` value

Description

`EACCES`

_`filename`_ specifies an existing read-only file or specifies a directory instead of a file.

`EMFILE`

No more file descriptors are available.

`ENOENT`

Specified file couldn't be found.

If _`filename`_ is `NULL`, these functions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EINVAL` and return -1.

For more information about these and other return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_creat`** function creates a new file or opens and truncates an existing one. **`_wcreat`** is a wide-character version of **`_creat`**; the _`filename`_ argument to **`_wcreat`** is a wide-character string. **`_wcreat`** and **`_creat`** behave identically otherwise.

By default, this function's global state is scoped to the application. To change it, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcreat`

**`_creat`**

**`_creat`**

**`_wcreat`**

If the file specified by _`filename`_ doesn't exist, a new file is created with the given permission setting and is opened for writing. If the file already exists and its permission setting allows writing, **`_creat`** truncates the file to length 0, destroying the previous contents, and opens it for writing. The permission setting, _`pmode`_, applies to newly created files only. The new file receives the specified permission setting after it's closed for the first time. The integer expression _`pmode`_ contains one or both of the manifest constants `_S_IWRITE` and `_S_IREAD`, defined in SYS\\Stat.h. When both constants are given, they're joined with the bitwise or operator ( **`|`** ). The _`pmode`_ parameter is set to one of the following values.

Value

Definition

`_S_IWRITE`

Writing permitted.

`_S_IREAD`

Reading permitted.

`_S_IREAD | _S_IWRITE`

Reading and writing permitted.

If write permission isn't given, the file is read-only. All files are always readable; it's impossible to give write-only permission. The modes `_S_IWRITE` and `_S_IREAD | _S_IWRITE` are then equivalent. Files opened using **`_creat`** are always opened in compatibility mode (see [`_sopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sopen-wsopen?view=msvc-170)) with `_SH_DENYNO`.

**`_creat`** applies the current file-permission mask to _`pmode`_ before setting the permissions (see [`_umask`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/umask?view=msvc-170)). **`_creat`** is provided primarily for compatibility with previous libraries. A call to `_open` with `_O_CREAT` and `_O_TRUNC` in the _`oflag`_ parameter is equivalent to **`_creat`** and is preferable for new code.

## Requirements

Routine

Required header

Optional header

**`_creat`**

<io.h>

<sys/types.h>, <sys/stat.h>, <errno.h>

**`_wcreat`**

<io.h> or <wchar.h>

<sys/types.h>, <sys/stat.h>, <errno.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_creat.c
// compile with: /W3
// This program uses _creat to create
// the file (or truncate the existing file)
// named data and open it for writing.

#include <sys/types.h>
#include <sys/stat.h>
#include <io.h>
#include <stdio.h>
#include <stdlib.h>

int main( void )
{
   int fh;

   fh = _creat( "data", _S_IREAD | _S_IWRITE ); // C4996
   // Note: _creat is deprecated; use _sopen_s instead
   if( fh == -1 )
      perror( "Couldn't create data file" );
   else
   {
      printf( "Created data file.\n" );
      _close( fh );
   }
}
```

```
Created data file.
```

## See also

[Low-level I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/low-level-i-o?view=msvc-170)  
[`_chmod`, `_wchmod`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chmod-wchmod?view=msvc-170)  
[`_chsize`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chsize?view=msvc-170)  
[`_close`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/close?view=msvc-170)  
[`_dup`, `_dup2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/dup-dup2?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)  
[`_sopen`, `_wsopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sopen-wsopen?view=msvc-170)  
[`_umask`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/umask?view=msvc-170)