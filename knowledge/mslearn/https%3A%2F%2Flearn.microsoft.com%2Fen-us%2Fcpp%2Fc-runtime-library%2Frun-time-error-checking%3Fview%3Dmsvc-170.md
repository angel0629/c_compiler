---
title: "Runtime error checking"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-error-checking?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The C runtime library contains the functions that support runtime error checks (RTC). Runtime error checking allows you to build your program such that certain kinds of runtime errors are reported. You specify how the errors are reported and which kinds of errors are reported. For more information, see [How to: Use native runtime checks](https://learn.microsoft.com/en-us/visualstudio/debugger/how-to-use-native-run-time-checks).

Use the following functions to customize the way your program does runtime error checking.

## Runtime error checking functions

Function

Use

[`_RTC_GetErrDesc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-geterrdesc?view=msvc-170)

Returns a brief description of a runtime error check type.

[`_RTC_NumErrors`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-numerrors?view=msvc-170)

Returns the total number of errors that can be detected by runtime error checks.

[`_RTC_SetErrorFunc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-seterrorfunc?view=msvc-170)

Designates a function as the handler for reporting runtime error checks.

[`_RTC_SetErrorType`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-seterrortype?view=msvc-170)

Associates an error that is detected by runtime error checks with a type.

## See also

[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)  
[/RTC (Runtime error checks)](https://learn.microsoft.com/en-us/cpp/build/reference/rtc-run-time-error-checks?view=msvc-170)  
[`runtime_checks`](https://learn.microsoft.com/en-us/cpp/preprocessor/runtime-checks?view=msvc-170)  
[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)