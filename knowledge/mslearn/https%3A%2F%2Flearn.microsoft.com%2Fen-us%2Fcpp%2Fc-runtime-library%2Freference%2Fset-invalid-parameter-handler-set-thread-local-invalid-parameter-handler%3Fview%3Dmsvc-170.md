---
title: "_set_invalid_parameter_handler, _set_thread_local_invalid_parameter_handler"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-invalid-parameter-handler-set-thread-local-invalid-parameter-handler?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sets a function to be called when the CRT detects an invalid argument.

## Syntax

```
_invalid_parameter_handler _set_invalid_parameter_handler(
   _invalid_parameter_handler pNew
);
_invalid_parameter_handler _set_thread_local_invalid_parameter_handler(
   _invalid_parameter_handler pNew
);
```

### Parameters

_`pNew`_  
The function pointer to the new invalid parameter handler.

## Return value

A pointer to the invalid parameter handler before the call.

Many C runtime functions check the validity of arguments passed to them. If an invalid argument is passed, the function can set the `errno` error number or return an error code. In such cases, the invalid parameter handler is also called. The C runtime supplies a default global invalid parameter handler that terminates the program and displays a runtime error message. You can use the **`_set_invalid_parameter_handler`** to set your own function as the global invalid parameter handler. The C runtime also supports a thread-local invalid parameter handler. If a thread-local parameter handler is set in a thread by using **`_set_thread_local_invalid_parameter_handler`**, the C runtime functions called from the thread use that handler instead of the global handler. Only one function can be specified as the global invalid argument handler at a time. Only one function can be specified as the thread-local invalid argument handler per thread, but different threads can have different thread-local handlers. Thread local handlers allow you to change the handler used in one part of your code without affecting the behavior of other threads.

When the runtime calls the invalid parameter function, it usually means that a nonrecoverable error occurred. The invalid parameter handler function you supply should save any data it can and then abort. It shouldn't return control to the main function unless you're confident that the error is recoverable.

The invalid parameter handler function must have the following prototype:

```
void _invalid_parameter(
   const wchar_t * expression,
   const wchar_t * function,
   const wchar_t * file,
   unsigned int line,
   uintptr_t pReserved
);
```

The _`expression`_ argument is a wide string representation of the argument expression that raised the error. The _`function`_ argument is the name of the CRT function that received the invalid argument. The _`file`_ argument is the name of the CRT source file that contains the function. The _`line`_ argument is the line number in that file. The last argument is reserved. The parameters all have the value `NULL` unless a debug version of the CRT library is used.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_set_invalid_parameter_handler`**, **`_set_thread_local_invalid_parameter_handler`**

C: <stdlib.h>

C++: <cstdlib> or <stdlib.h>

The **`_set_invalid_parameter_handler`** and **`_set_thread_local_invalid_parameter_handler`** functions are Microsoft-specific. For compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

In the following example, an invalid parameter error handler is used to print the function that received the invalid parameter and the file and line in CRT sources. When the debug CRT library is used, invalid parameter errors also raise an assertion, which is disabled in this example using [`_CrtSetReportMode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreportmode?view=msvc-170).

```
// crt_set_invalid_parameter_handler.c
// compile with: /Zi /MTd
#include <stdio.h>
#include <stdlib.h>
#include <crtdbg.h>  // For _CrtSetReportMode

void myInvalidParameterHandler(const wchar_t* expression,
   const wchar_t* function,
   const wchar_t* file,
   unsigned int line,
   uintptr_t pReserved)
{
   wprintf(L"Invalid parameter detected in function %s."
            L" File: %s Line: %d\n", function, file, line);
   wprintf(L"Expression: %s\n", expression);
   abort();
}

int main( )
{
   char* formatString;

   _invalid_parameter_handler oldHandler, newHandler;
   newHandler = myInvalidParameterHandler;
   oldHandler = _set_invalid_parameter_handler(newHandler);

   // Disable the message box for assertions.
   _CrtSetReportMode(_CRT_ASSERT, 0);

   // Call printf_s with invalid parameters.

   formatString = NULL;
   printf(formatString);
}
```

```
Invalid parameter detected in function common_vfprintf. File: minkernel\crts\ucrt\src\appcrt\stdio\output.cpp Line: 32
Expression: format != nullptr
```

## See also

[`_get_invalid_parameter_handler`, `_get_thread_local_invalid_parameter_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-invalid-parameter-handler-get-thread-local-invalid-parameter-handler?view=msvc-170)  
[Security-enhanced versions of CRT functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-enhanced-versions-of-crt-functions?view=msvc-170)  
[`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170)