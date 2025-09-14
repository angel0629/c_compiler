---
title: "sscanf, _sscanf_l, swscanf, _swscanf_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-sscanf-l-swscanf-swscanf-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Read formatted data from a string. More secure versions of these functions are available; see [`sscanf_s`, `_sscanf_s_l`, `swscanf_s`, `_swscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-s-sscanf-s-l-swscanf-s-swscanf-s-l?view=msvc-170).

## Syntax

```
int sscanf(
   const char *buffer,
   const char *format [,
   argument ] ...
);
int _sscanf_l(
   const char *buffer,
   const char *format,
   _locale_t locale [,
   argument ] ...
);
int swscanf(
   const wchar_t *buffer,
   const wchar_t *format [,
   argument ] ...
);
int _swscanf_l(
   const wchar_t *buffer,
   const wchar_t *format,
   _locale_t locale [,
   argument ] ...
);
```

### Parameters

_`buffer`_  
Stored data

_`format`_  
Format-control string. For more information, see [Format specification syntax](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-fields-scanf-and-wscanf-functions?view=msvc-170).

_`argument`_  
Optional arguments

_`locale`_  
The locale to use

## Return value

Each of these functions returns the number of fields successfully converted and assigned; the return value doesn't include fields that were read but not assigned. A return value of 0 indicates that no fields were assigned. The return value is `EOF` for an error or if the end of the string is reached before the first conversion.

If _`buffer`_ or _`format`_ is a `NULL` pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return -1 and set `errno` to `EINVAL`.

For information on these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`sscanf`** function reads data from _`buffer`_ into the location given by each _`argument`_. Every _`argument`_ must be a pointer to a variable with a type that corresponds to a type specifier in _`format`_. The _`format`_ argument controls the interpretation of the input fields and has the same form and function as the _`format`_ argument for the **`scanf`** function. If copying takes place between strings that overlap, the behavior is undefined.

For information about scanf type field characters, see [`scanf` type field characters](https://learn.microsoft.com/en-us/cpp/c-runtime-library/scanf-type-field-characters?view=msvc-170). For information about scanf format specification fields, see [Format specification fields](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-fields-scanf-and-wscanf-functions?view=msvc-170).

Important

When reading a string with **`sscanf`**, always specify a width for the **`%s`** format (for example, **"`%32s`"** instead of **"`%s`"**); otherwise, improperly formatted input can easily cause a buffer overrun.

**`swscanf`** is a wide-character version of **`sscanf`**; the arguments to **`swscanf`** are wide-character strings. **`sscanf`** doesn't handle multibyte hexadecimal characters. **`swscanf`** doesn't handle Unicode full-width hexadecimal or "compatibility zone" characters. Otherwise, **`swscanf`** and **`sscanf`** behave identically.

The versions of these functions with the **`_l`** suffix are identical except that they use the locale parameter passed in instead of the current thread locale.

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_stscanf`

**`sscanf`**

**`sscanf`**

**`swscanf`**

`_stscanf_l`

**`_sscanf_l`**

**`_sscanf_l`**

**`_swscanf_l`**

## Requirements

Routine

Required header

**`sscanf`**, **`_sscanf_l`**

`<stdio.h>`

**`swscanf`**, **`_swscanf_l`**

`<stdio.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_sscanf.c
// compile with: /W3
// This program uses sscanf to read data items
// from a string named tokenstring, then displays them.

#include <stdio.h>

int main( void )
{
   char  tokenstring[] = "15 12 14...";
   char  s[81];
   char  c;
   int   i;
   float fp;

   // Input various data from tokenstring:
   // max 80 character string:
   sscanf( tokenstring, "%80s", s ); // C4996
   sscanf( tokenstring, "%c", &c );  // C4996
   sscanf( tokenstring, "%d", &i );  // C4996
   sscanf( tokenstring, "%f", &fp ); // C4996
   // Note: sscanf is deprecated; consider using sscanf_s instead

   // Output the data read
   printf( "String    = %s\n", s );
   printf( "Character = %c\n", c );
   printf( "Integer:  = %d\n", i );
   printf( "Real:     = %f\n", fp );
}
```

```
String    = 15
Character = 1
Integer:  = 15
Real:     = 15.000000
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fscanf`, `_fscanf_l`, `fwscanf`, `_fwscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fscanf-fscanf-l-fwscanf-fwscanf-l?view=msvc-170)  
[`scanf`, `_scanf_l`, `wscanf`, `_wscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-scanf-l-wscanf-wscanf-l?view=msvc-170)  
[`sprintf`, `_sprintf_l`, `swprintf`, `_swprintf_l`, `__swprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-sprintf-l-swprintf-swprintf-l-swprintf-l?view=msvc-170)  
[`snprintf`, `_snprintf`, `_snprintf_l`, `_snwprintf`, `_snwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/snprintf-snprintf-snprintf-l-snwprintf-snwprintf-l?view=msvc-170)