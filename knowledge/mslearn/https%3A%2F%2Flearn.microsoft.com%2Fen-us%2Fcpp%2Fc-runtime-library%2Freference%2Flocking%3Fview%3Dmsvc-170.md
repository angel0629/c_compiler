---
title: "_locking"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/locking?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Locks or unlocks bytes of a file.

## Syntax

```
int _locking(
   int fd,
   int mode,
   long nbytes
);
```

### Parameters

_`fd`_  
File descriptor.

_`mode`_  
Locking action to perform.

_`nbytes`_  
Number of bytes to lock.

## Return value

**`_locking`** returns 0 if successful. A return value of -1 indicates failure, in which case [`errno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170) is set to one of the following values.

`errno` value

Condition

`EACCES`

Locking violation (file already locked or unlocked).

`EBADF`

Invalid file descriptor.

`EDEADLOCK`

Locking violation. Returned when the `_LK_LOCK` or `_LK_RLCK` flag is specified and the file can't be locked after 10 attempts.

`EINVAL`

An invalid argument was given to **`_locking`**.

If the failure is due to a bad parameter, such as an invalid file descriptor, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170).

The **`_locking`** function locks or unlocks _`nbytes`_ bytes of the file specified by _`fd`_. Locking bytes in a file prevents access to those bytes by other processes. All locking or unlocking begins at the current position of the file pointer and proceeds for the next _`nbytes`_ bytes. It's possible to lock bytes past end of file.

_`mode`_ must be one of the following manifest constants, which are defined in Locking.h.

_`mode`_ value

Effect

`_LK_LOCK`

Locks the specified bytes. If the bytes can't be locked, the program immediately tries again after 1 second. If the bytes can't be locked after 10 attempts, the constant returns an error.

`_LK_NBLCK`

Locks the specified bytes. If the bytes can't be locked, the constant returns an error.

`_LK_NBRLCK`

Same as `_LK_NBLCK`.

`_LK_RLCK`

Same as `_LK_LOCK`.

`_LK_UNLCK`

Unlocks the specified bytes, which must have been previously locked.

Multiple regions of a file that don't overlap can be locked. A region being unlocked must have been previously locked. **`_locking`** doesn't merge adjacent regions; if two locked regions are adjacent, each region must be unlocked separately. Regions should be locked only briefly and should be unlocked before closing a file or exiting the program.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

Optional header

**`_locking`**

<io.h> and <sys/locking.h>

<errno.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_locking.c
/* This program opens a file with sharing. It locks
* some bytes before reading them, then unlocks them. Note that the
* program works correctly only if the file exists.
*/

#include <sys/types.h>
#include <sys/stat.h>
#include <sys/locking.h>
#include <share.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <io.h>

int main( void )
{
   int  fh, numread;
   char buffer[40];

   /* Quit if can't open file or system doesn't
    * support sharing.
    */
   errno_t err = _sopen_s( &fh, "crt_locking.txt", _O_RDONLY, _SH_DENYNO,
                          _S_IREAD | _S_IWRITE );
   printf( "%d %d\n", err, fh );
   if( err != 0 )
      exit( 1 );

   /* Lock some bytes and read them. Then unlock. */
   if( _locking( fh, LK_NBLCK, 30L ) != -1 )
   {
      long lseek_ret;
      printf( "No one can change these bytes while I'm reading them\n" );
      numread = _read( fh, buffer, 30 );
      buffer[30] = '\0';
      printf( "%d bytes read: %.30s\n", numread, buffer );
      lseek_ret = _lseek( fh, 0L, SEEK_SET );
      _locking( fh, LK_UNLCK, 30L );
      printf( "Now I'm done. Do what you will with them\n" );
   }
   else
      perror( "Locking failed\n" );

   _close( fh );
}
```

### Input: crt\_locking.txt

```
The first thirty bytes of this file will be locked.
```

## Sample output

```
No one can change these bytes while I'm reading them
30 bytes read: The first thirty bytes of this
Now I'm done. Do what you will with them
```

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`_creat`, `_wcreat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creat-wcreat?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)