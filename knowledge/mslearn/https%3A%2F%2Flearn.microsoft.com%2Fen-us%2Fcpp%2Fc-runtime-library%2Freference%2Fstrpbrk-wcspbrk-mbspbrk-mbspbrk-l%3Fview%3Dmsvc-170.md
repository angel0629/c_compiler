---
title: "strpbrk, wcspbrk, _mbspbrk, _mbspbrk_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strpbrk-wcspbrk-mbspbrk-mbspbrk-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Scans strings for characters in specified character sets.

## Syntax

```
char *strpbrk(
   const char *str,
   const char *strCharSet
); // C only
char *strpbrk(
   char *str,
   const char *strCharSet
); // C++ only
const char *strpbrk(
   const char *str,
   const char *strCharSet
); // C++ only
wchar_t *wcspbrk(
   const wchar_t *str,
   const wchar_t *strCharSet
); // C only
wchar_t *wcspbrk(
   wchar_t *str,
   const wchar_t *strCharSet
); // C++ only
const wchar_t *wcspbrk(
   const wchar_t *str,
   const wchar_t *strCharSet
); // C++ only
unsigned char *_mbspbrk(
   const unsigned char *str,
   const unsigned char *strCharSet
); // C only
unsigned char *_mbspbrk(
   unsigned char *str,
   const unsigned char *strCharSet
); // C++ only
const unsigned char *_mbspbrk(
   const unsigned char *str,
   const unsigned char *strCharSet
); // C++ only
unsigned char *_mbspbrk_l(
   const unsigned char *str,
   const unsigned char *strCharSet,
   _locale_t locale
); // C only
unsigned char *_mbspbrk_l(
   unsigned char *str,
   const unsigned char *strCharSet,
   _locale_t locale
); // C++ only
const unsigned char *_mbspbrk_l(
   const unsigned char *str,
   const unsigned char* strCharSet,
   _locale_t locale
); // C++ only
```

### Parameters

_`str`_  
Null-terminated, searched string.

_`strCharSet`_  
Null-terminated character set.

_`locale`_  
Locale to use.

## Return value

Returns a pointer to the first occurrence of any character from _`strCharSet`_ in _`str`_, or a `NULL` pointer if the two string arguments have no characters in common.

The **`strpbrk`** function returns a pointer to the first occurrence of a character in _`str`_ that belongs to the set of characters in _`strCharSet`_. The search doesn't include the terminating null character.

**`wcspbrk`** and **`_mbspbrk`** are wide-character and multibyte-character versions of **`strpbrk`**. The arguments and return value of **`wcspbrk`** are wide-character strings. The arguments and return value of **`_mbspbrk`** are multibyte-character strings.

**`_mbspbrk`** validates its parameters. If _`str`_ or _`strCharSet`_ is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, **`_mbspbrk`** returns `NULL` and sets `errno` to `EINVAL`. **`strpbrk`** and **`wcspbrk`** don't validate their parameters. These three functions behave identically otherwise.

**`_mbspbrk`** is similar to `_mbscspn` except that **`_mbspbrk`** returns a pointer rather than a value of type [`size_t`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170).

In C, these functions take a **`const`** pointer for the first argument. In C++, two overloads are available. The overload taking a pointer to **`const`** returns a pointer to **`const`**; the version that takes a pointer to non-**`const`** returns a pointer to non-**`const`**. The macro `_CRT_CONST_CORRECT_OVERLOADS` is defined if both the **`const`** and non-**`const`** versions of these functions are available. If you require the non-**`const`** behavior for both C++ overloads, define the symbol `_CONST_RETURN`.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale; for more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of these functions without the `_l` suffix use the current locale for this locale-dependent behavior; the version with the `_l` suffix is identical except that it uses the locale parameter passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcspbrk`

**`strpbrk`**

**`_mbspbrk`**

**`wcspbrk`**

**n/a**

**n/a**

**`_mbspbrk_l`**

**n/a**

## Requirements

Routine

Required header

**`strpbrk`**

<string.h>

**`wcspbrk`**

<string.h> or <wchar.h>

**`_mbspbrk`**, **`_mbspbrk_l`**

<mbstring.h>

For more information about compatibility, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_strpbrk.c

#include <string.h>
#include <stdio.h>

int main( void )
{
   char string[100] = "The 3 men and 2 boys ate 5 pigs\n";
   char *result = NULL;

   // Return pointer to first digit in "string".
   printf( "1: %s\n", string );
   result = strpbrk( string, "0123456789" );
   printf( "2: %s\n", result++ );
   result = strpbrk( result, "0123456789" );
   printf( "3: %s\n", result++ );
   result = strpbrk( result, "0123456789" );
   printf( "4: %s\n", result );
}
```

```
1: The 3 men and 2 boys ate 5 pigs

2: 3 men and 2 boys ate 5 pigs

3: 2 boys ate 5 pigs

4: 5 pigs
```

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`strcspn`, `wcscspn`, `_mbscspn`, `_mbscspn_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcspn-wcscspn-mbscspn-mbscspn-l?view=msvc-170)  
[`strchr`, `wcschr`, `_mbschr`, `_mbschr_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strchr-wcschr-mbschr-mbschr-l?view=msvc-170)  
[`strrchr`, `wcsrchr`, `_mbsrchr`, `_mbsrchr_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strrchr-wcsrchr-mbsrchr-mbsrchr-l?view=msvc-170)