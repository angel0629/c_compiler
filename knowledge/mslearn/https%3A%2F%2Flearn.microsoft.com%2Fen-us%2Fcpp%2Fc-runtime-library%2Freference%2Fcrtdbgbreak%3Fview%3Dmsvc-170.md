---
title: "_CrtDbgBreak"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtdbgbreak?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sets a break point on a particular line of code. (Used in debug mode only.)

## Syntax

```
void _CrtDbgBreak( void );
```

## Return value

There's no return value.

## Remarks

The **`_CrtDbgBreak`** function sets a debug breakpoint on the particular line of code where the function resides. This function is used in debug mode only and is dependent on `_DEBUG` being previously defined.

For more information about using other hook-capable run-time functions and writing your own client-defined hook functions, see [Writing your own debug hook functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debugging-techniques?view=msvc-170#debug-hook-function-writing).

## Requirements

Routine

Required header

**`_CrtDbgBreak`**

<CRTDBG.h>

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)  
[`__debugbreak`](https://learn.microsoft.com/en-us/cpp/intrinsics/debugbreak?view=msvc-170)