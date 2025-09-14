---
title: "CLOCKS_PER_SEC, CLK_TCK"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/clocks-per-sec-clk-tck?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
## Syntax

```
#include <time.h>
```

## Remarks

The time in seconds is the value returned by the `clock` function, divided by `CLOCKS_PER_SEC`. `CLK_TCK` is equivalent, but considered obsolete.

## See also

[`clock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clock?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)