---
title: "setbuf"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setbuf?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Controls stream buffering. This function is deprecated; use [`setvbuf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setvbuf?view=msvc-170) instead.

## Syntax

```
void setbuf(
   FILE *stream,
   char *buffer
);
```

### Parameters

_`stream`_  
Pointer to `FILE` structure.

_`buffer`_  
User-allocated buffer.

The **`setbuf`** function controls buffering for _`stream`_. The _`stream`_ argument must refer to an open file that hasn't been read or written. If the _`buffer`_ argument is `NULL`, the stream is unbuffered. If not, the buffer must point to a character array of length `BUFSIZ`, where `BUFSIZ` is the buffer size as defined in STDIO.H. The user-specified buffer, instead of the default system-allocated buffer for the given stream, is used for I/O buffering. The `stderr` stream is unbuffered by default, but you can use **`setbuf`** to assign buffers to `stderr`.

**`setbuf`** has been replaced by [`setvbuf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setvbuf?view=msvc-170), which is the preferred routine for new code. Unlike `setvbuf`, **`setbuf`** has no way of reporting errors. `setvbuf` also lets you control both the buffering mode and the buffer size. **`setbuf`** exists for compatibility with existing code.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`setbuf`**

<stdio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_setbuf.c
// compile with: /W3
// This program first opens files named DATA1 and
// DATA2. Then it uses setbuf to give DATA1 a user-assigned
// buffer and to change DATA2 so that it has no buffer.

#include <stdio.h>

int main( void )
{
   char buf[BUFSIZ];
   FILE *stream1, *stream2;

   fopen_s( &stream1, "data1", "a" );
   fopen_s( &stream2, "data2", "w" );

   if( (stream1 != NULL) && (stream2 != NULL) )
   {
      // "stream1" uses user-assigned buffer:
      setbuf( stream1, buf ); // C4996
      // Note: setbuf is deprecated; consider using setvbuf instead
      printf( "stream1 set to user-defined buffer at: %Fp\n", buf );

      // "stream2" is unbuffered
      setbuf( stream2, NULL ); // C4996
      printf( "stream2 buffering disabled\n" );
      _fcloseall();
   }
}
```

```
stream1 set to user-defined buffer at: 0012FCDC
stream2 buffering disabled
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fclose`, `_fcloseall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fclose-fcloseall?view=msvc-170)  
[`fflush`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fflush?view=msvc-170)  
[`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170)  
[`setvbuf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setvbuf?view=msvc-170)