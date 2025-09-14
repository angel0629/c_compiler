---
title: "strcmp, wcscmp, _mbscmp, _mbscmp_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcmp-wcscmp-mbscmp?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Compare strings.

## Syntax

```
int strcmp(
   const char *string1,
   const char *string2
);
int wcscmp(
   const wchar_t *string1,
   const wchar_t *string2
);
int _mbscmp(
   const unsigned char *string1,
   const unsigned char *string2
);
int _mbscmp_l(
   const unsigned char *string1,
   const unsigned char *string2,
   _locale_t locale
);
```

### Parameters

_`string1`_, _`string2`_  
Null-terminated strings to compare.

_`locale`_  
Locale to use.

## Return value

The return value for each of these functions indicates the ordinal relation of _`string1`_ to _`string2`_.

Value

Relationship of `string1` to `string2`

< 0

_`string1`_ is less than _`string2`_

0

_`string1`_ is identical to _`string2`_

\> 0

_`string1`_ is greater than _`string2`_

On a parameter validation error, **`_mbscmp`** and **`_mbscmp_l`** return `_NLSCMPERROR`, which is defined in `<string.h>` and `<mbstring.h>`.

The **`strcmp`** function performs an ordinal comparison of _`string1`_ and _`string2`_ and returns a value that indicates their relationship. **`wcscmp`** and **`_mbscmp`** are, respectively, wide-character and multibyte-character versions of **`strcmp`**. **`_mbscmp`** recognizes multibyte-character sequences according to the current multibyte code page and returns `_NLSCMPERROR` on an error. **`_mbscmp_l`** has the same behavior, but uses the locale parameter that's passed in instead of the current locale. For more information, see [Code pages](https://learn.microsoft.com/en-us/cpp/c-runtime-library/code-pages?view=msvc-170). Also, if _`string1`_ or _`string2`_ is a null pointer, **`_mbscmp`** invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, **`_mbscmp`** and **`_mbscmp_l`** return `_NLSCMPERROR` and set `errno` to `EINVAL`. **`strcmp`** and **`wcscmp`** don't validate their parameters. These functions behave identically otherwise.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcscmp`

**`strcmp`**

**`_mbscmp`**

**`wcscmp`**

The **`strcmp`** functions differ from the **`strcoll`** functions in that **`strcmp`** comparisons are ordinal, and aren't affected by locale. **`strcoll`** compares strings lexicographically by using the `LC_COLLATE` category of the current locale. For more information about the `LC_COLLATE` category, see [`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170).

In the "C" locale, the order of characters in the character set (ASCII character set) is the same as the lexicographic character order. However, in other locales, the order of characters in the character set may differ from the lexicographic order. For example, in certain European locales, the character '`a`' (value 0x61) comes before the character '`ä`' (value 0xE4) in the character set, but the character '`ä`' comes in front of the character '`a`' lexicographically.

In locales for which the character set and the lexicographic character order differ, you can use **`strcoll`** instead of **`strcmp`** for lexicographic comparison of strings. Alternatively, you can use **`strxfrm`** on the original strings, and then use **`strcmp`** on the resulting strings.

The **`strcmp`** functions are case-sensitive. **`_stricmp`**, **`_wcsicmp`**, and **`_mbsicmp`** compare strings by first converting them to their lowercase forms. Two strings that contain characters that are located between 'Z' and 'a' in the ASCII table ('`[`', '`\\`', '`]`', '`^`', '`_`', and '`` ` ``') compare differently, depending on their case. For example, the two strings "`ABCDE`" and "`ABCD^`" compare one way if the comparison is lowercase ("`abcde`" > "`abcd^`") and the other way ("`ABCDE`" < "`ABCD`^") if the comparison is uppercase.

## Requirements

Routine

Required header

**`strcmp`**

`<string.h>`

**`wcscmp`**

`<string.h>` or `<wchar.h>`

**`_mbscmp`**

`<mbstring.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_strcmp.c

#include <string.h>
#include <stdio.h>
#include <stdlib.h>

char string1[] = "The quick brown dog jumps over the lazy fox";
char string2[] = "The QUICK brown dog jumps over the lazy fox";

int main( void )
{
   char tmp[20];
   int result;

   // Case sensitive
   printf( "Compare strings:\n   %s\n   %s\n\n", string1, string2 );
   result = strcmp( string1, string2 );
   if( result > 0 )
      strcpy_s( tmp, _countof(tmp), "greater than" );
   else if( result < 0 )
      strcpy_s( tmp, _countof (tmp), "less than" );
   else
      strcpy_s( tmp, _countof (tmp), "equal to" );
   printf( "   strcmp:   String 1 is %s string 2\n", tmp );

   // Case insensitive (could use equivalent _stricmp)
   result = _stricmp( string1, string2 );
   if( result > 0 )
      strcpy_s( tmp, _countof (tmp), "greater than" );
   else if( result < 0 )
      strcpy_s( tmp, _countof (tmp), "less than" );
   else
      strcpy_s( tmp, _countof (tmp), "equal to" );
   printf( "   _stricmp:  String 1 is %s string 2\n", tmp );
}
```

```
Compare strings:
   The quick brown dog jumps over the lazy fox
   The QUICK brown dog jumps over the lazy fox

   strcmp:   String 1 is greater than string 2
   _stricmp:  String 1 is equal to string 2
```

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`memcmp`, `wmemcmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memcmp-wmemcmp?view=msvc-170)  
[`_memicmp`, `_memicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memicmp-memicmp-l?view=msvc-170)  
[`strcoll` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/strcoll-functions?view=msvc-170)  
[`_stricmp`, `_wcsicmp`, `_mbsicmp`, `_stricmp_l`, `_wcsicmp_l`, `_mbsicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stricmp-wcsicmp-mbsicmp-stricmp-l-wcsicmp-l-mbsicmp-l?view=msvc-170)  
[`strncmp`, `wcsncmp`, `_mbsncmp`, `_mbsncmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncmp-wcsncmp-mbsncmp-mbsncmp-l?view=msvc-170)  
[`_strnicmp`, `_wcsnicmp`, `_mbsnicmp`, `_strnicmp_l`, `_wcsnicmp_l`, `_mbsnicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnicmp-wcsnicmp-mbsnicmp-strnicmp-l-wcsnicmp-l-mbsnicmp-l?view=msvc-170)  
[`strrchr`, `wcsrchr`, `_mbsrchr`, `_mbsrchr_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strrchr-wcsrchr-mbsrchr-mbsrchr-l?view=msvc-170)  
[`strspn`, `wcsspn`, `_mbsspn`, `_mbsspn_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strspn-wcsspn-mbsspn-mbsspn-l?view=msvc-170)  
[`strxfrm`, `wcsxfrm`, `_strxfrm_l`, `_wcsxfrm_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strxfrm-wcsxfrm-strxfrm-l-wcsxfrm-l?view=msvc-170)