---
title: "strcpy_s, wcscpy_s, _mbscpy_s, _mbscpy_s_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcpy-s-wcscpy-s-mbscpy-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Copies a string. These versions of [`strcpy`, `wcscpy`, `_mbscpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcpy-wcscpy-mbscpy?view=msvc-170) have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t strcpy_s(
   char *dest,
   rsize_t dest_size,
   const char *src
);
errno_t wcscpy_s(
   wchar_t *dest,
   rsize_t dest_size,
   const wchar_t *src
);
errno_t _mbscpy_s(
   unsigned char *dest,
   rsize_t dest_size,
   const unsigned char *src
);
errno_t _mbscpy_s_l(
   unsigned char *dest,
   rsize_t dest_size,
   const unsigned char *src,
   _locale_t locale
);
```

```
// Template functions are C++ only:
template <size_t size>
errno_t strcpy_s(
   char (&dest)[size],
   const char *src
); // C++ only
template <size_t size>
errno_t wcscpy_s(
   wchar_t (&dest)[size],
   const wchar_t *src
); // C++ only
template <size_t size>
errno_t _mbscpy_s(
   unsigned char (&dest)[size],
   const unsigned char *src
); // C++ only
template <size_t size>
errno_t _mbscpy_s_l(
   unsigned char (&dest)[size],
   const unsigned char *src,
   _locale_t locale
); // C++ only
```

### Parameters

_`dest`_  
Location of the destination string buffer.

_`dest_size`_  
Size of the destination string buffer in **`char`** units for narrow and multi-byte functions, and **`wchar_t`** units for wide functions. This value must be greater than zero and not greater than `RSIZE_MAX`. Ensure that this size accounts for the terminating `NULL` following the string.

_`src`_  
Null-terminated source string buffer.

_`locale`_  
Locale to use.

## Return value

Zero if successful; otherwise, an error.

### Error conditions

_`dest`_

_`dest_size`_

_`src`_

Return value

Contents of _`dest`_

`NULL`

any

any

`EINVAL`

not modified

any

any

`NULL`

`EINVAL`

_`dest[0]`_ set to 0

any

0, or too small

any

`ERANGE`

_`dest[0]`_ set to 0

The **`strcpy_s`** function copies the contents in the address of _`src`_, including the terminating null character, to the location that's specified by _`dest`_. The destination string must be large enough to hold the source string and its terminating null character. The behavior of **`strcpy_s`** is undefined if the source and destination strings overlap.

**`wcscpy_s`** is the wide-character version of **`strcpy_s`**, and **`_mbscpy_s`** is the multibyte-character version. The arguments of **`wcscpy_s`** are wide-character strings. The arguments of **`_mbscpy_s`** and **`_mbscpy_s_l`** are multibyte-character strings. These functions behave identically otherwise. **`_mbscpy_s_l`** is identical to **`_mbscpy_s`** except that it uses the locale parameter passed in instead of the current locale. For more information, see [`locale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

If _`dest`_ or _`src`_ is a null pointer, or if the destination string size _`dest_size`_ is too small, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return `EINVAL` and set `errno` to `EINVAL` when _`dest`_ or _`src`_ is a null pointer, and they return `ERANGE` and set `errno` to `ERANGE` when the destination string is too small.

Upon successful execution, the destination string is always null-terminated.

In C++, use of these functions is simplified by template overloads that can infer buffer length automatically, so that you don't have to specify a size argument. And, they can automatically replace older, less-secure functions with newer, more secure counterparts. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

