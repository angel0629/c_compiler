---
title: "fscanf_s, _fscanf_s_l, fwscanf_s, _fwscanf_s_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fscanf-s-fscanf-s-l-fwscanf-s-fwscanf-s-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reads formatted data from a stream. These versions of [`fscanf`, `_fscanf_l`, `fwscanf`, `_fwscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fscanf-fscanf-l-fwscanf-fwscanf-l?view=msvc-170) have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
int fscanf_s(
   FILE *stream,
   const char *format [,
   argument ]...
);
int _fscanf_s_l(
   FILE *stream,
   const char *format,
   _locale_t locale [,
   argument ]...
);
int fwscanf_s(
   FILE *stream,
   const wchar_t *format [,
   argument ]...
);
int _fwscanf_s_l(
   FILE *stream,
   const wchar_t *format,
   _locale_t locale [,
   argument ]...
);
```

### Parameters

_`stream`_  
Pointer to `FILE` structure.

_`format`_  
Format-control string.

_`argument`_  
Optional arguments.

_`locale`_  
The locale to use.

## Return value

Each of these functions returns the number of fields that it successfully converts and assigns. The return value doesn't include fields that were read but not assigned. A return value of 0 indicates that no fields were assigned. If an error occurs, or if the end of the file stream is reached before the first conversion, the return value is `EOF` for **`fscanf_s`** and **`fwscanf_s`**.

These functions validate their parameters. If _`stream`_ is an invalid file pointer, or _`format`_ is a null pointer, these functions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return `EOF` and set `errno` to `EINVAL`.

The **`fscanf_s`** function reads data from the current position of _`stream`_ into the locations that are given by _`argument`_ (if any). Each _`argument`_ must be a pointer to a variable of a type that corresponds to a type specifier in _`format`_. _`format`_ controls the interpretation of the input fields and has the same form and function as the _`format`_ argument for **`scanf_s`**; see [Format specification fields: `scanf` and `wscanf` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-fields-scanf-and-wscanf-functions?view=msvc-170) for a description of _`format`_. **`fwscanf_s`** is a wide-character version of **`fscanf_s`**; the format argument to **`fwscanf_s`** is a wide-character string. These functions behave identically if the stream is opened in ANSI mode. **`fscanf_s`** doesn't currently support input from a UNICODE stream.

The main difference between the more secure functions (that have the **`_s`** suffix) and the other versions is that the more secure functions require the size in characters of each **`c`**, **`C`**, **`s`**, **`S`**, and **`[`** type field to be passed as an argument immediately following the variable. For more information, see [`scanf_s`, `_scanf_s_l`, `wscanf_s`, `_wscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-s-scanf-s-l-wscanf-s-wscanf-s-l?view=msvc-170) and [`scanf` Width Specification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/scanf-width-specification?view=msvc-170).

Note

The size parameter is of type **`unsigned`**, not **`size_t`**.

The versions of these functions that have the **`_l`** suffix are identical except that they use the locale parameter that's passed in instead of the current thread locale.

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_ftscanf_s`**

**`fscanf_s`**

**`fscanf_s`**

**`fwscanf_s`**

**`_ftscanf_s_l`**

**`_fscanf_s_l`**

**`_fscanf_s_l`**

**`_fwscanf_s_l`**

## Requirements

Function

Required header

**`fscanf_s`**, **`_fscanf_s_l`**

`<stdio.h>`

**`fwscanf_s`**, **`_fwscanf_s_l`**

`<stdio.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_fscanf_s.c
// This program writes formatted
// data to a file. It then uses fscanf to
// read the various data back from the file.

#include <stdio.h>
#include <stdlib.h>

FILE *stream;

int main( void )
{
   long l;
   float fp;
   char s[81];
   char c;

   errno_t err = fopen_s( &stream, "fscanf.out", "w+" );
   if( err )
      printf_s( "The file fscanf.out was not opened\n" );
   else
   {
      fprintf_s( stream, "%s %ld %f%c", "a-string",
               65000, 3.14159, 'x' );
      // Set pointer to beginning of file:
      fseek( stream, 0L, SEEK_SET );

      // Read data back from file:
      fscanf_s( stream, "%s", s, _countof(s) );
      fscanf_s( stream, "%ld", &l );

      fscanf_s( stream, "%f", &fp );
      fscanf_s( stream, "%c", &c, 1 );

      // Output data read:
      printf( "%s\n", s );
      printf( "%ld\n", l );
      printf( "%f\n", fp );
      printf( "%c\n", c );

      fclose( stream );
   }
}
```

```
a-string
65000
3.141590
x
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`_cscanf_s`, `_cscanf_s_l`, `_cwscanf_s`, `_cwscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cscanf-s-cscanf-s-l-cwscanf-s-cwscanf-s-l?view=msvc-170)  
[`fprintf_s`, `_fprintf_s_l`, `fwprintf_s`, `_fwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-s-fprintf-s-l-fwprintf-s-fwprintf-s-l?view=msvc-170)  
[`scanf_s`, `_scanf_s_l`, `wscanf_s`, `_wscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-s-scanf-s-l-wscanf-s-wscanf-s-l?view=msvc-170)  
[`sscanf_s`, `_sscanf_s_l`, `swscanf_s`, `_swscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-s-sscanf-s-l-swscanf-s-swscanf-s-l?view=msvc-170)  
[`fscanf`, `_fscanf_l`, `fwscanf`, `_fwscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fscanf-fscanf-l-fwscanf-fwscanf-l?view=msvc-170)