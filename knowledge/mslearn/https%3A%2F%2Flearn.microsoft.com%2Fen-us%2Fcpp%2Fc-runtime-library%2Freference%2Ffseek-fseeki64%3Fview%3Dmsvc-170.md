---
title: "fseek, _fseeki64"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Moves the file pointer to a specified location.

## Syntax

```
int fseek(
   FILE *stream,
   long offset,
   int origin
);
int _fseeki64(
   FILE *stream,
   __int64 offset,
   int origin
);
```

### Parameters

_`stream`_  
Pointer to `FILE` structure.

_`offset`_  
Number of bytes from _`origin`_.

_`origin`_  
Initial position.

## Return value

If successful, **`fseek`** and **`_fseeki64`** returns 0. Otherwise, it returns a nonzero value. On devices incapable of seeking, the return value is undefined. If _`stream`_ is a null pointer, or if _`origin`_ isn't one of allowed values described below, **`fseek`** and **`_fseeki64`** invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EINVAL` and return -1.

The **`fseek`** and **`_fseeki64`** functions moves the file pointer (if any) associated with _`stream`_ to a new location that is _`offset`_ bytes from _`origin`_. The next operation on the stream takes place at the new location. On a stream open for update, the next operation can be either a read or a write. The argument _`origin`_ must be one of the following constants, defined in `STDIO.H`:

origin value

Meaning

`SEEK_CUR`

Current position of file pointer.

`SEEK_END`

End of file.

`SEEK_SET`

Beginning of file.

You can use **`fseek`** and **`_fseeki64`** to reposition the pointer anywhere in a file. The pointer can also be positioned beyond the end of the file. **`fseek`** and **`_fseeki64`** clears the end-of-file indicator and negates the effect of any prior [`ungetc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ungetc-ungetwc?view=msvc-170) calls against _`stream`_.

When a file is opened for appending data, the current file position is determined by the last I/O operation, not by where the next write would occur. If no I/O operation has yet occurred on a file opened for appending, the file position is the start of the file.

For streams opened in text mode, **`fseek`** and **`_fseeki64`** have limited use, because carriage return-line feed translations can cause **`fseek`** and **`_fseeki64`** to produce unexpected results. The only **`fseek`** and **`_fseeki64`** operations guaranteed to work on streams opened in text mode are:

*   Seeking with an offset of 0 relative to any of the origin values.
    
*   Seeking from the beginning of the file with an offset value returned from a call to [`ftell`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftell-ftelli64?view=msvc-170) when using **`fseek`** or [`_ftelli64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftell-ftelli64?view=msvc-170) when using **`_fseeki64`**.
    

Also in text mode, CTRL+Z is interpreted as an end-of-file character on input. In files opened for reading/writing, [`fopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170) and all related routines check for a CTRL+Z at the end of the file and remove it if possible. It's removed because using the combination of **`fseek`** and [`ftell`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftell-ftelli64?view=msvc-170) or **`_fseeki64`** and [`_ftelli64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftell-ftelli64?view=msvc-170), to move within a file that ends with a CTRL+Z may cause **`fseek`** or **`_fseeki64`** to behave improperly near the end of the file.

When the CRT opens a file that begins with a Byte Order Mark (BOM), the file pointer is positioned after the BOM. (That is, it's positioned at the start of the file's actual content). If you have to **`fseek`** to the beginning of the file, use [`ftell`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftell-ftelli64?view=msvc-170) to get the initial position, and then **`fseek`** to that position rather than to position 0.

This function locks out other threads during execution and is therefore thread-safe. For a non-locking version, see [`_fseek_nolock`, `_fseeki64_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-nolock-fseeki64-nolock?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`fseek`**

`<stdio.h>`

**`_fseeki64`**

`<stdio.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_fseek.c
// This program opens the file FSEEK.OUT and
// moves the pointer to the file's beginning.

#include <stdio.h>

int main( void )
{
   FILE *stream;
   char line[81];
   int  result;

   if ( fopen_s( &stream, "fseek.out", "w+" ) != 0 )
   {
      printf( "The file fseek.out was not opened\n" );
      return -1;
   }
   fprintf( stream, "The fseek begins here: "
                    "This is the file 'fseek.out'.\n" );
   result = fseek( stream, 23L, SEEK_SET);
   if( result )
      perror( "Fseek failed" );
   else
   {
      printf( "File pointer is set to middle of first line.\n" );
      fgets( line, 80, stream );
      printf( "%s", line );
    }
   fclose( stream );
}
```

```
File pointer is set to middle of first line.
This is the file 'fseek.out'.
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170)  
[`ftell`, `_ftelli64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftell-ftelli64?view=msvc-170)  
[`_lseek`, `_lseeki64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lseek-lseeki64?view=msvc-170)  
[`rewind`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rewind?view=msvc-170)