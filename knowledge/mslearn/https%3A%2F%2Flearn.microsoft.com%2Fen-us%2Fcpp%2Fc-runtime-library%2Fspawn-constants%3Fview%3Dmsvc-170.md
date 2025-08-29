---
title: "spawn Constants"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/spawn-constants?view=msvc-170"
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

The `mode` argument determines the action taken by the calling process before and during a spawn operation. The following values for `mode` are possible:

Constant

Meaning

`_P_OVERLAY`

Overlays calling process with new process, destroying calling process (same effect as `_exec` calls).

`_P_WAIT`

Suspends calling thread until execution of new process is complete (synchronous `_spawn`).

`_P_NOWAIT`, `_P_NOWAITO`

Continues to execute calling process concurrently with new process (asynchronous `_spawn`).

`_P_DETACH`

Continues to execute calling process; new process is run in background with no access to console or keyboard. Calls to `_cwait` against new process will fail. This `_spawn` is asynchronous.

## See also

[`_spawn`, `_wspawn` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/spawn-wspawn-functions?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)