---
title: "signal"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/signal?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sets interrupt signal handling.

Important

Do not use this method to shut down a Microsoft Store app, except in testing or debugging scenarios. Programmatic or UI ways to close a Store app are not permitted according to the [Microsoft Store policies](https://learn.microsoft.com/en-us/windows/apps/publish/store-policies). For more information, see [UWP app lifecycle](https://learn.microsoft.com/en-us/windows/uwp/launch-resume/app-lifecycle).

## Syntax

```
void __cdecl *signal(int sig, int (*func)(int, int));
```

### Parameters

_`sig`_  
Signal value.

_`func`_  
The second parameter is a pointer to the function to be executed. The first parameter is a signal value, and the second parameter is a subcode that can be used when the first parameter is `SIGFPE`.

## Return value

**`signal`** returns the previous value of func that's associated with the given signal. For example, if the previous value of _`func`_ was `SIG_IGN`, the return value is also `SIG_IGN`. A return value of `SIG_ERR` indicates an error; in that case, `errno` is set to `EINVAL`.

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`signal`** function enables a process to choose one of several ways to handle an interrupt signal from the operating system. The _`sig`_ argument is the interrupt to which **`signal`** responds; it must be one of the following manifest constants, which are defined in **`SIGNAL.H`**.

_`sig`_ value

Description

`SIGABRT`

Abnormal termination

`SIGFPE`

Floating-point error

`SIGILL`

Illegal instruction

`SIGINT`

CTRL+C signal

`SIGSEGV`

Illegal storage access

`SIGTERM`

Termination request

If _`sig`_ isn't one of the above values, the invalid parameter handler is invoked, as defined in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170) . If execution is allowed to continue, this function sets `errno` to `EINVAL` and returns `SIG_ERR`.

By default, **`signal`** terminates the calling program with exit code 3, regardless of the value of _`sig`_.

Note

`SIGINT` is not supported for any Win32 application. When a CTRL+C interrupt occurs, Win32 operating systems generate a new thread to specifically handle that interrupt. This can cause a single-thread application, such as one in UNIX, to become multithreaded and cause unexpected behavior.

The _`func`_ argument is an address to a signal handler that you write, or to one of the predefined [signal action constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/signal-action-constants?view=msvc-170) `SIG_DFL` or `SIG_IGN`, which are also defined in SIGNAL.H. If _`func`_ is a function, it's installed as the signal handler for the given signal. The signal handler's prototype requires one formal argument, _`sig`_, of type **`int`**. The operating system provides the actual argument through _`sig`_ when an interrupt occurs; the argument is the signal that generated the interrupt. Therefore, you can use the six manifest constants (listed in the preceding table) in your signal handler to determine which interrupt occurred and take appropriate action. For example, you can call **`signal`** twice to assign the same handler to two different signals, and then test the _`sig`_ argument in the handler to take different actions based on the signal received.

If you're testing for floating-point exceptions (`SIGFPE`), _`func`_ points to a function that takes an optional second argument that is one of several manifest constants, defined in `FLOAT.H`, of the form `FPE_xxx`. When a `SIGFPE` signal occurs, you can test the value of the second argument to determine the kind of floating-point exception, and then take appropriate action. This argument and its possible values are Microsoft extensions.

For floating-point exceptions, the value of _`func`_ isn't reset when the signal is received. To recover from floating-point exceptions, use try/except clauses to surround the floating point operations. It's also possible to recover by using [`setjmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setjmp?view=msvc-170) with [`longjmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/longjmp?view=msvc-170). In either case, the calling process resumes execution and leaves the floating-point state of the process undefined.

If the signal handler returns, the calling process resumes execution immediately following the point at which it received the interrupt signal, regardless of the kind of signal or operating mode.

Before the specified function is executed, the value of _`func`_ is set to `SIG_DFL`. The next interrupt signal is treated as described for `SIG_DFL`, unless an intervening call to **`signal`** specifies otherwise. You can use this feature to reset signals in the called function.

Because signal-handler routines are often called asynchronously when an interrupt occurs, your signal-handler function may get control when a run-time operation is incomplete and in an unknown state. The following list summarizes the restrictions that determine which functions you can use in your signal-handler routine.

*   Don't issue low-level or **`STDIO.H`** I/O routines (for example, **`printf`** or **`fread`**).
    
*   Don't call heap routines or any routine that uses the heap routines (for example, **`malloc`**, **`_strdup`**, or **`_putenv`**). For more information, see [`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170).
    
*   Don't use any function that generates a system call (for example, **`_getcwd`** or **`time`**).
    
*   Don't use **`longjmp`** unless the interrupt is caused by a floating-point exception (that is, _`sig`_ is `SIGFPE`). In this case, first reinitialize the floating-point package by using a call to **`_fpreset`**.
    
*   Don't use any overlay routines.
    

A program must contain floating-point code if it's to trap the `SIGFPE` exception by using the function. If your program doesn't have floating-point code and requires the run-time library's signal-handling code, just declare a volatile double and initialize it to zero:

```
volatile double d = 0.0f;
```

The `SIGILL` and `SIGTERM` signals aren't generated under Windows. They're included for ANSI compatibility. Therefore, you can set signal handlers for these signals by using **`signal`**, and you can also explicitly generate these signals by calling [`raise`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/raise?view=msvc-170).

Signal settings aren't preserved in spawned processes that are created by calls to [`_exec`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/exec-wexec-functions?view=msvc-170) or [`_spawn`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/spawn-wspawn-functions?view=msvc-170) functions. The signal settings are reset to the default values in the new process.

## Requirements

Routine

Required header

**`signal`**

`<signal.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

The following example shows how to use **`signal`** to add some custom behavior to the `SIGABRT` signal. For more information about abort behavior, see [`_set_abort_behavior`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-abort-behavior?view=msvc-170).

```
// crt_signal.c
// compile with: /EHsc /W4
// Use signal to attach a signal handler to the abort routine
#include <stdlib.h>
#include <signal.h>

void SignalHandler(int signal)
{
    if (signal == SIGABRT) {
        // abort signal handler code
    } else {
        // ...
    }
}

int main()
{
    typedef void (*SignalHandlerPointer)(int);

    SignalHandlerPointer previousHandler;
    previousHandler = signal(SIGABRT, SignalHandler);

    abort();
}
```

The output depends on the version of the runtime used, whether the app is a console or Windows app, and on Windows registry settings. For a console app, something like the following message may be sent to stderr:

```
Debug Error!

Program: c:\Projects\crt_signal\Debug\crt_signal.exe

R6010

- abort() has been called
```

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170)  
[`_exec`, `_wexec` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/exec-wexec-functions?view=msvc-170)  
[`exit`, `_Exit`, `_exit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exit-exit-exit?view=msvc-170)  
[`_fpreset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpreset?view=msvc-170)  
[`_spawn`, `_wspawn` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/spawn-wspawn-functions?view=msvc-170)