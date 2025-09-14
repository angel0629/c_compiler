---
title: "wctomb, _wctomb_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctomb-wctomb-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Convert a wide character to the corresponding multibyte character. More secure versions of these functions are available; see [`wctomb_s`, `_wctomb_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctomb-s-wctomb-s-l?view=msvc-170).

## Syntax

```
int wctomb(
   char *mbchar,
   wchar_t wchar
);
int _wctomb_l(
   char *mbchar,
   wchar_t wchar,
   _locale_t locale
);
```

### Parameters

_`mbchar`_  
The address of a multibyte character.

_`wchar`_  
A wide character.

## Return value

If **`wctomb`** converts the wide character to a multibyte character, it returns the number of bytes (which is never greater than `MB_CUR_MAX`) in the wide character. If _`wchar`_ is the wide-character null character (L'\\0'), **`wctomb`** returns 1. If the target pointer _`mbchar`_ is `NULL`, **`wctomb`** returns 0. If the conversion isn't possible in the current locale, **`wctomb`** returns -1 and `errno` is set to `EILSEQ`.

The **`wctomb`** function converts its _`wchar`_ argument to the corresponding multibyte character and stores the result at _`mbchar`_. You can call the function from any point in any program. **`wctomb`** uses the current locale for any locale-dependent behavior; **`_wctomb_l`** is identical to **`wctomb`** except that it uses the locale passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

**`wctomb`** validates its parameters. If _`mbchar`_ is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the function returns -1.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`wctomb`**

<stdlib.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

This program illustrates the behavior of the wctomb function.

```
// crt_wctomb.cpp
// compile with: /W3
#include <stdio.h>
#include <stdlib.h>

int main( void )
{
   int i;
   wchar_t wc = L'a';
   char *pmb = (char *)malloc( MB_CUR_MAX );

   printf( "Convert a wide character:\n" );
   i = wctomb( pmb, wc ); // C4996
   // Note: wctomb is deprecated; consider using wctomb_s
   printf( "   Characters converted: %u\n", i );
   printf( "   Multibyte character: %.1s\n\n", pmb );
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