---
title: "feholdexcept"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feholdexcept2?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Saves the current floating-point environment in the specified object, clears the floating-point status flags, and, if possible, puts the floating-point environment into non-stop mode.

## Syntax

```
int feholdexcept(
   fenv_t *penv
);
```

### Parameters

_`penv`_  
Pointer to an `fenv_t` object to contain a copy of the floating-point environment.

## Return value

Returns zero if and only if the function is able to successfully turn on non-stop floating-point exception handling.

The **`feholdexcept`** function is used to store the state of the current floating point environment in the `fenv_t` object pointed to by _`penv`_, and to set the environment to not interrupt execution on floating-point exceptions. This mode is known as _non-stop mode_. This mode continues until the environment is restored using [`fesetenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fesetenv1?view=msvc-170) or [`feupdateenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feupdateenv?view=msvc-170).

You can use this function at the beginning of a subroutine that needs to hide one or more floating-point exceptions from the caller. To report an exception, you can clear the unwanted exceptions by using [`feclearexcept`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feclearexcept1?view=msvc-170), and then end the non-stop mode with a call to `feupdateenv`.

To use this function, you must turn off floating-point optimizations that could prevent access by using the `#pragma fenv_access(on)` directive prior to the call. For more information, see [`fenv_access`](https://learn.microsoft.com/en-us/cpp/preprocessor/fenv-access?view=msvc-170).

## Requirements

Function

C header

C++ header

**`feholdexcept`**

<fenv.h>

<cfenv>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`feclearexcept`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feclearexcept1?view=msvc-170)  
[`fesetenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fesetenv1?view=msvc-170)  
[`feupdateenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feupdateenv?view=msvc-170)