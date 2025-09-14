---
title: "_mbsnbset_s, _mbsnbset_s_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbset-s-mbsnbset-s-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sets the first **n** bytes of a multibyte-character string to a specified character. These versions of [`_mbsnbset`, `_mbsnbset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbset-mbsnbset-l?view=msvc-170) have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t _mbsnbset_s(
   unsigned char *str,
   size_t size,
   unsigned int c,
   size_t count
);
errno_t _mbsnbset_s_l(
   unsigned char *str,
   size_t size,
   unsigned int c,
   size_t count,
   _locale_t locale
);
template <size_t size>
errno_t _mbsnbset_s(
   unsigned char (&str)[size],
   unsigned int c,
   size_t count
); // C++ only
template <size_t size>
errno_t _mbsnbset_s_l(
   unsigned char (&str)[size],
   unsigned int c,
   size_t count,
   _locale_t locale
); // C++ only
```

### Parameters

_`str`_  
String to be altered.

_`size`_  
The size of the string buffer.

_`c`_  
Single-byte or multibyte-character setting.

_`count`_  
Number of bytes to be set.

_`locale`_  
Locale to use.

## Return value

Zero if successful; otherwise, an error code.

The **`_mbsnbset_s`** and **`_mbsnbset_s_l`** functions set, at most, the first _`count`_ bytes of _`str`_ to _`c`_. If _`count`_ is greater than the length of _`str`_, the length of _`str`_ is used instead of _`count`_. If _`c`_ is a multibyte character and can't be set entirely into the last byte that's specified by _`count`_, the last byte is padded with a blank character. **`_mbsnbset_s`** and **`_mbsnbset_s_l`** don't place a terminating null at the end of _`str`_.

**`_mbsnbset_s`** and **`_mbsnbset_s_l`** resemble `_mbsnset`, except that they set _`count`_ bytes rather than _`count`_ characters of _`c`_.

If _`str`_ is `NULL` or _`count`_ is zero, this function generates an invalid parameter exception, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the function returns `NULL`. Also, if _`c`_ isn't a valid multibyte character, `errno` is set to `EINVAL` and a space is used instead.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The **`_mbsnbset_s`** version of this function uses the current locale for this locale-dependent behavior; the **`_mbsnbset_s_l`** version is identical except that it instead uses the locale parameter that's passed in. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

In C++, use of these functions is simplified by template overloads; the overloads can infer buffer length automatically and thereby eliminate the need to specify a size argument. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

The debug library versions of these functions first fill the buffer with 0xFE. To disable this behavior, use [`_CrtSetDebugFillThreshold`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdebugfillthreshold?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsnset_s`

`_strnset_s`

**`_mbsnbset_s`**

`_wcsnset_s`

`_tcsnset_s_l`

`_strnset_s_l`

**`_mbsnbset_s_l`**

`_wcsnset_s_l`

## Requirements

Routine

Required header

**`_mbsnbset_s`**

`<mbstring.h>`

**`_mbsnbset_s_l`**

`<mbstring.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_mbsnbset_s.c
#include <mbstring.h>
#include <stdio.h>

int main( void )
{
   char string[15] = "This is a test";
   /* Set not more than 4 bytes of string to be *'s */
   printf( "Before: %s\n", string );
   _mbsnbset_s( string, sizeof(string), '*', 4 );
   printf( "After:  %s\n", string );
}
```

## Output

```
Before: This is a test
After:  **** is a test
```

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`_mbsnbcat`, `_mbsnbcat_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcat-mbsnbcat-l?view=msvc-170)  
[`_strnset`, `_strnset_l`, `_wcsnset`, `_wcsnset_l`, `_mbsnset`, `_mbsnset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnset-strnset-l-wcsnset-wcsnset-l-mbsnset-mbsnset-l?view=msvc-170)  
[`_strset`, `_strset_l`, `_wcsset`, `_wcsset_l`, `_mbsset`, `_mbsset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strset-strset-l-wcsset-wcsset-l-mbsset-mbsset-l?view=msvc-170)