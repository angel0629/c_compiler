---
title: "fputc, fputwc"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fputc-fputwc?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Writes a character to a stream.

## Syntax

```
int fputc(
   int c,
   FILE *stream
);
wint_t fputwc(
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

Each of these functions returns the character written. For **`fputc`**, a return value of `EOF` indicates an error. For **`fputwc`**, a return value of `WEOF` indicates an error. If _`stream`_ is `NULL`, these functions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, they return `EOF` and set `errno` to `EINVAL`.

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

Each of these functions writes the single character _`c`_ to a file at the position indicated by the associated file position indicator, if defined. The functions advance the indicator as appropriate. In **`fputc`** and **`fputwc`**, the file is associated with _`stream`_. If the file can't support positioning requests or was opened in append mode, the character is appended to the end of the stream.

The two functions behave identically if the stream is opened in ANSI mode. **`fputc`** doesn't currently support output into a UNICODE stream.

The versions with the `_nolock` suffix are identical except that they aren't protected from interference by other threads. For more information, see[`_fputc_nolock`, `_fputwc_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fputc-nolock-fputwc-nolock?view=msvc-170).

Routine-specific remarks follow.

Routine

Remarks

**`fputc`**

Equivalent to `putc`, but implemented only as a function, rather than as a function and a macro.

**`fputwc`**

Wide-character version of `fputc`. Writes _`c`_ as a multibyte character or a wide character when _`stream`_ is opened in text mode or binary mode, respectively.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_fputtc`

**`fputc`**

**`fputc`**

**`fputwc`**

## Requirements

Function

Required header

**`fputc`**

<stdio.h>

**`fputwc`**

<stdio.h> or <wchar.h>

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles that are associated with the console—`stdin`, `stdout`, and `stderr`—must be redirected before C run-time functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_fputc.c
// This program uses fputc
// to send a character array to stdout.

#include <stdio.h>

int main( void )
{
   char strptr1[] = "This is a test of fputc!!\n";
   char *p;

   // Print line to stream using fputc.
   p = strptr1;
   while( (*p != '\0') && fputc( *(p++), stdout ) != EOF ) ;

}
```

```
This is a test of fputc!!
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fgetc`, `fgetwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgetc-fgetwc?view=msvc-170)  
[`putc`, `putwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putc-putwc?view=msvc-170)