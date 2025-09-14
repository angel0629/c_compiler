---
title: "_strnset_s, _strnset_s_l, _wcsnset_s, _wcsnset_s_l, _mbsnset_s, _mbsnset_s_l, _tcsnset_s, _tcsncset_s, _tcsncset_s_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnset-s-strnset-s-l-wcsnset-s-wcsnset-s-l-mbsnset-s-mbsnset-s-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Initializes characters of a string to a given character. These versions of [`_strnset`, `_strnset_l`, `_wcsnset`, `_wcsnset_l`, `_mbsnset`, `_mbsnset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnset-strnset-l-wcsnset-wcsnset-l-mbsnset-mbsnset-l?view=msvc-170) have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

For `_tcsnset_s`, `_tcsnset_s_l`, `_tcsncset_s`, and `_tcsncset_s_l` see [Generic-text function mappings](#generic-text-function-mappings).

## Syntax

```
errno_t _strnset_s(
   char *str,
   size_t numberOfElements,
   int c,
   size_t count
);
errno_t _strnset_s_l(
   char *str,
   size_t numberOfElements,
   int c,
   size_t count,
   _locale_t locale
);
errno_t _wcsnset_s(
   wchar_t *str,
   size_t numberOfElements,
   wchar_t c,
   size_t count
);
errno_t _wcsnset_s_l(
   wchar_t *str,
   size_t numberOfElements,
   wchar_t c,
   size_t count,
   _locale_t locale
);
errno_t _mbsnset_s(
   unsigned char *str,
   size_t numberOfElements,
   unsigned int c,
   size_t count
);
errno_t _mbsnset_s_l(
   unsigned char *str,
   size_t numberOfElements,
   unsigned int c,
   size_t count,
   _locale_t locale
);
```

### Parameters

_`str`_  
String to be altered.

_`numberOfElements`_  
The size of the _`str`_ buffer.

_`c`_  
Character setting.

_`count`_  
Number of characters to be set.

_`locale`_  
Locale to use.

## Return value

Zero if successful, otherwise an error code.

These functions validate their arguments. If _`str`_ isn't a valid null-terminated string or the size argument is less than or equal to 0, then the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return an error code and set `errno` to that error code. The default error code is `EINVAL` if a more specific value doesn't apply.

These functions set, at most, the first _`count`_ characters of _`str`_ to _`c`_. If _`count`_ is greater than the size of _`str`_, the size of _`str`_ is used instead of _`count`_. An error occurs if _`count`_ is greater than _`numberOfElements`_ and both those parameters are greater than the size of _`str`_.

**`_wcsnset_s`** and **`_mbsnset_s`** are wide-character and multibyte-character versions of **`_strnset_s`**. The string argument of **`_wcsnset_s`** is a wide-character string; that of **`_mbsnset_s`** is a multibyte-character string. These three functions behave identically otherwise.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of these functions without the `_l` suffix use the current locale for this locale-dependent behavior; the versions with the `_l` suffix are identical except that they use the locale parameter passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

The debug library versions of these functions first fill the buffer with `0xFE`. To disable this behavior, use [`_CrtSetDebugFillThreshold`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdebugfillthreshold?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text function mappings

The function in the `tchar.h` column maps to the function in the other columns depending on the character set that is defined at compile time.

`tchar.h` function

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsnset_s`

`_strnset_s`

`_mbsnbset_s`

`_wcsnset_s`

`_tcsnset_s_l`

`_strnset_s_l`

`_mbsnbset_s_l`

`_wcsnset_s_l`

`_tcsncset_s`

`_strnset_s`

`_mbsnset_s`

`_wcsnset_s`

`_tcsncset_s_l`

`_strnset_s_l`

`_mbsnset_s_l`

`_wcsnset_s_l`

## Requirements

Routine

Required header

**`_strnset_s`**

`<string.h>`

**`_strnset_s_l`**

`<tchar.h>`

**`_wcsnset_s`**

`<string.h>` or `<wchar.h>`

**`_wcsnset_s_l`**

`<tchar.h>`

**`_mbsnset_s`**, **`_mbsnset_s_l`**

`<mbstring.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_strnset_s.c
#include <string.h>
#include <stdio.h>

int main( void )
{
   char string[15] = "This is a test";
   /* Set not more than 4 characters of string to be *'s */
   printf( "Before: %s\n", string );
   _strnset_s( string, sizeof(string), '*', 4 );
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