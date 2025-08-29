---
title: "wcstombs, _wcstombs_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-wcstombs-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a sequence of wide characters to a corresponding sequence of multibyte characters. More secure versions of these functions are available; see [`wcstombs_s`, `_wcstombs_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-s-wcstombs-s-l?view=msvc-170).

## Syntax

```
size_t wcstombs(
   char *mbstr,
   const wchar_t *wcstr,
   size_t count
);
size_t _wcstombs_l(
   char *mbstr,
   const wchar_t *wcstr,
   size_t count,
   _locale_t locale
);
template <size_t size>
size_t wcstombs(
   char (&mbstr)[size],
   const wchar_t *wcstr,
   size_t count
); // C++ only
template <size_t size>
size_t _wcstombs_l(
   char (&mbstr)[size],
   const wchar_t *wcstr,
   size_t count,
   _locale_t locale
); // C++ only
```

### Parameters

_`mbstr`_  
The address of a sequence of multibyte characters.

_`wcstr`_  
The address of a sequence of wide characters.

_`count`_  
The maximum number of bytes that can be stored in the multibyte output string.

_`locale`_  
The locale to use.

## Return value

If **`wcstombs`** successfully converts the multibyte string, it returns the number of bytes written into the multibyte output string, excluding the terminating `NULL` (if any). If the _`mbstr`_ argument is `NULL`, **`wcstombs`** returns the required size in bytes of the destination string. If **`wcstombs`** encounters a wide character it can't convert to a multibyte character, it returns -1 cast to type **`size_t`** and sets `errno` to `EILSEQ`.

The **`wcstombs`** function converts the wide-character string pointed to by _`wcstr`_ to the corresponding multibyte characters and stores the results in the _`mbstr`_ array. The _`count`_ parameter indicates the maximum number of bytes that can be stored in the multibyte output string (that is, the size of _`mbstr`_). In general, it isn't known how many bytes will be required when converting a wide-character string. Some wide characters will require only a single byte in the output string; others require 2 bytes. If there are 2 bytes in the multibyte output string for every wide character in the input string (including the wide character `NULL`), the result is guaranteed to fit.

Starting in Windows 10 version 1803 (10.0.17134.0), the Universal C Runtime supports using a UTF-8 code page. Use `wcstombs(NULL, wcstr, 0)` to get the correct size that you'll need for the conversion because assuming that you'll need two bytes for every wide character may not be enough. For more information about UTF-8 support, see [UTF-8 support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170)

If **`wcstombs`** encounters the wide-character `NULL` character (L'\\0') either before or when _`count`_ occurs, it converts it to an 8-bit 0 and stops. Thus, the multibyte character string at _`mbstr`_ is null-terminated only if **`wcstombs`** encounters a wide-character `NULL` character during conversion. If the sequences pointed to by _`wcstr`_ and _`mbstr`_ overlap, the behavior of **`wcstombs`** is undefined.

If the _`mbstr`_ argument is `NULL`, **`wcstombs`** returns the required size in bytes of the destination string.

**`wcstombs`** validates its parameters. If _`wcstr`_ is `NULL`, or if _`count`_ is greater than `INT_MAX`, this function invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the function sets `errno` to `EINVAL` and returns -1.

**`wcstombs`** uses the current locale for any locale-dependent behavior; **`_wcstombs_l`** is identical except that it uses the locale passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

In C++, these functions have template overloads that invoke the newer, secure counterparts of these functions. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`wcstombs`**

`<stdlib.h>`

**`_wcstombs_l`**

`<stdlib.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

This program illustrates the behavior of the **`wcstombs`** function.

```
// crt_wcstombs.c
// compile with: /W3
// This example demonstrates the use
// of wcstombs, which converts a string
// of wide characters to a string of
// multibyte characters.

#include <stdlib.h>
#include <stdio.h>

#define BUFFER_SIZE 100

int main( void )
{
    size_t  count;
    char    *pMBBuffer = (char *)malloc( BUFFER_SIZE );
    wchar_t *pWCBuffer = L"Hello, world.";

    printf("Convert wide-character string:\n" );

    count = wcstombs(pMBBuffer, pWCBuffer, BUFFER_SIZE ); // C4996
    // Note: wcstombs is deprecated; consider using wcstombs_s instead
    printf("   Characters converted: %u\n",
            count );
    printf("    Multibyte character: %s\n\n",
           pMBBuffer );

    free(pMBBuffer);
}
```

```
Convert wide-character string:
   Characters converted: 13
    Multibyte character: Hello, world.
```

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`_mbclen`, `mblen`, `_mblen_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbclen-mblen-mblen-l?view=msvc-170)  
[`mbstowcs`, `_mbstowcs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbstowcs-mbstowcs-l?view=msvc-170)  
[`mbtowc`, `_mbtowc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbtowc-mbtowc-l?view=msvc-170)  
[`wctomb`, `_wctomb_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctomb-wctomb-l?view=msvc-170)  
[`WideCharToMultiByte`](https://learn.microsoft.com/en-us/windows/win32/api/stringapiset/nf-stringapiset-widechartomultibyte)