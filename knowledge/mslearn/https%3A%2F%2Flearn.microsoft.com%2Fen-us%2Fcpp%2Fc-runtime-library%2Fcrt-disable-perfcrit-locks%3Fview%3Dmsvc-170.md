---
title: "_CRT_DISABLE_PERFCRIT_LOCKS"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-disable-perfcrit-locks?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Disables performance-critical locking in I/O operations.

## Syntax

```
#define _CRT_DISABLE_PERFCRIT_LOCKS
```

## Remarks

Defining this symbol can improve performance in single-threaded I/O-bound programs by forcing all I/O operations to assume a single-threaded I/O model. For more information, see [Multithreaded libraries performance](https://learn.microsoft.com/en-us/cpp/c-runtime-library/multithreaded-libraries-performance?view=msvc-170).

## See also

[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)