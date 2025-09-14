---
title: "_getw"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getw?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets an integer from a stream.

## Syntax

```
int _getw(
   FILE *stream
);
```

### Parameters

_`stream`_  
Pointer to the `FILE` structure.

## Return value

**`_getw`** returns the integer value read. A return value of `EOF` indicates either an error or end of file. However, because the `EOF` value is also a legitimate integer value, use `feof` or `ferror` to verify an end-of-file or error condition. If _`stream`_ is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the function returns `EOF`.

The **`_getw`** function reads the next binary value of type **`int`** from the file associated with _`stream`_ and increments the associated file pointer (if one exists) to point to the next unread character. **`_getw`** doesn't assume any special alignment of items in the stream. Problems with porting can occur with **`_getw`** because the size of the **`int`** type and the ordering of bytes within the **`int`** type differ across systems.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_getw`**

<stdio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_getw.c
// This program uses _getw to read a word
// from a stream, then performs an error check.

#include <stdio.h>
#include <stdlib.h>

int main( void )
{
   FILE *stream;
   int i;

   if( fopen_s( &stream, "crt_getw.txt", "rb" ) )
      printf( "Couldn't open file\n" );
   else
   {
      // Read a word from the stream:
      i = _getw( stream );

      // If there is an error...
      if( ferror( stream ) )
      {
         printf( "_getw failed\n" );
         clearerr_s( stream );
      }
      else
         printf( "First data word in file: 0x%.4x\n", i );
      fclose( stream );
   }
}
```

### Input: crt\_getw.txt

```
Line one.
Line two.
```

### Output

```
First data word in file: 0x656e694c
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`_putw`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putw?view=msvc-170)