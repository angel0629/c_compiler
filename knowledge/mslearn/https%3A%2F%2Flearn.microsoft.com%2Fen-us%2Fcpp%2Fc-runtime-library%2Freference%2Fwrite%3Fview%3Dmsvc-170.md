---
title: "_write"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/write?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Writes data to a file.

## Syntax

```
int _write(
   int fd,
   const void *buffer,
   unsigned int count
);
```

### Parameters

_`fd`_  
File descriptor of file into which data is written.

_`buffer`_  
Data to be written.

_`count`_  
Number of bytes.

## Return value

If successful, **`_write`** returns the number of bytes written. If the actual space remaining on the disk is less than the size of the buffer the function is trying to write to the disk, **`_write`** fails and doesn't flush any of the buffer's contents to the disk. A return value of -1 indicates an error. If invalid parameters are passed, this function invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the function returns -1 and `errno` is set to one of three values: `EBADF`, which means the file descriptor is invalid or the file isn't opened for writing; `ENOSPC`, which means there isn't enough space left on the device for the operation; or `EINVAL`, which means that _`buffer`_ was a null pointer, or that an odd _`count`_ of bytes was passed in Unicode mode.

For more information about these and other return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

If the file is opened in text mode, each line feed character is replaced with a carriage return-line feed pair in the output. The replacement doesn't affect the return value.

When the file is opened in Unicode translation mode—for example, if _`fd`_ is opened by using **`_open`** or **`_sopen`** and a mode parameter that includes `_O_WTEXT`, `_O_U16TEXT`, or `_O_U8TEXT`, or if it's opened by using **`fopen`** and a mode parameter that includes **`ccs=UNICODE`**, **`ccs=UTF-16LE`**, or **`ccs=UTF-8`**, or if the mode is changed to a Unicode translation mode by using **`_setmode`**—_`buffer`_ is interpreted as a pointer to an array of **`wchar_t`** that contains **`UTF-16`** data. An attempt to write an odd number of bytes in this mode causes a parameter validation error.

The **`_write`** function writes _`count`_ bytes from _`buffer`_ into the file associated with _`fd`_. The write operation begins at the current position of the file pointer (if any) associated with the given file. If the file is open for appending, the operation begins at the current end of the file. After the write operation, the file pointer is increased by the number of bytes written.

When it writes to files opened in text mode, **`_write`** treats a CTRL+Z character as the logical end of file. When it writes to a device, **`_write`** treats a CTRL+Z character in the buffer as an output terminator.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_write`**

`<io.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt__write.c
//
// This program opens a file for output and uses _write to write
// some bytes to the file.

#include <io.h>
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <errno.h>
#include <share.h>

char buffer[] = "This is a test of '_write' function";

int main( void )
{
   int         fileHandle = 0;
   unsigned    bytesWritten = 0;

   if ( _sopen_s(&fileHandle, "write.o", _O_RDWR | _O_CREAT,
                  _SH_DENYNO, _S_IREAD | _S_IWRITE) )
      return -1;

   if (( bytesWritten = _write( fileHandle, buffer, sizeof( buffer ))) == -1 )
   {
      switch(errno)
      {
         case EBADF:
            perror("Bad file descriptor!");
            break;
         case ENOSPC:
            perror("No space left on device!");
            break;
         case EINVAL:
            perror("Invalid parameter: buffer was NULL!");
            break;
         default:
            // An unrelated error occurred
            perror("Unexpected error!");
      }
   }
   else
   {
      printf_s( "Wrote %u bytes to file.\n", bytesWritten );
   }
   _close( fileHandle );
}
```

```
Wrote 36 bytes to file.
```

## See also

[Low-level I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/low-level-i-o?view=msvc-170)  
[`fwrite`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fwrite?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)  
[`_read`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/read?view=msvc-170)  
[`_setmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmode?view=msvc-170)