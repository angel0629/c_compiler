---
title: "wcrtomb"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcrtomb?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Convert a wide character into its multibyte character representation. A more secure version of this function is available; see [`wcrtomb_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcrtomb-s?view=msvc-170).

## Syntax

```
size_t wcrtomb(
   char *mbchar,
   wchar_t wchar,
   mbstate_t *mbstate
);
template <size_t size>
size_t wcrtomb(
   char (&mbchar)[size],
   wchar_t wchar,
   mbstate_t *mbstate
); // C++ only
```

### Parameters

_`mbchar`_  
The resulting multibyte converted character.

_`wchar`_  
A wide character to convert.

_`mbstate`_  
A pointer to an `mbstate_t` object.

## Return value

Returns the number of bytes required to represent the converted multibyte character, otherwise a -1 if an error occurs.

The **`wcrtomb`** function converts a wide character, beginning in the specified conversion state contained in _`mbstate`_, from the value contained in _`wchar`_, into the address represented by _`mbchar`_. The return value is the number of bytes required to represent the corresponding multibyte character, but it will not return more than `MB_CUR_MAX` bytes.

If _`mbstate`_ is null, the internal `mbstate_t` object containing the conversion state of _`mbchar`_ is used. If the character sequence _`wchar`_ doesn't have a corresponding multibyte character representation, a -1 is returned, and the `errno` is set to `EILSEQ`.

The **`wcrtomb`** function differs from [`wctomb`, `_wctomb_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctomb-wctomb-l?view=msvc-170) by its restartability. The conversion state is stored in _`mbstate`_ for subsequent calls to the same or other restartable functions. Results are undefined when mixing the use of restartable and nonrestartable functions. For example, an application would use `wcsrlen` rather than `wcsnlen`, if a subsequent call to `wcsrtombs` were used instead of `wcstombs`.

In C++, this function has a template overload that invokes the newer, secure counterparts of this function. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Exceptions

The **`wcrtomb`** function is multithread safe as long as no function in the current thread calls `setlocale` while this function is executing and while the _`mbstate`_ is null.

## Example

```
// crt_wcrtomb.c
// compile with: /W3
// This program converts a wide character
// to its corresponding multibyte character.

#include <string.h>
#include <stdio.h>
#include <wchar.h>

int main( void )
{
    size_t      sizeOfCovertion = 0;
    mbstate_t   mbstate;
    char        mbStr = 0;
    wchar_t*    wcStr = L"Q";

    // Reset to initial conversion state
    memset(&mbstate, 0, sizeof(mbstate));

    sizeOfCovertion = wcrtomb(&mbStr, *wcStr, &mbstate); // C4996
    // Note: wcrtomb is deprecated; consider using wcrtomb_s instead
    if (sizeOfCovertion > 0)
    {
        printf("The corresponding wide character \"");
        wprintf(L"%s\"", wcStr);
        printf(" was converted to the \"%c\" ", mbStr);
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
The corresponding wide character "Q" was converted to the "Q" multibyte character.
```

## Requirements

Routine

Required header

**`wcrtomb`**

<wchar.h>

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`mbsinit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsinit?view=msvc-170)