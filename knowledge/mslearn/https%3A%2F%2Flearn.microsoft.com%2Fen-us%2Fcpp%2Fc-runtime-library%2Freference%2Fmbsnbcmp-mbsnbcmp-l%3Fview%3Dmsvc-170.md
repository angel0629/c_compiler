---
title: "_mbsnbcmp, _mbsnbcmp_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcmp-mbsnbcmp-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Compares the first **n** bytes of two multibyte-character strings.

## Syntax

```
int _mbsnbcmp(
   const unsigned char *string1,
   const unsigned char *string2,
   size_t count
);
int _mbsnbcmp_l(
   const unsigned char *string1,
   const unsigned char *string2,
   size_t count,
   _locale_t locale
);
```

### Parameters

_`string1`_, _`string2`_  
The strings to compare.

_`count`_  
The number of bytes to compare.

_`locale`_  
The locale to use.

## Return value

The return value indicates the ordinal relationship between the substrings of _`string1`_ and _`string2`_.

Return value

Description

< 0

_`string1`_ substring is less than _`string2`_ substring.

0

_`string1`_ substring is identical to _`string2`_ substring.

\> 0

_`string1`_ substring is greater than _`string2`_ substring.

On a parameter validation error, **`_mbsnbcmp`** and **`_mbsnbcmp_l`** return `_NLSCMPERROR`, which is defined in <string.h> and <mbstring.h>.

The **`_mbsnbcmp`** functions compare at most the first _`count`_ bytes in _`string1`_ and _`string2`_ and return a value that indicates the relationship between the substrings. **`_mbsnbcmp`** is a case-sensitive version of **`_mbsnbicmp`**. Unlike `_mbsnbcoll`, **`_mbsnbcmp`** isn't affected by the collation order of the locale. **`_mbsnbcmp`** recognizes multibyte-character sequences according to the current multibyte [code page](https://learn.microsoft.com/en-us/cpp/c-runtime-library/code-pages?view=msvc-170).

**`_mbsnbcmp`** resembles **`_mbsncmp`**, except that **`_mbsncmp`** compares strings by characters rather than by bytes.

The output value is affected by the `LC_CTYPE` category setting of the locale, which specifies the lead bytes and trailing bytes of multibyte characters. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The **`_mbsnbcmp`** function uses the current locale for this locale-dependent behavior. The **`_mbsnbcmp_l`** function is identical except that it uses the _`locale`_ parameter instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

If either _`string1`_ or _`string2`_ is a null pointer, these functions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the functions return `_NLSCMPERROR`, and `errno` is set to `EINVAL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsncmp`

[`strncmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncmp-wcsncmp-mbsncmp-mbsncmp-l?view=msvc-170)

**`_mbsnbcmp`**

[`wcsncmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncmp-wcsncmp-mbsncmp-mbsncmp-l?view=msvc-170)

`_tcsncmp_l`

[`strncmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncmp-wcsncmp-mbsncmp-mbsncmp-l?view=msvc-170)

**`_mbsnbcml`**

[`wcsncmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncmp-wcsncmp-mbsncmp-mbsncmp-l?view=msvc-170)

## Requirements

Routine

Required header

**`_mbsnbcmp`**

<mbstring.h>

**`_mbsnbcmp_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_mbsnbcmp.c
#include <mbstring.h>
#include <stdio.h>

char string1[] = "The quick brown dog jumps over the lazy fox";
char string2[] = "The QUICK brown fox jumps over the lazy dog";

int main( void )
{
   char tmp[20];
   int result;
   printf( "Compare strings:\n          %s\n", string1 );
   printf( "          %s\n\n", string2 );
   printf( "Function: _mbsnbcmp (first 10 characters only)\n" );
   result = _mbsncmp( string1, string2 , 10 );
   if( result > 0 )
      _mbscpy_s( tmp, sizeof(tmp), "greater than" );
   else if( result < 0 )
      _mbscpy_s( tmp, sizeof(tmp), "less than" );
   else
      _mbscpy_s( tmp, sizeof(tmp), "equal to" );
   printf( "Result:   String 1 is %s string 2\n\n", tmp );
   printf( "Function: _mbsnicmp _mbsnicmp (first 10 characters only)\n" );
   result = _mbsnicmp( string1, string2, 10 );
   if( result > 0 )
      _mbscpy_s( tmp, sizeof(tmp), "greater than" );
   else if( result < 0 )
      _mbscpy_s( tmp, sizeof(tmp), "less than" );
   else
      _mbscpy_s( tmp, sizeof(tmp), "equal to" );
   printf( "Result:   String 1 is %s string 2\n\n", tmp );
}
```

### Output

```
Compare strings:
          The quick brown dog jumps over the lazy fox
          The QUICK brown fox jumps over the lazy dog

Function: _mbsnbcmp (first 10 characters only)
Result:   String 1 is greater than string 2

Function: _mbsnicmp _mbsnicmp (first 10 characters only)
Result:   String 1 is equal to string 2
```

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`_mbsnbcat`, `_mbsnbcat_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcat-mbsnbcat-l?view=msvc-170)  
[`_mbsnbicmp`, `_mbsnbicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbicmp-mbsnbicmp-l?view=msvc-170)  
[`strncmp`, `wcsncmp`, `_mbsncmp`, `_mbsncmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncmp-wcsncmp-mbsncmp-mbsncmp-l?view=msvc-170)  
[`_strnicmp`, `_wcsnicmp`, `_mbsnicmp`, `_strnicmp_l`, `_wcsnicmp_l`, `_mbsnicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnicmp-wcsnicmp-mbsnicmp-strnicmp-l-wcsnicmp-l-mbsnicmp-l?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)