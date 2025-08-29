---
title: "raise"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/raise?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sends a signal to the executing program.

Note

Do not use this method to shut down a Microsoft Store app, except in testing or debugging scenarios. Programmatic or UI ways to close a Store app are not permitted according to the [Microsoft Store policies](https://learn.microsoft.com/en-us/windows/apps/publish/store-policies). For more information, see [UWP app lifecycle](https://learn.microsoft.com/en-us/windows/uwp/launch-resume/app-lifecycle).

## Syntax

```
int raise(
   int sig
);
```

### Parameters

_`sig`_  
Signal to be raised.

## Return value

If successful, **`raise`** returns 0. Otherwise, it returns a nonzero value.

The **`raise`** function sends _`sig`_ to the executing program. If a previous call to `signal` has installed a signal-handling function for _`sig`_, **`raise`** executes that function. If no handler function has been installed, the default action associated with the signal value _`sig`_ is taken, as follows.

Signal

Description

Default behavior

`SIGABRT`

Abnormal termination

Terminates the calling program with exit code 3

`SIGFPE`

Floating-point error

Terminates the calling program

`SIGILL`

Illegal instruction

Terminates the calling program

`SIGINT`

CTRL+C interrupt

Terminates the calling program

`SIGSEGV`

Illegal storage access

Terminates the calling program

`SIGTERM`

Termination request sent to the program

Ignores the signal

If the argument isn't a valid signal as specified above, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If not handled, the function sets `errno` to `EINVAL` and returns a nonzero value.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`raise`**

<signal.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170)  
[`signal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/signal?view=msvc-170)