---
title: "_exec, _wexec Functions"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/exec-wexec-functions?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Each function in this family loads and executes a new process:

The letter at the end of the function name determines the variation.

`_exec` function suffix

Description

`e`

`envp`, array of pointers to environment settings, is passed to the new process.

`l`

Command-line arguments are passed individually to `_exec` function. Typically used when the number of parameters to the new process is known in advance.

`p`

`PATH` environment variable is used to find the file to execute.

`v`

`argv`, array of pointers to command-line arguments, is passed to `_exec`. Typically used when the number of parameters to the new process is variable.

Each `_exec` function loads and executes a new process. All `_exec` functions use the same operating-system function ([`CreateProcess`](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-createprocessw)). The `_exec` functions automatically handle multibyte-character string arguments as appropriate, recognizing multibyte-character sequences according to the multibyte code page currently in use. The `_wexec` functions are wide-character versions of the `_exec` functions. The `_wexec` functions behave identically to their `_exec` family counterparts except that they don't handle multibyte-character strings.

### Generic-text routine mappings

`Tchar.h` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_texecl`

**`_execl`**

**`_execl`**

**`_wexecl`**

`_texecle`

**`_execle`**

**`_execle`**

**`_wexecle`**

`_texeclp`

**`_execlp`**

**`_execlp`**

**`_wexeclp`**

`_texeclpe`

**`_execlpe`**

**`_execlpe`**

**`_wexeclpe`**

`_texecv`

**`_execv`**

**`_execv`**

**`_wexecv`**

`_texecve`

**`_execve`**

**`_execve`**

**`_wexecve`**

`_texecvp`

**`_execvp`**

**`_execvp`**

**`_wexecvp`**

`_texecvpe`

**`_execvpe`**

**`_execvpe`**

**`_wexecvpe`**

The `cmdname` parameter specifies the file to be executed as the new process. It can specify a full path (from the root), a partial path (from the current working directory), or a file name. If `cmdname` doesn't have a file name extension or doesn't end with a period (.), the `_exec` function searches for the named file. If the search is unsuccessful, it tries the same base name with the .com file name extension and then with the .exe, .bat, and .cmd file name extensions. If `cmdname` has a file name extension, only that extension is used in the search. If `cmdname` ends with a period, the `_exec` function searches for `cmdname` with no file name extension. **`_execlp`**, **`_execlpe`**, **`_execvp`**, and **`_execvpe`** search for `cmdname` (using the same procedures) in the directories specified by the `PATH` environment variable. If `cmdname` contains a drive specifier or any slashes (that is, if it's a relative path), the `_exec` call searches only for the specified file; the path isn't searched.

Parameters are passed to the new process by giving one or more pointers to character strings as parameters in the `_exec` call. These character strings form the parameter list for the new process. The combined length of the inherited environment settings and the strings forming the parameter list for the new process must not exceed 32 kilobytes. The terminating `NULL` character (`\0`) for each string isn't included in the count, but space characters (inserted automatically to separate the parameters) are counted.

Note

Spaces embedded in strings may cause unexpected behavior; for example, passing `_exec` the string `"hi there"` will result in the new process getting two arguments, `"hi"` and `"there"`. If the intent was to have the new process open a file named "hi there", the process would fail. You can avoid this by quoting the string: `"\"hi there\""`.

Important

Do not pass user input to `_exec` without explicitly checking its content. `_exec` will result in a call to [`CreateProcess`](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-createprocessw) so keep in mind that unqualified path names could lead to potential security vulnerabilities.

The `_exec` functions validate their parameters. If expected parameters are null pointers, empty strings, or omitted, the `_exec` functions invoke the invalid parameter handler as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EINVAL` and return -1. No new process is executed.

