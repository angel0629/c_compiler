---
title: "_stat Structure st_mode Field Constants"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/stat-structure-st-mode-field-constants?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
## Syntax

```
#include <sys/stat.h>
```

## Remarks

These constants are used to indicate file type in the `st_mode` field of the [`_stat` structure](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170).

The bit mask constants are described below:

Constant

Meaning

`_S_IFMT`

File type mask

`_S_IFDIR`

Directory

`_S_IFCHR`

Character special (indicates a device if set)

`_S_IFREG`

Regular

`_S_IREAD`

Read permission, owner

`_S_IWRITE`

Write permission, owner

`_S_IEXEC`

Execute/search permission, owner

## See also

[`_stat`, `_wstat` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stat-functions?view=msvc-170)  
[`_fstat`, `_fstat32`, `_fstat64`, `_fstati64`, `_fstat32i64`, `_fstat64i32`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fstat-fstat32-fstat64-fstati64-fstat32i64-fstat64i32?view=msvc-170)  
[Standard types](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)