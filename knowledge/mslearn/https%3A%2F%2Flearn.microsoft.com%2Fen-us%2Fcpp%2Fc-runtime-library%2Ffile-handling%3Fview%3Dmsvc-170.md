---
title: "File Handling"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Use these routines to create, delete, and manipulate files and to set and check file-access permissions.

The C run-time libraries have a 512 limit for the number of files that can be open at any one time. Attempting to open more than the maximum number of file descriptors or file streams causes program failure. Use [`_setmaxstdio`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmaxstdio?view=msvc-170) to change this number.

## File-handling routines (file descriptor)

These routines operate on files designated by a file descriptor.

Routine

Use

[`_chsize`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chsize?view=msvc-170), [`_chsize_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chsize-s?view=msvc-170)

Change file size

[`_filelength`, `_filelengthi64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/filelength-filelengthi64?view=msvc-170)

Get file length

[`_fstat`, `_fstat32`, `_fstat64`, `_fstati64`, `_fstat32i64`, `_fstat64i32`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fstat-fstat32-fstat64-fstati64-fstat32i64-fstat64i32?view=msvc-170)

Get file-status information on descriptor

[`_get_osfhandle`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-osfhandle?view=msvc-170)

Return operating-system file handle associated with existing C run-time file descriptor

[`_isatty`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isatty?view=msvc-170)

Check for character device

[`_locking`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/locking?view=msvc-170)

Lock areas of file

[`_open_osfhandle`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-osfhandle?view=msvc-170)

Associate C run-time file descriptor with existing operating-system file handle

[`_setmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmode?view=msvc-170)

Set file-translation mode

## File-Handling Routines (Path or Filename)

These routines operate on files specified by a path or filename.

Routine

Use

[`_access`, `_waccess`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/access-waccess?view=msvc-170), [`_access_s`, `_waccess_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/access-s-waccess-s?view=msvc-170)

Check file-permission setting

[`_chmod`, `_wchmod`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chmod-wchmod?view=msvc-170)

Change file-permission setting

[`_fullpath`, `_wfullpath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fullpath-wfullpath?view=msvc-170)

Expand a relative path to its absolute path name

[`_makepath`, `_wmakepath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/makepath-wmakepath?view=msvc-170), [`_makepath_s`, `_wmakepath_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/makepath-s-wmakepath-s?view=msvc-170)

Merge path components into single, full path

[`_mktemp`, `_wmktemp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktemp-wmktemp?view=msvc-170), [`_mktemp_s`, `_wmktemp_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktemp-s-wmktemp-s?view=msvc-170)

Create unique filename

[`remove`, `_wremove`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/remove-wremove?view=msvc-170)

Delete file

[`rename`, `_wrename`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rename-wrename?view=msvc-170)

Rename file

[`_splitpath`, `_wsplitpath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/splitpath-wsplitpath?view=msvc-170), [`_splitpath_s`, `_wsplitpath_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/splitpath-s-wsplitpath-s?view=msvc-170)

Parse path into components

[`_stat`, `_stat64`, `_stati64`, `_wstat`, `_wstat64`, `_wstati64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stat-functions?view=msvc-170)

Get file-status information on named file

[`_umask`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/umask?view=msvc-170), [`_umask_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/umask-s?view=msvc-170)

Set default permission mask for new files created by program

[`_unlink`, `_wunlink`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/unlink-wunlink?view=msvc-170)

Delete file

## File-Handling Routines (Open File)

These routines open files.

Routine

Use

[`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170), [`fopen_s`, `_wfopen_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-s-wfopen-s?view=msvc-170)

Opens a file and returns a pointer to the open file.

[`_fsopen`, `_wfsopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fsopen-wfsopen?view=msvc-170)

Open a stream with file sharing and returns a pointer to the open file.

[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)

Opens a file and returns a file descriptor to the opened file.

[`_sopen`, `_wsopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sopen-wsopen?view=msvc-170), [`_sopen_s`, `_wsopen_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sopen-s-wsopen-s?view=msvc-170)

Open a file with file sharing and returns a file descriptor to the open file.

[`_pipe`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/pipe?view=msvc-170)

Creates a pipe for reading and writing.

[`freopen`, `_wfreopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freopen-wfreopen?view=msvc-170), [`freopen_s`, `_wfreopen_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freopen-s-wfreopen-s?view=msvc-170)

Reassign a file pointer.

These routines provide a way to change the representation of the file between a `FILE` structure, a file descriptor, and a Win32 file handle.

Routine

Use

[`_fdopen`, `_wfdopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fdopen-wfdopen?view=msvc-170)

Associates a stream with a file that was previously opened for low-level I/O and returns a pointer to the open stream.

[`_fileno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fileno?view=msvc-170)

Gets the file descriptor associated with a stream.

[`_get_osfhandle`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-osfhandle?view=msvc-170)

Return operating-system file handle associated with existing C run-time file descriptor

[`_open_osfhandle`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-osfhandle?view=msvc-170)

Associates C run-time file descriptor with an existing operating-system file handle.

The following Win32 functions also open files and pipes:

*   [`CreateFile`](https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-createfilew)
*   [`CreatePipe`](https://learn.microsoft.com/en-us/windows/win32/api/namedpipeapi/nf-namedpipeapi-createpipe)
*   [`CreateNamedPipe`](https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-createnamedpipea)

## See also

[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)  
[Directory control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/directory-control?view=msvc-170)  
[System calls](https://learn.microsoft.com/en-us/cpp/c-runtime-library/system-calls?view=msvc-170)