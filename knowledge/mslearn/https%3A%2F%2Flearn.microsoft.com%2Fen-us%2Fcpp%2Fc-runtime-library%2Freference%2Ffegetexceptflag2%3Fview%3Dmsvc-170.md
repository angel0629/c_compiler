---
title: "fegetexceptflag"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetexceptflag2?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Stores the current state of the specified floating-point exception flags.

## Syntax

```
int fegetexceptflag(
   fexcept_t* pstatus,
   int excepts
);
```

### Parameters

_`pstatus`_  
A pointer to a `fexcept_t` object to contain the current values of the exception flags specified by _`excepts`_.

_`excepts`_  
The floating-point exception flags to store in _`pstatus`_.

## Return value

On success, returns 0. Otherwise, it returns a non-zero value.

The **`fegetexceptflag`** function stores the current state of the floating-point exception status flags specified by _`excepts`_ in the `fexcept_t` object pointed to by _`pstatus`_. _`pstatus`_ must point to a valid `fexcept_t` object, or subsequent behavior is undefined. The **`fegetexceptflag`** function supports these exception macros, defined in <fenv.h>:

Exception macro

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

**`fegetexceptflag`**

<fenv.h>

<cfenv>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`fesetexceptflag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fesetexceptflag2?view=msvc-170)