---
title: "_searchenv_s, _wsearchenv_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/searchenv-s-wsearchenv-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Searches for a file by using environment paths. These versions of [`_searchenv`, `_wsearchenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/searchenv-wsearchenv?view=msvc-170) have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t _searchenv_s(
   const char *filename,
   const char *varname,
   char *pathname,
   size_t numberOfElements
);
errno_t _wsearchenv_s(
   const wchar_t *filename,
   const wchar_t *varname,
   wchar_t *pathname,
   size_t numberOfElements
);
template <size_t size>
errno_t _searchenv_s(
   const char *filename,
   const char *varname,
   char (&pathname)[size]
); // C++ only
template <size_t size>
errno_t _wsearchenv_s(
   const wchar_t *filename,
   const wchar_t *varname,
   wchar_t (&pathname)[size]
); // C++ only
```

### Parameters

_`filename`_  
Name of the file to search for.

_`varname`_  
Environment to search.

_`pathname`_  
Buffer to store the complete path.

_`numberOfElements`_  
Size of the _`pathname`_ buffer.

## Return value

Zero if successful; an error code on failure.

If _`filename`_ is an empty string, the return value is `ENOENT`.

### Error conditions

_`filename`_

_`varname`_

_`pathname`_

_`numberOfElements`_

Return value

Contents of _`pathname`_

any

any

`NULL`

any

`EINVAL`

n/a

`NULL`

any

any

any

`EINVAL`

not changed

any

any

any

<= 0

`EINVAL`

not changed

If any of these error conditions occurs, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EINVAL` and return `EINVAL`.

The **`_searchenv_s`** routine searches for the target file in the specified domain. The _`varname`_ variable can be any environment or user-defined variable that specifies a list of directory paths, such as `PATH`, `LIB`, and `INCLUDE`. Because **`_searchenv_s`** is case-sensitive, _`varname`_ should match the case of the environment variable. If _`varname`_ doesn't match the name of an environment variable defined in the process's environment, the function returns zero, and the _`pathname`_ variable is unchanged.

The routine searches first for the file in the current working directory. If it doesn't find the file, it looks next through the directories specified by the environment variable. If the target file is in one of those directories, the newly created path is copied into _`pathname`_. If the _`filename`_ file isn't found, _`pathname`_ contains an empty null-terminated string.

The _`pathname`_ buffer should be at least `_MAX_PATH` characters long to accommodate the full length of the constructed path name. Otherwise, **`_searchenv_s`** might overrun the _`pathname`_ buffer resulting in unexpected behavior.

**`_wsearchenv_s`** is a wide-character version of **`_searchenv_s`**; the arguments to **`_wsearchenv_s`** are wide-character strings. **`_wsearchenv_s`** and **`_searchenv_s`** behave identically otherwise.

In C++, using these functions is simplified by template overloads; the overloads can infer buffer length automatically (eliminating the need to specify a size argument) and they can automatically replace older, non-secure functions with their newer, secure counterparts. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tsearchenv_s`

**`_searchenv_s`**

**`_searchenv_s`**

**`_wsearchenv_s`**

## Requirements

Routine

Required header

**`_searchenv_s`**

<stdlib.h>

**`_wsearchenv_s`**

<stdlib.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_searchenv_s.c
/* This program searches for a file in
* a directory specified by an environment variable.
*/

#include <stdlib.h>
#include <stdio.h>

int main( void )
{
   char pathbuffer[_MAX_PATH];
   char searchfile[] = "CL.EXE";
   char envvar[] = "PATH";
   errno_t err;

   /* Search for file in PATH environment variable: */
   err = _searchenv_s( searchfile, envvar, pathbuffer, _MAX_PATH );
   if (err != 0)
   {
      printf("Error searching the path. Error code: %d\n", err);
   }
   if( *pathbuffer != '\0' )
      printf( "Path for %s:\n%s\n", searchfile, pathbuffer );
   else
      printf( "%s not found\n", searchfile );
}
```

```
Path for CL.EXE:
C:\Program Files\Microsoft Visual Studio 2010\VC\BIN\CL.EXE
```

## See also

[Directory control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/directory-control?view=msvc-170)  
[`_searchenv`, `_wsearchenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/searchenv-wsearchenv?view=msvc-170)  
[`getenv`, `_wgetenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-wgetenv?view=msvc-170)  
[`_putenv`, `_wputenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-wputenv?view=msvc-170)