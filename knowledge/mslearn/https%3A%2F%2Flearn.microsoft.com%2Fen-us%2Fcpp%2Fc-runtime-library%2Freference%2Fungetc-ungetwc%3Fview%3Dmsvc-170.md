---
title: "ungetc, ungetwc"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ungetc-ungetwc?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Pushes a character back onto the stream.

## Syntax

```
int ungetc(
   int c,
   FILE *stream
);
wint_t ungetwc(
   wint_t c,
   FILE *stream
);
```

### Parameters

_`c`_  
Character to be pushed.

_`stream`_  
Pointer to `FILE` structure.

## Return value

If successful, each of these functions returns the character argument _`c`_. If _`c`_ can't be pushed back or if no character has been read, the input stream is unchanged and **`ungetc`** returns `EOF`; **`ungetwc`** returns `WEOF`. If _`stream`_ is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `EOF` or `WEOF` is returned, and `errno` is set to `EINVAL`.

For information on these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`ungetc`** function pushes the character _`c`_ back onto _`stream`_ and clears the end-of-file indicator. The stream must be open for reading. A subsequent read operation on _`stream`_ starts with _`c`_. An attempt to push `EOF` onto the stream using **`ungetc`** is ignored.

Characters placed on the stream by **`ungetc`** may be erased if `fflush`, [`fseek`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170), `fsetpos`, or [`rewind`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rewind?view=msvc-170) is called before the character is read from the stream. The file-position indicator will have the value it had before the characters were pushed back. The external storage corresponding to the stream is unchanged. On a successful **`ungetc`** call against a text stream, the file-position indicator is unspecified until all the pushed-back characters are read or discarded. On each successful **`ungetc`** call against a binary stream, the file-position indicator is decremented; if its value was 0 before a call, the value is undefined after the call.

Results are unpredictable if **`ungetc`** is called twice without a read or file-positioning operation between the two calls. After a call to `fscanf`, a call to **`ungetc`** may fail unless another read operation (such as `getc`) has been performed, because `fscanf` itself calls **`ungetc`**.

**`ungetwc`** is a wide-character version of **`ungetc`**. However, on each successful **`ungetwc`** call against a text or binary stream, the value of the file-position indicator is unspecified until all pushed-back characters are read or discarded.

These functions are thread-safe and lock sensitive data during execution. For a non-locking version, see [`_ungetc_nolock`, `_ungetwc_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ungetc-nolock-ungetwc-nolock?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_ungettc`

**`ungetc`**

**`ungetc`**

**`ungetwc`**

## Requirements

Routine

Required header

**`ungetc`**

<stdio.h>

**`ungetwc`**

<stdio.h> or <wchar.h>

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles that are associated with the console, `stdin`, `stdout`, and `stderr`, must be redirected before C run-time functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_ungetc.c
// This program first converts a character
// representation of an unsigned integer to an integer. If
// the program encounters a character that is not a digit,
// the program uses ungetc to replace it in the  stream.
//

#include <stdio.h>
#include <ctype.h>

int main( void )
{
   int ch;
   int result = 0;

   // Read in and convert number:
   while( ((ch = getchar()) != EOF) && isdigit( ch ) )
      result = result * 10 + ch - '0';    // Use digit.
   if( ch != EOF )
      ungetc( ch, stdin );                // Put nondigit back.
   printf( "Number = %d\nNext character in stream = '%c'",
            result, getchar() );
}
```

```

      521aNumber = 521
Next character in stream = 'a'
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`getc`, `getwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getc-getwc?view=msvc-170)  
[`putc`, `putwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putc-putwc?view=msvc-170)