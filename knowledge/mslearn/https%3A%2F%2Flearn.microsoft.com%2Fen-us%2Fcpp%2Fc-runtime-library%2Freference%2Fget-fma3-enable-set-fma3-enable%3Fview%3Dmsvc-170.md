---
title: "_get_FMA3_enable, _set_FMA3_enable"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-fma3-enable-set-fma3-enable?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets or sets a flag that specifies whether the transcendental math floating-point library functions use FMA3 instructions in code compiled for X64 platforms.

## Syntax

```
int _set_FMA3_enable(int flag);
int _get_FMA3_enable();
```

### Parameters

_`flag`_  
Set to 1 to enable the FMA3 implementations of the transcendental math floating-point library functions on X64 platforms, or to 0 to use the implementations that don't use FMA3 instructions.

## Return value

A non-zero value if the FMA3 implementations of the transcendental math floating-point library functions are enabled. Otherwise, zero.

Use the **`_set_FMA3_enable`** function to enable or disable the use of FMA3 instructions in the transcendental math floating-point functions in the CRT library. The return value reflects the implementation in use after the change. If the CPU doesn't support FMA3 instructions, this function can't enable them in the library, and the return value is zero. Use **`_get_FMA3_enable`** to get the current state of the library. By default, on X64 platforms, the CRT startup code detects whether the CPU supports FMA3 instructions, and enables or disables the FMA3 implementations in the library.

The FMA3 implementations use different algorithms. Slight differences in the result of computations may be observable when the FMA3 implementations are enabled or disabled. Differences may also be observable between computers that do or don't support FMA3. For more information, see [Floating-point migration issues](https://learn.microsoft.com/en-us/cpp/porting/floating-point-migration-issues?view=msvc-170).

## Requirements

The **`_set_FMA3_enable`** and **`_get_FMA3_enable`** functions are only available in the X64 versions of the CRT.

Routine

Required header

**`_set_FMA3_enable`**, **`_get_FMA3_enable`**

C: <math.h>  
C++: <cmath> or <math.h>

The **`_set_FMA3_enable`** and **`_get_FMA3_enable`** functions are Microsoft-specific. For compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[Floating-point migration issues](https://learn.microsoft.com/en-us/cpp/porting/floating-point-migration-issues?view=msvc-170)