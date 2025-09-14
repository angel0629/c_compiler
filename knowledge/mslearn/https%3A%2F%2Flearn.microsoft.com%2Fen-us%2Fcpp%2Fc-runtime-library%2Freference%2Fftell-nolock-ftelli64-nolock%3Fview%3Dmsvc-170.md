---
title: "_ftell_nolock, _ftelli64_nolock"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftell-nolock-ftelli64-nolock?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets the current position of a file pointer without locking.

## Syntax

```
long _ftell_nolock(
   FILE *stream
);
__int64 _ftelli64_nolock(
   FILE *stream
);
```

### Parameters

_`stream`_  
Target the `FILE` structure.

## Return value

Same as `ftell` and `_ftelli64`. For more information, see [`ftell`, `_ftelli64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftell-ftelli64?view=msvc-170).

## Remarks

These functions are non-locking versions of `ftell` and `_ftelli64`, respectively. They're identical to `ftell` and `_ftelli64` except that they aren't protected from interference by other threads. These functions might be faster because they don't incur the overhead of locking out other threads. Use these functions only in thread-safe contexts such as single-threaded applications or where the calling scope already handles thread isolation.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

Optional header

**`ftell_nolock`**

<stdio.h>

<errno.h>

**`_ftelli64_nolock`**

<stdio.h>

<errno.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fgetpos`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgetpos?view=msvc-170)  
[`fseek`, `_fseeki64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64?view=msvc-170)  
[`_lseek`, `_lseeki64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lseek-lseeki64?view=msvc-170)  
[`ftell`, `_ftelli64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftell-ftelli64?view=msvc-170)