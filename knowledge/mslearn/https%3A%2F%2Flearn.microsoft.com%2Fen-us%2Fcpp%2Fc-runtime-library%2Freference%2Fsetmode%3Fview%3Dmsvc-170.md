---
title: "_setmode"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmode?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sets the file translation mode.

## Syntax

```
int _setmode (
   int fd,
   int mode
);
```

### Parameters

_`fd`_  
File descriptor.

_`mode`_  
New translation mode.

## Return value

If successful, returns the previous translation mode.

If invalid parameters are passed to this function, the invalid-parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function returns -1 and sets `errno` to either `EBADF`, which indicates an invalid file descriptor, or `EINVAL`, which indicates an invalid _`mode`_ argument.

For more information about these and other return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_setmode`** function sets to _`mode`_ the translation mode of the file given by _`fd`_. Passing `_O_TEXT` as _`mode`_ sets ANSI text (that is, translated) mode. Carriage return-line feed (CR-LF) combinations are translated into a single line feed character on input. Line feed characters are translated into CR-LF combinations on output. Passing `_O_BINARY` sets binary (untranslated) mode, in which these translations are suppressed.

You can also pass `_O_U16TEXT`, `_O_U8TEXT`, or `_O_WTEXT` to enable Unicode mode, as demonstrated in the second example later in this document.

Caution

Unicode mode is for wide print functions (for example, `wprintf`) and is not supported for narrow print functions. Use of a narrow print function on a Unicode mode stream triggers an assert.

**`_setmode`** is typically used to modify the default translation mode of **`stdin`** and **`stdout`**, but you can use it on any file. If you apply **`_setmode`** to the file descriptor for a stream, call **`_setmode`** before you perform any input or output operations on the stream.

Caution

If you write data to a file stream, explicitly flush the code by using [`fflush`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fflush?view=msvc-170) before you use **`_setmode`** to change the mode. If you do not flush the code, you might get unexpected behavior. If you have not written data to the stream, you do not have to flush the code.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

Optional Headers

**`_setmode`**

`<io.h>`

`<fcntl.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example: Use `_setmode` to change stdin

```
// crt_setmode.c
// This program uses _setmode to change
// stdin from text mode to binary mode.

#include <stdio.h>
#include <fcntl.h>
#include <io.h>

int main( void )
{
   int result;

   // Set "stdin" to have binary mode:
   result = _setmode( _fileno( stdin ), _O_BINARY );
   if( result == -1 )
      perror( "Cannot set mode" );
   else
      printf( "'stdin' successfully changed to binary mode\n" );
}
```

```
'stdin' successfully changed to binary mode
```

## Example: Use `_setmode` to change stdout

```
// crt_setmodeunicode.c
// This program uses _setmode to change
// stdout to Unicode. Cyrillic and Ideographic
// characters will appear on the console (if
// your console font supports those character sets).

#include <fcntl.h>
#include <io.h>
#include <stdio.h>

int main(void) {
    _setmode(_fileno(stdout), _O_U16TEXT);
    wprintf(L"\x043a\x043e\x0448\x043a\x0430 \x65e5\x672c\x56fd\n");
    return 0;
}
```

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`_creat`, `_wcreat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creat-wcreat?view=msvc-170)  
[`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)  
[`_set_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-fmode?view=msvc-170)