---
title: "_CrtIsValidPointer"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtisvalidpointer?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Verifies that a pointer isn't null. In versions of the C run-time library before Visual Studio 2010, verifies that a specified memory range is valid for reading and writing (debug version only).

## Syntax

```
int _CrtIsValidPointer(
   const void *address,
   unsigned int size,
   int access
);
```

### Parameters

_`address`_  
Points to the beginning of the memory range to test for validity.

_`size`_  
Size of the specified memory range (in bytes).

_`access`_  
Read/write accessibility to determine for the memory range.

## Return value

**`_CrtIsValidPointer`** returns `TRUE` if the specified pointer isn't null. In CRT library versions before Visual Studio 2010, returns `TRUE` if the memory range is valid for the specified operation or operations. Otherwise, the function returns `FALSE`.

In the CRT library in Visual Studio 2010 and later versions, the _`size`_ and _`access`_ parameters are ignored, and **`_CrtIsValidPointer`** only verifies that the specified _`address`_ isn't null. Because this test is easy to perform yourself, we don't recommend you use this function. In versions before Visual Studio 2010, the function verifies that the memory range beginning at _`address`_ and extending for _`size`_ bytes is valid for the specified accessibility operation or operations. When _`access`_ is set to `TRUE`, the memory range is verified for both reading and writing. When _`access`_ is `FALSE`, the memory range is only validated for reading. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, calls to **`_CrtIsValidPointer`** are removed during preprocessing.

Because this function returns `TRUE` or `FALSE`, it can be passed to one of the [`_ASSERT`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-asserte-assert-expr-macros?view=msvc-170) macros to create a basic debugging error handling mechanism. The following example causes an assertion failure if the memory range isn't valid for both reading and writing operations:

```
_ASSERTE( _CrtIsValidPointer( address, size, TRUE ) );
```

For more information about how **`_CrtIsValidPointer`** can be used with other debug functions and macros, see [Macros for reporting](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debugging-techniques?view=msvc-170#macros-for-reporting). For information about how memory blocks are allocated, initialized, and managed in the debug version of the base heap, see [CRT debug heap details](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170).

## Requirements

Routine

Required header

**`_CrtIsValidPointer`**

<crtdbg.h>

**`_CrtIsValidPointer`** is a Microsoft extension. For compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## Example

See the example for the [`_CrtIsValidHeapPointer`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtisvalidheappointer?view=msvc-170) article.

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)