---
title: "_purecall"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/purecall?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The default pure virtual function call error handler. The compiler generates code to call this function when a pure virtual member function is called.

## Syntax

```
extern "C" int __cdecl _purecall();
```

## Remarks

The **`_purecall`** function is a Microsoft-specific implementation detail of the Microsoft C++ compiler. This function isn't intended to be called by your code directly, and it has no public header declaration. It's documented here because it's a public export of the C Runtime Library.

A call to a pure virtual function is an error because it has no implementation. The compiler generates code to invoke the **`_purecall`** error handler function when a pure virtual function is called. By default, **`_purecall`** terminates the program. Before the **`_purecall`** function terminates, it invokes a `_purecall_handler` function, if one has been set for the process. You can install your own error handler function for pure virtual function calls, to catch them for debugging or reporting purposes. To use your own error handler, create a function that has the `_purecall_handler` signature, then use [`_set_purecall_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-purecall-handler-set-purecall-handler?view=msvc-170) to make it the current handler.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

The **`_purecall`** function doesn't have a header declaration. The `_purecall_handler` typedef is defined in <stdlib.h>.

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`_get_purecall_handler`, `_set_purecall_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-purecall-handler-set-purecall-handler?view=msvc-170)