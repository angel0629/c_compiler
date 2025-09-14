---
title: "rename, _wrename"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rename-wrename?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Rename a file or directory.

## Syntax

```
int rename(
   const char *oldname,
   const char *newname
);
int _wrename(
   const wchar_t *oldname,
   const wchar_t *newname
);
```

### Parameters

_`oldname`_  
Pointer to old name.

_`newname`_  
Pointer to new name.

## Return value

Each of these functions returns 0 if it's successful. On an error, the function returns a nonzero value and sets `errno` to one of the following values:

`errno` value

Condition

`EACCES`

File or directory specified by _`newname`_ already exists or couldn't be created (invalid path); or _`oldname`_ is a directory and _`newname`_ specifies a different path.

`ENOENT`

File or path specified by _`oldname`_ not found.

`EINVAL`

Name contains invalid characters.

For other possible return values, see [`_doserrno`, `_errno`, `syserrlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`rename`** function renames the file or directory specified by _`oldname`_ to the name given by _`newname`_. The old name must be the path of an existing file or directory. The new name must not be the name of an existing file or directory. You can use **`rename`** to move a file from one directory or device to another by giving a different path in the _`newname`_ argument. However, you can't use **`rename`** to move a directory. Directories can be renamed, but not moved.

**`_wrename`** is a wide-character version of **`_rename`**; the arguments to **`_wrename`** are wide-character strings. **`_wrename`** and **`_rename`** behave identically otherwise.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_trename`

**`rename`**

**`rename`**

**`_wrename`**

## Requirements

Routine

Required header

**`rename`**

`<io.h>` or `<stdio.h>`

**`_wrename`**

`<stdio.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_renamer.c
/* This program attempts to rename a file named
* CRT_RENAMER.OBJ to CRT_RENAMER.JBO. For this operation
* to succeed, a file named CRT_RENAMER.OBJ must exist and
* a file named CRT_RENAMER.JBO must not exist.
*/

#include <stdio.h>

int main( void )
{
   int  result;
   char old[] = "CRT_RENAMER.OBJ", new[] = "CRT_RENAMER.JBO";

   /* Attempt to rename file: */
   result = rename( old, new );
   if( result != 0 )
      printf( "Could not rename '%s'\n", old );
   else
      printf( "File '%s' renamed to '%s'\n", old, new );
}
```

### Output

```
File 'CRT_RENAMER.OBJ' renamed to 'CRT_RENAMER.JBO'
```

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)