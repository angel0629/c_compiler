---
title: "_cexit, _c_exit"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cexit-c-exit?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Performs cleanup operations and returns without terminating the process.

## Syntax

```
void _cexit( void );
void _c_exit( void );
```

The **`_cexit`** function calls, in last-in, first-out (LIFO) order, the functions registered by `atexit` and `_onexit`. Then **`_cexit`** flushes all I/O buffers and closes all open streams before returning. **`_c_exit`** is the same as `_exit` but returns to the calling process without processing `atexit` or `_onexit` or flushing stream buffers. The behavior of `exit`, `_exit`, **`_cexit`**, and **`_c_exit`** is shown in the following table.

Function

Behavior

`exit`

Performs complete C library termination procedures, terminates process, and exits with supplied status code.

`_exit`

Performs quick C library termination procedures, terminates process, and exits with supplied status code.

**`_cexit`**

Performs complete C library termination procedures and returns to caller, but doesn't terminate process.

**`_c_exit`**

Performs quick C library termination procedures and returns to caller, but doesn't terminate process.

When you call the **`_cexit`** or **`_c_exit`** functions, the destructors for any temporary or automatic objects that exist at the time of the call aren't called. An automatic object is an object that is defined in a function where the object isn't declared to be static. A temporary object is an object created by the compiler. To destroy an automatic object before calling **`_cexit`** or **`_c_exit`**, explicitly call the destructor for the object, as follows:

```
myObject.myClass::~myClass( );
```

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_cexit`**

<process.h>

**`_c_exit`**

<process.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170)  
[`atexit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atexit?view=msvc-170)  
[`_exec`, `_wexec` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/exec-wexec-functions?view=msvc-170)  
[`exit`, `_Exit`, `_exit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exit-exit-exit?view=msvc-170)  
[`_onexit`, `_onexit_m`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/onexit-onexit-m?view=msvc-170)  
[`_spawn`, `_wspawn` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/spawn-wspawn-functions?view=msvc-170)  
[`system`, `_wsystem`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/system-wsystem?view=msvc-170)