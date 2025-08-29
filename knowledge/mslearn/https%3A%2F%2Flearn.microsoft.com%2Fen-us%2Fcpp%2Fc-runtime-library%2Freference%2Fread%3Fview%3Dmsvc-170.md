---
title: "_read"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/read?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reads data from a file.

## Syntax

```
int _read(
   int const fd,
   void * const buffer,
   unsigned const buffer_size
);
```

### Parameters

_`fd`_  
File descriptor referring to the open file.

_`buffer`_  
Storage location for data.

_`buffer_size`_  
Maximum number of bytes to read.

## Return value

**`_read`** returns the number of bytes read, which might be less than _`buffer_size`_ if there are fewer than _`buffer_size`_ bytes left in the file, or if the file was opened in text mode. In text mode, each carriage return-line feed pair `\r\n` is replaced with a single line feed character `\n`. Only the single line feed character is counted in the return value. The replacement doesn't affect the file pointer.

If the function tries to read at end of file, it returns 0. If _`fd`_ isn't valid, the file isn't open for reading, or the file is locked, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the function returns -1 and sets `errno` to `EBADF`.

If _`buffer`_ is `NULL`, or if _`buffer_size`_ > `INT_MAX`, the invalid parameter handler is invoked. If execution is allowed to continue, the function returns -1 and `errno` is set to `EINVAL`.

For more information about this and other return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_read`** function reads a maximum of _`buffer_size`_ bytes into _`buffer`_ from the file associated with _`fd`_. The read operation begins at the current position of the file pointer associated with the given file. After the read operation, the file pointer points to the next unread character.

If the file was opened in text mode, the read terminates when **`_read`** encounters a CTRL+Z character, which is treated as an end-of-file indicator. Use [`_lseek`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lseek-lseeki64?view=msvc-170) to clear the end-of-file indicator.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_read`**

`<io.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_read.c
/* This program opens a file named crt_read.txt
* and tries to read 60,000 bytes from
* that file using _read. It then displays the
* actual number of bytes read.
*/

#include <fcntl.h>      /* Needed only for _O_RDWR definition */
#include <io.h>
#include <stdlib.h>
#include <stdio.h>
#include <share.h>

char buffer[60000];

int main( void )
{
   int fh, bytesread;
   unsigned int nbytes = 60000;

   /* Open file for input: */
   if ( _sopen_s( &fh, "crt_read.txt", _O_RDONLY, _SH_DENYNO, 0 ))
   {
      perror( "open failed on input file" );
      exit( 1 );
   }

   /* Read in input: */
   if (( bytesread = _read( fh, buffer, nbytes )) <= 0 )
      perror( "Problem reading file" );
   else
      printf( "Read %u bytes from file\n", bytesread );

   _close( fh );
}
```

### Input: crt\_read.txt

```
Line one.
Line two.
```

### Output

```
Read 19 bytes from file
```

## See also

[Low-level I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/low-level-i-o?view=msvc-170)  
[`_creat`, `_wcreat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creat-wcreat?view=msvc-170)  
[`fread`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fread?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)  
[`_write`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/write?view=msvc-170)