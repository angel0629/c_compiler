---
title: "_mbsnbcoll, _mbsnbcoll_l, _mbsnbicoll, _mbsnbicoll_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcoll-mbsnbcoll-l-mbsnbicoll-mbsnbicoll-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Compares _`n`_ bytes of two multibyte-character strings by using multibyte code-page information.

## Syntax

```
int _mbsnbcoll(
   const unsigned char *string1,
   const unsigned char *string2,
   size_t count
);
int _mbsnbcoll_l(
   const unsigned char *string1,
   const unsigned char *string2,
   size_t count,
   _locale_t locale
);
int _mbsnbicoll(
   const unsigned char *string1,
   const unsigned char *string2,
   size_t count
);
int _mbsnbicoll_l(
   const unsigned char *string1,
   const unsigned char *string2,
   size_t count,
   _locale_t locale
);
```

### Parameters

_`string1`_, _`string2`_  
Strings to compare.

_`count`_  
Number of bytes to compare.

_`locale`_  
Locale to use.

## Return value

The return value indicates the relation of the substrings of _`string1`_ and _`string2`_.

Return value

Description

< 0

_`string1`_ substring less than _`string2`_ substring.

0

_`string1`_ substring identical to _`string2`_ substring.

\> 0

_`string1`_ substring greater than _`string2`_ substring.

If _`string1`_ or _`string2`_ is `NULL` or _`count`_ is greater than `INT_MAX`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return `_NLSCMPERROR` and set `errno` to `EINVAL`. To use `_NLSCMPERROR`, include either String.h or Mbstring.h.

Each of these functions collates, at most, the first _`count`_ bytes in _`string1`_ and _`string2`_ and returns a value indicating the relationship between the resulting substrings of _`string1`_ and _`string2`_. If the final byte in the substring of _`string1`_ or _`string2`_ is a lead byte, it isn't included in the comparison; these functions compare only complete characters in the substrings. **`_mbsnbicoll`** is a case-insensitive version of **`_mbsnbcoll`**. Like [`_mbsnbcmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcmp-mbsnbcmp-l?view=msvc-170) and [`_mbsnbicmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbicmp-mbsnbicmp-l?view=msvc-170), **`_mbsnbcoll`** and **`_mbsnbicoll`** collate the two multibyte-character strings according to the lexicographic order specified by the multibyte [code page](https://learn.microsoft.com/en-us/cpp/c-runtime-library/code-pages?view=msvc-170) currently in use.

For some code pages and corresponding character sets, the order of characters in the character set might differ from the lexicographic character order. In the "C" locale, the order of characters in the ASCII character set is the same as the lexicographic order of the characters. However, in certain European code pages, for example, the character 'a' (value 0x61) precedes the character 'ä' (value 0xE4) in the character set, but the character 'ä' precedes the character 'a' lexicographically. To perform a lexicographic comparison of strings by bytes in such an instance, use **`_mbsnbcoll`** rather than `_mbsnbcmp`; to check only for string equality, use `_mbsnbcmp`.

Because the `coll` functions collate strings lexicographically for comparison, whereas the `cmp` functions simply test for string equality, the `coll` functions are much slower than the corresponding `cmp` versions. Therefore, the `coll` functions should be used only when there's a difference between the character set order and the lexicographic character order in the current code page and this difference is of interest for the comparison.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of these functions without the `_l` suffix use the current locale for this locale-dependent behavior; the versions with the `_l` suffix are identical except that they use the locale parameter passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsncoll`

[`_strncoll`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncoll-wcsncoll-mbsncoll-strncoll-l-wcsncoll-l-mbsncoll-l?view=msvc-170)

**`_mbsnbcoll`**

[`_wcsncoll`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncoll-wcsncoll-mbsncoll-strncoll-l-wcsncoll-l-mbsncoll-l?view=msvc-170)

`_tcsncoll_l`

[`_strncoll_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncoll-wcsncoll-mbsncoll-strncoll-l-wcsncoll-l-mbsncoll-l?view=msvc-170)

**`_mbsnbcoll_l`**

[`_wcsncoll_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncoll-wcsncoll-mbsncoll-strncoll-l-wcsncoll-l-mbsncoll-l?view=msvc-170)

`_tcsnicoll`

[`_strnicoll`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnicoll-wcsnicoll-mbsnicoll-strnicoll-l-wcsnicoll-l-mbsnicoll-l?view=msvc-170)

**`_mbsnbicoll`**

[`_wcsnicoll`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnicoll-wcsnicoll-mbsnicoll-strnicoll-l-wcsnicoll-l-mbsnicoll-l?view=msvc-170)

`_tcsnicoll_l`

[`_strnicoll_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnicoll-wcsnicoll-mbsnicoll-strnicoll-l-wcsnicoll-l-mbsnicoll-l?view=msvc-170)

**`_mbsnbicoll_l`**

[`_wcsnicoll_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnicoll-wcsnicoll-mbsnicoll-strnicoll-l-wcsnicoll-l-mbsnicoll-l?view=msvc-170)

## Requirements

Routine

Required header

**`_mbsnbcoll`**

<mbstring.h>

**`_mbsnbcoll_l`**

<mbstring.h>

**`_mbsnbicoll`**

<mbstring.h>

**`_mbsnbicoll_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`_mbsnbcat`, `_mbsnbcat_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcat-mbsnbcat-l?view=msvc-170)  
[`_mbsnbcmp`, `_mbsnbcmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcmp-mbsnbcmp-l?view=msvc-170)  
[`_mbsnbicmp`, `_mbsnbicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbicmp-mbsnbicmp-l?view=msvc-170)  
[`strcoll` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/strcoll-functions?view=msvc-170)  
[`strncmp`, `wcsncmp`, `_mbsncmp`, `_mbsncmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncmp-wcsncmp-mbsncmp-mbsncmp-l?view=msvc-170)  
[`_strnicmp`, `_wcsnicmp`, `_mbsnicmp`, `_strnicmp_l`, `_wcsnicmp_l`, `_mbsnicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnicmp-wcsnicmp-mbsnicmp-strnicmp-l-wcsnicmp-l-mbsnicmp-l?view=msvc-170)