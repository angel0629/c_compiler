---
title: "mbrtoc16, mbrtoc323"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbrtoc16-mbrtoc323?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Translates the first UTF-8 multibyte character in a string into the equivalent UTF-16 or UTF-32 character.

## Syntax

```
size_t mbrtoc16(
   char16_t* destination,
   const char* source,
   size_t max_bytes,
   mbstate_t* state
);

size_t mbrtoc32(
   char32_t* destination,
   const char* source,
   size_t max_bytes,
   mbstate_t* state
);
```

### Parameters

_`destination`_  
Pointer to the **`char16_t`** or **`char32_t`** equivalent of the UTF-8 multibyte character to convert. If null, the function doesn't store a value.

_`source`_  
Pointer to the UTF-8 multibyte character string to convert.

_`max_bytes`_  
The maximum number of bytes in _`source`_ to examine for a character to convert. This argument should be a value between one and the number of bytes, including any null terminator, remaining in _`source`_.

_`state`_  
Pointer to a `mbstate_t` conversion state object used to interpret the UTF-8 multibyte string to one or more output characters.

## Return value

On success, returns the value of the first of these conditions that applies, given the current _`state`_ value:

Value

Condition

0

The next _`max_bytes`_ or fewer characters converted from _`source`_ correspond to the null wide character, which is the value stored if _`destination`_ isn't null.

_`state`_ contains the initial shift state.

Between 1 and _`max_bytes`_, inclusive

The value returned is the number of bytes of _`source`_ that complete a valid multibyte character. The converted wide character is stored if _`destination`_ isn't null.

\-3

The next wide character resulting from a previous call to the function has been stored in _`destination`_ if _`destination`_ isn't null. No bytes from _`source`_ are consumed by this call to the function.

When _`source`_ points to a UTF-8 multibyte character that requires more than one wide character to represent (for example, a surrogate pair), then the _`state`_ value is updated so that the next function call writes out the extra character.

\-2

The next _`max_bytes`_ bytes represent an incomplete, but potentially valid, UTF-8 multibyte character. No value is stored in _`destination`_. This result can occur if _`max_bytes`_ is zero.

\-1

An encoding error has occurred. The next _`max_bytes`_ or fewer bytes don't contribute to a complete and valid UTF-8 multibyte character. No value is stored in _`destination`_.

`EILSEQ` is stored in `errno` and the conversion state value _`state`_ is unspecified.

The **`mbrtoc16`** function reads up to _`max_bytes`_ bytes from _`source`_ to find the first complete, valid UTF-8 multibyte character, and then stores the equivalent UTF-16 character in _`destination`_. If the character requires more than one UTF-16 output character, such as a surrogate pair, then the _`state`_ value is set to store the next UTF-16 character in _`destination`_ on the next call to **`mbrtoc16`**. The **`mbrtoc32`** function is identical, but output is stored as a UTF-32 character.

If _`source`_ is null, these functions return the equivalent of a call made using arguments of `NULL` for _`destination`_, `""` (an empty, null-terminated string) for _`source`_, and 1 for _`max_bytes`_. The passed values of _`destination`_ and _`max_bytes`_ are ignored.

If _`source`_ isn't null, the function starts at the beginning of the string and inspects up to _`max_bytes`_ bytes to determine the number of bytes required to complete the next UTF-8 multibyte character, including any shift sequences. If the examined bytes contain a valid and complete UTF-8 multibyte character, the function converts the character into the equivalent 16-bit or 32-bit wide character or characters. If _`destination`_ isn't null, the function stores the first (and possibly only) result character in destination. If extra output characters are required, a value is set in _`state`_, so that subsequent calls to the function output the extra characters and return the value -3. If no more output characters are required, then _`state`_ is set to the initial shift state.

To convert non-UTF-8 multibyte characters to UTF-16 LE characters, use the [`mbrtowc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbrtowc?view=msvc-170), [mbtowc, or \_mbtowc\_l](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbtowc-mbtowc-l?view=msvc-170) functions.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

C header

C++ header

**`mbrtoc16`**, **`mbrtoc32`**

<uchar.h>

<cuchar>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`c16rtomb`, `c32rtomb`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/c16rtomb-c32rtomb1?view=msvc-170)  
[`mbrtowc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbrtowc?view=msvc-170)  
[`mbsrtowcs`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsrtowcs?view=msvc-170)  
[`mbsrtowcs_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsrtowcs-s?view=msvc-170)