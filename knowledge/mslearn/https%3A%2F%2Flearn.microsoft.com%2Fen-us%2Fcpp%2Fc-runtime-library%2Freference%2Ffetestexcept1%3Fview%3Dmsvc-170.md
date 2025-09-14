---
title: "fetestexcept"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fetestexcept1?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines which of the specified floating-point exception status flags are currently set.

## Syntax

```
int fetestexcept(
   int excepts
);
```

### Parameters

_`excepts`_  
A bitwise OR of the floating-point status flags to test.

## Return value

On success, returns a bitmask containing a bitwise OR of the floating-point exception macros that correspond to the exception status flags currently set. Returns 0 if none of the exceptions are set.

Use the fetestexcept function to determine which exceptions were raised by a floating point operation. Use the _`excepts`_ parameter to specify which exception status flags to test. The **`fetestexcept`** function uses these exception macros defined in <fenv.h> in _`excepts`_ and the return value:

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

The specified _`excepts`_ argument may be 0, one of the supported floating-point exception macros, or the bitwise OR of two or more of the macros. The effect of any other _`excepts`_ argument value is undefined.

To use this function, you must turn off floating-point optimizations that could prevent access by using the `#pragma fenv_access(on)` directive prior to the call. For more information, see [`fenv_access`](https://learn.microsoft.com/en-us/cpp/preprocessor/fenv-access?view=msvc-170).

## Requirements

Function

C header

C++ header

**`fetestexcept`**

<fenv.h>

<cfenv>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`feclearexcept`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feclearexcept1?view=msvc-170)  
[`feraiseexcept`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feraiseexcept?view=msvc-170)