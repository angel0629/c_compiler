---
title: "_vprintf_p, _vprintf_p_l, _vwprintf_p, _vwprintf_p_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vprintf-p-vprintf-p-l-vwprintf-p-vwprintf-p-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Writes formatted output by using a pointer to a list of arguments, and enables specification of the order in which the arguments are used.

## Syntax

```
int _vprintf_p(
   const char *format,
   va_list argptr
);
int _vprintf_p_l(
   const char *format,
   _locale_t locale,
   va_list argptr
);
int _vwprintf_p(
   const wchar_t *format,
   va_list argptr
);
int _vwprintf_p_l(
   const wchar_t *format,
   _locale_t locale,
   va_list argptr
);
```

### Parameters

_`format`_  
Format specification.

_`argptr`_  
Pointer to list of arguments.

_`locale`_  
The locale to use.

For more information, see [Format specification syntax](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-syntax-printf-and-wprintf-functions?view=msvc-170).

## Return value

**`_vprintf_p`** and **`_vwprintf_p`** return the number of characters written, not including the terminating null character, or a negative value if an output error occurs.

Each of these functions takes a pointer to an argument list, then formats and writes the given data to `stdout`. These functions differ from `vprintf_s` and `vwprintf_s` only in that they support the ability to specify the order in which the arguments are used. For more information, see [printf\_p Positional Parameters](https://learn.microsoft.com/en-us/cpp/c-runtime-library/printf-p-positional-parameters?view=msvc-170).

**`_vwprintf_p`** is the wide-character version of **`_vprintf_p`**; the two functions behave identically if the stream is opened in ANSI mode. **`_vprintf_p`** doesn't currently support output into a UNICODE stream.

The versions of these functions with the `_l` suffix are identical except that they use the locale parameter passed in instead of the current thread locale.

Important

Ensure that _`format`_ is not a user-defined string. For more information, see [Avoiding buffer overruns](https://learn.microsoft.com/en-us/windows/win32/SecBP/avoiding-buffer-overruns). Starting in Windows 10 version 2004 (build 19041), the `printf` family of functions prints exactly representable floating point numbers according to the IEEE 754 rules for rounding. In previous versions of Windows, exactly representable floating point numbers ending in '5' would always round up. IEEE 754 states that they must round to the closest even digit (also known as "Banker's Rounding"). For example, both `printf("%1.0f", 1.5)` and `printf("%1.0f", 2.5)` should round to 2. Previously, 1.5 would round to 2 and 2.5 would round to 3. This change only affects exactly representable numbers. For example, 2.35 (which, when represented in memory, is closer to 2.35000000000000008) continues to round up to 2.4. Rounding done by these functions now also respects the floating point rounding mode set by [`fesetround`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetround-fesetround2?view=msvc-170). Previously, rounding always chose `FE_TONEAREST` behavior. This change only affects programs built using Visual Studio 2019 version 16.2 and later. To use the legacy floating point rounding behavior, link with [`legacy_stdio_float_rounding.obj`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/link-options?view=msvc-170).

If _`format`_ is a null pointer, or if the format string contains invalid formatting characters, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the functions return -1 and set `errno` to `EINVAL`.

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_vtprintf_p`

**`_vprintf_p`**

**`_vprintf_p`**

**`_vwprintf_p`**

`_vtprintf_p_l`

**`_vprintf_p_l`**

**`_vprintf_p_l`**

**`_vwprintf_p_l`**

## Requirements

Routine

Required header

Optional headers

**`_vprintf_p`**, **`_vprintf_p_l`**

<stdio.h> and <stdarg.h>

<varargs.h>\*

**`_vwprintf_p`**, **`_vwprintf_p_l`**

<stdio.h> or <wchar.h>, and <stdarg.h>

<varargs.h>\*

\* Required for UNIX V compatibility.

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles that are associated with the console, `stdin`, `stdout`, and `stderr`, must be redirected before C run-time functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`vprintf` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/vprintf-functions?view=msvc-170)  
[`_fprintf_p`, `_fprintf_p_l`, `_fwprintf_p`, `_fwprintf_p_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-p-fprintf-p-l-fwprintf-p-fwprintf-p-l?view=msvc-170)  
[`_printf_p`, `_printf_p_l`, `_wprintf_p`, `_wprintf_p_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-p-printf-p-l-wprintf-p-wprintf-p-l?view=msvc-170)  
[`_sprintf_p`, `_sprintf_p_l`, `_swprintf_p`, `_swprintf_p_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-p-sprintf-p-l-swprintf-p-swprintf-p-l?view=msvc-170)  
[`vsprintf_s`, `_vsprintf_s_l`, `vswprintf_s`, `_vswprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsprintf-s-vsprintf-s-l-vswprintf-s-vswprintf-s-l?view=msvc-170)  
[`va_arg`, `va_copy`, `va_end`, `va_start`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/va-arg-va-copy-va-end-va-start?view=msvc-170)  
[`_vfprintf_p`, `_vfprintf_p_l`, `_vfwprintf_p`, `_vfwprintf_p_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vfprintf-p-vfprintf-p-l-vfwprintf-p-vfwprintf-p-l?view=msvc-170)  
[`_printf_p`, `_printf_p_l`, `_wprintf_p`, `_wprintf_p_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-p-printf-p-l-wprintf-p-wprintf-p-l?view=msvc-170)  
[printf\_p Positional Parameters](https://learn.microsoft.com/en-us/cpp/c-runtime-library/printf-p-positional-parameters?view=msvc-170)