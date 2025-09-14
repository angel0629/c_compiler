---
title: "_strnset, _strnset_l, _wcsnset, _wcsnset_l, _mbsnset, _mbsnset_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnset-strnset-l-wcsnset-wcsnset-l-mbsnset-mbsnset-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Initializes characters of a string to a given character. More secure versions of these functions exist; see [`_strnset_s`, `_strnset_s_l`, `_wcsnset_s`, `_wcsnset_s_l`, `_mbsnset_s`, `_mbsnset_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnset-s-strnset-s-l-wcsnset-s-wcsnset-s-l-mbsnset-s-mbsnset-s-l?view=msvc-170).

## Syntax

```
char *_strnset(
   char *str,
   int c,
   size_t count
);
char *_strnset_l(
   char *str,
   int c,
   size_t count,
   _locale_t locale
);
wchar_t *_wcsnset(
   wchar_t *str,
   wchar_t c,
   size_t count
);
wchar_t *_wcsnset_l(
   wchar_t *str,
   wchar_t c,
   size_t count,
   _locale_t locale
);
unsigned char *_mbsnset(
   unsigned char *str,
   unsigned int c,
   size_t count
);
unsigned char *_mbsnset_l(
   unsigned char *str,
   unsigned int c,
   size_t count,
   _locale_t locale
);
```

### Parameters

_`str`_  
String to be altered.

_`c`_  
Character setting.

_`count`_  
Number of characters to be set.

_`locale`_  
Locale to use.

## Return value

Returns a pointer to the altered string.

The **`_strnset`** function sets, at most, the first _`count`_ characters of _`str`_ to _`c`_ (converted to **`char`**). If _`count`_ is greater than the length of _`str`_, the length of _`str`_ is used instead of _`count`_.

**`_wcsnset`** and **`_mbsnset`** are wide-character and multibyte-character versions of **`_strnset`**. The string arguments and return value of **`_wcsnset`** are wide-character strings. The string arguments and return value of **`_mbsnset`** are multibyte-character strings. These three functions behave identically otherwise.

**`_mbsnset`** validates its parameters; if _`str`_ is a null pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170) . If execution is allowed to continue, **`_mbsnset`** returns `NULL` and sets `errno` to `EINVAL`. **`_strnset`** and **`_wcsnset`** don't validate their parameters.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of these functions without the `_l` suffix use the current locale for this locale-dependent behavior; the versions with the `_l` suffix are identical except that they use the locale parameter passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsnset`

**`_strnset`**

**`_mbsnbset`**

**`_wcsnset`**

`_tcsnset_l`

**`_strnset_l`**

**`_mbsnbset_l`**

**`_wcsnset_l`**

## Requirements

Routine

Required header

**`_strnset`**

<string.h>

**`_strnset_l`**

<tchar.h>

**`_wcsnset`**

<string.h> or <wchar.h>

**`_wcsnset_l`**

<tchar.h>

**`_mbsnset`**, **`_mbsnset_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_strnset.c
// compile with: /W3
#include <string.h>
#include <stdio.h>

int main( void )
{
   char string[15] = "This is a test";
   /* Set not more than 4 characters of string to be *'s */
   printf( "Before: %s\n", string );
   _strnset( string, '*', 4 ); // C4996
   // Note: _strnset is deprecated; consider using _strnset_s
   printf( "After:  %s\n", string );
}
```

```
Before: This is a test
After:  **** is a test
```

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`strcat`, `wcscat`, `_mbscat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcat-wcscat-mbscat?view=msvc-170)  
[`strcmp`, `wcscmp`, `_mbscmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcmp-wcscmp-mbscmp?view=msvc-170)  
[`strcpy`, `wcscpy`, `_mbscpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcpy-wcscpy-mbscpy?view=msvc-170)  
[`_strset`, `_strset_l`, `_wcsset`, `_wcsset_l`, `_mbsset`, `_mbsset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strset-strset-l-wcsset-wcsset-l-mbsset-mbsset-l?view=msvc-170)