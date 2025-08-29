---
title: "mbstowcs_s, _mbstowcs_s_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbstowcs-s-mbstowcs-s-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a sequence of multibyte characters to a corresponding sequence of wide characters. Versions of [`mbstowcs`, `_mbstowcs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbstowcs-mbstowcs-l?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t mbstowcs_s(
   size_t *pReturnValue,
   wchar_t *wcstr,
   size_t sizeInWords,
   const char *mbstr,
   size_t count
);
errno_t _mbstowcs_s_l(
   size_t *pReturnValue,
   wchar_t *wcstr,
   size_t sizeInWords,
   const char *mbstr,
   size_t count,
   _locale_t locale
);
template <size_t size>
errno_t mbstowcs_s(
   size_t *pReturnValue,
   wchar_t (&wcstr)[size],
   const char *mbstr,
   size_t count
); // C++ only
template <size_t size>
errno_t _mbstowcs_s_l(
   size_t *pReturnValue,
   wchar_t (&wcstr)[size],
   const char *mbstr,
   size_t count,
   _locale_t locale
); // C++ only
```

### Parameters

_`pReturnValue`_  
The number of characters converted.

_`wcstr`_  
Address of buffer for the resulting converted wide character string.

_`sizeInWords`_  
The size of the _`wcstr`_ buffer in words.

_`mbstr`_  
The address of a sequence of null terminated multibyte characters.

_`count`_  
The maximum number of wide characters to store in the _`wcstr`_ buffer, not including the terminating null, or [`_TRUNCATE`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/truncate?view=msvc-170).

_`locale`_  
The locale to use.

## Return value

Zero if successful, an error code on failure.

Error condition

Return value and `errno`

_`wcstr`_ is `NULL` and _`sizeInWords`_ > 0

`EINVAL`

_`mbstr`_ is `NULL`

`EINVAL`

The destination buffer is too small to contain the converted string (unless _`count`_ is `_TRUNCATE`; see Remarks below)

`ERANGE`

_`wcstr`_ isn't `NULL` and _`sizeInWords`_ == 0

`EINVAL`

If any of these conditions occurs, the invalid parameter exception is invoked as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the function returns an error code and sets `errno` as indicated in the table.

The **`mbstowcs_s`** function converts a string of multibyte characters pointed to by _`mbstr`_ into wide characters stored in the buffer pointed to by _`wcstr`_. The conversion will continue for each character until one of these conditions is met:

*   A multibyte null character is encountered
    
*   An invalid multibyte character is encountered
    
*   The number of wide characters stored in the _`wcstr`_ buffer equals _`count`_.
    

The destination string is always null-terminated (even if there's an error).

If _`count`_ is the special value [`_TRUNCATE`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/truncate?view=msvc-170), then **`mbstowcs_s`** converts as much of the string as will fit into the destination buffer, while still leaving room for a null terminator.

If **`mbstowcs_s`** successfully converts the source string, it puts the size in wide characters of the converted string, including the null terminator, into `*pReturnValue` (provided _`pReturnValue`_ isn't `NULL`). The size is calculated even if the _`wcstr`_ argument is `NULL`, and provides a way to determine the required buffer size. If _`wcstr`_ is `NULL`, _`count`_ is ignored, and _`sizeInWords`_ must be 0.

If **`mbstowcs_s`** encounters an invalid multibyte character, it puts 0 in `*pReturnValue`, sets the destination buffer to an empty string, sets `errno` to `EILSEQ`, and returns `EILSEQ`.

If the sequences pointed to by _`mbstr`_ and _`wcstr`_ overlap, the behavior of **`mbstowcs_s`** is undefined.

Important

Ensure that _`wcstr`_ and _`mbstr`_ do not overlap, and that _`count`_ correctly reflects the number of multibyte characters to convert.

**`mbstowcs_s`** uses the current locale for any locale-dependent behavior; **`_mbstowcs_s_l`** is identical except that it uses the locale passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

In C++, using these functions is simplified by template overloads; the overloads can infer buffer length automatically (eliminating the need to specify a size argument) and they can automatically replace older, non-secure functions with their newer, secure counterparts. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`mbstowcs_s`**

`<stdlib.h>`

**`_mbstowcs_s_l`**

`<stdlib.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`MultiByteToWideChar`](https://learn.microsoft.com/en-us/windows/win32/api/stringapiset/nf-stringapiset-multibytetowidechar)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`_mbclen`, `mblen`, `_mblen_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbclen-mblen-mblen-l?view=msvc-170)  
[`mbtowc`, `_mbtowc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbtowc-mbtowc-l?view=msvc-170)  
[`wcstombs`, `_wcstombs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-wcstombs-l?view=msvc-170)  
[`wctomb`, `_wctomb_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctomb-wctomb-l?view=msvc-170)