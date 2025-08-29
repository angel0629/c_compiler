---
title: "_splitpath_s, _wsplitpath_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/splitpath-s-wsplitpath-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Breaks a path name into components. These functions are versions of [`_splitpath`, `_wsplitpath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/splitpath-wsplitpath?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t _splitpath_s(
   const char * path,
   char * drive,
   size_t driveNumberOfElements,
   char * dir,
   size_t dirNumberOfElements,
   char * fname,
   size_t nameNumberOfElements,
   char * ext,
   size_t extNumberOfElements
);
errno_t _wsplitpath_s(
   const wchar_t * path,
   wchar_t * drive,
   size_t driveNumberOfElements,
   wchar_t *dir,
   size_t dirNumberOfElements,
   wchar_t * fname,
   size_t nameNumberOfElements,
   wchar_t * ext,
   size_t extNumberOfElements
);
template <size_t drivesize, size_t dirsize, size_t fnamesize, size_t extsize>
errno_t _splitpath_s(
   const char *path,
   char (&drive)[drivesize],
   char (&dir)[dirsize],
   char (&fname)[fnamesize],
   char (&ext)[extsize]
); // C++ only
template <size_t drivesize, size_t dirsize, size_t fnamesize, size_t extsize>
errno_t _wsplitpath_s(
   const wchar_t *path,
   wchar_t (&drive)[drivesize],
   wchar_t (&dir)[dirsize],
   wchar_t (&fname)[fnamesize],
   wchar_t (&ext)[extsize]
); // C++ only
```

### Parameters

_`path`_  
Full path.

_`drive`_  
Drive letter, followed by a colon (**`:`**). You can pass `NULL` for this parameter if you don't need the drive letter.

_`driveNumberOfElements`_  
The size of the _`drive`_ buffer in single-byte or wide characters. If _`drive`_ is `NULL`, this value must be 0.

_`dir`_  
Directory path, including trailing slash. Forward slashes ( **`/`** ), backslashes ( **`\\`** ), or both may be used. You can pass `NULL` for this parameter if you don't need the directory path.

_`dirNumberOfElements`_  
The size of the _`dir`_ buffer in single-byte or wide characters. If _`dir`_ is `NULL`, this value must be 0.

_`fname`_  
Base filename (without extension). You can pass `NULL` for this parameter if you don't need the filename.

_`nameNumberOfElements`_  
The size of the _`fname`_ buffer in single-byte or wide characters. If _`fname`_ is `NULL`, this value must be 0.

_`ext`_  
Filename extension, including leading period (**`.`**). You can pass `NULL` for this parameter if you don't need the filename extension.

_`extNumberOfElements`_  
The size of _`ext`_ buffer in single-byte or wide characters. If _`ext`_ is `NULL`, this value must be 0.

## Return value

Zero if successful; an error code on failure.

### Error conditions

Condition

Return value

_`path`_ is `NULL`

`EINVAL`

_`drive`_ is `NULL`, _`driveNumberOfElements`_ is non-zero

`EINVAL`

_`drive`_ is non-`NULL`, _`driveNumberOfElements`_ is zero

`EINVAL`

_`dir`_ is `NULL`, _`dirNumberOfElements`_ is non-zero

`EINVAL`

_`dir`_ is non-`NULL`, _`dirNumberOfElements`_ is zero

`EINVAL`

_`fname`_ is `NULL`, _`nameNumberOfElements`_ is non-zero

`EINVAL`

_`fname`_ is non-`NULL`, _`nameNumberOfElements`_ is zero

`EINVAL`

_`ext`_ is `NULL`, _`extNumberOfElements`_ is non-zero

`EINVAL`

_`ext`_ is non-`NULL`, _`extNumberOfElements`_ is zero

`EINVAL`

If any of the above conditions occurs, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170) . If execution is allowed to continue, these functions set `errno` to `EINVAL` and return `EINVAL`.

If any of the buffers is too short to hold the result, these functions clear all the buffers to empty strings, set `errno` to `ERANGE`, and return `ERANGE`.

The **`_splitpath_s`** function breaks a path into its four components. **`_splitpath_s`** automatically handles multibyte-character string arguments as appropriate, recognizing multibyte-character sequences according to the multibyte code page currently in use. **`_wsplitpath_s`** is a wide-character version of **`_splitpath_s`**; the arguments to **`_wsplitpath_s`** are wide-character strings. These functions behave identically otherwise

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tsplitpath_s`

**`_splitpath_s`**

**`_splitpath_s`**

**`_wsplitpath_s`**

Each component of the full path is stored in a separate buffer; the manifest constants `_MAX_DRIVE`, `_MAX_DIR`, `_MAX_FNAME`, and `_MAX_EXT` (defined in `STDLIB.H`) specify the maximum allowable size for each file component. File components larger than the corresponding manifest constants cause heap corruption.

The following table lists the values of the manifest constants.

Name

Value

`_MAX_DRIVE`

3

`_MAX_DIR`

256

`_MAX_FNAME`

256

`_MAX_EXT`

256

If the full path doesn't contain a component (for example, a filename), **`_splitpath_s`** assigns an empty string to the corresponding buffer.

In C++, using these functions is simplified by template overloads; the overloads can infer buffer length automatically, eliminating the need to specify a size argument. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

The debug library versions of these functions first fill the buffer with 0xFE. To disable this behavior, use [`_CrtSetDebugFillThreshold`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdebugfillthreshold?view=msvc-170).

## Requirements

Routine

Required header

**`_splitpath_s`**

`<stdlib.h>`

**`_wsplitpath_s`**

`<stdlib.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`_makepath_s`, `_wmakepath_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/makepath-s-wmakepath-s?view=msvc-170).

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`_splitpath`, `_wsplitpath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/splitpath-wsplitpath?view=msvc-170)  
[`_fullpath`, `_wfullpath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fullpath-wfullpath?view=msvc-170)  
[`_getmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getmbcp?view=msvc-170)  
[`_makepath`, `_wmakepath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/makepath-wmakepath?view=msvc-170)  
[`_setmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmbcp?view=msvc-170)