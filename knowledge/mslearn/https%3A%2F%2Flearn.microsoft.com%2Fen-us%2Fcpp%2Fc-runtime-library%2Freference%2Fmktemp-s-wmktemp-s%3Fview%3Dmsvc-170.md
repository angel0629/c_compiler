---
title: "_mktemp_s, _wmktemp_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktemp-s-wmktemp-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Creates a unique file name. These functions are versions of [`_mktemp`, `_wmktemp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktemp-wmktemp?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t _mktemp_s(
   char *nameTemplate,
   size_t sizeInChars
);
errno_t _wmktemp_s(
   wchar_t *nameTemplate,
   size_t sizeInChars
);
template <size_t size>
errno_t _mktemp_s(
   char (&nameTemplate)[size]
); // C++ only
template <size_t size>
errno_t _wmktemp_s(
   wchar_t (&nameTemplate)[size]
); // C++ only
```

### Parameters

_`nameTemplate`_  
File name pattern.

_`sizeInChars`_  
Size of the buffer in single-byte characters in **`_mktemp_s`**; wide characters in **`_wmktemp_s`**, including the null terminator.

## Return value

Both of these functions return zero on success; an error code on failure.

### Error conditions

_`nameTemplate`_

_`sizeInChars`_

Return value

New value in _`nameTemplate`_

`NULL`

any

`EINVAL`

`NULL`

Incorrect format (see Remarks section for correct format)

any

`EINVAL`

empty string

any

<= number of X characters

`EINVAL`

empty string

If any of the above error conditions occurs, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the functions returns `EINVAL`.

The **`_mktemp_s`** function creates a unique file name by modifying the _`nameTemplate`_ argument, so that after the call, the _`nameTemplate`_ pointer points to a string containing the new file name. **`_mktemp_s`** automatically handles multibyte-character string arguments as appropriate, recognizing multibyte-character sequences according to the multibyte code page currently in use by the run-time system. **`_wmktemp_s`** is a wide-character version of **`_mktemp_s`**; the argument of **`_wmktemp_s`** is a wide-character string. **`_wmktemp_s`** and **`_mktemp_s`** behave identically otherwise, except that **`_wmktemp_s`** doesn't handle multibyte-character strings.

The debug library versions of these functions first fill the buffer with 0xFE. To disable this behavior, use [`_CrtSetDebugFillThreshold`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdebugfillthreshold?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tmktemp_s`

**`_mktemp_s`**

**`_mktemp_s`**

**`_wmktemp_s`**

The _`nameTemplate`_ argument has the form _`baseXXXXXX`_, where _`base`_ is the part of the new file name that you supply and each X is a placeholder for a character supplied by **`_mktemp_s`**. Each placeholder character in _`nameTemplate`_ must be an uppercase X. **`_mktemp_s`** preserves _`base`_ and replaces the first trailing X with an alphabetic character. **`_mktemp_s`** replaces the X characters that follow with a five-digit value. This value is a unique number that identifies the calling process, or in multithreaded programs, the calling thread.

Each successful call to **`_mktemp_s`** modifies _`nameTemplate`_. In each subsequent call from the same process or thread with the same _`nameTemplate`_ argument, **`_mktemp_s`** checks for file names that match names returned by **`_mktemp_s`** in previous calls. If no file exists for a given name, **`_mktemp_s`** returns that name. If files exist for all previously returned names, **`_mktemp_s`** creates a new name by replacing the alphabetic character it used in the previously returned name with the next available lowercase letter, in order, from 'a' through 'z'. For example, if _`base`_ is:

> **`fn`**

and the five-digit value supplied by **`_mktemp_s`** is 12345, the first name returned is:

> **`fna12345`**

If this name is used to create file FNA12345 and this file still exists, the next name returned on a call from the same process or thread with the same _`base`_ for _`nameTemplate`_ is:

> **`fnb12345`**

If FNA12345 doesn't exist, the next name returned is again:

> **`fna12345`**

**`_mktemp_s`** can create a maximum of 26 unique file names for any given combination of _`base`_ and _`nameTemplate`_ values. Therefore, FNZ12345 is the last unique file name **`_mktemp_s`** can create for the _`base`_ and _`nameTemplate`_ values used in this example.

In C++, using these functions is simplified by template overloads; the overloads can infer buffer length automatically (eliminating the need to specify a size argument) and they can automatically replace older, non-secure functions with their newer, secure counterparts. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

## Requirements

Routine

Required header

**`_mktemp_s`**

<io.h>

**`_wmktemp_s`**

<io.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_mktemp_s.cpp
/* The program uses _mktemp to create
* five unique filenames. It opens each filename
* to ensure that the next name is unique.
*/

#include <io.h>
#include <string.h>
#include <stdio.h>

char *fnTemplate = "fnXXXXXX";
char names[5][9];

int main()
{
   int i, err, sizeInChars;
   FILE *fp;

   for( i = 0; i < 5; i++ )
   {
      strcpy_s( names[i], sizeof(names[i]), fnTemplate );
      /* Get the size of the string and add one for the null terminator.*/
      sizeInChars = strnlen(names[i], 9) + 1;
      /* Attempt to find a unique filename: */
      err = _mktemp_s( names[i], sizeInChars );
      if( err != 0 )
         printf( "Problem creating the template" );
      else
      {
         if( fopen_s( &fp, names[i], "w" ) == 0 )
            printf( "Unique filename is %s\n", names[i] );
         else
            printf( "Cannot open %s\n", names[i] );
         fclose( fp );
      }
   }

   return 0;
}
```

### Sample output

```
Unique filename is fna03188
Unique filename is fnb03188
Unique filename is fnc03188
Unique filename is fnd03188
Unique filename is fne03188
```

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170)  
[`_getmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getmbcp?view=msvc-170)  
[`_getpid`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getpid?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)  
[`_setmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmbcp?view=msvc-170)  
[`_tempnam`, `_wtempnam`, `tmpnam`, `_wtmpnam`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tempnam-wtempnam-tmpnam-wtmpnam?view=msvc-170)  
[`tmpfile_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tmpfile-s?view=msvc-170)