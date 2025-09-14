---
title: "_fputchar, _fputwchar"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fputchar-fputwchar?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Writes a character to `stdout`.

## Syntax

```
int _fputchar(
   int c
);
wint_t _fputwchar(
   wchar_t c
);
```

### Parameters

_`c`_  
Character to be written.

## Return value

Each of these functions returns the character written. For **`_fputchar`**, a return value of `EOF` indicates an error. For **`_fputwchar`**, a return value of `WEOF` indicates an error. If c is `NULL`, these functions generate an invalid parameter exception, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, **`_fputchar`** returns `EOF` (**`_fputwchar`** returns `WEOF`), and they set `errno` to `EINVAL`.

For more information about these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

Both of these functions write the single character argument _`c`_ to `stdout` and advance the indicator as appropriate. **`_fputchar`** is equivalent to `fputc( stdout )`. It's also equivalent to `putchar`, but implemented only as a function, rather than as a function and a macro. Unlike `fputc` and `putchar`, these functions aren't compatible with the ANSI standard.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_fputtchar`

**`_fputchar`**

**`_fputchar`**

**`_fputwchar`**

## Requirements

Function

Required header

**`_fputchar`**

<stdio.h>

**`_fputwchar`**

<stdio.h> or <wchar.h>

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles that are associated with the console—`stdin`, `stdout`, and `stderr`—must be redirected before C run-time functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_fputchar.c
// This program uses _fputchar
// to send a character array to stdout.

#include <stdio.h>

int main( void )
{
    char strptr[] = "This is a test of _fputchar!!\n";
    char *p = NULL;

    // Print line to stream using _fputchar.
    p = strptr;
    while( (*p != '\0') && _fputchar( *(p++) ) != EOF )
      ;
}
```

```
This is a test of _fputchar!!
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fgetc`, `fgetwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgetc-fgetwc?view=msvc-170)  
[`putc`, `putwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putc-putwc?view=msvc-170)