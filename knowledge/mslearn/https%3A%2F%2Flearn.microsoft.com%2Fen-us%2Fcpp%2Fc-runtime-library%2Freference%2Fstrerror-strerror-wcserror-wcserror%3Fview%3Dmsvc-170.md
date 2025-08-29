---
title: "strerror, _strerror, _wcserror, __wcserror"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strerror-strerror-wcserror-wcserror?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets a system error message string (**`strerror`**, **`_wcserror`**) or formats a user-supplied error message string (**`_strerror`**, **`__wcserror`**). More secure versions of these functions are available; see [`strerror_s`, `_strerror_s`, `_wcserror_s`, `__wcserror_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strerror-s-strerror-s-wcserror-s-wcserror-s?view=msvc-170).

## Syntax

```
char * strerror(
   int errnum );

char * _strerror(
   const char *strErrMsg );

wchar_t * _wcserror(
   int errnum );

wchar_t * __wcserror(
   const wchar_t *strErrMsg );
```

### Parameters

_`errnum`_  
Error number.

_`strErrMsg`_  
User-supplied message.

## Return value

All of these functions return a pointer to an error-message string, in a thread-local storage buffer owned by the runtime. Later calls on the same thread can overwrite this string.

The **`strerror`** function maps _`errnum`_ to an error-message string and returns a pointer to the string. The **`strerror`** and **`_strerror`** functions don't actually print the message. To print, call an output function such as [`fprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-fprintf-l-fwprintf-fwprintf-l?view=msvc-170):

```
if (( _access( "datafile", 2 )) == -1 )
   fprintf( stderr, _strerror(NULL) );
```

If _`strErrMsg`_ is passed as `NULL`, **`_strerror`** returns a pointer to a string. It contains the system error message for the last library call that produced an error. If you call `__wcserror`, the error-message string is terminated by the newline character (`'\n'`). The other functions don't add `'\n'`. When _`strErrMsg`_ isn't `NULL`, the string contains, in order: your _`strErrMsg`_ string, a colon, a space, the system error message. Your string message can be, at most, 94 characters long, in either narrow (**`_strerror`**) or wide (**`__wcserror`**) characters.

The actual error number for **`_strerror`** is stored in the variable [`errno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170). To produce accurate results, call **`_strerror`** immediately after a library routine returns an error. Otherwise, later calls to library routines may overwrite the `errno` value.

**`_wcserror`** and **`__wcserror`** are wide-character versions of **`strerror`** and **`_strerror`**, respectively.

**`_strerror`**, **`_wcserror`**, and **`__wcserror`** are Microsoft-specific, not part of the Standard C library. We don't recommend you use them where you want portable code. For Standard C compatibility, use **`strerror`** instead.

To get error strings, we recommend **`strerror`** or **`_wcserror`** instead of the deprecated macros [`_sys_errlist`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170) and [`_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170) and the deprecated internal functions `__sys_errlist` and `__sys_nerr`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcserror`

**`strerror`**

**`strerror`**

**`_wcserror`**

## Requirements

Routine

Required header

**`strerror`**

<string.h>

**`_strerror`**

<string.h>

**`_wcserror`**, **`__wcserror`**

<string.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`perror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/perror-wperror?view=msvc-170).

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`clearerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clearerr?view=msvc-170)  
[`ferror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ferror?view=msvc-170)  
[`perror`, `_wperror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/perror-wperror?view=msvc-170)