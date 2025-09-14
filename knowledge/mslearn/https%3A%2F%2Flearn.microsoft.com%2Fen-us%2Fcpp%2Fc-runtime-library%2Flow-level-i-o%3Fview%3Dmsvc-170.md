---
title: "Low-Level I/O"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/low-level-i-o?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
These functions invoke the operating system directly for lower-level operation than that provided by stream I/O. Low-level input and output calls don't buffer or format data.

Low-level routines can access the standard streams opened at program startup using the following predefined file descriptors.

Stream

File Descriptor

**`stdin`**

0

**`stdout`**

1

**`stderr`**

2

Low-level I/O routines set the [`errno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170) global variable when an error occurs. You must include `STDIO.H` when you use low-level functions only if your program requires a constant that is defined in `STDIO.H`, such as the end-of-file indicator (`EOF`).

## Low-level I/O functions

Function

Use

[`_close`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/close?view=msvc-170)

Close file

[`_commit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/commit?view=msvc-170)

Flush file to disk

[`_creat`, `_wcreat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creat-wcreat?view=msvc-170)

Create file

[`_dup`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/dup-dup2?view=msvc-170)

Return next available file descriptor for given file

[`_dup2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/dup-dup2?view=msvc-170)

Create second descriptor for given file

[`_eof`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/eof?view=msvc-170)

Test for end of file

[`_lseek`, `_lseeki64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lseek-lseeki64?view=msvc-170)

Reposition file pointer to given location

[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)

Open file

[`_read`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/read?view=msvc-170)

Read data from file

[`_sopen`, `_wsopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sopen-wsopen?view=msvc-170), [`_sopen_s`, `_wsopen_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sopen-s-wsopen-s?view=msvc-170)

Open file for file sharing

[`_tell`, `_telli64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tell-telli64?view=msvc-170)

Get current file-pointer position

[`_umask`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/umask?view=msvc-170), [`_umask_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/umask-s?view=msvc-170)

Set file-permission mask

[`_write`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/write?view=msvc-170)

Write data to file

`_dup` and `_dup2` are typically used to associate the predefined file descriptors with different files.

## See also

[Input and output](https://learn.microsoft.com/en-us/cpp/c-runtime-library/input-and-output?view=msvc-170)  
[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)  
[System calls](https://learn.microsoft.com/en-us/cpp/c-runtime-library/system-calls?view=msvc-170)