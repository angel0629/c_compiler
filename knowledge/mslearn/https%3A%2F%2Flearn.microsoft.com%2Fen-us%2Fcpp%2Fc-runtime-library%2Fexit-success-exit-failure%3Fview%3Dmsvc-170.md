---
title: "EXIT_SUCCESS, EXIT_FAILURE"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/exit-success-exit-failure?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
## Required header

```
#include <stdlib.h>
```

## Remarks

The **`EXIT_SUCCESS`** and `EXIT_FAILURE` constants are arguments for the [`exit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exit-exit-exit?view=msvc-170) and [`_exit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exit-exit-exit?view=msvc-170) functions, and the return values for the [`atexit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atexit?view=msvc-170) and [`_onexit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/onexit-onexit-m?view=msvc-170) functions.

Constant

Defined value

**`EXIT_SUCCESS`**

0

**`EXIT_FAILURE`**

1

## See also

[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)