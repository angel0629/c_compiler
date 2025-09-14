---
title: "_chgsign, _chgsignf, _chgsignl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chgsign-chgsignf-chgsignl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reverses the sign of a floating-point argument.

## Syntax

```
double _chgsign(
   double x
);
float _chgsignf(
   float x
);
long double _chgsignl(
   long double x
);
```

### Parameters

_`x`_  
The floating-point value to be changed.

## Return value

The **`_chgsign`** functions return a value that's equal to the floating-point argument _`x`_, but with its sign reversed. There's no error return.

## Requirements

Routine

Required header

**`_chgsign`**

<float.h>

**`_chgsignf`**, **`_chgsignl`**

<math.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`fabs`, `fabsf`, `fabsl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fabs-fabsf-fabsl?view=msvc-170)  
[`copysign`, `copysignf`, `copysignl`, `_copysign`, `_copysignf`, `_copysignl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/copysign-copysignf-copysignl-copysign-copysignf-copysignl?view=msvc-170)