---
title: "_fread_nolock_s2"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fread-nolock-s2?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reads data from a stream without locking. This version of [`fread_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fread-nolock?view=msvc-170) has security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
size_t _fread_nolock_s(
   void *buffer,
   size_t bufferSize,
   size_t elementSize,
   size_t elementCount,
   FILE *stream
);
```

### Parameters

_`buffer`_  
Storage location for data.

_`bufferSize`_  
Size of the destination buffer in bytes.

_`elementSize`_  
Size of the item to read in bytes.

_`elementCount`_  
Maximum number of items to be read.

_`stream`_  
Pointer to `FILE` structure.

## Return value

See [`fread_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fread-s?view=msvc-170).

This function is a non-locking version of `fread_s`. It's identical to `fread_s` except that it isn't protected from interference by other threads. It might be faster because it doesn't incur the overhead of locking out other threads. Use this function only in thread-safe contexts such as single-threaded applications or where the calling scope already handles thread isolation.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`_fread_nolock_s`**

C: <stdio.h>; C++: <cstdio> or <stdio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fwrite`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fwrite?view=msvc-170)  
[`_read`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/read?view=msvc-170)