The debug library versions of these functions first fill the buffer with 0xFE. To disable this behavior, use [`_CrtSetDebugFillThreshold`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdebugfillthreshold?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_tcscpy_s`**

**`strcpy_s`**

**`_mbscpy_s`**

**`wcscpy_s`**

## Requirements

Routine

Required header

**`strcpy_s`**

`<string.h>`

**`wcscpy_s`**

`<string.h>` or `<wchar.h>`

**`_mbscpy_s`**

`<mbstring.h>`

These functions are Microsoft-specific. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

Unlike production quality code, this sample calls the secure string functions without checking for errors:

```
// crt_strcpy_s.c
// Compile by using: cl /W4 crt_strcpy_s.c
// This program uses strcpy_s and strcat_s
// to build a phrase.

#include <string.h>     // for strcpy_s, strcat_s
#include <stdlib.h>     // for _countof
#include <stdio.h>      // for printf
#include <errno.h>      // for return values

int main(void)
{
    char stringBuffer[80];

    strcpy_s(stringBuffer, _countof(stringBuffer), "Hello world from ");
    strcat_s(stringBuffer, _countof(stringBuffer), "strcpy_s ");
    strcat_s(stringBuffer, _countof(stringBuffer), "and ");
    strcat_s(stringBuffer, _countof(stringBuffer), "strcat_s!");

    printf("stringBuffer = %s\n", stringBuffer);
}
```

```
stringBuffer = Hello world from strcpy_s and strcat_s!
```

When you're building C++ code, the template versions may be easier to use.

```
// crt_wcscpy_s.cpp
// Compile by using: cl /EHsc /W4 crt_wcscpy_s.cpp
// This program uses wcscpy_s and wcscat_s
// to build a phrase.

#include <cstring>  // for wcscpy_s, wcscat_s
#include <cstdlib>  // for _countof
#include <iostream> // for cout, includes <cstdlib>, <cstring>
#include <errno.h>  // for return values

int main(void)
{
    wchar_t stringBuffer[80];
    // using template versions of wcscpy_s and wcscat_s:
    wcscpy_s(stringBuffer, L"Hello world from ");
    wcscat_s(stringBuffer, L"wcscpy_s ");
    wcscat_s(stringBuffer, L"and ");
    // of course we can supply the size explicitly if we want to:
    wcscat_s(stringBuffer, _countof(stringBuffer), L"wcscat_s!");

    std::wcout << L"stringBuffer = " << stringBuffer << std::endl;
}
```

```
stringBuffer = Hello world from wcscpy_s and wcscat_s!
```

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`strcat`, `wcscat`, `_mbscat`, `_mbscat_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcat-wcscat-mbscat?view=msvc-170)  
[`strcmp`, `wcscmp`, `_mbscmp`, `_mbscmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcmp-wcscmp-mbscmp?view=msvc-170)  
[`strncat_s`, `_strncat_s_l`, `wcsncat_s`, `_wcsncat_s_l`, `_mbsncat_s`, `_mbsncat_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-s-strncat-s-l-wcsncat-s-wcsncat-s-l-mbsncat-s-mbsncat-s-l?view=msvc-170)  
[`strncmp`, `wcsncmp`, `_mbsncmp`, `_mbsncmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncmp-wcsncmp-mbsncmp-mbsncmp-l?view=msvc-170)  
[`strncpy_s`, `_strncpy_s_l`, `wcsncpy_s`, `_wcsncpy_s_l`, `_mbsncpy_s`, `_mbsncpy_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-s-strncpy-s-l-wcsncpy-s-wcsncpy-s-l-mbsncpy-s-mbsncpy-s-l?view=msvc-170)  
[`_strnicmp`, `_wcsnicmp`, `_mbsnicmp`, `_strnicmp_l`, `_wcsnicmp_l`, `_mbsnicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnicmp-wcsnicmp-mbsnicmp-strnicmp-l-wcsnicmp-l-mbsnicmp-l?view=msvc-170)  
[`strrchr`, `wcsrchr`, `_mbsrchr`, `_mbsrchr_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strrchr-wcsrchr-mbsrchr-mbsrchr-l?view=msvc-170)  
[`strspn`, `wcsspn`, `_mbsspn`, `_mbsspn_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strspn-wcsspn-mbsspn-mbsspn-l?view=msvc-170)