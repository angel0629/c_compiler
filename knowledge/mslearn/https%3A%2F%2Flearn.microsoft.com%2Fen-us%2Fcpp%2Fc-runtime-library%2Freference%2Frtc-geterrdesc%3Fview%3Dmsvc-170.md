---
title: "_RTC_GetErrDesc"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-geterrdesc?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns a brief description of a run-time error check (RTC) type.

## Syntax

```
const char * _RTC_GetErrDesc(
   _RTC_ErrorNumber errnum
);
```

### Parameters

_`errnum`_  
A number between zero and one less than the value returned by `_RTC_NumErrors`.

## Return value

A character string that contains a short description of one of the error types detected by the run-time error check system. If error is less than zero or greater than or equal to the value returned by [`_RTC_NumErrors`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-numerrors?view=msvc-170), **`_RTC_GetErrDesc`** returns `NULL`.

## Requirements

Routine

Required header

**`_RTC_GetErrDesc`**

<rtcapi.h>

For more information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[`_RTC_NumErrors`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-numerrors?view=msvc-170)  
[Runtime error checking](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-error-checking?view=msvc-170)