---
title: "_locking Constants"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/locking-constants?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
## Syntax

```
#include <sys/locking.h>
```

## Remarks

The _`mode`_ argument in the call to the `_locking` function specifies the locking action to be performed.

The _`mode`_ argument must be one of the following manifest constants.

Value

Description

`_LK_LOCK`

Locks the specified bytes. If the bytes can't be locked, the function tries again after 1 second. If the bytes can't be locked after 10 attempts, the function returns an error.

`_LK_RLCK`

Same as `_LK_LOCK`.

`_LK_NBLCK`

Locks the specified bytes. If bytes can't be locked, the function returns an error.

`_LK_NBRLCK`

Same as `_LK_NBLCK`.

`_LK_UNLCK`

Unlocks the specified bytes. (The bytes must have been previously locked.)

## See also

[`_locking`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/locking?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)