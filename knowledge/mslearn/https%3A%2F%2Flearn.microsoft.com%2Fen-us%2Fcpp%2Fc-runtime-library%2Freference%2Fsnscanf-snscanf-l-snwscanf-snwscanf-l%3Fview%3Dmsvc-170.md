---
title: "_snscanf, _snscanf_l, _snwscanf, _snwscanf_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/snscanf-snscanf-l-snwscanf-snwscanf-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reads formatted data of a specified length from a string. More secure versions of these functions are available; see [`_snscanf_s`, `_snscanf_s_l`, `_snwscanf_s`, `_snwscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/snscanf-s-snscanf-s-l-snwscanf-s-snwscanf-s-l?view=msvc-170).

## Syntax

```
int __cdecl _snscanf(
   const char * input,
   size_t length,
   const char * format,
   ...
);
int __cdecl _snscanf_l(
   const char * input,
   size_t length,
   const char * format,
   _locale_t locale,
   ...
);
int __cdecl _snwscanf(
   const wchar_t * input,
   size_t length,
   const wchar_t * format,
   ...
);
int __cdecl _snwscanf_l(
   const wchar_t * input,
   size_t length,
   const wchar_t * format,
   _locale_t locale,
   ...
);
```

### Parameters

_`input`_  
Input string to examine.

_`length`_  
Number of characters to examine in _`input`_.

_`format`_  
One or more format specifiers.

_`...`_  
Optional variables that will be used to store the values extracted from the input string by the format specifiers in _`format`_.

_`locale`_  
The locale to use.

## Return value

Both of these functions return the number of fields successfully converted and assigned; the return value doesn't include fields that were read but not assigned. A return value of 0 indicates that no fields were assigned. The return value is `EOF` for an error or if the end of the string is reached before the first conversion. For more information, see [`sscanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-sscanf-l-swscanf-swscanf-l?view=msvc-170).

If _`input`_ or _`format`_ is a `NULL` pointer, or if _`length`_ is less than or equal to zero, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return `EOF` and set `errno` to `EINVAL`.

For information about these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

This function is like `sscanf`, except that it lets you specify a fixed number of characters to examine from the input string. For more information, see [`sscanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-sscanf-l-swscanf-swscanf-l?view=msvc-170).

The versions of these functions with the `_l` suffix are identical except that they use the locale parameter passed in instead of the current thread locale.

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_sntscanf`

**`_snscanf`**

**`_snscanf`**

**`_snwscanf`**

`_sntscanf_l`

**`_snscanf_l`**

**`_snscanf_l`**

**`_snwscanf_l`**

## Requirements

Routine

Required header

**`_snscanf`**, **`_snscanf_l`**

<stdio.h>

**`_snwscanf`**, **`_snwscanf_l`**

<stdio.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_snscanf.c
// compile with: /W3

#include <stdio.h>
int main( )
{
   char  str1[] = "15 12 14...";
   wchar_t  str2[] = L"15 12 14...";
   char  s1[3];
   wchar_t  s2[3];
   int   i;
   float fp;

   i = _snscanf( str1, 6,  "%s %f", s1, &fp); // C4996
   // Note: _snscanf is deprecated; consider using _snscanf_s instead
   printf("_snscanf converted %d fields: ", i);
   printf("%s and %f\n", s1, fp);

   i = _snwscanf( str2, 6,  L"%s %f", s2, &fp); // C4996
   // Note: _snwscanf is deprecated; consider using _snwscanf_s instead
   wprintf(L"_snwscanf converted %d fields: ", i);
   wprintf(L"%s and %f\n", s2, fp);
}
```

```
_snscanf converted 2 fields: 15 and 12.000000
_snwscanf converted 2 fields: 15 and 12.000000
```

## See also

[scanf Width Specification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/scanf-width-specification?view=msvc-170)