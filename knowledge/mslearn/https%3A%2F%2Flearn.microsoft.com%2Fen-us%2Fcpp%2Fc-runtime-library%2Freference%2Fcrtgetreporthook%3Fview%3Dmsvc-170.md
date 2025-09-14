---
title: "_CrtGetReportHook"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtgetreporthook?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Retrieves the client-defined reporting function for hooking it into the C run time for the debug reporting process (debug version only).

## Syntax

```
_CRT_REPORT_HOOK _CrtGetReportHook( void );
```

## Return value

Returns the current client-defined reporting function.

## Remarks

**`_CrtGetReportHook`** allows an application to retrieve the current reporting function for the C run-time debug library reporting process.

For more information about using other hook-capable run-time functions and writing your own client-defined hook functions, see [Debug hook function writing](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debugging-techniques?view=msvc-170#debug-hook-function-writing).

## Requirements

Routine

Required header

**`_CrtGetReportHook`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## Example

For a sample of how to use `_CrtSetReportHook`, see [`report`](https://github.com/Microsoft/VCSamples/tree/master/VC2010Samples/crt/report).

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)  
[`_CrtSetReportHook`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreporthook?view=msvc-170)