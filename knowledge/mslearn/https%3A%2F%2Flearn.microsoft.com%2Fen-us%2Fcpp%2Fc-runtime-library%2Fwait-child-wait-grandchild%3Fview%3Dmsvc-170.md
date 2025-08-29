---
title: "_WAIT_CHILD, _WAIT_GRANDCHILD"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/wait-child-wait-grandchild?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
## Syntax

```
#include <process.h>
```

## Remarks

The `_cwait` function can be used by any process to wait for any other process (if the process ID is known). The action argument can be one of the following values:

Constant

Meaning

`_WAIT_CHILD`

Calling process waits until specified new process terminates.

`_WAIT_GRANDCHILD`

Calling process waits until specified new process, and all processes created by that new process, terminate.

## See also

[`_cwait`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cwait?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)