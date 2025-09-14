---
title: "_strncnt, _wcsncnt, _mbsnbcnt, _mbsnbcnt_l, _mbsnccnt, _mbsnccnt_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncnt-wcsncnt-mbsnbcnt-mbsnbcnt-l-mbsnccnt-mbsnccnt-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns the number of characters or bytes within a specified count.

## Syntax

```
size_t _strncnt(
   const char *str,
   size_t count
);
size_t _wcsncnt(
   const wchar_t *str,
   size_t count
);
size_t _mbsnbcnt(
   const unsigned char *str,
   size_t count
);
size_t _mbsnbcnt_l(
   const unsigned char *str,
   size_t count,
   _locale_t locale
);
size_t _mbsnccnt(
   const unsigned char *str,
   size_t count
);
size_t _mbsnccnt_l(
   const unsigned char *str,
   size_t count,
   _locale_t locale
);
```

### Parameters

_`str`_  
String to be examined.

_`count`_  
Number of characters or bytes to be examined in _`str`_.

_`locale`_  
Locale to use.

## Return value

**`_mbsnbcnt`** and **`_mbsnbcnt_l`** return the number of bytes found in the first _`count`_ of multibyte characters of _`str`_. **`_mbsnccnt`** and **`_mbsnccnt_l`** return the number of characters found in the first _`count`_ of bytes of _`str`_. If a null character is encountered before the examination of _`str`_ has completed, they return the number of bytes or characters found before the null character. If _`str`_ consists of fewer than _`count`_ characters or bytes, they return the number of characters or bytes in the string. If _`count`_ is less than zero, they return 0. In previous versions, these functions had a return value of type **`int`** rather than `size_t`.

**`_strncnt`** returns the number of characters in the first _`count`_ bytes of the single-byte string _`str`_. **`_wcsncnt`** returns the number of characters in the first _`count`_ wide characters of the wide-character string _`str`_.

**`_mbsnbcnt`** and **`_mbsnbcnt_l`** count the number of bytes found in the first _`count`_ of multibyte characters of _`str`_. **`_mbsnbcnt`** and **`_mbsnbcnt_l`** replace `mtob` and should be used in place of `mtob`.

**`_mbsnccnt`** and **`_mbsnccnt_l`** count the number of characters found in the first _`count`_ of bytes of _`str`_. If **`_mbsnccnt`** and **`_mbsnccnt_l`** encounter a null character in the second byte of a double-byte character, the first byte is also considered to be null and isn't included in the returned count value. **`_mbsnccnt`** and **`_mbsnccnt_l`** replace `btom` and should be used in place of `btom`.

If _`str`_ is a `NULL` pointer or is _`count`_ is 0, these functions invoke the invalid parameter handler as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170), `errno` is set to `EINVAL`, and the function returns 0.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of these functions without the `_l` suffix use the current locale for this locale-dependent behavior; the versions with the `_l` suffix are identical except that they use the locale parameter passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsnbcnt`

**`_strncnt`**

**`_mbsnbcnt`**

**`_wcsncnt`**

`_tcsnccnt`

**`_strncnt`**

**`_mbsnbcnt`**

n/a

**`_wcsncnt`**

n/a

n/a

**`_mbsnbcnt`**

**`_wcsncnt`**

n/a

n/a

**`_mbsnccnt`**

n/a

n/a

**`_mbsnbcnt_l`**

**`_mbsnccnt_l`**

## Requirements

Routine

Required header

**`_mbsnbcnt`**

<mbstring.h>

**`_mbsnbcnt_l`**

<mbstring.h>

**`_mbsnccnt`**

<mbstring.h>

**`_mbsnccnt_l`**

<mbstring.h>

**`_strncnt`**

<tchar.h>

**`_wcsncnt`**

<tchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_mbsnbcnt.c

#include <mbstring.h>
#include <stdio.h>

int main( void )
{
   unsigned char str[] = "This is a multibyte-character string.";
   unsigned int char_count, byte_count;
   char_count = _mbsnccnt( str, 10 );
   byte_count = _mbsnbcnt( str, 10 );
   if ( byte_count - char_count )
      printf( "The first 10 characters contain %d multibyte characters\n", char_count );
   else
      printf( "The first 10 characters are single-byte.\n");
}
```

### Output

```
The first 10 characters are single-byte.
```

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`_mbsnbcat`, `_mbsnbcat_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcat-mbsnbcat-l?view=msvc-170)