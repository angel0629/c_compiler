---
title: "_cprintf_p, _cprintf_p_l, _cwprintf_p, _cwprintf_p_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-p-cprintf-p-l-cwprintf-p-cwprintf-p-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Formats and prints to the console, and supports positional parameters in the format string.

## Syntax

```
int _cprintf_p(
   const char * format [,
   argument] ...
);
int _cprintf_p_l(
   const char * format,
   _locale_t locale [,
   argument] ...
);
int _cwprintf_p(
   const wchar * format [,
   argument] ...
);
int _cwprintf_p_l(
   const wchar * format,
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

The number of characters printed or a negative value if an error occurs.

These functions format and print a series of characters and values directly to the console, using the `_putch` and `_putwch` functions to output characters. Each _`argument`_ (if any) is converted and output according to the corresponding format specification in _`format`_. The format has the same form and function as the _`format`_ parameter for the [`printf_p`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-syntax-printf-and-wprintf-functions?view=msvc-170) function. The difference between **`_cprintf_p`** and `cprintf_s` is that **`_cprintf_p`** supports positional parameters, which allows specifying the order in which the arguments are used in the format string. For more information, see [printf\_p Positional Parameters](https://learn.microsoft.com/en-us/cpp/c-runtime-library/printf-p-positional-parameters?view=msvc-170).

Unlike the `fprintf_p`, `printf_p`, and `sprintf_p` functions, **`_cprintf_p`** and **`_cwprintf_p`** don't translate line-feed characters into carriage return-line feed (CR-LF) combinations when output. An important distinction is that **`_cwprintf_p`** displays Unicode characters when used in Windows NT. Unlike **`_cprintf_p`**, **`_cwprintf_p`** uses the current console locale settings.

The versions of these functions with the `_l` suffix are identical except that they use the locale parameter passed in instead of the current locale.

Also, like `_cprintf_s` and `_cwprintf_s`, they validate the input pointer and the format string. If _`format`_ or _`argument`_ are `NULL`, or of the format string contains invalid formatting characters, these functions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return -1 and set `errno` to `EINVAL`.

Important

Ensure that _`format`_ is not a user-defined string.

Starting in Windows 10 version 2004 (build 19041), the `printf` family of functions prints exactly representable floating point numbers according to the IEEE 754 rules for rounding. In previous versions of Windows, exactly representable floating point numbers ending in '5' would always round up. IEEE 754 states that they must round to the closest even digit (also known as "Banker's Rounding"). For example, both `printf("%1.0f", 1.5)` and `printf("%1.0f", 2.5)` should round to 2. Previously, 1.5 would round to 2 and 2.5 would round to 3. This change only affects exactly representable numbers. For example, 2.35 (which, when represented in memory, is closer to 2.35000000000000008) continues to round up to 2.4. Rounding done by these functions now also respects the floating point rounding mode set by [`fesetround`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetround-fesetround2?view=msvc-170). Previously, rounding always chose `FE_TONEAREST` behavior. This change only affects programs built using Visual Studio 2019 version 16.2 and later. To use the legacy floating point rounding behavior, link with [`legacy_stdio_float_rounding.obj`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/link-options?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcprintf_p`

**`_cprintf_p`**

**`_cprintf_p`**

**`_cwprintf_p`**

`_tcprintf_p_l`

**`_cprintf_p_l`**

**`_cprintf_p_l`**

**`_cwprintf_p_l`**

## Requirements

Routine

Required header

**`_cprintf_p`**, **`_cprintf_p_l`**

<conio.h>

**`_cwprintf_p`**, **`_cwprintf_p_l`**

<conio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_cprintf_p.c
// This program displays some variables to the console
// using the _cprintf_p function.

#include <conio.h>

int main( void )
{
    int         i = -16,
                h = 29;
    unsigned    u = 62511;
    char        c = 'A';
    char        s[] = "Test";

    // Note that console output does not translate
    // \n as standard output does. Use \r\n instead.
    _cprintf_p( "%2$d  %1$.4x  %3$u  %4$c %5$s\r\n",
                h, i, u, c, s );
}
```

```
-16  001d  62511  A Test
```

## See also

[Console and port I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/console-and-port-i-o?view=msvc-170)  
[`_cscanf`, `_cscanf_l`, `_cwscanf`, `_cwscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cscanf-cscanf-l-cwscanf-cwscanf-l?view=msvc-170)  
[`_cscanf_s`, `_cscanf_s_l`, `_cwscanf_s`, `_cwscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cscanf-s-cscanf-s-l-cwscanf-s-cwscanf-s-l?view=msvc-170)  
[`_fprintf_p`, `_fprintf_p_l`, `_fwprintf_p`, `_fwprintf_p_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-p-fprintf-p-l-fwprintf-p-fwprintf-p-l?view=msvc-170)  
[`fprintf_s`, `_fprintf_s_l`, `fwprintf_s`, `_fwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-s-fprintf-s-l-fwprintf-s-fwprintf-s-l?view=msvc-170)  
[`_printf_p`, `_printf_p_l`, `_wprintf_p`, `_wprintf_p_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-p-printf-p-l-wprintf-p-wprintf-p-l?view=msvc-170)  
[`printf_s`, `_printf_s_l`, `wprintf_s`, `_wprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-s-printf-s-l-wprintf-s-wprintf-s-l?view=msvc-170)  
[`_sprintf_p`, `_sprintf_p_l`, `_swprintf_p`, `_swprintf_p_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-p-sprintf-p-l-swprintf-p-swprintf-p-l?view=msvc-170)  
[`_vfprintf_p`, `_vfprintf_p_l`, `_vfwprintf_p`, `_vfwprintf_p_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vfprintf-p-vfprintf-p-l-vfwprintf-p-vfwprintf-p-l?view=msvc-170)  
[`_cprintf_s`, `_cprintf_s_l`, `_cwprintf_s`, `_cwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-s-cprintf-s-l-cwprintf-s-cwprintf-s-l?view=msvc-170)  
[printf\_p Positional Parameters](https://learn.microsoft.com/en-us/cpp/c-runtime-library/printf-p-positional-parameters?view=msvc-170)  
[Format specification syntax: `printf` and `wprintf` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-syntax-printf-and-wprintf-functions?view=msvc-170)