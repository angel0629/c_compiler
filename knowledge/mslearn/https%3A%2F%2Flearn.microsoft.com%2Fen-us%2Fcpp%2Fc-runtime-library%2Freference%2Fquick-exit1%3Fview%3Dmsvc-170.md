---
title: "quick_exit1"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/quick-exit1?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Causes normal program termination to occur.

## Syntax

```
__declspec(noreturn) void quick_exit(
    int status
);
```

### Parameters

_`status`_  
The status code to return to the host environment.

## Return value

The **`quick_exit`** function can't return to its caller.

The **`quick_exit`** function causes normal program termination. It calls no functions registered by `atexit`, `_onexit` or signal handlers registered by the `signal` function. Behavior is undefined if **`quick_exit`** is called more than once, or if the `exit` function is also called.

The **`quick_exit`** function calls, in last-in, first-out (LIFO) order, the functions registered by `at_quick_exit`, except for those functions already called when the function was registered. Behavior is undefined if a [`longjmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/longjmp?view=msvc-170) call is made during a call to a registered function that would terminate the call to the function.

After the registered functions have been called, **`quick_exit`** invokes `_Exit` by using the _`status`_ value to return control to the host environment.

## Requirements

Routine

Required header

**`quick_exit`**

<process.h> or <stdlib.h>

For more information about compatibility, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170)  
[`atexit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atexit?view=msvc-170)  
[`_exec`, `_wexec` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/exec-wexec-functions?view=msvc-170)  
[`exit`, `_Exit`, `_exit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exit-exit-exit?view=msvc-170)  
[`_onexit`, `_onexit_m`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/onexit-onexit-m?view=msvc-170)  
[`_spawn`, `_wspawn` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/spawn-wspawn-functions?view=msvc-170)  
[`system`, `_wsystem`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/system-wsystem?view=msvc-170)