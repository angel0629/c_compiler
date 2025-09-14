---
title: "strncmp, wcsncmp, _mbsncmp, _mbsncmp_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncmp-wcsncmp-mbsncmp-mbsncmp-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Compares up to the specified count of characters of two strings.

## Syntax

```
int strncmp(
   const char *string1,
   const char *string2,
   size_t count
);
int wcsncmp(
   const wchar_t *string1,
   const wchar_t *string2,
   size_t count
);
int _mbsncmp(
   const unsigned char *string1,
   const unsigned char *string2,
   size_t count
);
int _mbsncmp_l(
   const unsigned char *string1,
   const unsigned char *string2,
   size_t count,
   _locale_t locale
);int _mbsnbcmp(
   const unsigned char *string1,
   const unsigned char *string2,
   size_t count
);
```

### Parameters

_`string1`_, _`string2`_  
Strings to compare.

_`count`_  
Number of characters to compare.

_`locale`_  
Locale to use.

## Return value

The return value indicates the relation of the substrings of _`string1`_ and _`string2`_ as follows.

Return value

Description

< 0

_`string1`_ substring less than _`string2`_ substring

0

_`string1`_ substring identical to _`string2`_ substring

\> 0

_`string1`_ substring greater than _`string2`_ substring

On a parameter validation error, **`_mbsncmp`** and **`_mbsncmp_l`** return **`_NLSCMPERROR`**, which is defined in `<string.h>` and `<mbstring.h>`.

The **`strncmp`** function performs an ordinal comparison of at most the first _`count`_ characters in _`string1`_ and _`string2`_ and returns a value indicating the relationship between the substrings. **`strncmp`** is a case-sensitive version of **`_strnicmp`**. **`wcsncmp`** and **`_mbsncmp`** are case-sensitive versions of **`_wcsnicmp`** and **`_mbsnicmp`**.

**`wcsncmp`** and **`_mbsncmp`** are wide-character and multibyte-character versions of **`strncmp`**. The arguments of **`wcsncmp`** are wide-character strings. The arguments of **`_mbsncmp`** are multibyte-character strings. **`_mbsncmp`** recognizes multibyte-character sequences according to a multibyte code page and returns `_NLSCMPERROR` on an error.

Also, **`_mbsncmp`** and **`_mbsncmp_l`** validate parameters. If _`string1`_ or _`string2`_ is a null pointer and _`count`_ isn't equal to 0, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, **`_mbsncmp`** and **`_mbsncmp_l`** return `_NLSCMPERROR` and set `errno` to `EINVAL`. **`strncmp`** and **`wcsncmp`** don't validate their parameters. These functions behave identically otherwise.

The comparison behavior of **`_mbsncmp`** and **`_mbsncmp_l`** is affected by the setting of the `LC_CTYPE` category setting of the locale. This controls detection of leading and trailing bytes of multibyte characters. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The **`_mbsncmp`** function uses the current locale for this locale-dependent behavior. The **`_mbsncmp_l`** function is identical except that it uses the _`locale`_ parameter instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170). If the locale is a single-byte locale, the behavior of these functions is identical to **`strncmp`**.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsnccmp`

**`strncmp`**

**`_mbsncmp`**

**`wcsncmp`**

`_tcsncmp`

**`strncmp`**

**`_mbsnbcmp`**

**`wcsncmp`**

`_tccmp`

Maps to macro or inline function

**`_mbsncmp`**

Maps to macro or inline function

## Requirements

Routine

Required header

**`strncmp`**

`<string.h>`

**`wcsncmp`**

`<string.h>` or `<wchar.h>`

**`_mbsncmp`**, **`_mbsncmp_l`**

`<mbstring.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_strncmp.c
#include <string.h>
#include <stdio.h>

char string1[] = "The quick brown dog jumps over the lazy fox";
char string2[] = "The QUICK brown fox jumps over the lazy dog";

int main( void )
{
   char tmp[20];
   int result;
   printf( "Compare strings:\n      %s\n      %s\n\n",
           string1, string2 );
   printf( "Function:   strncmp (first 10 characters only)\n" );
   result = strncmp( string1, string2 , 10 );
   if( result > 0 )
      strcpy_s( tmp, sizeof(tmp), "greater than" );
   else if( result < 0 )
      strcpy_s( tmp, sizeof(tmp), "less than" );
   else
      strcpy_s( tmp, sizeof(tmp), "equal to" );
   printf( "Result:      String 1 is %s string 2\n\n", tmp );
   printf( "Function:   strnicmp _strnicmp (first 10 characters only)\n" );
   result = _strnicmp( string1, string2, 10 );
   if( result > 0 )
      strcpy_s( tmp, sizeof(tmp), "greater than" );
   else if( result < 0 )
      strcpy_s( tmp, sizeof(tmp), "less than" );
   else
      strcpy_s( tmp, sizeof(tmp), "equal to" );
   printf( "Result:      String 1 is %s string 2\n", tmp );
}
```

```
Compare strings:
      The quick brown dog jumps over the lazy fox
      The QUICK brown fox jumps over the lazy dog

Function:   strncmp (first 10 characters only)
Result:      String 1 is greater than string 2

Function:   strnicmp _strnicmp (first 10 characters only)
Result:      String 1 is equal to string 2
```

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`_mbsnbcmp`, `_mbsnbcmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcmp-mbsnbcmp-l?view=msvc-170)  
[`_mbsnbicmp`, `_mbsnbicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbicmp-mbsnbicmp-l?view=msvc-170)  
[`strcmp`, `wcscmp`, `_mbscmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcmp-wcscmp-mbscmp?view=msvc-170)  
[`strcoll` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/strcoll-functions?view=msvc-170)  
[`_strnicmp`, `_wcsnicmp`, `_mbsnicmp`, `_strnicmp_l`, `_wcsnicmp_l`, `_mbsnicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnicmp-wcsnicmp-mbsnicmp-strnicmp-l-wcsnicmp-l-mbsnicmp-l?view=msvc-170)  
[`strrchr`, `wcsrchr`, `_mbsrchr`, `_mbsrchr_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strrchr-wcsrchr-mbsrchr-mbsrchr-l?view=msvc-170)  
[`_strset`, `_strset_l`, `_wcsset`, `_wcsset_l`, `_mbsset`, `_mbsset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strset-strset-l-wcsset-wcsset-l-mbsset-mbsset-l?view=msvc-170)  
[`strspn`, `wcsspn`, `_mbsspn`, `_mbsspn_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strspn-wcsspn-mbsspn-mbsspn-l?view=msvc-170)