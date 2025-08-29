---
title: "_commit"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/commit?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Flushes a file directly to disk.

## Syntax

```
int _commit(
   int fd
);
```

### Parameters

_`fd`_  
File descriptor referring to the open file.

## Return value

**`_commit`** returns 0 if the file was successfully flushed to disk. A return value of -1 indicates an error.

## Remarks

The **`_commit`** function forces the operating system to write the file associated with _`fd`_ to disk. This call ensures that the specified file is flushed immediately, not at the operating system's discretion.

If _`fd`_ is an invalid file descriptor, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the function returns -1 and `errno` is set to `EBADF`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

Optional headers

**`_commit`**

<io.h>

<errno.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Low-level I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/low-level-i-o?view=msvc-170)  
[`_creat`, `_wcreat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creat-wcreat?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)  
[`_read`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/read?view=msvc-170)  
[`_write`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/write?view=msvc-170)