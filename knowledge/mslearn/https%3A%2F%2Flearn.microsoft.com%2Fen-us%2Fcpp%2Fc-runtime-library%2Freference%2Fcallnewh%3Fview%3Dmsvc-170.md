---
title: "_callnewh"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/callnewh?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calls the currently installed _`new` handler_.

## Syntax

```
int _callnewh(
   size_t size
   )
```

### Parameters

_`size`_  
The amount of memory that the [`new` operator](https://learn.microsoft.com/en-us/cpp/cpp/new-operator-cpp?view=msvc-170) tried to allocate.

## Return value

Value

Description

0

Failure: Either no `new` handler is installed or no `new` handler is active.

1

Success: The `new` handler is installed and active. The memory allocation can be retried.

## Exceptions

This function throws [`bad_alloc`](https://learn.microsoft.com/en-us/cpp/standard-library/bad-alloc-class?view=msvc-170) if the _`new` handler_ can't be located.

## Remarks

The _`new` handler_ is called if the [`new` operator](https://learn.microsoft.com/en-us/cpp/cpp/new-operator-cpp?view=msvc-170) fails to successfully allocate memory. The `new` handler might then initiate some appropriate action, such as freeing memory so that subsequent allocations succeed.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

`_callnewh`

internal.h

## See also

[`_set_new_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-handler?view=msvc-170)  
[`_set_new_mode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-mode?view=msvc-170)