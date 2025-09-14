---
title: "_rmtmp"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rmtmp?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Removes temporary files.

## Syntax

```
int _rmtmp( void );
```

## Return value

**`_rmtmp`** returns the number of temporary files closed and deleted.

## Remarks

The **`_rmtmp`** function cleans up all temporary files in the current directory. The function removes only those files created by `tmpfile`; use it only in the same directory in which the temporary files were created.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_rmtmp`**

<stdio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

See the example for [`tmpfile`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tmpfile?view=msvc-170).

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`_flushall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/flushall?view=msvc-170)  
[`tmpfile`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tmpfile?view=msvc-170)  
[`_tempnam`, `_wtempnam`, `tmpnam`, `_wtmpnam`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tempnam-wtempnam-tmpnam-wtmpnam?view=msvc-170)