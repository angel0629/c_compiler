---
title: "_chmod, _wchmod"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chmod-wchmod?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Changes the file-permission settings.

## Syntax

```
int _chmod( const char *filename, int pmode );
int _wchmod( const wchar_t *filename, int pmode );
```

### Parameters

_`filename`_  
Name of the existing file.

_`pmode`_  
Permission setting for the file.

## Return value

These functions return 0 if the permission setting is successfully changed. A return value of -1 indicates failure. If the specified file couldn't be found, `errno` is set to `ENOENT`; if a parameter is invalid, `errno` is set to `EINVAL`.

The **`_chmod`** function changes the permission setting of the file specified by _`filename`_. The permission setting controls the read and write access to the file. The integer expression _`pmode`_ contains one or both of the following manifest constants, defined in SYS\\Stat.h.

_`pmode`_

Meaning

`_S_IREAD`

Only reading permitted.

`_S_IWRITE`

Writing permitted. (In effect, permits reading and writing.)

`_S_IREAD | _S_IWRITE`

Reading and writing permitted.

When both constants are given, they're joined with the bitwise or operator (**`|`**). If write permission isn't given, the file is read-only. Note that all files are always readable; it isn't possible to give write-only permission. Thus, the modes `_S_IWRITE` and `_S_IREAD | _S_IWRITE` are equivalent.

**`_wchmod`** is a wide-character version of **`_chmod`**; the _`filename`_ argument to **`_wchmod`** is a wide-character string. **`_wchmod`** and **`_chmod`** behave identically otherwise.

This function validates its parameters. If _`pmode`_ isn't a combination of one of the manifest constants or incorporates an alternate set of constants, the function simply ignores them. If _`filename`_ is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the function returns -1.

By default, this function's global state is scoped to the application. To change it, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tchmod`

**`_chmod`**

**`_chmod`**

**`_wchmod`**

## Requirements

Routine

Required header

Optional header

**`_chmod`**

<io.h>

<sys/types.h>, <sys/stat.h>, <errno.h>

**`_wchmod`**

<io.h> or <wchar.h>

<sys/types.h>, <sys/stat.h>, <errno.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_chmod.c
// This program uses _chmod to
// change the mode of a file to read-only.
// It then attempts to modify the file.
//

#include <sys/types.h>
#include <sys/stat.h>
#include <io.h>
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>

// Change the mode and report error or success
void set_mode_and_report(char * filename, int mask)
{
   // Check for failure
   if( _chmod( filename, mask ) == -1 )
   {
      // Determine cause of failure and report.
      switch (errno)
      {
         case EINVAL:
            fprintf( stderr, "Invalid parameter to chmod.\n");
            break;
         case ENOENT:
            fprintf( stderr, "File %s not found\n", filename );
            break;
         default:
            // Should never be reached
            fprintf( stderr, "Unexpected error in chmod.\n" );
       }
   }
   else
   {
      if (mask == _S_IREAD)
        printf( "Mode set to read-only\n" );
      else if (mask & _S_IWRITE)
        printf( "Mode set to read/write\n" );
   }
   fflush(stderr);
}

int main( void )
{
   // Create or append to a file.
   system( "echo /* End of file */ >> crt_chmod.c_input" );

   // Set file mode to read-only:
   set_mode_and_report("crt_chmod.c_input ", _S_IREAD );

   system( "echo /* End of file */ >> crt_chmod.c_input " );

   // Change back to read/write:
   set_mode_and_report("crt_chmod.c_input ", _S_IWRITE );

   system( "echo /* End of file */ >> crt_chmod.c_input " );
}
```

```

A line of text.
```

```

      A line of text.Mode set to read-only
Access is denied.
Mode set to read/write
```

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`_access`, `_waccess`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/access-waccess?view=msvc-170)  
[`_creat`, `_wcreat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creat-wcreat?view=msvc-170)  
[`_fstat`, `_fstat32`, `_fstat64`, `_fstati64`, `_fstat32i64`, `_fstat64i32`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fstat-fstat32-fstat64-fstati64-fstat32i64-fstat64i32?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)  
[`_stat`, `_wstat` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stat-functions?view=msvc-170)