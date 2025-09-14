---
title: "vfscanf, vfwscanf"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vfscanf-vfwscanf?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reads formatted data from a stream. More secure versions of these functions are available; see [`vfscanf_s`, `vfwscanf_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vfscanf-s-vfwscanf-s?view=msvc-170).

## Syntax

```
int vfscanf(
   FILE *stream,
   const char *format,
   va_list argptr
);
int vfwscanf(
   FILE *stream,
   const wchar_t *format,
   va_list argptr
);
```

### Parameters

_`stream`_  
Pointer to `FILE` structure.

_`format`_  
Format-control string.

_`arglist`_  
Variable argument list.

## Return value

Each of these functions returns the number of fields that are successfully converted and assigned. The return value doesn't include fields that are read but not assigned. A return value of 0 indicates that no fields were assigned. If an error occurs, or if the end of the file stream is reached before the first conversion, the return value is `EOF` for **`vfscanf`** and **`vfwscanf`**.

These functions validate their parameters. If _`stream`_ or _`format`_ is a null pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return `EOF` and set `errno` to `EINVAL`.

The **`vfscanf`** function reads data from the current position of _`stream`_ into the locations that are given by the _`arglist`_ argument list. Each argument in the list must be a pointer to a variable of a type that corresponds to a type specifier in _`format`_. _`format`_ controls the interpretation of the input fields and has the same form and function as the _`format`_ argument for `scanf`; see [`scanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-scanf-l-wscanf-wscanf-l?view=msvc-170) for a description of _`format`_.

**`vfwscanf`** is a wide-character version of **`vfscanf`**; the format argument to **`vfwscanf`** is a wide-character string. These functions behave identically if the stream is opened in ANSI mode. **`vfscanf`** doesn't support input from a UNICODE stream.

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_vftscanf`

**`vfscanf`**

**`vfscanf`**

**`vfwscanf`**

For more information, see [Format specification fields: `scanf` and `wscanf` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-fields-scanf-and-wscanf-functions?view=msvc-170).

## Requirements

Function

Required header

**`vfscanf`**

<stdio.h>

**`vfwscanf`**

<stdio.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_vfscanf.c
// compile with: /W3
// This program writes formatted
// data to a file. It then uses vfscanf to
// read the various data back from the file.

#include <stdio.h>
#include <stdarg.h>

FILE *stream;

int call_vfscanf(FILE * istream, char * format, ...)
{
    int result;
    va_list arglist;
    va_start(arglist, format);
    result = vfscanf(istream, format, arglist);
    va_end(arglist);
    return result;
}

int main(void)
{
    long l;
    float fp;
    char s[81];
    char c;

    if (fopen_s(&stream, "vfscanf.out", "w+") != 0)
    {
        printf("The file vfscanf.out was not opened\n");
    }
    else
    {
        fprintf(stream, "%s %ld %f%c", "a-string",
            65000, 3.14159, 'x');
        // Security caution!
        // Beware loading data from a file without confirming its size,
        // as it may lead to a buffer overrun situation.

        // Set pointer to beginning of file:
        fseek(stream, 0L, SEEK_SET);

        // Read data back from file:
        call_vfscanf(stream, "%s %ld %f%c", s, &l, &fp, &c);

        // Output data read:
        printf("%s\n", s);
        printf("%ld\n", l);
        printf("%f\n", fp);
        printf("%c\n", c);

        fclose(stream);
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
[`_cscanf`, `_cscanf_l`, `_cwscanf`, `_cwscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cscanf-cscanf-l-cwscanf-cwscanf-l?view=msvc-170)  
[`fprintf`, `_fprintf_l`, `fwprintf`, `_fwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-fprintf-l-fwprintf-fwprintf-l?view=msvc-170)  
[`scanf`, `_scanf_l`, `wscanf`, `_wscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-scanf-l-wscanf-wscanf-l?view=msvc-170)  
[`sscanf`, `_sscanf_l`, `swscanf`, `_swscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-sscanf-l-swscanf-swscanf-l?view=msvc-170)  
[`fscanf_s`, `_fscanf_s_l`, `fwscanf_s`, `_fwscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fscanf-s-fscanf-s-l-fwscanf-s-fwscanf-s-l?view=msvc-170)  
[`vfscanf_s`, `vfwscanf_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vfscanf-s-vfwscanf-s?view=msvc-170)