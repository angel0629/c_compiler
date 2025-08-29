---
title: "Stream I/O"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
These functions process data in different sizes and formats, from single characters to large data structures. They also provide buffering, which can improve performance. The default size of a stream buffer is 4K. These routines affect only buffers created by the run-time library routines, and have no effect on buffers created by the operating system.

## Stream I/O routines

Routine

Use

[`clearerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clearerr?view=msvc-170), [`clearerr_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clearerr-s?view=msvc-170)

Clear error indicator for stream

[`fclose`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fclose-fcloseall?view=msvc-170)

Close stream

[`_fcloseall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fclose-fcloseall?view=msvc-170)

Close all open streams except **`stdin`**, **`stdout`**, and **`stderr`**

[`_fdopen`, `wfdopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fdopen-wfdopen?view=msvc-170)

Associate stream with file descriptor of open file

[`feof`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feof?view=msvc-170)

Test for end of file on stream

[`ferror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ferror?view=msvc-170)

Test for error on stream

[`fflush`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fflush?view=msvc-170)

Flush stream to buffer or storage device

[`fgetc`, `fgetwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgetc-fgetwc?view=msvc-170)

Read character from stream (function versions of **`getc`** and **`getwc`**)

[`_fgetchar`, `_fgetwchar`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgetc-fgetwc?view=msvc-170)

Read character from **`stdin`** (function versions of **`getchar`** and **`getwchar`**)

[`fgetpos`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgetpos?view=msvc-170)

Get position indicator of stream

[`fgets`, `fgetws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgets-fgetws?view=msvc-170)

Read string from stream

[`_fileno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fileno?view=msvc-170)

Get file descriptor associated with stream

[`_flushall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/flushall?view=msvc-170)

Flush all streams to buffer or storage device

[`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170), [`fopen_s`, `_wfopen_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-s-wfopen-s?view=msvc-170)

Open stream

[`fprintf`, `_fprintf_l`, `fwprintf`, `_fwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-fprintf-l-fwprintf-fwprintf-l?view=msvc-170), [`fprintf_s`, `_fprintf_s_l`, `fwprintf_s`, `_fwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-s-fprintf-s-l-fwprintf-s-fwprintf-s-l?view=msvc-170)

Write formatted data to stream

[`fputc`, `fputwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fputc-fputwc?view=msvc-170)

Write a character to a stream (function versions of **`putc`** and **`putwc`**)

[`_fputchar`, `_fputwchar`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fputc-fputwc?view=msvc-170)

Write character to **`stdout`** (function versions of **`putchar`** and **`putwchar`**)

[`fputs`, `fputws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fputs-fputws?view=msvc-170)

Write string to stream

[`fread`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fread?view=msvc-170)

Read unformatted data from stream

[`freopen`, `_wfreopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freopen-wfreopen?view=msvc-170), [`freopen_s`, `_wfreopen_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freopen-s-wfreopen-s?view=msvc-170)

Reassign `FILE` stream pointer to new file or device

[`fscanf`, `fwscanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fscanf-fscanf-l-fwscanf-fwscanf-l?view=msvc-170), [`fscanf_s`, `_fscanf_s_l`, `fwscanf_s`, `_fwscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fscanf-s-fscanf-s-l-fwscanf-s-fwscanf-s-l?view=msvc-170)

Read formatted data from stream

[`fseek`, `_fseeki64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170)

Move file position to given location

[`fsetpos`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fsetpos?view=msvc-170)

Set position indicator of stream

[`_fsopen`, `_wfsopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fsopen-wfsopen?view=msvc-170)

Open stream with file sharing

[`ftell`, `_ftelli64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftell-ftelli64?view=msvc-170)

Get current file position

[`fwrite`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fwrite?view=msvc-170)

Write unformatted data items to stream

