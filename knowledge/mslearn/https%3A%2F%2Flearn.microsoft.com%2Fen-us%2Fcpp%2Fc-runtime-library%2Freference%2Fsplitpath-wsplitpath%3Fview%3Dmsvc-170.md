---
title: "_splitpath, _wsplitpath"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/splitpath-wsplitpath?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Break a path into components. For more secure versions of these functions are available, see [`_splitpath_s`, `_wsplitpath_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/splitpath-s-wsplitpath-s?view=msvc-170).

## Syntax

```
void _splitpath(
   const char *path,
   char *drive,
   char *dir,
   char *fname,
   char *ext
);
void _wsplitpath(
   const wchar_t *path,
   wchar_t *drive,
   wchar_t *dir,
   wchar_t *fname,
   wchar_t *ext
);
```

### Parameters

_`path`_  
Full path.

_`drive`_  
Drive letter, followed by a colon (**:**). You can pass `NULL` for this parameter if you don't need the drive letter.

_`dir`_  
Directory path, including trailing slash. Forward slashes (`/`), backslashes (`\`), or both may be used. Pass `NULL` for this parameter if you don't need the directory path.

_`fname`_  
Base filename (no extension). Pass `NULL` for this parameter if you don't need the filename.

_`ext`_  
Filename extension, including leading period (`.`). Pass `NULL` for this parameter if you don't need the filename extension.

The **`_splitpath`** function breaks a path into its four components. **`_splitpath`** automatically handles multibyte-character string arguments as appropriate, recognizing multibyte-character sequences according to the multibyte code page currently in use. **`_wsplitpath`** is a wide-character version of **`_splitpath`**; the arguments to **`_wsplitpath`** are wide-character strings. These functions behave identically otherwise.

**Security Note** These functions are subject to buffer overrun. Buffer overrun problems are a frequent method of system attack, resulting in an unwarranted elevation of privilege. For more information, see [Avoiding buffer overruns](https://learn.microsoft.com/en-us/windows/win32/SecBP/avoiding-buffer-overruns). More secure versions of these functions are available; see [`_splitpath_s`, `_wsplitpath_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/splitpath-s-wsplitpath-s?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tsplitpath`

**`_splitpath`**

**`_splitpath`**

**`_wsplitpath`**

Each component of the full path is stored in a separate buffer; the manifest constants `_MAX_DRIVE`, `_MAX_DIR`, `_MAX_FNAME`, and `_MAX_EXT` (defined in `STDLIB.H`) specify the maximum size for each file component. File components that are larger than the corresponding manifest constants cause heap corruption.

Each buffer must be as large as its corresponding manifest constant to avoid potential buffer overrun.

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

If the full path doesn't contain a component (for example, a filename), **`_splitpath`** assigns empty strings to the corresponding buffers.

You can pass `NULL` to **`_splitpath`** for any parameter other than _`path`_ that you don't need.

If _`path`_ is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL`.

## Requirements

Routine

Required header

**`_splitpath`**

`<stdlib.h>`

**`_wsplitpath`**

`<stdlib.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`_makepath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/makepath-wmakepath?view=msvc-170).

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`_fullpath`, `_wfullpath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fullpath-wfullpath?view=msvc-170)  
[`_getmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getmbcp?view=msvc-170)  
[`_makepath`, `_wmakepath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/makepath-wmakepath?view=msvc-170)  
[`_setmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmbcp?view=msvc-170)  
[`_splitpath_s`, `_wsplitpath_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/splitpath-s-wsplitpath-s?view=msvc-170)