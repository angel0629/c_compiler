---
title: "_fullpath, _wfullpath"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fullpath-wfullpath?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Creates an absolute or full path name for the specified relative path name.

## Syntax

```
char *_fullpath(
   char *absPath,
   const char *relPath,
   size_t maxLength
);
wchar_t *_wfullpath(
   wchar_t *absPath,
   const wchar_t *relPath,
   size_t maxLength
);
```

### Parameters

_`absPath`_  
Pointer to a buffer containing the absolute or full path name, or `NULL`.

_`relPath`_  
Relative path name.

_`maxLength`_  
Maximum length of the absolute path name buffer (_`absPath`_). This length is in bytes for **`_fullpath`** but in wide characters (**`wchar_t`**) for **`_wfullpath`**.

## Return value

Each of these functions returns a pointer to a buffer containing the absolute path name (_`absPath`_). If there's an error (for example, if the value passed in _`relPath`_ includes a drive letter that isn't valid or can't be found, or if the length of the created absolute path name (_`absPath`_) is greater than _`maxLength`_), the function returns `NULL`.

The **`_fullpath`** function expands the relative path name in _`relPath`_ to its fully qualified or absolute path and stores this name in _`absPath`_. If _`absPath`_ is `NULL`, **`malloc`** is used to allocate a buffer of sufficient length to hold the path name. It's the responsibility of the caller to free this buffer. A relative path name specifies a path to another location from the current location (such as the current working directory: `.`). An absolute path name is the expansion of a relative path name that states the entire path required to reach the desired location from the root of the file system. Unlike **`_makepath`**, **`_fullpath`** can be used to obtain the absolute path name for relative paths (_`relPath`_) that include `./` or `../` in their names.

For example, to use C run-time routines, the application must include the header files that contain the declarations for the routines. Each header file `#include` directive references the location of the file in a relative manner (from the application's working directory):

```
#include <stdlib.h>
```

when the absolute path (actual file system location) of the file might be:

`\\machine\shareName\msvcSrc\crt\headerFiles\stdlib.h`

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

**`_fullpath`** automatically handles multibyte-character string arguments as appropriate, recognizing multibyte-character sequences according to the multibyte code page currently in use. **`_wfullpath`** is a wide-character version of **`_fullpath`**; the string arguments to **`_wfullpath`** are wide-character strings. **`_wfullpath`** and **`_fullpath`** behave identically except that **`_wfullpath`** doesn't handle multibyte-character strings.

If `_DEBUG` and `_CRTDBG_MAP_ALLOC` are both defined, calls to **`_fullpath`** and **`_wfullpath`** are replaced by calls to **`_fullpath_dbg`** and **`_wfullpath_dbg`**, to allow you to debug memory allocations. For more information, see [`_fullpath_dbg`, `_wfullpath_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fullpath-dbg-wfullpath-dbg?view=msvc-170).

This function invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170), if _`maxlen`_ is less than or equal to 0. If execution is allowed to continue, this function sets `errno` to `EINVAL` and returns `NULL`.

### Generic-text routine mappings

`Tchar.h` routine

`_UNICODE and _MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_tfullpath`**

**`_fullpath`**

**`_fullpath`**

**`_wfullpath`**

If the _`absPath`_ buffer is `NULL`, **`_fullpath`** calls [`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170) to allocate a buffer and ignores the _`maxLength`_ argument. It's the caller's responsibility to deallocate this buffer (using [`free`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free?view=msvc-170)) as appropriate. If the _`relPath`_ argument specifies a disk drive, the current directory of this drive is combined with the path.

## Requirements

Function

Required header

**`_fullpath`**

`<stdlib.h>`

**`_wfullpath`**

`<stdlib.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_fullpath.c
// This program demonstrates how _fullpath
// creates a full path from a partial path.

#include <stdio.h>
#include <conio.h>
#include <stdlib.h>
#include <direct.h>

void PrintFullPath( char * partialPath )
{
   char full[_MAX_PATH];
   if( _fullpath( full, partialPath, _MAX_PATH ) != NULL )
      printf( "Full path is: %s\n", full );
   else
      printf( "Invalid path\n" );
}

int main( void )
{
   PrintFullPath( "test" );
   PrintFullPath( "\\test" );
   PrintFullPath( "..\\test" );
}
```

```
Full path is: C:\Documents and Settings\user\My Documents\test
Full path is: C:\test
Full path is: C:\Documents and Settings\user\test
```

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`_getcwd`, `_wgetcwd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getcwd-wgetcwd?view=msvc-170)  
[`_getdcwd`, `_wgetdcwd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdcwd-wgetdcwd?view=msvc-170)  
[`_makepath`, `_wmakepath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/makepath-wmakepath?view=msvc-170)  
[`_splitpath`, `_wsplitpath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/splitpath-wsplitpath?view=msvc-170)