---
title: "getenv_s, _wgetenv_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-s-wgetenv-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets a value from the current environment. These versions of [`getenv`, `_wgetenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-wgetenv?view=msvc-170) have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t getenv_s(
   size_t *pReturnValue,
   char* buffer,
   size_t numberOfElements,
   const char *varname
);
errno_t _wgetenv_s(
   size_t *pReturnValue,
   wchar_t *buffer,
   size_t numberOfElements,
   const wchar_t *varname
);
template <size_t size>
errno_t getenv_s(
   size_t *pReturnValue,
   char (&buffer)[size],
   const char *varname
); // C++ only
template <size_t size>
errno_t _wgetenv_s(
   size_t *pReturnValue,
   wchar_t (&buffer)[size],
   const wchar_t *varname
); // C++ only
```

### Parameters

_`pReturnValue`_  
The buffer size that's required, or 0 if the variable isn't found.

_`buffer`_  
Buffer to store the value of the environment variable.

_`numberOfElements`_  
Size of _`buffer`_.

_`varname`_  
Environment variable name.

## Return value

Zero if successful; otherwise, an error code on failure.

### Error conditions

_`pReturnValue`_

_`buffer`_

_`numberOfElements`_

_`varname`_

Return Value

`NULL`

any

any

any

`EINVAL`

any

`NULL`

\>0

any

`EINVAL`

any

any

any

`NULL`

`EINVAL`

Any of these error conditions invokes an invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the functions set `errno` to `EINVAL` and return `EINVAL`.

Also, if the buffer is too small, these functions return `ERANGE`. They don't invoke an invalid parameter handler. They write out the required buffer size in _`pReturnValue`_, and thereby enable programs to call the function again with a larger buffer.

The **`getenv_s`** function searches the list of environment variables for _`varname`_. **`getenv_s`** isn't case sensitive in the Windows operating system. **`getenv_s`** and [`_putenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-s-wputenv-s?view=msvc-170) use the copy of the environment that's pointed to by the global variable **`_environ`** to access the environment. **`getenv_s`** operates only on the data structures that are accessible to the run-time library and not on the environment "segment" that's created for the process by the operating system. Therefore, programs that use the _`envp`_ argument to [`main`](https://learn.microsoft.com/en-us/cpp/cpp/main-function-command-line-args?view=msvc-170) or [`wmain`](https://learn.microsoft.com/en-us/cpp/cpp/main-function-command-line-args?view=msvc-170) might retrieve invalid information.

**`_wgetenv_s`** is a wide-character version of **`getenv_s`**; the argument and return value of **`_wgetenv_s`** are wide-character strings. The **`_wenviron`** global variable is a wide-character version of **`_environ`**.

In an MBCS program (for example, in an SBCS ASCII program), **`_wenviron`** is initially `NULL` because the environment is composed of multibyte-character strings. Then, on the first call to [`_wputenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-wputenv?view=msvc-170), or on the first call to **`_wgetenv_s`**, if an (MBCS) environment already exists, a corresponding wide-character string environment is created and is then pointed to by **`_wenviron`**.

Similarly in a Unicode (**`_wmain`**) program, **`_environ`** is initially `NULL` because the environment is composed of wide-character strings. Then, on the first call to [`_putenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-wputenv?view=msvc-170), or on the first call to **`getenv_s`** if a (Unicode) environment already exists, a corresponding MBCS environment is created and is then pointed to by **`_environ`**.

When two copies of the environment (MBCS and Unicode) exist simultaneously in a program, execution can take longer, because the run-time system must maintain both copies. For example, when you call **`_putenv`**, a call to **`_wputenv`** is also executed automatically so that the two environment strings correspond.

Caution

In rare instances, when the run-time system is maintaining both a Unicode version and a multibyte version of the environment, the two environment versions may not correspond exactly. This happens because, although any unique multibyte-character string maps to a unique Unicode string, the mapping from a unique Unicode string to a multibyte-character string is not necessarily unique. For more information, see [`_environ`, `_wenviron`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/environ-wenviron?view=msvc-170).

Note

The **`_putenv_s`** and **`_getenv_s`** families of functions are not thread-safe. **`_getenv_s`** could return a string pointer while **`_putenv_s`** is modifying the string and thereby cause random failures. Make sure that calls to these functions are synchronized.

In C++, use of these functions is simplified by template overloads; the overloads can infer buffer length automatically and thereby eliminate the need to specify a size argument. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tgetenv_s`

**`getenv_s`**

**`getenv_s`**

**`_wgetenv_s`**

To check or change the value of the **`TZ`** environment variable, use **`getenv_s`**, **`_putenv`**, and **`_tzset`**, as required. For more information about **`TZ`**, see [`_tzset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tzset?view=msvc-170) and [`_daylight`, `_dstbias`, `_timezone`, and `_tzname`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/daylight-dstbias-timezone-and-tzname?view=msvc-170).

## Requirements

Routine

Required header

**`getenv_s`**

`<stdlib.h>`

**`_wgetenv_s`**

`<stdlib.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_getenv_s.c
// This program uses getenv_s to retrieve
// the LIB environment variable and then uses
// _putenv to change it to a new value.

#include <stdlib.h>
#include <stdio.h>

int main( void )
{
   char* libvar;
   size_t requiredSize;

   getenv_s( &requiredSize, NULL, 0, "LIB");
   if (requiredSize == 0)
   {
      printf("LIB doesn't exist!\n");
      exit(1);
   }

   libvar = (char*) malloc(requiredSize * sizeof(char));
   if (!libvar)
   {
      printf("Failed to allocate memory!\n");
      exit(1);
   }

   // Get the value of the LIB environment variable.
   getenv_s( &requiredSize, libvar, requiredSize, "LIB" );

   printf( "Original LIB variable is: %s\n", libvar );

   // Attempt to change path. Note that this only affects
   // the environment variable of the current process. The command
   // processor's environment is not changed.
   _putenv_s( "LIB", "c:\\mylib;c:\\yourlib" );

   getenv_s( &requiredSize, NULL, 0, "LIB");

   libvar = (char*) realloc(libvar, requiredSize * sizeof(char));
   if (!libvar)
   {
      printf("Failed to allocate memory!\n");
      exit(1);
   }

   // Get the new value of the LIB environment variable.
   getenv_s( &requiredSize, libvar, requiredSize, "LIB" );

   printf( "New LIB variable is: %s\n", libvar );

   free(libvar);
}
```

```
Original LIB variable is: c:\vctools\lib;c:\vctools\atlmfc\lib;c:\vctools\PlatformSDK\lib;c:\vctools\Visual Studio SDKs\DIA Sdk\lib;c:\vctools\Visual Studio SDKs\BSC Sdk\lib
New LIB variable is: c:\mylib;c:\yourlib
```

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[Environmental constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/environmental-constants?view=msvc-170)  
[`_putenv`, `_wputenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-wputenv?view=msvc-170)  
[`_dupenv_s`, `_wdupenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/dupenv-s-wdupenv-s?view=msvc-170)