---
title: "exit, _Exit, _exit"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exit-exit-exit?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Terminates the calling process. The **`exit`** function terminates it after cleanup; **`_exit`** and **`_Exit`** terminate it immediately.

## Syntax

```
void exit(
   int const status
);
void _Exit(
   int const status
);
void _exit(
   int const status
);
```

### Parameters

_`status`_  
Exit status code.

The **`exit`**, **`_Exit`** and **`_exit`** functions terminate the calling process. The **`exit`** function calls destructors for thread-local objects, then calls—in last-in-first-out (LIFO) order—the functions that are registered by **`atexit`** and **`_onexit`**, and then flushes all file buffers before it terminates the process. The **`_Exit`** and **`_exit`** functions terminate the process without destroying thread-local objects or processing **`atexit`** or **`_onexit`** functions, and without flushing stream buffers.

Although the **`exit`**, **`_Exit`** and **`_exit`** calls don't return a value, the value in _`status`_ is made available to the host environment or waiting calling process, if one exists, after the process exits. Typically, the caller sets the _`status`_ value to 0 to indicate a normal exit, or to some other value to indicate an error. The _`status`_ value is available to the operating-system batch command `ERRORLEVEL` and is represented by one of two constants: `EXIT_SUCCESS`, which represents a value of 0, or `EXIT_FAILURE`, which represents a value of 1.

The **`exit`**, **`_Exit`**, **`_exit`**, **`quick_exit`**, **`_cexit`**, and **`_c_exit`** functions behave as follows.

Function

Description

**`exit`**

Performs complete C library termination procedures, terminates the process, and provides the supplied status code to the host environment.

**`_Exit`**

Performs minimal C library termination procedures, terminates the process, and provides the supplied status code to the host environment.

**`_exit`**

Performs minimal C library termination procedures, terminates the process, and provides the supplied status code to the host environment.

**`quick_exit`**

Performs quick C library termination procedures, terminates the process, and provides the supplied status code to the host environment.

**`_cexit`**

Performs complete C library termination procedures and returns to the caller. Doesn't terminate the process.

**`_c_exit`**

Performs minimal C library termination procedures and returns to the caller. Doesn't terminate the process.

When you call the **`exit`**, **`_Exit`** or **`_exit`** function, the destructors for any temporary or automatic objects that exist at the time of the call aren't called. An automatic object is a non-static local object defined in a function. A temporary object is an object that's created by the compiler, such as a value returned by a function call. To destroy an automatic object before you call **`exit`**, **`_Exit`**, or **`_exit`**, explicitly call the destructor for the object, as shown here:

```
void last_fn() {}
    struct SomeClass {} myInstance{};
    // ...
    myInstance.~SomeClass(); // explicit destructor call
    exit(0);
}
```

Don't use `DLL_PROCESS_ATTACH` to call **`exit`** from `DllMain`. To exit the `DLLMain` function, return `FALSE` from `DLL_PROCESS_ATTACH`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`exit`**, **`_Exit`**, **`_exit`**

`<process.h>` or `<stdlib.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_exit.c
// This program returns an exit code of 1. The
// error code could be tested in a batch file.

#include <stdlib.h>

int main( void )
{
   exit( 1 );
}
```

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170)  
[`atexit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atexit?view=msvc-170)  
[`_cexit`, `_c_exit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cexit-c-exit?view=msvc-170)  
[`_exec`, `_wexec` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/exec-wexec-functions?view=msvc-170)  
[`_onexit`, `_onexit_m`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/onexit-onexit-m?view=msvc-170)  
[`quick_exit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/quick-exit1?view=msvc-170)  
[`_spawn`, `_wspawn` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/spawn-wspawn-functions?view=msvc-170)  
[`system`, `_wsystem`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/system-wsystem?view=msvc-170)