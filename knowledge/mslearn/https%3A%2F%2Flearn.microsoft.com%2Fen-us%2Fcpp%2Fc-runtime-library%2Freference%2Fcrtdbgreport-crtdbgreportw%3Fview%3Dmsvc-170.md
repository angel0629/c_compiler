---
title: "_CrtDbgReport, _CrtDbgReportW"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtdbgreport-crtdbgreportw?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Generates a report with a debugging message and sends the report to three possible destinations (debug version only).

## Syntax

```
int _CrtDbgReport(
   int reportType,
   const char *filename,
   int linenumber,
   const char *moduleName,
   const char *format [,
   argument] ...
);
int _CrtDbgReportW(
   int reportType,
   const wchar_t *filename,
   int linenumber,
   const wchar_t *moduleName,
   const wchar_t *format [,
   argument] ...
);
```

### Parameters

_`reportType`_  
Report type: `_CRT_WARN`, `_CRT_ERROR`, and `_CRT_ASSERT`.

_`filename`_  
Pointer to name of source file where assert/report occurred or `NULL`.

_`lineNumber`_  
Line number in source file where assert/report occurred or `NULL`.

_`moduleName`_  
Pointer to name of module (.exe or .dll) where assert or report occurred.

_`format`_  
Pointer to format-control string used to create the user message.

_`argument`_  
Optional substitution arguments used by _`format`_.

## Return value

For all report destinations, **`_CrtDbgReport`** and **`_CrtDbgReportW`** return -1 if an error occurs and 0 if no errors are encountered. However, when the report destination is a debug message window and the user chooses the **Retry** button, these functions return 1. If the user chooses the **Abort** button in the Debug Message window, these functions immediately abort and don't return a value.

The [`_RPT`, `_RPTF`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rpt-rptf-rptw-rptfw-macros?view=msvc-170) debug macros call **`_CrtDbgReport`** to generate their debug reports. The wide-character versions of these macros, along with [`_ASSERT`, `_ASSERTE`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-asserte-assert-expr-macros?view=msvc-170), [`_RPTW`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rpt-rptf-rptw-rptfw-macros?view=msvc-170) and [`_RPTFW`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rpt-rptf-rptw-rptfw-macros?view=msvc-170), use **`_CrtDbgReportW`** to generate their debug reports. When **`_CrtDbgReport`** or **`_CrtDbgReportW`** return 1, these macros start the debugger, if just-in-time (JIT) debugging is enabled.

**`_CrtDbgReport`** and **`_CrtDbgReportW`** can send the debug report to three different destinations: a debug report file, a debug monitor (the Visual Studio debugger), or a debug message window. Two configuration functions, [`_CrtSetReportMode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreportmode?view=msvc-170) and [`_CrtSetReportFile`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreportfile?view=msvc-170), are used to specify the destination or destinations for each report type. These functions allow the reporting destination or destinations for each report type to be separately controlled. For example, it's possible to specify that a _`reportType`_ of `_CRT_WARN` only goes to the debug monitor, while a _`reportType`_ of `_CRT_ASSERT` goes to both a debug message window and a user-defined report file.

**`_CrtDbgReportW`** is the wide-character version of **`_CrtDbgReport`**. All its output and string parameters are in wide-character strings; otherwise it's identical to the single-byte character version.

**`_CrtDbgReport`** and **`_CrtDbgReportW`** create the user message for the debug report by substituting the _`argument[n]`_ arguments into the _`format`_ string, using the same rules defined by the `printf` or `wprintf` functions. These functions then generate the debug report and determine the destination or destinations, based on the current report modes and file defined for _`reportType`_. When the report is sent to a debug message window, the _`filename`_, _`lineNumber`_, and _`moduleName`_ are included in the information displayed in the window.

The following table lists the available choices for the report mode or modes and file and the resulting behavior of **`_CrtDbgReport`** and **`_CrtDbgReportW`**. These options are defined as bit flags in <crtdbg.h>.

Report mode

Report file

**`_CrtDbgReport`**, **`_CrtDbgReportW`** behavior

`_CRTDBG_MODE_DEBUG`

Not applicable

Writes message by using Windows [`OutputDebugString`](https://learn.microsoft.com/en-us/windows/win32/api/debugapi/nf-debugapi-outputdebugstringw) API.

`_CRTDBG_MODE_WNDW`

Not applicable

Calls Windows [`MessageBox`](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-messagebox) API to create message box to display the message along with **Abort**, **Retry**, and **Ignore** buttons. If a user chooses **Abort**, **`_CrtDbgReport`** or **`_CrtDbgReport`** immediately aborts. If a user chooses **Retry**, it returns 1. If a user chooses **Ignore**, execution continues and **`_CrtDbgReport`** and **`_CrtDbgReportW`** return 0. Choosing **Ignore** when an error condition exists often results in undefined behavior.

`_CRTDBG_MODE_FILE`

`__HFILE`

Writes message to user-supplied `HANDLE`, using the Windows [`WriteFile`](https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-writefile) API and doesn't verify validity of file handle; the application is responsible for opening the report file and passing a valid file handle.

`_CRTDBG_MODE_FILE`

`_CRTDBG_FILE_STDERR`

Writes message to `stderr`.

`_CRTDBG_MODE_FILE`

`_CRTDBG_FILE_STDOUT`

Writes message to `stdout`.

The report can be sent to one, two, or three destinations or to no destination at all. For more information about specifying the report mode or modes and report file, see the [`_CrtSetReportMode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreportmode?view=msvc-170) and [`_CrtSetReportFile`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreportfile?view=msvc-170) functions. For more information about using the debug macros and reporting functions, see [Macros for reporting](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debugging-techniques?view=msvc-170#macros-for-reporting).

If your application needs more flexibility than that provided by **`_CrtDbgReport`** and **`_CrtDbgReportW`**, you can write your own reporting function and hook it into the C run-time library reporting mechanism by using the [`_CrtSetReportHook`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreporthook?view=msvc-170) function.

## Requirements

Routine

Required header

**`_CrtDbgReport`**

<crtdbg.h>

**`_CrtDbgReportW`**

<crtdbg.h>

**`_CrtDbgReport`** and **`_CrtDbgReportW`** are Microsoft extensions. For more information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## Example

```
// crt_crtdbgreport.c
#include <crtdbg.h>

int main(int argc, char *argv[]) {
#ifdef _DEBUG
   _CrtDbgReport(_CRT_ASSERT, __FILE__, __LINE__, argv[0], NULL);
#endif
}
```

See [`crt_dbg2`](https://github.com/Microsoft/VCSamples/tree/master/VC2010Samples/crt/crt_dbg2) for an example of how to change the report function.

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)  
[`_CrtSetReportMode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreportmode?view=msvc-170)  
[`_CrtSetReportFile`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreportfile?view=msvc-170)  
[`printf`, `_printf_l`, `wprintf`, `_wprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170)  
[`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170)