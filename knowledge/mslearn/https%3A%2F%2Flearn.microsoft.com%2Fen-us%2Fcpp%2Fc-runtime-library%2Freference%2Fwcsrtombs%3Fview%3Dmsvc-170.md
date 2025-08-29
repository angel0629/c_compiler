---
title: "wcsrtombs"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcsrtombs?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Convert a wide character string to its multibyte character string representation. A more secure version of this function is available; see [`wcsrtombs_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcsrtombs-s?view=msvc-170).

## Syntax

```
size_t wcsrtombs(
   char *mbstr,
   const wchar_t **wcstr,
   sizeof count,
   mbstate_t *mbstate
);
template <size_t size>
size_t wcsrtombs(
   char (&mbstr)[size],
   const wchar_t **wcstr,
   sizeof count,
   mbstate_t *mbstate
); // C++ only
```

### Parameters

_`mbstr`_  
The resulting converted multibyte character string's address location.

_`wcstr`_  
Indirectly points to the location of the wide character string to be converted.

_`count`_  
The number of characters to be converted.

_`mbstate`_  
A pointer to an `mbstate_t` conversion state object.

## Return value

Returns the number of bytes successfully converted, not including the null terminating null byte (if any), otherwise a -1 if an error occurred.

The **`wcsrtombs`** function converts a string of wide characters, beginning in the specified conversion state contained in _`mbstate`_, from the values indirect pointed to in _`wcstr`_, into the address of _`mbstr`_. The conversion will continue for each character until: after a null terminating wide character is encountered, when a non corresponding character is encountered or when the next character would exceed the limit contained in _`count`_. If **`wcsrtombs`** encounters the wide-character null character (L'\\0') either before or when _`count`_ occurs, it converts it to an 8-bit 0 and stops.

Thus, the multibyte character string at _`mbstr`_ is null-terminated only if **`wcsrtombs`** encounters a wide character null character during conversion. If the sequences pointed to by _`wcstr`_ and _`mbstr`_ overlap, the behavior of **`wcsrtombs`** is undefined. **`wcsrtombs`** is affected by the LC\_TYPE category of the current locale.

The **`wcsrtombs`** function differs from [`wcstombs`, `_wcstombs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-wcstombs-l?view=msvc-170) by its restartability. The conversion state is stored in _`mbstate`_ for subsequent calls to the same or other restartable functions. Results are undefined when mixing the use of restartable and nonrestartable functions. For example, an application would use `wcsrlen` rather than `wcsnlen`, if a subsequent call to **`wcsrtombs`** were used instead of `wcstombs`.

If the _`mbstr`_ argument is `NULL`, **`wcsrtombs`** returns the required size in bytes of the destination string. If _`mbstate`_ is null, the internal `mbstate_t` conversion state is used. If the character sequence _`wchar`_ doesn't have a corresponding multibyte character representation, a -1 is returned, and the `errno` is set to `EILSEQ`.

In C++, this function has a template overload that invokes the newer, secure counterpart of this function. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Exceptions

The **`wcsrtombs`** function is multithread safe as long as no function in the current thread calls `setlocale` while this function is executing and the _`mbstate`_ isn't null.

## Example

```
// crt_wcsrtombs.cpp
// compile with: /W3
// This code example converts a wide
// character string into a multibyte
// character string.

#include <stdio.h>
#include <memory.h>
#include <wchar.h>
#include <errno.h>

#define MB_BUFFER_SIZE 100

int main()
{
    const wchar_t   wcString[] =
                    {L"Every good boy does fine."};
    const wchar_t   *wcsIndirectString = wcString;
    char            mbString[MB_BUFFER_SIZE];
    size_t          countConverted;
    mbstate_t       mbstate;

    // Reset to initial shift state
    ::memset((void*)&mbstate, 0, sizeof(mbstate));

    countConverted = wcsrtombs(mbString, &wcsIndirectString,
                               MB_BUFFER_SIZE, &mbstate); // C4996
    // Note: wcsrtombs is deprecated; consider using wcsrtombs_s
    if (errno == EILSEQ)
    {
        printf( "An encoding error was detected in the string.\n" );
    }
    else
    {
        printf( "The string was successfuly converted.\n" );
    }
}
```

```
The string was successfuly converted.
```

## Requirements

Routine

Required header

**`wcsrtombs`**

<wchar.h>

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`wcrtomb`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcrtomb?view=msvc-170)  
[`wcrtomb_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcrtomb-s?view=msvc-170)  
[`wctomb`, `_wctomb_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctomb-wctomb-l?view=msvc-170)  
[`wcstombs`, `_wcstombs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-wcstombs-l?view=msvc-170)  
[`mbsinit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsinit?view=msvc-170)