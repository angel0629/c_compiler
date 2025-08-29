---
title: "_cscanf_s, _cscanf_s_l, _cwscanf_s, _cwscanf_s_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cscanf-s-cscanf-s-l-cwscanf-s-cwscanf-s-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reads formatted data from the console. These more secure versions of [`_cscanf`, `_cscanf_l`, `_cwscanf`, `_cwscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cscanf-cscanf-l-cwscanf-cwscanf-l?view=msvc-170) have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
int _cscanf_s(
   const char *format [,
   argument] ...
);
int _cscanf_s_l(
   const char *format,
   _locale_t locale [,
   argument] ...
);
int _cwscanf_s(
   const wchar_t *format [,
   argument] ...
);
int _cwscanf_s_l(
   const wchar_t *format,
   _locale_t locale [,
   argument] ...
);
```

### Parameters

_`format`_  
Format-control string.

_`argument`_  
Optional parameters.

_`locale`_  
The locale to use.

## Return value

The number of fields that were successfully converted and assigned. The return value doesn't include fields that were read but not assigned. The return value is `EOF` for an attempt to read at end of file. An `EOF` can also be returned when keyboard input is redirected at the operating-system command-line level. A return value of zero means that no fields were assigned.

These functions validate their parameters. If _`format`_ is a null pointer, these functions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return `EOF`, and `errno` is set to `EINVAL`.

The **`_cscanf_s`** function reads data directly from the console into the locations given by _`argument`_. The [`_getche`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getch-getwch?view=msvc-170) function is used to read characters. Each optional parameter must be a pointer to a variable with a type that corresponds to a type specifier in _`format`_. The format controls the interpretation of the input fields and has the same form and function as the _`format`_ parameter for the [`scanf_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-scanf-l-wscanf-wscanf-l?view=msvc-170) function. While **`_cscanf_s`** normally echoes the input character, it doesn't do so if the last call was to `_ungetch`.

Like other secure versions of functions in the `scanf` family, **`_cscanf_s`** and **`_cwscanf_s`** require size arguments for the type field characters **c**, **C**, **s**, **S**, and **\[**. For more information, see [scanf Width Specification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/scanf-width-specification?view=msvc-170).

Note

The size parameter is of type **`unsigned`**, not `size_t`.

The versions of these functions with the `_l` suffix are identical except that they use the locale parameter passed in instead of the current thread locale.

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcscanf_s`

**`_cscanf_s`**

**`_cscanf_s`**

**`_cwscanf_s`**

`_tcscanf_s_l`

**`_cscanf_s_l`**

**`_cscanf_s_l`**

**`_cwscanf_s_l`**

## Requirements

Routine

Required header

**`_cscanf_s`**, **`_cscanf_s_l`**

<conio.h>

**`_cwscanf_s`**, **`_cwscanf_s_l`**

<conio.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_cscanf_s.c
/* This program prompts for a string
* and uses _cscanf_s to read in the response.
* Then _cscanf_s returns the number of items
* matched, and the program displays that number.
*/

#include <stdio.h>
#include <conio.h>

int main( void )
{
   int result, n[3];
   int i;

   result = _cscanf_s( "%i %i %i", &n[0], &n[1], &n[2] );
   _cprintf_s( "\r\nYou entered " );
   for( i=0; i<result; i++ )
      _cprintf_s( "%i ", n[i] );
   _cprintf_s( "\r\n" );
}
```

```
1 2 3
```

```
You entered 1 2 3
```

## See also

[Console and port I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/console-and-port-i-o?view=msvc-170)  
[`_cprintf`, `_cprintf_l`, `_cwprintf`, `_cwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-cprintf-l-cwprintf-cwprintf-l?view=msvc-170)  
[`fscanf_s`, `_fscanf_s_l`, `fwscanf_s`, `_fwscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fscanf-s-fscanf-s-l-fwscanf-s-fwscanf-s-l?view=msvc-170)  
[`scanf_s`, `_scanf_s_l`, `wscanf_s`, `_wscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-s-scanf-s-l-wscanf-s-wscanf-s-l?view=msvc-170)  
[`sscanf_s`, `_sscanf_s_l`, `swscanf_s`, `_swscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-s-sscanf-s-l-swscanf-s-swscanf-s-l?view=msvc-170)