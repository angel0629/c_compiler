---
title: "_umask"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/umask?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sets the default file-permission mask. For a more secure version of this function, see [`_umask_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/umask-s?view=msvc-170) .

## Syntax

```
int _umask( int pmode );
```

### Parameters

_`pmode`_  
Default permission setting.

## Return value

**`_umask`** returns the previous value of _`pmode`_. There's no error return.

The **`_umask`** function sets the file-permission mask of the current process to the mode specified by _`pmode`_. The file-permission mask modifies the permission setting of new files created by **`_creat`**, **`_open`**, or **`_sopen`**. If a bit in the mask is 1, the corresponding bit in the file's requested permission value is set to 0 (disallowed). If a bit in the mask is 0, the corresponding bit is left unchanged. The permission setting for a new file isn't set until the file is closed for the first time.

The integer expression _`pmode`_ contains one or both of the following manifest constants, defined in `SYS\STAT.H`:

_`pmode`_

Description

`_S_IWRITE`

Writing permitted.

`_S_IREAD`

Reading permitted.

**`_S_IREAD | _S_IWRITE`**

Reading and writing permitted.

When both constants are given, they're joined with the bitwise-OR operator ( **`|`** ). If the _`pmode`_ argument is `_S_IREAD`, reading isn't allowed (the file is write-only). If the _`pmode`_ argument is `_S_IWRITE`, writing isn't allowed (the file is read-only). For example, if the write bit is set in the mask, any new files will be read-only. In MS-DOS and the Windows operating systems, all files are readable; it isn't possible to give write-only permission. Therefore, setting the read bit with **`_umask`** has no effect on the file's modes.

If _`pmode`_ isn't a combination of one of the manifest constants or incorporates an alternate set of constants, the function ignores them.

By default, this function's global state is scoped to the application. To change it, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`_umask`**

`<io.h>`, `<sys/stat.h>`, `<sys/types.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_umask.c
// compile with: /W3
// This program uses _umask to set
// the file-permission mask so that all future
// files will be created as read-only files.
// It also displays the old mask.
#include <sys/stat.h>
#include <sys/types.h>
#include <io.h>
#include <stdio.h>

int main( void )
{
   int oldmask;

   /* Create read-only files: */
   oldmask = _umask( _S_IWRITE ); // C4996
   // Note: _umask is deprecated; consider using _umask_s instead
   printf( "Oldmask = 0x%.4x\n", oldmask );
}
```

```
Oldmask = 0x0000
```

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[Low-level I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/low-level-i-o?view=msvc-170)  
[`_chmod`, `_wchmod`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chmod-wchmod?view=msvc-170)  
[`_creat`, `_wcreat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creat-wcreat?view=msvc-170)  
[`_mkdir`, `_wmkdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mkdir-wmkdir?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)