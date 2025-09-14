---
title: "_printf_p, _printf_p_l, _wprintf_p, _wprintf_p_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-p-printf-p-l-wprintf-p-wprintf-p-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Prints formatted output to the standard output stream, and enables specification of the order in which parameters are used in the format string.

## Syntax

```
int _printf_p(
   const char *format [,
   argument]...
);
int _printf_p_l(
   const char *format,
   _locale_t locale [,
   argument]...
);
int _wprintf_p(
   const wchar_t *format [,
   argument]...
);
int _wprintf_p_l(
   const wchar_t *format,
   _locale_t locale [,
   argument]...
);
```

### Parameters

_`format`_  
Format control.

_`argument`_  
Optional arguments.

_`locale`_  
The locale to use.

## Return value

Returns the number of characters printed or a negative value if an error occurs.

The **`_printf_p`** function formats and prints a series of characters and values to the standard output stream, `stdout`. If arguments follow the _`format`_ string, the _`format`_ string must contain specifications that determine the output format for the arguments (see [printf\_p Positional Parameters](https://learn.microsoft.com/en-us/cpp/c-runtime-library/printf-p-positional-parameters?view=msvc-170)).

The difference between **`_printf_p`** and `printf_s` is that **`_printf_p`** supports positional parameters, which allows specifying the order in which the arguments are used in the format string. For more information, see [printf\_p Positional Parameters](https://learn.microsoft.com/en-us/cpp/c-runtime-library/printf-p-positional-parameters?view=msvc-170).

**`_wprintf_p`** is the wide-character version of **`_printf_p`**; they behave identically if the stream is opened in ANSI mode. **`_printf_p`** doesn't currently support output into a UNICODE stream.

The versions of these functions with the `_l` suffix are identical except that they use the locale parameter passed in instead of the current thread locale.

Important

Ensure that _`format`_ is not a user-defined string.

If _`format`_ or _`argument`_ are `NULL`, or of the format string contains invalid formatting characters, **`_printf_p`** and **`_wprintf_p`** functions invoke an invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the function returns -1 and sets `errno` to `EINVAL`.

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tprintf_p`

**`_printf_p`**

**`_printf_p`**

**`_wprintf_p`**

`_tprintf_p_l`

**`_printf_p_l`**

**`_printf_p_l`**

**`_wprintf_p_l`**

## Requirements

Routine

Required header

**`_printf_p`**, **`_printf_p_l`**

<stdio.h>

**`_wprintf_p`**, **`_wprintf_p_l`**

<stdio.h> or <wchar.h>

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles that are associated with the console, `stdin`, `stdout`, and `stderr`, must be redirected before C run-time functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

Important

Starting in Windows 10 version 2004 (build 19041), the `printf` family of functions prints exactly representable floating point numbers according to the IEEE 754 rules for rounding. In previous versions of Windows, exactly representable floating point numbers ending in '5' would always round up. IEEE 754 states that they must round to the closest even digit (also known as "Banker's Rounding"). For example, both `printf("%1.0f", 1.5)` and `printf("%1.0f", 2.5)` should round to 2. Previously, 1.5 would round to 2 and 2.5 would round to 3. This change only affects exactly representable numbers. For example, 2.35 (which, when represented in memory, is closer to 2.35000000000000008) continues to round up to 2.4. Rounding done by these functions now also respects the floating point rounding mode set by [`fesetround`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetround-fesetround2?view=msvc-170). Previously, rounding always chose `FE_TONEAREST` behavior. This change only affects programs built using Visual Studio 2019 version 16.2 and later. To use the legacy floating point rounding behavior, link with [`legacy_stdio_float_rounding.obj`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/link-options?view=msvc-170).

## Example

```
// crt_printf_p.c
// This program uses the _printf_p and _wprintf_p
// functions to choose the order in which parameters
// are used.

#include <stdio.h>

int main( void )
{
   // Positional arguments
   _printf_p( "Specifying the order: %2$s %3$s %1$s %4$s %5$s.\n",
              "little", "I'm", "a", "tea", "pot");

   // Resume arguments
   _wprintf_p( L"Reusing arguments: %1$d %1$d %1$d %1$d\n", 10);

   // Width argument
   _printf_p("Width specifiers: %1$*2$s", "Hello\n", 10);
}
```

```
Specifying the order: I'm a little tea pot.
Reusing arguments: 10 10 10 10
Width specifiers:     Hello
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170)  
[`_fprintf_p`, `_fprintf_p_l`, `_fwprintf_p`, `_fwprintf_p_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-p-fprintf-p-l-fwprintf-p-fwprintf-p-l?view=msvc-170)  
[`fprintf`, `_fprintf_l`, `fwprintf`, `_fwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-fprintf-l-fwprintf-fwprintf-l?view=msvc-170)  
[`fprintf_s`, `_fprintf_s_l`, `fwprintf_s`, `_fwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-s-fprintf-s-l-fwprintf-s-fwprintf-s-l?view=msvc-170)  
[`scanf`, `_scanf_l`, `wscanf`, `_wscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-scanf-l-wscanf-wscanf-l?view=msvc-170)  
[`scanf_s`, `_scanf_s_l`, `wscanf_s`, `_wscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-s-scanf-s-l-wscanf-s-wscanf-s-l?view=msvc-170)  
[`_sprintf_p`, `_sprintf_p_l`, `_swprintf_p`, `_swprintf_p_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-p-sprintf-p-l-swprintf-p-swprintf-p-l?view=msvc-170)  
[`sprintf`, `_sprintf_l`, `swprintf`, `_swprintf_l`, `__swprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-sprintf-l-swprintf-swprintf-l-swprintf-l?view=msvc-170)  
[`sprintf_s`, `_sprintf_s_l`, `swprintf_s`, `_swprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-s-sprintf-s-l-swprintf-s-swprintf-s-l?view=msvc-170)  
[`vprintf` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/vprintf-functions?view=msvc-170)