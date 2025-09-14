---
title: "_RPT, _RPTF, _RPTW, _RPTFW Macros"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rpt-rptf-rptw-rptfw-macros?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Tracks an application's progress by generating a debug report (debug version only). The `n` suffix specifies the number of arguments in _`args`_, and can be 0, 1, 2, 3, 4, or 5.

## Syntax

```
_RPTn(
   reportType,
   format,
   ...[args]
);
_RPTFn(
   reportType,
   format,
   [args]
);
_RPTWn(
   reportType,
   format
   [args]
);
_RPTFWn(
   reportType,
   format
   [args]
);
```

### Parameters

_`reportType`_  
Report type: `_CRT_WARN`, `_CRT_ERROR`, or `_CRT_ASSERT`.

_`format`_  
Format-control string used to create the user message.

_`args`_  
Substitution arguments used by _`format`_.

All these macros take the _`reportType`_ and _`format`_ parameters. In addition, they might also take up to four more arguments, signified by the number appended to the macro name. For example, **`_RPT0`** and **`_RPTF0`** take no more arguments, **`_RPT1`** and **`_RPTF1`** take _`arg1`_, **`_RPT2`** and **`_RPTF2`** take _`arg1`_ and _`arg2`_, and so on.

The `_RPT` and `_RPTF` macros are similar to the [`printf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170) function, because they can be used to track an application's progress during the debugging process. However, these macros are more flexible than `printf` because they don't need to be enclosed in **#ifdef** statements to prevent them from being called in a retail build of an application. This flexibility is achieved by using the [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) macro; the `_RPT` and `_RPTF` macros are only available when the `_DEBUG` flag is defined. When `_DEBUG` isn't defined, calls to these macros are removed during preprocessing.

The `_RPTW` and `_RPTFW` macros are wide-character versions of these macros. They are like `wprintf` and take wide-character strings as arguments.

The `_RPT` macros call the [`_CrtDbgReport`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtdbgreport-crtdbgreportw?view=msvc-170) function to generate a debug report with a user message. The `_RPTW` macros call the `_CrtDbgReportW` function to generate the same report with wide characters. The `_RPTF` and `_RPTFW` macros create a debug report with the source file and line number where the report macro was called, in addition to the user message. The user message is created by substituting the _`arg[n]`_ arguments into the _`format`_ string, using the same rules defined by the [`printf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170) function.

`_CrtDbgReport` or `_CrtDbgReportW` generates the debug report and determines its destinations based on the current report modes and file defined for _`reportType`_. The [`_CrtSetReportMode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreportmode?view=msvc-170) and [`_CrtSetReportFile`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreportfile?view=msvc-170) functions are used to define the destinations for each report type.

If an `_RPT` macro is called, and `_CrtSetReportMode` and `_CrtSetReportFile` haven't been called, messages are displayed as follows:

Report type

Output destination

`_CRT_WARN`

Warning text isn't displayed.

`_CRT_ERROR`

A pop-up window. Same as if `_CrtSetReportMode(_CRT_ERROR, _CRTDBG_MODE_WNDW);` had been specified.

`_CRT_ASSERT`

Same as `_CRT_ERROR`.

When the destination is a debug message window and the user chooses the **Retry** button, `_CrtDbgReport` or `_CrtDbgReportW` returns 1. This return value causes these macros to start the debugger, if just-in-time (JIT) debugging is enabled. For more information about using these macros as a debugging error handling mechanism, see [Macros for reporting](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debugging-techniques?view=msvc-170#macros-for-reporting).

Two other macros exist that generate a debug report. The [`_ASSERT`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-asserte-assert-expr-macros?view=msvc-170) macro generates a report, but only when its expression argument evaluates to `FALSE`. [`_ASSERTE`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-asserte-assert-expr-macros?view=msvc-170) is exactly like `_ASSERT`, but includes the failed expression in the generated report.

## Requirements

Macro

Required header

`_RPT` macros

<crtdbg.h>

`_RPTF` macros

<crtdbg.h>

`_RPTW` macros

<crtdbg.h>

`_RPTFW` macros

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

Although these macros are available when you include `crtdbg.h`, to run, the application must link with one of the debug libraries, because these macros call other run-time functions.

## Example

See the example in the [`_ASSERT`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-asserte-assert-expr-macros?view=msvc-170) article.

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)