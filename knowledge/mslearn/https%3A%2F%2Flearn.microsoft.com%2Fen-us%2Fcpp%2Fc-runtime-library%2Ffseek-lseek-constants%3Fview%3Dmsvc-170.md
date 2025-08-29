---
title: "fseek, _lseek Constants"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/fseek-lseek-constants?view=msvc-170"
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

The _`origin`_ argument specifies the initial position and can be one of the following manifest constants:

Constant

Meaning

`SEEK_END`

End of file

`SEEK_CUR`

Current position of file pointer

`SEEK_SET`

Beginning of file

## See also

[`fseek`, `_fseeki64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170)  
[`_lseek`, `_lseeki64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lseek-lseeki64?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)