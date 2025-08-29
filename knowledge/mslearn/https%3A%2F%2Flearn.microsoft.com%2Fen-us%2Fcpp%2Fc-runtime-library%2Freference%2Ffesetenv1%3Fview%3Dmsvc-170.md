---
title: "fesetenv"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fesetenv1?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sets the current floating-point environment.

## Syntax

```
int fesetenv(
   const fenv_t *penv
);
```

### Parameters

_`penv`_  
Pointer to a `fenv_t` object that contains a floating-point environment as set by a call to [`fegetenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetenv1?view=msvc-170) or [`feholdexcept`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feholdexcept2?view=msvc-170). You can also specify the default startup floating-point environment by using the `FE_DFL_ENV` macro.

## Return value

Returns 0 if the environment was successfully set. Otherwise, it returns a nonzero value.

## Remarks

The **`fesetenv`** function sets the current floating-point environment from the value stored in the `fenv_t` object pointed to by _`penv`_. The floating point environment is the set of status flags and control modes that affect floating-point calculations. The environment includes the rounding mode and the status flags for floating-point exceptions. If _`penv`_ isn't `FE_DFL_ENV` or doesn't point to a valid `fenv_t` object, subsequent behavior is undefined.

A call to this function sets the exception status flags that are in the _`penv`_ object, but it doesn't raise those exceptions.

To use this function, you must turn off floating-point optimizations that could prevent access by using the `#pragma fenv_access(on)` directive prior to the call. For more information, see [`fenv_access`](https://learn.microsoft.com/en-us/cpp/preprocessor/fenv-access?view=msvc-170).

## Requirements

Function

C header

C++ header

**`fesetenv`**

<fenv.h>

<cfenv>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`fegetenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetenv1?view=msvc-170)  
[`feclearexcept`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feclearexcept1?view=msvc-170)  
[`feholdexcept`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feholdexcept2?view=msvc-170)  
[`fesetexceptflag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fesetexceptflag2?view=msvc-170)