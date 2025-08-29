---
title: "_makepath, _wmakepath"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/makepath-wmakepath?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Create a path name from components. More secure versions of these functions are available; see [`_makepath_s`, `_wmakepath_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/makepath-s-wmakepath-s?view=msvc-170).

## Syntax

```
void _makepath(
   char *path,
   const char *drive,
   const char *dir,
   const char *fname,
   const char *ext
);
void _wmakepath(
   wchar_t *path,
   const wchar_t *drive,
   const wchar_t *dir,
   const wchar_t *fname,
   const wchar_t *ext
);
```

### Parameters

_`path`_  
Full path buffer.

_`drive`_  
Contains a letter (A, B, and so on) corresponding to the desired drive and an optional trailing colon. **`_makepath`** inserts the colon automatically in the composite path if it's missing. If _`drive`_ is `NULL` or points to an empty string, no drive letter appears in the composite _`path`_ string.

_`dir`_  
Contains the path of directories, not including the drive designator or the actual file name. The trailing slash is optional, and either a forward slash (**`/`**) or a backslash (**`\`**) or both might be used in a single _`dir`_ argument. If no trailing slash (**`/`** or **`\`**) is specified, it's inserted automatically. If _`dir`_ is `NULL` or points to an empty string, no directory path is inserted in the composite _`path`_ string.

_`fname`_  
Contains the base file name without any file name extensions. If _`fname`_ is `NULL` or points to an empty string, no filename is inserted in the composite _`path`_ string.

_`ext`_  
Contains the actual file name extension, with or without a leading period (**`.`**). **`_makepath`** inserts the period automatically if it doesn't appear in _`ext`_. If _`ext`_ is `NULL` or points to an empty string, no extension is inserted in the composite _`path`_ string.

The **`_makepath`** function creates a composite path string from individual components, storing the result in _`path`_. The _`path`_ might include a drive letter, directory path, filename, and filename extension. **`_wmakepath`** is a wide-character version of **`_makepath`**; the arguments to **`_wmakepath`** are wide-character strings. **`_wmakepath`** and **`_makepath`** behave identically otherwise.

**Security Note** Use a null-terminated string. To avoid buffer overrun, the null-terminated string must not exceed the size of the _`path`_ buffer. **`_makepath`** doesn't ensure that the length of the composite path string doesn't exceed `_MAX_PATH`. For more information, see [Avoiding buffer overruns](https://learn.microsoft.com/en-us/windows/win32/SecBP/avoiding-buffer-overruns).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tmakepath`

**`_makepath`**

**`_makepath`**

**`_wmakepath`**

The _`path`_ argument must point to an empty buffer large enough to hold the complete path. The composite _`path`_ must be no larger than the `_MAX_PATH` constant, defined in Stdlib.h.

If path is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). In addition, `errno` is set to `EINVAL`. `NULL` values are allowed for all other parameters.

## Requirements

Routine

Required header

**`_makepath`**

<stdlib.h>

**`_wmakepath`**

<stdlib.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_makepath.c
#include <stdlib.h>
#include <stdio.h>

int main( void )
{
   char path_buffer[_MAX_PATH];
   char drive[_MAX_DRIVE];
   char dir[_MAX_DIR];
   char fname[_MAX_FNAME];
   char ext[_MAX_EXT];

   _makepath( path_buffer, "c", "\\sample\\crt\\", "makepath", "c" ); // C4996
   // Note: _makepath is deprecated; consider using _makepath_s instead
   printf( "Path created with _makepath: %s\n\n", path_buffer );
   _splitpath( path_buffer, drive, dir, fname, ext ); // C4996
   // Note: _splitpath is deprecated; consider using _splitpath_s instead
   printf( "Path extracted with _splitpath:\n" );
   printf( "   Drive: %s\n", drive );
   printf( "   Dir: %s\n", dir );
   printf( "   Filename: %s\n", fname );
   printf( "   Ext: %s\n", ext );
}
```

```
Path created with _makepath: c:\sample\crt\makepath.c

Path extracted with _splitpath:
   Drive: c:
   Dir: \sample\crt\
   Filename: makepath
   Ext: .c
```

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`_fullpath`, `_wfullpath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fullpath-wfullpath?view=msvc-170)  
[`_splitpath`, `_wsplitpath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/splitpath-wsplitpath?view=msvc-170)  
[`_makepath_s`, `_wmakepath_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/makepath-s-wmakepath-s?view=msvc-170)