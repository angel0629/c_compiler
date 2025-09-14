---
title: "fgetc, fgetwc"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgetc-fgetwc?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Read a character from a stream.

## Syntax

```
int fgetc(
   FILE *stream
);
wint_t fgetwc(
   FILE *stream
);
```

### Parameters

_`stream`_  
Pointer to `FILE` structure.

## Return value

**`fgetc`** returns the character read as an **`int`** or returns `EOF` to indicate an error or end of file. **`fgetwc`** returns, as a [`wint_t`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170), the wide character that corresponds to the character read or returns `WEOF` to indicate an error or end of file. For both functions, use `feof` or `ferror` to distinguish between an error and an end-of-file condition. If a read error occurs, the error indicator for the stream is set. If _`stream`_ is `NULL`, **`fgetc`** and **`fgetwc`** invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EINVAL` and return `EOF`.

Each of these functions reads a single character from the current position of the file associated with _`stream`_. The function then increments the associated file pointer (if defined) to point to the next character. If the stream is at end of file, the end-of-file indicator for the stream is set.

**`fgetc`** is equivalent to `getc`, but is implemented only as a function, rather than as a function and a macro.

**`fgetwc`** is the wide-character version of **`fgetc`**; it reads **c** as a multibyte character or a wide character when _`stream`_ is opened in text mode or binary mode, respectively.

The versions with the `_nolock` suffix are identical except that they aren't protected from interference by other threads.

For more information about processing wide characters and multibyte characters in text and binary modes, see [Unicode stream I/O in text and binary modes](https://learn.microsoft.com/en-us/cpp/c-runtime-library/unicode-stream-i-o-in-text-and-binary-modes?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_fgettc`

**`fgetc`**

**`fgetc`**

**`fgetwc`**

## Requirements

Function

Required header

**`fgetc`**

<stdio.h>

**`fgetwc`**

<stdio.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_fgetc.c
// This program uses getc to read the first
// 80 input characters (or until the end of input)
// and place them into a string named buffer.

#include <stdio.h>
#include <stdlib.h>

int main( void )
{
   FILE *stream;
   char buffer[81];
   int  i, ch;

   // Open file to read line from:
   fopen_s( &stream, "crt_fgetc.txt", "r" );
   if( stream == NULL )
      exit( 0 );

   // Read in first 80 characters and place them in "buffer":
   ch = fgetc( stream );
   for( i=0; (i < 80 ) && ( feof( stream ) == 0 ); i++ )
   {
      buffer[i] = (char)ch;
      ch = fgetc( stream );
   }

   // Add null to end string
   buffer[i] = '\0';
   printf( "%s\n", buffer );
   fclose( stream );
}
```

## Input: crt\_fgetc.txt

```
Line one.
Line two.
```

### Output

```
Line one.
Line two.
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fputc`, `fputwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fputc-fputwc?view=msvc-170)  
[`getc`, `getwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getc-getwc?view=msvc-170)