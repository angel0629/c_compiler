---
title: "mbrlen"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbrlen?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determine the number of bytes that are required to complete a multibyte character in the current locale, with the capability of restarting in the middle of a multibyte character.

## Syntax

```
size_t mbrlen(
   const char * str,
   size_t count,
   mbstate_t * mbstate
);
```

### Parameters

_`str`_  
Pointer to the next byte to inspect in a multibyte character string.

_`count`_  
The maximum number of bytes to inspect.

_`mbstate`_  
Pointer to the current shift state of the initial byte of _`str`_.

## Return value

One of the following values:

Value

Description

0

The next _`count`_ or fewer bytes complete the multibyte character that represents the wide null character.

1 to _`count`_, inclusive

The next _`count`_ or fewer bytes complete a valid multibyte character. The value returned is the number of bytes that complete the multibyte character.

(size\_t)(-2)

The next _`count`_ bytes contribute to an incomplete but potentially valid multibyte character and all _`count`_ bytes have been processed.

(size\_t)(-1)

An encoding error occurred. The next _`count`_ or fewer bytes don't contribute to a complete and valid multibyte character. In this case, `errno` is set to EILSEQ and the conversion state in _`mbstate`_ is unspecified.

The **`mbrlen`** function inspects at most _`count`_ bytes starting with the byte pointed to by _`str`_ to determine the number of bytes that are required to complete the next multibyte character, including any shift sequences. It's equivalent to the call `mbrtowc(NULL, str, count, &mbstate)` where _`mbstate`_ is either a user-provided `mbstate_t` object, or a static internal object provided by the library.

The **`mbrlen`** function saves and uses the shift state of an incomplete multibyte character in the _`mbstate`_ parameter. It's why \*\*`mbrlen`\*\*can restart in the middle of a multibyte character, if needed, and examine at most _`count`_ bytes. If _`mbstate`_ is a null pointer, **`mbrlen`** uses an internal, static `mbstate_t` object to store the shift state. Because the internal `mbstate_t` object isn't thread-safe, we recommend that you always allocate and pass your own _`mbstate`_ parameter.

The **`mbrlen`** function differs from [`_mbclen`, `mblen`, `_mblen_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbclen-mblen-mblen-l?view=msvc-170) by its restartability. The shift state is stored in _`mbstate`_ for subsequent calls to the same or other restartable functions. Results are undefined when mixing the use of restartable and nonrestartable functions. For example, an application should use `wcsrlen` instead of `wcslen` if a subsequent call to `wcsrtombs` is used instead of `wcstombs`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

not applicable

not applicable

**`mbrlen`**

not applicable

## Requirements

Routine

Required header

**`mbrlen`**

<wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

This example shows how the interpretation of multibyte characters depends on the current code page, and demonstrates the resuming capability of **`mbrlen`**.

```
// crt_mbrlen.c
// Compile by using: cl crt_mbrlen.c
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <locale.h>
#include <wchar.h>

size_t Example(const char * pStr)
{
    size_t      charLen = 0;
    size_t      charCount = 0;
    mbstate_t   mbState = {0};

    while ((charLen = mbrlen(pStr++, 1, &mbState)) != 0 &&
            charLen != (size_t)-1)
    {
        if (charLen != (size_t)-2) // if complete mbcs char,
        {
            charCount++;
        }
    }
    return (charCount);
}

int main( void )
{
    int         cp;
    size_t      charCount = 0;
    const char  *pSample =
        "\x82\xD0\x82\xE7\x82\xAA\x82\xC8: Shift-jis hiragana.";

    cp = _getmbcp();
    charCount = Example(pSample);
    printf("\nCode page: %d\n%s\nCharacter count: %d\n",
        cp, pSample, charCount);

    setlocale(LC_ALL, "ja-JP"); // Set Japanese locale
    _setmbcp(932); // and Japanese multibyte code page
    cp = _getmbcp();
    charCount = Example(pSample);
    printf("\nCode page: %d\n%s\nCharacter count: %d\n",
        cp, pSample, charCount);
}
```

```

Code page: 0
é╨éτé¬é╚: Shift-jis hiragana.
Character count: 29

Code page: 932
????: Shift-jis hiragana.
Character count: 25
```

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)