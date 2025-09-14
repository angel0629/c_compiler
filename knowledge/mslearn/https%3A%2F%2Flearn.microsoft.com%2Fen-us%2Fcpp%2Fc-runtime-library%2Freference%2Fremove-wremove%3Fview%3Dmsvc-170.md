---
title: "remove, _wremove"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/remove-wremove?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Delete a file.

## Syntax

```
int remove(
   const char *path
);
int _wremove(
   const wchar_t *path
);
```

### Parameters

_`path`_  
Path of file to be removed.

## Return value

Each of these functions returns 0 if the file is successfully deleted. Otherwise, it returns -1 and sets `errno` either to `EACCES` to indicate that the path specifies a read-only file, specifies a directory, or the file is open, or to `ENOENT` to indicate that the filename or path wasn't found.

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`remove`** function deletes the file specified by _`path`._ **`_wremove`** is a wide-character version of **`_remove`**; the _`path`_ argument to **`_wremove`** is a wide-character string. **`_wremove`** and **`_remove`** behave identically otherwise. All handles to a file must be closed before it can be deleted.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tremove`

**`remove`**

**`remove`**

**`_wremove`**

## Requirements

Routine

Required header

**`remove`**

`<stdio.h>` or `<io.h>`

**`_wremove`**

`<stdio.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_remove.c
/* This program uses remove to delete crt_remove.txt */

#include <stdio.h>

int main( void )
{
   if( remove( "crt_remove.txt" ) == -1 )
      perror( "Could not delete 'CRT_REMOVE.TXT'" );
   else
      printf( "Deleted 'CRT_REMOVE.TXT'\n" );
}
```

### Input: `crt_remove.txt`

```
This file will be deleted.
```

### Sample output

```
Deleted 'CRT_REMOVE.TXT'
```

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`_unlink`, `_wunlink`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/unlink-wunlink?view=msvc-170)