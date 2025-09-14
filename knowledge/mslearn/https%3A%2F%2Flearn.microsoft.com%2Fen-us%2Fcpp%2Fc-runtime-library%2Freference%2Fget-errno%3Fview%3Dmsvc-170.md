---
title: "_get_errno"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-errno?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets the current value of the errno global variable.

## Syntax

```
errno_t _get_errno(
   int * pValue
);
```

### Parameters

_`pValue`_  
A pointer to an integer to be filled with the current value of the `errno` variable.

## Return value

Returns zero if successful; an error code on failure. If _`pValue`_ is `NULL`, the invalid parameter handler is invoked as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function sets `errno` to `EINVAL` and returns `EINVAL`.

Possible values of `errno` are defined in Errno.h. Also, see [`errno` constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-constants?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Example

```
// crt_get_errno.c
#include <errno.h>
#include <fcntl.h>
#include <io.h>
#include <stdio.h>
#include <sys/stat.h>

int main()
{
   errno_t err;
   int pfh;
   _sopen_s(&pfh, "nonexistent.file", _O_WRONLY, _SH_DENYNO, _S_IWRITE);
   _get_errno(&err);
   printf("errno = %d\n", err);
   printf("fyi, ENOENT = %d\n", ENOENT);
}
```

```
errno = 2
fyi, ENOENT = 2
```

## Requirements

Routine

Required header

Optional header

**`_get_errno`**

<stdlib.h>

<errno.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[`_set_errno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-errno?view=msvc-170)  
[`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170)