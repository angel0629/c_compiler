---
title: "_amsg_exit"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/amsg-exit?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Emits a specified runtime error message and then exits your application with error code 255.

## Syntax

```
void _amsg_exit ( int rterrnum );
```

### Parameters

_`rterrnum`_  
The identification number of a system-defined runtime error message.

## Remarks

This function emits the runtime error message to `stderr` for console applications, or displays the message in a message box for Windows applications. In debug mode, you can choose to invoke the debugger before exiting.

## Requirements

Routine

Required header

\_amsg\_exit

internal.h