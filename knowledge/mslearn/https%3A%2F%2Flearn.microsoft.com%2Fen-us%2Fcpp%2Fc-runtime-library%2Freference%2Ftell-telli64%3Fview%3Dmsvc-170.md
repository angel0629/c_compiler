---
title: "_tell, _telli64"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tell-telli64?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Get the position of the file pointer.

## Syntax

```
long _tell(
   int handle
);
__int64 _telli64(
   int handle
);
```

### Parameters

_`handle`_  
File descriptor referring to open file.

## Return value

The current position of the file pointer. On devices incapable of seeking, the return value is undefined.

A return value of -1L indicates an error. If _`handle`_ is an invalid file descriptor, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EBADF` and return -1L.

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_tell`** function gets the current position of the file pointer (if any) associated with the _`handle`_ argument. The position is expressed as the number of bytes from the beginning of the file. For the **`_telli64`** function, this value is expressed as a 64-bit integer.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_tell`**, **`_telli64`**

<io.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_tell.c
// This program uses _tell to tell the
// file pointer position after a file read.
//

#include <io.h>
#include <stdio.h>
#include <fcntl.h>
#include <share.h>
#include <string.h>

int main( void )
{
   int  fh;
   char buffer[500];

   if ( _sopen_s( &fh, "crt_tell.txt", _O_RDONLY, _SH_DENYNO, 0) )
   {
      char buff[50];
      _strerror_s( buff, sizeof(buff), NULL );
      printf( buff );
      exit( -1 );
   }

   if( _read( fh, buffer, 500 ) > 0 )
      printf( "Current file position is: %d\n", _tell( fh ) );
   _close( fh );
}
```

### Input: crt\_tell.txt

```
Line one.
Line two.
```

### Output

```
Current file position is: 20
```

## See also

[Low-level I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/low-level-i-o?view=msvc-170)  
[`ftell`, `_ftelli64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftell-ftelli64?view=msvc-170)  
[`_lseek`, `_lseeki64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lseek-lseeki64?view=msvc-170)