---
title: "_scprintf, _scprintf_l, _scwprintf, _scwprintf_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scprintf-scprintf-l-scwprintf-scwprintf-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns the number of characters in the formatted string.

## Syntax

```
int _scprintf(
   const char *format [,
   argument] ...
);
int _scprintf_l(
   const char *format,
   _locale_t locale [,
   argument] ...
);
int _scwprintf(
   const wchar_t *format [,
   argument] ...
);
int _scwprintf_l(
   const wchar_t *format,
   _locale_t locale [,
   argument] ...
);
```

### Parameters

_`format`_  
Format-control string.

_`argument`_  
Optional arguments.

_`locale`_  
The locale to use.

For more information, see [Format specification syntax](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-syntax-printf-and-wprintf-functions?view=msvc-170).

## Return value

Returns the number of characters that would be generated if the string were to be printed or sent to a file or buffer using the specified formatting codes. The value returned doesn't include the terminating null character. **`_scwprintf`** performs the same function for wide characters.

If _`format`_ is a `NULL` pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return -1 and set `errno` to `EINVAL`.

For information about these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

Each _`argument`_ (if any) is converted according to the corresponding format specification in _`format`_. The format consists of ordinary characters and has the same form and function as the _`format`_ argument for [`printf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170).

The versions of these functions with the `_l` suffix are identical except that they use the locale parameter passed in instead of the current thread locale.

Important

Ensure that _`format`_ is not a user-defined string.

Starting in Windows 10 version 2004 (build 19041), the `printf` family of functions prints exactly representable floating point numbers according to the IEEE 754 rules for rounding. In previous versions of Windows, exactly representable floating point numbers ending in '5' would always round up. IEEE 754 states that they must round to the closest even digit (also known as "Banker's Rounding"). For example, both `printf("%1.0f", 1.5)` and `printf("%1.0f", 2.5)` should round to 2. Previously, 1.5 would round to 2 and 2.5 would round to 3. This change only affects exactly representable numbers. For example, 2.35 (which, when represented in memory, is closer to 2.35000000000000008) continues to round up to 2.4. Rounding done by these functions now also respects the floating point rounding mode set by [`fesetround`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetround-fesetround2?view=msvc-170). Previously, rounding always chose `FE_TONEAREST` behavior. This change only affects programs built using Visual Studio 2019 version 16.2 and later. To use the legacy floating point rounding behavior, link with [`legacy_stdio_float_rounding.obj`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/link-options?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_sctprintf`

**`_scprintf`**

**`_scprintf`**

**`_scwprintf`**

`_sctprintf_l`

**`_scprintf_l`**

**`_scprintf_l`**

**`_scwprintf_l`**

## Requirements

Routine

Required header

**`_scprintf`**, **`_scprintf_l`**

<stdio.h>

**`_scwprintf`**, **`_scwprintf_l`**

<stdio.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt__scprintf.c

#define _USE_MATH_DEFINES

#include <stdio.h>
#include <math.h>
#include <malloc.h>

int main( void )
{
   int count;
   int size;
   char *s = NULL;

   count = _scprintf( "The value of Pi is calculated to be %f.\n",
                      M_PI);

   size = count + 1; // the string will need one more char for the null terminator
   s = malloc(sizeof(char) * size);
   sprintf_s(s, size, "The value of Pi is calculated to be %f.\n",
                      M_PI);
   printf("The length of the following string will be %i.\n", count);
   printf("%s", s);
   free( s );
}
```

```
The length of the following string will be 46.
The value of Pi is calculated to be 3.141593.
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fprintf`, `_fprintf_l`, `fwprintf`, `_fwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-fprintf-l-fwprintf-fwprintf-l?view=msvc-170)  
[`printf`, `_printf_l`, `wprintf`, `_wprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170)  
[`scanf`, `_scanf_l`, `wscanf`, `_wscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-scanf-l-wscanf-wscanf-l?view=msvc-170)  
[`sscanf`, `_sscanf_l`, `swscanf`, `_swscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-sscanf-l-swscanf-swscanf-l?view=msvc-170)  
[`vprintf` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/vprintf-functions?view=msvc-170)