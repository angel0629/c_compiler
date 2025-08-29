---
title: "_query_new_handler"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/query-new-handler?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns the address of the current **`new`** handler routine.

## Syntax

```
_PNH _query_new_handler(
   void
);
```

## Return value

Returns the address of the current **`new`** handler routine as set by `_set_new_handler`.

## Remarks

The C++ **`_query_new_handler`** function returns the address of the current exception-handling function set by the C++ [`_set_new_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-handler?view=msvc-170) function. `_set_new_handler` is used to specify an exception-handling function that is to gain control if the **`new`** operator fails to allocate memory. For more information, see the discussion of the [`new` and `delete` operators](https://learn.microsoft.com/en-us/cpp/cpp/new-and-delete-operators?view=msvc-170) in the C++ Language Reference.

## Requirements

Routine

Required header

**`_query_new_handler`**

<new.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[Memory allocation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170)  
[`free`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free?view=msvc-170)