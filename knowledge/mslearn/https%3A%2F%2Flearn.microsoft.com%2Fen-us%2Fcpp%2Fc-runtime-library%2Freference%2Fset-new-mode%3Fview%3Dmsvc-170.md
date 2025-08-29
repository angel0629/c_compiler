---
title: "_set_new_mode"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-mode?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sets a **`new`** handler mode for `malloc`.

## Syntax

```
int _set_new_mode( int newhandlermode );
```

### Parameters

_`newhandlermode`_  
**`new`** handler mode for `malloc`; valid value is 0 or 1.

## Return value

Returns the previous handler mode set for `malloc`. A return value of 1 indicates that, on failure to allocate memory, `malloc` previously called the **`new`** handler routine; a return value of 0 indicates that it didn't. If the _`newhandlermode`_ argument doesn't equal 0 or 1, returns -1.

The C++ **`_set_new_mode`** function sets the **`new`** handler mode for [`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170). The **`new`** handler mode indicates whether, on failure, `malloc` is to call the **`new`** handler routine as set by [`_set_new_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-handler?view=msvc-170). By default, `malloc` doesn't call the **`new`** handler routine on failure to allocate memory. You can override this default behavior so that, when `malloc` fails to allocate memory, `malloc` calls the **`new`** handler routine in the same way that the **`new`** operator does when it fails for the same reason. For more information, see the [`new`](https://learn.microsoft.com/en-us/cpp/cpp/new-operator-cpp?view=msvc-170) and [`delete`](https://learn.microsoft.com/en-us/cpp/cpp/delete-operator-cpp?view=msvc-170) operators in the _C++ Language Reference_. To override the default, call:

```
_set_new_mode(1);
```

early in your program or link with Newmode.obj (see [Link options](https://learn.microsoft.com/en-us/cpp/c-runtime-library/link-options?view=msvc-170)).

This function validates its parameter. If _`newhandlermode`_ is anything other than 0 or 1, the function invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, **\_set\_new\_mode** returns -1 and sets `errno` to `EINVAL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_set_new_mode`**

<new.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Memory allocation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170)  
[`calloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc?view=msvc-170)  
[`free`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free?view=msvc-170)  
[`realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc?view=msvc-170)  
[`_query_new_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/query-new-handler?view=msvc-170)  
[`_query_new_mode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/query-new-mode?view=msvc-170)