---
title: "_eof"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/eof?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Tests for end of file (EOF).

## Syntax

```
int _eof(
   int fd
);
```

### Parameters

_`fd`_  
File descriptor referring to the open file.

## Return value

**`_eof`** returns 1 if the current position is end of file, or 0 if it isn't. A return value of -1 indicates an error; in this case, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EBADF`, which indicates an invalid file descriptor.

The **`_eof`** function determines whether the end of the file associated with _`fd`_ has been reached.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

Optional header

**`_eof`**

<io.h>

<errno.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_eof.c
// This program reads data from a file
// ten bytes at a time until the end of the
// file is reached or an error is encountered.
//
#include <io.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <share.h>

int main( void )
{
   int  fh, count, total = 0;
   char buf[10];
   if( _sopen_s( &fh, "crt_eof.txt", _O_RDONLY, _SH_DENYNO, 0 ) )
   {
        perror( "Open failed");
        exit( 1 );
   }
   // Cycle until end of file reached:
   while( !_eof( fh ) )
   {
      // Attempt to read in 10 bytes:
      if( (count = _read( fh, buf, 10 )) == -1 )
      {
         perror( "Read error" );
         break;
      }
      // Total actual bytes read
      total += count;
   }
   printf( "Number of bytes read = %d\n", total );
   _close( fh );
}
```

### Input: crt\_eof.txt

```
This file contains some text.
```

### Output

```
Number of bytes read = 29
```

## See also

[Error handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/error-handling-crt?view=msvc-170)  
[Low-level I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/low-level-i-o?view=msvc-170)  
[`clearerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clearerr?view=msvc-170)  
[`feof`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feof?view=msvc-170)  
[`ferror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ferror?view=msvc-170)  
[`perror`, `_wperror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/perror-wperror?view=msvc-170)