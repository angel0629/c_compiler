---
title: "setvbuf Constants"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/setvbuf-constants?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
## Syntax

```
#include <stdio.h>
```

## Remarks

These constants represent the type of buffer for `setvbuf`.

The possible values are given by the following manifest constants:

Constant

Meaning

`_IOFBF`

Full buffering: Buffer specified in call to `setvbuf` is used and its size is as specified in `setvbuf` call. If buffer pointer is `NULL`, automatically allocated buffer of specified size is used.

`_IOLBF`

Same as `_IOFBF`.

`_IONBF`

No buffer is used, regardless of arguments in call to `setvbuf`.

## See also

[`setbuf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setbuf?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)