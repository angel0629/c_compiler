---
title: "_CrtMemDumpAllObjectsSince"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtmemdumpallobjectssince?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Dumps information about objects in the heap from the start of program execution or from a specified heap state (debug version only).

## Syntax

```
void _CrtMemDumpAllObjectsSince(
   const _CrtMemState *state
);
```

### Parameters

_`state`_  
Pointer to the heap state to begin dumping from or `NULL`.

The **`_CrtMemDumpAllObjectsSince`** function dumps the debug header information of objects allocated in the heap in a user-readable form. The dump information can be used by the application to track allocations and detect memory problems. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, calls to **`_CrtMemDumpAllObjectsSince`** are removed during preprocessing.

**`_CrtMemDumpAllObjectsSince`** uses the value of the _`state`_ parameter to determine where to initiate the dump operation. To begin dumping from a specified heap state, the _`state`_ parameter must be a pointer to a `_CrtMemState` structure that has been filled in by [`_CrtMemCheckpoint`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtmemcheckpoint?view=msvc-170) before **`_CrtMemDumpAllObjectsSince`** was called. When _`state`_ is `NULL`, the function begins the dump from the start of program execution.

If the application has installed a dump hook function by calling [`_CrtSetDumpClient`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdumpclient?view=msvc-170), then every time **`_CrtMemDumpAllObjectsSince`** dumps information about a `_CLIENT_BLOCK` type of block, it calls the application-supplied dump function as well. By default, internal C run-time blocks (`_CRT_BLOCK`) aren't included in memory dump operations. The [`_CrtSetDbgFlag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdbgflag?view=msvc-170) function can be used to turn on the `_CRTDBG_CHECK_CRT_DF` bit of `_crtDbgFlag` to include these blocks. In addition, blocks marked as freed or ignored (`_FREE_BLOCK`, `_IGNORE_BLOCK`) aren't included in the memory dump.

For more information about heap state functions and the `_CrtMemState` structure, see [Heap state reporting functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#heap-state-reporting-functions). For more information about how memory blocks are allocated, initialized, and managed in the debug version of the base heap, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170).

## Requirements

Routine

Required header

**\_CrtMemDumpAll-ObjectsSince**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## Example

For a sample of how to use **`_CrtMemDumpAllObjectsSince`**, see [`crt_dbg2`](https://github.com/Microsoft/VCSamples/tree/master/VC2010Samples/crt/crt_dbg2).

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)  
[`_crtDbgFlag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crtdbgflag?view=msvc-170)