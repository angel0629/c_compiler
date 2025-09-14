---
title: "_execle, _wexecle"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/execle-wexecle?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Loads and executes new child processes.

## Syntax

```
intptr_t _execle(
   const char *cmdname,
   const char *arg0,
   ... const char *argn,
   NULL,
   const char *const *envp
);
intptr_t _wexecle(
   const wchar_t *cmdname,
   const wchar_t *arg0,
   ... const wchar_t *argn,
   NULL,
   const char *const *envp
);
```

### Parameters

_`cmdname`_  
Path of the file to execute.

_`arg0`_, ... _`argN`_  
List of pointers to parameters.

_`envp`_  
Array of pointers to environment settings.

## Return value

If successful, these functions don't return to the calling process. A return value of -1 indicates an error, in which case the `errno` global variable is set.

`errno` value

Description

`E2BIG`

The space that's required for the arguments and the environment settings exceeds 32 KB.

`EACCES`

The specified file has a locking or sharing violation.

`EINVAL`

Invalid parameter.

`EMFILE`

Too many files are open. (The specified file must be opened to determine whether it's executable.)

`ENOENT`

The file or path isn't found.

`ENOEXEC`

The specified file isn't executable or has an invalid executable-file format.

`ENOMEM`

Not enough memory is available to execute the new process; the available memory has been corrupted; or an invalid block exists, which indicates that the calling process wasn't allocated correctly.

For more information about these return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

Each of these functions loads and executes a new process, and passes each command-line argument as a separate parameter and passes an array of pointers to environment settings.

The **`_execle`** functions validate their parameters. If _`cmdname`_ or _`arg0`_ is a null pointer or an empty string, these functions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EINVAL` and return -1. No new process is launched.

## Requirements

Function

Required header

Optional header

**`_execle`**

<process.h>

<errno.h>

**`_wexecle`**

<process.h> or <wchar.h>

<errno.h>

For more information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example in [`_exec`, `_wexec` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/exec-wexec-functions?view=msvc-170).

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`_exec`, `_wexec` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/exec-wexec-functions?view=msvc-170)  
[`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170)  
[`atexit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atexit?view=msvc-170)  
[`exit`, `_Exit`, `_exit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exit-exit-exit?view=msvc-170)  
[`_onexit`, `_onexit_m`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/onexit-onexit-m?view=msvc-170)  
[`_spawn`, `_wspawn` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/spawn-wspawn-functions?view=msvc-170)  
[`system`, `_wsystem`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/system-wsystem?view=msvc-170)