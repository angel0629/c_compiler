---
title: "feupdateenv"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feupdateenv?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Saves the currently raised floating-point exceptions, restores the specified floating-point environment state, and then raises the saved floating-point exceptions.

## Syntax

```
int feupdateenv(
   const fenv_t* penv
);
```

### Parameters

_`penv`_  
Pointer to a `fenv_t` object that contains a floating-point environment as set by a call to [`fegetenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetenv1?view=msvc-170) or [`feholdexcept`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feholdexcept2?view=msvc-170). You can also specify the default startup floating-point environment by using the `FE_DFL_ENV` macro.

## Return value

Returns 0 if all actions completed successfully. Otherwise, it returns a nonzero value.

The **`feupdateenv`** function performs multiple actions. First, it stores the current raised floating-point exception status flags in automatic storage. Then, it sets the current floating-point environment from the value stored in the `fenv_t` object pointed to by _`penv`_. If _`penv`_ isn't `FE_DFL_ENV` or doesn't point to a valid `fenv_t` object, subsequent behavior is undefined. Finally, **`feupdateenv`** raises the locally stored floating-point exceptions.

To use this function, you must turn off floating-point optimizations that could prevent access by using the `#pragma fenv_access(on)` directive prior to the call. For more information, see [`fenv_access`](https://learn.microsoft.com/en-us/cpp/preprocessor/fenv-access?view=msvc-170).

## Requirements

Function

C header

C++ header

**`feupdateenv`**

<fenv.h>

<cfenv>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[`fegetenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetenv1?view=msvc-170)  
[`feclearexcept`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feclearexcept1?view=msvc-170)  
[`feholdexcept`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feholdexcept2?view=msvc-170)  
[`fesetexceptflag`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fesetexceptflag2?view=msvc-170)