---
title: "Sharing Constants"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/sharing-constants?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Constants for file-sharing modes.

## Syntax

```
#include <share.h>
```

## Remarks

The _`shflag`_ argument determines the sharing mode, which consists of one or more manifest constants. These constants can be combined with the _`oflag`_ arguments (see [File constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-constants?view=msvc-170)).

The following table lists the constants and their meanings:

Constant

Meaning

`_SH_DENYRW`

Denies read and write access to file

`_SH_DENYWR`

Denies write access to file

`_SH_DENYRD`

Denies read access to file

`_SH_DENYNO`

Permits read and write access

`_SH_SECURE`

Sets secure mode (shared read, exclusive write access).

## See also

[`_sopen`, `_wsopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sopen-wsopen?view=msvc-170)  
[`_fsopen`, `_wfsopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fsopen-wfsopen?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)