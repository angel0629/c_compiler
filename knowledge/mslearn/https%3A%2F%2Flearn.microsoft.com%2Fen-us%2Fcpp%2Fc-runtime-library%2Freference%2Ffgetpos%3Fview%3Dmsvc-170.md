---
title: "fgetpos"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgetpos?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets a stream's file-position indicator.

## Syntax

```
int fgetpos(
   FILE *stream,
   fpos_t *pos
);
```

### Parameters

_`stream`_  
Target stream.

_`pos`_  
Position-indicator storage.

## Return value

If successful, **`fgetpos`** returns 0. On failure, it returns a nonzero value and sets `errno` to one of the following manifest constants (defined in STDIO.H): `EBADF`, which means the specified stream isn't a valid file pointer or isn't accessible, or `EINVAL`, which means the _`stream`_ value or the value of _`pos`_ is invalid, such as if either is a null pointer. If _`stream`_ or _`pos`_ is a `NULL` pointer, the function invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170).

The **`fgetpos`** function gets the current value of the _`stream`_ argument's file-position indicator and stores it in the object pointed to by _`pos`_. The `fsetpos` function can later use information stored in _`pos`_ to reset the _`stream`_ argument's pointer to its position at the time **`fgetpos`** was called. The _`pos`_ value is stored in an internal format and is intended for use only by **`fgetpos`** and `fsetpos`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`fgetpos`**

<stdio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_fgetpos.c
// This program uses fgetpos and fsetpos to
// return to a location in a file.

#include <stdio.h>

int main( void )
{
   FILE   *stream;
   fpos_t pos;
   char   buffer[20];

   if( fopen_s( &stream, "crt_fgetpos.txt", "rb" ) ) {
      perror( "Trouble opening file" );
      return -1;
   }

   // Read some data and then save the position.
   fread( buffer, sizeof( char ), 8, stream );
   if( fgetpos( stream, &pos ) != 0 ) {
      perror( "fgetpos error" );
      return -1;
   }

   fread( buffer, sizeof( char ), 13, stream );
   printf( "after fgetpos: %.13s\n", buffer );

   // Restore to old position and read data
   if( fsetpos( stream, &pos ) != 0 ) {
      perror( "fsetpos error" );
      return -1;
   }

   fread( buffer, sizeof( char ), 13, stream );
   printf( "after fsetpos: %.13s\n", buffer );
   fclose( stream );
}
```

## Input: crt\_fgetpos.txt

```
fgetpos gets a stream's file-position indicator.
```

### Output crt\_fgetpos.txt

```
after fgetpos: gets a stream
after fsetpos: gets a stream
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fsetpos`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fsetpos?view=msvc-170)