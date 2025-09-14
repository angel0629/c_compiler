---
title: "strerror_s, _strerror_s, _wcserror_s, __wcserror_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strerror-s-strerror-s-wcserror-s-wcserror-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Get a system error message (**`strerror_s`**, **`_wcserror_s`**) or print a user-supplied error message (**`_strerror_s`**, **`__wcserror_s`**). These functions are versions of [`strerror`, `_strerror`, `_wcserror`, `__wcserror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strerror-strerror-wcserror-wcserror?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t strerror_s(
   char *buffer,
   size_t sizeInBytes,
   int errnum
);
errno_t _strerror_s(
   char *buffer,
   size_t sizeInBytes,
   const char *strErrMsg
);
errno_t _wcserror_s(
   wchar_t *buffer,
   size_t sizeInWords,
   int errnum
);
errno_t __wcserror_s(
   wchar_t *buffer,
   size_t sizeInWords,
   const wchar_t *strErrMsg
);
```

```
template <size_t size>
errno_t strerror_s(
   char (&buffer)[size],
   int errnum
); // C++ only
template <size_t size>
errno_t _strerror_s(
   char (&buffer)[size],
   const char *strErrMsg
); // C++ only
template <size_t size>
errno_t _wcserror_s(
   wchar_t (&buffer)[size],
   int errnum
); // C++ only
template <size_t size>
errno_t __wcserror_s(
   wchar_t (&buffer)[size],
   const wchar_t *strErrMsg
); // C++ only
```

### Parameters

_`buffer`_  
Buffer to hold error string.

_`sizeInBytes`_  
The number of bytes in the buffer.

_`sizeInWords`_  
The number of words in the buffer.

_`errnum`_  
Error number.

_`strErrMsg`_  
User-supplied message.

## Return value

Zero if successful, an error code on failure.

### Error conditions

_`buffer`_

_`sizeInBytes`_/_`sizeInWords`_

_`strErrMsg`_

Contents of _`buffer`_

`NULL`

any

any

n/a

any

0

any

not modified

The **`strerror_s`** function is thread-safe.

The **`strerror_s`** function maps _`errnum`_ to an error-message string, returning the string in _`buffer`_. **`_strerror_s`** doesn't take the error number; it uses the current value of `errno` to determine the appropriate message. The message isn't printed or displayed by **`strerror_s`** or **`_strerror_s`**. To output the message, you need to call an output function such as [`fprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-fprintf-l-fwprintf-fwprintf-l?view=msvc-170):

```
if (( _access( "datafile",2 )) == -1 )
{
   _strerror_s(buffer, 80, NULL);
   fprintf( stderr, buffer );
}
```

If _`strErrMsg`_ is `NULL`, **`_strerror_s`** returns a string in _`buffer`_ that contains the system error message for the last library call that produced an error. If _`strErrMsg`_ isn't equal to `NULL`, then **`_strerror_s`** returns a string in _`buffer`_ that contains (in order) your string message, a colon, a space, the system error message for the last library call that produced an error. Your string message can be, at most, 94 characters long.

These functions truncate the error message if its length exceeds the size of the buffer - 1. The resulting string in _`buffer`_ is always null-terminated.

The actual error number for **`_strerror_s`** is stored in the variable [`errno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170). The system error messages are accessed through the variable [`_sys_errlist`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170), which is an array of messages ordered by error number. **`_strerror_s`** accesses the appropriate error message by using the `errno` value as an index to the variable `_sys_errlist`. The value of the variable [`_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170) is defined as the maximum number of elements in the `_sys_errlist` array. To produce accurate results, call **`_strerror_s`** immediately after a library routine return with an error. Otherwise, subsequent calls to **`strerror_s`** or **`_strerror_s`** can overwrite the `errno` value.

**`_wcserror_s`** and **`__wcserror_s`** are wide-character versions of **`strerror_s`** and **`_strerror_s`**, respectively.

These functions validate their parameters. If buffer is `NULL` or if the size parameter is 0, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170) . If execution is allowed to continue, the functions return `EINVAL` and set `errno` to `EINVAL`.

**`_strerror_s`**, **`_wcserror_s`**, and **`__wcserror_s`** aren't part of the ANSI definition but are instead Microsoft extensions to it. Don't use them where portability is desired; for ANSI compatibility, use **`strerror_s`** instead.

In C++, using these functions is simplified by template overloads; the overloads can infer buffer length automatically, eliminating the need to specify a size argument. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

The debug library versions of these functions first fill the buffer with 0xFE. To disable this behavior, use [`_CrtSetDebugFillThreshold`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdebugfillthreshold?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcserror_s`

**`strerror_s`**

**`strerror_s`**

**`_wcserror_s`**

## Requirements

Routine

Required header

**`strerror_s`**, **`_strerror_s`**

<string.h>

**`_wcserror_s`**, **`__wcserror_s`**

<string.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`perror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/perror-wperror?view=msvc-170).

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`clearerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clearerr?view=msvc-170)  
[`ferror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ferror?view=msvc-170)  
[`perror`, `_wperror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/perror-wperror?view=msvc-170)