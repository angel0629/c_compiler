---
title: "_ASSERT, _ASSERTE, _ASSERT_EXPR Macros"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-asserte-assert-expr-macros?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Evaluate an expression and generate a debug report when the result is **`false`** (debug version only).

## Syntax

```
// Typical usage:
_ASSERT_EXPR( booleanExpression, message );
_ASSERT( booleanExpression );
_ASSERTE( booleanExpression );
```

### Parameters

_`booleanExpression`_  
A scalar expression (including pointer expressions) that evaluates to nonzero (`true`) or 0 (`false`).

_`message`_  
A wide string to display as part of the report.

The `_ASSERT_EXPR`, `_ASSERT` and `_ASSERTE` macros provide an application with a clean and simple mechanism for checking assumptions during the debugging process. They're flexible because they don't need to be enclosed in `#ifdef` statements to prevent them from being called in a retail build of an application. This flexibility is achieved by using the [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) macro. `_ASSERT_EXPR`, `_ASSERT` and `_ASSERTE` are only available when `_DEBUG` is defined at compile time. When `_DEBUG` isn't defined, calls to these macros are removed during preprocessing.

`_ASSERT_EXPR`, `_ASSERT` and `_ASSERTE` evaluate their _`booleanExpression`_ argument and when the result is **`false`** (0), they print a diagnostic message and call [`_CrtDbgReportW`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtdbgreport-crtdbgreportw?view=msvc-170) to generate a debug report. The `_ASSERT` macro prints a simple diagnostic message, `_ASSERTE` includes a string representation of the failed expression in the message, and `_ASSERT_EXPR` includes the _`message`_ string in the diagnostic message. These macros do nothing when _`booleanExpression`_ evaluates to nonzero.

`_ASSERT_EXPR`, `_ASSERT` and `_ASSERTE` invoke `_CrtDbgReportW`, which causes all output to be in wide characters. `_ASSERTE` properly prints Unicode characters in _`booleanExpression`_ and `_ASSERT_EXPR` prints Unicode characters in _`message`_.

Because the `_ASSERTE` macro specifies the failed expression, and `_ASSERT_EXPR` lets you specify a message in the generated report, they enable users to identify the problem without referring to the application source code. However, a disadvantage exists in that every _`message`_ printed by `_ASSERT_EXPR` and every expression evaluated by `_ASSERTE` is included in the output (debug version) file of your application as a string constant. Therefore, if a large number of calls are made to `_ASSERT_EXPR` or `_ASSERTE`, these expressions can greatly increase the size of your output file.

Unless you specify otherwise with the [`_CrtSetReportMode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreportmode?view=msvc-170) and [`_CrtSetReportFile`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreportfile?view=msvc-170) functions, messages appear in a pop-up dialog box equivalent to setting:

```
_CrtSetReportMode(_CRT_ASSERT, _CRTDBG_MODE_WNDW);
```

`_CrtDbgReportW` generates the debug report and determines its destination or destinations, based on the current report mode or modes and file defined for the `_CRT_ASSERT` report type. By default, assertion failures and errors are directed to a debug message window. The [`_CrtSetReportMode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreportmode?view=msvc-170) and [`_CrtSetReportFile`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreportfile?view=msvc-170) functions are used to define the destinations for each report type.

When the destination is a debug message window and the user selects the **Retry** button, `_CrtDbgReportW` returns 1, causing the `_ASSERT_EXPR`, `_ASSERT` and `_ASSERTE` macros to start the debugger if just-in-time (JIT) debugging is enabled.

