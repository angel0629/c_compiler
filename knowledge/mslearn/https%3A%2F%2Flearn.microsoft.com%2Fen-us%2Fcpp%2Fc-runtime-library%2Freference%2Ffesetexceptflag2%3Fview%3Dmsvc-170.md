---
title: "fesetexceptflag"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fesetexceptflag2?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sets the specified floating-point status flags in the current floating-point environment.

## Syntax

```
int fesetexceptflag(
     const fexcept_t *pstatus,
     int excepts
);
```

### Parameters

_`pstatus`_  
Pointer to an `fexcept_t` object containing the values to set the exception status flags to. The object may be set by a previous call to [`fegetexceptflag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetexceptflag2?view=msvc-170).

_`excepts`_  
The floating-point exception status flags to set.

## Return value

If all the specified exception status flags are set successfully, returns 0. Otherwise, it returns a nonzero value.

The **`fesetexceptflag`** function sets the state of the floating-point exception status flags specified by _`excepts`_ to the corresponding values set in the `fexcept_t` object pointed to by _`pstatus`_. It doesn't raise the exceptions. The _`pstatus`_ pointer must point to a valid `fexcept_t` object, or subsequent behavior is undefined. The **`fesetexceptflag`** function supports these exception macro values in _`excepts`_, defined in <fenv.h>:

Exception Macro

Description

`FE_DIVBYZERO`

A singularity or pole error occurred in an earlier floating-point operation; an infinity value was created.

`FE_INEXACT`

The function was forced to round the stored result of an earlier floating-point operation.

`FE_INVALID`

A domain error occurred in an earlier floating-point operation.

`FE_OVERFLOW`

A range error occurred; an earlier floating-point operation result was too large to be represented.

`FE_UNDERFLOW`

An earlier floating-point operation result was too small to be represented at full precision; a denormal value was created.

`FE_ALL_EXCEPT`

The bitwise OR of all supported floating-point exceptions.

The _`excepts`_ argument may be zero, one of the supported floating-point exception macros, or the bitwise OR of two or more of the macros. The effect of any other argument value is undefined.

To use this function, you must turn off floating-point optimizations that could prevent access by using the `#pragma fenv_access(on)` directive prior to the call. For more information, see [`fenv_access`](https://learn.microsoft.com/en-us/cpp/preprocessor/fenv-access?view=msvc-170).

## Requirements

Function

C header

C++ header

**`fesetexceptflag`**

<fenv.h>

<cfenv>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`fegetexceptflag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetexceptflag2?view=msvc-170)