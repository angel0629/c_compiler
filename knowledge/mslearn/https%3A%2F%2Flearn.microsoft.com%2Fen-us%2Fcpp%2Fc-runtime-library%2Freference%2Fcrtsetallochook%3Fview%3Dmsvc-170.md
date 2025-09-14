---
title: "_CrtSetAllocHook"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetallochook?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Installs a client-defined allocation function by hooking it into the C run-time debug memory allocation process (debug version only).

## Syntax

```
_CRT_ALLOC_HOOK _CrtSetAllocHook(
   _CRT_ALLOC_HOOK allocHook
);
```

### Parameters

_`allocHook`_  
New client-defined allocation function to hook into the C run-time debug memory allocation process.

## Return value

Returns the previously defined allocation hook function, or `NULL` if _`allocHook`_ is `NULL`.

**`_CrtSetAllocHook`** allows an application to hook its own allocation function into the C run-time debug library memory allocation process. As a result, every call to a debug allocation function to allocate, reallocate, or free a memory block triggers a call to the application's hook function. **`_CrtSetAllocHook`** provides an application with an easy method for testing how the application handles insufficient memory situations, the ability to examine allocation patterns, and the opportunity to log allocation information for later analysis. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, calls to **`_CrtSetAllocHook`** are removed during preprocessing.

The **`_CrtSetAllocHook`** function installs the new client-defined allocation function specified in _`allocHook`_ and returns the previously defined hook function. The following example demonstrates how a client-defined allocation hook should be prototyped:

```
int YourAllocHook( int allocType, void *userData, size_t size,
                   int blockType, long requestNumber,
                   const unsigned char *filename, int lineNumber);
```

The `allocType` argument specifies the type of allocation operation (`_HOOK_ALLOC`, `_HOOK_REALLOC`, and `_HOOK_FREE`) that triggered the call to the allocation's hook function. When the triggering allocation type is `_HOOK_FREE`, _`userData`_ is a pointer to the user data section of the memory block about to be freed. However, when the triggering allocation type is `_HOOK_ALLOC` or `_HOOK_REALLOC`, _`userData`_ is `NULL` because the memory block hasn't been allocated yet.

_`size`_ specifies the size of the memory block in bytes, _`blockType`_ indicates the type of the memory block, _`requestNumber`_ is the object allocation order number of the memory block, and, if available, _`filename`_ and _`lineNumber`_ specify the source file name and line number where the triggering allocation operation was initiated.

After the hook function has finished processing, it must return a Boolean value, which tells the main C run-time allocation process how to continue. When the hook function wants the main allocation process to continue as if the hook function had never been called, then the hook function should return `TRUE`, which causes the original triggering allocation operation to be executed. The hook function can gather and save allocation information for later analysis, without interfering with the current allocation operation or state of the debug heap.

When the hook function wants the main allocation process to continue as if the triggering allocation operation was called and it failed, then the hook function should return `FALSE`. The hook function can simulate a wide range of memory conditions and debug heap states to test how the application handles each situation.

To clear the hook function, pass `NULL` to **`_CrtSetAllocHook`**.

For more information about how **`_CrtSetAllocHook`** can be used with other memory management functions or how to write your own client-defined hook functions, see [Debug hook function writing](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debugging-techniques?view=msvc-170#debug-hook-function-writing).

Note

**`_CrtSetAllocHook`** is not supported under **/clr:pure**. The **/clr:pure** and **/clr:safe** compiler options are deprecated in Visual Studio 2015 and removed in Visual Studio 2017.

## Requirements

Routine

Required header

**`_CrtSetAllocHook`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## Example

For a sample of how to use **`_CrtSetAllocHook`**, see [`crt_dbg2`](https://github.com/Microsoft/VCSamples/tree/master/VC2010Samples/crt/crt_dbg2).

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)  
[`_CrtGetAllocHook`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtgetallochook?view=msvc-170)