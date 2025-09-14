---
title: "_RTC_SetErrorFunc"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-seterrorfunc?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Designates a function as the handler for reporting run-time error checks (RTCs). This function is deprecated; use `_RTC_SetErrorFuncW` instead.

## Syntax

```
_RTC_error_fn _RTC_SetErrorFunc(
   _RTC_error_fn function
);
```

### Parameters

_`function`_  
The address of the function that will handle run-time error checks.

## Return value

The previously defined error function. If there's no previously defined function, returns `NULL`.

## Remarks

Don't use this function; instead, use `_RTC_SetErrorFuncW`. It's retained only for backward compatibility.

## Requirements

Routine

Required header

**`_RTC_SetErrorFunc`**

<rtcapi.h>

For more information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[`_CrtDbgReport`, `_CrtDbgReportW`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtdbgreport-crtdbgreportw?view=msvc-170)  
[Runtime error checking](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-error-checking?view=msvc-170)