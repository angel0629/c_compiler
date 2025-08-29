---
title: "_mbclen, mblen, _mblen_l, _mbclen_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbclen-mblen-mblen-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets the length and determines the validity of a multibyte character.

## Syntax

```
size_t _mbclen(
   const unsigned char *c
);
size_t _mbclen_l(
   unsigned char const* c,
   _locale_t locale
);
int mblen(
   const char *mbstr,
   size_t count
);
int _mblen_l(
   const char *mbstr,
   size_t count,
   _locale_t locale
);
```

### Parameters

_`c`_  
Multibyte character.

_`mbstr`_  
Address of a multibyte-character byte sequence.

_`count`_  
Number of bytes to check.

_`locale`_  
Locale to use.

## Return value

**`_mbclen`** and **`_mbclen_l`** return 1 or 2, according to the length of the multibyte character _`c`_. The functions always return 1 for UTF-8, whether _`c`_ is multibyte or not. There's no error return for **`_mbclen`**.

If _`mbstr`_ isn't `NULL`, **`mblen`** and **`_mblen_l`** return the length, in bytes, of the multibyte character. The **`mblen`** and **`_mblen_l`** functions work correctly on UTF-8, and may return a value between 1 and 3. When _`mbstr`_ is `NULL` (or it points to the wide-character null character), **`mblen`** and **`_mblen_l`** return 0. The object that _`mbstr`_ points to must form a valid multibyte character within the first _`count`_ characters, or **`mblen`** and **`_mblen_l`** return -1.

The **`_mbclen`** function returns the length, in bytes, of the multibyte character _`c`_. If _`c`_ doesn't point to the lead byte of a multibyte character (as determined by an implicit call to [`_ismbblead`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbblead-ismbblead-l?view=msvc-170), the result of **`_mbclen`** is unpredictable.

**`mblen`** returns the length in bytes of _`mbstr`_ if it's a valid multibyte character. It also determines multibyte-character validity associated with the code page. **`mblen`** examines _`count`_ or fewer bytes contained in _`mbstr`_, but not more than `MB_CUR_MAX` bytes.

The output value is affected by the `LC_CTYPE` category setting of the locale. The versions of these functions without the `_l` suffix use the current locale for this locale-dependent behavior. The **`_l`** suffixed versions behave the same, but they use the locale parameter passed in instead. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170) and [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

**`_mbclen`**, **`_mblen_l`**, and **`_mbclen_l`** are Microsoft-specific, not part of the Standard C library. We don't recommend you use them where you want portable code. For Standard C compatibility, use **`mblen`** or **`mbrlen`** instead.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tclen`

Maps to macro or inline function

**`_mbclen`**

Maps to macro or inline function

## Requirements

Routine

Required header

**`_mbclen`**

<mbstring.h>

**`mblen`**

<stdlib.h>

**`_mblen_l`**

<stdlib.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_mblen.c
/* illustrates the behavior of the mblen function
*/

#include <stdlib.h>
#include <stdio.h>

int main( void )
{
    int      i;
    char    *pmbc = (char *)malloc( sizeof( char ) );
    wchar_t  wc   = L'a';

    printf( "Convert wide character to multibyte character:\n" );
    wctomb_s( &i, pmbc, sizeof(char), wc );
    printf( "   Characters converted: %u\n", i );
    printf( "   Multibyte character: %x\n\n", *pmbc );

    i = mblen( pmbc, MB_CUR_MAX );
    printf( "Length in bytes of multibyte character %x: %u\n", *pmbc, i );

    pmbc = NULL;
    i = mblen( pmbc, MB_CUR_MAX );
    printf( "Length in bytes of NULL multibyte character %x: %u\n", pmbc, i );
}
```

```
Convert wide character to multibyte character:
   Characters converted: 1
   Multibyte character: 61

Length in bytes of multibyte character 61: 1
Length in bytes of NULL multibyte character 0: 0
```

## See also

[Character classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/character-classification?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`_mbccpy`, `_mbccpy_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbccpy-mbccpy-l?view=msvc-170)  
[`mbrlen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbrlen?view=msvc-170)  
[`strlen`, `wcslen`, `_mbslen`, `_mbslen_l`, `_mbstrlen`, `_mbstrlen_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strlen-wcslen-mbslen-mbslen-l-mbstrlen-mbstrlen-l?view=msvc-170)