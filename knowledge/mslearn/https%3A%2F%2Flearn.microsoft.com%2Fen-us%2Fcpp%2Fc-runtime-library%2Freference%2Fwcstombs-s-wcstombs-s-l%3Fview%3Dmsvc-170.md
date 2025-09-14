---
title: "wcstombs_s, _wcstombs_s_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-s-wcstombs-s-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a sequence of wide characters to a corresponding sequence of multibyte characters. A version of [`wcstombs`, `_wcstombs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-wcstombs-l?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t wcstombs_s(
   size_t *pReturnValue,
   char *mbstr,
   size_t sizeInBytes,
   const wchar_t *wcstr,
   size_t count
);

errno_t _wcstombs_s_l(
   size_t *pReturnValue,
   char *mbstr,
   size_t sizeInBytes,
   const wchar_t *wcstr,
   size_t count,
   _locale_t locale
);

template <size_t size>
errno_t wcstombs_s(
   size_t *pReturnValue,
   char (&mbstr)[size],
   const wchar_t *wcstr,
   size_t count
); // C++ only

template <size_t size>
errno_t _wcstombs_s_l(
   size_t *pReturnValue,
   char (&mbstr)[size],
   const wchar_t *wcstr,
   size_t count,
   _locale_t locale
); // C++ only
```

### Parameters

_`pReturnValue`_  
The size in bytes of the converted string, including the null terminator.

_`mbstr`_  
The address of a buffer for the resulting converted multibyte character string.

_`sizeInBytes`_  
The size in bytes of the _`mbstr`_ buffer.

_`wcstr`_  
Points to the wide character string to be converted.

_`count`_  
The maximum number of bytes to store in the _`mbstr`_ buffer, not including the terminating null character, or [`_TRUNCATE`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/truncate?view=msvc-170).

_`locale`_  
The locale to use.

## Return value

Zero if successful, an error code on failure.

Error condition

Return value and `errno`

_`mbstr`_ is `NULL` and _`sizeInBytes`_ > 0

`EINVAL`

_`wcstr`_ is `NULL`

`EINVAL`

The destination buffer is too small to contain the converted string (unless _`count`_ is `_TRUNCATE`; see Remarks below)

`ERANGE`

If any of these conditions occurs, the invalid parameter exception is invoked as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the function returns an error code and sets `errno` as indicated in the table.

The **`wcstombs_s`** function converts a string of wide characters pointed to by _`wcstr`_ into multibyte characters stored in the buffer pointed to by _`mbstr`_. The conversion will continue for each character until one of these conditions is met:

*   A null wide character is encountered
    
*   A wide character that can't be converted is encountered
    
*   The number of bytes stored in the _`mbstr`_ buffer equals _`count`_.
    

The destination string is always null-terminated (even if there's an error).

If _`count`_ is the special value [`_TRUNCATE`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/truncate?view=msvc-170), then **`wcstombs_s`** converts as much of the string as will fit into the destination buffer, while still leaving room for a null terminator. If the string is truncated, the return value is `STRUNCATE`, and the conversion is considered successful.

If **`wcstombs_s`** successfully converts the source string, it puts the size in bytes of the converted string, including the null terminator, into _`*pReturnValue`_ (provided _`pReturnValue`_ isn't `NULL`). The size is calculated even if the _`mbstr`_ argument is `NULL`; it provides a way to determine the required buffer size. If _`mbstr`_ is `NULL`, _`count`_ is ignored.

If **`wcstombs_s`** encounters a wide character it can't convert to a multibyte character, it puts 0 in _`*ReturnValue`_, sets the destination buffer to an empty string, sets `errno` to `EILSEQ`, and returns `EILSEQ`.

If the sequences pointed to by _`wcstr`_ and _`mbstr`_ overlap, the behavior of **`wcstombs_s`** is undefined.

Important

Ensure that _`wcstr`_ and _`mbstr`_ do not overlap, and that _`count`_ correctly reflects the number of wide characters to convert.

**`wcstombs_s`** uses the current locale for any locale-dependent behavior; **`_wcstombs_s_l`** is identical to **`wcstombs`** except that it uses the locale passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

In C++, using these functions is simplified by template overloads; the overloads can infer buffer length automatically (eliminating the need to specify a size argument) and they can automatically replace older, non-secure functions with their newer, secure counterparts. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`wcstombs_s`**

`<stdlib.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

This program illustrates the behavior of the **`wcstombs_s`** function.

```
// crt_wcstombs_s.c
// This example converts a wide character
// string to a multibyte character string.
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

#define BUFFER_SIZE 100

int main( void )
{
    size_t i;
    char *pMBBuffer = (char *)malloc( BUFFER_SIZE );
    const wchar_t*pWCBuffer = L"Hello, world.";

    printf( "Convert wide-character string:\n" );

    // Conversion
    wcstombs_s(&i, pMBBuffer, (size_t)BUFFER_SIZE,
               pWCBuffer, (size_t)BUFFER_SIZE - 1); // -1 so the appended NULL doesn't fall outside the allocated buffer

    // Output
    printf("   Characters converted: %u\n", i);
    printf("    Multibyte character: %s\n\n", pMBBuffer );

    // Free multibyte character buffer
    if (pMBBuffer)
    {
        free(pMBBuffer);
    }
    
    return 0;
}
```

```
Convert wide-character string:
   Characters converted: 14
    Multibyte character: Hello, world.
```

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`_mbclen`, `mblen`, `_mblen_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbclen-mblen-mblen-l?view=msvc-170)  
[`mbstowcs`, `_mbstowcs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbstowcs-mbstowcs-l?view=msvc-170)  
[`mbtowc`, `_mbtowc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbtowc-mbtowc-l?view=msvc-170)  
[`wctomb_s`, `_wctomb_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctomb-s-wctomb-s-l?view=msvc-170)  
[`WideCharToMultiByte`](https://learn.microsoft.com/en-us/windows/win32/api/stringapiset/nf-stringapiset-widechartomultibyte)