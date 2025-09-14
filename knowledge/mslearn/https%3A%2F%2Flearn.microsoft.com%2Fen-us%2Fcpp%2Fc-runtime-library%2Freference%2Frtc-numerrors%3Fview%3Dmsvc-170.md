---
title: "_RTC_NumErrors"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-numerrors?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns the total number of errors that can be detected by run-time error checks (RTC). You can use this number as the control in a **`for`** loop, where each value in the loop is passed to [`_RTC_GetErrDesc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-geterrdesc?view=msvc-170).

## Syntax

```
int _RTC_NumErrors( void );
```

## Return value

An integer whose value represents the total number of errors that can be detected by the Visual C++ run-time error checks.

## Requirements

Routine

Required header

**`_RTC_NumErrors`**

<rtcapi.h>

For more information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[`_RTC_GetErrDesc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-geterrdesc?view=msvc-170)  
[Runtime error checking](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-error-checking?view=msvc-170)