---
title: "_fdopen, _wfdopen"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fdopen-wfdopen?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Associates a stream with a file that was previously opened for low-level I/O.

## Syntax

```
FILE *_fdopen(
   int fd,
   const char *mode
);
FILE *_wfdopen(
   int fd,
   const wchar_t *mode
);
```

### Parameters

_`fd`_  
File descriptor of the open file.

_`mode`_  
Type of file access.

## Return value

Each of these functions returns a pointer to the open stream. A null pointer value indicates an error. When an error occurs, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set either to `EBADF`, which indicates a bad file descriptor, or `EINVAL`, which indicates that _`mode`_ was a null pointer.

For more information about these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_fdopen`** function associates an I/O stream with the file that is identified by _`fd`_, and thus allows a file that is opened for low-level I/O to be buffered and formatted. **`_wfdopen`** is a wide-character version of **`_fdopen`**; the _`mode`_ argument to **`_wfdopen`** is a wide-character string. **`_wfdopen`** and **`_fdopen`** otherwise behave identically.

File descriptors passed into **`_fdopen`** are owned by the returned `FILE *` stream. If **`_fdopen`** is successful, don't call [`_close`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/close?view=msvc-170) on the file descriptor. Calling [`fclose`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fclose-fcloseall?view=msvc-170) on the returned `FILE *` also closes the file descriptor.

By default, this function's global state is scoped to the application. To change it, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

The _`mode`_ character string specifies the type of file access requested for the file:

_`mode`_

Access

**`"r"`**

Opens for reading. If the file doesn't exist or can't be found, the **`fopen`** call fails.

**`"w"`**

Opens an empty file for writing. If the given file exists, its contents are destroyed.

**`"a"`**

Opens for writing at the end of the file (appending). Creates the file if it doesn't exist.

**`"r+"`**

Opens for both reading and writing. The file must exist.

**`"w+"`**

Opens an empty file for both reading and writing. If the file exists, its contents are destroyed.

**`"a+"`**

Opens for reading and appending. Creates the file if it doesn't exist.

When a file is opened with the **`"a"`** or **`"a+"`** access type, all write operations occur at the end of the file. The file pointer can be repositioned by using [`fseek`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170) or [`rewind`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rewind?view=msvc-170), but it's always moved back to the end of the file before any write operation is carried out. Thus, existing data can't be overwritten. When the **`"r+"`**, **`"w+"`**, or **`"a+"`** access type is specified, both reading and writing are allowed (the file is said to be open for "update"). However, when you switch between reading and writing, there must be an intervening [`fflush`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fflush?view=msvc-170), [`fsetpos`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fsetpos?view=msvc-170), [`fseek`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170), or [`rewind`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rewind?view=msvc-170) operation. You can specify the current position for the [`fsetpos`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fsetpos?view=msvc-170) or [`fseek`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170) operation, if you want to.

In addition to the above values, the following characters can also be included in _`mode`_ to specify the translation mode for newline characters:

_`mode`_ modifier

Behavior

**`t`**

Open in text (translated) mode. In this mode, carriage return-line feed (CR-LF) combinations are translated into one-line feeds (LF) on input, and LF characters are translated to CR-LF combinations on output. Also, Ctrl+Z is interpreted as an end-of-file character on input.

**`b`**

Open in binary (untranslated) mode. Any translations from **`t`** mode are suppressed.

**`c`**

Enable the commit flag for the associated _`filename`_ so that the contents of the file buffer are written directly to disk if either **`fflush`** or **`_flushall`** is called.

**`n`**

Reset the commit flag for the associated _`filename`_ to "no-commit." This flag is the default. It also overrides the global commit flag if you link your program with _`Commode.obj`_. The global commit flag default is "no-commit" unless you explicitly link your program with _`Commode.obj`_.

The **`t`**, **`c`**, and **`n`** _`mode`_ options are Microsoft extensions for **`fopen`** and **`_fdopen`**. Don't use them if you want to preserve ANSI portability.

If **`t`** or **`b`** isn't given in _`mode`_, the default translation mode is defined by the global variable [`_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/fmode?view=msvc-170). If **`t`** or **`b`** is prefixed to the argument, the function fails and returns `NULL`. For a discussion of text and binary modes, see [Text and binary mode file I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/text-and-binary-mode-file-i-o?view=msvc-170).

Valid characters for the _`mode`_ string used in **`fopen`** and **`_fdopen`** correspond to _`oflag`_ arguments used in [`_open`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170) and [`_sopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sopen-wsopen?view=msvc-170), as shown in this table:

Characters in _`mode`_ string

Equivalent _`oflag`_ value for **`_open`** and **`_sopen`**

**`a`**

`_O_WRONLY | _O_APPEND` (usually `_O_WRONLY | _O_CREAT | _O_APPEND`)

**`a+`**

`_O_RDWR | _O_APPEND` (usually `_O_RDWR | _O_APPEND | _O_CREAT`)

**`r`**

`_O_RDONLY`

**`r+`**

`_O_RDWR`

**`w`**

`_O_WRONLY` (usually `_O_WRONLY | _O_CREAT | _O_TRUNC`)

**`w+`**

`_O_RDWR` (usually `_O_RDWR | _O_CREAT | _O_TRUNC`)

**`b`**

`_O_BINARY`

**`t`**

`_O_TEXT`

**`c`**

None

**`n`**

None

## Requirements

Function

Required header

C++ header

**`_fdopen`**

`<stdio.h>`

`<cstdio>`

**`_wfdopen`**

`<stdio.h>` or `<wchar.h>`

`<cstdio>`

For more information on standards conformance and naming conventions in the C runtime library, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

### Generic-text routine mappings

`<tchar.h>` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_tfdopen`**

**`_fdopen`**

**`_fdopen`**

**`_wfdopen`**

## Example

```
// crt_fdopen.c
// This program opens a file by using low-level
// I/O, then uses _fdopen to switch to stream
// access. It counts the lines in the file.

#include <stdlib.h>
#include <stdio.h>
#include <fcntl.h>
#include <io.h>
#include <share.h>

int main( void )
{
   FILE *stream;
   int  fd, count = 0;
   char inbuf[128];

   // Open a file.
   if( _sopen_s( &fd, "crt_fdopen.txt", _O_RDONLY, _SH_DENYNO, 0 ) )
      exit( 1 );

   // Get stream from file descriptor.
   if( (stream = _fdopen( fd, "r" )) == NULL )
      exit( 1 );

   while( fgets( inbuf, 128, stream ) != NULL )
      count++;

   // After _fdopen, close by using fclose, not _close.
   fclose( stream );
   printf( "Lines in file: %d\n", count );
}
```

### Input: crt\_fdopen.txt

```
Line one
Line two
```

### Output

```
Lines in file: 2
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`_dup`, `_dup2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/dup-dup2?view=msvc-170)  
[`fclose`, `_fcloseall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fclose-fcloseall?view=msvc-170)  
[`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170)  
[`freopen`, `_wfreopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freopen-wfreopen?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)