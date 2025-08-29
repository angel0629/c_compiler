---
title: "_nolock Functions"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/nolock-functions?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The `_nolock` functions are versions of I/O functions that don't perform any locking. They're provided for users requiring maximum performance. For more information, see [Multithreaded libraries performance](https://learn.microsoft.com/en-us/cpp/c-runtime-library/multithreaded-libraries-performance?view=msvc-170).

Use `_nolock` functions only if your program is truly single-threaded or if it does its own locking.

## No lock routines

Routine

Use

[`_fclose_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fclose-nolock?view=msvc-170)

Closes a stream without locking

[`_fflush_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fflush-nolock?view=msvc-170)

Flushes a stream without locking

[`_fgetc_nolock`, `_fgetwc_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgetc-nolock-fgetwc-nolock?view=msvc-170)

Reads a character from a stream without locking

[`_fread_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fread-nolock?view=msvc-170)

Reads data from a stream without locking

[`_fseek_nolock`, `_fseeki64_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-nolock-fseeki64-nolock?view=msvc-170)

Moves the file pointer to a specified location without locking

[`_ftell_nolock`, `_ftelli64_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftell-nolock-ftelli64-nolock?view=msvc-170)

Gets the current position of a file pointer without locking

[`_fwrite_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fwrite-nolock?view=msvc-170)

Writes data to a stream without locking

[`_getc_nolock`, `_getwc_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getc-nolock-getwc-nolock?view=msvc-170)

Reads a character from a stream without locking

[`_getch_nolock`, `_getwch_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getch-nolock-getwch-nolock?view=msvc-170)

Gets a character from the console without echo and without locking

[`_getchar_nolock`, `_getwchar_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getchar-nolock-getwchar-nolock?view=msvc-170)

Reads a character from the standard input without locking

[`_getche_nolock`, `_getwche_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getche-nolock-getwche-nolock?view=msvc-170)

Gets a character from the console with echo and without locking

[`_getdcwd_nolock`, `_wgetdcwd_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdcwd-nolock-wgetdcwd-nolock?view=msvc-170)

Gets the full path of the current working directory on the specified drive

[`_putc_nolock`, `_putwc_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putc-nolock-putwc-nolock?view=msvc-170)

Writes a character to a stream without locking

[`_putch_nolock`, `_putwch_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putch-nolock-putwch-nolock?view=msvc-170)

Writes a character to the console without locking

[`_putchar_nolock`, `_putwchar_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putchar-nolock-putwchar-nolock?view=msvc-170)

Writes a character to `stdout` without locking

[`_ungetc_nolock`, `_ungetwc_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ungetc-nolock-ungetwc-nolock?view=msvc-170)

Pushes a character back onto the stream without locking

[`_ungetch_nolock`, `_ungetwch_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ungetch-ungetwch-ungetch-nolock-ungetwch-nolock?view=msvc-170)

Pushes back the last character that's read from the console without locking

## See also

[Input and output](https://learn.microsoft.com/en-us/cpp/c-runtime-library/input-and-output?view=msvc-170)  
[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)