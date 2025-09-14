---
title: "wcrtomb_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcrtomb-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Convert a wide character into its multibyte character representation. A version of [`wcrtomb`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcrtomb?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t wcrtomb_s(
   size_t *pReturnValue,
   char *mbchar,
   size_t sizeOfmbchar,
   wchar_t *wchar,
   mbstate_t *mbstate
);
template <size_t size>
errno_t wcrtomb_s(
   size_t *pReturnValue,
   char (&mbchar)[size],
   wchar_t *wchar,
   mbstate_t *mbstate
); // C++ only
```

### Parameters

_`pReturnValue`_  
Returns the number of bytes written or -1 if an error occurred.

_`mbchar`_  
The resulting multibyte converted character.

_`sizeOfmbchar`_  
The size of the _`mbchar`_ variable in bytes.

_`wchar`_  
A wide character to convert.

_`mbstate`_  
A pointer to an `mbstate_t` object.

## Return value

Returns zero or an `errno` value if an error occurs.

The **`wcrtomb_s`** function converts a wide character, beginning in the specified conversion state contained in _`mbstate`_, from the value contained in _`wchar`_, into the address represented by _`mbchar`_. The _`pReturnValue`_ value will be the number of bytes converted, but no more than `MB_CUR_MAX` bytes, or an -1 if an error occurred.

If _`mbstate`_ is null, the internal `mbstate_t` conversion state is used. If the character contained in _`wchar`_ doesn't have a corresponding multibyte character, the value of _`pReturnValue`_ is -1, and the function returns the `errno` value of `EILSEQ`.

The **`wcrtomb_s`** function differs from [`wctomb_s`, `_wctomb_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctomb-s-wctomb-s-l?view=msvc-170) by its restartability. The conversion state is stored in _`mbstate`_ for subsequent calls to the same or other restartable functions. Results are undefined when mixing the use of restartable and nonrestartable functions. For example, an application would use `wcsrlen` rather than `wcslen`, if a subsequent call to `wcsrtombs_s` were used instead of `wcstombs_s`.

In C++, using this function is simplified by template overloads; the overloads can infer buffer length automatically (eliminating the need to specify a size argument) and they can automatically replace older, non-secure functions with their newer, secure counterparts. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Exceptions

The **`wcrtomb_s`** function is multithread safe as long as no function in the current thread calls `setlocale` while this function is executing and the _`mbstate`_ is null.

## Example

```
// crt_wcrtomb_s.c
// This program converts a wide character
// to its corresponding multibyte character.
//

#include <string.h>
#include <stdio.h>
#include <wchar.h>

int main( void )
{
    errno_t     returnValue;
    size_t      pReturnValue;
    mbstate_t   mbstate;
    size_t      sizeOfmbStr = 1;
    char        mbchar = 0;
    wchar_t*    wchar = L"Q\0";

    // Reset to initial conversion state
    memset(&mbstate, 0, sizeof(mbstate));

    returnValue = wcrtomb_s(&pReturnValue, &mbchar, sizeof(char),
                            *wchar, &mbstate);
    if (returnValue == 0) {
        printf("The corresponding wide character \"");
        wprintf(L"%s\"", wchar);
        printf(" was converted to a the \"%c\" ", mbchar);
        printf("multibyte character.\n");
    }
    else
    {
        printf("No corresponding multibyte character "
               "was found.\n");
    }
}
```

```
The corresponding wide character "Q" was converted to a the "Q" multibyte character.
```

## Requirements

Routine

Required header

**`wcrtomb_s`**

<wchar.h>

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`mbsinit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsinit?view=msvc-170)