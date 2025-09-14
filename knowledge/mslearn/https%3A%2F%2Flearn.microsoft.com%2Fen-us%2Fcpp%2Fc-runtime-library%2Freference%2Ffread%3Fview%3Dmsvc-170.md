---
title: "fread"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fread?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reads data from a stream.

## Syntax

```
size_t fread(
   void *buffer,
   size_t size,
   size_t count,
   FILE *stream
);
```

### Parameters

_`buffer`_  
Storage location for data.

_`size`_  
Item size in bytes.

_`count`_  
Maximum number of items to be read.

_`stream`_  
Pointer to `FILE` structure.

## Return value

**`fread`** returns the number of full items the function read, which may be less than _`count`_ if an error occurs, or if it encounters the end of the file before reaching _`count`_. Use the **`feof`** or **`ferror`** function to distinguish a read error from an end-of-file condition. If _`size`_ or _`count`_ is 0, **`fread`** returns 0 and the buffer contents are unchanged. If _`stream`_ or _`buffer`_ is a null pointer, **`fread`** invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function sets `errno` to `EINVAL` and returns 0.

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`fread`** function reads up to _`count`_ items of _`size`_ bytes from the input _`stream`_ and stores them in _`buffer`_. The file pointer associated with _`stream`_ (if one exists) is advanced by the number of bytes **`fread`** read. If the given stream is opened in [text mode](https://learn.microsoft.com/en-us/cpp/c-runtime-library/text-and-binary-mode-file-i-o?view=msvc-170), Windows-style newlines are converted into Unix-style newlines. That is, carriage return-line feed (CRLF) pairs are replaced by single line feed (LF) characters. The replacement has no effect on the file pointer or the return value. The file-pointer position is indeterminate if an error occurs. The value of a partially read item can't be determined.

When used on a text mode stream, if the amount of data requested (that is, _`size`_ \* _`count`_) is greater than or equal to the internal `FILE` \* buffer size (by default the size is 4096 bytes, configurable by using [`setvbuf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setvbuf?view=msvc-170)), stream data is copied directly into the user-provided buffer, and newline conversion is done in that buffer. Since the converted data may be shorter than the stream data copied into the buffer, data past _`buffer`_\[_`return_value`_ \* _`size`_\] (where _`return_value`_ is the return value from **`fread`**) may contain unconverted data from the file. For this reason, we recommend you null-terminate character data at _`buffer`_\[_`return_value`_ \* _`size`_\] if the intent of the buffer is to act as a C-style string. See [`fopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170) for details on the effects of text mode and binary mode.

This function locks out other threads. If you need a non-locking version, use **`_fread_nolock`**.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`fread`**

`<stdio.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_fread.c
// This program opens a file named FREAD.OUT and
// writes 25 characters to the file. It then tries to open
// FREAD.OUT and read in 25 characters. If the attempt succeeds,
// the program displays the number of actual items read.

#include <stdio.h>

int main( void )
{
   FILE *stream;
   char list[30];
   int  i, numread, numwritten;

   // Open file in text mode:
   if( fopen_s( &stream, "fread.out", "w+t" ) == 0 )
   {
      for ( i = 0; i < 25; i++ )
         list[i] = (char)('z' - i);
      // Write 25 characters to stream
      numwritten = fwrite( list, sizeof( char ), 25, stream );
      printf( "Wrote %d items\n", numwritten );
      fclose( stream );

   }
   else
      printf( "Problem opening the file\n" );

   if( fopen_s( &stream, "fread.out", "r+t" ) == 0 )
   {
      // Attempt to read in 25 characters
      numread = fread( list, sizeof( char ), 25, stream );
      printf( "Number of items read = %d\n", numread );
      printf( "Contents of buffer = %.25s\n", list );
      fclose( stream );
   }
   else
      printf( "File could not be opened\n" );
}
```

```
Wrote 25 items
Number of items read = 25
Contents of buffer = zyxwvutsrqponmlkjihgfedcb
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[Text and binary mode file I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/text-and-binary-mode-file-i-o?view=msvc-170)  
[`fopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170)  
[`fwrite`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fwrite?view=msvc-170)  
[`_read`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/read?view=msvc-170)