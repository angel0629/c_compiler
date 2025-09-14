---
title: "_swab"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/swab?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Swaps bytes.

## Syntax

```
void _swab(
   char *src,
   char *dest,
   int n
);
```

## Parameters

_`src`_  
Data to be copied and swapped.

_`dest`_  
Storage location for swapped data.

_`n`_  
Number of bytes to be copied and swapped.

## Return value

The **`swab`** function doesn't return a value. The function sets `errno` to `EINVAL` if either the _`src`_ or _`dest`_ pointer is null or _`n`_ is less than zero, and the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170).

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

If _`n`_ is even, the **`_swab`** function copies _`n`_ bytes from _`src`_, swaps each pair of adjacent bytes, and stores the result at _`dest`_. If _`n`_ is odd, **`_swab`** copies and swaps the first _`n`_\-1 bytes of _`src`_, and the final byte isn't copied. The **`_swab`** function is typically used to prepare binary data for transfer to a machine that uses a different byte order.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_swab`**

C: <stdlib.h> C++: <cstdlib> or <stdlib.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_swab.c

#include <stdlib.h>
#include <stdio.h>

char from[] = "BADCFEHGJILKNMPORQTSVUXWZY";
char to[] =   "...........................";

int main()
{
    printf("Before: %s  %d bytes\n        %s\n\n", from, sizeof(from), to);
    _swab(from, to, sizeof(from));
    printf("After:  %s\n        %s\n\n", from, to);
}
```

```
Before: BADCFEHGJILKNMPORQTSVUXWZY  27 bytes
        ...........................

After:  BADCFEHGJILKNMPORQTSVUXWZY
        ABCDEFGHIJKLMNOPQRSTUVWXYZ.
```

## See also

[Buffer manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/buffer-manipulation?view=msvc-170)