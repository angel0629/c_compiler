---
title: "signal Action Constants"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/signal-action-constants?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The action taken when the interrupt signal is received depends on the value of `func`.

## Syntax

```
#include <signal.h>
```

## Remarks

The `func` argument must be either a function address or one of the manifest constants listed below and defined in SIGNAL.H.

Constant

Description

`SIG_DFL`

Uses system-default response. If the calling program uses stream I/O, buffers created by the run-time library aren't flushed.

`SIG_IGN`

Ignores interrupt signal. This value should never be given for `SIGFPE`, since the floating-point state of the process is left undefined.

`SIG_GET`

Returns the current value of the signal.

`SIG_SGE`

Indicates an error occurred in the signal.

`SIG_ACK`

Indicates an acknowledgment was received.

`SIG_ERR`

A return type from a signal indicating an error has occurred.

## See also

[`signal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/signal?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)