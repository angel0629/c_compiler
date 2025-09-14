---
title: "_get_terminate"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-terminate?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns the termination routine to be called by `terminate`.

## Syntax

```
terminate_function _get_terminate( void );
```

## Return value

Returns a pointer to the function registered by [`set_terminate`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-terminate-crt?view=msvc-170). If no function has been set, the return value may be used to restore the default behavior; this value may be `NULL`.

## Remarks

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_get_terminate`**

<eh.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Exception handling routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/exception-handling-routines?view=msvc-170)  
[`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170)  
[`set_unexpected`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-unexpected-crt?view=msvc-170)  
[`terminate`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/terminate-crt?view=msvc-170)  
[`unexpected`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/unexpected-crt?view=msvc-170)