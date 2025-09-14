---
title: "File Read-Write Access Constants"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-read-write-access-constants?view=msvc-170"
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

These constants specify the access type ("a", "r", or "w") requested for the file. Both the [translation mode](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-translation-constants?view=msvc-170) ("b" or "t") and the [commit-to-disk mode](https://learn.microsoft.com/en-us/cpp/c-runtime-library/commit-to-disk-constants?view=msvc-170) ("c" or "n") can be specified with the type of access.

The access types are described in this table:

Access type

Description

**"`r`"**

Opens for reading. If the file doesn't exist or can't be found, the call to open the file fails.

**"`w`"**

Opens an empty file for writing. If the given file exists, its contents are destroyed.

**"`a`"**

Opens for writing at the end of the file (appending); creates the file first if it doesn't exist. All write operations occur at the end of the file. Although the file pointer can be repositioned using `fseek` or `rewind`, it's always moved back to the end of the file before any write operation is carried out.

**"`r+`"**

Opens for both reading and writing. If the file doesn't exist or can't be found, the call to open the file fails.

**"`w+`"**

Opens an empty file for both reading and writing. If the given file exists, its contents are destroyed.

**"`a+`"**

The same as **"`a`"** but also allows reading.

When the "r+", "w+", or "a+" type is specified, both reading and writing are allowed (the file is said to be open for "update"). However, when you switch between reading and writing, there must be an intervening `fflush`, `fsetpos`, `fseek`, or `rewind` operation. The current position can be specified for the `fsetpos` or `fseek` operation.

## See also

[`_fdopen`, `_wfdopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fdopen-wfdopen?view=msvc-170)  
[`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170)  
[`freopen`, `_wfreopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freopen-wfreopen?view=msvc-170)  
[`_fsopen`, `_wfsopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fsopen-wfsopen?view=msvc-170)  
[`_popen`, `_wpopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/popen-wpopen?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)