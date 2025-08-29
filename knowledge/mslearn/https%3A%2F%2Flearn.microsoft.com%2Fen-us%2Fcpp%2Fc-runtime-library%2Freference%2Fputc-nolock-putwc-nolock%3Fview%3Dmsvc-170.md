---
title: "_putc_nolock, _putwc_nolock"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putc-nolock-putwc-nolock?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Writes a character to a stream without locking.

## Syntax

```
int _putc_nolock(
   int c,
   FILE *stream
);
wint_t _putwc_nolock(
   wchar_t c,
   FILE *stream
);
```

### Parameters

_`c`_  
Character to be written.

_`stream`_  
Pointer to the `FILE` structure.

## Return value

See **putc, putwc**.

**`_putc_nolock`** and **`_putwc_nolock`** are identical to the versions without the `_nolock` suffix except that they aren't protected from interference by other threads. They might be faster because they don't incur the overhead of locking out other threads. Use these functions only in thread-safe contexts such as single-threaded applications or where the calling scope already handles thread isolation.

**`_putwc_nolock`** is the wide-character version of **`_putc_nolock`**; the two functions behave identically if the stream is opened in ANSI mode. **`_putc_nolock`** doesn't currently support output into a UNICODE stream.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_puttc_nolock`

**`_putc_nolock`**

**`_putc_nolock`**

**`_putwc_nolock`**

## Requirements

Routine

Required header

**`_putc_nolock`**

<stdio.h>

**`_putwc_nolock`**

<stdio.h> or <wchar.h>

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles that are associated with the console, `stdin`, `stdout`, and `stderr`, must be redirected before C run-time functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_putc_nolock.c
/* This program uses putc to write buffer
* to a stream. If an error occurs, the program
* stops before writing the entire buffer.
*/

#include <stdio.h>

int main( void )
{
   FILE *stream;
   char *p, buffer[] = "This is the line of output\n";
   int  ch;

   ch = 0;
   /* Make standard out the stream and write to it. */
   stream = stdout;
   for( p = buffer; (ch != EOF) && (*p != '\0'); p++ )
      ch = _putc_nolock( *p, stream );
}
```

### Output

```
This is the line of output
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fputc`, `fputwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fputc-fputwc?view=msvc-170)  
[`getc`, `getwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getc-getwc?view=msvc-170)