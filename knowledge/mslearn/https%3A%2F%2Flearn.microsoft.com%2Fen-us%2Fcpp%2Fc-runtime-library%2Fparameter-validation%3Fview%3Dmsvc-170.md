---
title: "Parameter Validation"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Most of the security-enhanced CRT functions, and many that aren't, validate their parameters for things like checking pointers for `NULL`, that integers fall into a valid range, or that enumeration values are valid. If an invalid parameter is found, the invalid parameter handler is called.

## Invalid parameter handler routine

When a C Runtime Library function detects an invalid parameter, it captures some information about the error, and then calls a macro that wraps an invalid parameter handler dispatch function. Which will be one of [`_invalid_parameter`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/invalid-parameter-functions?view=msvc-170), [`_invalid_parameter_noinfo`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/invalid-parameter-functions?view=msvc-170), or [`_invalid_parameter_noinfo_noreturn`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/invalid-parameter-functions?view=msvc-170). Which dispatch function is called depends on whether your code is, respectively, a debug build, a retail build, or the error isn't considered recoverable.

In debug builds, the invalid parameter macro usually raises a failed assertion and a debugger breakpoint before the dispatch function is called. When the code runs, the assertion may be reported to the user in a dialog box that has "Abort", "Retry", and "Continue" or similar choices that depend on the operating system and CRT version. These options allow the user to immediately terminate the program, to attach a debugger, or to let the existing code continue to run which calls the dispatch function.

The invalid parameter handler dispatch function calls the currently assigned invalid parameter handler. By default, the invalid parameter calls `_invoke_watson`, which causes the application to close and generate a mini-dump. If enabled by the operating system, a dialog box asks the user if they want to send the crash dump to Microsoft for analysis.

You can change this behavior by using the functions [`_set_invalid_parameter_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-invalid-parameter-handler-set-thread-local-invalid-parameter-handler?view=msvc-170) or [`_set_thread_local_invalid_parameter_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-invalid-parameter-handler-set-thread-local-invalid-parameter-handler?view=msvc-170) to set the invalid parameter handler to your own function. If the function you specify doesn't terminate the application, control is returned to the function that received the invalid parameters. In the CRT, these functions will normally stop function execution, set `errno` to an error code, and return an error code. In many cases, the `errno` value and the return value are both `EINVAL`, to indicate an invalid parameter. In some cases, a more specific error code is returned, such as `EBADF` for a bad file pointer passed in as a parameter.

For more information on `errno`, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

## See also

[Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170)  
[C runtime (CRT) and C++ Standard Library (STL) `.lib` files](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170)