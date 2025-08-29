---
title: "vscanf, vwscanf"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vscanf-vwscanf?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reads formatted data from the standard input stream. More secure versions of these functions are available; see [`vscanf_s`, `vwscanf_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vscanf-s-vwscanf-s?view=msvc-170).

## Syntax

```
int vscanf(
   const char *format,
   va_list arglist
);
int vwscanf(
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

Returns the number of fields that are successfully converted and assigned; the return value doesn't include fields that were read but not assigned. A return value of 0 indicates that no fields were assigned.

If _`format`_ is a `NULL` pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return `EOF` and set `errno` to `EINVAL`.

For information about these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`vscanf`** function reads data from the standard input stream `stdin` and writes the data into the locations that are given by the _`arglist`_ argument list. Each argument in the list must be a pointer to a variable of a type that corresponds to a type specifier in _`format`_. If copying occurs between strings that overlap, the behavior is undefined.

Important

When you use **`vscanf`** to read a string, always specify a width for the **%s** format (for example, **"%32s"** instead of **"%s"**); otherwise, incorrectly formatted input can cause a buffer overrun. As an alternative, you can use [`vscanf_s`, `vwscanf_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vscanf-s-vwscanf-s?view=msvc-170) or [`fgets`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgets-fgetws?view=msvc-170).

**`vwscanf`** is a wide-character version of **`vscanf`**; the _`format`_ argument to **`vwscanf`** is a wide-character string. **`vwscanf`** and **`vscanf`** behave identically if the stream is opened in ANSI mode. **`vscanf`** doesn't support input from a UNICODE stream.

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_vtscanf`

**`vscanf`**

**`vscanf`**

**`vwscanf`**

For more information, see [Format specification fields: `scanf` and `wscanf` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-fields-scanf-and-wscanf-functions?view=msvc-170).

## Requirements

Routine

Required header

**`vscanf`**

<stdio.h>

**`vwscanf`**

<stdio.h> or <wchar.h>

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles that are associated with the console, `stdin`, `stdout`, and `stderr`, must be redirected before C run-time functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_vscanf.c
// compile with: /W3
// This program uses the vscanf and vwscanf functions
// to read formatted input.

#include <stdio.h>
#include <stdarg.h>

int call_vscanf(char *format, ...)
{
    int result;
    va_list arglist;
    va_start(arglist, format);
    result = vscanf(format, arglist);
    va_end(arglist);
    return result;
}

int call_vwscanf(wchar_t *format, ...)
{
    int result;
    va_list arglist;
    va_start(arglist, format);
    result = vwscanf(format, arglist);
    va_end(arglist);
    return result;
}

int main( void )
{
    int   i, result;
    float fp;
    char  c, s[81];
    wchar_t wc, ws[81];
    result = call_vscanf( "%d %f %c %C %80s %80S", &i, &fp, &c, &wc, s, ws );
    printf( "The number of fields input is %d\n", result );
    printf( "The contents are: %d %f %c %C %s %S\n", i, fp, c, wc, s, ws);
    result = call_vwscanf( L"%d %f %hc %lc %80S %80ls", &i, &fp, &c, &wc, s, ws );
    wprintf( L"The number of fields input is %d\n", result );
    wprintf( L"The contents are: %d %f %C %c %hs %s\n", i, fp, c, wc, s, ws);
}
```

```

      71 98.6 h z Byte characters
36 92.3 y n Wide charactersThe number of fields input is 6
The contents are: 71 98.599998 h z Byte characters
The number of fields input is 6
The contents are: 36 92.300003 y n Wide characters
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`fscanf`, `_fscanf_l`, `fwscanf`, `_fwscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fscanf-fscanf-l-fwscanf-fwscanf-l?view=msvc-170)  
[`printf`, `_printf_l`, `wprintf`, `_wprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170)  
[`sprintf`, `_sprintf_l`, `swprintf`, `_swprintf_l`, `__swprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-sprintf-l-swprintf-swprintf-l-swprintf-l?view=msvc-170)  
[`sscanf`, `_sscanf_l`, `swscanf`, `_swscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-sscanf-l-swscanf-swscanf-l?view=msvc-170)  
[`vscanf_s`, `vwscanf_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vscanf-s-vwscanf-s?view=msvc-170)