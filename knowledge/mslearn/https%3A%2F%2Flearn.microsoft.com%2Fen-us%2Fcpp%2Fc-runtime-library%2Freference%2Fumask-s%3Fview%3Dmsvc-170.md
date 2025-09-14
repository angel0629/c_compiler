---
title: "_umask_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/umask-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sets the default file-permission mask. A version of [`_umask`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/umask?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t _umask_s(
   int mode,
   int* pOldMode
);
```

### Parameters

_`mode`_  
Default permission setting.

_`pOldMode`_  
The previous value of the permission setting.

## Return value

Returns an error code if _`mode`_ doesn't specify a valid mode or the _`pOldMode`_ pointer is `NULL`.

### Error conditions

_`mode`_

_`pOldMode`_

Return value

Contents of _`pOldMode`_

any

`NULL`

`EINVAL`

not modified

invalid mode

any

`EINVAL`

not modified

If one of the above conditions occurs, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, **`_umask_s`** returns `EINVAL` and sets `errno` to `EINVAL`.

The **`_umask_s`** function sets the file-permission mask of the current process to the mode specified by _`mode`_. The file-permission mask modifies the permission setting of new files created by **`_creat`**, **`_open`**, or **`_sopen`**. If a bit in the mask is 1, the corresponding bit in the file's requested permission value is set to 0 (disallowed). If a bit in the mask is 0, the corresponding bit is left unchanged. The permission setting for a new file isn't set until the file is closed for the first time.

The integer expression _`mode`_ contains one or both of the following manifest constants, defined in `SYS\STAT.H`:

_`mode`_

Description

`_S_IWRITE`

Writing permitted.

`_S_IREAD`

Reading permitted.

**`_S_IREAD | _S_IWRITE`**

Reading and writing permitted.

When both constants are given, they're joined with the bitwise-OR operator ( **`|`** ). If the _`mode`_ argument is `_S_IREAD`, reading isn't allowed (the file is write-only). If the _`mode`_ argument is `_S_IWRITE`, writing isn't allowed (the file is read-only). For example, if the write bit is set in the mask, any new files will be read-only. In MS-DOS and the Windows operating systems, all files are readable; it isn't possible to give write-only permission. Therefore, setting the read bit with **`_umask_s`** has no effect on the file's modes.

If _`mode`_ isn't a combination of one of the manifest constants or incorporates an alternate set of constants, the function ignores them.

By default, this function's global state is scoped to the application. To change it, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`_umask_s`**

`<io.h>` and `<sys/stat.h>` and `<sys/types.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_umask_s.c
/* This program uses _umask_s to set
* the file-permission mask so that all future
* files will be created as read-only files.
* It also displays the old mask.
*/

#include <sys/stat.h>
#include <sys/types.h>
#include <io.h>
#include <stdio.h>

int main( void )
{
   int oldmask, err;

   /* Create read-only files: */
   err = _umask_s( _S_IWRITE, &oldmask );
   if (err)
   {
      printf("Error setting the umask.\n");
      exit(1);
   }
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
[`_umask`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/umask?view=msvc-170)