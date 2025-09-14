---
title: "mbsrtowcs_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsrtowcs-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Convert a multibyte character string in the current locale to its wide character string representation. A version of [`mbsrtowcs`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsrtowcs?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t mbsrtowcs_s(
   size_t * pReturnValue,
   wchar_t * wcstr,
   size_t sizeInWords,
   const char ** mbstr,
   size_t count,
   mbstate_t * mbstate
);
template <size_t size>
errno_t mbsrtowcs_s(
   size_t * pReturnValue,
   wchar_t (&wcstr)[size],
   const char ** mbstr,
   size_t count,
   mbstate_t * mbstate
); // C++ only
```

### Parameters

_`pReturnValue`_  
The number of characters converted.

_`wcstr`_  
Address of buffer to store the resulting converted wide character string.

_`sizeInWords`_  
The size of _`wcstr`_ in words (wide characters).

_`mbstr`_  
Indirect pointer to the location of the multibyte character string to be converted.

_`count`_  
The maximum number of wide characters to store in the _`wcstr`_ buffer, not including the terminating null, or [`_TRUNCATE`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/truncate?view=msvc-170).

_`mbstate`_  
A pointer to an `mbstate_t` conversion state object. If this value is a null pointer, a static internal conversion state object is used. Because the internal `mbstate_t` object isn't thread-safe, we recommend that you always pass your own _`mbstate`_ parameter.

## Return value

Zero if conversion is successful, or an error code on failure.

Error condition

Return value and `errno`

_`wcstr`_ is a null pointer and _`sizeInWords`_ > 0

`EINVAL`

_`mbstr`_ is a null pointer

`EINVAL`

The string indirectly pointed to by _`mbstr`_ contains a multibyte sequence that isn't valid for the current locale.

`EILSEQ`

The destination buffer is too small to contain the converted string (unless _`count`_ is `_TRUNCATE`; for more information, see Remarks)

`ERANGE`

If any one of these conditions occurs, the invalid parameter exception is invoked as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170) . If execution is allowed to continue, the function returns an error code and sets `errno` as indicated in the table.

The **`mbsrtowcs_s`** function converts a string of multibyte characters indirectly pointed to by _`mbstr`_ into wide characters stored in the buffer pointed to by _`wcstr`_, by using the conversion state contained in _`mbstate`_. The conversion will continue for each character until one of these conditions is met:

*   A multibyte null character is encountered
    
*   An invalid multibyte character is encountered
    
*   The number of wide characters stored in the _`wcstr`_ buffer equals _`count`_.
    

The destination string _`wcstr`_ is always null-terminated, even when there's an error, unless _`wcstr`_ is a null pointer.

If _`count`_ is the special value [`_TRUNCATE`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/truncate?view=msvc-170), **`mbsrtowcs_s`** converts as much of the string as will fit into the destination buffer, while still leaving room for a null terminator.

If **`mbsrtowcs_s`** successfully converts the source string, it puts the size in wide characters of the converted string and the null terminator into `*pReturnValue`, provided _`pReturnValue`_ isn't a null pointer. The size is calculated even if the _`wcstr`_ argument is a null pointer, which lets you determine the required buffer size. If _`wcstr`_ is a null pointer, _`count`_ is ignored.

If _`wcstr`_ isn't a null pointer, the pointer object pointed to by _`mbstr`_ is assigned a null pointer if conversion stopped because a terminating null character was reached. Otherwise, it's assigned the address just past the last multibyte character converted, if any. It allows a subsequent function call to restart conversion where this call stopped.

If _`mbstate`_ is a null pointer, the library internal `mbstate_t` conversion state static object is used. Because this internal static object isn't thread-safe, we recommend that you pass your own _`mbstate`_ value.

If **`mbsrtowcs_s`** encounters a multibyte character that isn't valid in the current locale, it puts -1 in `*pReturnValue`, sets the destination buffer _`wcstr`_ to an empty string, sets `errno` to `EILSEQ`, and returns `EILSEQ`.

If the sequences pointed to by _`mbstr`_ and _`wcstr`_ overlap, the behavior of **`mbsrtowcs_s`** is undefined. **`mbsrtowcs_s`** is affected by the `LC_TYPE` category of the current locale.

Important

Ensure that _`wcstr`_ and _`mbstr`_ do not overlap, and that _`count`_ correctly reflects the number of multibyte characters to convert.

The **`mbsrtowcs_s`** function differs from [`mbstowcs_s`, `_mbstowcs_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbstowcs-s-mbstowcs-s-l?view=msvc-170) by its restartability. The conversion state is stored in _`mbstate`_ for subsequent calls to the same or other restartable functions. Results are undefined when mixing the use of restartable and nonrestartable functions. For example, an application should use `mbsrlen` instead of `mbslen`, if a subsequent call to **`mbsrtowcs_s`** is used instead of **`mbstowcs_s`**.

In C++, using this function is simplified by template overloads; the overloads can infer buffer length automatically (eliminating the requirement to specify a size argument) and they can automatically replace older, non-secure functions by using the newer, secure counterparts. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Exceptions

The **`mbsrtowcs_s`** function is multithread safe if no function in the current thread calls `setlocale` as long as this function is executing and the _`mbstate`_ argument isn't a null pointer.

## Requirements

Routine

Required header

**`mbsrtowcs_s`**

<wchar.h>

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`mbrtowc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbrtowc?view=msvc-170)  
[`mbtowc`, `_mbtowc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbtowc-mbtowc-l?view=msvc-170)  
[`mbstowcs_s`, `_mbstowcs_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbstowcs-s-mbstowcs-s-l?view=msvc-170)  
[`mbsinit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsinit?view=msvc-170)