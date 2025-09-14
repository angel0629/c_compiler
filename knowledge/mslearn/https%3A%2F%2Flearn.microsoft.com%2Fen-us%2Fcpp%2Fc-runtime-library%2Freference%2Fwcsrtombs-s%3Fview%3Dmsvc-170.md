---
title: "wcsrtombs_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcsrtombs-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Convert a wide character string to its multibyte character string representation. A version of [`wcsrtombs`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcsrtombs?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t wcsrtombs_s(
   size_t *pReturnValue,
   char *mbstr,
   size_t sizeInBytes,
   const wchar_t **wcstr,
   sizeof count,
   mbstate_t *mbstate
);
template <size_t size>
errno_t wcsrtombs_s(
   size_t *pReturnValue,
   char (&mbstr)[size],
   const wchar_t **wcstr,
   sizeof count,
   mbstate_t *mbstate
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
The maximum number of bytes to be stored in the _`mbstr`_ buffer, or [`_TRUNCATE`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/truncate?view=msvc-170).

_`mbstate`_  
A pointer to an `mbstate_t` conversion state object.

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

If any of these conditions occurs, the invalid parameter exception is invoked as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170) . If execution is allowed to continue, the function returns an error code and sets `errno` as indicated in the table.

The **`wcsrtombs_s`** function converts a string of wide characters pointed to by _`wcstr`_ into multibyte characters stored in the buffer pointed to by _`mbstr`_, using the conversion state contained in _`mbstate`_. The conversion will continue for each character until one of these conditions is met:

*   A null wide character is encountered
    
*   A wide character that can't be converted is encountered
    
*   The number of bytes stored in the _`mbstr`_ buffer equals _`count`_.
    

The destination string is always null-terminated (even if there's an error).

If _`count`_ is the special value [`_TRUNCATE`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/truncate?view=msvc-170), then **`wcsrtombs_s`** converts as much of the string as will fit into the destination buffer, while still leaving room for a null terminator.

If **`wcsrtombs_s`** successfully converts the source string, it puts the size in bytes of the converted string, including the null terminator, into `*pReturnValue` (provided _`pReturnValue`_ isn't `NULL`). The size is calculated even if the _`mbstr`_ argument is `NULL`; it provides a way to determine the required buffer size. If _`mbstr`_ is `NULL`, _`count`_ is ignored.

If **`wcsrtombs_s`** encounters a wide character it can't convert to a multibyte character, it puts -1 in _\*`pReturnValue`_, sets the destination buffer to an empty string, sets `errno` to `EILSEQ`, and returns `EILSEQ`.

If the sequences pointed to by _`wcstr`_ and _`mbstr`_ overlap, the behavior of **`wcsrtombs_s`** is undefined. **`wcsrtombs_s`** is affected by the LC\_TYPE category of the current locale.

Important

Ensure that _`wcstr`_ and _`mbstr`_ do not overlap, and that _`count`_ correctly reflects the number of wide characters to convert.

The **`wcsrtombs_s`** function differs from [`wcstombs_s`, `_wcstombs_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-s-wcstombs-s-l?view=msvc-170) by its restartability. The conversion state is stored in _`mbstate`_ for subsequent calls to the same or other restartable functions. Results are undefined when mixing the use of restartable and nonrestartable functions. For example, an application would use `wcsrlen` rather than `wcslen`, if a subsequent call to **`wcsrtombs_s`** were used instead of `wcstombs_s`.

In C++, using these functions is simplified by template overloads; the overloads can infer buffer length automatically (eliminating the need to specify a size argument) and they can automatically replace older, non-secure functions with their newer, secure counterparts. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Exceptions

The **`wcsrtombs_s`** function is multithread safe as long as no function in the current thread calls `setlocale` while this function is executing and the _`mbstate`_ is null.

## Example

```
// crt_wcsrtombs_s.cpp
//
// This code example converts a wide
// character string into a multibyte
// character string.
//

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
    errno_t         err;
    mbstate_t       mbstate;

    // Reset to initial shift state
    ::memset((void*)&mbstate, 0, sizeof(mbstate));

    err = wcsrtombs_s(&countConverted, mbString, MB_BUFFER_SIZE,
                      &wcsIndirectString, MB_BUFFER_SIZE, &mbstate);
    if (err == EILSEQ)
    {
        printf( "An encoding error was detected in the string.\n" );
    }
    else
    {
        printf( "The string was successfully converted.\n" );
    }
}
```

```
The string was successfully converted.
```

## Requirements

Routine

Required header

**`wcsrtombs_s`**

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