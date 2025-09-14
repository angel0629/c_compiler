---
title: "signal Constants"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/signal-constants?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
## Syntax

```
#include <signal.h>
```

## Remarks

The `sig` argument must be one of the manifest constants listed below (defined in SIGNAL.H).

Constant

Description

`SIGABRT`

Abnormal termination. The default action terminates the calling program with exit code 3.

`SIGABRT_COMPAT`

Same meaning as `SIGABRT`. For compatibility with other platforms.

`SIGFPE`

Floating-point error, such as overflow, division by zero, or invalid operation. The default action terminates the calling program.

`SIGILL`

Illegal instruction. The default action terminates the calling program.

`SIGINT`

CTRL+C interrupt. The default action terminates the calling program with exit code 3.

`SIGSEGV`

Illegal storage access. The default action terminates the calling program.

`SIGTERM`

Termination request sent to the program. The default action terminates the calling program with exit code 3.

`SIG_ERR`

A return type from a signal indicating an error has occurred.

## See also

[`signal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/signal?view=msvc-170)  
[`raise`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/raise?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)