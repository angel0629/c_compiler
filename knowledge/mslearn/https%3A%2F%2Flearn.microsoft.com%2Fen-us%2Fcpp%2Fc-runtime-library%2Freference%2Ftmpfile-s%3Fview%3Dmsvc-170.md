---
title: "tmpfile_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tmpfile-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Creates a temporary file. It's a version of [`tmpfile`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tmpfile?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t tmpfile_s(
   FILE** pFilePtr
);
```

### Parameters

_`pFilePtr`_  
The address of a pointer to store the address of the generated pointer to a stream.

## Return value

Returns 0 if successful, an error code on failure.

### Error conditions

_`pFilePtr`_

Return value

Contents of _`pFilePtr`_

`NULL`

`EINVAL`

not changed

If the above parameter validation error occurs, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL`, and the return value is `EINVAL`.

The **`tmpfile_s`** function creates a temporary file and puts a pointer to that stream in the _`pFilePtr`_ argument. The temporary file is created in the root directory. To create a temporary file in a directory other than the root, use [`tmpnam_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tmpnam-s-wtmpnam-s?view=msvc-170) or [`tempnam`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tempnam-wtempnam-tmpnam-wtmpnam?view=msvc-170) with [`fopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170).

If the file can't be opened, **`tmpfile_s`** writes `NULL` to the _`pFilePtr`_ parameter. This temporary file is automatically deleted when the file is closed, when the program terminates normally, or when `_rmtmp` is called, assuming that the current working directory doesn't change. The temporary file is opened in **w+b** (binary read/write) mode.

Failure can occur if you attempt more than `TMP_MAX_S` (see STDIO.H) calls with **`tmpfile_s`**.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`tmpfile_s`**

<stdio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

Note

This example may require administrative privileges to run on Windows.

```
// crt_tmpfile_s.c
// This program uses tmpfile_s to create a
// temporary file, then deletes this file with _rmtmp.
//

#include <stdio.h>

int main( void )
{
   FILE *stream;
   char tempstring[] = "String to be written";
   int  i;
   errno_t err;

   // Create temporary files.
   for( i = 1; i <= 3; i++ )
   {
      err = tmpfile_s(&stream);
      if( err )
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