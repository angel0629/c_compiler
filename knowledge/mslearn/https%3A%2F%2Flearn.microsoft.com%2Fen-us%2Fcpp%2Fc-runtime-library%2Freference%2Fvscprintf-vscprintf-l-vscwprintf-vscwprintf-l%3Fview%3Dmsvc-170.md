---
title: "_vscprintf, _vscprintf_l, _vscwprintf, _vscwprintf_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vscprintf-vscprintf-l-vscwprintf-vscwprintf-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns the number of characters in the formatted string using a pointer to a list of arguments.

## Syntax

```
int _vscprintf(
   const char *format,
   va_list argptr
);
int _vscprintf_l(
   const char *format,
   _locale_t locale,
   va_list argptr
);
int _vscwprintf(
   const wchar_t *format,
   va_list argptr
);
int _vscwprintf_l(
   const wchar_t *format,
   _locale_t locale,
   va_list argptr
);
```

### Parameters

_`format`_  
Format-control string.

_`argptr`_  
Pointer to list of arguments.

_`locale`_  
The locale to use.

For more information, see [Format specification syntax](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-syntax-printf-and-wprintf-functions?view=msvc-170).

## Return value

**`_vscprintf`** returns the number of characters that would be generated if the string pointed to by the list of arguments was printed or sent to a file or buffer using the specified formatting codes. The value returned doesn't include the terminating null character. **`_vscwprintf`** performs the same function for wide characters.

The versions of these functions with the `_l` suffix are identical except that they use the locale parameter passed in instead of the current thread locale.

If _`format`_ is a null pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the functions return -1 and set `errno` to `EINVAL`.

Return Value is the size of the formatted data. If the function takes a `char` buffer, the size is in bytes. If the function takes a `wchar_t` buffer, the size specifies the number of 16-bit words. Characters refer to `char` characters for functions that take a `char` buffer, and to `wchar_t` characters for functions that take a `wchar_t` buffer.

Each _`argument`_ (if any) is converted according to the corresponding format specification in _`format`_. The format consists of ordinary characters and has the same form and function as the _`format`_ argument for [`printf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170).

Important

Ensure that if _`format`_ is a user-defined string, it is null terminated and has the correct number and type of parameters. For more information, see [Avoiding buffer overruns](https://learn.microsoft.com/en-us/windows/win32/SecBP/avoiding-buffer-overruns).

Starting in Windows 10 version 2004 (build 19041), the `printf` family of functions prints exactly representable floating point numbers according to the IEEE 754 rules for rounding. In previous versions of Windows, exactly representable floating point numbers ending in '5' would always round up. IEEE 754 states that they must round to the closest even digit (also known as "Banker's Rounding"). For example, both `printf("%1.0f", 1.5)` and `printf("%1.0f", 2.5)` should round to 2. Previously, 1.5 would round to 2 and 2.5 would round to 3. This change only affects exactly representable numbers. For example, 2.35 (which, when represented in memory, is closer to 2.35000000000000008) continues to round up to 2.4. Rounding done by these functions now also respects the floating point rounding mode set by [`fesetround`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetround-fesetround2?view=msvc-170). Previously, rounding always chose `FE_TONEAREST` behavior. This change only affects programs built using Visual Studio 2019 version 16.2 and later. To use the legacy floating point rounding behavior, link with [`legacy_stdio_float_rounding.obj`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/link-options?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_vsctprintf`

**`_vscprintf`**

**`_vscprintf`**

**`_vscwprintf`**

`_vsctprintf_l`

**`_vscprintf_l`**

**`_vscprintf_l`**

**`_vscwprintf_l`**

## Requirements

Routine

Required header

**`_vscprintf`**, **`_vscprintf_l`**

<stdio.h>

**`_vscwprintf`**, **`_vscwprintf_l`**

<stdio.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`vsprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsprintf-vsprintf-l-vswprintf-vswprintf-l-vswprintf-l?view=msvc-170).

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fprintf`, `_fprintf_l`, `fwprintf`, `_fwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-fprintf-l-fwprintf-fwprintf-l?view=msvc-170)  
[`printf`, `_printf_l`, `wprintf`, `_wprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170)  
[`scanf`, `_scanf_l`, `wscanf`, `_wscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-scanf-l-wscanf-wscanf-l?view=msvc-170)  
[`sscanf`, `_sscanf_l`, `swscanf`, `_swscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-sscanf-l-swscanf-swscanf-l?view=msvc-170)  
[`vprintf` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/vprintf-functions?view=msvc-170)