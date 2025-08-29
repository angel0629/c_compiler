---
title: "_malloca"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloca?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Allocates memory on the stack. This function is a version of [`_alloca`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/alloca?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
void *_malloca(
   size_t size
);
```

### Parameters

_`size`_  
Bytes to be allocated from the stack.

## Return value

The **`_malloca`** routine returns a **`void`** pointer to the allocated space, which is suitably aligned for storage of any type of object. If _`size`_ is 0, **`_malloca`** allocates a zero-length item and returns a valid pointer to that item.

If _`size`_ is greater than `_ALLOCA_S_THRESHOLD`, then **`_malloca`** attempts to allocate on the heap, and returns a null pointer if the space can't be allocated. If _`size`_ is less than or equal to `_ALLOCA_S_THRESHOLD`, then **`_malloca`** attempts to allocate on the stack, and a stack overflow exception is generated if the space can't be allocated. The stack overflow exception isn't a C++ exception; it's a structured exception. Instead of using C++ exception handling, you must use [Structured exception handling](https://learn.microsoft.com/en-us/cpp/cpp/structured-exception-handling-c-cpp?view=msvc-170) (SEH) to catch this exception.

**`_malloca`** allocates _`size`_ bytes from the program stack or the heap if the request exceeds a certain size in bytes given by `_ALLOCA_S_THRESHOLD`. The difference between **`_malloca`** and **`_alloca`** is that **`_alloca`** always allocates on the stack, regardless of the size. Unlike **`_alloca`**, which doesn't require or permit a call to **`free`** to free the memory so allocated, **`_malloca`** requires the use of [`_freea`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freea?view=msvc-170) to free memory. In debug mode, **`_malloca`** always allocates memory from the heap.

There are restrictions to explicitly calling **`_malloca`** in an exception handler (EH). EH routines that run on x86-class processors operate in their own memory frame: They perform their tasks in memory space that isn't based on the current location of the stack pointer of the enclosing function. The most common implementations include Windows NT structured exception handling (SEH) and C++ catch clause expressions. Therefore, explicitly calling **`_malloca`** in any of the following scenarios results in program failure during the return to the calling EH routine:

*   Windows SEH exception filter expression: **`__except`** (`_malloca ()`)
    
*   Windows SEH final exception handler: **`__finally`** {`_malloca ()` }
    
*   C++ EH catch clause expression
    

However, **`_malloca`** can be called directly from within an EH routine or from an application-supplied callback that gets invoked by one of the EH scenarios previously listed.

Important

In Windows, if **`_malloca`** is called inside a `try/catch` block, you must call [`_resetstkoflw`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/resetstkoflw?view=msvc-170) in the catch block.

In addition to the above restrictions, when using the [`/clr` (Common Language Runtime Compilation)](https://learn.microsoft.com/en-us/cpp/build/reference/clr-common-language-runtime-compilation?view=msvc-170) option, **`_malloca`** can't be used in **`__except`** blocks. For more information, see [`/clr` Restrictions](https://learn.microsoft.com/en-us/cpp/build/reference/clr-restrictions?view=msvc-170).

## Requirements

Routine

Required header

**`_malloca`**

`<malloc.h>`

## Example: `_malloca`

```
// crt_malloca_simple.c
#include <stdio.h>
#include <malloc.h>

void Fn()
{
   char * buf = (char *)_malloca( 100 );
   // do something with buf
   _freea( buf );
}

int main()
{
   Fn();
}
```

## Example: `_malloca` exception

```
// crt_malloca_exception.c
// This program demonstrates the use of
// _malloca and trapping any exceptions
// that may occur.

#include <windows.h>
#include <stdio.h>
#include <malloc.h>

int main()
{
    int     size;
    int     numberRead = 0;
    int     errcode = 0;
    void    *p = NULL;
    void    *pMarker = NULL;

    while (numberRead == 0)
    {
        printf_s("Enter the number of bytes to allocate "
                 "using _malloca: ");
        numberRead = scanf_s("%d", &size);
    }

    // Do not use try/catch for _malloca,
    // use __try/__except, since _malloca throws
    // Structured Exceptions, not C++ exceptions.

    __try
    {
        if (size > 0)
        {
            p =  _malloca( size );
        }
        else
        {
            printf_s("Size must be a positive number.");
        }
        _freea( p );
    }

    // Catch any exceptions that may occur.
    __except( GetExceptionCode() == STATUS_STACK_OVERFLOW )
    {
        printf_s("_malloca failed!\n");

        // If the stack overflows, use this function to restore.
        errcode = _resetstkoflw();
        if (errcode)
        {
            printf("Could not reset the stack!");
            _exit(1);
        }
    };
}
```

### Input

```
1000
```

### Sample output

```
Enter the number of bytes to allocate using _malloca: 1000
```

## See also

[Memory allocation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170)  
[`calloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc?view=msvc-170)  
[`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170)  
[`realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc?view=msvc-170)  
[`_resetstkoflw`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/resetstkoflw?view=msvc-170)