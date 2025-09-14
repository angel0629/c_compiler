---
title: "fputs, fputws"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fputs-fputws?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Writes a string to a stream.

## Syntax

```
int fputs(
   const char *str,
   FILE *stream
);
int fputws(
   const wchar_t *str,
   FILE *stream
);
```

### Parameters

_`str`_  
Output string.

_`stream`_  
Pointer to `FILE` structure.

## Return value

Each of these functions returns a nonnegative value if it's successful. On an error, **`fputs`** and **`fputws`** return `EOF`. If _`str`_ or _`stream`_ is a null pointer, these functions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EINVAL` and then return `EOF`.

For more information on error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

Each of these functions copies _`str`_ to the output _`stream`_ at the current position. **`fputws`** copies the wide-character argument _`str`_ to _`stream`_ as a multibyte-character string or a wide-character string when _`stream`_ is opened in text mode or binary mode, respectively. Neither function copies the terminating null character.

The two functions behave identically if the stream is opened in ANSI mode. **`fputs`** doesn't currently support output into a UNICODE stream.

By default, this function's global state is scoped to the application. To change it, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_fputts`**

**`fputs`**

**`fputs`**

**`fputws`**

## Requirements

Function

Required header

**`fputs`**

<stdio.h>

**`fputws`**

<stdio.h> or <wchar.h>

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles that are associated with the console—**`stdin`**, **`stdout`**, and **`stderr`**—must be redirected before C runtime functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_fputs.c
// This program uses fputs to write
// a single line to the stdout stream.

#include <stdio.h>

int main( void )
{
   fputs( "Hello world from fputs.\n", stdout );
}
```

```
Hello world from fputs.
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fgets`, `fgetws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgets-fgetws?view=msvc-170)  
[`gets`, `_getws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/gets-getws?view=msvc-170)  
[`puts`, `_putws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/puts-putws?view=msvc-170)