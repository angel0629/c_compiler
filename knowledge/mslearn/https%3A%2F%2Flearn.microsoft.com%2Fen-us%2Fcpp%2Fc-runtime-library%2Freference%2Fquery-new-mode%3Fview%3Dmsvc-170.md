---
title: "_query_new_mode"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/query-new-mode?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns an integer indicating the **`new`** handler mode set by `_set_new_mode` for `malloc`.

## Syntax

```
int _query_new_mode(
   void
);
```

## Return value

Returns the current **`new`** handler mode, namely 0 or 1, for `malloc`. A return value of 1 indicates that, on failure to allocate memory, `malloc` calls the **`new`** handler routine; a return value of 0 indicates that it doesn't.

## Remarks

The C++ **`_query_new_mode`** function returns an integer that indicates the **`new`** handler mode that is set by the C++ [`_set_new_mode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-mode?view=msvc-170) function for [`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170). The **`new`** handler mode indicates whether, on failure to allocate memory, `malloc` is to call the **`new`** handler routine as set by [`_set_new_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-handler?view=msvc-170). By default, `malloc` doesn't call the **`new`** handler routine on failure. You can use `_set_new_mode` to override this behavior so that on failure `malloc` calls the **`new`** handler routine in the same way that the **`new`** operator does when it fails to allocate memory. For more information, see the discussion of the [new and delete operators](https://learn.microsoft.com/en-us/cpp/cpp/new-and-delete-operators?view=msvc-170) in the C++ Language Reference.

## Requirements

Routine

Required header

**`_query_new_mode`**

<new.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[Memory allocation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170)  
[`calloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc?view=msvc-170)  
[`free`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free?view=msvc-170)  
[`realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc?view=msvc-170)  
[`_query_new_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/query-new-handler?view=msvc-170)