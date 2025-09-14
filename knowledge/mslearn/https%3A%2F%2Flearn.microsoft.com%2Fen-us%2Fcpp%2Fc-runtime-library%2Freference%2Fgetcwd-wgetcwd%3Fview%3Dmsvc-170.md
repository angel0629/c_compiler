---
title: "_getcwd, _wgetcwd"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getcwd-wgetcwd?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets the current working directory.

## Syntax

```
char *_getcwd(
   char *buffer,
   int maxlen
);
wchar_t *_wgetcwd(
   wchar_t *buffer,
   int maxlen
);
```

### Parameters

_`buffer`_  
Storage location for the path.

_`maxlen`_  
Maximum length of the path in characters: **`char`** for **`_getcwd`** and **`wchar_t`** for **`_wgetcwd`**.

## Return value

Returns a pointer to _`buffer`_. A `NULL` return value indicates an error, and `errno` is set either to `ENOMEM`, indicating that there's insufficient memory to allocate _`maxlen`_ bytes (when a `NULL` argument is given as _`buffer`_), or to `ERANGE`, indicating that the path is longer than _`maxlen`_ characters. If _`maxlen`_ is less than or equal to zero, this function invokes an invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170).

For more information about these and other return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_getcwd`** function gets the full path of the current working directory for the default drive and stores it at _`buffer`_. The integer argument _`maxlen`_ specifies the maximum length for the path. An error occurs if the length of the path (including the terminating null character) exceeds _`maxlen`_. The _`buffer`_ argument can be `NULL`; a buffer of at least size _`maxlen`_ (more only if necessary) is automatically allocated, using **`malloc`**, to store the path. This buffer can later be freed by calling **`free`** and passing it the **`_getcwd`** return value (a pointer to the allocated buffer).

**`_getcwd`** returns a string that represents the path of the current working directory. If the current working directory is the root, the string ends with a backslash (`\`). If the current working directory is a directory other than the root, the string ends with the directory name and not with a backslash.

**`_wgetcwd`** is a wide-character version of **`_getcwd`**; the _`buffer`_ argument and return value of **`_wgetcwd`** are wide-character strings. **`_wgetcwd`** and **`_getcwd`** behave identically otherwise.

When `_DEBUG` and `_CRTDBG_MAP_ALLOC` are defined, calls to **`_getcwd`** and **`_wgetcwd`** are replaced by calls to **`_getcwd_dbg`** and **`_wgetcwd_dbg`**, to allow you to debug memory allocations. For more information, see [`_getcwd_dbg`, `_wgetcwd_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getcwd-dbg-wgetcwd-dbg?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`Tchar.h` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_tgetcwd`**

**`_getcwd`**

**`_getcwd`**

**`_wgetcwd`**

## Requirements

Routine

Required header

**`_getcwd`**

`<direct.h>`

**`_wgetcwd`**

`<direct.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_getcwd.c
// Compile with: cl /W4 crt_getcwd.c
// This program places the name of the current directory in the
// buffer array, then displays the name of the current directory
// on the screen. Passing NULL as the buffer forces getcwd to allocate
// memory for the path, which allows the code to support file paths
// longer than _MAX_PATH, which are supported by NTFS.

#include <direct.h> // _getcwd
#include <stdlib.h> // free, perror
#include <stdio.h>  // printf
#include <string.h> // strlen

int main( void )
{
   char* buffer;

   // Get the current working directory:
   if ( (buffer = _getcwd( NULL, 0 )) == NULL )
      perror( "_getcwd error" );
   else
   {
      printf( "%s \nLength: %zu\n", buffer, strlen(buffer) );
      free(buffer);
   }
}
```

```
C:\Code
```

## See also

[Directory control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/directory-control?view=msvc-170)  
[`_chdir`, `_wchdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chdir-wchdir?view=msvc-170)  
[`_mkdir`, `_wmkdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mkdir-wmkdir?view=msvc-170)  
[`_rmdir`, `_wrmdir`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rmdir-wrmdir?view=msvc-170)