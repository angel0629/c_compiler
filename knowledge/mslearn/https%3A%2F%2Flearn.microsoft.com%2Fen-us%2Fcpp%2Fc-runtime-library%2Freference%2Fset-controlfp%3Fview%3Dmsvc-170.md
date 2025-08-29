---
title: "_set_controlfp"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-controlfp?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sets the floating-point control word.

## Syntax

```
void __cdecl _set_controlfp(
    unsigned int newControl,
    unsigned int mask
);
```

### Parameters

_`newControl`_  
New control-word bit values.

_`mask`_  
Mask for new control-word bits to set.

## Return value

None.

## Remarks

The **`_set_controlfp`** function is similar to `_control87`, but it only sets the floating-point control word to _`newControl`_. The bits in the values indicate the floating-point control state. The floating-point control state allows the program to change the precision, rounding, and infinity modes in the floating-point math package. You can also mask or unmask floating-point exceptions using **`_set_controlfp`**. For more information, see [`_control87`, `_controlfp`, `__control87_2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/control87-controlfp-control87-2?view=msvc-170).

This function is deprecated when compiling with [/clr (Common Language Runtime Compilation)](https://learn.microsoft.com/en-us/cpp/build/reference/clr-common-language-runtime-compilation?view=msvc-170) because the common language runtime only supports the default floating-point precision.

## Requirements

Routine

Required header

Compatibility

**`_set_controlfp`**

<float.h>

x86 processor only

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`_clear87`, `_clearfp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clear87-clearfp?view=msvc-170)  
[`_status87`, `_statusfp`, `_statusfp2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/status87-statusfp-statusfp2?view=msvc-170)