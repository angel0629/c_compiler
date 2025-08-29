---
title: "Multithreaded Libraries Performance"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/multithreaded-libraries-performance?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The single-threaded CRT is no longer available. This article discusses how to get the maximum performance from the multithreaded libraries.

## Maximizing performance

The performance of the multithreaded libraries has been improved and is close to the performance of the now-eliminated single-threaded libraries. For those situations when even higher performance is required, there are several new features.

*   Independent stream locking allows you to lock a stream and then use [`_nolock` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/nolock-functions?view=msvc-170) that access the stream directly. This feature allows lock usage to be hoisted outside critical loops.
    
*   Per-thread locale reduces the cost of locale access for multithreaded scenarios (see [`_configthreadlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/configthreadlocale?view=msvc-170)).
    
*   Locale-dependent functions (with names ending in \_l) take the locale as a parameter, removing substantial cost (for example, [`printf`, `_printf_l`, `wprintf`, `_wprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170)).
    
*   Optimizations for common codepages reduce the cost of many short operations.
    
*   Defining [`_CRT_DISABLE_PERFCRIT_LOCKS`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-disable-perfcrit-locks?view=msvc-170) forces all I/O operations to assume a single-threaded I/O model and use the `_nolock` forms of the functions. This macro allows highly I/O-based single-threaded applications to get better performance.
    
*   Exposure of the CRT heap handle allows you to enable the Windows Low Fragmentation Heap (LFH) for the CRT heap, which can substantially improve performance in highly scaled scenarios.
    

## See also

[C runtime (CRT) and C++ Standard Library (STL) `.lib` files](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170)