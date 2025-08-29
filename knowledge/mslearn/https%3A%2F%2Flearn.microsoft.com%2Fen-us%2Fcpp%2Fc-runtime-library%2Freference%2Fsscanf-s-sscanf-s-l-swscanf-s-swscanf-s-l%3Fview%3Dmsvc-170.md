---
title: "sscanf_s, _sscanf_s_l, swscanf_s, _swscanf_s_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-s-sscanf-s-l-swscanf-s-swscanf-s-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reads formatted data from a string. These versions of [`sscanf`, `_sscanf_l`, `swscanf`, `_swscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-sscanf-l-swscanf-swscanf-l?view=msvc-170) have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
int sscanf_s(
   const char *buffer,
   const char *format [,
   argument ] ...
);
int _sscanf_s_l(
   const char *buffer,
   const char *format,
   _locale_t locale [,
   argument ] ...
);
int swscanf_s(
   const wchar_t *buffer,
   const wchar_t *format [,
   argument ] ...
);
int _swscanf_s_l(
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
Format-control string. For more information, see [Format specification fields: `scanf` and `wscanf` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-fields-scanf-and-wscanf-functions?view=msvc-170).

_`argument`_  
Optional arguments

_`locale`_  
The locale to use

## Return value

Each of these functions returns the number of fields that are successfully converted and assigned. The return value doesn't include fields that were read but not assigned. A return value of 0 indicates that no fields were assigned. The return value is `EOF` for an error or if the end of the string is reached before the first conversion.

If _`buffer`_ or _`format`_ is a `NULL` pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return -1 and set `errno` to `EINVAL`

For information about these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`sscanf_s`** function reads data from _`buffer`_ into the location that's given by each _`argument`_. The arguments after the format string specify pointers to variables that have a type that corresponds to a type specifier in _`format`_. Unlike the less secure version [`sscanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-sscanf-l-swscanf-swscanf-l?view=msvc-170), a buffer size parameter is required when you use the type field characters **`c`**, **`C`**, **`s`**, **`S`**, or string control sets that are enclosed in **`[]`**. The buffer size in characters must be supplied as an extra parameter immediately after each buffer parameter that requires it. For example, if you're reading into a string, the buffer size for that string is passed as follows:

```
wchar_t ws[10];
swscanf_s(in_str, L"%9s", ws, (unsigned)_countof(ws)); // buffer size is 10, width specification is 9
```

The buffer size includes the terminating null. A width specification field may be used to ensure that the token that's read in will fit into the buffer. If no width specification field is used, and the token read in is too large to fit in the buffer, nothing is written to that buffer.

A single character may be read as follows:

```
wchar_t wc;
swscanf_s(in_str, L"%c", &wc, 1);
```

This example reads a single character from the input string and then stores it in a wide-character buffer. When you read multiple characters for non-null terminated strings, unsigned integers are used as the width specification and the buffer size.

```
char c[4];
sscanf_s(input, "%4c", &c, (unsigned)_countof(c)); // not null terminated
```

For more information, see [`scanf_s`, `_scanf_s_l`, `wscanf_s`, `_wscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-s-scanf-s-l-wscanf-s-wscanf-s-l?view=msvc-170) and [`scanf` type field characters](https://learn.microsoft.com/en-us/cpp/c-runtime-library/scanf-type-field-characters?view=msvc-170).

Note

The size parameter is of type **`unsigned`**, not **`size_t`**. When compiling for 64-bit targets, use a static cast to convert **`_countof`** or **`sizeof`** results to the correct size.

The _`format`_ argument controls the interpretation of the input fields and has the same form and function as the _`format`_ argument for the **`scanf_s`** function. If copying occurs between strings that overlap, the behavior is undefined.

**`swscanf_s`** is a wide-character version of **`sscanf_s`**; the arguments to **`swscanf_s`** are wide-character strings. **`sscanf_s`** doesn't handle multibyte hexadecimal characters. **`swscanf_s`** doesn't handle Unicode full-width hexadecimal or "compatibility zone" characters. Otherwise, **`swscanf_s`** and **`sscanf_s`** behave identically.

The versions of these functions that have the **`_l`** suffix are identical except that they use the locale parameter that's passed in instead of the current thread locale.

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_stscanf_s`

**`sscanf_s`**

**`sscanf_s`**

**`swscanf_s`**

`_stscanf_s_l`

**`_sscanf_s_l`**

**`_sscanf_s_l`**

**`_swscanf_s_l`**

## Requirements

Routine

Required header

**`sscanf_s`**, **`_sscanf_s_l`**

`<stdio.h>`

**`swscanf_s`**, **`_swscanf_s_l`**

`<stdio.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_sscanf_s.c
// This program uses sscanf_s to read data items
// from a string named tokenstring, then displays them.

#include <stdio.h>
#include <stdlib.h>

int main( void )
{
   char  tokenstring[] = "15 12 14...";
   char  s[81];
   char  c;
   int   i;
   float fp;

   // Input various data from tokenstring:
   // max 80 character string plus null terminator
   sscanf_s( tokenstring, "%s", s, (unsigned)_countof(s) );
   sscanf_s( tokenstring, "%c", &c, (unsigned)sizeof(char) );
   sscanf_s( tokenstring, "%d", &i );
   sscanf_s( tokenstring, "%f", &fp );

   // Output the data read
   printf_s( "String    = %s\n", s );
   printf_s( "Character = %c\n", c );
   printf_s( "Integer:  = %d\n", i );
   printf_s( "Real:     = %f\n", fp );
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