---
title: "_CRTDBG_MAP_ALLOC"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/crtdbg-map-alloc?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
When the `_CRTDBG_MAP_ALLOC` flag is defined in the debug version of an application, the base versions of the heap functions are directly mapped to their debug versions. The flag is used in Crtdbg.h to do the mapping. This flag is only available when the [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) flag has been defined in the application.

For more information about using the debug version versus the base version of a heap function, see [Debug versions of heap allocation functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-versions-of-heap-allocation-functions?view=msvc-170).

## See also

[Control flags](https://learn.microsoft.com/en-us/cpp/c-runtime-library/control-flags?view=msvc-170)