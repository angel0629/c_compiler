---
title: "wctomb_s, _wctomb_s_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctomb-s-wctomb-s-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a wide character to the corresponding multibyte character. A version of [`wctomb`, `_wctomb_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctomb-wctomb-l?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t wctomb_s(
   int *pRetValue,
   char *mbchar,
   size_t sizeInBytes,
   wchar_t wchar
);
errno_t _wctomb_s_l(
   int *pRetValue,
   char *mbchar,
   size_t sizeInBytes,
   wchar_t wchar,
   _locale_t locale
);
```

### Parameters

_`pRetValue`_  
The number of bytes, or a code indicating the result.

_`mbchar`_  
The address of a multibyte character.

_`sizeInBytes`_  
Size of the buffer _`mbchar`_.

_`wchar`_  
The wide character to convert.

_`locale`_  
The locale to use.

## Return value

Zero if successful, an error code on failure.

Error Conditions

_`mbchar`_

_`sizeInBytes`_

Return value

_`pRetValue`_

`NULL`

\>0

`EINVAL`

not modified

any

\>`INT_MAX`

`EINVAL`

not modified

any

too small

`EINVAL`

not modified

If any of the above error conditions occurs, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `wctomb` returns `EINVAL` and sets `errno` to `EINVAL`.

The return value [`EILSEQ`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-constants?view=msvc-170) indicates that the value passed via the parameter `wchar` is not a valid wide character.

The **`wctomb_s`** function converts its _`wchar`_ argument to the corresponding multibyte character and stores the result at _`mbchar`_. You can call the function from any point in any program.

If **`wctomb_s`** converts the wide character to a multibyte character, it puts the number of bytes (which is never greater than `MB_CUR_MAX`) in the wide character into the integer pointed to by _`pRetValue`_. If _`wchar`_ is the wide-character null character (L'\\0'), **`wctomb_s`** fills _`pRetValue`_ with 1. If the target pointer _`mbchar`_ is `NULL`, **`wctomb_s`** puts 0 in _`pRetValue`_. If the conversion isn't possible in the current locale, **`wctomb_s`** puts -1 in _`pRetValue`_.

**`wctomb_s`** uses the current locale for locale-dependent information; **`_wctomb_s_l`** is identical except that it uses the locale passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`wctomb_s`**

<stdlib.h>

**`_wctomb_s_l`**

<stdlib.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

This program illustrates the behavior of the **`wctomb_s`** function.

```
// crt_wctomb_s.cpp
#include <stdio.h>
#include <stdlib.h>

int main( void )
{
    int i;
    wchar_t wc = L'a';
    char *pmb = (char *)malloc( MB_CUR_MAX );

    printf_s( "Convert a wide character:\n" );
    wctomb_s( &i, pmb, MB_CUR_MAX, wc );
    printf_s( "   Characters converted: %u\n", i );
    printf_s( "   Multibyte character: %.1s\n\n", pmb );
}
```

```
Convert a wide character:
   Characters converted: 1
   Multibyte character: a
```

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`_mbclen`, `mblen`, `_mblen_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbclen-mblen-mblen-l?view=msvc-170)  
[`mbstowcs`, `_mbstowcs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbstowcs-mbstowcs-l?view=msvc-170)  
[`mbtowc`, `_mbtowc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbtowc-mbtowc-l?view=msvc-170)  
[`wcstombs`, `_wcstombs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-wcstombs-l?view=msvc-170)  
[`WideCharToMultiByte`](https://learn.microsoft.com/en-us/windows/win32/api/stringapiset/nf-stringapiset-widechartomultibyte)