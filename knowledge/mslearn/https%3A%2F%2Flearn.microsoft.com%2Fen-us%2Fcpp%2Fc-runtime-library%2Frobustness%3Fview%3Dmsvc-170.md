---
title: "Robustness"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/robustness?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Use the following C run-time library functions to improve the robustness of your program.

## Run-time robustness functions

Function

Use

[`_set_new_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-handler?view=msvc-170)

Transfers control to your error-handling mechanism if the **`new`** operator fails to allocate memory.

[`_set_se_translator`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-se-translator?view=msvc-170)

Handles Win32 exceptions (C structured exceptions) as C++ typed exceptions.

[`set_terminate`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-terminate-crt?view=msvc-170)

Installs your own termination function to be called by [`terminate`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/terminate-crt?view=msvc-170).

[`set_unexpected`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-unexpected-crt?view=msvc-170)

Installs your own termination function to be called by [`unexpected`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/unexpected-crt?view=msvc-170).

## See also

[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)  
[`SetUnhandledExceptionFilter`](https://learn.microsoft.com/en-us/windows/win32/api/errhandlingapi/nf-errhandlingapi-setunhandledexceptionfilter)