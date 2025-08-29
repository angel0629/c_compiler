---
title: "vscanf_s, vwscanf_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vscanf-s-vwscanf-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reads formatted data from the standard input stream. These versions of [`vscanf`, `vwscanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vscanf-vwscanf?view=msvc-170) have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
int vscanf_s(
   const char *format,
   va_list arglist
);
int vwscanf_s(
   const wchar_t *format,
   va_list arglist
);
```

### Parameters

_`format`_  
Format control string.

_`arglist`_  
Variable argument list.

## Return value

Returns the number of fields successfully converted and assigned; the return value doesn't include fields that were read but not assigned. A return value of 0 indicates that no fields were assigned. The return value is `EOF` for an error, or if the end-of-file character or the end-of-string character is encountered in the first attempt to read a character. If _`format`_ is a `NULL` pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, **`vscanf_s`** and **`vwscanf_s`** return `EOF` and set `errno` to `EINVAL`.

For information about these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`vscanf_s`** function reads data from the standard input stream `stdin` and writes the data into the locations that are given by the _`arglist`_ argument list. Each argument in the list must be a pointer to a variable of a type that corresponds to a type specifier in _`format`_. If copying occurs between strings that overlap, the behavior is undefined.

**`vwscanf_s`** is a wide-character version of **`vscanf_s`**; the _`format`_ argument to **`vwscanf_s`** is a wide-character string. **`vwscanf_s`** and **`vscanf_s`** behave identically if the stream is opened in ANSI mode. **`vscanf_s`** doesn't support input from a UNICODE stream.

Unlike `vscanf` and `vwscanf`, **`vscanf_s`** and **`vwscanf_s`** require the buffer size to be specified for all input parameters of type **c**, **C**, **s**, **S**, or string control sets that are enclosed in **\[\]**. The buffer size in characters is passed as another parameter immediately following the pointer to the buffer or variable. The buffer size in characters for a **`wchar_t`** string isn't the same as the size in bytes.

The buffer size includes the terminating null. You can use a width-specification field to ensure that the token that's read in will fit into the buffer. If no width specification field is used, and the token read in is too large to fit in the buffer, nothing is written to that buffer.

Note

The _`size`_ parameter is of type **`unsigned`**, not `size_t`.

For more information, see [scanf Width Specification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/scanf-width-specification?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_vtscanf_s`

**`vscanf_s`**

**`vscanf_s`**

**`vwscanf_s`**

For more information, see [Format specification fields: `scanf` and `wscanf` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-fields-scanf-and-wscanf-functions?view=msvc-170).

## Requirements

Routine

Required header

**`vscanf_s`**

<stdio.h>

**`wscanf_s`**

<stdio.h> or <wchar.h>

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles that are associated with the console, `stdin`, `stdout`, and `stderr`, must be redirected before C run-time functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_vscanf_s.c
// compile with: /W3
// This program uses the vscanf_s and vwscanf_s functions
// to read formatted input.

#include <stdio.h>
#include <stdarg.h>
#include <stdlib.h>

int call_vscanf_s(char *format, ...)
{
    int result;
    va_list arglist;
    va_start(arglist, format);
    result = vscanf_s(format, arglist);
    va_end(arglist);
    return result;
}

int call_vwscanf_s(wchar_t *format, ...)
{
    int result;
    va_list arglist;
    va_start(arglist, format);
    result = vwscanf_s(format, arglist);
    va_end(arglist);
    return result;
}

int main( void )
{
    int   i, result;
    float fp;
    char  c, s[81];
    wchar_t wc, ws[81];
    result = call_vscanf_s("%d %f %c %C %s %S", &i, &fp, &c, 1,
                           &wc, 1, s, _countof(s), ws, _countof(ws) );
    printf( "The number of fields input is %d\n", result );
    printf( "The contents are: %d %f %c %C %s %S\n", i, fp, c, wc, s, ws);
    result = call_vwscanf_s(L"%d %f %hc %lc %S %ls", &i, &fp, &c, 2,
                            &wc, 1, s, _countof(s), ws, _countof(ws) );
    wprintf( L"The number of fields input is %d\n", result );
    wprintf( L"The contents are: %d %f %C %c %hs %s\n", i, fp, c, wc, s, ws);
}
```

When this program is given the input in the example, it produces this output:

```
71 98.6 h z Byte characters
36 92.3 y n Wide characters
```

```
The number of fields input is 6
The contents are: 71 98.599998 h z Byte characters
The number of fields input is 6
The contents are: 36 92.300003 y n Wide characters
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`printf`, `_printf_l`, `wprintf`, `_wprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170)  
[`scanf`, `_scanf_l`, `wscanf`, `_wscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-scanf-l-wscanf-wscanf-l?view=msvc-170)  
[`scanf_s`, `_scanf_s_l`, `wscanf_s`, `_wscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-s-scanf-s-l-wscanf-s-wscanf-s-l?view=msvc-170)  
[`vscanf`, `vwscanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vscanf-vwscanf?view=msvc-170)