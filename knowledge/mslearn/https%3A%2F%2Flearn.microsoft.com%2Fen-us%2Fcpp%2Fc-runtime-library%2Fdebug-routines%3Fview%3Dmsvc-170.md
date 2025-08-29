---
title: "Debug routines"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The debug version of the C runtime library supplies many diagnostic services that make debugging programs easier and allow developers to:

*   Step directly into run-time functions during debugging
    
*   Resolve assertions, errors, and exceptions
    
*   Trace heap allocations and prevent memory leaks
    
*   Report debug messages to the user
    

## Debug versions of the C runtime library routines

To use these routines, the [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) flag must be defined. All of these routines do nothing in a retail build of an application. For more information on how to use the new debug routines, see [CRT debugging techniques](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debugging-techniques?view=msvc-170).

Routine

Use

[`_ASSERT`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-asserte-assert-expr-macros?view=msvc-170)

Evaluate an expression and generates a debug report when the result is `FALSE`

[`_ASSERTE`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-asserte-assert-expr-macros?view=msvc-170)

Similar to `_ASSERT`, but includes the failed expression in the generated report

[`_CrtCheckMemory`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtcheckmemory?view=msvc-170)

Confirm the integrity of the memory blocks allocated on the debug heap

[`_CrtDbgBreak`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtdbgbreak?view=msvc-170)

Sets a break point.

[`_CrtDbgReport`, `_CrtDbgReportW`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtdbgreport-crtdbgreportw?view=msvc-170)

Generate a debug report with a user message and send the report to three possible destinations

[`_CrtDoForAllClientObjects`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtdoforallclientobjects?view=msvc-170)

Call an application-supplied function for all `_CLIENT_BLOCK` types on the heap

[`_CrtDumpMemoryLeaks`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtdumpmemoryleaks?view=msvc-170)

Dump all of the memory blocks on the debug heap when a significant memory leak has occurred

[`_CrtIsMemoryBlock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtismemoryblock?view=msvc-170)

Verify that a specified memory block is located within the local heap and that it has a valid debug heap block type identifier

[`_CrtIsValidHeapPointer`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtisvalidheappointer?view=msvc-170)

Verifies that a specified pointer is in the local heap

[`_CrtIsValidPointer`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtisvalidpointer?view=msvc-170)

Verify that a specified memory range is valid for reading and writing

[`_CrtMemCheckpoint`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtmemcheckpoint?view=msvc-170)

Obtain the current state of the debug heap and store it in an application-supplied `_CrtMemState` structure

[`_CrtMemDifference`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtmemdifference?view=msvc-170)

Compare two memory states for significant differences and return the results

[`_CrtMemDumpAllObjectsSince`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtmemdumpallobjectssince?view=msvc-170)

Dump information about objects on the heap since a specified checkpoint was taken or from the start of program execution

[`_CrtMemDumpStatistics`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtmemdumpstatistics?view=msvc-170)

Dump the debug header information for a specified memory state in a user-readable form

[`_CrtReportBlockType`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtreportblocktype?view=msvc-170)

Returns the block type/subtype associated with a given debug heap block pointer.

[`_CrtSetAllocHook`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetallochook?view=msvc-170)

Install a client-defined allocation function by hooking it into the C run-time debug memory allocation process

[`_CrtSetBreakAlloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetbreakalloc?view=msvc-170)

Set a breakpoint on a specified object allocation order number

[`_CrtSetDbgFlag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdbgflag?view=msvc-170)

Retrieve or modify the state of the `_crtDbgFlag` flag to control the allocation behavior of the debug heap manager

[`_CrtSetDumpClient`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdumpclient?view=msvc-170)

Install an application-defined function that is called every time a debug dump function is called to dump `_CLIENT_BLOCK` type memory blocks

[`_CrtSetReportFile`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreportfile?view=msvc-170)

Identify the file or stream to be used as a destination for a specific report type by `_CrtDbgReport`

[`_CrtSetReportHook`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreporthook?view=msvc-170)

Install a client-defined reporting function by hooking it into the C run-time debug reporting process

[`_CrtSetReportHook2`, `_CrtSetReportHookW2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreporthook2-crtsetreporthookw2?view=msvc-170)

Installs or uninstalls a client-defined reporting function by hooking it into the C run-time debug reporting process.

[`_CrtSetReportMode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreportmode?view=msvc-170)

Specify the general destination(s) for a specific report type generated by `_CrtDbgReport`

[`_RPT[0,1,2,3,4]`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rpt-rptf-rptw-rptfw-macros?view=msvc-170)

Track the application's progress by generating a debug report by calling `_CrtDbgReport` with a format string and a variable number of arguments. Provides no source file and line number information.

[`_RPTF[0,1,2,3,4]`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rpt-rptf-rptw-rptfw-macros?view=msvc-170)

Similar to the `_RPTn` macros, but provides the source file name and line number where the report request originated

[`_calloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc-dbg?view=msvc-170)

Allocate a specified number of memory blocks on the heap with extra space for a debugging header and overwrite buffers

[`_expand_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/expand-dbg?view=msvc-170)

Resize a specified block of memory on the heap by expanding or contracting the block

[`_free_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free-dbg?view=msvc-170)

Free a block of memory on the heap

[`_fullpath_dbg`, `_wfullpath_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fullpath-dbg-wfullpath-dbg?view=msvc-170)

Create an absolute or full path name for the specified relative path name, using [`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170) to allocate memory.

[`_getcwd_dbg`, `_wgetcwd_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getcwd-dbg-wgetcwd-dbg?view=msvc-170)

Get the current working directory, using [`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170) to allocate memory.

[`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170)

Allocate a block of memory on the heap with extra space for a debugging header and overwrite buffers

[`_msize_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/msize-dbg?view=msvc-170)

Calculate the size of a block of memory on the heap

[`_realloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc-dbg?view=msvc-170)

Reallocate a specified block of memory on the heap by moving and/or resizing the block

[`_strdup_dbg`, `_wcsdup_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdup-dbg-wcsdup-dbg?view=msvc-170)

Duplicates a string, using [`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170) to allocate memory.

[`_tempnam_dbg`, `_wtempnam_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tempnam-dbg-wtempnam-dbg?view=msvc-170)

Generate names you can use to create temporary files, using [`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170) to allocate memory.

## C runtime routines that aren't available in source code form

The debugger can be used to step through the source code for most of the C runtime routines during the debugging process. However, Microsoft considers some technology to be proprietary and, therefore, doesn't provide the source code for a subset of these routines. Most of these routines belong to either the exception handling or floating-point processing groups, but a few others are included as well. The following table lists these routines.

Although source code is available for most of the `printf` and `scanf` routines, they make an internal call to another routine for which source code isn't provided.

## Routines that behave differently in a debug build of an application

Some C run-time functions and C++ operators behave differently when called from a debug build of an application. (You can create a debug build of an application by either defining the `_DEBUG` flag or by linking with a debug version of the C run-time library.) The behavioral differences usually consist of extra features or information provided by the routine to support the debugging process. The following table lists these routines.

C++ [`new`](https://learn.microsoft.com/en-us/cpp/cpp/new-operator-cpp?view=msvc-170) operator

## See also

[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)  
[Runtime error checking](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-error-checking?view=msvc-170)