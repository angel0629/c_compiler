---
title: "_get_invalid_parameter_handler, _get_thread_local_invalid_parameter_handler"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-invalid-parameter-handler-get-thread-local-invalid-parameter-handler?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets the function that is called when the CRT detects an invalid argument.

## Syntax

```
_invalid_parameter_handler _get_invalid_parameter_handler(void);
_invalid_parameter_handler _get_thread_local_invalid_parameter_handler(void);
```

## Return value

A pointer to the currently set invalid parameter handler function, or a null pointer if none has been set.

The **`_get_invalid_parameter_handler`** function gets the currently set global invalid parameter handler. It returns a null pointer if no global invalid parameter handler was set. Similarly, the **`_get_thread_local_invalid_parameter_handler`** gets the current thread-local invalid parameter handler of the thread it's called on, or a null pointer if no handler was set. For information about how to set global and thread-local invalid parameter handlers, see [`_set_invalid_parameter_handler`, `_set_thread_local_invalid_parameter_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-invalid-parameter-handler-set-thread-local-invalid-parameter-handler?view=msvc-170).

The returned invalid parameter handler function pointer has the following type:

```
typedef void (__cdecl* _invalid_parameter_handler)(
    wchar_t const*,
    wchar_t const*,
    wchar_t const*,
    unsigned int,
    uintptr_t
    );
```

For details on the invalid parameter handler, see the prototype in [`_set_invalid_parameter_handler`, `_set_thread_local_invalid_parameter_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-invalid-parameter-handler-set-thread-local-invalid-parameter-handler?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_get_invalid_parameter_handler`**, **`_get_thread_local_invalid_parameter_handler`**

C: <stdlib.h>

C++: <cstdlib> or <stdlib.h>

The **`_get_invalid_parameter_handler`** and **`_get_thread_local_invalid_parameter_handler`** functions are Microsoft-specific. For compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[`_set_invalid_parameter_handler`, `_set_thread_local_invalid_parameter_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-invalid-parameter-handler-set-thread-local-invalid-parameter-handler?view=msvc-170)  
[Security-enhanced versions of CRT functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-enhanced-versions-of-crt-functions?view=msvc-170)