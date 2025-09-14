---
title: "_fputc_nolock, _fputwc_nolock"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fputc-nolock-fputwc-nolock?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Writes a character to a stream without locking.

## Syntax

```
int _fputc_nolock(
   int c,
   FILE *stream
);
wint_t _fputwc_nolock(
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

Each of these functions returns the character written. For error information, see [`fputc`, `fputwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fputc-fputwc?view=msvc-170).

**`_fputc_nolock`** and **`_fputwc_nolock`** are identical to `fputc` and `fputwc`, respectively, except that they aren't protected from interference by other threads. They might be faster because they don't incur the overhead of locking out other threads. Use these functions only in thread-safe contexts such as single-threaded applications or where the calling scope already handles thread isolation.

The two functions behave identically if the stream is opened in ANSI mode. **`_fputc_nolock`** doesn't currently support output into a UNICODE stream.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_fputtc_nolock`

**`_fputc_nolock`**

**`_fputc_nolock`**

**`_fputwc_nolock`**

## Requirements

Function

Required header

**`_fputc_nolock`**

<stdio.h>

**`_fputwc_nolock`**

<stdio.h> or <wchar.h>

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles that are associated with the console—`stdin`, `stdout`, and `stderr`—must be redirected before C run-time functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_fputc_nolock.c
// This program uses _fputc_nolock
// to send a character array to stdout.

#include <stdio.h>

int main( void )
{
   char strptr1[] = "This is a test of _fputc_nolock!!\n";
   char *p;

   // Print line to stream using fputc.
   p = strptr1;
   while( (*p != '\0') && _fputc_nolock( *(p++), stdout ) != EOF ) ;

}
```

```
This is a test of _fputc_nolock!!
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fgetc`, `fgetwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgetc-fgetwc?view=msvc-170)  
[`putc`, `putwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putc-putwc?view=msvc-170)