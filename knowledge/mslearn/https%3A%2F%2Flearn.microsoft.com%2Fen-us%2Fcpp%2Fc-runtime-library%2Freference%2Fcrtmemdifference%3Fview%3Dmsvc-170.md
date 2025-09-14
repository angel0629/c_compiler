---
title: "_CrtMemDifference"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtmemdifference?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Compares two memory states and returns their differences (debug version only).

## Syntax

```
int _CrtMemDifference(
   _CrtMemState *stateDiff,
   const _CrtMemState *oldState,
   const _CrtMemState *newState
);
```

### Parameters

_`stateDiff`_  
Pointer to a **`_CrtMemState`** structure that is used to store the differences between the two memory states (returned).

_`oldState`_  
Pointer to an earlier memory state (**`_CrtMemState`** structure).

_`newState`_  
Pointer to a later memory state (**`_CrtMemState`** structure).

## Return value

If the difference in memory states is significant, **`_CrtMemDifference`** returns `TRUE`. Otherwise, the function returns `FALSE`.

The **`_CrtMemDifference`** function compares _`oldState`_ and _`newState`_ and stores their differences in _`stateDiff`_, which can then be used by the app to detect memory leaks and other memory problems. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, calls to **`_CrtMemDifference`** are removed during preprocessing.

_`newState`_ and _`oldState`_ must each be a valid pointer to a **`_CrtMemState`** structure, defined in `crtdbg.h`, that [`_CrtMemCheckpoint`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtmemcheckpoint?view=msvc-170) has filled in before the call to **`_CrtMemDifference`**. _`stateDiff`_ must be a pointer to a previously allocated instance of the **`_CrtMemState`** structure. If _`stateDiff`_, _`newState`_, or _`oldState`_ is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170) is set to `EINVAL` and the function returns `FALSE`.

**`_CrtMemDifference`** compares the **`_CrtMemState`** field values of the blocks in _`oldState`_ to the ones in _`newState`_ and stores the result in _`stateDiff`_. When the number of allocated block types or total number of allocated blocks for each type differs between the two memory states, the difference in states is considered significant. The difference between the largest amount ever allocated at once for the two states and the difference between total allocations for the two states are also stored in _`stateDiff`_.

By default, internal C run-time blocks (`_CRT_BLOCK`) aren't included in memory state operations. The [`_CrtSetDbgFlag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdbgflag?view=msvc-170) function can be used to turn on the `_CRTDBG_CHECK_CRT_DF` bit of **`_crtDbgFlag`** to include these blocks in leak detection and other memory state operations. Freed memory blocks (`_FREE_BLOCK`) don't cause **`_CrtMemDifference`** to return `TRUE`.

For more information about heap state functions and the **`_CrtMemState`** structure, see [Heap state reporting functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#heap-state-reporting-functions). For information about how memory blocks are allocated, initialized, and managed in the debug version of the base heap, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170).

## Requirements

Routine

Required header

Optional header

**`_CrtMemDifference`**

`<crtdbg.h>`

`<errno.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

**Libraries:** Debug versions of the [C runtime libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)  
[`_crtDbgFlag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crtdbgflag?view=msvc-170)