---
title: "longjmp"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/longjmp?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Restores the stack environment and execution locale set by a `setjmp` call.

## Syntax

```
void longjmp(
   jmp_buf env,
   int value
);
```

### Parameters

_`env`_  
Variable in which environment is stored.

_`value`_  
Value to be returned to `setjmp` call.

The **`longjmp`** function restores a stack environment and execution locale previously saved in _`env`_ by `setjmp`. `setjmp` and **`longjmp`** provide a way to execute a nonlocal **`goto`**; they're typically used to pass execution control to error-handling or recovery code in a previously called routine without using the normal call and return conventions.

A call to `setjmp` causes the current stack environment to be saved in _`env`_. A subsequent call to **`longjmp`** restores the saved environment and returns control to the point immediately following the corresponding `setjmp` call. Execution resumes as if _`value`_ had been returned by the `setjmp` call. The values of all variables (except register variables) that are accessible to the routine receiving control contain the values they had when **`longjmp`** was called. The values of register variables are unpredictable. The value returned by `setjmp` must be nonzero. If _`value`_ is passed as 0, the value 1 is substituted in the actual return.

**Microsoft Specific**

In Microsoft C++ code on Windows, **`longjmp`** uses the same stack-unwinding semantics as exception-handling code. It's safe to use in the same places that C++ exceptions can be raised. However, this usage isn't portable, and comes with some important caveats.

Only call **`longjmp`** before the function that called `setjmp` returns; otherwise the results are unpredictable.

Observe the following restrictions when using **`longjmp`**:

*   Don't assume that the values of the register variables will remain the same. The values of register variables in the routine calling `setjmp` may not be restored to the proper values after **`longjmp`** is executed.
    
*   Don't use **`longjmp`** to transfer control out of an interrupt-handling routine unless the interrupt is caused by a floating-point exception. In this case, a program may return from an interrupt handler via **`longjmp`** if it first reinitializes the floating-point math package by calling [`_fpreset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpreset?view=msvc-170).
    
*   Don't use **`longjmp`** to transfer control from a callback routine invoked directly or indirectly by Windows code.
    
*   If the code is compiled by using **/EHs** or **/EHsc**, and the function that contains the **`longjmp`** call is **`noexcept`**, then local objects in that function may not be destructed during the stack unwind.
    

**END Microsoft Specific**

Note

In portable C++ code, you can't assume `setjmp` and `longjmp` support C++ object semantics. Specifically, a `setjmp`/`longjmp` call pair has undefined behavior if replacing the `setjmp` and `longjmp` by **`catch`** and **`throw`** would invoke any non-trivial destructors for any automatic objects. In C++ programs, we recommend you use the C++ exception-handling mechanism.

For more information, see [Using setjmp and longjmp](https://learn.microsoft.com/en-us/cpp/cpp/using-setjmp-longjmp?view=msvc-170).

## Requirements

Routine

Required header

**`longjmp`**

<setjmp.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`_fpreset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpreset?view=msvc-170).

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`setjmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setjmp?view=msvc-170)