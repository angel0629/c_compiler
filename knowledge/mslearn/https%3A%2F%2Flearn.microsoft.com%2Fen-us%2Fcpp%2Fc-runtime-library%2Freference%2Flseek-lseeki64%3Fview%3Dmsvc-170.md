---
title: "_lseek, _lseeki64"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lseek-lseeki64?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Moves a file pointer to the specified location.

## Syntax

```
long _lseek(
   int fd,
   long offset,
   int origin
);
__int64 _lseeki64(
   int fd,
   __int64 offset,
   int origin
);
```

### Parameters

_`fd`_  
File descriptor referring to an open file.

_`offset`_  
Number of bytes from _`origin`_.

_`origin`_  
Initial position.

## Return value

**`_lseek`** returns the offset, in bytes, of the new position from the beginning of the file. **`_lseeki64`** returns the offset in a 64-bit integer. The function returns -1L to indicate an error. If passed an invalid parameter, such as a bad file descriptor, or the value for _`origin`_ is invalid or the position specified by _`offset`_ is before the beginning of the file, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EBADF` and return -1L. On devices incapable of seeking (such as terminals and printers), the return value is undefined.

For more information about these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_lseek`** function moves the file pointer associated with _`fd`_ to a new location that is _`offset`_ bytes from _`origin`_. The next operation on the file occurs at the new location. The _`origin`_ argument must be one of the following constants, which are defined in Stdio.h.

_`origin`_ value

Description

`SEEK_SET`

Beginning of the file.

`SEEK_CUR`

Current position of the file pointer.

`SEEK_END`

End of file.

You can use **`_lseek`** to reposition the pointer anywhere in a file or beyond the end of the file.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_lseek`**

<io.h>

**`_lseeki64`**

<io.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_lseek.c
/* This program first opens a file named lseek.txt.
* It then uses _lseek to find the beginning of the file,
* to find the current position in the file, and to find
* the end of the file.
*/

#include <io.h>
#include <fcntl.h>
#include <stdlib.h>
#include <stdio.h>
#include <share.h>

int main( void )
{
   int fh;
   long pos;               /* Position of file pointer */
   char buffer[10];

   _sopen_s( &fh, "crt_lseek.c_input", _O_RDONLY, _SH_DENYNO, 0 );

   /* Seek the beginning of the file: */
   pos = _lseek( fh, 0L, SEEK_SET );
   if( pos == -1L )
      perror( "_lseek to beginning failed" );
   else
      printf( "Position for beginning of file seek = %ld\n", pos );

   /* Move file pointer a little */
    _read( fh, buffer, 10 );

   /* Find current position: */
   pos = _lseek( fh, 0L, SEEK_CUR );
   if( pos == -1L )
      perror( "_lseek to current position failed" );
   else
      printf( "Position for current position seek = %ld\n", pos );

   /* Set the end of the file: */
   pos = _lseek( fh, 0L, SEEK_END );
   if( pos == -1L )
      perror( "_lseek to end failed" );
   else
      printf( "Position for end of file seek = %ld\n", pos );

   _close( fh );
}
```

### Input: crt\_lseek.c\_input

```
Line one.
Line two.
Line three.
Line four.
Line five.
```

### Output

```
Position for beginning of file seek = 0
Position for current position seek = 10
Position for end of file seek = 57
```

## See also

[Low-level I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/low-level-i-o?view=msvc-170)  
[`fseek`, `_fseeki64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170)  
[`_tell`, `_telli64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tell-telli64?view=msvc-170)