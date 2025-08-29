---
title: "_set_SSE2_enable"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-sse2-enable?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Enables or disables the use of Streaming SIMD Extensions 2 (SSE2) instructions in CRT math routines. (This function isn't available on x64 architectures because SSE2 is enabled by default.)

## Syntax

```
int _set_SSE2_enable(
   int flag
);
```

### Parameters

_`flag`_  
1 to enable the SSE2 implementation; 0 to disable the SSE2 implementation. By default, SSE2 implementation is enabled on processors that support it.

## Return value

Nonzero if SSE2 implementation is enabled; zero if SSE2 implementation is disabled.

The following functions have SSE2 implementations that can be enabled by using **`_set_SSE2_enable`**:

*   [`atan`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atan-atanf-atanl-atan2-atan2f-atan2l?view=msvc-170)
    
*   [`ceil`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ceil-ceilf-ceill?view=msvc-170)
    
*   [`exp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exp-expf?view=msvc-170)
    
*   [`floor`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/floor-floorf-floorl?view=msvc-170)
    
*   [`log`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log-logf-log10-log10f?view=msvc-170)
    
*   [`log10`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/log-logf-log10-log10f?view=msvc-170)
    
*   [`modf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/modf-modff-modfl?view=msvc-170)
    
*   [`pow`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/pow-powf-powl?view=msvc-170)
    

The SSE2 implementations of these functions might give slightly different answers than the default implementations. SSE2 intermediate values are 64-bit floating-point quantities, but the default implementation intermediate values are 80-bit floating-point quantities.

Note

If you use the [/Oi (Generate Intrinsic Functions)](https://learn.microsoft.com/en-us/cpp/build/reference/oi-generate-intrinsic-functions?view=msvc-170) compiler option to compile the project, it may appear that **`_set_SSE2_enable`** has no effect. The **/Oi** compiler option gives the compiler the authority to use intrinsics to replace CRT calls; this behavior overrides the effect of **`_set_SSE2_enable`**. If you want to guarantee that **/Oi** does not override **`_set_SSE2_enable`**, use **/Oi-** to compile your project. This might also be good practice when you use other compiler switches that imply **/Oi**.

The SSE2 implementation is only used if all exceptions are masked. Use [`_control87`, `_controlfp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/control87-controlfp-control87-2?view=msvc-170) to mask exceptions.

## Requirements

Routine

Required header

**`_set_SSE2_enable`**

<math.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_set_SSE2_enable.c
// processor: x86
#include <math.h>
#include <stdio.h>

int main()
{
   int i = _set_SSE2_enable(1);

   if (i)
      printf("SSE2 enabled.\n");
   else
      printf("SSE2 not enabled; processor does not support SSE2.\n");
}
```

```
SSE2 enabled.
```

## See also

[C runtime (CRT) and C++ Standard Library (STL) `.lib` files](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170)