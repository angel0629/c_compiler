---
title: "_set_fmode"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-fmode?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sets the default file translation mode for file I/O operations.

## Syntax

```
errno_t _set_fmode(
   int mode
);
```

### Parameters

_`mode`_  
The file translation mode desired: `_O_TEXT` or `_O_BINARY`.

## Return value

Returns zero if successful, an error code on failure. If _`mode`_ isn't `_O_TEXT` or `_O_BINARY` or `_O_WTEXT`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function sets `errno` to `EINVAL` and returns `EINVAL`.

The function sets the [`_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/fmode?view=msvc-170) global variable. This variable specifies the default file translation mode for the file I/O operations `_open` and `_pipe`.

`_O_TEXT` and `_O_BINARY` are defined in Fcntl.h. `EINVAL` is defined in Errno.h.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

Optional header

**`_set_fmode`**

<stdlib.h>

<fcntl.h>, <errno.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_set_fmode.c
#include <stdlib.h>
#include <stdio.h>
#include <fcntl.h>     /* for _O_TEXT and _O_BINARY */
#include <errno.h>     /* for EINVAL */
#include <sys\stat.h>  /* for _S_IWRITE */
#include <share.h>     /* for _SH_DENYNO */

int main()
{
   int mode, fd, ret;
   errno_t err;
   int buf[12] = { 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
                   75, 76 };
   char * filename = "fmode.out";

   err = _get_fmode(&mode);
   if (err == EINVAL)
   {
      printf( "Invalid parameter: mode\n");
      return 1;
   }
   else
      printf( "Default Mode is %s\n", mode == _O_TEXT ? "text" :
              "binary");

   err = _set_fmode(_O_BINARY);
   if (err == EINVAL)
   {
      printf( "Invalid mode.\n");
      return 1;
   }

   if ( _sopen_s(&fd, filename, _O_RDWR | _O_CREAT, _SH_DENYNO, _S_IWRITE | _S_IREAD) != 0 )
   {
      printf( "Error opening the file %s\n", filename);
      return 1;
   }

   if (ret = _write(fd, buf, 12*sizeof(int)) < 12*sizeof(int))
   {
      printf( "Problem writing to the file %s.\n", filename);
      printf( "Number of bytes written: %d\n", ret);
   }

   if (_close(fd) != 0)
   {
      printf("Error closing the file %s. Error code %d.\n",
             filename, errno);
   }

   system("type fmode.out");
}
```

```
Default Mode is binary
A   B   C   D   E   F   G   H   I   J   K   L
```

## See also

[`_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/fmode?view=msvc-170)  
[`_get_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-fmode?view=msvc-170)  
[`_setmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmode?view=msvc-170)  
[Text and binary mode file I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/text-and-binary-mode-file-i-o?view=msvc-170)