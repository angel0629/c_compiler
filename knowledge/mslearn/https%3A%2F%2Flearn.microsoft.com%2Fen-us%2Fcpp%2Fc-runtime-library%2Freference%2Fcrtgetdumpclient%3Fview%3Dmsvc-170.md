---
title: "_CrtGetDumpClient"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtgetdumpclient?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Retrieves the current application-defined function for dumping the `_CLIENT_BLOCK` type memory blocks (debug version only).

## Syntax

```
_CRT_DUMP_CLIENT _CrtGetDumpClient( void );
```

## Return value

Returns the current dump routine.

## Remarks

The **`_CrtGetDumpClient`** function retrieves the current hook function for dumping objects stored in the `_CLIENT_BLOCK` memory blocks.

For more information about using other hook-capable run-time functions and writing your own client-defined hook functions, see [Debug hook function writing](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debugging-techniques?view=msvc-170#debug-hook-function-writing).

## Requirements

Routine

Required header

**`_CrtGetDumpClient`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)  
[`_CrtReportBlockType`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtreportblocktype?view=msvc-170)  
[`_CrtSetDumpClient`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdumpclient?view=msvc-170)