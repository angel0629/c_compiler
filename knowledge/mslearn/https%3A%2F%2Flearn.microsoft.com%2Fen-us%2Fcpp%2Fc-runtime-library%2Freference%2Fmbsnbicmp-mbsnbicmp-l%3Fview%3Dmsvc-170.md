---
title: "_mbsnbicmp, _mbsnbicmp_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbicmp-mbsnbicmp-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Compares **n** bytes of two multibyte-character strings, and ignores case.

## Syntax

```
int _mbsnbicmp(
   const unsigned char *string1,
   const unsigned char *string2,
   size_t count
);
```

### Parameters

_`string1`_, _`string2`_  
Null-terminated strings to compare.

_`count`_  
Number of bytes to compare.

## Return value

The return value indicates the relationship between the substrings.

Return value

Description

< 0

_`string1`_ substring less than _`string2`_ substring.

0

_`string1`_ substring identical to _`string2`_ substring.

\> 0

_`string1`_ substring greater than _`string2`_ substring.

On an error, **`_mbsnbicmp`** returns `_NLSCMPERROR`, which is defined in String.h and Mbstring.h.

The **`_mbsnbicmp`** function performs an ordinal comparison of at most the first _`count`_ bytes of _`string1`_ and _`string2`_. The comparison is performed by converting each character to lowercase; [`_mbsnbcmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcmp-mbsnbcmp-l?view=msvc-170) is a case-sensitive version of **`_mbsnbicmp`**. The comparison ends if a terminating null character is reached in either string before _`count`_ characters are compared. If the strings are equal when a terminating null character is reached in either string before _`count`_ characters are compared, the shorter string is lesser.

**`_mbsnbicmp`** is similar to [`_mbsnbcmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcmp-mbsnbcmp-l?view=msvc-170), except that it compares strings up to _`count`_ bytes instead of by characters.

Two strings containing characters located between 'Z' and 'a' in the ASCII table ('\[', '\\', '\]', '^', '\_', and '\`') compare differently, depending on their case. For example, the two strings "ABCDE" and "ABCD^" compare one way if the comparison is lowercase ("abcde" > "abcd^") and the other way ("ABCDE" < "ABCD^") if it's uppercase.

**`_mbsnbicmp`** recognizes multibyte-character sequences according to the [multibyte code page](https://learn.microsoft.com/en-us/cpp/c-runtime-library/code-pages?view=msvc-170) currently in use. It isn't affected by the current locale setting.

If either _`string1`_ or _`string2`_ is a null pointer, **`_mbsnbicmp`** invokes the invalid parameter handler as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the function returns `_NLSCMPERROR` and sets `errno` to `EINVAL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsnicmp`

`_strnicmp`

**`_mbsnbicmp`**

`_wcsnicmp`

`_tcsnicmp_l`

`_strnicmp_l`

**`_mbsnbicmp_l`**

`_wcsnicmp_l`

## Requirements

Routine

Required header

**`_mbsnbicmp`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See the example for [`_mbsnbcmp`, `_mbsnbcmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcmp-mbsnbcmp-l?view=msvc-170).

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`_mbsnbcat`, `_mbsnbcat_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcat-mbsnbcat-l?view=msvc-170)  
[`_mbsnbcmp`, `_mbsnbcmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcmp-mbsnbcmp-l?view=msvc-170)  
[`_stricmp`, `_wcsicmp`, `_mbsicmp`, `_stricmp_l`, `_wcsicmp_l`, `_mbsicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stricmp-wcsicmp-mbsicmp-stricmp-l-wcsicmp-l-mbsicmp-l?view=msvc-170)