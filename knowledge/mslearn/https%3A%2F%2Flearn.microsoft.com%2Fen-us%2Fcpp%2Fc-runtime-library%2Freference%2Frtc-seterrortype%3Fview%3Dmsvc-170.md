---
title: "_RTC_SetErrorType"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-seterrortype?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Associates an error that is detected by run-time error checks (RTCs) with a type. Your error handler processes how to output errors of the specified type.

## Syntax

```
int _RTC_SetErrorType(
   _RTC_ErrorNumber errnum,
   int ErrType
);
```

### Parameters

_`errnum`_  
A number between zero and one less than the value returned by [`_RTC_NumErrors`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-numerrors?view=msvc-170).

_`ErrType`_  
A value to assign to this _`errnum`_. For example, you might use `_CRT_ERROR`. If you're using `_CrtDbgReport` as your error handler, _`ErrType`_ can only be one of the symbols defined in [`_CrtSetReportMode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetreportmode?view=msvc-170). If you have your own error handler ([`_RTC_SetErrorFunc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-seterrorfunc?view=msvc-170)), you can have as many _`ErrType`_ values as there are _`errnum`_ values.

An _`ErrType`_ of `_RTC_ERRTYPE_IGNORE` has special meaning to `_CrtSetReportMode`; the error is ignored.

## Return value

The previous value for the error type replaced by _`ErrType`_.

By default, all errors are set to _`ErrType`_ = 1, which corresponds to `_CRT_ERROR`. For more information about the default error types such as `_CRT_ERROR`, see [`_CrtDbgReport`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtdbgreport-crtdbgreportw?view=msvc-170).

Before you can call this function, you must first call one of the run-time error check initialization functions; see [Using runtime checks without the C runtime library](https://learn.microsoft.com/en-us/visualstudio/debugger/using-run-time-checks-without-the-c-run-time-library)

## Requirements

Routine

Required header

**`_RTC_SetErrorType`**

<rtcapi.h>

For more information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[`_RTC_GetErrDesc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-geterrdesc?view=msvc-170)  
[Runtime error checking](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-error-checking?view=msvc-170)