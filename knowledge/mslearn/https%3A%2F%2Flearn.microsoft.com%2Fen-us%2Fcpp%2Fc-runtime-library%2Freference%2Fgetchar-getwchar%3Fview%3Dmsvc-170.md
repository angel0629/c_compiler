---
title: "getchar, getwchar"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getchar-getwchar?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reads a character from standard input.

## Syntax

```
int getchar();
wint_t getwchar();
```

## Return value

Returns the character read. These functions wait for input and don't return until input is available.

To indicate a read error or end-of-file condition, **`getchar`** returns `EOF`, and **`getwchar`** returns `WEOF`. For **`getchar`**, use **`ferror`** or **`feof`** to check for an error or for end of file.

Each routine reads a single character from **`stdin`** and increments the associated file pointer to point to the next character. **`getchar`** is the same as [`_fgetchar`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgetc-fgetwc?view=msvc-170), but it's implemented as a function and as a macro.

These functions also lock the calling thread and are thread-safe. For a non-locking version, see [`_getchar_nolock`, `_getwchar_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getchar-nolock-getwchar-nolock?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_gettchar`

**`getchar`**

**`getchar`**

**`getwchar`**

## Requirements

Routine

Required header

**`getchar`**

`<stdio.h>`

**`getwchar`**

`<stdio.h>` or `<wchar.h>`

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles that are associated with the console, **`stdin`**, **`stdout`**, and **`stderr`**, must be redirected before C run-time functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_getchar.c
// Use getchar to read a line from stdin.

#include <stdio.h>

int main()
{
    char buffer[81];
    int i, ch;

    for (i = 0; (i < 80) && ((ch = getchar()) != EOF)
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