---
title: "vprintf, _vprintf_l, vwprintf, _vwprintf_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vprintf-vprintf-l-vwprintf-vwprintf-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Writes formatted output by using a pointer to a list of arguments. More secure versions of these functions are available, see [`vprintf_s`, `_vprintf_s_l`, `vwprintf_s`, `_vwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vprintf-s-vprintf-s-l-vwprintf-s-vwprintf-s-l?view=msvc-170).

## Syntax

```
int vprintf(
   const char *format,
   va_list argptr
);
int _vprintf_l(
   const char *format,
   _locale_t locale,
   va_list argptr
);
int vwprintf(
   const wchar_t *format,
   va_list argptr
);
int _vwprintf_l(
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

**`vprintf`** and **`vwprintf`** return the number of characters written, not including the terminating null character, or a negative value if an output error occurs. If _`format`_ is a null pointer, or if the format string contains invalid formatting characters, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the functions return -1 and set `errno` to `EINVAL`.

For information on these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

Each of these functions takes a pointer to an argument list, then formats and writes the given data to `stdout`.

**`vwprintf`** is the wide-character version of **`vprintf`**; the two functions behave identically if the stream is opened in ANSI mode. **`vprintf`** doesn't currently support output into a UNICODE stream.

The versions of these functions with the `_l` suffix are identical except that they use the locale parameter passed in instead of the current thread locale.

Important

Ensure that _`format`_ is not a user-defined string. For more information, see [Avoiding buffer overruns](https://learn.microsoft.com/en-us/windows/win32/SecBP/avoiding-buffer-overruns). Invalid format strings are detected and result in an error. Starting in Windows 10 version 2004 (build 19041), the `printf` family of functions prints exactly representable floating point numbers according to the IEEE 754 rules for rounding. In previous versions of Windows, exactly representable floating point numbers ending in '5' would always round up. IEEE 754 states that they must round to the closest even digit (also known as "Banker's Rounding"). For example, both `printf("%1.0f", 1.5)` and `printf("%1.0f", 2.5)` should round to 2. Previously, 1.5 would round to 2 and 2.5 would round to 3. This change only affects exactly representable numbers. For example, 2.35 (which, when represented in memory, is closer to 2.35000000000000008) continues to round up to 2.4. Rounding done by these functions now also respects the floating point rounding mode set by [`fesetround`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetround-fesetround2?view=msvc-170). Previously, rounding always chose `FE_TONEAREST` behavior. This change only affects programs built using Visual Studio 2019 version 16.2 and later. To use the legacy floating point rounding behavior, link with [`legacy_stdio_float_rounding.obj`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/link-options?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_vtprintf`

**`vprintf`**

**`vprintf`**

**`vwprintf`**

`_vtprintf_l`

**`_vprintf_l`**

**`_vprintf_l`**

**`_vwprintf_l`**

## Requirements

Routine

Required header

Optional headers

**`vprintf`**, **`_vprintf_l`**

<stdio.h> and <stdarg.h>

<varargs.h>\*

**`vwprintf`**, **`_vwprintf_l`**

<stdio.h> or <wchar.h>, and <stdarg.h>

<varargs.h>\*

\* Required for UNIX V compatibility.

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles that are associated with the console, `stdin`, `stdout`, and `stderr`, must be redirected before C run-time functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`vprintf` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/vprintf-functions?view=msvc-170)  
[`fprintf`, `_fprintf_l`, `fwprintf`, `_fwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-fprintf-l-fwprintf-fwprintf-l?view=msvc-170)  
[`printf`, `_printf_l`, `wprintf`, `_wprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170)  
[`sprintf`, `_sprintf_l`, `swprintf`, `_swprintf_l`, `__swprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-sprintf-l-swprintf-swprintf-l-swprintf-l?view=msvc-170)  
[`va_arg`, `va_copy`, `va_end`, `va_start`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/va-arg-va-copy-va-end-va-start?view=msvc-170)