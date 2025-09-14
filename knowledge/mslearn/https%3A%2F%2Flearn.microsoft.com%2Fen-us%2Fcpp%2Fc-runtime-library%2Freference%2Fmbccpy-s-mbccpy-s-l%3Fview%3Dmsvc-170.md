---
title: "_mbccpy_s, _mbccpy_s_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbccpy-s-mbccpy-s-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Copies one multibyte character from a string to another string. These versions of [`_mbccpy`, `_mbccpy_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbccpy-mbccpy-l?view=msvc-170) have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t _mbccpy_s(
   unsigned char *dest,
   size_t buffSizeInBytes,
   int * pCopied,
   const unsigned char *src
);
errno_t _mbccpy_s_l(
   unsigned char *dest,
   size_t buffSizeInBytes,
   int * pCopied,
   const unsigned char *src,
   _locale_t locale
);
template <size_t size>
errno_t _mbccpy_s(
   unsigned char (&dest)[size],
   int * pCopied,
   const unsigned char *src
); // C++ only
template <size_t size>
errno_t _mbccpy_s_l(
   unsigned char (&dest)[size],
   int * pCopied,
   const unsigned char *src,
   _locale_t locale
); // C++ only
```

### Parameters

_`dest`_  
Copy destination.

_`buffSizeInBytes`_  
Size of the destination buffer.

_`pCopied`_  
Filled with the number of bytes copied (1 or 2 if successful). Pass `NULL` if you don't care about the number.

_`src`_  
Multibyte character to copy.

_`locale`_  
Locale to use.

## Return value

Zero if successful; an error code on failure. If _`src`_ or _`dest`_ is `NULL`, or if more than `buffSizeinBytes` bytes would be copied to _`dest`_, then the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the functions return `EINVAL`, and `errno` is set to `EINVAL`.

The **`_mbccpy_s`** function copies one multibyte character from _`src`_ to _`dest`_. If _`src`_ doesn't point to the lead byte of a multibyte character as determined by an implicit call to [`_ismbblead`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbblead-ismbblead-l?view=msvc-170), then the single byte that _`src`_ points to is copied. If _`src`_ points to a lead byte, but the following byte is 0 and thus invalid, then 0 is copied to _`dest`_, `errno` is set to `EILSEQ`, and the function returns `EILSEQ`.

**`_mbccpy_s`** doesn't append a null terminator; however, if _`src`_ points to a null character, then that null is copied to _`dest`_ (as a regular single-byte copy).

The value in _`pCopied`_ is filled with the number of bytes copied. Possible values are 1 and 2 if the operation is successful. If `NULL` is passed in, this parameter is ignored.

_`src`_

copied to _`dest`_

_`pCopied`_

Return value

non-lead-byte

non-lead-byte

1

0

0

0

1

0

lead-byte followed by non-0

lead-byte followed by non-0

2

0

lead-byte followed by 0

0

1

`EILSEQ`

The second row is just a special case of the first row. The table assumes _`buffSizeInBytes`_ >= _`pCopied`_.

**`_mbccpy_s`** uses the current locale for any locale-dependent behavior. **`_mbccpy_s_l`** is identical to **`_mbccpy_s`** except that **`_mbccpy_s_l`** uses the locale passed in for any locale-dependent behavior.

In C++, using these functions is simplified by template overloads; the overloads can infer buffer length automatically, eliminating the need to specify a size argument. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tccpy_s`

Maps to macro or inline function.

**`_mbccpy_s`**

Maps to macro or inline function.

## Requirements

Routine

Required header

**`_mbccpy_s`**

<mbstring.h>

**`_mbccpy_s_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`_mbclen`, `mblen`, `_mblen_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbclen-mblen-mblen-l?view=msvc-170)