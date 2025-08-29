---
title: "set_unexpected (CRT)"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-unexpected-crt?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Installs your own termination function to be called by **`unexpected`**.

## Syntax

```
unexpected_function set_unexpected( unexpected_function unexpFunction );
```

### Parameters

_`unexpFunction`_  
Pointer to a function that you write to replace the **`unexpected`** function.

## Return value

Returns a pointer to the previous termination function registered by **`_set_unexpected`** so that the previous function can be restored later. If no previous function has been set, the return value may be used to restore the default behavior; this value may be `NULL`.

The **`set_unexpected`** function installs _`unexpFunction`_ as the function called by **`unexpected`**. **`unexpected`** isn't used in the current C++ exception-handling implementation. The **`unexpected_function`** type is defined in EH.H as a pointer to a user-defined unexpected function, _`unexpFunction`_ that returns **`void`**. Your custom _`unexpFunction`_ function shouldn't return to its caller.

```
typedef void ( *unexpected_function )( );
```

By default, **`unexpected`** calls **`terminate`**. You can change this default behavior by writing your own termination function and calling **`set_unexpected`** with the name of your function as its argument. **`unexpected`** calls the last function given as an argument to **`set_unexpected`**.

Unlike the custom termination function installed by a call to **`set_terminate`**, an exception can be thrown from within **`unexpFunction`**.

In a multithreaded environment, unexpected functions are maintained separately for each thread. Each new thread needs to install its own unexpected function. Thus, each thread is in charge of its own unexpected handling.

In the current Microsoft implementation of C++ exception handling, **`unexpected`** calls **`terminate`** by default and is never called by the exception-handling run-time library. There's no particular advantage to calling **`unexpected`** rather than **`terminate`**.

There's a single **`set_unexpected`** handler for all dynamically linked DLLs or EXEs; even if you call **`set_unexpected`** your handler may be replaced by another or that you're replacing a handler set by another DLL or EXE.

## Requirements

Routine

Required header

**`set_unexpected`**

`<eh.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Exception handling routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/exception-handling-routines?view=msvc-170)  
[`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170)  
[`_get_unexpected`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-unexpected?view=msvc-170)  
[`set_terminate`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-terminate-crt?view=msvc-170)  
[`terminate`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/terminate-crt?view=msvc-170)  
[`unexpected`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/unexpected-crt?view=msvc-170)