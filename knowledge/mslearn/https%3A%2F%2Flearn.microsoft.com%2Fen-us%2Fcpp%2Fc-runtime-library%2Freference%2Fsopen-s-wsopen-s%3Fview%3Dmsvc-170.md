---
title: "_sopen_s, _wsopen_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sopen-s-wsopen-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Opens a file for sharing. These versions of [`_sopen` and `_wsopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sopen-wsopen?view=msvc-170) have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t _sopen_s(
   int* pfh,
   const char *filename,
   int oflag,
   int shflag,
   int pmode
);
errno_t _wsopen_s(
   int* pfh,
   const wchar_t *filename,
   int oflag,
   int shflag,
   int pmode
);
```

### Parameters

_`pfh`_  
The file handle, or -1 if there's an error.

_`filename`_  
File name.

_`oflag`_  
The kind of operations allowed.

_`shflag`_  
The kind of sharing allowed.

_`pmode`_  
Permission setting.

## Return value

A nonzero return value indicates an error; in that case `errno` is set to one of the following values.

`errno` value

Condition

`EACCES`

The given path is a directory, or the file is read-only, but an open-for-writing operation was attempted.

`EEXIST`

`_O_CREAT` and `_O_EXCL` flags were specified, but _`filename`_ already exists.

`EINVAL`

Invalid _`oflag`_, _`shflag`_, or _`pmode`_ argument, or _`pfh`_ or _`filename`_ was a null pointer.

`EMFILE`

No more file descriptors available.

`ENOENT`

File or path not found.

If an invalid argument is passed to the function, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL`, and `EINVAL` is returned.

For more information about these and other return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

If there's an error, -1 is returned through _`pfh`_ (unless _`pfh`_ is a null pointer).

The **`_sopen_s`** function opens the file specified by _`filename`_ and prepares the file for shared reading or writing, as defined by _`oflag`_ and _`shflag`_. **`_wsopen_s`** is a wide-character version of **`_sopen_s`**; the _`filename`_ argument to **`_wsopen_s`** is a wide-character string. **`_wsopen_s`** and **`_sopen_s`** behave identically otherwise.

By default, this function's global state is scoped to the application. To change it, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`Tchar.h` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_tsopen_s`**

**`_sopen_s`**

**`_sopen_s`**

**`_wsopen_s`**

The integer expression _`oflag`_ is formed by combining one or more manifest constants, which are defined in `<fcntl.h>`. When two or more constants form the argument _`oflag`_, they're combined with the bitwise-OR operator ( **`|`** ).

_`oflag`_ constant

Behavior

`_O_APPEND`

Moves the file pointer to the end of the file before every write operation.

`_O_BINARY`

