---
title: "Directory Control"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/directory-control?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
These routines access, modify, and obtain information about the directory structure.

## Directory-control routines

Routine

Use

[`_chdir`, `_wchdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chdir-wchdir?view=msvc-170)

Change current working directory

[`_chdrive`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chdrive?view=msvc-170)

Change current drive

[`_getcwd`, `_wgetcwd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getcwd-wgetcwd?view=msvc-170)

Get current working directory for default drive

[`_getdcwd`, `_wgetdcwd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdcwd-wgetdcwd?view=msvc-170)

Get current working directory for specified drive

[`_getdiskfree`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdiskfree?view=msvc-170)

Populates a `_diskfree_t` structure with information about a disk drive.

[`_getdrive`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdrive?view=msvc-170)

Get current (default) drive

[`_getdrives`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdrives?view=msvc-170)

Returns a bitmask representing the currently available disk drives.

[`_mkdir`, `_wmkdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mkdir-wmkdir?view=msvc-170)

Make new directory

[`_rmdir`, `_wrmdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rmdir-wrmdir?view=msvc-170)

Remove directory

[`_searchenv`, `_wsearchenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/searchenv-wsearchenv?view=msvc-170), [`_searchenv_s`, `_wsearchenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/searchenv-s-wsearchenv-s?view=msvc-170)

Search for given file on specified paths

## See also

[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)  
[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[System calls](https://learn.microsoft.com/en-us/cpp/c-runtime-library/system-calls?view=msvc-170)