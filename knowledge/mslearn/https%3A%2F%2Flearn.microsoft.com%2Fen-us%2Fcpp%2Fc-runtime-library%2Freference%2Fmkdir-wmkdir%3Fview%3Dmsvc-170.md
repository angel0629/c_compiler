---
title: "_mkdir, _wmkdir"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mkdir-wmkdir?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Creates a new directory.

## Syntax

```
int _mkdir(
   const char *dirname
);
int _wmkdir(
   const wchar_t *dirname
);
```

### Parameters

_`dirname`_  
Path for a new directory.

## Return value

Each of these functions returns the value 0 if the new directory was created. On an error, the function returns -1 and sets `errno` as follows.

`EEXIST` Directory wasn't created because _`dirname`_ is the name of an existing file, directory, or device.

`ENOENT` Path wasn't found.

For more information about these and other return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_mkdir`** function creates a new directory with the specified _`dirname`_. **`_mkdir`** can create only one new directory per call, so only the last component of _`dirname`_ can name a new directory. **`_mkdir`** doesn't translate path delimiters. In Windows NT, both the backslash (**`\`**) and the forward slash (**`/`**) are valid path delimiters in character strings in run-time routines.

**`_wmkdir`** is a wide-character version of **`_mkdir`**; the _`dirname`_ argument to **`_wmkdir`** is a wide-character string. **`_wmkdir`** and **`_mkdir`** behave identically otherwise.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`Tchar.h` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tmkdir`

**`_mkdir`**

**`_mkdir`**

**`_wmkdir`**

## Requirements

Routine

Required header

**`_mkdir`**

`<direct.h>`

**`_wmkdir`**

`<direct.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_makedir.c

#include <direct.h>
#include <stdlib.h>
#include <stdio.h>

int main( void )
{
   if( _mkdir( "\\testtmp" ) == 0 )
   {
      printf( "Directory '\\testtmp' was successfully created\n" );
      system( "dir \\testtmp" );
      if( _rmdir( "\\testtmp" ) == 0 )
        printf( "Directory '\\testtmp' was successfully removed\n"  );
      else
         printf( "Problem removing directory '\\testtmp'\n" );
   }
   else
      printf( "Problem creating directory '\\testtmp'\n" );
}
```

### Sample output

```
Directory '\testtmp' was successfully created
Volume in drive C has no label.
Volume Serial Number is E078-087A

Directory of C:\testtmp

02/12/2002  09:56a      <DIR>          .
02/12/2002  09:56a      <DIR>          ..
               0 File(s)              0 bytes
               2 Dir(s)  15,498,690,560 bytes free
Directory '\testtmp' was successfully removed
```

## See also

[Directory control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/directory-control?view=msvc-170)  
[`_chdir`, `_wchdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chdir-wchdir?view=msvc-170)  
[`_rmdir`, `_wrmdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rmdir-wrmdir?view=msvc-170)