[`getc`, `getwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getc-getwc?view=msvc-170)

Read character from stream (macro versions of **`fgetc`** and **`fgetwc`**)

[`getchar`, `getwchar`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getc-getwc?view=msvc-170)

Read character from **`stdin`** (macro versions of **`fgetchar`** and **`fgetwchar`**)

[`_getmaxstdio`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getmaxstdio?view=msvc-170)

Returns the number of simultaneously open files permitted at the stream I/O level.

[`gets_s`, `_getws_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gets-s-getws-s?view=msvc-170)

Read line from **`stdin`**

[`_getw`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getw?view=msvc-170)

Read binary **`int`** from stream

[`printf`, `_printf_l`, `wprintf`, `_wprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170), [`printf_s`, `_printf_s_l`, `wprintf_s`, `_wprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-s-printf-s-l-wprintf-s-wprintf-s-l?view=msvc-170)

Write formatted data to **`stdout`**

[`putc`, `putwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putc-putwc?view=msvc-170)

Write character to a stream (macro versions of **`fputc`** and **`fputwc`**)

[`putchar`, `putwchar`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putc-putwc?view=msvc-170)

Write character to **`stdout`** (macro versions of **`fputchar`** and **`fputwchar`**)

[`puts`, `_putws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/puts-putws?view=msvc-170)

Write line to stream

[`_putw`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putw?view=msvc-170)

Write binary **`int`** to stream

[`rewind`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rewind?view=msvc-170)

Move file position to beginning of stream

[`_rmtmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rmtmp?view=msvc-170)

Remove temporary files created by **`tmpfile`**

[`scanf`, `_scanf_l`, `wscanf`, `_wscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-scanf-l-wscanf-wscanf-l?view=msvc-170), [`scanf_s`, `_scanf_s_l`, `wscanf_s`, `_wscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-s-scanf-s-l-wscanf-s-wscanf-s-l?view=msvc-170)

Read formatted data from **`stdin`**

[`setbuf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setbuf?view=msvc-170)

Control stream buffering

[`_setmaxstdio`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmaxstdio?view=msvc-170)

Set a maximum for the number of simultaneously open files at the stream I/O level.

[`setvbuf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setvbuf?view=msvc-170)

Control stream buffering and buffer size

[`_snprintf`, `_snwprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/snprintf-snprintf-snprintf-l-snwprintf-snwprintf-l?view=msvc-170), [`_snprintf_s`, `_snprintf_s_l`, `_snwprintf_s`, `_snwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/snprintf-s-snprintf-s-l-snwprintf-s-snwprintf-s-l?view=msvc-170)

Write formatted data of specified length to string

[`_snscanf`, `_snwscanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/snscanf-snscanf-l-snwscanf-snwscanf-l?view=msvc-170), [`_snscanf_s`, `_snscanf_s_l`, `_snwscanf_s`, `_snwscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/snscanf-s-snscanf-s-l-snwscanf-s-snwscanf-s-l?view=msvc-170)

Read formatted data of a specified length from the standard input stream.

[`sprintf`, `swprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-sprintf-l-swprintf-swprintf-l-swprintf-l?view=msvc-170), [`sprintf_s`, `_sprintf_s_l`, `swprintf_s`, `_swprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-s-sprintf-s-l-swprintf-s-swprintf-s-l?view=msvc-170)

Write formatted data to string

[`sscanf`, `swscanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-sscanf-l-swscanf-swscanf-l?view=msvc-170), [`sscanf_s`, \_sscanf\_s\_l, `swscanf_s`, `_swscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-s-sscanf-s-l-swscanf-s-swscanf-s-l?view=msvc-170)

Read formatted data from string

[`_tempnam`, `_wtempnam`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tempnam-wtempnam-tmpnam-wtmpnam?view=msvc-170)

Generate temporary filename in given directory

[`tmpfile`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tmpfile?view=msvc-170), [`tmpfile_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tmpfile-s?view=msvc-170)

Create temporary file

[`tmpnam`, `_wtmpnam`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tempnam-wtempnam-tmpnam-wtmpnam?view=msvc-170), [`tmpnam_s`, `_wtmpnam_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tmpnam-s-wtmpnam-s?view=msvc-170)

Generate temporary filename

[`ungetc`, `ungetwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ungetc-ungetwc?view=msvc-170)

