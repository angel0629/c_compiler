---
title: "_filelength, _filelengthi64"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/filelength-filelengthi64?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets the length of a file.

## Syntax

```
long _filelength(
   int fd
);
__int64 _filelengthi64(
   int fd
);
```

### Parameters

_`fd`_  
Target the file descriptor.

## Return value

Both **`_filelength`** and **`_filelengthi64`** return the file length, in bytes, of the target file associated with _`fd`_. If _`fd`_ is an invalid file descriptor, this function invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, both functions return -1L to indicate an error and set `errno` to `EBADF`.

## Remarks

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`_filelength`**

<io.h>

**`_filelengthi64`**

<io.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`_chsize`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chsize?view=msvc-170).

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`_chsize`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chsize?view=msvc-170)  
[`_fileno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fileno?view=msvc-170)  
[`_fstat`, `_fstat32`, `_fstat64`, `_fstati64`, `_fstat32i64`, `_fstat64i32`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fstat-fstat32-fstat64-fstati64-fstat32i64-fstat64i32?view=msvc-170)  
[`_stat`, `_wstat` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stat-functions?view=msvc-170)