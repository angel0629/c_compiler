---
title: "_searchenv, _wsearchenv"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/searchenv-wsearchenv?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Uses environment paths to search for a file. More secure versions of these functions are available; see [`_searchenv_s`, `_wsearchenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/searchenv-s-wsearchenv-s?view=msvc-170).

## Syntax

```
void _searchenv(
   const char *filename,
   const char *varname,
   char *pathname
);
void _wsearchenv(
   const wchar_t *filename,
   const wchar_t *varname,
   wchar_t *pathname
);
template <size_t size>
void _searchenv(
   const char *filename,
   const char *varname,
   char (&pathname)[size]
); // C++ only
template <size_t size>
void _wsearchenv(
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

The **`_searchenv`** routine searches for the target file in the specified domain. The _`varname`_ variable can be any environment or user-defined variable—for example, `PATH`, `LIB`, or `INCLUDE`—that specifies a list of directory paths. Because **`_searchenv`** is case-sensitive, _`varname`_ should match the case of the environment variable.

The routine first searches for the file in the current working directory. If it doesn't find the file, it looks through the directories that are specified by the environment variable. If the target file is in one of those directories, the newly created path is copied into _`pathname`_. If the _`filename`_ file isn't found, _`pathname`_ contains an empty null-terminated string.

The _`pathname`_ buffer should be at least `_MAX_PATH` characters long to accommodate the full length of the constructed path name. Otherwise, **`_searchenv`** might overrun the _`pathname`_ buffer and cause unexpected behavior.

**`_wsearchenv`** is a wide-character version of **`_searchenv`**, and the arguments to **`_wsearchenv`** are wide-character strings. **`_wsearchenv`** and **`_searchenv`** behave identically otherwise.

If _`filename`_ is an empty string, these functions return `ENOENT`.

If _`filename`_ or _`pathname`_ is a `NULL` pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return -1 and set `errno` to `EINVAL`.

For more information about `errno` and error codes, see [`errno` constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-constants?view=msvc-170).

In C++, these functions have template overloads that invoke the newer, more secure counterparts of these functions. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tsearchenv`

**`_searchenv`**

**`_searchenv`**

**`_wsearchenv`**

## Requirements

Routine

Required header

**`_searchenv`**

<stdlib.h>

**`_wsearchenv`**

<stdlib.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_searchenv.c
// compile with: /W3
// This program searches for a file in
// a directory that's specified by an environment variable.

#include <stdlib.h>
#include <stdio.h>

int main( void )
{
   char pathbuffer[_MAX_PATH];
   char searchfile[] = "CL.EXE";
   char envvar[] = "PATH";

   // Search for file in PATH environment variable:
   _searchenv( searchfile, envvar, pathbuffer ); // C4996
   // Note: _searchenv is deprecated; consider using _searchenv_s
   if( *pathbuffer != '\0' )
      printf( "Path for %s:\n%s\n", searchfile, pathbuffer );
   else
      printf( "%s not found\n", searchfile );
}
```

```
Path for CL.EXE:
C:\Program Files\Microsoft Visual Studio 8\VC\BIN\CL.EXE
```

## See also

[Directory control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/directory-control?view=msvc-170)  
[`getenv`, `_wgetenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-wgetenv?view=msvc-170)  
[`_putenv`, `_wputenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-wputenv?view=msvc-170)  
[`_searchenv_s`, `_wsearchenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/searchenv-s-wsearchenv-s?view=msvc-170)