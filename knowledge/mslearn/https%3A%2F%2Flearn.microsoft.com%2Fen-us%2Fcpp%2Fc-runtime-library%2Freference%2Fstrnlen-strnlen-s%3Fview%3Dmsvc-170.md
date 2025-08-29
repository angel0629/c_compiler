---
title: "strnlen, strnlen_s, wcsnlen, wcsnlen_s, _mbsnlen, _mbsnlen_l, _mbstrnlen, _mbstrnlen_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnlen-strnlen-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets the length of a string by using the current locale or one that has been passed in. These functions are more secure versions of [`strlen`, `wcslen`, `_mbslen`, `_mbslen_l`, `_mbstrlen`, `_mbstrlen_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strlen-wcslen-mbslen-mbslen-l-mbstrlen-mbstrlen-l?view=msvc-170).

## Syntax

```
size_t strnlen(
   const char *str,
   size_t numberOfElements
);
size_t strnlen_s(
   const char *str,
   size_t numberOfElements
);
size_t wcsnlen(
   const wchar_t *str,
   size_t numberOfElements
);
size_t wcsnlen_s(
   const wchar_t *str,
   size_t numberOfElements
);
size_t _mbsnlen(
   const unsigned char *str,
   size_t numberOfElements
);
size_t _mbsnlen_l(
   const unsigned char *str,
   size_t numberOfElements,
   _locale_t locale
);
size_t _mbstrnlen(
   const char *str,
   size_t numberOfElements
);
size_t _mbstrnlen_l(
   const char *str,
   size_t numberOfElements,
   _locale_t locale
);
```

### Parameters

_`str`_  
Null-terminated string.

_`numberOfElements`_  
The size of the string buffer.

_`locale`_  
Locale to use.

## Return value

These functions return the number of characters in the string, not including the terminating null character. If there's no null terminator within the first _`numberOfElements`_ bytes of the string (or wide characters for **`wcsnlen`**), then _`numberOfElements`_ is returned to indicate the error condition; null-terminated strings have lengths that are strictly less than _`numberOfElements`_.

**`_mbstrnlen`** and **`_mbstrnlen_l`** return -1 if the string contains an invalid multibyte character.

Note

**`strnlen`** is not a replacement for **`strlen`**; **`strnlen`** is intended to be used only to calculate the size of incoming untrusted data in a buffer of known size—for example, a network packet. **`strnlen`** calculates the length but doesn't walk past the end of the buffer if the string is unterminated. For other situations, use **`strlen`**. (The same applies to **`wcsnlen`**, **`_mbsnlen`**, and **`_mbstrnlen`**.)

Each of these functions returns the number of characters in _`str`_, not including the terminating null character. However, **`strnlen`** and **`strnlen_s`** interpret the string as a single-byte character string and therefore, the return value is always equal to the number of bytes, even if the string contains multibyte characters. **`wcsnlen`** and **`wcsnlen_s`** are wide-character versions of **`strnlen`** and **`strnlen_s`** respectively; the arguments for **`wcsnlen`** and **`wcsnlen_s`** are wide-character strings and the count of characters are in wide-character units. Otherwise, **`wcsnlen`** and **`strnlen`** behave identically, as do **`strnlen_s`** and **`wcsnlen_s`**.

**`strnlen`**, **`wcsnlen`**, and **`_mbsnlen`** don't validate their parameters. If _`str`_ is `NULL`, an access violation occurs.

**`strnlen_s`** and **`wcsnlen_s`** validate their parameters. If _`str`_ is `NULL`, the functions return 0.

**`_mbstrnlen`** also validates its parameters. If _`str`_ is `NULL`, or if _`numberOfElements`_ is greater than `INT_MAX`, **`_mbstrnlen`** generates an invalid parameter exception, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, **`_mbstrnlen`** sets `errno` to `EINVAL` and returns -1.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsnlen`

**`strnlen`**

**`strnlen`**

**`wcsnlen`**

`_tcscnlen`

**`strnlen`**

**`_mbsnlen`**

**`wcsnlen`**

`_tcscnlen_l`

**`strnlen`**

**`_mbsnlen_l`**

**`wcsnlen`**

**`_mbsnlen`** and **`_mbstrnlen`** return the number of multibyte characters in a multibyte-character string. **`_mbsnlen`** recognizes multibyte-character sequences according to the multibyte code page that's currently in use or according to the locale that's passed in; it doesn't test for multibyte-character validity. **`_mbstrnlen`** tests for multibyte-character validity and recognizes multibyte-character sequences. If the string that's passed to **`_mbstrnlen`** contains an invalid multibyte character, `errno` is set to `EILSEQ`.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of these functions are identical, except that the ones that don't have the **`_l`** suffix use the current locale for this locale-dependent behavior and the versions that have the **`_l`** suffix instead use the locale parameter that's passed in. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

## Requirements

Routine

Required header

**`strnlen`**, **`strnlen_s`**

`<string.h>`

**`wcsnlen`**, **`wcsnlen_s`**

`<string.h>` or `<wchar.h>`

**`_mbsnlen`**, **`_mbsnlen_l`**

`<mbstring.h>`

**`_mbstrnlen`**, **`_mbstrnlen_l`**

`<stdlib.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_strnlen.c

#include <string.h>

int main()
{
   // str1 is 82 characters long. str2 is 159 characters long

   char* str1 = "The length of a string is the number of characters\n"
               "excluding the terminating null.";
   char* str2 = "strnlen takes a maximum size. If the string is longer\n"
                "than the maximum size specified, the maximum size is\n"
                "returned rather than the actual size of the string.";
   size_t len;
   size_t maxsize = 100;

   len = strnlen(str1, maxsize);
   printf("%s\n Length: %d \n\n", str1, len);

   len = strnlen(str2, maxsize);
   printf("%s\n Length: %d \n", str2, len);
}
```

```
The length of a string is the number of characters
excluding the terminating null.
Length: 82

strnlen takes a maximum size. If the string is longer
than the maximum size specified, the maximum size is
returned rather than the actual size of the string.
Length: 100
```

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170)  
[`strncat`, `_strncat_l`, `wcsncat`, `_wcsncat_l`, `_mbsncat`, `_mbsncat_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-strncat-l-wcsncat-wcsncat-l-mbsncat-mbsncat-l?view=msvc-170)  
[`strncmp`, `wcsncmp`, `_mbsncmp`, `_mbsncmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncmp-wcsncmp-mbsncmp-mbsncmp-l?view=msvc-170)  
[`strcoll` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/strcoll-functions?view=msvc-170)  
[`strncpy_s`, `_strncpy_s_l`, `wcsncpy_s`, `_wcsncpy_s_l`, `_mbsncpy_s`, `_mbsncpy_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-s-strncpy-s-l-wcsncpy-s-wcsncpy-s-l-mbsncpy-s-mbsncpy-s-l?view=msvc-170)  
[`strrchr`, `wcsrchr`, `_mbsrchr`, `_mbsrchr_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strrchr-wcsrchr-mbsrchr-mbsrchr-l?view=msvc-170)  
[`_strset`, `_strset_l`, `_wcsset`, `_wcsset_l`, `_mbsset`, `_mbsset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strset-strset-l-wcsset-wcsset-l-mbsset-mbsset-l?view=msvc-170)  
[`strspn`, `wcsspn`, `_mbsspn`, `_mbsspn_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strspn-wcsspn-mbsspn-mbsspn-l?view=msvc-170)