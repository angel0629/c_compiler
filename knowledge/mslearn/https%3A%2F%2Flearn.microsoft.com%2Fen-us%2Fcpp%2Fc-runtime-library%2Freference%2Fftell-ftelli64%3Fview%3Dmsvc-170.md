---
title: "ftell, _ftelli64"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftell-ftelli64?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets the current position of a file pointer.

## Syntax

```
long ftell(
   FILE *stream
);
__int64 _ftelli64(
   FILE *stream
);
```

### Parameters

_`stream`_  
Target `FILE` structure.

## Return value

**`ftell`** and **`_ftelli64`** return the current file position. The value returned by **`ftell`** and **`_ftelli64`** may not reflect the physical byte offset for streams opened in text mode, because text mode causes carriage return-line feed translation. Use **`ftell`** with [`fseek`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170) or **`_ftelli64`** with [`_fseeki64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170) to return to file locations correctly. On error, **`ftell`** and **`_ftelli64`** invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return -1L and set `errno` to one of two constants, defined in `ERRNO.H`. The `EBADF` constant means the _`stream`_ argument isn't a valid file pointer value or doesn't refer to an open file. `EINVAL` means an invalid _`stream`_ argument was passed to the function. On devices incapable of seeking (such as terminals and printers), or when _`stream`_ doesn't refer to an open file, the return value is undefined.

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`ftell`** and **`_ftelli64`** functions retrieve the current position of the file pointer (if any) associated with _`stream`_. The position is expressed as an offset relative to the beginning of the stream.

When a file is opened for appending data, the current file position is determined by the last I/O operation, not by where the next write would occur. For example, assume a file is opened for an append and the last operation was a read. The file position is the point where the next read operation would start, not where the next write would start. (When a file is opened for appending, the file position is moved to end of file before any write operation.) If no I/O operation has yet occurred on a file opened for appending, the file position is the beginning of the file.

In text mode, CTRL+Z is interpreted as an end-of-file character on input. In files opened for reading/writing, **`fopen`** and all related routines check for a CTRL+Z at the end of the file and remove it if possible. It's because using the combination of **`ftell`** and [`fseek`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170), or **`_ftelli64`** and [`_fseeki64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170), to move within a file that ends with a CTRL+Z may cause **`ftell`** or **`_ftelli64`** to behave improperly near the end of the file.

This function locks the calling thread during execution and is therefore thread-safe. For a non-locking version, see **`_ftell_nolock`**.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

Optional headers

**`ftell`**

`<stdio.h>`

`<errno.h>`

**`_ftelli64`**

`<stdio.h>`

`<errno.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_ftell.c
// This program opens a file named CRT_FTELL.C
// for reading and tries to read 100 characters. It
// then uses ftell to determine the position of the
// file pointer and displays this position.

#include <stdio.h>

FILE *stream;

int main( void )
{
   long position;
   char list[100];
   if( fopen_s( &stream, "crt_ftell.c", "rb" ) == 0 )
   {
      // Move the pointer by reading data:
      fread( list, sizeof( char ), 100, stream );
      // Get position after read:
      position = ftell( stream );
      printf( "Position after trying to read 100 bytes: %ld\n",
              position );
      fclose( stream );
   }
}
```

```
Position after trying to read 100 bytes: 100
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170)  
[`fgetpos`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgetpos?view=msvc-170)  
[`fseek`, `_fseeki64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170)  
[`_lseek`, `_lseeki64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lseek-lseeki64?view=msvc-170)