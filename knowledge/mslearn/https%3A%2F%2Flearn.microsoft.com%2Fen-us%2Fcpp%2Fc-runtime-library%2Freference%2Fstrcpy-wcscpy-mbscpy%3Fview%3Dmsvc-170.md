---
title: "strcpy, wcscpy, _mbscpy"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcpy-wcscpy-mbscpy?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Copies a string. More secure versions of these functions are available; see [`strcpy_s`, `wcscpy_s`, `_mbscpy_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcpy-s-wcscpy-s-mbscpy-s?view=msvc-170).

## Syntax

```
char *strcpy(
   char *strDestination,
   const char *strSource
);
wchar_t *wcscpy(
   wchar_t *strDestination,
   const wchar_t *strSource
);
unsigned char *_mbscpy(
   unsigned char *strDestination,
   const unsigned char *strSource
);
template <size_t size>
char *strcpy(
   char (&strDestination)[size],
   const char *strSource
); // C++ only
template <size_t size>
wchar_t *wcscpy(
   wchar_t (&strDestination)[size],
   const wchar_t *strSource
); // C++ only
template <size_t size>
unsigned char *_mbscpy(
   unsigned char (&strDestination)[size],
   const unsigned char *strSource
); // C++ only
```

### Parameters

_`strDestination`_  
Destination string.

_`strSource`_  
Null-terminated source string.

## Return value

Each of these functions returns the destination string. No return value is reserved to indicate an error.

The **`strcpy`** function copies _`strSource`_, including the terminating null character, to the location that's specified by _`strDestination`_. The behavior of **`strcpy`** is undefined if the source and destination strings overlap.

Important

Because **`strcpy`** does not check for sufficient space in _`strDestination`_ before it copies _`strSource`_, it is a potential cause of buffer overruns. Therefore, we recommend that you use [`strcpy_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcpy-s-wcscpy-s-mbscpy-s?view=msvc-170) instead.

**`wcscpy`** and **`_mbscpy`** are, respectively, wide-character and multibyte-character versions of **`strcpy`**. The arguments and return value of **`wcscpy`** are wide-character strings. The arguments and return value of **`_mbscpy`** are multibyte-character strings. These three functions behave identically otherwise.

In C++, these functions have template overloads that invoke the newer, secure counterparts of these functions. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcscpy`

**`strcpy`**

**`_mbscpy`**

**`wcscpy`**

## Requirements

Routine

Required header

**`strcpy`**

`<string.h>`

**`wcscpy`**

`<string.h>` or `<wchar.h>`

**`_mbscpy`**

`<mbstring.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_strcpy.c
// compile with: /W3
// This program uses strcpy
// and strcat to build a phrase.

#include <string.h>
#include <stdio.h>

int main( void )
{
   char string[80];

   // If you change the previous line to
   //   char string[20];
   // strcpy and strcat will happily overrun the string
   // buffer.  See the examples for strncpy and strncat
   // for safer string handling.

   strcpy( string, "Hello world from " ); // C4996
   // Note: strcpy is deprecated; use strcpy_s instead
   strcat( string, "strcpy " );           // C4996
   // Note: strcat is deprecated; use strcat_s instead
   strcat( string, "and " );              // C4996
   strcat( string, "strcat!" );           // C4996
   printf( "String = %s\n", string );
}
```

```
String = Hello world from strcpy and strcat!
```

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`strcat`, `wcscat`, `_mbscat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcat-wcscat-mbscat?view=msvc-170)  
[`strcmp`, `wcscmp`, `_mbscmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcmp-wcscmp-mbscmp?view=msvc-170)  
[`strncat`, `_strncat_l`, `wcsncat`, `_wcsncat_l`, `_mbsncat`, `_mbsncat_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-strncat-l-wcsncat-wcsncat-l-mbsncat-mbsncat-l?view=msvc-170)  
[`strncmp`, `wcsncmp`, `_mbsncmp`, `_mbsncmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncmp-wcsncmp-mbsncmp-mbsncmp-l?view=msvc-170)  
[`strncpy`, `_strncpy_l`, `wcsncpy`, `_wcsncpy_l`, `_mbsncpy`, `_mbsncpy_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-strncpy-l-wcsncpy-wcsncpy-l-mbsncpy-mbsncpy-l?view=msvc-170)  
[`_strnicmp`, `_wcsnicmp`, `_mbsnicmp`, `_strnicmp_l`, `_wcsnicmp_l`, `_mbsnicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnicmp-wcsnicmp-mbsnicmp-strnicmp-l-wcsnicmp-l-mbsnicmp-l?view=msvc-170)  
[`strrchr`, `wcsrchr`, `_mbsrchr`, `_mbsrchr_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strrchr-wcsrchr-mbsrchr-mbsrchr-l?view=msvc-170)  
[`strspn`, `wcsspn`, `_mbsspn`, `_mbsspn_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strspn-wcsspn-mbsspn-mbsspn-l?view=msvc-170)