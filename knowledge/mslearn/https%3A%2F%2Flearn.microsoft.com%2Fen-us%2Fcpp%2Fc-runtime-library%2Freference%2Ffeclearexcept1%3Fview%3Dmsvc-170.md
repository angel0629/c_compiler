---
title: "feclearexcept1"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feclearexcept1?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
**`feclearexcept`** attempts to clear the floating-point exception flags specified by the argument.

## Syntax

```
int feclearexcept(
   int excepts
);
```

### Parameters

_`excepts`_  
The exception status flags to clear.

## Return value

Returns zero if _`excepts`_ is zero, or if all the specified exceptions were successfully cleared. Otherwise, it returns a nonzero value.

## Remarks

The **`feclearexcept`** function attempts to clear the floating point exception status flags specified by _`excepts`_. The function supports these exception macros, defined in fenv.h:

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

The _`excepts`_ argument may be zero, or the bitwise OR of one or more of the supported exception macros. The result of any other argument value is undefined.

## Requirements

Function

C header

C++ header

**`feclearexcept`**

<fenv.h>

<cfenv>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`fetestexcept`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fetestexcept1?view=msvc-170)