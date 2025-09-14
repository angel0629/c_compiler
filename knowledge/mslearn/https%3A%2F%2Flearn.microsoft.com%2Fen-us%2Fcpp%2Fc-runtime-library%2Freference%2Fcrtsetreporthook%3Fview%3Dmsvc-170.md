---
title: "_CrtSetReportHook"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreporthook?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Installs a client-defined reporting function by hooking it into the C run-time debug reporting process (debug version only).

## Syntax

```
_CRT_REPORT_HOOK _CrtSetReportHook(
   _CRT_REPORT_HOOK reportHook
);
```

### Parameters

_`reportHook`_  
New client-defined reporting function to hook into the C run-time debug reporting process.

## Return value

Returns the previous client-defined reporting function.

**`_CrtSetReportHook`** allows an application to use its own reporting function into the C run-time debug library reporting process. As a result, whenever [`_CrtDbgReport`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtdbgreport-crtdbgreportw?view=msvc-170) is called to generate a debug report, the application's reporting function is called first. This functionality enables an application to perform operations such as filtering debug reports so it can focus on specific allocation types or send a report to destinations not available by using `_CrtDbgReport`. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, calls to **`_CrtSetReportHook`** are removed during preprocessing.

For a more robust version of **`_CrtSetReportHook`**, see [`_CrtSetReportHook2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreporthook2-crtsetreporthookw2?view=msvc-170).

The **`_CrtSetReportHook`** function installs the new client-defined reporting function specified in _`reportHook`_ and returns the previous client-defined hook. The following example demonstrates how a client-defined report hook should be prototyped:

```
int YourReportHook( int reportType, char *message, int *returnValue );
```

where _`reportType`_ is the debug report type (`_CRT_WARN`, `_CRT_ERROR`, or `_CRT_ASSERT`), _`message`_ is the fully assembled debug user message to be contained in the report, and _`returnValue`_ is the value specified by the client-defined reporting function that should be returned by `_CrtDbgReport`. For a complete description of the available report types, see the [`_CrtSetReportMode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreportmode?view=msvc-170) function.

If the client-defined reporting function completely handles the debug message such that no further reporting is required, then the function should return `TRUE`. When the function returns `FALSE`, `_CrtDbgReport` is called to generate the debug report using the current settings for the report type, mode, and file. In addition, by specifying the `_CrtDbgReport` return value in _`returnValue`_, the application can also control whether a debug break occurs. For a complete description of how the debug report is configured and generated, see `_CrtSetReportMode`, [`_CrtSetReportFile`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreportfile?view=msvc-170), and `_CrtDbgReport`.

For more information about using other hook-capable run-time functions and writing your own client-defined hook functions, see [Debug hook function writing](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debugging-techniques?view=msvc-170#debug-hook-function-writing).

Note

If your application is compiled with **/clr** and the reporting function is called after the application has exited main, the CLR will throw an exception if the reporting function calls any CRT functions.

## Requirements

Routine

Required header

**`_CrtSetReportHook`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)  
[`_CrtGetReportHook`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtgetreporthook?view=msvc-170)