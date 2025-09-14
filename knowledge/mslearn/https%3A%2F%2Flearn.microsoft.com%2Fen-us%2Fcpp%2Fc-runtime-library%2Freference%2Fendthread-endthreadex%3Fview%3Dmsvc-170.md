---
title: "_endthread, _endthreadex"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/endthread-endthreadex?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Terminates a thread; **`_endthread`** terminates a thread that's created by **`_beginthread`** and **`_endthreadex`** terminates a thread that's created by **`_beginthreadex`**.

## Syntax

```
void _endthread( void );
void _endthreadex(
   unsigned retval
);
```

### Parameters

_`retval`_  
Thread exit code.

You can call **`_endthread`** or **`_endthreadex`** explicitly to terminate a thread; however, **`_endthread`** or **`_endthreadex`** is called automatically when the thread returns from the routine passed as a parameter to **`_beginthread`** or **`_beginthreadex`**. Terminating a thread with a call to **`endthread`** or **`_endthreadex`** helps ensure proper recovery of resources allocated for the thread.

Note

For an executable file linked with Libcmt.lib, do not call the Win32 [`ExitThread`](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-exitthread) API; this prevents the run-time system from reclaiming allocated resources. **`_endthread`** and **`_endthreadex`** reclaim allocated thread resources and then call `ExitThread`.

**`_endthread`** automatically closes the thread handle. (This behavior differs from the Win32 `ExitThread` API.) Therefore, when you use **`_beginthread`** and **`_endthread`**, don't explicitly close the thread handle by calling the Win32 [`CloseHandle`](https://learn.microsoft.com/en-us/windows/win32/api/handleapi/nf-handleapi-closehandle) API.

Like the Win32 `ExitThread` API, **`_endthreadex`** doesn't close the thread handle. Therefore, when you use **`_beginthreadex`** and **`_endthreadex`**, you must close the thread handle by calling the Win32 `CloseHandle` API.

Note

**`_endthread`** and **`_endthreadex`** cause C++ destructors pending in the thread not to be called.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`_endthread`**

`<process.h>`

**`_endthreadex`**

`<process.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Multithreaded versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## Example

See the example for [`_beginthread`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/beginthread-beginthreadex?view=msvc-170).

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`_beginthread`, `_beginthreadex`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/beginthread-beginthreadex?view=msvc-170)