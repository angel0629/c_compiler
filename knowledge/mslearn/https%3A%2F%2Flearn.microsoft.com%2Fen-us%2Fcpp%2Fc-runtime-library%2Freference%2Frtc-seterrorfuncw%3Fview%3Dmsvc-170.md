---
title: "_RTC_SetErrorFuncW"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-seterrorfuncw?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Designates a function as the handler for the reporting of run-time error checks (RTCs).

## Syntax

```
_RTC_error_fnW _RTC_SetErrorFuncW(
   _RTC_error_fnW function
);
```

### Parameters

_`function`_  
The address of the function that will handle run-time error checks.

## Return value

The previously defined error function; or `NULL` if there's no previously defined function.

In new code, use only **`_RTC_SetErrorFuncW`**. `_RTC_SetErrorFunc` is only included in the library for backward compatibility.

The **`_RTC_SetErrorFuncW`** callback applies only to the component that it was linked in, but not globally.

Make sure that the address that you pass to **`_RTC_SetErrorFuncW`** is that of a valid error handling function.

If an error has been assigned a type of -1 by using [`_RTC_SetErrorType`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-seterrortype?view=msvc-170), the error handling function isn't called.

Before you can call this function, you must first call one of the run-time error-check initialization functions. For more information, see [Using runtime checks without the C runtime library](https://learn.microsoft.com/en-us/visualstudio/debugger/using-run-time-checks-without-the-c-run-time-library).

`_RTC_error_fnW` is defined as follows:

```
typedef int (__cdecl * _RTC_error_fnW)(
    int errorType,
    const wchar_t * filename,
    int linenumber,
    const wchar_t * moduleName,
    const wchar_t * format,
    ... );
```

where:

_`errorType`_  
The type of error that's specified by [`_RTC_SetErrorType`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-seterrortype?view=msvc-170).

_`filename`_  
The source file where the failure occurred, or null if no debug information is available.

_`linenumber`_  
The line in _`filename`_ where the failure occurred, or 0 if no debug information is available.

_`moduleName`_  
The DLL or executable name where the failure occurred.

_`format`_  
printf style string to display an error message, using the remaining parameters. The first argument of the `VA_ARGLIST` is the RTC Error number that occurred.

For an example that shows how to use `_RTC_error_fnW`, see [Native runtime checks customization](https://learn.microsoft.com/en-us/visualstudio/debugger/native-run-time-checks-customization).

## Requirements

Routine

Required header

**`_RTC_SetErrorFuncW`**

<rtcapi.h>

For more information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[`_CrtDbgReport`, `_CrtDbgReportW`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtdbgreport-crtdbgreportw?view=msvc-170)  
[Runtime error checking](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-error-checking?view=msvc-170)