For more information about the reporting process, see the [`_CrtDbgReport`, `_CrtDbgReportW`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtdbgreport-crtdbgreportw?view=msvc-170) function. For more information about resolving assertion failures and using these macros as a debugging error handling mechanism, see [Macros for reporting](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debugging-techniques?view=msvc-170#macros-for-reporting).

In addition to the `_ASSERT` macros, the [`assert`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-macro-assert-wassert?view=msvc-170) macro can be used to verify program logic. This macro is available in both the debug and release versions of the libraries. The [`_RPT`, `_RPTF`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rpt-rptf-rptw-rptfw-macros?view=msvc-170) debug macros are also available for generating a debug report, but they don't evaluate an expression. The `_RPT` macros generate a simple report. The `_RPTF` macros include the source file and line number where the report macro was called in the generated report. Wide character versions of these macros are available (`_RPTW`, `_RPTFW`). The wide character versions are identical to the narrow character versions except that wide character strings are used for all string parameters and output.

Although `_ASSERT_EXPR`, `_ASSERT` and `_ASSERTE` are macros and are available by including `<crtdbg.h>`, the application must link with a debug version of the C run-time library when `_DEBUG` is defined because these macros call other run-time functions.

## Requirements

Macro

Required header

`_ASSERT_EXPR`, `_ASSERT`, `_ASSERTE`

`<crtdbg.h>`

## Example

In this program, calls are made to the `_ASSERT` and `_ASSERTE` macros to test the condition `string1 == string2`. If the condition fails, these macros print a diagnostic message. The `_RPT` and `_RPTF` group of macros is also exercised in this program, as an alternative to the **`printf`** function.

```
// crt_ASSERT_macro.c
// compile with: /D_DEBUG /MTd /Od /Zi /link /verbose:lib /debug
//
// This program uses the _ASSERT and _ASSERTE debugging macros.
//

#include <stdio.h>
#include <string.h>
#include <malloc.h>
#include <crtdbg.h>

int main()
{
   char *p1, *p2;

   // The Reporting Mode and File must be specified
   // before generating a debug report via an assert
   // or report macro.
   // This program sends all report types to STDOUT.
   _CrtSetReportMode(_CRT_WARN, _CRTDBG_MODE_FILE);
   _CrtSetReportFile(_CRT_WARN, _CRTDBG_FILE_STDOUT);
   _CrtSetReportMode(_CRT_ERROR, _CRTDBG_MODE_FILE);
   _CrtSetReportFile(_CRT_ERROR, _CRTDBG_FILE_STDOUT);
   _CrtSetReportMode(_CRT_ASSERT, _CRTDBG_MODE_FILE);
   _CrtSetReportFile(_CRT_ASSERT, _CRTDBG_FILE_STDOUT);

   // Allocate and assign the pointer variables.
   p1 = (char *)malloc(10);
   strcpy_s(p1, 10, "I am p1");
   p2 = (char *)malloc(10);
   strcpy_s(p2, 10, "I am p2");

   // Use the report macros as a debugging
   // warning mechanism, similar to printf.
   // Use the assert macros to check if the
   // p1 and p2 variables are equivalent.
   // If the expression fails, _ASSERTE will
   // include a string representation of the
   // failed expression in the report.
   // _ASSERT does not include the
   // expression in the generated report.
   _RPT0(_CRT_WARN,
       "Use the assert macros to evaluate the expression p1 == p2.\n");
   _RPTF2(_CRT_WARN, "\n Will _ASSERT find '%s' == '%s' ?\n", p1, p2);
   _ASSERT(p1 == p2);

   _RPTF2(_CRT_WARN, "\n\n Will _ASSERTE find '%s' == '%s' ?\n",
          p1, p2);
   _ASSERTE(p1 == p2);

   _RPT2(_CRT_ERROR, "'%s' != '%s'\n", p1, p2);

   free(p2);
   free(p1);

   return 0;
}
```

```
Use the assert macros to evaluate the expression p1 == p2.
crt_ASSERT_macro.c(54) :
Will _ASSERT find 'I am p1' == 'I am p2' ?
crt_ASSERT_macro.c(55) : Assertion failed!
crt_ASSERT_macro.c(58) :

Will _ASSERTE find 'I am p1' == 'I am p2' ?
crt_ASSERT_macro.c(59) : Assertion failed: p1 == p2
'I am p1' != 'I am p2'
```

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)  
[`assert` Macro, `_assert`, `_wassert`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-macro-assert-wassert?view=msvc-170)  
[`_RPT`, `_RPTF`, `_RPTW`, `_RPTFW` Macros](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rpt-rptf-rptw-rptfw-macros?view=msvc-170)