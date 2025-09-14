---
title: "freopen, _wfreopen"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freopen-wfreopen?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reassigns a file pointer. More secure versions of the functions are available; see [`freopen_s`, `_wfreopen_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freopen-s-wfreopen-s?view=msvc-170).

## Syntax

```
FILE *freopen(
   const char *path,
   const char *mode,
   FILE *stream
);
FILE *_wfreopen(
   const wchar_t *path,
   const wchar_t *mode,
   FILE *stream
);
```

### Parameters

_`path`_  
Path of new file.

_`mode`_  
Type of access permitted.

_`stream`_  
Pointer to `FILE` structure.

## Return value

Each of these functions returns a pointer to the newly opened file. If an error occurs, the original file is closed, and the function returns a `NULL` pointer value. If _`path`_, _`mode`_, or _`stream`_ is a null pointer, or if _`filename`_ is an empty string, these functions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EINVAL` and return `NULL`.

For more information on error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

More secure versions of these functions exist, see [`freopen_s`, `_wfreopen_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freopen-s-wfreopen-s?view=msvc-170).

The **`freopen`** function closes the file currently associated with _`stream`_ and reassigns _`stream`_ to the file specified by _`path`_. **`_wfreopen`** is a wide-character version of **`_freopen`**; the _`path`_ and _`mode`_ arguments to **`_wfreopen`** are wide-character strings. **`_wfreopen`** and **`_freopen`** behave identically otherwise.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_tfreopen`**

**`freopen`**

**`freopen`**

**`_wfreopen`**

**`freopen`** is typically used to redirect the pre-opened files **`stdin`**, **`stdout`**, and **`stderr`** to files specified by the user. The new file associated with _`stream`_ is opened with _`mode`_, which is a character string specifying the type of access requested for the file, as follows:

_`mode`_

Access

**`"r"`**

Opens for reading. If the file doesn't exist or can't be found, the **`freopen`** call fails.

**`"w"`**

Opens an empty file for writing. If the given file exists, its contents are destroyed.

**`"a"`**

Opens for writing at the end of the file (appending) without removing the end-of-file (EOF) marker before new data is written to the file. Creates the file if it doesn't exist.

**`"r+"`**

Opens for both reading and writing. The file must exist.

**`"w+"`**

Opens an empty file for both reading and writing. If the file exists, its contents are destroyed.

**`"a+"`**

Opens for reading and appending. The appending operation includes the removal of the EOF marker before new data is written to the file. The EOF marker isn't restored after writing is completed. Creates the file if it doesn't exist.

Use the **`"w"`** and **`"w+"`** types with care, as they can destroy existing files. Starting in C11, you can append **`"x"`** to **`"w"`** or **`"w+"`** to cause the function fail if the file exists, instead of overwriting it.

When a file is opened with the **`"a"`** or **`"a+"`** access type, all write operations take place at the end of the file. Although the file pointer can be repositioned using [`fseek`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170) or [`rewind`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rewind?view=msvc-170), the file pointer is always moved back to the end of the file before any write operation is carried out. Thus, existing data can't be overwritten.

The **`"a"`** mode doesn't remove the EOF marker before appending to the file. After appending has occurred, the MS-DOS TYPE command only shows data up to the original EOF marker and not any data appended to the file. The **`"a+"`** mode does remove the EOF marker before appending to the file. After appending, the MS-DOS TYPE command shows all data in the file. The **`"a+"`** mode is required for appending to a stream file that is terminated with the CTRL+Z EOF marker.

When the **`"r+"`**, **`"w+"`**, or **`"a+"`** access type is specified, both reading and writing are allowed (the file is said to be open for "update"). However, when you switch between reading and writing, there must be an intervening [`fsetpos`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fsetpos?view=msvc-170), [`fseek`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170), or [`rewind`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rewind?view=msvc-170) operation. The current position can be specified for the [`fsetpos`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fsetpos?view=msvc-170) or [`fseek`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170) operation, if you want. In addition to the above values, one of the following characters may be included in the _`mode`_ string to specify the translation mode for new lines.

_`mode`_ modifier

Translation mode

**`t`**

Open in text (translated) mode.

**`b`**

Open in binary (untranslated) mode; translations involving carriage-return and line feed characters are suppressed.

In text (translated) mode, carriage return-line feed (CR-LF) combinations are translated into single line feed (LF) characters on input; LF characters are translated to CR-LF combinations on output. Also, CTRL+Z is interpreted as an end-of-file character on input. In files opened for reading or for writing and reading with **`"a+"`**, the run-time library checks for a CTRL+Z at the end of the file and removes it, if possible. It's removed because using [`fseek`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170) and [`ftell`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftell-ftelli64?view=msvc-170) to move within a file may cause [`fseek`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170) to behave improperly near the end of the file. Don't use the **`t`** option if you want ANSI portability because it's a Microsoft extension.

If **`t`** or **`b`** isn't given in _`mode`_, the default translation mode is defined by the global variable [`_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/fmode?view=msvc-170). If **`t`** or **`b`** is prefixed to the argument, the function fails and returns `NULL`.

For a discussion of text and binary modes, see [Text and binary mode file I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/text-and-binary-mode-file-i-o?view=msvc-170).

## Requirements

Function

Required header

**`freopen`**

`<stdio.h>`

**`_wfreopen`**

`<stdio.h>` or `<wchar.h>`

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles that are associated with the console, **`stdin`**, **`stdout`**, and **`stderr`**, must be redirected before C run-time functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_freopen.c
// compile with: /W3
// This program reassigns stderr to the file
// named FREOPEN.OUT and writes a line to that file.
#include <stdio.h>
#include <stdlib.h>

FILE *stream;

int main( void )
{
   // Reassign "stderr" to "freopen.out":
   stream = freopen( "freopen.out", "w", stderr ); // C4996
   // Note: freopen is deprecated; consider using freopen_s instead

   if( stream == NULL )
      fprintf( stdout, "error on freopen\n" );
   else
   {
      fprintf( stdout, "successfully reassigned\n" ); fflush( stdout );
      fprintf( stream, "This will go to the file 'freopen.out'\n" );
      fclose( stream );
   }
   system( "type freopen.out" );
}
```

```
successfully reassigned
This will go to the file 'freopen.out'
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fclose`, `_fcloseall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fclose-fcloseall?view=msvc-170)  
[`_fdopen`, `_wfdopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fdopen-wfdopen?view=msvc-170)  
[`_fileno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fileno?view=msvc-170)  
[`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)  
[`_setmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmode?view=msvc-170)