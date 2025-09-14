---
title: "unexpected (CRT)"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/unexpected-crt?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calls **`terminate`** or the function you specify by using **`set_unexpected`**.

## Syntax

```
void unexpected( void );
```

## Remarks

The **`unexpected`** routine isn't used with the current implementation of C++ exception handling. **`unexpected`** calls **`terminate`** by default. You can change this default behavior by writing a custom termination function. Call **`set_unexpected`** with the name of your function as its argument. **`unexpected`** calls the last function passed to **`set_unexpected`**.

## Requirements

Routine

Required header

**`unexpected`**

`<eh.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Exception handling routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/exception-handling-routines?view=msvc-170)  
[`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170)  
[`_set_se_translator`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-se-translator?view=msvc-170)  
[`set_terminate`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-terminate-crt?view=msvc-170)  
[`set_unexpected`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-unexpected-crt?view=msvc-170)  
[`terminate`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/terminate-crt?view=msvc-170)