Opens the file in binary (untranslated) mode. (See [`fopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170) for a description of binary mode.)

`_O_CREAT`

Creates a file and opens it for writing. Has no effect if the file specified by _`filename`_ exists. The _`pmode`_ argument is required when `_O_CREAT` is specified.

**`_O_CREAT | _O_SHORT_LIVED`**

Creates a file as temporary and if possible doesn't flush to disk. The _`pmode`_ argument is required when `_O_CREAT` is specified.

**`_O_CREAT | _O_TEMPORARY`**

Creates a file as temporary; the file is deleted when the last file descriptor is closed. The _`pmode`_ argument is required when `_O_CREAT` is specified. To preserve legacy behavior for app-compatibility, other processes aren't prevented from deleting this file.

**`_O_CREAT | _O_EXCL`**

Returns an error value if a file specified by _`filename`_ exists. Applies only when used with `_O_CREAT`.

`_O_NOINHERIT`

Prevents creation of a shared file descriptor.

`_O_RANDOM`

Specifies that caching is optimized for, but not restricted to, random access from disk.

`_O_RDONLY`

Opens a file for reading only. Can't be specified with `_O_RDWR` or `_O_WRONLY`.

`_O_RDWR`

Opens a file for both reading and writing. Can't be specified with `_O_RDONLY` or `_O_WRONLY`.

`_O_SEQUENTIAL`

Specifies that caching is optimized for, but not restricted to, sequential access from disk.

`_O_TEXT`

Opens a file in ANSI text (translated) mode. For more information, see [Text and binary mode file I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/text-and-binary-mode-file-i-o?view=msvc-170) and [`fopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170).

`_O_TRUNC`

Opens a file and truncates it to zero length; the file must have write permission. Can't be specified with `_O_RDONLY`. `_O_TRUNC` used with `_O_CREAT` opens an existing file or creates a file. **Note:** The `_O_TRUNC` flag destroys the contents of the specified file.

`_O_WRONLY`

Opens a file for writing only. Can't be specified with `_O_RDONLY` or `_O_RDWR`.

`_O_U16TEXT`

Opens a file in Unicode UTF-16 mode.

`_O_U8TEXT`

Opens a file in Unicode UTF-8 mode.

`_O_WTEXT`

Opens a file in Unicode mode.

To specify the file access mode, you must specify either `_O_RDONLY`, `_O_RDWR`, or `_O_WRONLY`. There's no default value for the access mode.

When a file is opened in Unicode mode by using `_O_WTEXT`, `_O_U8TEXT`, or `_O_U16TEXT`, input functions translate the data that's read from the file into UTF-16 data stored as type **`wchar_t`**. Functions that write to a file opened in Unicode mode expect buffers that contain UTF-16 data stored as type **`wchar_t`**. If the file is encoded as UTF-8, then UTF-16 data is translated into UTF-8 when it's written. The file's UTF-8-encoded content is translated into UTF-16 when it's read. An attempt to read or write an odd number of bytes in Unicode mode causes a parameter validation error. To read or write data that's stored in your program as UTF-8, use a text or binary file mode instead of a Unicode mode. You're responsible for any required encoding translation.

If **`_sopen_s`** is called with **`_O_WRONLY | _O_APPEND`** (append mode) and `_O_WTEXT`, `_O_U16TEXT`, or `_O_U8TEXT`, it first tries to open the file for reading and writing, read the BOM, then reopen it for writing only. If opening the file for reading and writing fails, it opens the file for writing only and uses the default value for the Unicode mode setting.

The argument _`shflag`_ is a constant expression that consists of one of the following manifest constants, which are defined in `<share.h>`.

_`shflag`_ constant

Behavior

`_SH_DENYRW`

Denies read and write access to a file.

`_SH_DENYWR`

Denies write access to a file.

`_SH_DENYRD`

Denies read access to a file.

`_SH_DENYNO`

Permits read and write access.

The _`pmode`_ argument is always required, unlike in **`_sopen`**. When you specify `_O_CREAT`, if the file doesn't exist, _`pmode`_ specifies the file's permission settings, which are set when the new file is closed the first time. Otherwise, _`pmode`_ is ignored. _`pmode`_ is an integer expression that contains one or both of the manifest constants `_S_IWRITE` and `_S_IREAD`, which are defined in `<sys\stat.h>`. When both constants are given, they're combined with the bitwise-OR operator. The meaning of _`pmode`_ is as follows.

_`pmode`_

Meaning

`_S_IREAD`

Only reading permitted.

`_S_IWRITE`

Writing permitted. (In effect, permits reading and writing.)

**`_S_IREAD | _S_IWRITE`**

Reading and writing permitted.

If write permission isn't given, the file is read-only. In the Windows operating system, all files are readable; it isn't possible to give write-only permission. Therefore, the modes `_S_IWRITE` and **`_S_IREAD | _S_IWRITE`** are equivalent.

**`_sopen_s`** applies the current file-permission mask to _`pmode`_ before the permissions are set. (See [`_umask`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/umask?view=msvc-170).)

## Requirements

Function

Required header

Optional header

**`_sopen_s`**

`<io.h>`

`<fcntl.h>`, `<sys\types.h>`, `<sys\stat.h>`, `<share.h>`

**`_wsopen_s`**

`<io.h>` or `<wchar.h>`

`<fcntl.h>`, `<sys/types.h>`, `<sys/stat.h>`, `<share.h>`

**`_sopen_s`** and **`_wsopen_s`** are Microsoft extensions. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`_locking`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/locking?view=msvc-170).

## See also

[Low-level I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/low-level-i-o?view=msvc-170)  
[`_close`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/close?view=msvc-170)  
[`_creat`, `_wcreat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creat-wcreat?view=msvc-170)  
[`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170)  
[`_fsopen`, `_wfsopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fsopen-wfsopen?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)