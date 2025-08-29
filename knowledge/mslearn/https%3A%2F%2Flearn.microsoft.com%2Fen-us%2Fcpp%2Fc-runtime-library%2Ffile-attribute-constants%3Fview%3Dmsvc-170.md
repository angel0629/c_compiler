---
title: "File Attribute Constants"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-attribute-constants?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
## Syntax

```
#include <io.h>
```

## Remarks

These constants specify the current attributes of the file or directory specified by the function.

The attributes are represented by the following manifest constants:

Constant

Description

`_A_ARCH`

Archive. Set whenever the file is changed, and cleared by the BACKUP command. Value: 0x20

`_A_HIDDEN`

Hidden file. Not normally seen with the DIR command, unless the /AH option is used. Returns information about both normal files and files with this attribute. Value: 0x02

`_A_NORMAL`

Normal. File can be read or written to without restriction. Value: 0x00

`_A_RDONLY`

Read-only. File can't be opened for writing, and a file with the same name can't be created. Value: 0x01

`_A_SUBDIR`

Subdirectory. Value: 0x10

`_A_SYSTEM`

System file. Not normally seen with the DIR command, unless the /AS option is used. Value: 0x04

Multiple constants can be combined with the OR operator (`|`).

## See also

[Filename search functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/filename-search-functions?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)