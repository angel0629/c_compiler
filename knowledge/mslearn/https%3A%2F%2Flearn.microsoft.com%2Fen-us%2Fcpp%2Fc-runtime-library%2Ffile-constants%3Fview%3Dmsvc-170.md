---
title: "File Constants"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-constants?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
## Syntax

```
#include <fcntl.h>
```

## Remarks

The integer expression formed from one or more of these constants determines the type of reading or writing operations permitted. It's formed by combining one or more constants with a translation-mode constant.

The file constants are as follows:

Constant

Description

`_O_APPEND`

Repositions the file pointer to the end of the file before every write operation.

`_O_CREAT`

Creates and opens a new file for writing; the constant has no effect if the file specified by _`filename`_ exists.

`_O_EXCL`

Returns an error value if the file specified by _`filename`_ exists. Only applies when used with `_O_CREAT`.

`_O_RDONLY`

Opens file for reading only; if this flag is given, `_O_RDWR` and `_O_WRONLY` can't be given.

`_O_RDWR`

Opens file for both reading and writing; if this flag is given, `_O_RDONLY` and `_O_WRONLY` can't be given.

`_O_TRUNC`

Opens and truncates an existing file to zero length; the file must have write permission. The contents of the file are destroyed. If this flag is given, you can't specify `_O_RDONLY`.

`_O_WRONLY`

Opens file for writing only; if this flag is given, `_O_RDONLY` and `_O_RDWR` can't be given.

## See also

[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)  
[`_sopen`, `_wsopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sopen-wsopen?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)