---
title: "_CrtCheckMemory"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtcheckmemory?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Confirms the integrity of the memory blocks allocated in the debug heap (debug version only).

## Syntax

```
int _CrtCheckMemory( void );
```

## Return value

If successful, **`_CrtCheckMemory`** returns `TRUE`; otherwise, the function returns `FALSE`.

The **`_CrtCheckMemory`** function validates memory allocated by the debug heap manager by verifying the underlying base heap and inspecting every memory block. If an error or memory inconsistency is encountered in the underlying base heap, the debug header information, or the overwrite buffers, **`_CrtCheckMemory`** generates a debug report with information describing the error condition. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, calls to **`_CrtCheckMemory`** are removed during preprocessing.

The behavior of **`_CrtCheckMemory`** can be controlled by setting the bit fields of the [`_crtDbgFlag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crtdbgflag?view=msvc-170) flag using the [`_CrtSetDbgFlag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdbgflag?view=msvc-170) function. Turning the `_CRTDBG_CHECK_ALWAYS_DF` bit field ON results in **`_CrtCheckMemory`** being called every time a memory allocation operation is requested. Although this method slows down execution, it's useful for catching errors quickly. Turning the `_CRTDBG_ALLOC_MEM_DF` bit field OFF causes **`_CrtCheckMemory`** to not verify the heap and immediately return `TRUE`.

Because this function returns `TRUE` or `FALSE`, it can be passed to one of the [`_ASSERT`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-asserte-assert-expr-macros?view=msvc-170) macros to create a basic debugging error handling mechanism. The following example causes an assertion failure if corruption is detected in the heap:

```
_ASSERTE( _CrtCheckMemory( ) );
```

For more information about how **`_CrtCheckMemory`** can be used with other debug functions, see [Heap state reporting functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#heap-state-reporting-functions). For an overview of memory management and the debug heap, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170).

## Requirements

Routine

Required header

**`_CrtCheckMemory`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## Example

For a sample of how to use **`_CrtCheckMemory`**, see [`crt_dbg1`](https://github.com/Microsoft/VCSamples/tree/master/VC2010Samples/crt/crt_dbg1).

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)  
[`_crtDbgFlag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crtdbgflag?view=msvc-170)  
[`_CrtSetDbgFlag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdbgflag?view=msvc-170)