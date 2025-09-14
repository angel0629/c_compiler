---
title: "File Permission Constants"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-permission-constants?view=msvc-170"
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

One of these constants is required when `_O_CREAT` (`_open`, `_sopen`) is specified.

The `pmode` argument specifies the file's permission settings as follows.

Constant

Meaning

`_S_IREAD`

Reading permitted

`_S_IWRITE`

Writing permitted

`_S_IREAD | _S_IWRITE`

Reading and writing permitted

When used as the `pmode` argument for `_umask`, the manifest constant sets the permission setting, as follows.

Constant

Meaning

`_S_IREAD`

Writing not permitted (file is read-only)

`_S_IWRITE`

Reading not permitted (file is write-only)

`_S_IREAD | _S_IWRITE`

Both reading and writing not permitted

## See also

[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)  
[`_sopen`, `_wsopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sopen-wsopen?view=msvc-170)  
[`_umask`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/umask?view=msvc-170)  
[Standard types](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)