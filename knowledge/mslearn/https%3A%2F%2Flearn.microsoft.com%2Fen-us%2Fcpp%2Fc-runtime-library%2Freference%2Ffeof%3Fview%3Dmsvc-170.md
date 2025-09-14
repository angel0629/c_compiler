---
title: "feof"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feof?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Tests for end-of-file on a stream.

## Syntax

```
int feof(
   FILE *stream
);
```

### Parameters

_`stream`_  
Pointer to `FILE` structure.

## Return value

The **`feof`** function returns a nonzero value if a read operation has attempted to read past the end of the file; it returns 0 otherwise. If the stream pointer is `NULL`, the function invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the **`feof`** returns 0.

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`feof`** routine (implemented both as a function and as a macro) determines whether the end of _`stream`_ has been passed. When the end of file is passed, read operations return an end-of-file indicator until the stream is closed or until [`rewind`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rewind?view=msvc-170), `fsetpos`, [`fseek`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170), or `clearerr` is called against it.

For example, if a file contains 10 bytes and you read 10 bytes from the file, **`feof`** will return 0 because, even though the file pointer is at the end of the file, you haven't attempted to read beyond the end. Only after you try to read an 11th byte will **`feof`** return a nonzero value.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`feof`**

<stdio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_feof.c
// This program uses feof to indicate when
// it reaches the end of the file CRT_FEOF.TXT. It also
// checks for errors with ferror.
//

#include <stdio.h>
#include <stdlib.h>

int main( void )
{
   int  count, total = 0;
   char buffer[100];
   FILE *stream;

   fopen_s( &stream, "crt_feof.txt", "r" );
   if( stream == NULL )
      exit( 1 );

   // Cycle until end of file reached:
   while( !feof( stream ) )
   {
      // Attempt to read in 100 bytes:
      count = fread( buffer, sizeof( char ), 100, stream );
      if( ferror( stream ) )      {
         perror( "Read error" );
         break;
      }

      // Total up actual bytes read
      total += count;
   }
   printf( "Number of bytes read = %d\n", total );
   fclose( stream );
}
```

## Input: crt\_feof.txt

```
Line one.
Line two.
```

### Output

```
Number of bytes read = 19
```

## See also

[Error handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/error-handling-crt?view=msvc-170)  
[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`clearerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clearerr?view=msvc-170)  
[`_eof`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/eof?view=msvc-170)  
[`ferror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ferror?view=msvc-170)  
[`perror`, `_wperror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/perror-wperror?view=msvc-170)