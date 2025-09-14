---
title: "_set_abort_behavior"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-abort-behavior?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Specifies the action to be taken when a program is abnormally terminated.

Note

Do not use the [`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170) function to shut down a Microsoft Store app, except in testing or debugging scenarios. Programmatic or UI ways to close a Store app are not permitted according to the [Microsoft Store policies](https://learn.microsoft.com/en-us/windows/apps/publish/store-policies). For more information, see [UWP app lifecycle](https://learn.microsoft.com/en-us/windows/uwp/launch-resume/app-lifecycle).

## Syntax

```
unsigned int _set_abort_behavior(
   unsigned int flags,
   unsigned int mask
);
```

### Parameters

_`flags`_  
New value of the `abort` flags.

_`mask`_  
Mask for the `abort` flags bits to set.

## Return value

The old value of the flags.

There are two [`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170) flags: `_WRITE_ABORT_MSG` and `_CALL_REPORTFAULT`. `_WRITE_ABORT_MSG` determines whether a helpful text message is printed when a program is abnormally terminated. The message states that the application has called the `abort` function. The default behavior is to print the message. `_CALL_REPORTFAULT`, if set, invokes the Windows Error Reporting Service mechanism (formerly known as Dr. Watson) to report failures to Microsoft when `abort` is called. By default, crash dump reporting is enabled in non-DEBUG builds. If the Windows error reporting handler isn't invoked, then `abort` calls [`_exit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exit-exit-exit?view=msvc-170) to terminate the process with exit code 3 and returns control to the parent process or the operating system. `_exit` doesn't flush stream buffers or do `atexit`/`_onexit` processing.

For Windows compatibility reasons, when `abort` calls `_exit`, it may invoke the Windows [`ExitProcess`](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-exitprocess) API, which in turn allows DLL termination routines to run. Destructors aren't run in the executable, but the same may not be true of DLLs loaded in the executable's process space. This behavior doesn't strictly conform to the C++ standard. To immediately terminate a process including any DLLs, use the Windows [`TerminateProcess`](https://learn.microsoft.com/en-us/windows/desktop/api/processthreadsapi/nf-processthreadsapi-terminateprocess) API. You can also register an abort signal handler that invokes `TerminateProcess` for standard-compliant behavior. Compliant behavior may come at some cost in Windows compatibility.

By default, this function's global state is scoped to the application. To change it, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_set_abort_behavior`**

`<stdlib.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_set_abort_behavior.c
// compile with: /TC
#include <stdlib.h>

int main()
{
   printf("Suppressing the abort message. If successful, this message"
          " will be the only output.\n");
   // Suppress the abort message
   _set_abort_behavior( 0, _WRITE_ABORT_MSG);
   abort();
}
```

```
Suppressing the abort message. If successful, this message will be the only output.
```

## See also

[`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170)