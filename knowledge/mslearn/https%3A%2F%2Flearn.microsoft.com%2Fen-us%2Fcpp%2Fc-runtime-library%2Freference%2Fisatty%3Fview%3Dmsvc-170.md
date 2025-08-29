---
title: "_isatty"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isatty?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines whether a file descriptor is associated with a character device.

## Syntax

```
int _isatty( int fd );
```

### Parameters

_`fd`_  
File descriptor that refers to the device to be tested.

## Return value

**`_isatty`** returns a nonzero value if the descriptor is associated with a character device. Otherwise, **`_isatty`** returns 0.

The **`_isatty`** function determines whether _`fd`_ is associated with a character device (a terminal, console, printer, or serial port).

This function validates the _`fd`_ parameter. If _`fd`_ is a bad file pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the function returns 0 and sets `errno` to `EBADF`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_isatty`**

<io.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_isatty.c
/* This program checks to see whether
* stdout has been redirected to a file.
*/

#include <stdio.h>
#include <io.h>

int main( void )
{
   if( _isatty( _fileno( stdout ) ) )
      printf( "stdout has not been redirected to a file\n" );
   else
      printf( "stdout has been redirected to a file\n");
}
```

### Sample output

```
stdout has not been redirected to a file
```

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)