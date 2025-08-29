---
title: "_CrtDoForAllClientObjects"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtdoforallclientobjects?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calls an application-supplied function for all `_CLIENT_BLOCK` types in the heap (debug version only).

## Syntax

```
void _CrtDoForAllClientObjects(
   void ( * pfn )( void *, void * ),
   void *context
);
```

### Parameters

_`pfn`_  
Pointer to the application-supplied function callback function. The first parameter to this function points to the data. The second parameter is the context pointer that is passed to the call to **`_CrtDoForAllClientObjects`**.

_`context`_  
Pointer to the application-supplied context to pass to the application-supplied function.

The **`_CrtDoForAllClientObjects`** function searches the heap's linked list for memory blocks with the `_CLIENT_BLOCK` type and calls the application-supplied function when a block of this type is found. The found block and the _`context`_ parameter are passed as arguments to the application-supplied function. During debugging, an application can track a specific group of allocations by explicitly calling the debug heap functions to allocate the memory and specifying that the blocks be assigned the `_CLIENT_BLOCK` block type. These blocks can then be tracked separately and reported on differently during leak detection and memory state reporting.

If the `_CRTDBG_ALLOC_MEM_DF` bit field of the [`_crtDbgFlag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crtdbgflag?view=msvc-170) flag isn't turned on, **`_CrtDoForAllClientObjects`** immediately returns. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, calls to **`_CrtDoForAllClientObjects`** are removed during preprocessing.

For more information about the `_CLIENT_BLOCK` type and how it can be used by other debug functions, see [Types of blocks on the debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#types-of-blocks-on-the-debug-heap). For information about how memory blocks are allocated, initialized, and managed in the debug version of the base heap, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170).

If _`pfn`_ is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170) is set to `EINVAL` and the function returns.

## Requirements

Routine

Required header

**`_CrtDoForAllClientObjects`**

<crtdbg.h>, <errno.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

**Libraries:** Debug versions of universal C run-time libraries only.

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)  
[`_CrtSetDbgFlag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdbgflag?view=msvc-170)  
[Heap state reporting functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#heap-state-reporting-functions)  
[`_CrtReportBlockType`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtreportblocktype?view=msvc-170)