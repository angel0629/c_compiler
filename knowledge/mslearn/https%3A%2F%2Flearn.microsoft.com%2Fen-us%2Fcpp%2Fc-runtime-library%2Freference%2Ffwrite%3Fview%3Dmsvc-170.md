---
title: "fwrite"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fwrite?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Writes data to a stream.

## Syntax

```
size_t fwrite(
   const void *buffer,
   size_t size,
   size_t count,
   FILE *stream
);
```

### Parameters

_`buffer`_  
Pointer to data to be written.

_`size`_  
Item size, in bytes.

_`count`_  
Maximum number of items to be written.

_`stream`_  
Pointer to `FILE` structure.

## Return value

**`fwrite`** returns the number of full items the function writes, which may be less than _`count`_ if an error occurs. Also, if an error occurs, the file-position indicator can't be determined. If either _`stream`_ or _`buffer`_ is a null pointer, or if an odd number of bytes to be written is specified in Unicode mode, the function invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function sets `errno` to `EINVAL` and returns 0.

The **`fwrite`** function writes up to _`count`_ items, of _`size`_ length each, from _`buffer`_ to the output _`stream`_. The file pointer associated with _`stream`_ (if there's one) is incremented by the number of bytes **`fwrite`** writes. If _`stream`_ is opened in text mode, each line feed is replaced with a carriage return-line feed pair. The replacement has no effect on the return value.

When _`stream`_ is opened in Unicode translation mode—for example, if _`stream`_ is opened by calling **`fopen`** and using a mode parameter that includes **`ccs=UNICODE`**, **`ccs=UTF-16LE`**, or **`ccs=UTF-8`**, or if the mode is changed to a Unicode translation mode by using **`_setmode`** and a mode parameter that includes `_O_WTEXT`, `_O_U16TEXT`, or `_O_U8TEXT`—_`buffer`_ is interpreted as a pointer to an array of **`wchar_t`** that contains UTF-16 data. An attempt to write an odd number of bytes in this mode causes a parameter validation error.

Because this function locks the calling thread, it's thread-safe. For a non-locking version, see **`_fwrite_nolock`**.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`fwrite`**

`<stdio.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`fread`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fread?view=msvc-170).

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`_setmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmode?view=msvc-170)  
[`fread`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fread?view=msvc-170)  
[`_fwrite_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fwrite-nolock?view=msvc-170)  
[`_write`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/write?view=msvc-170)