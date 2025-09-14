---
title: "system, _wsystem"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/system-wsystem?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Executes a command.

## Syntax

```
int system(
   const char *command
);
int _wsystem(
   const wchar_t *command
);
```

### Parameters

_`command`_  
The command to be executed.

## Return value

If _`command`_ is `NULL` and the command interpreter is found, returns a nonzero value. If the command interpreter isn't found, returns 0 and sets `errno` to `ENOENT`. If _`command`_ isn't `NULL`, **`system`** returns the value that is returned by the command interpreter. It returns the value 0 only if the command interpreter returns the value 0. A return value of -1 indicates an error, and `errno` is set to one of the following values:

Value

Description

`E2BIG`

The argument list (which is system-dependent) is too large.

`ENOENT`

The command interpreter can't be found.

`ENOEXEC`

The command-interpreter file can't be executed because the format isn't valid.

`ENOMEM`

Not enough memory is available to execute command; or available memory has been corrupted; or a non-valid block exists, which indicates that the calling process has been allocated incorrectly.

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`system`** function passes _`command`_ to the command interpreter, which executes the string as an operating-system command. **`system`** uses the `COMSPEC` and `PATH` environment variables to locate the command-interpreter file CMD.exe. If _`command`_ is `NULL`, the function just checks whether the command interpreter exists.

You must explicitly flush, by using [`fflush`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fflush?view=msvc-170) or [`_flushall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/flushall?view=msvc-170), or close any stream before you call **`system`**.

**`_wsystem`** is a wide-character version of **`system`**; the _`command`_ argument to **`_wsystem`** is a wide-character string. These functions behave identically otherwise.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_tsystem`**

**`system`**

**`system`**

**`_wsystem`**

## Requirements

Routine

Required header

**`system`**

`<process.h>` or `<stdlib.h>`

**`_wsystem`**

`<process.h>` or `<stdlib.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

This example uses **`system`** to TYPE a text file.

```
// crt_system.c

#include <process.h>

int main( void )
{
   system( "type crt_system.txt" );
}
```

### Input: crt\_system.txt

```
Line one.
Line two.
```

### Output

```
Line one.
Line two.
```

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`_exec`, `_wexec` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/exec-wexec-functions?view=msvc-170)  
[`exit`, `_Exit`, `_exit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exit-exit-exit?view=msvc-170)  
[`_flushall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/flushall?view=msvc-170)  
[`_spawn`, `_wspawn` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/spawn-wspawn-functions?view=msvc-170)