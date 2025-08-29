---
title: "scanf_s, _scanf_s_l, wscanf_s, _wscanf_s_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-s-scanf-s-l-wscanf-s-wscanf-s-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reads formatted data from the standard input stream. These versions of [`scanf`, `_scanf_l`, `wscanf`, `_wscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-scanf-l-wscanf-wscanf-l?view=msvc-170) have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
int scanf_s(
   const char *format [,
   argument]...
);
int _scanf_s_l(
   const char *format,
   _locale_t locale [,
   argument]...
);
int wscanf_s(
   const wchar_t *format [,
   argument]...
);
int _wscanf_s_l(
   const wchar_t *format,
   _locale_t locale [,
   argument]...
);
```

### Parameters

_`format`_  
Format control string.

_`argument`_  
Optional arguments.

_`locale`_  
The locale to use.

## Return value

Returns the number of fields successfully converted and assigned. The return value doesn't include fields that were read but not assigned. A return value of 0 indicates no fields were assigned. The return value is `EOF` for an error, or if the end-of-file character or the end-of-string character is found in the first attempt to read a character. If _`format`_ is a `NULL` pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, **`scanf_s`** and **`wscanf_s`** return `EOF` and set `errno` to `EINVAL`.

For information about these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`scanf_s`** function reads data from the standard input stream, **`stdin`**, and writes it into _`argument`_. Each _`argument`_ must be a pointer to a variable type that corresponds to the type specifier in _`format`_. If copying occurs between strings that overlap, the behavior is undefined.

**`wscanf_s`** is a wide-character version of **`scanf_s`**; the _`format`_ argument to **`wscanf_s`** is a wide-character string. **`wscanf_s`** and **`scanf_s`** behave identically if the stream is opened in ANSI mode. **`scanf_s`** doesn't currently support input from a UNICODE stream.

The versions of these functions that have the `_l` suffix are identical, except they use the _`locale`_ parameter instead of the current thread locale.

Unlike **`scanf`** and **`wscanf`**, **`scanf_s`** and **`wscanf_s`** require you to specify buffer sizes for some parameters. Specify the sizes for all **`c`**, **`C`**, **`s`**, **`S`**, or string control set **`[]`** parameters. The buffer size in characters is passed as another parameter. It immediately follows the pointer to the buffer or variable. For example, if you're reading a string, the buffer size for that string is passed as follows:

```
char s[10];
scanf_s("%9s", s, (unsigned)_countof(s)); // buffer size is 10, width specification is 9
```

The buffer size includes the terminal null. You can use a width specification field to ensure the token that's read in fits into the buffer. When a token is too large to fit, nothing is written to the buffer unless there's a width specification.

Note

The size parameter is of type **`unsigned`**, not **`size_t`**. Use a static cast to convert a **`size_t`** value to **`unsigned`** for 64-bit build configurations.

The buffer size parameter describes the maximum number of characters, not bytes. In this example, the width of the buffer type doesn't match the width of the format specifier.

```
wchar_t ws[10];
wscanf_s(L"%9S", ws, (unsigned)_countof(ws));
```

The **`S`** format specifier means use the character width that's "opposite" the default width supported by the function. The character width is single byte, but the function supports double-byte characters. This example reads in a string of up to nine single-byte-wide characters and puts them in a double-byte-wide character buffer. The characters are treated as single-byte values; the first two characters are stored in `ws[0]`, the second two are stored in `ws[1]`, and so on.

This example reads a single character:

```
char c;
scanf_s("%c", &c, 1);
```

When multiple characters for non-null-terminated strings are read, integers are used for both the width specification and the buffer size.

```
char c[4];
scanf_s("%4c", c, (unsigned)_countof(c)); // not null terminated
```

For more information, see [`scanf` Width Specification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/scanf-width-specification?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tscanf_s`

**`scanf_s`**

**`scanf_s`**

**`wscanf_s`**

`_tscanf_s_l`

**`_scanf_s_l`**

**`_scanf_s_l`**

**`_wscanf_s_l`**

For more information, see [Format specification fields: `scanf` and `wscanf` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-fields-scanf-and-wscanf-functions?view=msvc-170).

## Requirements

Routine

Required header

**`scanf_s`**, **`_scanf_s_l`**

`<stdio.h>`

**`wscanf_s`**, **`_wscanf_s_l`**

`<stdio.h>` or `<wchar.h>`

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles **`stdin`**, **`stdout`**, and **`stderr`** must be redirected before C run-time functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_scanf_s.c
// This program uses the scanf_s and wscanf_s functions
// to read formatted input.

#include <stdio.h>
#include <stdlib.h>

int main( void )
{
   int      i,
            result;
   float    fp;
   char     c,
            s[80];
   wchar_t  wc,
            ws[80];

   result = scanf_s( "%d %f %c %C %s %S", &i, &fp, &c, 1,
                     &wc, 1, s, (unsigned)_countof(s), ws, (unsigned)_countof(ws) );
   printf( "The number of fields input is %d\n", result );
   printf( "The contents are: %d %f %c %C %s %S\n", i, fp, c,
           wc, s, ws);
   result = wscanf_s( L"%d %f %hc %lc %S %ls", &i, &fp, &c, 2,
                      &wc, 1, s, (unsigned)_countof(s), ws, (unsigned)_countof(ws) );
   wprintf( L"The number of fields input is %d\n", result );
   wprintf( L"The contents are: %d %f %C %c %hs %s\n", i, fp,
            c, wc, s, ws);
}
```

This program produces the following output when given this input:

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
[`fscanf`, `_fscanf_l`, `fwscanf`, `_fwscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fscanf-fscanf-l-fwscanf-fwscanf-l?view=msvc-170)  
[`printf`, `_printf_l`, `wprintf`, `_wprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170)  
[`sprintf`, `_sprintf_l`, `swprintf`, `_swprintf_l`, `__swprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-sprintf-l-swprintf-swprintf-l-swprintf-l?view=msvc-170)  
[`sscanf`, `_sscanf_l`, `swscanf`, `_swscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-sscanf-l-swscanf-swscanf-l?view=msvc-170)