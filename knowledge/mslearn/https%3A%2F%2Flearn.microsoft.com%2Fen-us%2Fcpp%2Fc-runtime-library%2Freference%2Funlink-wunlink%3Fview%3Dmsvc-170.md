---
title: "_unlink, _wunlink"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/unlink-wunlink?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Delete a file.

## Syntax

```
int _unlink(
   const char *filename
);
int _wunlink(
   const wchar_t *filename
);
```

### Parameters

_`filename`_  
Name of file to remove.

## Return value

Each of these functions returns 0 if successful. Otherwise, the function returns -1 and sets `errno` to `EACCES`, which means the path specifies a read-only file or a directory, or to `ENOENT`, which means the file or path isn't found.

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_unlink`** function deletes the file specified by _`filename`_. **`_wunlink`** is a wide-character version of **`_unlink`**; the _`filename`_ argument to **`_wunlink`** is a wide-character string. These functions behave identically otherwise.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tunlink`

**`_unlink`**

**`_unlink`**

**`_wunlink`**

## Requirements

Routine

Required header

**`_unlink`**

<io.h> and <stdio.h>

**`_wunlink`**

<io.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Code example

This program uses \_unlink to delete CRT\_UNLINK.TXT.

```
// crt_unlink.c

#include <stdio.h>

int main( void )
{
   if( _unlink( "crt_unlink.txt" ) == -1 )
      perror( "Could not delete 'CRT_UNLINK.TXT'" );
   else
      printf( "Deleted 'CRT_UNLINK.TXT'\n" );
}
```

### Input: crt\_unlink.txt

```
This file will be deleted.
```

### Sample output

```
Deleted 'CRT_UNLINK.TXT'
```

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`_close`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/close?view=msvc-170)  
[`remove`, `_wremove`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/remove-wremove?view=msvc-170)