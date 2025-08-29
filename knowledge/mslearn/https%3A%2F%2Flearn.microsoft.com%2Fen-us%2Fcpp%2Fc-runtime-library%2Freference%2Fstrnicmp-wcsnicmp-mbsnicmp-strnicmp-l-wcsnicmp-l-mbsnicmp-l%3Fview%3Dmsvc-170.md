---
title: "_strnicmp, _wcsnicmp, _mbsnicmp, _strnicmp_l, _wcsnicmp_l, _mbsnicmp_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnicmp-wcsnicmp-mbsnicmp-strnicmp-l-wcsnicmp-l-mbsnicmp-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Compares the specified number of characters of two strings without regard to case.

## Syntax

```
int _strnicmp(
   const char *string1,
   const char *string2,
   size_t count
);
int _wcsnicmp(
   const wchar_t *string1,
   const wchar_t *string2,
   size_t count
);
int _mbsnicmp(
   const unsigned char *string1,
   const unsigned char *string2,
   size_t count
);
int _strnicmp_l(
   const char *string1,
   const char *string2,
   size_t count,
   _locale_t locale
);
int _wcsnicmp_l(
   const wchar_t *string1,
   const wchar_t *string2,
   size_t count,
   _locale_t locale
);
int _mbsnicmp_l(
   const unsigned char *string1,
   const unsigned char *string2,
   size_t count,
   _locale_t locale
);
```

### Parameters

_`string1`_, _`string2`_  
Null-terminated strings to compare.

_`count`_  
Number of characters to compare.

_`locale`_  
Locale to use.

## Return value

Indicates the relationship between the substrings, as follows.

Return value

Description

< 0

_`string1`_ substring is less than _`string2`_ substring.

0

_`string1`_ substring is identical to _`string2`_ substring.

\> 0

_`string1`_ substring is greater than _`string2`_ substring.

On a parameter validation error, these functions return `_NLSCMPERROR`, which is defined in <string.h> and <mbstring.h>.

The **`_strnicmp`** function compares, at most, the first _`count`_ characters of _`string1`_ and _`string2`_. The comparison is performed without regard to case by converting each character to lowercase. **`_strnicmp`** is a case-insensitive version of **`strncmp`**. The comparison ends if a terminating null character is reached in either string before _`count`_ characters are compared. If the strings are equal when a terminating null character is reached in either string before _`count`_ characters are compared, the shorter string is lesser.

The characters from 91 to 96 in the ASCII table ('\[', '\\', '\]', '^', '\_', and '\`') evaluate as less than any alphabetic character. This ordering is identical to that of **`stricmp`**.

**`_wcsnicmp`** and **`_mbsnicmp`** are wide-character and multibyte-character versions of **`_strnicmp`**. The arguments of **`_wcsnicmp`** are wide-character strings. The arguments of **`_mbsnicmp`** are multibyte-character strings. **`_mbsnicmp`** recognizes multibyte-character sequences according to the current multibyte code page and returns `_NLSCMPERROR` on an error. For more information, see [Code pages](https://learn.microsoft.com/en-us/cpp/c-runtime-library/code-pages?view=msvc-170). These three functions behave identically otherwise. These functions are affected by the locale setting—the versions that don't have the `_l` suffix use the current locale for their locale-dependent behavior; the versions that do have the `_l` suffix instead use the _`locale`_ that's passed in. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

All of these functions validate their parameters. If either _`string1`_ or _`string2`_ is a null pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return `_NLSCMPERROR` and set `errno` to `EINVAL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsncicmp`

**`_strnicmp`**

**`_mbsnicmp`**

**`_wcsnicmp`**

`_tcsnicmp`

**`_strnicmp`**

**`_mbsnbicmp`**

**`_wcsnicmp`**

`_tcsncicmp_l`

**`_strnicmp_l`**

**`_mbsnicmp_l`**

**`_wcsnicmp_l`**

## Requirements

Routine

Required header

**`_strnicmp`**, **`_strnicmp_l`**

<string.h>

**`_wcsnicmp`**, **`_wcsnicmp_l`**

<string.h> or <wchar.h>

**`_mbsnicmp`**, **`_mbsnicmp_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`strncmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncmp-wcsncmp-mbsncmp-mbsncmp-l?view=msvc-170).

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`strcat`, `wcscat`, `_mbscat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcat-wcscat-mbscat?view=msvc-170)  
[`strcmp`, `wcscmp`, `_mbscmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcmp-wcscmp-mbscmp?view=msvc-170)  
[`strcpy`, `wcscpy`, `_mbscpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcpy-wcscpy-mbscpy?view=msvc-170)  
[`strncat`, `_strncat_l`, `wcsncat`, `_wcsncat_l`, `_mbsncat`, `_mbsncat_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-strncat-l-wcsncat-wcsncat-l-mbsncat-mbsncat-l?view=msvc-170)  
[`strncmp`, `wcsncmp`, `_mbsncmp`, `_mbsncmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncmp-wcsncmp-mbsncmp-mbsncmp-l?view=msvc-170)  
[`strncpy`, `_strncpy_l`, `wcsncpy`, `_wcsncpy_l`, `_mbsncpy`, `_mbsncpy_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-strncpy-l-wcsncpy-wcsncpy-l-mbsncpy-mbsncpy-l?view=msvc-170)  
[`strrchr`, `wcsrchr`, `_mbsrchr`, `_mbsrchr_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strrchr-wcsrchr-mbsrchr-mbsrchr-l?view=msvc-170)  
[`_strset`, `_strset_l`, `_wcsset`, `_wcsset_l`, `_mbsset`, `_mbsset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strset-strset-l-wcsset-wcsset-l-mbsset-mbsset-l?view=msvc-170)  
[`strspn`, `wcsspn`, `_mbsspn`, `_mbsspn_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strspn-wcsspn-mbsspn-mbsspn-l?view=msvc-170)