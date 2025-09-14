---
title: "_cprintf, _cprintf_l, _cwprintf, _cwprintf_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-cprintf-l-cwprintf-cwprintf-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Formats and prints to the console. More-secure versions are available; see [`_cprintf_s`, `_cprintf_s_l`, `_cwprintf_s`, `_cwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-s-cprintf-s-l-cwprintf-s-cwprintf-s-l?view=msvc-170).

## Syntax

```
int _cprintf(
   const char * format [, argument_list]
);
int _cprintf_l(
   const char * format,
   _locale_t locale [, argument_list]
);
int _cwprintf(
   const wchar * format [, argument_list]
);
int _cwprintf_l(
   const wchar * format,
   _locale_t locale [, argument_list]
);
```

### Parameters

_`format`_  
Format-control string.

_`argument_list`_  
Optional parameters for the format string.

_`locale`_  
The locale to use.

## Return value

The number of characters printed.

These functions format and print a series of characters and values directly to the console, using the `_putch` function (`_putwch` for **`_cwprintf`**) to output characters. Each argument in _`argument_list`_ (if any) is converted and output according to the corresponding format specification in _`format`_. The _`format`_ argument uses the [format specification syntax for printf and wprintf functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-syntax-printf-and-wprintf-functions?view=msvc-170). Unlike the `fprintf`, `printf`, and `sprintf` functions, **`_cprintf`** and **`_cwprintf`** don't translate line-feed characters into carriage return-line feed (CR-LF) combinations when output.

An important distinction is that **`_cwprintf`** displays Unicode characters when used in Windows. Unlike **`_cprintf`**, **`_cwprintf`** uses the current console locale settings.

The versions of these functions with the `_l` suffix are identical except that they use the locale parameter passed in instead of the current locale.

**`_cprintf`** validates the _`format`_ parameter. If _`format`_ is a null pointer, the function invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the function returns -1 and sets `errno` to `EINVAL`.

Important

Ensure that _`format`_ is not a user-defined string.

Starting in Windows 10 version 2004 (build 19041), the `printf` family of functions prints exactly representable floating point numbers according to the IEEE 754 rules for rounding. In previous versions of Windows, exactly representable floating point numbers ending in '5' would always round up. IEEE 754 states that they must round to the closest even digit (also known as "Banker's Rounding"). For example, both `printf("%1.0f", 1.5)` and `printf("%1.0f", 2.5)` should round to 2. Previously, 1.5 would round to 2 and 2.5 would round to 3. This change only affects exactly representable numbers. For example, 2.35 (which, when represented in memory, is closer to 2.35000000000000008) continues to round up to 2.4. Rounding done by these functions now also respects the floating point rounding mode set by [`fesetround`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetround-fesetround2?view=msvc-170). Previously, rounding always chose `FE_TONEAREST` behavior. This change only affects programs built using Visual Studio 2019 version 16.2 and later. To use the legacy floating point rounding behavior, link with [`legacy_stdio_float_rounding.obj`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/link-options?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcprintf`

**`_cprintf`**

**`_cprintf`**

**`_cwprintf`**

`_tcprintf_l`

**`_cprintf_l`**

**`_cprintf_l`**

**`_cwprintf_l`**

## Requirements

Routine

Required header

**`_cprintf`**, **`_cprintf_l`**

<conio.h>

**`_cwprintf`**, **`_cwprintf_l`**

<conio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_cprintf.c
// This program displays some variables to the console.

#include <conio.h>

int main( void )
{
    int         i = -16,
                h = 29;
    unsigned    u = 62511;
    char        c = 'A';
    char        s[] = "Test";

    // Note that console output does not translate \n as
    // standard output does. Use \r\n instead.
    //
    _cprintf( "%d  %.4x  %u  %c %s\r\n", i, h, u, c, s );
}
```

```
-16  001d  62511  A Test
```

## See also

[Console and port I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/console-and-port-i-o?view=msvc-170)  
[`_cscanf`, `_cscanf_l`, `_cwscanf`, `_cwscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cscanf-cscanf-l-cwscanf-cwscanf-l?view=msvc-170)  
[`fprintf`, `_fprintf_l`, `fwprintf`, `_fwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-fprintf-l-fwprintf-fwprintf-l?view=msvc-170)  
[`printf`, `_printf_l`, `wprintf`, `_wprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170)  
[`sprintf`, `_sprintf_l`, `swprintf`, `_swprintf_l`, `__swprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-sprintf-l-swprintf-swprintf-l-swprintf-l?view=msvc-170)  
[`vfprintf`, `_vfprintf_l`, `vfwprintf`, `_vfwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vfprintf-vfprintf-l-vfwprintf-vfwprintf-l?view=msvc-170)  
[`_cprintf_s`, `_cprintf_s_l`, `_cwprintf_s`, `_cwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-s-cprintf-s-l-cwprintf-s-cwprintf-s-l?view=msvc-170)  
[`_cprintf_p`, `_cprintf_p_l`, `_cwprintf_p`, `_cwprintf_p_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-p-cprintf-p-l-cwprintf-p-cwprintf-p-l?view=msvc-170)  
[Format specification syntax: `printf` and `wprintf` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-syntax-printf-and-wprintf-functions?view=msvc-170)