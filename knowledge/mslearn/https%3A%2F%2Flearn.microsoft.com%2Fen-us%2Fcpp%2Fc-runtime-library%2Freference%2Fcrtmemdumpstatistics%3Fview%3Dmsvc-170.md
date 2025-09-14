---
title: "_CrtMemDumpStatistics"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtmemdumpstatistics?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Dumps the debug header information for a specified heap state in a user-readable form (debug version only).

## Syntax

```
void _CrtMemDumpStatistics(
   const _CrtMemState *state
);
```

### Parameters

_`state`_  
Pointer to the heap state to dump.

The **`_CrtMemDumpStatistics`** function dumps the debug header information for a specified state of the heap in a user-readable form. The dump statistics can be used by the application to track allocations and detect memory problems. The memory state can contain a specific heap state or the difference between two states. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, calls to **`_CrtMemDumpStatistics`** are removed during preprocessing.

The _`state`_ parameter must be a pointer to a `_CrtMemState` structure that has been filled in by [`_CrtMemCheckpoint`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtmemcheckpoint?view=msvc-170) or returned by [`_CrtMemDifference`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtmemdifference?view=msvc-170) before **`_CrtMemDumpStatistics`** is called. If _`state`_ is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL`, and no action is taken. For more information, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

For more information about heap state functions and the `_CrtMemState` structure, see [Heap state reporting functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#heap-state-reporting-functions). For more information about how memory blocks are allocated, initialized, and managed in the debug version of the base heap, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170).

## Requirements

Routine

Required header

Optional headers

**`_CrtMemDumpStatistics`**

<crtdbg.h>

<errno.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

**Libraries:** Debug versions of the [C runtime libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)