---
title: "putc, putwc"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putc-putwc?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Writes a character to a stream.

## Syntax

```
int putc(
   int c,
   FILE *stream
);
wint_t putwc(
   wchar_t c,
   FILE *stream
);
```

### Parameters

_`c`_  
Character to be written.

_`stream`_  
Pointer to `FILE` structure.

## Return value

Returns the character written. To indicate an error or end-of-file condition, **`putc`** and `putchar` return `EOF`; **`putwc`** and `putwchar` return `WEOF`. For all four routines, use [`ferror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ferror?view=msvc-170) or [`feof`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feof?view=msvc-170) to check for an error or end of file. If passed a null pointer for _`stream`_, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return `EOF` or `WEOF`, and set `errno` to `EINVAL`.

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`putc`** routine writes the single character _`c`_ to the output _`stream`_ at the current position. Any integer can be passed to **`putc`**, but only the lower 8 bits are written. The `putchar` routine is identical to `putc( c, stdout )`. For each routine, if a read error occurs, the error indicator for the stream is set. **`putc`** and `putchar` are similar to `fputc` and `_fputchar`, respectively, but are implemented both as functions and as macros (see [Recommendations for choosing between functions and macros](https://learn.microsoft.com/en-us/cpp/c-runtime-library/recommendations-for-choosing-between-functions-and-macros?view=msvc-170)). **`putwc`** and `putwchar` are wide-character versions of **`putc`** and `putchar`, respectively. **`putwc`** and **`putc`** behave identically if the stream is opened in ANSI mode. **`putc`** doesn't currently support output into a UNICODE stream.

The versions with the `_nolock` suffix are identical except that they aren't protected from interference by other threads. For more information, see **\_putc\_nolock, \_putwc\_nolock**.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_puttc`

**`putc`**

**`putc`**

**`putwc`**

## Requirements

Routine

Required header

**`putc`**

<stdio.h>

**`putwc`**

<stdio.h> or <wchar.h>

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles that are associated with the console, `stdin`, `stdout`, and `stderr`, must be redirected before C run-time functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_putc.c
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
      ch = putc( *p, stream );
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