Push character back onto stream

[`_vcprintf`, `_vcwprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vcprintf-vcprintf-l-vcwprintf-vcwprintf-l?view=msvc-170), [`_vcprintf_s`, `_vcprintf_s_l`, `_vcwprintf_s`, `_vcwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vcprintf-s-vcprintf-s-l-vcwprintf-s-vcwprintf-s-l?view=msvc-170)

Write formatted data to the console.

[`vfprintf`, `vfwprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vfprintf-vfprintf-l-vfwprintf-vfwprintf-l?view=msvc-170), [`vfprintf_s`, `_vfprintf_s_l`, `vfwprintf_s`, `_vfwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vfprintf-s-vfprintf-s-l-vfwprintf-s-vfwprintf-s-l?view=msvc-170)

Write formatted data to stream

[`vprintf`, `vwprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vprintf-vprintf-l-vwprintf-vwprintf-l?view=msvc-170), [`vprintf_s`, `_vprintf_s_l`, `vwprintf_s`, `_vwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vprintf-s-vprintf-s-l-vwprintf-s-vwprintf-s-l?view=msvc-170)

Write formatted data to **`stdout`**

[`_vsnprintf`, `_vsnwprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsnprintf-vsnprintf-vsnprintf-l-vsnwprintf-vsnwprintf-l?view=msvc-170), [`vsnprintf_s`, `_vsnprintf_s`, `_vsnprintf_s_l`, `_vsnwprintf_s`, `_vsnwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsnprintf-s-vsnprintf-s-vsnprintf-s-l-vsnwprintf-s-vsnwprintf-s-l?view=msvc-170)

Write formatted data of specified length to buffer

[`vsprintf`, `vswprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsprintf-vsprintf-l-vswprintf-vswprintf-l-vswprintf-l?view=msvc-170), [`vsprintf_s`, `_vsprintf_s_l`, `vswprintf_s`, `_vswprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsprintf-s-vsprintf-s-l-vswprintf-s-vswprintf-s-l?view=msvc-170)

Write formatted data to buffer

When a program begins execution, the startup code automatically opens several streams: standard input (pointed to by **`stdin`**), standard output (pointed to by **`stdout`**), and standard error (pointed to by **`stderr`**). These streams are directed to the console (keyboard and screen) by default. Use **`freopen`** to redirect **`stdin`**, **`stdout`**, or **`stderr`** to a disk file or a device.

Files opened using the stream routines are buffered by default. The **`stdout`** and **`stderr`** functions are flushed whenever they're full or, if you're writing to a character device, after each library call. If a program terminates abnormally, output buffers may not be flushed, resulting in loss of data. Use **`fflush`** or **`_flushall`** to ensure that the buffer associated with a specified file is flushed to the operating system, or all open buffers are flushed. The operating system can cache data before writing it to disk. The commit-to-disk feature ensures that the flushed buffer contents aren't lost if there's a system failure.

There are two ways to commit buffer contents to disk:

*   Link with the file COMMODE.OBJ to set a global commit flag. The default setting of the global flag is **`n`**, for "no-commit."
*   Set the mode flag to **`c`** with **`fopen`** or **`_fdopen`**.

Any file specifically opened with either the **`c`** or the **`n`** flag behaves according to the flag, regardless of the state of the global commit/no-commit flag.

If your program doesn't explicitly close a stream, the stream is automatically closed when the program terminates. However, you should close a stream when your program finishes with it, as the number of streams that can be open at one time is limited. See [`_setmaxstdio`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmaxstdio?view=msvc-170) for information on this limit.

Input can follow output directly only with an intervening call to **`fflush`** or to a file-positioning function (**`fseek`**, **`fsetpos`**, or **`rewind`**). Input can be followed by output without an intervening call to a file-positioning function, if the input operation encounters the end of the file.

## See also

[Input and output](https://learn.microsoft.com/en-us/cpp/c-runtime-library/input-and-output?view=msvc-170)  
[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)