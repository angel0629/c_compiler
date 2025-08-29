---
title: "__dllonexit"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/dllonexit?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Registers a routine to be called at exit time.

## Syntax

```
_onexit_t __dllonexit(
   _onexit_t func,
   _PVFV **  pbegin,
   _PVFV **  pend
   );
```

#### Parameters

_`func`_  
Pointer to a function to be executed upon exit.

_`pbegin`_  
Pointer to a variable that points to the beginning of a list of functions to execute on detach.

_`pend`_  
Pointer to variable that points to the end of a list of functions to execute on detach.

## Return value

If successful, a pointer to the user's function. Otherwise, a `NULL` pointer.

## Remarks

The `__dllonexit` function is analogous to the [`_onexit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/onexit-onexit-m?view=msvc-170) function except that the global variables used by that function aren't visible to this routine. Instead of global variables, this function uses the `pbegin` and `pend` parameters.

The `_onexit` and `atexit` functions in a DLL linked with MSVCRT.LIB must maintain their own atexit/\_onexit list. This routine is the worker that gets called by such DLLs.

The `_PVFV` type is defined as `typedef void (__cdecl *_PVFV)(void)`.

## Requirements

Routine

Required file

**`__dllonexit`**

`onexit.c`

## See also

[`_onexit`, `_onexit_m`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/onexit-onexit-m?view=msvc-170)