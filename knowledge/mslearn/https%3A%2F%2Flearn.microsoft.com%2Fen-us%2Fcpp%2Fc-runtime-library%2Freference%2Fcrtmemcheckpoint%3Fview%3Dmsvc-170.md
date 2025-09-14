---
title: "_CrtMemCheckpoint"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtmemcheckpoint?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Obtains the current state of the debug heap and stores in an application-supplied `_CrtMemState` structure (debug version only).

## Syntax

```
void _CrtMemCheckpoint(
   _CrtMemState *state
);
```

### Parameters

_`state`_  
Pointer to `_CrtMemState` structure to fill with the memory checkpoint.

The **`_CrtMemCheckpoint`** function creates a snapshot of the current state of the debug heap at any given moment. This snapshot can be used by other heap state functions such as [`_CrtMemDifference`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtmemdifference?view=msvc-170) to help detect memory leaks and other problems. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, calls to `_CrtMemState` are removed during preprocessing.

The application must pass a pointer to a previously allocated instance of the `_CrtMemState` structure, defined in Crtdbg.h, in the _`state`_ parameter. If **`_CrtMemCheckpoint`** encounters an error during the checkpoint creation, the function generates a `_CRT_WARN` debug report describing the problem.

For more information about heap state functions and the `_CrtMemState` structure, see [Heap state reporting functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#heap-state-reporting-functions). For more information about how memory blocks are allocated, initialized, and managed in the debug version of the base heap, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170).

If _`state`_ is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170) is set to `EINVAL` and the function returns.

## Requirements

Routine

Required header

**`_CrtMemCheckpoint`**

<crtdbg.h>, <errno.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

**Libraries:** Debug versions of the UCRT only.

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)  
[`_CrtMemDifference`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtmemdifference?view=msvc-170)