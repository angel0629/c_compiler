---
title: "feraiseexcept"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feraiseexcept?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Raises the specified floating-point exceptions.

## Syntax

```
int feraiseexcept(
   int excepts
);
```

### Parameters

_`excepts`_  
The floating-point exceptions to raise.

## Return value

If all specified exceptions are raised successfully, returns 0.

The **`feraiseexcept`** function attempts to raise the floating-point exceptions specified by _`excepts`_. The **`feraiseexcept`** function supports these exception macros, defined in <fenv.h>:

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

The _`excepts`_ argument may be zero, one of the exception macro values, or the bitwise OR of two or more of the supported exception macros. If one of the specified exception macros is `FE_OVERFLOW` or `FE_UNDERFLOW`, the `FE_INEXACT` exception may be raised as a side-effect.

To use this function, you must turn off floating-point optimizations that could prevent access by using the `#pragma fenv_access(on)` directive prior to the call. For more information, see [`fenv_access`](https://learn.microsoft.com/en-us/cpp/preprocessor/fenv-access?view=msvc-170).

**Microsoft-specific:** The exceptions specified in _`excepts`_ are raised in the order `FE_INVALID`, `FE_DIVBYZERO`, `FE_OVERFLOW`, `FE_UNDERFLOW`, `FE_INEXACT`. However, `FE_INEXACT` can be raised when `FE_OVERFLOW` or `FE_UNDERFLOW` is raised, even if not specified in _`excepts`_.

## Requirements

Function

C header

C++ header

`feraiseexcept`

<fenv.h>

<cfenv>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`fesetexceptflag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fesetexceptflag2?view=msvc-170)  
[`feholdexcept`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feholdexcept2?view=msvc-170)  
[`fetestexcept`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fetestexcept1?view=msvc-170)  
[`feupdateenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feupdateenv?view=msvc-170)