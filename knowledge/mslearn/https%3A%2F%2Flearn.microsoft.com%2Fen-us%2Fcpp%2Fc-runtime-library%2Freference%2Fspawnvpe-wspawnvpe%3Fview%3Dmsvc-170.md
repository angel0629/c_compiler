---
title: "_spawnvpe, _wspawnvpe"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/spawnvpe-wspawnvpe?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Creates and executes a new process.

## Syntax

```
intptr_t _spawnvpe(
   int mode,
   const char *cmdname,
   const char *const *argv,
   const char *const *envp
);
intptr_t _wspawnvpe(
   int mode,
   const wchar_t *cmdname,
   const wchar_t *const *argv,
   const wchar_t *const *envp
);
```

### Parameters

_`mode`_  
Execution mode for calling process

_`cmdname`_  
Path of file to be executed

_`argv`_  
Array of pointers to arguments. The argument _`argv[0]`_ is usually a pointer to a path in real mode or to the program name in protected mode, and _`argv[1]`_ through _`argv[n]`_ are pointers to the character strings forming the new argument list. The argument _`argv[n+1]`_ must be a `NULL` pointer to mark the end of the argument list.

_`envp`_  
Array of pointers to environment settings

## Return value

The return value from a synchronous **`_spawnvpe`** or **`_wspawnvpe`** (`_P_WAIT` specified for _`mode`_) is the exit status of the new process. The return value from an asynchronous **`_spawnvpe`** or **`_wspawnvpe`** (`_P_NOWAIT` or `_P_NOWAITO` specified for _`mode`_) is the process handle. The exit status is 0 if the process terminated normally. You can set the exit status to a nonzero value if the spawned process specifically calls the `exit` routine with a nonzero argument. If the new process didn't explicitly set a positive exit status, a positive exit status indicates an abnormal exit with an abort or an interrupt. A return value of -1 indicates an error (the new process isn't started). In this case, `errno` is set to one of the following values:

Value

Description

`E2BIG`

Argument list exceeds 1024 bytes.

`EINVAL`

_`mode`_ argument is invalid.

`ENOENT`

File or path isn't found.

`ENOEXEC`

Specified file isn't executable or has invalid executable-file format.

`ENOMEM`

Not enough memory is available to execute the new process.

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

Each of these functions creates and executes a new process, passing an array of pointers to command-line arguments and an array of pointers to environment settings. These functions use the `PATH` environment variable to find the file to execute.

These functions validate their parameters. If either _`cmdname`_ or _`argv`_ is a null pointer, or if _`argv`_ points to null pointer, or _`argv[0]`_ is an empty string, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170) . If execution is allowed to continue, these functions set `errno` to `EINVAL`, and return -1. No new process is spawned.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_spawnvpe`**

<stdio.h> or <process.h>

**`_wspawnvpe`**

<stdio.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example in [`_spawn`, `_wspawn` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/spawn-wspawn-functions?view=msvc-170).

## See also

[`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170)  
[`atexit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atexit?view=msvc-170)  
[`_exec`, `_wexec` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/exec-wexec-functions?view=msvc-170)  
[`exit`, `_Exit`, `_exit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exit-exit-exit?view=msvc-170)  
[`_flushall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/flushall?view=msvc-170)  
[`_getmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getmbcp?view=msvc-170)  
[`_onexit`, `_onexit_m`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/onexit-onexit-m?view=msvc-170)  
[`_setmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmbcp?view=msvc-170)  
[`system`, `_wsystem`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/system-wsystem?view=msvc-170)