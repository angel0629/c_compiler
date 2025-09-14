---
title: "_putenv, _wputenv"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-wputenv?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Creates, modifies, or removes environment variables. More secure versions of these functions are available; see [`_putenv_s`, `_wputenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-s-wputenv-s?view=msvc-170).

## Syntax

```
int _putenv(
   const char *envstring
);
int _wputenv(
   const wchar_t *envstring
);
```

### Parameters

_`envstring`_  
Environment-string definition.

## Return value

The functions return 0 if successful, or -1 if there's an error.

The **`_putenv`** function adds new environment variables or modifies the values of existing environment variables. Environment variables define the environment in which a process executes (for example, the default search path for libraries to be linked with a program). **`_wputenv`** is a wide-character version of **`_putenv`**; the _`envstring`_ argument to **`_wputenv`** is a wide-character string.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`Tchar.h` routine

`_UNICODE and _MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tputenv`

**`_putenv`**

**`_putenv`**

**`_wputenv`**

The _`envstring`_ argument must be a pointer to a string of the form _`varname=value_string`_, where _`varname`_ is the name of the environment variable to be added or modified and _`value_string`_ is the variable's value. If _`varname`_ is already part of the environment, its value is replaced by _`value_string`_; otherwise, the new _`varname`_ variable and its _`value_string`_ value are added to the environment. You can remove a variable from the environment by specifying an empty _`value_string`_, or in other words, by specifying only _`varname`_\=.

**`_putenv`** and **`_wputenv`** affect only the environment that is local to the current process; you can't use them to modify the command-level environment. That is, these functions operate only on data structures accessible to the run-time library. They don't operate on the environment segment created for a process by the operating system. When the current process terminates, the environment reverts to the level of the calling process (in most cases, the operating-system level). However, the modified environment can be passed to any new processes created by **`_spawn`**, **`_exec`**, or **`system`**, and these new processes get any new items added by **`_putenv`** and **`_wputenv`**.

Don't change an environment entry directly: instead, use **`_putenv`** or **`_wputenv`** to change it. In particular, direct freeing elements of the **`_environ[]`** global array might lead to invalid memory being addressed.

**`_getenv`** and **`_putenv`** use the global variable **`_environ`** to access the environment table; **`_wgetenv`** and **`_wputenv`** use **`_wenviron`**. **`_putenv`** and **`_wputenv`** might change the value of **`_environ`** and **`_wenviron`**, thus invalidating the **`_envp`** argument to **`main`** and the **`_wenvp`** argument to **`wmain`**. Therefore, it's safer to use **`_environ`** or **`_wenviron`** to access the environment information. For more information about the relation of **`_putenv`** and **`_wputenv`** to global variables, see [`_environ`, `_wenviron`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/environ-wenviron?view=msvc-170).

Note

The **`_putenv`** and **`_getenv`** families of functions are not thread-safe. **`_getenv`** could return a string pointer while **`_putenv`** is modifying the string, causing random failures. Make sure that calls to these functions are synchronized.

## Requirements

Routine

Required header

**`_putenv`**

`<stdlib.h>`

**`_wputenv`**

`<stdlib.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

For a sample of how to use **`_putenv`**, see [`getenv`, `_wgetenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-wgetenv?view=msvc-170).

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`getenv`, `_wgetenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-wgetenv?view=msvc-170)  
[`_searchenv`, `_wsearchenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/searchenv-wsearchenv?view=msvc-170)