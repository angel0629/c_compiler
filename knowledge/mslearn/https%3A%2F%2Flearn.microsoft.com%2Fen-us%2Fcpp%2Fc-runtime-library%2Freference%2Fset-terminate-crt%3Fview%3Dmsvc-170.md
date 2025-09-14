---
title: "set_terminate (CRT)"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-terminate-crt?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Installs your own termination routine to be called by `terminate`.

## Syntax

```
terminate_function set_terminate( terminate_function termFunction );
```

### Parameters

_`termFunction`_  
Pointer to a terminate function that you write.

## Return value

Returns a pointer to the previous function registered by **`set_terminate`** so that the previous function can be restored later. If no previous function has been set, the return value may be used to restore the default behavior; this value may be `NULL`.

The **`set_terminate`** function installs _`termFunction`_ as the function called by `terminate`. **`set_terminate`** is used with C++ exception handling and may be called at any point in your program before the exception is thrown. `terminate` calls [`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170) by default. You can change this default by writing your own termination function and calling **`set_terminate`** with the name of your function as its argument. `terminate` calls the last function given as an argument to **`set_terminate`**. After it performs any desired cleanup tasks, _`termFunction`_ should exit the program. If it doesn't exit (if it returns to its caller), [`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170) is called.

In a multithreaded environment, terminate functions are maintained separately for each thread. Each new thread needs to install its own terminate function. Thus, each thread is in charge of its own termination handling.

The `terminate_function` type is defined in EH.H as a pointer to a user-defined termination function, _`termFunction`_ that returns **`void`**. Your custom function _`termFunction`_ can take no arguments and shouldn't return to its caller. If it does, [`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170) is called. An exception may not be thrown from within _`termFunction`_.

```
typedef void ( *terminate_function )( );
```

Note

The **`set_terminate`** function only works outside the debugger.

There's a single **`set_terminate`** handler for all dynamically linked DLLs or EXEs; even if you call **`set_terminate`** your handler may be replaced by another, or you may be replacing a handler set by another DLL or EXE.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`set_terminate`**

<eh.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`terminate`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/terminate-crt?view=msvc-170).

## See also

[Exception handling routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/exception-handling-routines?view=msvc-170)  
[`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170)  
[`_get_terminate`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-terminate?view=msvc-170)  
[`set_unexpected`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-unexpected-crt?view=msvc-170)  
[`terminate`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/terminate-crt?view=msvc-170)  
[`unexpected`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/unexpected-crt?view=msvc-170)