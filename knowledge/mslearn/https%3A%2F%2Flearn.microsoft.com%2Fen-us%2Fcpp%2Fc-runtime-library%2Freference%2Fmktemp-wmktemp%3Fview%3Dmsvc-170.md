---
title: "_mktemp, _wmktemp"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktemp-wmktemp?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Creates a unique file name. More secure versions of these functions are available; see [`_mktemp_s`, `_wmktemp_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktemp-s-wmktemp-s?view=msvc-170).

## Syntax

```
char *_mktemp(
   char *nameTemplate
);
wchar_t *_wmktemp(
   wchar_t *nameTemplate
);
template <size_t size>
char *_mktemp(
   char (&nameTemplate)[size]
); // C++ only
template <size_t size>
wchar_t *_wmktemp(
   wchar_t (&nameTemplate)[size]
); // C++ only
```

### Parameters

_`nameTemplate`_  
File name pattern.

## Return value

Each of these functions returns a pointer to the modified nameTemplate. The function returns `NULL` if _`nameTemplate`_ is badly formed or no more unique names can be created from the given nameTemplate.

The **`_mktemp`** function creates a unique file name by modifying the _`nameTemplate`_ argument. **`_mktemp`** automatically handles multibyte-character string arguments as appropriate, recognizing multibyte-character sequences according to the multibyte code page currently in use by the run-time system. **`_wmktemp`** is a wide-character version of **`_mktemp`**; the argument and return value of **`_wmktemp`** are wide-character strings. **`_wmktemp`** and **`_mktemp`** behave identically otherwise, except that **`_wmktemp`** doesn't handle multibyte-character strings.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tmktemp`

**`_mktemp`**

**`_mktemp`**

**`_wmktemp`**

The _`nameTemplate`_ argument has the form _`baseXXXXXX`_, where _`base`_ is the part of the new file name that you supply and each X is a placeholder for a character supplied by **`_mktemp`**. Each placeholder character in _`nameTemplate`_ must be an uppercase X. **`_mktemp`** preserves _`base`_ and replaces the first trailing X with an alphabetic character. **`_mktemp`** replaces the trailing X characters with a five-digit value. This value is a unique number that identifies the calling process, or in multithreaded programs, the calling thread.

Each successful call to **`_mktemp`** modifies _`nameTemplate`_. In each subsequent call from the same process or thread with the same _`nameTemplate`_ argument, **`_mktemp`** checks for file names that match names returned by **`_mktemp`** in previous calls. If no file exists for a given name, **`_mktemp`** returns that name. If files exist for all previously returned names, **`_mktemp`** creates a new name by replacing the alphabetic character it used in the previously returned name with the next available lowercase letter, in order, from 'a' through 'z'. For example, if _`base`_ is:

> **`fn`**

and the five-digit value supplied by **`_mktemp`** is 12345, the first name returned is:

> **`fna12345`**

If this name is used to create file FNA12345 and this file still exists, the next name returned on a call from the same process or thread with the same _`base`_ for _`nameTemplate`_ is:

> **`fnb12345`**

If FNA12345 doesn't exist, the next name returned is again:

> **`fna12345`**

**`_mktemp`** can create a maximum of 26 unique file names for any given combination of _`base`_ and _`nameTemplate`_ values. Therefore, FNZ12345 is the last unique file name **`_mktemp`** can create for the _`base`_ and _`nameTemplate`_ values used in this example.

On failure, `errno` is set. If _`nameTemplate`_ has an invalid format (for example, fewer than six X characters), `errno` is set to `EINVAL`. If **`_mktemp`** is unable to create a unique name because all 26 possible file names already exist, **`_mktemp`** sets nameTemplate to an empty string and returns `EEXIST`.

In C++, these functions have template overloads that invoke the newer, secure counterparts of these functions. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

## Requirements

Routine

Required header

**`_mktemp`**

<io.h>

**`_wmktemp`**

<io.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_mktemp.c
// compile with: /W3
/* The program uses _mktemp to create
* unique filenames. It opens each filename
* to ensure that the next name is unique.
*/

#include <io.h>
#include <string.h>
#include <stdio.h>
#include <errno.h>

char *template = "fnXXXXXX";
char *result;
char names[27][9];

int main( void )
{
   int i;
   FILE *fp;

   for( i = 0; i < 27; i++ )
   {
      strcpy_s( names[i], sizeof( names[i] ), template );
      /* Attempt to find a unique filename: */
      result = _mktemp( names[i] );  // C4996
      // Note: _mktemp is deprecated; consider using _mktemp_s instead
      if( result == NULL )
      {
         printf( "Problem creating the template\n" );
         if (errno == EINVAL)
         {
             printf( "Bad parameter\n");
         }
         else if (errno == EEXIST)
         {
             printf( "Out of unique filenames\n");
         }
      }
      else
      {
         fopen_s( &fp, result, "w" );
         if( fp != NULL )
            printf( "Unique filename is %s\n", result );
         else
            printf( "Cannot open %s\n", result );
         fclose( fp );
      }
   }
}
```

```
Unique filename is fna03912
Unique filename is fnb03912
Unique filename is fnc03912
Unique filename is fnd03912
Unique filename is fne03912
Unique filename is fnf03912
Unique filename is fng03912
Unique filename is fnh03912
Unique filename is fni03912
Unique filename is fnj03912
Unique filename is fnk03912
Unique filename is fnl03912
Unique filename is fnm03912
Unique filename is fnn03912
Unique filename is fno03912
Unique filename is fnp03912
Unique filename is fnq03912
Unique filename is fnr03912
Unique filename is fns03912
Unique filename is fnt03912
Unique filename is fnu03912
Unique filename is fnv03912
Unique filename is fnw03912
Unique filename is fnx03912
Unique filename is fny03912
Unique filename is fnz03912
Problem creating the template.
Out of unique filenames.
```

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170)  
[`_getmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getmbcp?view=msvc-170)  
[`_getpid`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getpid?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)  
[`_setmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmbcp?view=msvc-170)  
[`_tempnam`, `_wtempnam`, `tmpnam`, `_wtmpnam`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tempnam-wtempnam-tmpnam-wtmpnam?view=msvc-170)  
[`tmpfile`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tmpfile?view=msvc-170)