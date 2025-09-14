---
title: "puts, _putws"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/puts-putws?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Writes a string to `stdout`.

## Syntax

```
int puts(
   const char *str
);
int _putws(
   const wchar_t *str
);
```

### Parameters

_`str`_  
Output string.

## Return value

Returns a nonnegative value if successful. If **`puts`** fails, it returns `EOF`; if **`_putws`** fails, it returns `WEOF`. If _`str`_ is a null pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the functions set `errno` to `EINVAL` and return `EOF` or `WEOF`.

For information on these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`puts`** function writes _`str`_ to the standard output stream `stdout`, replacing the string's terminating null character ('\\0') with a newline character ('\\n') in the output stream.

**`_putws`** is the wide-character version of **`puts`**; the two functions behave identically if the stream is opened in ANSI mode. **`puts`** doesn't currently support output into a UNICODE stream.

`_putwch` writes Unicode characters using the current CONSOLE LOCALE setting.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_putts`

**`puts`**

**`puts`**

**`_putws`**

## Requirements

Routine

Required header

**`puts`**

<stdio.h>

**`_putws`**

<stdio.h>

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles that are associated with the console, `stdin`, `stdout`, and `stderr`, must be redirected before C run-time functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_puts.c
// This program uses puts to write a string to stdout.

#include <stdio.h>

int main( void )
{
   puts( "Hello world from puts!" );
}
```

### Output

```
Hello world from puts!
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fputs`, `fputws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fputs-fputws?view=msvc-170)  
[`fgets`, `fgetws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgets-fgetws?view=msvc-170)