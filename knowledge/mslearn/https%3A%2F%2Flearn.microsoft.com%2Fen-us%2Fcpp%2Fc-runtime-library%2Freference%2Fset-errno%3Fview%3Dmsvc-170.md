---
title: "_set_errno"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-errno?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Set the value of the `errno` global variable.

## Syntax

```
errno_t _set_errno( int error_value );
```

### Parameters

_`error_value`_  
The new value of `errno`.

## Return value

Returns zero if successful.

## Remarks

Possible values are defined in Errno.h. Also, see [`errno` constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-constants?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Example

```
// crt_set_errno.c
#include <stdio.h>
#include <errno.h>

int main()
{
   _set_errno( EILSEQ );
   perror( "Oops" );
}
```

```
Oops: Illegal byte sequence
```

## Requirements

Routine

Required header

Optional header

**`_set_errno`**

<stdlib.h>

<errno.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[`_get_errno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-errno?view=msvc-170)  
[`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170)