---
title: "perror, _wperror"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/perror-wperror?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Print an error message.

## Syntax

```
void perror(
   const char *message
);
void _wperror(
   const wchar_t *message
);
```

### Parameters

_`message`_  
String message to print.

The **`perror`** function prints an error message to `stderr`. **`_wperror`** is a wide-character version of **`_perror`**; the _`message`_ argument to **`_wperror`** is a wide-character string. **`_wperror`** and **`_perror`** behave identically otherwise.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tperror`

**`perror`**

**`perror`**

**`_wperror`**

_`message`_ is printed first, followed by a colon, then by the system error message for the last library call that produced the error, and finally by a newline character. If _`message`_ is a null pointer or a pointer to a null string, **`perror`** prints only the system error message.

The error number is stored in the variable [`errno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170) (defined in ERRNO.H). The system error messages are accessed through the variable [`_sys_errlist`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170), which is an array of messages ordered by error number. **`perror`** prints the appropriate error message using the `errno` value as an index to **`_sys_errlist`**. The value of the variable [`_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170) is defined as the maximum number of elements in the **`_sys_errlist`** array.

For accurate results, call **`perror`** immediately after a library routine returns an error. Otherwise, subsequent calls can overwrite the `errno` value.

In the Windows operating system, some `errno` values listed in ERRNO.H are unused. These values are reserved for use by the UNIX operating system. See [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170) for a listing of `errno` values used by the Windows operating system. **`perror`** prints an empty string for any `errno` value not used by these platforms.

## Requirements

Routine

Required header

**`perror`**

<stdio.h> or <stdlib.h>

**`_wperror`**

<stdio.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_perror.c
// compile with: /W3
/* This program attempts to open a file named
* NOSUCHF.ILE. Because this file probably doesn't exist,
* an error message is displayed. The same message is
* created using perror, strerror, and _strerror.
*/

#include <fcntl.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <io.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <share.h>

int main( void )
{
   int  fh;

   if( _sopen_s( &fh, "NOSUCHF.ILE", _O_RDONLY, _SH_DENYNO, 0 ) != 0 )
   {
      /* Three ways to create error message: */
      perror( "perror says open failed" );
      printf( "strerror says open failed: %s\n",
         strerror( errno ) ); // C4996
      printf( _strerror( "_strerror says open failed" ) ); // C4996
      // Note: strerror and _strerror are deprecated; consider
      // using strerror_s and _strerror_s instead.
   }
   else
   {
      printf( "open succeeded on input file\n" );
      _close( fh );
   }
}
```

```
perror says open failed: No such file or directory
strerror says open failed: No such file or directory
_strerror says open failed: No such file or directory
```

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`clearerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clearerr?view=msvc-170)  
[`ferror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ferror?view=msvc-170)  
[`strerror`, `_strerror`, `_wcserror`, `__wcserror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strerror-strerror-wcserror-wcserror?view=msvc-170)