---
title: "_crtDbgFlag"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/crtdbgflag?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The **`_crtDbgFlag`** flag consists of five bit-fields that control how memory allocations on the debug version of the heap are tracked, verified, reported, and dumped. The bit fields of the flag are set using the [`_CrtSetDbgFlag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdbgflag?view=msvc-170) function. This flag and its bit fields are declared in Crtdbg.h. This flag is only available when the [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) flag has been defined in the application.

For more information about using this flag along with other debug functions, see [Heap state reporting functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#heap-state-reporting-functions).

## See also

[Control flags](https://learn.microsoft.com/en-us/cpp/c-runtime-library/control-flags?view=msvc-170)