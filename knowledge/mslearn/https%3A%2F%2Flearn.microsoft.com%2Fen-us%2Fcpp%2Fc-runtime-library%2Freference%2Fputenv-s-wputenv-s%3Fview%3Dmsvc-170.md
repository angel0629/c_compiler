---
title: "_putenv_s, _wputenv_s, _tputenv_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-s-wputenv-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Creates, modifies, or removes environment variables. These functions are versions of [`_putenv`, `_wputenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-wputenv?view=msvc-170) that have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

For `_tputenv_s`, see [Generic-text function mappings](#generic-text-function-mappings).

## Syntax

```
errno_t _putenv_s(
   const char *varname,
   const char *value_string
);
errno_t _wputenv_s(
   const wchar_t *varname,
   const wchar_t *value_string
);
```

### Parameters

_`varname`_  
The environment variable name.

_`value_string`_  
The value to set the environment variable to.

## Return value

Returns 0 if successful, or an error code.

### Error conditions

_`varname`_

_`value_string`_

Return value

`NULL`

any

`EINVAL`

any

`NULL`

`EINVAL`

If one of the error conditions occurs, these functions invoke an invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return `EINVAL` and set `errno` to `EINVAL`.

The **`_putenv_s`** function adds new environment variables or modifies the values of existing environment variables. Environment variables define the environment in which a process executes (for example, the default search path for libraries to be linked with a program). **`_wputenv_s`** is a wide-character version of **`_putenv_s`**; the _`envstring`_ argument to **`_wputenv_s`** is a wide-character string.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text function mappings

The function in the `tchar.h` column maps to the function in the other columns depending on the character set that is defined at compile time.

`tchar.h` function

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tputenv_s`

`_putenv_s`

`_putenv_s`

`_wputenv_s`

_`varname`_ is the name of the environment variable to be added or modified and _`value_string`_ is the variable's value. If _`varname`_ is already part of the environment, its value is replaced by _`value_string`_; otherwise, the new _`varname`_ variable and its _`value_string`_ are added to the environment. You can remove a variable from the environment by specifying an empty string (that is, `""`) for _`value_string`_.

**`_putenv_s`** and **`_wputenv_s`** affect only the environment that is local to the current process; you can't use them to modify the command-level environment. These functions operate only on data structures that are accessible to the run-time library and not on the environment "segment" that the operating system creates for a process. When the current process terminates, the environment reverts to the level of the calling process, which in most cases is the operating-system level. However, the modified environment can be passed to any new processes that are created by **`_spawn`**, **`_exec`**, or **`system`**, and these new processes get any new items that are added by **`_putenv_s`** and **`_wputenv_s`**.

Don't change an environment entry directly; instead, use **`_putenv_s`** or **`_wputenv_s`** to change it. In particular, directly freeing elements of the **`_environ[]`** global array might cause invalid memory to be addressed.

**`getenv`** and **`_putenv_s`** use the global variable **`_environ`** to access the environment table; **`_wgetenv`** and **`_wputenv_s`** use **`_wenviron`**. **`_putenv_s`** and **`_wputenv_s`** may change the value of **`_environ`** and **`_wenviron`**, and thereby invalidate the _`envp`_ argument to **`main`** and the **`_wenvp`** argument to **`wmain`**. Therefore, it's safer to use **`_environ`** or **`_wenviron`** to access the environment information. For more information about the relationship of **`_putenv_s`** and **`_wputenv_s`** to global variables, see [`_environ`, `_wenviron`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/environ-wenviron?view=msvc-170).

Note

The **`_putenv_s`** and **`_getenv_s`** families of functions are not thread-safe. **`_getenv_s`** could return a string pointer while **`_putenv_s`** is modifying the string, and thereby cause random failures. Make sure that calls to these functions are synchronized.

## Requirements

Routine

Required header

**`_putenv_s`**

`<stdlib.h>`

**`_wputenv_s`**

`<stdlib.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

For a sample that shows how to use **`_putenv_s`**, see [`getenv_s`, `_wgetenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-s-wgetenv-s?view=msvc-170).

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`getenv`, `_wgetenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-wgetenv?view=msvc-170)  
[`_searchenv`, `_wsearchenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/searchenv-wsearchenv?view=msvc-170)