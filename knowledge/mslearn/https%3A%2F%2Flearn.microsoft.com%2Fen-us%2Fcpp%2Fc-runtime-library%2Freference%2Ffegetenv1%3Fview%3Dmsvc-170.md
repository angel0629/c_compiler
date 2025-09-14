---
title: "fegetenv"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetenv1?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Stores the current floating-point environment in the specified object.

## Syntax

```
int fegetenv(
   fenv_t *penv
);
```

### Parameters

_`penv`_  
Pointer to an `fenv_t` object to contain the current floating-point environment values.

## Return value

Returns 0 if the floating-point environment was successfully stored in _`penv`_. Otherwise, it returns a non-zero value.

## Remarks

The **`fegetenv`** function stores the current floating-point environment in the object pointed to by _`penv`_. The floating point environment is the set of status flags and control modes that affect floating-point calculations. This environment includes the rounding direction mode and the status flags for floating-point exceptions. If _`penv`_ doesn't point to a valid `fenv_t` object, subsequent behavior is undefined.

To use this function, you must turn off floating-point optimizations that could prevent access by using the `#pragma fenv_access(on)` directive prior to the call. For more information, see [`fenv_access`](https://learn.microsoft.com/en-us/cpp/preprocessor/fenv-access?view=msvc-170).

## Requirements

Function

C header

C++ header

**`fegetenv`**

<fenv.h>

<cfenv>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`fesetenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fesetenv1?view=msvc-170)