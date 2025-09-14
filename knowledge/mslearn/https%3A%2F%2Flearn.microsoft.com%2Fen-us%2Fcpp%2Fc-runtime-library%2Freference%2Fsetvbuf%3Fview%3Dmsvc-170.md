---
title: "setvbuf"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setvbuf?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Controls stream buffering and buffer size.

## Syntax

```
int setvbuf(
   FILE *stream,
   char *buffer,
   int mode,
   size_t size
);
```

### Parameters

_`stream`_  
Pointer to `FILE` structure.

_`buffer`_  
User-allocated buffer.

_`mode`_  
Mode of buffering.

_`size`_  
Buffer size in bytes. Allowable range: 2 <= _`size`_ <= INT\_MAX (2147483647). Internally, the value supplied for _`size`_ is rounded down to the nearest multiple of 2.

## Return value

Returns 0 if successful.

If _`stream`_ is `NULL`, or if _`mode`_ or _`size`_ isn't within a valid change, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function returns -1 and sets `errno` to `EINVAL`.

For information on these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`setvbuf`** function allows the program to control both buffering and buffer size for _`stream`_. _`stream`_ must refer to an open file that hasn't undergone an I/O operation since it was opened. The array pointed to by _`buffer`_ is used as the buffer, unless _`buffer`_ is `NULL`, in which case **`setvbuf`** uses an automatically allocated buffer of length _`size`_/2 \* 2 bytes.

The mode must be `_IOFBF`, `_IOLBF`, or `_IONBF`. If _`mode`_ is `_IOFBF` or `_IOLBF`, then _`size`_ is used as the size of the buffer. If _`mode`_ is `_IONBF`, the stream is unbuffered, and both _`size`_ and _`buffer`_ are ignored. Values for _`mode`_ and their meanings are:

_`mode`_ value

Meaning

`_IOFBF`

Full buffering; that is, _`buffer`_ is used as the buffer and _`size`_ is used as the size of the buffer. If _`buffer`_ is `NULL`, this mode uses an automatically allocated buffer that's _`size`_ bytes long.

`_IOLBF`

For some systems, this mode provides line buffering. However, for Win32, the behavior is the same as `_IOFBF` - Full Buffering.

`_IONBF`

No buffer is used, regardless of _`buffer`_ or _`size`_.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`setvbuf`**

<stdio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_setvbuf.c
// This program opens two streams: stream1
// and stream2. It then uses setvbuf to give stream1 a
// user-defined buffer of 1024 bytes and stream2 no buffer.
//

#include <stdio.h>

int main( void )
{
   char buf[1024];
   FILE *stream1, *stream2;

   if( fopen_s( &stream1, "data1", "a" ) == 0 &&
       fopen_s( &stream2, "data2", "w" ) == 0 )
   {
      if( setvbuf( stream1, buf, _IOFBF, sizeof( buf ) ) != 0 )
         printf( "Incorrect type or size of buffer for stream1\n" );
      else
         printf( "'stream1' now has a buffer of 1024 bytes\n" );
      if( setvbuf( stream2, NULL, _IONBF, 0 ) != 0 )
         printf( "Incorrect type or size of buffer for stream2\n" );
      else
         printf( "'stream2' now has no buffer\n" );
      _fcloseall();
   }
}
```

```
'stream1' now has a buffer of 1024 bytes
'stream2' now has no buffer
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fclose`, `_fcloseall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fclose-fcloseall?view=msvc-170)  
[`fflush`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fflush?view=msvc-170)  
[`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170)  
[`setbuf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setbuf?view=msvc-170)