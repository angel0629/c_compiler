---
title: "_getchar_nolock, _getwchar_nolock"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getchar-nolock-getwchar-nolock?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reads a character from the standard input without locking.

## Syntax

```
int _getchar_nolock( void );
wint_t _getwchar_nolock( void );
```

## Return value

See [`getchar`, `getwchar`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getchar-getwchar?view=msvc-170).

**`_getchar_nolock`** and **`_getwchar_nolock`** are identical to `getchar` and `getwchar` except that they aren't protected from interference by other threads. They might be faster because they don't incur the overhead of locking out other threads. Use these functions only in thread-safe contexts such as single-threaded applications or where the calling scope already handles thread isolation.

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_gettchar_nolock`

**`_getchar_nolock`**

**`_getchar_nolock`**

**`_getwchar_nolock`**

## Requirements

Routine

Required header

**`_getchar_nolock`**

<stdio.h>

**`_getwchar_nolock`**

<stdio.h> or <wchar.h>

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles that are associated with the console, `stdin`, `stdout`, and `stderr`, must be redirected before C run-time functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_getchar_nolock.c
// Use _getchar_nolock to read a line from stdin.

#include <stdio.h>

int main()
{
    char buffer[81];
    int i, ch;

    for (i = 0; (i < 80) && ((ch = _getchar_nolock()) != EOF)
                         && (ch != '\n'); i++)
    {
        buffer[i] = (char) ch;
    }

    // Terminate string with a null character

    buffer[i] = '\0';
    printf( "Input was: %s\n", buffer);
}
```

```

This textInput was: This text
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`getc`, `getwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getc-getwc?view=msvc-170)  
[`fgetc`, `fgetwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgetc-fgetwc?view=msvc-170)  
[`_getch`, `_getwch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getch-getwch?view=msvc-170)  
[`putc`, `putwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putc-putwc?view=msvc-170)  
[`ungetc`, `ungetwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ungetc-ungetwc?view=msvc-170)