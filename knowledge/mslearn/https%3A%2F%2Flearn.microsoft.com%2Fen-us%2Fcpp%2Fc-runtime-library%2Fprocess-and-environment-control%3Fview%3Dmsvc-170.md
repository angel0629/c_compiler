---
title: "Process and Environment Control"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Use the process-control routines to start, stop, and manage processes from within a program. Use the environment-control routines to get and change information about the operating-system environment.

## Process and environment control functions

Routine

Use

[`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170)

Abort process without flushing buffers or calling functions registered by **`atexit`** and **`_onexit`**

[`assert`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-macro-assert-wassert?view=msvc-170)

Test for logic error

[`_ASSERT`, `_ASSERTE`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-asserte-assert-expr-macros?view=msvc-170) macros

Similar to **`assert`**, but only available in the debug versions of the run-time libraries

[`atexit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atexit?view=msvc-170)

Schedule routines for execution at program termination

[`_beginthread`, `_beginthreadex`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/beginthread-beginthreadex?view=msvc-170)

Create a new thread on a Windows operating system process

[`_cexit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cexit-c-exit?view=msvc-170)

Perform **`exit`** termination procedures (such as flushing buffers), then return control to calling program without terminating process

[`_c_exit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cexit-c-exit?view=msvc-170)

Perform **`_exit`** termination procedures, then return control to calling program without terminating process

[`_cwait`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cwait?view=msvc-170)

Wait until another process terminates

[`_endthread`, `_endthreadex`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/endthread-endthreadex?view=msvc-170)

Terminate a Windows operating system thread

[`_execl`, `_wexecl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/execl-wexecl?view=msvc-170)

Execute new process with argument list

[`_execle`, `_wexecle`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/execle-wexecle?view=msvc-170)

Execute new process with argument list and given environment

[`_execlp`, `_wexeclp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/execlp-wexeclp?view=msvc-170)

Execute new process using `PATH` variable and argument list

[`_execlpe`, `_wexeclpe`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/execlpe-wexeclpe?view=msvc-170)

Execute new process using `PATH` variable, given environment, and argument list

[`_execv`, `_wexecv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/execv-wexecv?view=msvc-170)

Execute new process with argument array

[`_execve`, `_wexecve`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/execve-wexecve?view=msvc-170)

Execute new process with argument array and given environment

[`_execvp`, `_wexecvp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/execvp-wexecvp?view=msvc-170)

Execute new process using `PATH` variable and argument array

[`_execvpe`, `_wexecvpe`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/execvpe-wexecvpe?view=msvc-170)

Execute new process using `PATH` variable, given environment, and argument array

[`exit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exit-exit-exit?view=msvc-170)

Call functions registered by **`atexit`** and **`_onexit`**, flush all buffers, close all open files, and terminate process

[`_exit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exit-exit-exit?view=msvc-170)

Terminate process immediately without calling **`atexit`** or **`_onexit`** or flushing buffers

[`getenv`, `_wgetenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-wgetenv?view=msvc-170), [`getenv_s`, `_wgetenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-s-wgetenv-s?view=msvc-170)

Get value of environment variable

[`_getpid`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getpid?view=msvc-170)

Get process ID number

[`longjmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/longjmp?view=msvc-170)

Restore saved stack environment; use it to execute a nonlocal **`goto`**

[`_onexit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/onexit-onexit-m?view=msvc-170)

Schedule routines for execution at program termination; use for compatibility with Microsoft C/C++ version 7.0 and earlier

[`_pclose`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/pclose?view=msvc-170)

Wait for new command processor and close stream on associated pipe

[`perror`, `_wperror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/perror-wperror?view=msvc-170)

Print error message

[`_pipe`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/pipe?view=msvc-170)

Create pipe for reading and writing

[`_popen`, `_wpopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/popen-wpopen?view=msvc-170)

Create pipe and execute command

[`_putenv`, `_wputenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-wputenv?view=msvc-170), [`_putenv_s`, `_wputenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-s-wputenv-s?view=msvc-170)

Add or change value of environment variable

[`raise`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/raise?view=msvc-170)

Send signal to calling process

[`setjmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setjmp?view=msvc-170)

Save stack environment; use to execute non local **`goto`**

[`signal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/signal?view=msvc-170)

Handle interrupt signal

[`_spawnl`, `_wspawnl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/spawnl-wspawnl?view=msvc-170)

Create and execute new process with specified argument list

[`_spawnle`, `_wspawnle`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/spawnle-wspawnle?view=msvc-170)

Create and execute new process with specified argument list and environment

[`_spawnlp`, `_wspawnlp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/spawnlp-wspawnlp?view=msvc-170)

Create and execute new process using `PATH` variable and specified argument list

[`_spawnlpe`, `_wspawnlpe`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/spawnlpe-wspawnlpe?view=msvc-170)

Create and execute new process using `PATH` variable, specified environment, and argument list

[`_spawnv`, `_wspawnv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/spawnv-wspawnv?view=msvc-170)

Create and execute new process with specified argument array

[`_spawnve`, `_wspawnve`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/spawnve-wspawnve?view=msvc-170)

Create and execute new process with specified environment and argument array

[`_spawnvp`, `_wspawnvp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/spawnvp-wspawnvp?view=msvc-170)

Create and execute new process using `PATH` variable and specified argument array

[`_spawnvpe`, `_wspawnvpe`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/spawnvpe-wspawnvpe?view=msvc-170)

Create and execute new process using `PATH` variable, specified environment, and argument array

[`system`, `_wsystem`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/system-wsystem?view=msvc-170)

Execute operating-system command

In the Windows operating system, the spawned process is equivalent to the spawning process. Any process can use **`_cwait`** to wait for any other process for which the process ID is known.

The difference between the **`_exec`** and **`_spawn`** families is that a **`_spawn`** function can return control from the new process to the calling process. In a **`_spawn`** function, both the calling process and the new process are present in memory unless `_P_OVERLAY` is specified. In an **`_exec`** function, the new process overlays the calling process, so control can't return to the calling process unless an error occurs in the attempt to start execution of the new process.

The differences among the functions in the **`_exec`** and **`_spawn`** families involve the method of locating the file to be executed as the new process, the form in which arguments are passed to the new process, and the method of setting the environment, as shown in the following table. Use a function that passes an argument list when the number of arguments is constant or is known at compile time. Use a function that passes a pointer to an array containing the arguments when the number of arguments is to be determined at run time. The information in the following table also applies to the wide-character counterparts of the **`_spawn`** and **`_exec`** functions.

### `_spawn` and `_exec` Function Families

Functions

Use `PATH` variable to locate file

Argument-passing convention

Environment settings

**`_execl`**, **`_spawnl`**

No

List

Inherited from calling process

**`_execle`**, **`_spawnle`**

No

List

Pointer to environment table for new process passed as last argument

**`_execlp`**, **`_spawnlp`**

Yes

List

Inherited from calling process

**`_execvpe`**, **`_spawnvpe`**

Yes

Array

Pointer to environment table for new process passed as last argument

**`_execlpe`**, **`_spawnlpe`**

Yes

List

Pointer to environment table for new process passed as last argument

**`_execv`**, **`_spawnv`**

No

Array

Inherited from calling process

**`_execve`**, **`_spawnve`**

No

Array

Pointer to environment table for new process passed as last argument

**`_execvp`**, **`_spawnvp`**

Yes

Array

Inherited from calling process

## See also

[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)