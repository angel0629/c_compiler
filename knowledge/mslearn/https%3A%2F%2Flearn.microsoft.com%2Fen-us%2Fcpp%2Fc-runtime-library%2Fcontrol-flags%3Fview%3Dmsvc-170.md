---
title: "Control Flags"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/control-flags?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The debug version of the Microsoft C run-time library uses the following flags to control the heap allocation and reporting process. For more information, see [CRT debugging techniques](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debugging-techniques?view=msvc-170).

Flag

Description

[`_CRTDBG_MAP_ALLOC`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crtdbg-map-alloc?view=msvc-170)

Maps the base heap functions to their debug version counterparts

[`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170)

Enables the use of the debugging versions of the run-time functions

[`_crtDbgFlag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crtdbgflag?view=msvc-170)

Controls how the debug heap manager tracks allocations

These flags can be defined with a /D command-line option or with a `#define` directive. When the flag is defined with `#define`, the directive must appear before the header file `#include` directive for the routine declarations.

## See also

[Global variables and standard types](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-variables-and-standard-types?view=msvc-170)