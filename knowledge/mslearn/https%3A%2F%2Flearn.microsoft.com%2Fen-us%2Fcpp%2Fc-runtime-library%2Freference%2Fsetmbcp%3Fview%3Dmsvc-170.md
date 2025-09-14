---
title: "_setmbcp"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmbcp?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sets a new multibyte code page.

## Syntax

```
int _setmbcp(
   int codepage
);
```

### Parameters

_`codepage`_  
New code page setting for locale-independent multibyte routines.

## Return value

Returns 0 if the code page is set successfully. If an invalid code page value is supplied for _`codepage`_, returns -1 and the code page setting is unchanged. Sets `errno` to `EINVAL` if a memory allocation failure occurs.

The **`_setmbcp`** function specifies a new multibyte code page. By default, the run-time system automatically sets the multibyte code page to the system-default ANSI code page. The multibyte code page setting affects all multibyte routines that aren't locale dependent. However, it's possible to instruct **`_setmbcp`** to use the code page defined for the current locale (see the following list of manifest constants and associated behavior results). For a list of the multibyte routines that are dependent on the locale code page rather than the multibyte code page, see [Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170).

The _`codepage`_ argument can be set to any of the following values:

*   `_MB_CP_ANSI` Use ANSI code page obtained from operating system at program startup.
    
*   `_MB_CP_LOCALE` Use the current locale's code page obtained from a previous call to [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170).
    
*   `_MB_CP_OEM` Use OEM code page obtained from operating system at program startup.
    
*   `_MB_CP_SBCS` Use single-byte code page. When the code page is set to `_MB_CP_SBCS`, a routine such as [`_ismbblead`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbblead-ismbblead-l?view=msvc-170) always returns false.
    
*   `_MB_CP_UTF8` Use UTF-8. When the code page is set to `_MB_CP_UTF8`, a routine such as [`_ismbblead`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbblead-ismbblead-l?view=msvc-170) always returns false.
    
*   Any other valid code page value, regardless of whether the value is an ANSI, OEM, or other operating-system-supported code page (except UTF-7, which isn't supported).
    

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_setmbcp`**

<mbctype.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[`_getmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getmbcp?view=msvc-170)  
[`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170)