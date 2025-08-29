---
title: "mbsrtowcs"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsrtowcs?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a multibyte character string in the current locale to a corresponding wide character string, with the capability of restarting in the middle of a multibyte character. A more secure version of this function is available; see [`mbsrtowcs_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsrtowcs-s?view=msvc-170).

## Syntax

```
size_t mbsrtowcs(
   wchar_t *wcstr,
   const char **mbstr,
   sizeof count,
   mbstate_t *mbstate
);
template <size_t size>
size_t mbsrtowcs(
   wchar_t (&wcstr)[size],
   const char **mbstr,
   sizeof count,
   mbstate_t *mbstate
); // C++ only
```

### Parameters

_`wcstr`_  
Address to store the resulting converted wide character string.

_`mbstr`_  
Indirect pointer to the location of the multibyte character string to convert.

_`count`_  
The maximum number of characters (not bytes) to convert and store in _`wcstr`_.

_`mbstate`_  
A pointer to an `mbstate_t` conversion state object. If this value is a null pointer, a static internal conversion state object is used. Because the internal `mbstate_t` object isn't thread-safe, we recommend that you always pass your own _`mbstate`_ parameter.

## Return value

Returns the number of characters successfully converted, not including the terminating null character, if any. Returns (size\_t)(-1) if an error occurred, and sets `errno` to `EILSEQ`.

The **`mbsrtowcs`** function converts a string of multibyte characters indirectly pointed to by _`mbstr`_, into wide characters stored in the buffer pointed to by _`wcstr`_, by using the conversion state contained in _`mbstate`_. The conversion continues for each character until either a terminating null multibyte character is encountered, a multibyte sequence that doesn't correspond to a valid character in the current locale is encountered, or until _`count`_ characters have been converted. If **`mbsrtowcs`** encounters the multibyte null character ('\\0') either before or when _`count`_ occurs, it converts it to a 16-bit terminating null character and stops.

Thus, the wide character string at _`wcstr`_ is null-terminated only if **`mbsrtowcs`** encounters a multibyte null character during conversion. If the sequences pointed to by _`mbstr`_ and _`wcstr`_ overlap, the behavior of **`mbsrtowcs`** is undefined. **`mbsrtowcs`** is affected by the `LC_TYPE` category of the current locale.

The **`mbsrtowcs`** function differs from [`mbstowcs`, `_mbstowcs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbstowcs-mbstowcs-l?view=msvc-170) by its restartability. The conversion state is stored in _`mbstate`_ for subsequent calls to the same or other restartable functions. Results are undefined when mixing the use of restartable and nonrestartable functions. For example, an application should use `mbsrlen` instead of `mbslen`, if a subsequent call to **`mbsrtowcs`** is used instead of `mbstowcs`.

If _`wcstr`_ isn't a null pointer, the pointer object pointed to by _`mbstr`_ is assigned a null pointer if conversion stopped because a terminating null character was reached. Otherwise, it's assigned the address just past the last multibyte character converted, if any. It allows a subsequent function call to restart conversion where this call stopped.

If the _`wcstr`_ argument is a null pointer, the _`count`_ argument is ignored, and **`mbsrtowcs`** returns the required size in wide characters for the destination string. If _`mbstate`_ is a null pointer, the function uses a non-thread-safe static internal `mbstate_t` conversion state object. If the character sequence _`mbstr`_ doesn't have a corresponding multibyte character representation, a -1 is returned, and `errno` is set to `EILSEQ`.

If _`mbstr`_ is a null pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function sets `errno` to `EINVAL` and returns -1.

In C++, this function has a template overload that invokes the newer, secure counterpart of this function. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Exceptions

The **`mbsrtowcs`** function is multithread safe as long as no function in the current thread calls `setlocale` as long as this function is executing and the _`mbstate`_ argument isn't a null pointer.

## Requirements

Routine

Required header

**`mbsrtowcs`**

<wchar.h>

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`mbrtowc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbrtowc?view=msvc-170)  
[`mbtowc`, `_mbtowc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbtowc-mbtowc-l?view=msvc-170)  
[`mbstowcs`, `_mbstowcs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbstowcs-mbstowcs-l?view=msvc-170)  
[`mbsinit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsinit?view=msvc-170)