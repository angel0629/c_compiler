---
title: "_fsopen, _wfsopen"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fsopen-wfsopen?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Opens a stream with file sharing.

## Syntax

```
FILE *_fsopen(
   const char *filename,
   const char *mode,
   int shflag
);
FILE *_wfsopen(
   const wchar_t *filename,
   const wchar_t *mode,
   int shflag
);
```

### Parameters

_`filename`_  
Name of the file to open.

_`mode`_  
Type of access permitted.

_`shflag`_  
Type of sharing allowed.

## Return value

Each of these functions returns a pointer to the stream. A null pointer value indicates an error. If _`filename`_ or _`mode`_ is `NULL` or an empty string, these functions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return `NULL` and set `errno` to `EINVAL`.

For more information about these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_fsopen`** function opens the file specified by _`filename`_ as a stream and prepares the file for subsequent shared reading or writing, as defined by the mode and _`shflag`_ arguments. **`_wfsopen`** is a wide-character version of **`_fsopen`**; the _`filename`_ and _`mode`_ arguments to **`_wfsopen`** are wide-character strings. **`_wfsopen`** and **`_fsopen`** behave identically otherwise.

The character string _`mode`_ specifies the type of access requested for the file, as shown in the following table.

Term

Definition

**"`r`"**

Opens for reading. If the file doesn't exist or can't be found, the **`_fsopen`** call fails.

**"`w`"**

Opens an empty file for writing. If the given file exists, its contents are destroyed.

**"`a`"**

Opens for writing at the end of the file (appending); creates the file first if it doesn't exist.

**"`r+`"**

Opens for both reading and writing. (The file must exist.)

**"`w+`"**

Opens an empty file for both reading and writing. If the given file exists, its contents are destroyed.

**"`a+`"**

Opens for reading and appending; creates the file first if it doesn't exist.

Use the **"`w`"** and **"`w+`"** types with care, as they can destroy existing files.

When a file is opened with the **"`a`"** or **"`a+`"** access type, all write operations occur at the end of the file. The file pointer can be repositioned using [`fseek`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170) or [`rewind`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rewind?view=msvc-170), but it's always moved back to the end of the file before any write operation is carried out. Thus, existing data can't be overwritten. When the **"`r+`"**, **"`w+`"**, or **"`a+`"** access type is specified, both reading and writing are allowed (the file is said to be open for update). However, when switching between reading and writing, there must be an intervening [`fsetpos`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fsetpos?view=msvc-170), [`fseek`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170), or [`rewind`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rewind?view=msvc-170) operation. The current position can be specified for the [`fsetpos`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fsetpos?view=msvc-170) or [`fseek`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170) operation, if desired. In addition to the above values, one of the following characters can be included in _`mode`_ to specify the translation mode for new lines, and for file management.

Term

Definition

**`t`**

Opens a file in text (translated) mode. In this mode, carriage return-line feed (CR-LF) combinations are translated into single line feeds (LF) on input and LF characters are translated to CR-LF combinations on output. Also, CTRL+Z is interpreted as an end-of-file character on input. In files opened for reading or reading/writing, **`_fsopen`** checks for a CTRL+Z at the end of the file and removes it, if possible. It's removed because using [`fseek`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170) and [`ftell`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftell-ftelli64?view=msvc-170) to move within a file that ends with a CTRL+Z might cause [`fseek`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170) to behave improperly near the end of the file.

**`b`**

Opens a file in binary (untranslated) mode; the above translations are suppressed.

**`D`**

Specifies a temporary file that's deleted when the last file pointer to it is closed.

**`R`**

Specifies that caching is optimized for, but not restricted to, random access from disk.

**`S`**

Specifies that caching is optimized for, but not restricted to, sequential access from disk.

**`T`**

Specifies a file that isn't written to disk unless memory pressure requires it.

If **`t`** or **`b`** isn't given in _`mode`_, the translation mode is defined by the default-mode variable **`_fmode`**. If **`t`** or **`b`** is prefixed to the argument, the function fails and returns `NULL`. For a discussion of text and binary modes, see [Text and binary mode file I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/text-and-binary-mode-file-i-o?view=msvc-170).

Regarding `T` and `D`:

*   `T` avoids writing the file to disk as long as memory pressure doesn't require it. For more information, see `FILE_ATTRIBUTE_TEMPORARY` in [File attribute constants](https://learn.microsoft.com/en-us/windows/win32/fileio/file-attribute-constants), and also this blog post [It's only temporary](https://learn.microsoft.com/en-us/archive/blogs/larryosterman/its-only-temporary).
*   `D` specifies a regular file that is written to disk. The difference is that it's automatically deleted when it's closed. You can combine `TD` to get both semantics.

`_fsopen` and `_wfsopen` are Microsoft-specific variants of [`fopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170). They aren't part of the ANSI standard. For a more portable and secure function, if you don't require file sharing, consider [`_wfopen_s` or `fopen_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-s-wfopen-s?view=msvc-170).

The argument _`shflag`_ is a constant expression consisting of one of the following manifest constants, defined in `Share.h`.

Term

Definition

`_SH_DENYNO`

Permits read and write access.

`_SH_DENYRD`

Denies read access to the file.

`_SH_DENYRW`

Denies read and write access to the file.

`_SH_DENYWR`

Denies write access to the file.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`Tchar.h` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_tfsopen`**

**`_fsopen`**

**`_fsopen`**

**`_wfsopen`**

## Requirements

Function

Required header

Optional headers

**`_fsopen`**

`<stdio.h>`

`<share.h>`

For manifest constant for _`shflag`_ parameter.

**`_wfsopen`**

`<stdio.h>` or `<wchar.h>`

`<share.h>`

For manifest constant for _`shflag`_ parameter.

## Example

```
// crt_fsopen.c

#include <stdio.h>
#include <stdlib.h>
#include <share.h>

int main( void )
{
   FILE *stream;

   // Open output file for writing. Using _fsopen allows us to
   // ensure that no one else writes to the file while we are
   // writing to it.
    //
   if( (stream = _fsopen( "outfile", "wt", _SH_DENYWR )) != NULL )
   {
      fprintf( stream, "No one else in the network can write "
                       "to this file until we are done.\n" );
      fclose( stream );
   }
   // Now others can write to the file while we read it.
   system( "type outfile" );
}
```

```
No one else in the network can write to this file until we are done.
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fclose`, `_fcloseall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fclose-fcloseall?view=msvc-170)  
[`_fdopen`, `_wfdopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fdopen-wfdopen?view=msvc-170)  
[`ferror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ferror?view=msvc-170)  
[`_fileno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fileno?view=msvc-170)  
[`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170)  
[`freopen`, `_wfreopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freopen-wfreopen?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)  
[`_setmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmode?view=msvc-170)  
[`_sopen`, `_wsopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sopen-wsopen?view=msvc-170)