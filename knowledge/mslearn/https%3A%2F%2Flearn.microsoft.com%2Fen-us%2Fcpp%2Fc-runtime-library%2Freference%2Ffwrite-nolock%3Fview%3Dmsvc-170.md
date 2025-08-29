---
title: "_fwrite_nolock"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fwrite-nolock?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Writes data to a stream without locking.

## Syntax

```
size_t _fwrite_nolock(
   const void *buffer,
   size_t size,
   size_t count,
   FILE *stream
);
```

### Parameters

_`buffer`_  
Pointer to the data to be written.

_`size`_  
Item size in bytes.

_`count`_  
Maximum number of items to be written.

_`stream`_  
Pointer to the `FILE` structure.

## Return value

Same as [`fwrite`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fwrite?view=msvc-170).

## Remarks

This function is a non-locking version of `fwrite`. It's identical to `fwrite` except that it isn't protected from interference by other threads. It might be faster because it doesn't incur the overhead of locking out other threads. Use this function only in thread-safe contexts such as single-threaded applications or where the calling scope already handles thread isolation.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`_fwrite_nolock`**

<stdio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`fread`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fread?view=msvc-170).

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fread`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fread?view=msvc-170)  
[`_write`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/write?view=msvc-170)