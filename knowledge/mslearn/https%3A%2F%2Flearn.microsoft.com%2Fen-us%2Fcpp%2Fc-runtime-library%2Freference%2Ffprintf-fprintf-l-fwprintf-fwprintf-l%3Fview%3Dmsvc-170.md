---
title: "fprintf, _fprintf_l, fwprintf, _fwprintf_l, _ftprintf, _ftprintf_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-fprintf-l-fwprintf-fwprintf-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Print formatted data to a stream. More secure versions of these functions are available; see [`fprintf_s`, `_fprintf_s_l`, `fwprintf_s`, `_fwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-s-fprintf-s-l-fwprintf-s-fwprintf-s-l?view=msvc-170).

For `_ftprintf` and `_ftprintf_l`, see [Generic-text function mappings](#generic-text-function-mappings).

## Syntax

```
int fprintf(
   FILE *stream,
   const char *format [,
   argument ]...
);
int _fprintf_l(
   FILE *stream,
   const char *format,
   _locale_t locale [,
   argument ]...
);
int fwprintf(
   FILE *stream,
   const wchar_t *format [,
   argument ]...
);
int _fwprintf_l(
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

**`fprintf`** returns the number of bytes written. **`fwprintf`** returns the number of wide characters written. Each of these functions returns a negative value instead when an output error occurs. If _`stream`_ or _`format`_ is `NULL`, these functions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the functions return -1 and set `errno` to `EINVAL`. The format string isn't checked for valid formatting characters as it is when using **`fprintf_s`** or **`fwprintf_s`**.

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

**`fprintf`** formats and prints a series of characters and values to the output _`stream`_. Each function _`argument`_ (if any) is converted and output according to the corresponding format specification in _`format`_. For **`fprintf`**, the _`format`_ argument has the same syntax that it has in **`printf`**.

**`fwprintf`** is a wide-character version of **`fprintf`**; in **`fwprintf`**, _`format`_ is a wide-character string. These functions behave identically if the stream is opened in ANSI mode. **`fprintf`** doesn't currently support output into a UNICODE stream.

The versions of these functions with the **`_l`** suffix are identical except that they use the locale parameter passed in instead of the current thread locale.

Important

Ensure that _`format`_ is not a user-defined string.

Starting in Windows 10 version 2004 (build 19041), the `printf` family of functions prints exactly representable floating point numbers according to the IEEE 754 rules for rounding. In previous versions of Windows, exactly representable floating point numbers ending in '5' would always round up. IEEE 754 states that they must round to the closest even digit (also known as "Banker's Rounding"). For example, both `printf("%1.0f", 1.5)` and `printf("%1.0f", 2.5)` should round to 2. Previously, 1.5 would round to 2 and 2.5 would round to 3. This change only affects exactly representable numbers. For example, 2.35 (which, when represented in memory, is closer to 2.35000000000000008) continues to round up to 2.4. Rounding done by these functions now also respects the floating point rounding mode set by [`fesetround`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetround-fesetround2?view=msvc-170). Previously, rounding always chose `FE_TONEAREST` behavior. This change only affects programs built using Visual Studio 2019 version 16.2 and later. To use the legacy floating point rounding behavior, link with [`legacy_stdio_float_rounding.obj`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/link-options?view=msvc-170).

### Generic-text function mappings

The function in the `tchar.h` column maps to the function in the other columns depending on the character set that is defined at compile time.

`tchar.h` function

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_ftprintf`

`fprintf`

`fprintf`

`fwprintf`

`_ftprintf_l`

`_fprintf_l`

`_fprintf_l`

`_fwprintf_l`

For more information, see [Format specification syntax](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-syntax-printf-and-wprintf-functions?view=msvc-170).

## Requirements

Function

Required header

**`fprintf`**, **`_fprintf_l`**

`<stdio.h>`

**`fwprintf`**, **`_fwprintf_l`**

`<stdio.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_fprintf.c
/* This program uses fprintf to format various
* data and print it to the file named FPRINTF.OUT. It
* then displays FPRINTF.OUT on the screen using the system
* function to invoke the operating-system TYPE command.
*/

#include <stdio.h>
#include <process.h>

FILE *stream;

int main( void )
{
   int    i = 10;
   double fp = 1.5;
   char   s[] = "this is a string";
   char   c = '\n';

   fopen_s( &stream, "fprintf.out", "w" );
   fprintf( stream, "%s%c", s, c );
   fprintf( stream, "%d\n", i );
   fprintf( stream, "%f\n", fp );
   fclose( stream );
   system( "type fprintf.out" );
}
```

```
this is a string
10
1.500000
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`_cprintf`, `_cprintf_l`, `_cwprintf`, `_cwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-cprintf-l-cwprintf-cwprintf-l?view=msvc-170)  
[`fscanf`, `_fscanf_l`, `fwscanf`, `_fwscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fscanf-fscanf-l-fwscanf-fwscanf-l?view=msvc-170)  
[`sprintf`, `_sprintf_l`, `swprintf`, `_swprintf_l`, `_swprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-sprintf-l-swprintf-swprintf-l-swprintf-l?view=msvc-170)  
[Format specification syntax: `printf` and `wprintf` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-syntax-printf-and-wprintf-functions?view=msvc-170)