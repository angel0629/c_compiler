---
title: "_getmaxstdio"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getmaxstdio?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns the number of simultaneously open files permitted at the stream I/O level.

## Syntax

```
int _getmaxstdio( void );
```

## Return value

Returns a number that represents the number of simultaneously open files currently permitted at the `stdio` level.

## Remarks

Use [`_setmaxstdio`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmaxstdio?view=msvc-170) to configure the number of simultaneously open files permitted at the `stdio` level.

## Requirements

Routine

Required header

**`_getmaxstdio`**

<stdio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_setmaxstdio.c
// The program retrieves the maximum number
// of open files and prints the results
// to the console.

#include <stdio.h>

int main()
{
   printf( "%d\n", _getmaxstdio());

   _setmaxstdio(2048);

   printf( "%d\n", _getmaxstdio());
}
```

```
512
2048
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)