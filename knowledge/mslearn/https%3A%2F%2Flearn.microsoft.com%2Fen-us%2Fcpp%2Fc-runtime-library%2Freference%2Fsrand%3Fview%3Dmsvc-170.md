---
title: "srand"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/srand?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sets the starting seed value for the pseudorandom number generator used by the **`rand`** function.

## Syntax

```
void srand(
   unsigned int seed
);
```

### Parameters

_`seed`_  
Seed for pseudorandom number generation

## Remarks

The **`srand`** function sets the starting point for generating a series of pseudorandom integers in the current thread. To reinitialize the generator to create the same sequence of results, call the **`srand`** function and use the same _`seed`_ argument again. Any other value for _`seed`_ sets the generator to a different starting point in the pseudorandom sequence. **`rand`** retrieves the pseudorandom numbers that are generated. Calling **`rand`** before any call to **`srand`** generates the same sequence as calling **`srand`** with _`seed`_ passed as 1.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`srand`**

`<stdlib.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`rand`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rand?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`rand`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rand?view=msvc-170)