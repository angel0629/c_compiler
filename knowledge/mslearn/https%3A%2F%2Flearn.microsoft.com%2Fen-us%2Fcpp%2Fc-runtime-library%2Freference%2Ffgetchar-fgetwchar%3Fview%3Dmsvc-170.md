---
title: "_fgetchar, _fgetwchar"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgetchar-fgetwchar?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reads a character from `stdin`.

## Syntax

```
int _fgetchar( void );
wint_t _fgetwchar( void );
```

## Return value

**\_fgetchar** returns the character read as an **`int`** or returns `EOF` to indicate an error or end of file. **\_fgetwchar** returns, as a [`wint_t`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170), the wide character that corresponds to the character read or returns `WEOF` to indicate an error or end of file. For both functions, use `feof` or `ferror` to distinguish between an error and an end-of-file condition.

These functions read a single character from `stdin`. The function then increments the associated file pointer (if defined) to point to the next character. If the stream is at end of file, the end-of-file indicator for the stream is set.

**`_fgetchar`** is equivalent to `fgetc( stdin )`. It's also equivalent to `getchar`, but implemented only as a function, rather than as a function and a macro. **`_fgetwchar`** is the wide-character version of **`_fgetchar`**.

These functions aren't compatible with the ANSI standard.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_fgettchar`

**`_fgetchar`**

**`_fgetchar`**

**`_fgetwchar`**

## Requirements

Function

Required header

**`_fgetchar`**

<stdio.h>

**`_fgetwchar`**

<stdio.h> or <wchar.h>

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles that are associated with the console—`stdin`, `stdout`, and `stderr`—must be redirected before C run-time functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_fgetchar.c
// This program uses _fgetchar to read the first
// 80 input characters (or until the end of input)
// and place them into a string named buffer.
//

#include <stdio.h>
#include <stdlib.h>

int main( void )
{
   char buffer[81];
   int  i, ch;

   // Read in first 80 characters and place them in "buffer":
   ch = _fgetchar();
   for( i=0; (i < 80 ) && ( feof( stdin ) == 0 ); i++ )
   {
      buffer[i] = (char)ch;
      ch = _fgetchar();
   }

   // Add null to end string
   buffer[i] = '\0';
   printf( "%s\n", buffer );
}
```

```

      Line one.
Line two.Line one.
Line two.
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fputc`, `fputwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fputc-fputwc?view=msvc-170)  
[`getc`, `getwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getc-getwc?view=msvc-170)