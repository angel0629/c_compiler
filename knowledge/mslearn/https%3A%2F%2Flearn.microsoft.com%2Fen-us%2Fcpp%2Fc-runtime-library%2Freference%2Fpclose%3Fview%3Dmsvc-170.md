---
title: "_pclose"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/pclose?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Waits for a new command processor and closes the stream on the associated pipe.

## Syntax

```
int _pclose(
FILE *stream
);
```

### Parameters

_`stream`_  
Return value from the previous call to `_popen`.

## Return value

Returns the exit status of the terminating command processor, or -1 if an error occurs. The format of the return value is the same as for `_cwait`, except the low-order and high-order bytes are swapped. If stream is `NULL`, **`_pclose`** sets `errno` to `EINVAL` and returns -1.

For information about these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_pclose`** function looks up the process ID of the command processor (Cmd.exe) started by the associated `_popen` call, executes a [`_cwait`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cwait?view=msvc-170) call on the new command processor, and closes the stream on the associated pipe.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_pclose`**

<stdio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`_pipe`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/pipe?view=msvc-170)  
[`_popen`, `_wpopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/popen-wpopen?view=msvc-170)