---
title: "_spawnl, _wspawnl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/spawnl-wspawnl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Creates and executes a new process.

## Syntax

```
intptr_t _spawnl(
   int mode,
   const char *cmdname,
   const char *arg0,
   const char *arg1,
   ... const char *argn,
   NULL
);
intptr_t _wspawnl(
   int mode,
   const wchar_t *cmdname,
   const wchar_t *arg0,
   const wchar_t *arg1,
   ... const wchar_t *argn,
   NULL
);
```

### Parameters

_`mode`_  
Execution mode for the calling process.

_`cmdname`_  
Path of the file to be executed.

_`arg0`_, _`arg1`_, ... _`argN`_  
List of pointers to arguments. The _`arg0`_ argument is usually a pointer to _`cmdname`_. The arguments _`arg1`_ through _`argN`_ are pointers to the character strings forming the new argument list. Following _`argN`_, there must be a `NULL` pointer to mark the end of the argument list.

## Return value

The return value from a synchronous **`_spawnl`** or **`_wspawnl`** (`_P_WAIT` specified for _`mode`_) is the exit status of the new process. The return value from an asynchronous **`_spawnl`** or **`_wspawnl`** (`_P_NOWAIT` or `_P_NOWAITO` specified for _`mode`_) is the process handle. The exit status is 0 if the process terminated normally. You can set the exit status to a nonzero value if the spawned process specifically calls the `exit` routine with a nonzero argument. If the new process didn't explicitly set a positive exit status, a positive exit status indicates an abnormal exit with an abort or an interrupt. A return value of -1 indicates an error (the new process isn't started). In this case, `errno` is set to one of the following values.

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

For more information about these and other return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

These functions validate their parameters. If either _`cmdname`_ or _`arg0`_ is an empty string or a null pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EINVAL`, and return -1. No new process is spawned.

Each of these functions creates and executes a new process, passing each command-line argument as a separate parameter.

## Requirements

Routine

Required header

**`_spawnl`**

<process.h>

**`_wspawnl`**

<stdio.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example in [`_spawn`, `_wspawn` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/spawn-wspawn-functions?view=msvc-170).

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`_spawn`, `_wspawn` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/spawn-wspawn-functions?view=msvc-170)  
[`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170)  
[`atexit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atexit?view=msvc-170)  
[`_exec`, `_wexec` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/exec-wexec-functions?view=msvc-170)  
[`exit`, `_Exit`, `_exit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exit-exit-exit?view=msvc-170)  
[`_flushall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/flushall?view=msvc-170)  
[`_getmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getmbcp?view=msvc-170)  
[`_onexit`, `_onexit_m`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/onexit-onexit-m?view=msvc-170)  
[`_setmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmbcp?view=msvc-170)  
[`system`, `_wsystem`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/system-wsystem?view=msvc-170)