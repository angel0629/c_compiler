---
title: "Memory Allocation"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
These routines allocate, free, and reallocate memory.

## Memory-allocation routines

Routine

Use

[`_alloca`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/alloca?view=msvc-170), [`_malloca`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloca?view=msvc-170)

Allocate memory from the stack

[`calloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc?view=msvc-170)

Allocate an array and initialize its elements to 0 (zero)

[`_calloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc-dbg?view=msvc-170)

Debug version of **`calloc`**. Only available in the debug versions of the run-time libraries

[`operator delete`, `operator delete[]`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/delete-operator-crt?view=msvc-170)

Free memory allocated on the heap

[`_expand`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/expand?view=msvc-170)

Expand or shrink a block of memory without moving it

[`_expand_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/expand-dbg?view=msvc-170)

Debug version of **`_expand`**. Only available in the debug versions of the run-time libraries

[`free`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free?view=msvc-170)

Free memory allocated on the heap

[`_free_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free-dbg?view=msvc-170)

Debug version of **`free`**. Only available in the debug versions of the run-time libraries

[`_freea`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freea?view=msvc-170)

Free memory allocated on the stack

[`_get_heap_handle`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-heap-handle?view=msvc-170)

Get a Win32 `HANDLE` to the C runtime (CRT) heap.

[`_heapadd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/heapadd?view=msvc-170)

Add memory to the heap

[`_heapchk`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapchk?view=msvc-170)

Check the heap for consistency

[`_heapmin`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapmin?view=msvc-170)

Release unused memory in the heap

[`_heapset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/heapset?view=msvc-170)

Fill free heap entries with a value

[`_heapwalk`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapwalk?view=msvc-170)

Get info about each entry in the heap

[`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170)

Allocate memory from the heap

[`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170)

Debug version of **`malloc`**; only available in the debug versions of the run-time libraries

[`_msize`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/msize?view=msvc-170)

Return the size of an allocated block of memory

[`_msize_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/msize-dbg?view=msvc-170)

Debug version of **`_msize`**; only available in the debug versions of the run-time libraries

[`new`, `new[]`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/new-operator-crt?view=msvc-170)

Allocate a block of memory from the heap

[`_query_new_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/query-new-handler?view=msvc-170)

Get the address of the current new handler routine set by **`_set_new_handler`**

[`_query_new_mode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/query-new-mode?view=msvc-170)

Get the new handler mode set by **`_set_new_mode`** for **`malloc`**

[`realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc?view=msvc-170)

Reallocate a block to a new size

[`_realloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc-dbg?view=msvc-170)

Debug version of **`realloc`**; only available in the debug versions of the run-time libraries

[`_set_new_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-handler?view=msvc-170)

Enable error-handling mechanism when the **`new`** operator fails to allocate memory, and enable compilation of the C++ Standard Libraries

[`_set_new_mode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-mode?view=msvc-170)

Set the new handler mode for **`malloc`**

## See also

[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)