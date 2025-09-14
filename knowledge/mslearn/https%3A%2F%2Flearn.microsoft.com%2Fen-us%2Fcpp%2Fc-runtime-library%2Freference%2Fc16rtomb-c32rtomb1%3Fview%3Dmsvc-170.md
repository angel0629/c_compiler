---
title: "c16rtomb, c32rtomb"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/c16rtomb-c32rtomb1?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Convert a UTF-16 or UTF-32 wide character into a UTF-8 multibyte character.

## Syntax

```
size_t c16rtomb(
    char *mbchar,
    char16_t wchar,
    mbstate_t *state
);
size_t c32rtomb(
    char *mbchar,
    char32_t wchar,
    mbstate_t *state
);
```

### Parameters

_`mbchar`_  
Pointer to an array to store the converted UTF-8 multibyte character.

_`wchar`_  
A wide character to convert.

_`state`_  
A pointer to an `mbstate_t` object.

## Return value

The number of bytes stored in array object _`mbchar`_, including any shift sequences. If _`wchar`_ isn't a valid wide character, the value (`size_t`)(-1) is returned, `errno` is set to `EILSEQ`, and the value of _`state`_ is unspecified.

The **`c16rtomb`** function converts the UTF-16 LE character _`wchar`_ to the equivalent UTF-8 multibyte narrow character sequence. If _`mbchar`_ isn't a null pointer, the function stores the converted sequence in the array object pointed to by _`mbchar`_. Up to `MB_CUR_MAX` bytes are stored in _`mbchar`_, and _`state`_ is set to the resulting multibyte shift state.

If _`wchar`_ is a null wide character, a sequence required to restore the initial shift state is stored, if needed, followed by the null character. _`state`_ is set to the initial conversion state. The **`c32rtomb`** function is identical, but converts a UTF-32 character.

If _`mbchar`_ is a null pointer, the behavior is equivalent to a call to the function that substitutes an internal buffer for _`mbchar`_ and a wide null character for _`wchar`_.

The _`state`_ conversion state object allows you to make subsequent calls to this function and other restartable functions that maintain the shift state of the multibyte output characters. Results are undefined when you mix the use of restartable and non-restartable functions.

To convert UTF-16 characters into non-UTF-8 multibyte characters, use the [`wcstombs`, `_wcstombs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-wcstombs-l?view=msvc-170), [wcstombs\_s, or \_wcstombs\_s\_l](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-s-wcstombs-s-l?view=msvc-170) functions.

## Requirements

Routine

Required header

**`c16rtomb`**, **`c32rtomb`**

C, C++: <uchar.h>

For compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`mbrtoc16`, `mbrtoc32`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbrtoc16-mbrtoc323?view=msvc-170)  
[`wcrtomb`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcrtomb?view=msvc-170)  
[`wcrtomb_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcrtomb-s?view=msvc-170)