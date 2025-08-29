---
title: "_ungetc_nolock, _ungetwc_nolock"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ungetc-nolock-ungetwc-nolock?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Pushes a character back onto the stream without locking.

## Syntax

```
int _ungetc_nolock(
   int c,
   FILE *stream
);
wint_t _ungetwc_nolock(
   wint_t c,
   FILE *stream
);
```

### Parameters

_`c`_  
Character to be pushed.

_`stream`_  
Pointer to `FILE` structure.

## Return value

If successful, each of these functions returns the character argument _`c`_. If _`c`_ can't be pushed back or if no character has been read, the input stream is unchanged and **`_ungetc_nolock`** returns `EOF`; **`_ungetwc_nolock`** returns `WEOF`. If _`stream`_ is `NULL`, `EOF` or `WEOF` is returned, and `errno` is set to `EINVAL`.

For information on these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

These functions are non-locking versions of `ungetc` and `ungetwc`. The versions with the `_nolock` suffix are identical except that they aren't protected from interference by other threads. They may be faster since they don't incur the overhead of locking out other threads. Use these functions only in thread-safe contexts such as single-threaded applications or where the calling scope already handles thread isolation.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_ungettc_nolock`

**`_ungetc_nolock`**

**`_ungetc_nolock`**

**`_ungetwc_nolock`**

## Requirements

Routine

Required header

**`_ungetc_nolock`**

<stdio.h>

**`_ungetwc_nolock`**

<stdio.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`getc`, `getwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getc-getwc?view=msvc-170)  
[`putc`, `putwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putc-putwc?view=msvc-170)