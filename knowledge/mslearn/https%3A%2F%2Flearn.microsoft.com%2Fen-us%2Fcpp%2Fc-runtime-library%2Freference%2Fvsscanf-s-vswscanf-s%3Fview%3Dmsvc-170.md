---
title: "vsscanf_s, vswscanf_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsscanf-s-vswscanf-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reads formatted data from a string. These versions of [`vsscanf`, `vswscanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsscanf-vswscanf?view=msvc-170) have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
int vsscanf_s(
   const char *buffer,
   const char *format,
   va_list argptr
);
int vswscanf_s(
   const wchar_t *buffer,
   const wchar_t *format,
   va_list arglist
);
```

### Parameters

_`buffer`_  
Stored data

_`format`_  
Format-control string. For more information, see [Format specification fields: `scanf` and `wscanf` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-fields-scanf-and-wscanf-functions?view=msvc-170).

_`arglist`_  
Variable argument list.

## Return value

Each of these functions returns the number of fields that are successfully converted and assigned. The return value doesn't include fields that were read but not assigned. A return value of 0 indicates that no fields were assigned. The return value is `EOF` for an error or if the end of the string is reached before the first conversion.

If _`buffer`_ or _`format`_ is a `NULL` pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return -1 and set `errno` to `EINVAL`.

For information about these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`vsscanf_s`** function reads data from _`buffer`_ into the locations that are given by each argument in the _`arglist`_ argument list. The arguments in the argument list specify pointers to variables that have a type that corresponds to a type specifier in _`format`_. Unlike the less secure version **`vsscanf`**, a buffer size parameter is required when you use the type field characters **c**, **C**, **s**, **S**, or string-control sets that are enclosed in **\[\]**. The buffer size in characters must be supplied as another parameter immediately after each buffer parameter that requires it.

The buffer size includes the terminating null. A width specification field may be used to ensure that the token that's read in will fit into the buffer. If no width specification field is used, and the token read in is too large to fit in the buffer, nothing is written to that buffer.

For more information, see [`scanf_s`, `_scanf_s_l`, `wscanf_s`, `_wscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-s-scanf-s-l-wscanf-s-wscanf-s-l?view=msvc-170) and [scanf Type Field Characters](https://learn.microsoft.com/en-us/cpp/c-runtime-library/scanf-type-field-characters?view=msvc-170).

Note

The size parameter is of type **`unsigned`**, not `size_t`.

The _`format`_ argument controls the interpretation of the input fields and has the same form and function as the _`format`_ argument for the `scanf_s` function. If copying occurs between strings that overlap, the behavior is undefined.

**`vswscanf_s`** is a wide-character version of **`vsscanf_s`**; the arguments to **`vswscanf_s`** are wide-character strings. **`vsscanf_s`** doesn't handle multibyte hexadecimal characters. **`vswscanf_s`** doesn't handle Unicode full-width hexadecimal or "compatibility zone" characters. Otherwise, **`vswscanf_s`** and **`vsscanf_s`** behave identically.

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_vstscanf_s`

**`vsscanf_s`**

**`vsscanf_s`**

**`vswscanf_s`**

## Requirements

Routine

Required header

**`vsscanf_s`**

<stdio.h>

**`vswscanf_s`**

<stdio.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_vsscanf_s.c
// compile with: /W3
// This program uses vsscanf_s to read data items
// from a string named tokenstring, then displays them.

#include <stdio.h>
#include <stdarg.h>
#include <stdlib.h>

int call_vsscanf_s(char *tokenstring, char *format, ...)
{
    int result;
    va_list arglist;
    va_start(arglist, format);
    result = vsscanf_s(tokenstring, format, arglist);
    va_end(arglist);
    return result;
}

int main( void )
{
    char  tokenstring[] = "15 12 14...";
    char  s[81];
    char  c;
    int   i;
    float fp;

    // Input various data from tokenstring:
    // max 80 character string:
    call_vsscanf_s(tokenstring, "%80s", s, _countof(s));
    call_vsscanf_s(tokenstring, "%c", &c, sizeof(char));
    call_vsscanf_s(tokenstring, "%d", &i);
    call_vsscanf_s(tokenstring, "%f", &fp);

    // Output the data read
    printf("String    = %s\n", s);
    printf("Character = %c\n", c);
    printf("Integer:  = %d\n", i);
    printf("Real:     = %f\n", fp);
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
[`scanf`, `_scanf_l`, `wscanf`, `_wscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-scanf-l-wscanf-wscanf-l?view=msvc-170)  
[`sscanf`, `_sscanf_l`, `swscanf`, `_swscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-sscanf-l-swscanf-swscanf-l?view=msvc-170)  
[`sscanf_s`, `_sscanf_s_l`, `swscanf_s`, `_swscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-s-sscanf-s-l-swscanf-s-swscanf-s-l?view=msvc-170)  
[`sprintf`, `_sprintf_l`, `swprintf`, `_swprintf_l`, `__swprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-sprintf-l-swprintf-swprintf-l-swprintf-l?view=msvc-170)  
[`vsscanf`, `vswscanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsscanf-vswscanf?view=msvc-170)