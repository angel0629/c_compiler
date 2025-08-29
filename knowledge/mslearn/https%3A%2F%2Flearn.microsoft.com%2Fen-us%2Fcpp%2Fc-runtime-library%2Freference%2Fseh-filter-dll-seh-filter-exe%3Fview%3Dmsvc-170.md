---
title: "_seh_filter_dll, _seh_filter_exe"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/seh-filter-dll-seh-filter-exe?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Identifies the exception and the related action to be taken.

## Syntax

```
int __cdecl _seh_filter_dll(
   unsigned long exceptionNum,
   struct _EXCEPTION_POINTERS* exceptionPtr
);
int __cdecl _seh_filter_exe(
   unsigned long exceptionNum,
   struct _EXCEPTION_POINTERS* exceptionPtr
);
```

### Parameters

_`exceptionNum`_  
The identifier for the exception.

_`exceptionPtr`_  
A pointer to the exception information.

## Return value

An integer that indicates the action to be taken, based on the result of exception processing.

These methods are called by the exception-filter expression of the [try-except Statement](https://learn.microsoft.com/en-us/cpp/cpp/try-except-statement?view=msvc-170). The method consults a constant internal table to identify the exception and determine the appropriate action, as shown here. The exception numbers are defined in winnt.h and the signal numbers are defined in signal.h.

Exception number (unsigned long)

Signal number

`STATUS_ACCESS_VIOLATION`

`SIGSEGV`

`STATUS_ILLEGAL_INSTRUCTION`

`SIGILL`

`STATUS_PRIVILEGED_INSTRUCTION`

`SIGILL`

`STATUS_FLOAT_DENORMAL_OPERAND`

`SIGFPE`

`STATUS_FLOAT_DIVIDE_BY_ZERO`

`SIGFPE`

`STATUS_FLOAT_INEXACT_RESULT`

`SIGFPE`

`STATUS_FLOAT_INVALID_OPERATION`

`SIGFPE`

`STATUS_FLOAT_OVERFLOW`

`SIGFPE`

`STATUS_FLOAT_STACK_CHECK`

`SIGFPE`

`STATUS_FLOAT_UNDERFLOW`

`SIGFPE`

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

**Header:** corecrt\_startup.h

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)