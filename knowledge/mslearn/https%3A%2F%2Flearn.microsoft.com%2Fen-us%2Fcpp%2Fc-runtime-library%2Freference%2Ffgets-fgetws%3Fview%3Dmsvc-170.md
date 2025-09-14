---
title: "fgets, fgetws"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgets-fgetws?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Get a string from a stream.

## Syntax

```
char *fgets(
   char *str,
   int numChars,
   FILE *stream
);
wchar_t *fgetws(
   wchar_t *str,
   int numChars,
   FILE *stream
);
```

### Parameters

_`str`_  
Storage location for data.

_`numChars`_  
Maximum number of characters to read.

_`stream`_  
Pointer to `FILE` structure.

## Return value

Each of these functions returns _`str`_. `NULL` is returned to indicate an error or an end-of-file condition. Use **`feof`** or **`ferror`** to determine whether an error occurred. If _`str`_ or _`stream`_ is a null pointer, or _`numChars`_ is less than or equal to zero, this function invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the function returns `NULL`.

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`fgets`** function reads a string from the input _`stream`_ argument and stores it in _`str`_. **`fgets`** reads characters from the current stream position to and including the first newline character, to the end of the stream, or until the number of characters read is equal to _`numChars`_ - 1, whichever comes first. The result stored in _`str`_ is appended with a null character. The newline character, if read, is included in the string.

**`fgetws`** is a wide-character version of **`fgets`**.

**`fgetws`** reads the wide-character argument _`str`_ as a multibyte-character string or as a wide-character string when _`stream`_ is opened in text mode or binary mode, respectively. For more information about using text and binary modes in Unicode and multibyte stream-I/O, see [Text and binary mode file I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/text-and-binary-mode-file-i-o?view=msvc-170) and [Unicode stream I/O in text and binary modes](https://learn.microsoft.com/en-us/cpp/c-runtime-library/unicode-stream-i-o-in-text-and-binary-modes?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_fgetts`**

**`fgets`**

**`fgets`**

**`fgetws`**

## Requirements

Function

Required header

**`fgets`**

`<stdio.h>`

**`fgetws`**

`<stdio.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_fgets.c
// This program uses fgets to display
// the first line from a file.

#include <stdio.h>

int main( void )
{
   FILE *stream;
   char line[100];

   if( fopen_s( &stream, "crt_fgets.txt", "r" ) == 0 )
   {
      if( fgets( line, 100, stream ) == NULL)
         printf( "fgets error\numChars" );
      else
         printf( "%s", line);
      fclose( stream );
   }
}
```

### Input: `crt_fgets.txt`

```
Line one.
Line two.
```

### Output

```
Line one.
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fputs`, `fputws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fputs-fputws?view=msvc-170)  
[`gets`, `_getws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/gets-getws?view=msvc-170)  
[`puts`, `_putws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/puts-putws?view=msvc-170)