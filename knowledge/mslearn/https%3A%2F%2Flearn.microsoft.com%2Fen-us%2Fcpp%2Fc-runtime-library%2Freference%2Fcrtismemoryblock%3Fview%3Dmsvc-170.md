---
title: "_CrtIsMemoryBlock"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtismemoryblock?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Verifies that a specified memory block is in the local heap and that it has a valid debug heap block type identifier (debug version only).

## Syntax

```
int _CrtIsMemoryBlock(
   const void *userData,
   unsigned int size,
   long *requestNumber,
   char **filename,
   int *lineNumber
);
```

### Parameters

_`userData`_  
Pointer to the beginning of the memory block to verify.

_`size`_  
Size of the specified block (in bytes).

_`requestNumber`_  
Pointer to the allocation number of the block or `NULL`.

_`filename`_  
Pointer to the name of the source file that requested the block or `NULL`.

_`lineNumber`_  
Pointer to the line number in the source file or `NULL`.

## Return value

**`_CrtIsMemoryBlock`** returns `TRUE` if the specified memory block is located within the local heap and has a valid debug heap block type identifier; otherwise, the function returns `FALSE`.

The **`_CrtIsMemoryBlock`** function verifies that a specified memory block is located within the application's local heap and that it has a valid block type identifier. This function can also be used to obtain the object allocation order number and the source file name/line number where the memory block allocation was originally requested. A non-`NULL` value passed in a _`requestNumber`_, _`filename`_, or _`lineNumber`_ parameter causes **`_CrtIsMemoryBlock`** to set the parameter to the value in the memory block's debug header, if it finds the block in the local heap. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, calls to **`_CrtIsMemoryBlock`** are removed during preprocessing.

If **`_CrtIsMemoryBlock`** fails, it returns `FALSE`, and the output parameters are initialized to default values: _`requestNumber`_ and _`lineNumber`_ are set to 0 and _`filename`_ is set to `NULL`.

Because this function returns `TRUE` or `FALSE`, it can be passed to one of the [`_ASSERT`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-asserte-assert-expr-macros?view=msvc-170) macros to create a basic debugging error handling mechanism. The following example causes an assertion failure if the specified address isn't located within the local heap:

```
_ASSERTE( _CrtIsMemoryBlock( userData, size, &requestNumber,
          &filename, &linenumber ) );
```

For more information about how **`_CrtIsMemoryBlock`** can be used with other debug functions and macros, see [Macros for reporting](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debugging-techniques?view=msvc-170#macros-for-reporting). For information about how memory blocks are allocated, initialized, and managed in the debug version of the base heap, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170).

## Requirements

Routine

Required header

**`_CrtIsMemoryBlock`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## Example

See the example for the [`_CrtIsValidHeapPointer`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtisvalidheappointer?view=msvc-170) article.

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)