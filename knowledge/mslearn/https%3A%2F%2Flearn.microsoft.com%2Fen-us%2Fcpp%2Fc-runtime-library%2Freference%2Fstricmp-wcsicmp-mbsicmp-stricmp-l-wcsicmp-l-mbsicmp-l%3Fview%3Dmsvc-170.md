---
title: "_stricmp, _wcsicmp, _mbsicmp, _stricmp_l, _wcsicmp_l, _mbsicmp_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stricmp-wcsicmp-mbsicmp-stricmp-l-wcsicmp-l-mbsicmp-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Performs a case-insensitive comparison of strings.

## Syntax

```
int _stricmp(
   const char *string1,
   const char *string2
);
int _wcsicmp(
   const wchar_t *string1,
   const wchar_t *string2
);
int _mbsicmp(
   const unsigned char *string1,
   const unsigned char *string2
);
int _stricmp_l(
   const char *string1,
   const char *string2,
   _locale_t locale
);
int _wcsicmp_l(
   const wchar_t *string1,
   const wchar_t *string2,
   _locale_t locale
);
int _mbsicmp_l(
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

The return value indicates the relation of _`string1`_ to _`string2`_ as follows.

Return value

Description

< 0

_`string1`_ less than _`string2`_

0

_`string1`_ identical to _`string2`_

\> 0

_`string1`_ greater than _`string2`_

On an error, **`_mbsicmp`** returns `_NLSCMPERROR`, which is defined in `<string.h>` and `<mbstring.h>`.

The **`_stricmp`** function compares _`string1`_ and _`string2`_ after converting each character to lowercase, and returns a value indicating their relationship. **`_stricmp`** differs from **`_stricoll`** in that the **`_stricmp`** comparison is only affected by `LC_CTYPE`, which determines which characters are upper and lowercase. The **`_stricoll`** function compares strings according to both the `LC_CTYPE` and `LC_COLLATE` categories of the locale, which includes both the case and the collation order. For more information about the `LC_COLLATE` category, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170) and [Locale categories](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale-categories?view=msvc-170). The versions of these functions without the **`_l`** suffix use the current locale for locale-dependent behavior. The versions with the suffix are identical except that they use the locale passed in instead. If the locale hasn't been set, the C locale is used. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

Note

**`_stricmp`** is equivalent to **`_strcmpi`**. They can be used interchangeably but **`_stricmp`** is the preferred standard.

The **`_strcmpi`** function is equivalent to **`_stricmp`** and is provided for backward compatibility only.

Because **`_stricmp`** does lowercase comparisons, it may result in unexpected behavior.

To illustrate when case conversion by **`_stricmp`** affects the outcome of a comparison, assume that you have the two strings `JOHNSTON` and `JOHN_HENRY`. The string `JOHN_HENRY` will be considered less than `JOHNSTON` because the "`_`" has a lower ASCII value than a lowercase S. In fact, any character that has an ASCII value between 91 and 96 will be considered less than any letter.

If the [`strcmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcmp-wcscmp-mbscmp?view=msvc-170) function is used instead of **`_stricmp`**, `JOHN_HENRY` will be greater than `JOHNSTON`.

**`_wcsicmp`** and **`_mbsicmp`** are wide-character and multibyte-character versions of **`_stricmp`**. The arguments and return value of **`_wcsicmp`** are wide-character strings. The arguments and return value of **`_mbsicmp`** are multibyte-character strings. **`_mbsicmp`** recognizes multibyte-character sequences according to the current multibyte code page and returns `_NLSCMPERROR` on an error. For more information, see [Code pages](https://learn.microsoft.com/en-us/cpp/c-runtime-library/code-pages?view=msvc-170). These three functions behave identically otherwise.

**`_wcsicmp`** and **`wcscmp`** behave identically except that **`wcscmp`** doesn't convert its arguments to lowercase before comparing them. **`_mbsicmp`** and **`_mbscmp`** behave identically except that **`_mbscmp`** doesn't convert its arguments to lowercase before comparing them.

You'll need to call [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170) for **`_wcsicmp`** to work with Latin 1 characters. The C locale is in effect by default, so, for example, ä won't compare equal to Ä. Call **`setlocale`** with any locale other than the C locale before the call to **`_wcsicmp`**. The following sample demonstrates how **`_wcsicmp`** is sensitive to the locale:

```
// crt_stricmp_locale.c
By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](../global-state.md).

#include <string.h>
#include <stdio.h>
#include <locale.h>

int main() {
   setlocale(LC_ALL,"C");   // in effect by default
   printf("\n%d",_wcsicmp(L"ä", L"Ä"));   // compare fails
   setlocale(LC_ALL,"");
   printf("\n%d",_wcsicmp(L"ä", L"Ä"));   // compare succeeds
}
```

An alternative is to call [`_create_locale`, `_wcreate_locale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/create-locale-wcreate-locale?view=msvc-170) and pass the returned locale object as a parameter to **`_wcsicmp_l`**.

All of these functions validate their parameters. If either _`string1`_ or _`string2`_ are null pointers, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170) . If execution is allowed to continue, these functions return `_NLSCMPERROR` and set `errno` to `EINVAL`.

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsicmp`

**`_stricmp`**

**`_mbsicmp`**

**`_wcsicmp`**

## Requirements

Routine

Required header

**`_stricmp`**, **`_stricmp_l`**

`<string.h>`

**`_wcsicmp`**, **`_wcsicmp_l`**

`<string.h>` or `<wchar.h>`

**`_mbsicmp`**, **`_mbsicmp_l`**

`<mbstring.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_stricmp.c

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
      strcpy_s( tmp, _countof(tmp), "less than" );
   else
      strcpy_s( tmp, _countof(tmp), "equal to" );
   printf( "   strcmp:   String 1 is %s string 2\n", tmp );

   // Case insensitive (could use equivalent _stricmp)
   result = _stricmp( string1, string2 );
   if( result > 0 )
      strcpy_s( tmp, _countof(tmp), "greater than" );
   else if( result < 0 )
      strcpy_s( tmp, _countof(tmp), "less than" );
   else
      strcpy_s( tmp, _countof(tmp), "equal to" );
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
[`strcmp`, `wcscmp`, `_mbscmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcmp-wcscmp-mbscmp?view=msvc-170)  
[`strcoll` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/strcoll-functions?view=msvc-170)  
[`strncmp`, `wcsncmp`, `_mbsncmp`, `_mbsncmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncmp-wcsncmp-mbsncmp-mbsncmp-l?view=msvc-170)  
[`_strnicmp`, `_wcsnicmp`, `_mbsnicmp`, `_strnicmp_l`, `_wcsnicmp_l`, `_mbsnicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnicmp-wcsnicmp-mbsnicmp-strnicmp-l-wcsnicmp-l-mbsnicmp-l?view=msvc-170)  
[`strrchr`, `wcsrchr`, `_mbsrchr`, `_mbsrchr_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strrchr-wcsrchr-mbsrchr-mbsrchr-l?view=msvc-170)  
[`_strset`, `_strset_l`, `_wcsset`, `_wcsset_l`, `_mbsset`, `_mbsset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strset-strset-l-wcsset-wcsset-l-mbsset-mbsset-l?view=msvc-170)  
[`strspn`, `wcsspn`, `_mbsspn`, `_mbsspn_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strspn-wcsspn-mbsspn-mbsspn-l?view=msvc-170)