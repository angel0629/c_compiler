---
title: "tmpfile"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tmpfile?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Creates a temporary file. This function is deprecated because a more secure version is available; see [`tmpfile_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tmpfile-s?view=msvc-170).

## Syntax

```
FILE *tmpfile( void );
```

## Return value

If successful, **`tmpfile`** returns a stream pointer. Otherwise, it returns a `NULL` pointer.

The **`tmpfile`** function creates a temporary file and returns a pointer to that stream. The temporary file is created in the root directory. To create a temporary file in a directory other than the root, use [`tmpnam`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tempnam-wtempnam-tmpnam-wtmpnam?view=msvc-170) or [`tempnam`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tempnam-wtempnam-tmpnam-wtmpnam?view=msvc-170) with [`fopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170).

If the file can't be opened, **`tmpfile`** returns a `NULL` pointer. This temporary file is automatically deleted when the file is closed, when the program terminates normally, or when `_rmtmp` is called, assuming that the current working directory doesn't change. The temporary file is opened in **w+b** (binary read/write) mode.

Failure can occur if you attempt more than TMP\_MAX (see STDIO.H) calls with **`tmpfile`**.

## Requirements

Routine

Required header

**`tmpfile`**

<stdio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

Note

This example requires administrative privileges to run on Windows Vista.

```
// crt_tmpfile.c
// compile with: /W3
// This program uses tmpfile to create a
// temporary file, then deletes this file with _rmtmp.
#include <stdio.h>

int main( void )
{
   FILE *stream;
   int  i;

   // Create temporary files.
   for( i = 1; i <= 3; i++ )
   {
      if( (stream = tmpfile()) == NULL ) // C4996
      // Note: tmpfile is deprecated; consider using tmpfile_s instead
         perror( "Could not open new temporary file\n" );
      else
         printf( "Temporary file %d was created\n", i );
   }

   // Remove temporary files.
   printf( "%d temporary files deleted\n", _rmtmp() );
}
```

```
Temporary file 1 was created
Temporary file 2 was created
Temporary file 3 was created
3 temporary files deleted
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`_rmtmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rmtmp?view=msvc-170)  
[`_tempnam`, `_wtempnam`, `tmpnam`, `_wtmpnam`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tempnam-wtempnam-tmpnam-wtmpnam?view=msvc-170)