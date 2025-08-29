---
title: "_CrtDumpMemoryLeaks"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtdumpmemoryleaks?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Dumps all the memory blocks in the debug heap when a memory leak has occurred (debug version only).

## Syntax

```
int _CrtDumpMemoryLeaks( void );
```

## Return value

**`_CrtDumpMemoryLeaks`** returns `TRUE` if a memory leak is found. Otherwise, the function returns `FALSE`.

The **`_CrtDumpMemoryLeaks`** function determines whether a memory leak has occurred since the start of program execution. When a leak is found, the debug header information for all the objects in the heap is dumped in a user-readable form. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, calls to **`_CrtDumpMemoryLeaks`** are removed during preprocessing.

**`_CrtDumpMemoryLeaks`** is frequently called at the end of program execution to verify that all memory allocated by the application has been freed. The function can be called automatically at program termination by turning on the `_CRTDBG_LEAK_CHECK_DF` bit field of the [`_crtDbgFlag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crtdbgflag?view=msvc-170) flag using the [`_CrtSetDbgFlag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdbgflag?view=msvc-170) function.

**`_CrtDumpMemoryLeaks`** calls [`_CrtMemCheckpoint`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtmemcheckpoint?view=msvc-170) to obtain the current state of the heap and then scans the state for blocks that haven't been freed. When an unfreed block is encountered, **`_CrtDumpMemoryLeaks`** calls [`_CrtMemDumpAllObjectsSince`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtmemdumpallobjectssince?view=msvc-170) to dump information for all the objects allocated in the heap from the start of program execution.

By default, internal C run-time blocks (`_CRT_BLOCK`) aren't included in memory dump operations. The [`_CrtSetDbgFlag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdbgflag?view=msvc-170) function can be used to turn on the `_CRTDBG_CHECK_CRT_DF` bit of **`_crtDbgFlag`** to include these blocks in the leak detection process.

For more information about heap state functions and the **`_CrtMemState`** structure, see [Heap state reporting functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#heap-state-reporting-functions). For more information about how memory blocks are allocated, initialized, and managed in the debug version of the base heap, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170).

## Requirements

Routine

Required header

**`_CrtDumpMemoryLeaks`**

`<crtdbg.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## Example

For a sample of how to use **`_CrtDumpMemoryLeaks`**, see [`crt_dbg1`](https://github.com/Microsoft/VCSamples/tree/master/VC2010Samples/crt/crt_dbg1).

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)