The argument pointers can be passed as separate parameters (in **`_execl`**, **`_execle`**, **`_execlp`**, and **`_execlpe`**) or as an array of pointers (in **`_execv`**, **`_execve`**, **`_execvp`**, and **`_execvpe`**). At least one parameter, `arg0`, must be passed to the new process; this parameter is `argv[0]` of the new process. Usually, this parameter is a copy of `cmdname`. (A different value doesn't produce an error.)

The **`_execl`**, **`_execle`**, **`_execlp`**, and **`_execlpe`** calls are typically used when the number of parameters is known in advance. The parameter `arg0` is usually a pointer to `cmdname`. The parameters `arg1` through `argn` point to the character strings forming the new parameter list. A null pointer must follow `argn` to mark the end of the parameter list.

The **`_execv`**, **`_execve`**, **`_execvp`**, and **`_execvpe`** calls are useful when the number of parameters to the new process is variable. Pointers to the parameters are passed as an array, `argv`. The parameter `argv[0]` is usually a pointer to `cmdname`. The parameters `argv[1]` through `argv[n]` point to the character strings forming the new parameter list. The parameter `argv[n+1]` must be a `NULL` pointer to mark the end of the parameter list.

Files that are open when an `_exec` call is made remain open in the new process. In **`_execl`**, **`_execlp`**, **`_execv`**, and **`_execvp`** calls, the new process inherits the environment of the calling process. **`_execle`**, **`_execlpe`**, **`_execve`**, and **`_execvpe`** calls alter the environment for the new process by passing a list of environment settings through the `envp` parameter. `envp` is an array of character pointers, each element of which (except for the final element) points to a null-terminated string defining an environment variable. Such a string usually has the form `NAME=value` where `NAME` is the name of an environment variable and `value` is the string value to which that variable is set. (The `value` isn't enclosed in double quotation marks.) The final element of the `envp` array should be `NULL`. When `envp` itself is `NULL`, the new process inherits the environment settings of the calling process.

A program executed with one of the `_exec` functions is always loaded into memory as if the maximum allocation field in the program's .exe file header were set to the default value of `0xFFFFH`.

The `_exec` calls don't preserve the translation modes of open files. If the new process must use files inherited from the calling process, use the [`_setmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmode?view=msvc-170) routine to set the translation mode of these files to the desired mode. You must explicitly flush (using `fflush` or `_flushall`) or close any stream before the `_exec` function call. Signal settings aren't preserved in new processes that are created by calls to `_exec` routines. The signal settings are reset to the default in the new process.

## Example

```
// crt_args.c
// Illustrates the following variables used for accessing
// command-line arguments and environment variables:
// argc  argv  envp
// This program will be executed by crt_exec which follows.

#include <stdio.h>

int main( int argc,  // Number of strings in array argv
char *argv[],       // Array of command-line argument strings
char **envp )       // Array of environment variable strings
{
    int count;

    // Display each command-line argument.
    printf( "\nCommand-line arguments:\n" );
    for( count = 0; count < argc; count++ )
        printf( "  argv[%d]   %s\n", count, argv[count] );

    // Display each environment variable.
    printf( "\nEnvironment variables:\n" );
    while( *envp != NULL )
        printf( "  %s\n", *(envp++) );

    return;
}
```

Run the following program to execute Crt\_args.exe:

```
// crt_exec.c
// Illustrates the different versions of exec, including
//      _execl          _execle          _execlp          _execlpe
//      _execv          _execve          _execvp          _execvpe
//
// Although CRT_EXEC.C can exec any program, you can verify how
// different versions handle arguments and environment by
// compiling and specifying the sample program CRT_ARGS.C. See
// "_spawn, _wspawn Functions" for examples of the similar spawn
// functions.

#include <stdio.h>
#include <conio.h>
#include <process.h>

char *my_env[] =     // Environment for exec?e
{
   "THIS=environment will be",
   "PASSED=to new process by",
   "the EXEC=functions",
   NULL
};

int main( int ac, char* av[] )
{
   char *args[4];
   int ch;
   if( ac != 3 ){
      fprintf( stderr, "Usage: %s <program> <number (1-8)>\n", av[0] );
      return;
   }

   // Arguments for _execv?
   args[0] = av[1];
   args[1] = "exec??";
   args[2] = "two";
   args[3] = NULL;

   switch( atoi( av[2] ) )
   {
   case 1:
      _execl( av[1], av[1], "_execl", "two", NULL );
      break;
   case 2:
      _execle( av[1], av[1], "_execle", "two", NULL, my_env );
      break;
   case 3:
      _execlp( av[1], av[1], "_execlp", "two", NULL );
      break;
   case 4:
      _execlpe( av[1], av[1], "_execlpe", "two", NULL, my_env );
      break;
   case 5:
      _execv( av[1], args );
      break;
   case 6:
      _execve( av[1], args, my_env );
      break;
   case 7:
      _execvp( av[1], args );
      break;
   case 8:
      _execvpe( av[1], args, my_env );
      break;
   default:
      break;
   }

   // This point is reached only if exec fails.
   printf( "\nProcess was not execed." );
   exit( 0 );
}
```

## Requirements

**Header:** `process.h`

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170)  
[`atexit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atexit?view=msvc-170)  
[`exit`, `_Exit`, `_exit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exit-exit-exit?view=msvc-170)  
[`_onexit`, `_onexit_m`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/onexit-onexit-m?view=msvc-170)  
[`_spawn`, `_wspawn` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/spawn-wspawn-functions?view=msvc-170)  
[`system`, `_wsystem`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/system-wsystem?view=msvc-170)