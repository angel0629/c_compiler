---
title: "getc, getwc"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getc-getwc?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Read a character from a stream.

## Syntax

```
int getc(
   FILE *stream
);
wint_t getwc(
   FILE *stream
);
```

### Parameters

_`stream`_  
Input stream.

## Return value

Returns the character read. To indicate a read error or end-of-file condition, **`getc`** returns `EOF`, and **`getwc`** returns `WEOF`. For **`getc`**, use `ferror` or `feof` to check for an error or for end of file. If _`stream`_ is `NULL`, **`getc`** and **`getwc`** invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return `EOF` (or `WEOF` for **`getwc`**), and set `errno` to `EINVAL`.

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

Each routine reads a single character from a file at the current position and increments the associated file pointer (if defined) to point to the next character. The file is associated with _`stream`_.

These functions lock the calling thread and are therefore thread-safe. For a non-locking version, see [`_getc_nolock`, `_getwc_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getc-nolock-getwc-nolock?view=msvc-170).

Routine-specific remarks follow.

Routine

Remarks

**`getc`**

Same as `fgetc`, but implemented as a function and as a macro.

**`getwc`**

Wide-character version of **`getc`**. Reads a multibyte character or a wide character according to whether _`stream`_ is opened in text mode or binary mode.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_gettc`

**`getc`**

**`getc`**

**`getwc`**

## Requirements

Routine

Required header

**`getc`**

<stdio.h>

**`getwc`**

<stdio.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_getc.c
// Use getc to read a line from a file.

#include <stdio.h>

int main()
{
    char buffer[81];
    int i, ch;
    FILE* fp;

    // Read a single line from the file "crt_getc.txt".

    fopen_s(&fp, "crt_getc.txt", "r");
    if (!fp)
    {
       printf("Failed to open file crt_getc.txt.\n");
       exit(1);
    }

    for (i = 0; (i < 80) && ((ch = getc(fp)) != EOF)
                         && (ch != '\n'); i++)
    {
        buffer[i] = (char) ch;
    }

    // Terminate string with a null character
    buffer[i] = '\0';
    printf( "Input was: %s\n", buffer);

    fclose(fp);
}
```

### Input: crt\_getc.txt

```
Line one.
Line two.
```

### Output

```
Input was: Line one.
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fgetc`, `fgetwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgetc-fgetwc?view=msvc-170)  
[`_getch`, `_getwch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getch-getwch?view=msvc-170)  
[`putc`, `putwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putc-putwc?view=msvc-170)  
[`ungetc`, `ungetwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ungetc-ungetwc?view=msvc-170)