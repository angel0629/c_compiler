---
title: "_daylight, _dstbias, _timezone, and _tzname"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/daylight-dstbias-timezone-and-tzname?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
**`_daylight`**, **`_dstbias`**, **`_timezone`**, and **`_tzname`** are used in some time and date routines to make local-time adjustments. These global variables have been deprecated for the more secure functional versions, which should be used in place of the global variables.

Global variable

Functional equivalent

**`_daylight`**

[`_get_daylight`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-daylight?view=msvc-170)

**`_dstbias`**

[`_get_dstbias`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-dstbias?view=msvc-170)

**`_timezone`**

[`_get_timezone`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-timezone?view=msvc-170)

**`_tzname`**

[`_get_tzname`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-tzname?view=msvc-170)

They're declared in Time.h as follows.

## Syntax

```
extern int _daylight;
extern int _dstbias;
extern long _timezone;
extern char *_tzname[2];
```

## Remarks

On a call to `_ftime`, `localtime`, or `_tzset`, the values of **`_daylight`**, **`_dstbias`**, **`_timezone`**, and **`_tzname`** are determined from the value of the `TZ` environment variable. If you don't explicitly set the value of `TZ`, `_tzname[0]` and `_tzname[1]` contain the default settings of "PST" and "PDT" respectively. The time-manipulation functions ([`_tzset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tzset?view=msvc-170), [`_ftime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170), and [`localtime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-localtime32-localtime64?view=msvc-170)) attempt to set the values of **`_daylight`**, **`_dstbias`** and **`_timezone`** by querying the operating system for the default value of each variable. The time-zone global variable values are shown in the following table.

Variable

Value

**`_daylight`**

Nonzero if daylight saving time (DST) zone is specified in `TZ` or determined from the operating system; otherwise, 0. The default value is 1.

**`_dstbias`**

Offset for daylight saving time.

**`_timezone`**

Difference in seconds between coordinated universal time and local time. The default value is 28,800.

`_tzname[0]`

Time-zone name derived from the `TZ` environment variable. The default value is "PST".

`_tzname[1]`

DST zone name derived from the `TZ` environment variable. The default value is "PDT" (Pacific daylight time).

## See also

[Global variables](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-variables?view=msvc-170)  
[`_get_daylight`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-daylight?view=msvc-170)  
[`_get_dstbias`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-dstbias?view=msvc-170)  
[`_get_timezone`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-timezone?view=msvc-170)  
[`_get_tzname`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-tzname?view=msvc-170)