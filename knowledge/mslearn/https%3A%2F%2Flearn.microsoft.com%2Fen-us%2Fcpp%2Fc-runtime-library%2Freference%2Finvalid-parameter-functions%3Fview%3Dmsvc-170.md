---
title: "_invalid_parameter, _invalid_parameter_noinfo, _invalid_parameter_noinfo_noreturn, _invoke_watson"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/invalid-parameter-functions?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
These functions are used by the C Runtime Library to handle non-valid parameters passed to CRT Library functions. Your code may also use these functions to support default or customizable handling of non-valid parameters.

## Syntax

```
extern "C" void __cdecl
_invalid_parameter(
    wchar_t const* const expression,
    wchar_t const* const function_name,
    wchar_t const* const file_name,
    unsigned int   const line_number,
    uintptr_t      const reserved);

extern "C" void __cdecl
_invalid_parameter_noinfo(void);

extern "C" __declspec(noreturn) void __cdecl
_invalid_parameter_noinfo_noreturn(void);

extern "C" __declspec(noreturn) void __cdecl
_invoke_watson(
    wchar_t const* const expression,
    wchar_t const* const function_name,
    wchar_t const* const file_name,
    unsigned int   const line_number,
    uintptr_t      const reserved);
```

## Parameters

_`expression`_  
A string representing the source code parameter expression that isn't valid.

_`function_name`_  
The name of the function that called the handler.

_`file_name`_  
The source code file where the handler was called.

_`line_number`_  
The line number in the source code where the handler was called.

_`reserved`_  
Unused.

## Return value

These functions don't return a value. The **`_invalid_parameter_noinfo_noreturn`** and **`_invoke_watson`** functions don't return to the caller, and in some cases, **`_invalid_parameter`** and **`_invalid_parameter_noinfo`** may not return to the caller.

When C runtime library functions are passed non-valid parameters, the library functions call an _invalid parameter handler_, a function that may be specified by the programmer to do any of several things. For example, it may report the issue to the user, write to a log, break in a debugger, terminate the program, or do nothing at all. If no function is specified by the programmer, a default handler, **`_invoke_watson`**, is called.

By default, when a non-valid parameter is identified in debug code, CRT library functions call the function **`_invalid_parameter`** using verbose parameters. In non-debug code, the **`_invalid_parameter_noinfo`** function is called, which calls the **`_invalid_parameter`** function using empty parameters. If the non-debug CRT library function requires program termination, the **`_invalid_parameter_noinfo_noreturn`** function is called, which calls the **`_invalid_parameter`** function using empty parameters, followed by a call to the **`_invoke_watson`** function to force program termination.

The **`_invalid_parameter`** function checks whether a user-defined invalid parameter handler was set, and if so, calls it. For example, if a user-defined thread-local handler was set by a call to [`set_thread_local_invalid_parameter_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-invalid-parameter-handler-set-thread-local-invalid-parameter-handler?view=msvc-170) in the current thread, it's called, then the function returns. Otherwise, if a user-defined global invalid parameter handler was set by a call to [`set_invalid_parameter_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-invalid-parameter-handler-set-thread-local-invalid-parameter-handler?view=msvc-170), it's called, then the function returns. Otherwise, the default handler **`_invoke_watson`** is called. The default behavior of **`_invoke_watson`** is to terminate the program. User-defined handlers may terminate or return. We recommend that user-defined handlers terminate the program unless recovery is certain.

When the default handler **`_invoke_watson`** is called, if the processor supports a [`__fastfail`](https://learn.microsoft.com/en-us/cpp/intrinsics/fastfail?view=msvc-170) operation, it's invoked using a parameter of `FAST_FAIL_INVALID_ARG` and the process terminates. Otherwise, a fast fail exception is raised, which can be caught by an attached debugger. If the process is allowed to continue, it's terminated by a call to the Windows `TerminateProcess` function using an exception code status of `STATUS_INVALID_CRUNTIME_PARAMETER`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`_invalid_parameter`**, **`_invalid_parameter_noinfo`**, **`_invalid_parameter_noinfo_noreturn`**, **`_invoke_watson`**

`<corecrt.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`_get_invalid_parameter_handler`, `_get_thread_local_invalid_parameter_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-invalid-parameter-handler-get-thread-local-invalid-parameter-handler?view=msvc-170)  
[`_set_invalid_parameter_handler`, `_set_thread_local_invalid_parameter_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-invalid-parameter-handler-set-thread-local-invalid-parameter-handler?view=msvc-170)  
[Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170)