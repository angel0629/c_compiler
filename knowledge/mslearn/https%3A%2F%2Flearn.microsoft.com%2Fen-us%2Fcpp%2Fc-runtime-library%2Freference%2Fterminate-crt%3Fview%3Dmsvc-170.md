---
title: "terminate (CRT)"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/terminate-crt?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calls [`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170) or a function you specify using `set_terminate`.

## Syntax

```
void terminate( void );
```

## Remarks

The **`terminate`** function is used with C++ exception handling and is called in the following cases:

*   A matching catch handler can't be found for a thrown C++ exception.
    
*   An exception is thrown by a destructor function during stack unwind.
    
*   The stack is corrupted after throwing an exception.
    

**`terminate`** calls [`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170) by default. You can change this default by writing your own termination function and calling `set_terminate` with the name of your function as its argument. **`terminate`** calls the last function given as an argument to `set_terminate`. For more information, see [Unhandled C++ Exceptions](https://learn.microsoft.com/en-us/cpp/cpp/unhandled-cpp-exceptions?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`terminate`**

<eh.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_terminate.cpp
// compile with: /EHsc
#include <eh.h>
#include <process.h>
#include <iostream>
using namespace std;

void term_func();

int main()
{
    int i = 10, j = 0, result;
    set_terminate( term_func );
    try
    {
        if( j == 0 )
            throw "Divide by zero!";
        else
            result = i/j;
    }
    catch( int )
    {
        cout << "Caught some integer exception.\n";
    }
    cout << "This should never print.\n";
}

void term_func()
{
    cout << "term_func() was called by terminate().\n";

    // ... cleanup tasks performed here

    // If this function does not exit, abort is called.

    exit(-1);
}
```

```
term_func() was called by terminate().
```

## See also

[Exception handling routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/exception-handling-routines?view=msvc-170)  
[`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170)  
[`_set_se_translator`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-se-translator?view=msvc-170)  
[`set_terminate`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-terminate-crt?view=msvc-170)  
[`set_unexpected`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-unexpected-crt?view=msvc-170)  
[`unexpected`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/unexpected-crt?view=msvc-170)