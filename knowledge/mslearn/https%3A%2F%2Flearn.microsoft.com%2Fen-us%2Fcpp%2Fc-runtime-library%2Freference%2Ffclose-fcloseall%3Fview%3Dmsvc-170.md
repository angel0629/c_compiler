---
title: "fclose, _fcloseall"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fclose-fcloseall?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Closes a stream (**`fclose`**) or closes all open streams (**`_fcloseall`**).

## Syntax

```
int fclose(
   FILE *stream
);
int _fcloseall( void );
```

### Parameters

_`stream`_  
Pointer to `FILE` structure.

## Return value

**`fclose`** returns 0 if the stream is successfully closed. **`_fcloseall`** returns the total number of streams closed. Both functions return `EOF` to indicate an error.

The **`fclose`** function closes _`stream`_. If _`stream`_ is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, **`fclose`** sets `errno` to `EINVAL` and returns `EOF`. It's recommended that you always check the _`stream`_ pointer before you call this function.

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_fcloseall`** function closes all open streams except **`stdin`**, **`stdout`**, **`stderr`** (and, in MS-DOS, **`_stdaux`** and **`_stdprn`**). It also closes and deletes any temporary files created by **`tmpfile`**. In both functions, all buffers associated with the stream are flushed prior to closing. System-allocated buffers are released when the stream is closed. Buffers assigned by the user with **`setbuf`** and **`setvbuf`** aren't automatically released.

Note

When `fclose` or `_fcloseall` functions are used to close a stream, the underlying file descriptor and OS file handle (or socket) are closed as well. Thus, if the file was originally opened as a file handle or file descriptor and is closed with **`fclose`**, don't also call **`_close`** to close the file descriptor; and don't call the Win32 function `CloseHandle` to close the file handle.

**`fclose`** and **`_fcloseall`** include code to protect against interference from other threads. For non-locking version of a **`fclose`**, see **`_fclose_nolock`**.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`fclose`**

`<stdio.h>`

**`_fcloseall`**

`<stdio.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`fopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170).

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`_close`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/close?view=msvc-170)  
[`_fdopen`, `_wfdopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fdopen-wfdopen?view=msvc-170)  
[`fflush`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fflush?view=msvc-170)  
[`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170)  
[`freopen`, `_wfreopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freopen-wfreopen?view=msvc-170)