---
title: "Exception Handling Routines"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/exception-handling-routines?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Use the C++ exception-handling functions to recover from unexpected events during program execution.

## Exception-handling functions

Function

Use

[`_set_se_translator`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-se-translator?view=msvc-170)

Handle Win32 exceptions (C structured exceptions) as C++ typed exceptions

[`set_terminate`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-terminate-crt?view=msvc-170)

Install your own termination routine to be called by `terminate`

[`set_unexpected`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-unexpected-crt?view=msvc-170)

Install your own termination function to be called by `unexpected`

[`terminate`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/terminate-crt?view=msvc-170)

Called automatically under certain circumstances after exception is thrown. The `terminate` function calls `abort` or a function you specify using `set_terminate`

[`unexpected`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/unexpected-crt?view=msvc-170)

Calls `terminate` or a function you specify using `set_unexpected`. The `unexpected` function isn't used in current Microsoft C++ exception-handling implementation

## See also

[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)