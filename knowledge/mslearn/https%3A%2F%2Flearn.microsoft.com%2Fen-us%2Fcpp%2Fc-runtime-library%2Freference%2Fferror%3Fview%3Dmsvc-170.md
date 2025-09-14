---
title: "ferror"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ferror?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Tests for an error on a stream.

## Syntax

```
int ferror(
   FILE *stream
);
```

### Parameters

_`stream`_  
Pointer to `FILE` structure.

## Return value

If no error has occurred on _`stream`_, **`ferror`** returns 0. Otherwise, it returns a nonzero value. If stream is `NULL`, **`ferror`** invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function sets `errno` to `EINVAL` and returns 0.

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`ferror`** routine (implemented both as a function and as a macro) tests for a reading or writing error on the file associated with _`stream`_. If an error has occurred, the error indicator for the stream remains set until the stream is closed or rewound, or until `clearerr` is called against it.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`ferror`**

<stdio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`feof`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feof?view=msvc-170).

## See also

[Error handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/error-handling-crt?view=msvc-170)  
[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`clearerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clearerr?view=msvc-170)  
[`_eof`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/eof?view=msvc-170)  
[`feof`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feof?view=msvc-170)  
[`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170)  
[`perror`, `_wperror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/perror-wperror?view=msvc-170)