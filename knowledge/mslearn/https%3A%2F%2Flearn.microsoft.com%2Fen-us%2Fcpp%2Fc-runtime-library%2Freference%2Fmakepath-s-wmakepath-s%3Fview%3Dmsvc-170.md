---
title: "_makepath_s, _wmakepath_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/makepath-s-wmakepath-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Creates a path name from components. These functions are versions of [`_makepath`, `_wmakepath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/makepath-wmakepath?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t _makepath_s(
   char *path,
   size_t sizeInBytes,
   const char *drive,
   const char *dir,
   const char *fname,
   const char *ext
);
errno_t _wmakepath_s(
   wchar_t *path,
   size_t sizeInWords,
   const wchar_t *drive,
   const wchar_t *dir,
   const wchar_t *fname,
   const wchar_t *ext
);
template <size_t size>
errno_t _makepath_s(
   char (&path)[size],
   const char *drive,
   const char *dir,
   const char *fname,
   const char *ext
); // C++ only
template <size_t size>
errno_t _wmakepath_s(
   wchar_t (&path)[size],
   const wchar_t *drive,
   const wchar_t *dir,
   const wchar_t *fname,
   const wchar_t *ext
); // C++ only
```

### Parameters

_`path`_  
Full path buffer.

_`sizeInWords`_  
Size of the buffer in words.

_`sizeInBytes`_  
Size of the buffer in bytes.

_`drive`_  
Contains a letter (A, B, and so on) corresponding to the desired drive and an optional trailing colon. **`_makepath_s`** inserts the colon automatically in the composite path if it's missing. If _`drive`_ is `NULL` or points to an empty string, no drive letter appears in the composite _`path`_ string.

_`dir`_  
Contains the path of directories, not including the drive designator or the actual file name. The trailing slash is optional, and either a forward slash (/) or a backslash (\\) or both might be used in a single _`dir`_ argument. If no trailing slash (/ or \\) is specified, it's inserted automatically. If _`dir`_ is `NULL` or points to an empty string, no directory path is inserted in the composite _`path`_ string.

_`fname`_  
Contains the base file name without any file name extensions. If _`fname`_ is `NULL` or points to an empty string, no filename is inserted in the composite _`path`_ string.

_`ext`_  
Contains the actual file name extension, with or without a leading period (.). **`_makepath_s`** inserts the period automatically if it doesn't appear in _`ext`_. If _`ext`_ is `NULL` or points to an empty string, no extension is inserted in the composite _`path`_ string.

## Return value

Zero if successful; an error code on failure.

### Error conditions

_`path`_

_`sizeInWords`_ / _`sizeInBytes`_

Return

Contents of _`path`_

`NULL`

any

`EINVAL`

not modified

any

<= 0

`EINVAL`

not modified

If any of the above error conditions occurs, these functions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the functions returns `EINVAL`. `NULL` is allowed for the parameters _`drive`_, _`fname`_, and _`ext`_. For information about the behavior when these parameters are null pointers or empty strings, see the Remarks section.

The **`_makepath_s`** function creates a composite path string from individual components, storing the result in _`path`_. The _`path`_ might include a drive letter, directory path, file name, and file name extension. **`_wmakepath_s`** is a wide-character version of **`_makepath_s`**; the arguments to **`_wmakepath_s`** are wide-character strings. **`_wmakepath_s`** and **`_makepath_s`** behave identically otherwise.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tmakepath_s`

**`_makepath_s`**

**`_makepath_s`**

**`_wmakepath_s`**

The _`path`_ argument must point to an empty buffer large enough to hold the complete path. The composite _`path`_ must be no larger than the `_MAX_PATH` constant, defined in Stdlib.h.

If path is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). In addition, `errno` is set to `EINVAL`. `NULL` values are allowed for all other parameters.

In C++, using these functions is simplified by template overloads; the overloads can infer buffer length automatically (eliminating the need to specify a size argument) and they can automatically replace older, non-secure functions with their newer, secure counterparts. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

The debug library versions of these functions first fill the buffer with 0xFE. To disable this behavior, use [`_CrtSetDebugFillThreshold`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdebugfillthreshold?view=msvc-170).

## Requirements

Routine

Required header

**`_makepath_s`**

<stdlib.h>

**`_wmakepath_s`**

<stdlib.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_makepath_s.c

#include <stdlib.h>
#include <stdio.h>

int main( void )
{
   char path_buffer[_MAX_PATH];
   char drive[_MAX_DRIVE];
   char dir[_MAX_DIR];
   char fname[_MAX_FNAME];
   char ext[_MAX_EXT];
   errno_t err;

   err = _makepath_s( path_buffer, _MAX_PATH, "c", "\\sample\\crt\\",
                      "crt_makepath_s", "c" );
   if (err != 0)
   {
      printf("Error creating path. Error code %d.\n", err);
      exit(1);
   }
   printf( "Path created with _makepath_s: %s\n\n", path_buffer );
   err = _splitpath_s( path_buffer, drive, _MAX_DRIVE, dir, _MAX_DIR, fname,
                       _MAX_FNAME, ext, _MAX_EXT );
   if (err != 0)
   {
      printf("Error splitting the path. Error code %d.\n", err);
      exit(1);
   }
   printf( "Path extracted with _splitpath_s:\n" );
   printf( "   Drive: %s\n", drive );
   printf( "   Dir: %s\n", dir );
   printf( "   Filename: %s\n", fname );
   printf( "   Ext: %s\n", ext );
}
```

```
Path created with _makepath_s: c:\sample\crt\crt_makepath_s.c

Path extracted with _splitpath_s:
   Drive: c:
   Dir: \sample\crt\
   Filename: crt_makepath_s
   Ext: .c
```

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`_fullpath`, `_wfullpath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fullpath-wfullpath?view=msvc-170)  
[`_splitpath_s`, `_wsplitpath_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/splitpath-s-wsplitpath-s?view=msvc-170)  
[`_makepath`, `_wmakepath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/makepath-wmakepath?view=msvc-170)