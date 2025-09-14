---
title: "_CrtGetAllocHook"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtgetallochook?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Retrieves the current client-defined allocation function for hooking into the C run-time debug memory allocation process (debug version only).

## Syntax

```
_CRT_ALLOC_HOOK _CrtGetAllocHook( void );
```

## Return value

Returns the currently defined allocation hook function.

## Remarks

**`_CrtGetAllocHook`** retrieves the current client-defined application hook function for the C run-time debug library memory allocation process.

For more information about using other hook-capable run-time functions and writing your own client-defined hook functions, see [Debug hook function writing](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debugging-techniques?view=msvc-170#debug-hook-function-writing).

## Requirements

Routine

Required header

**`_CrtGetAllocHook`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)  
[`_CrtSetAllocHook`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetallochook?view=msvc-170)