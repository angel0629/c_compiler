---
title: "getenv, _wgetenv"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-wgetenv?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets a value from the current environment. More secure versions of these functions are available; see [`getenv_s`, `_wgetenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-s-wgetenv-s?view=msvc-170).

## Syntax

```
char *getenv(
   const char *varname
);
wchar_t *_wgetenv(
   const wchar_t *varname
);
```

### Parameters

_`varname`_  
Environment variable name.

## Return value

Returns a pointer to the environment table entry containing _`varname`_. It isn't safe to modify the value of the environment variable using the returned pointer. Use the [`_putenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-wputenv?view=msvc-170) function to modify the value of an environment variable. The return value is `NULL` if _`varname`_ isn't found in the environment table.

The **`getenv`** function searches the list of environment variables for _`varname`_. **`getenv`** isn't case sensitive in the Windows operating system. **`getenv`** and **`_putenv`** use the copy of the environment pointed to by the global variable **`_environ`** to access the environment. **`getenv`** operates only on the data structures accessible to the run-time library and not on the environment "segment" created for the process by the operating system. Therefore, programs that use the _`envp`_ argument to [`main`](https://learn.microsoft.com/en-us/cpp/cpp/main-function-command-line-args?view=msvc-170) or [`wmain`](https://learn.microsoft.com/en-us/cpp/cpp/main-function-command-line-args?view=msvc-170) may retrieve invalid information.

If _`varname`_ is `NULL`, this function invokes an invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function sets `errno` to `EINVAL` and returns `NULL`.

**`_wgetenv`** is a wide-character version of **`getenv`**; the argument and return value of **`_wgetenv`** are wide-character strings. The **`_wenviron`** global variable is a wide-character version of **`_environ`**.

In an MBCS program (for example, in an SBCS ASCII program), **`_wenviron`** is initially `NULL` because the environment is composed of multibyte-character strings. Then, on the first call to [`_wputenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-wputenv?view=msvc-170), or on the first call to **`_wgetenv`** if an (MBCS) environment already exists, a corresponding wide-character string environment is created and is then pointed to by **`_wenviron`**.

Similarly in a Unicode (**`_wmain`**) program, **`_environ`** is initially `NULL` because the environment is composed of wide-character strings. Then, on the first call to **`_putenv`**, or on the first call to **`getenv`** if a (Unicode) environment already exists, a corresponding MBCS environment is created and is then pointed to by **`_environ`**.

When two copies of the environment (MBCS and Unicode) exist simultaneously in a program, the run-time system must maintain both copies, resulting in slower execution time. For example, whenever you call **`_putenv`**, a call to **`_wputenv`** is also executed automatically, so that the two environment strings correspond.

Caution

In rare instances, when the run-time system is maintaining both a Unicode version and a multibyte version of the environment, these two environment versions may not correspond exactly. This is because, although any unique multibyte-character string maps to a unique Unicode string, the mapping from a unique Unicode string to a multibyte-character string is not necessarily unique. For more information, see [`_environ`, `_wenviron`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/environ-wenviron?view=msvc-170).

Note

The **`_putenv`** and **`_getenv`** families of functions are not thread-safe. **`_getenv`** could return a string pointer while **`_putenv`** is modifying the string, causing random failures. Make sure that calls to these functions are synchronized.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_tgetenv`**

**`getenv`**

**`getenv`**

**`_wgetenv`**

To check or change the value of the **`TZ`** environment variable, use **`getenv`**, **`_putenv`** and **`_tzset`** as necessary. For more information about **`TZ`**, see [`_tzset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tzset?view=msvc-170) and [`_daylight`, `timezone`, and `_tzname`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/daylight-dstbias-timezone-and-tzname?view=msvc-170).

## Requirements

Routine

Required header

**`getenv`**

`<stdlib.h>`

**`_wgetenv`**

`<stdlib.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_getenv.c
// compile with: /W3
// This program uses getenv to retrieve
// the LIB environment variable and then uses
// _putenv to change it to a new value.

#include <stdlib.h>
#include <stdio.h>

int main( void )
{
   char *libvar;

   // Get the value of the LIB environment variable.
   libvar = getenv( "LIB" ); // C4996
   // Note: getenv is deprecated; consider using getenv_s instead

   if( libvar != NULL )
      printf( "Original LIB variable is: %s\n", libvar );

   // Attempt to change path. Note that this only affects the environment
   // variable of the current process. The command processor's
   // environment is not changed.
   _putenv( "LIB=c:\\mylib;c:\\yourlib" ); // C4996
   // Note: _putenv is deprecated; consider using putenv_s instead

   // Get new value.
   libvar = getenv( "LIB" ); // C4996

   if( libvar != NULL )
      printf( "New LIB variable is: %s\n", libvar );
}
```

```
Original LIB variable is: C:\progra~1\devstu~1\vc\lib
New LIB variable is: c:\mylib;c:\yourlib
```

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`_putenv`, `_wputenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-wputenv?view=msvc-170)  
[Environmental constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/environmental-constants?view=msvc-170)