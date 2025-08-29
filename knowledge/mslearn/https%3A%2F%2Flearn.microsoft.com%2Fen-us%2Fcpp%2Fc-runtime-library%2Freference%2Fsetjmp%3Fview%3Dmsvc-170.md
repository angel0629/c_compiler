---
title: "setjmp"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setjmp?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Saves the current state of the program.

## Syntax

```
int setjmp(
   jmp_buf env
);
```

### Parameters

_`env`_  
Variable in which environment is stored.

## Return value

Returns 0 after saving the stack environment. If **`setjmp`** returns because of a `longjmp` call, it returns the _`value`_ argument of `longjmp`, or if the _`value`_ argument of `longjmp` is 0, **`setjmp`** returns 1. There's no error return.

The **`setjmp`** function saves a stack environment, which you can subsequently restore, using `longjmp`. When used together, **`setjmp`** and `longjmp` provide a way to execute a non-local **`goto`**. They're typically used to pass execution control to error-handling or recovery code in a previously called routine without using the normal calling or return conventions.

A call to **`setjmp`** saves the current stack environment in _`env`_. A subsequent call to `longjmp` restores the saved environment and returns control to the point just after the corresponding **`setjmp`** call. All variables (except register variables) accessible to the routine receiving control contain the values they had when `longjmp` was called.

It isn't possible to use **`setjmp`** to jump from native to managed code.

**Microsoft Specific**

In Microsoft C++ code on Windows, **`longjmp`** uses the same stack-unwinding semantics as exception-handling code. It is safe to use in the same places that C++ exceptions can be raised. However, this usage isn't portable, and comes with some important caveats. For details, see [`longjmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/longjmp?view=msvc-170).

**END Microsoft Specific**

Note

In portable C++ code, you can't assume `setjmp` and `longjmp` support C++ object semantics. Specifically, a `setjmp`/`longjmp` call pair has undefined behavior if replacing the `setjmp` and `longjmp` by **`catch`** and **`throw`** would invoke any non-trivial destructors for any automatic objects. In C++ programs, we recommend you use the C++ exception-handling mechanism.

For more information, see [Using `setjmp` and `longjmp`](https://learn.microsoft.com/en-us/cpp/cpp/using-setjmp-longjmp?view=msvc-170).

## Requirements

Routine

Required header

**`setjmp`**

<setjmp.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`_fpreset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpreset?view=msvc-170).

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`longjmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/longjmp?view=msvc-170)