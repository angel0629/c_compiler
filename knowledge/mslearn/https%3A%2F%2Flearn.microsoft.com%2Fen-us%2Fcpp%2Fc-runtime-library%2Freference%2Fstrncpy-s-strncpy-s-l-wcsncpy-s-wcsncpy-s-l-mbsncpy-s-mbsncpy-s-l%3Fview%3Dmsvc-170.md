---
title: "strncpy_s, _strncpy_s_l, wcsncpy_s, _wcsncpy_s_l, _mbsncpy_s, _mbsncpy_s_l, _tcsncpy_s, _tcsncpy_s_l, _tcsnccpy_s, _tcsnccpy_s_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-s-strncpy-s-l-wcsncpy-s-wcsncpy-s-l-mbsncpy-s-mbsncpy-s-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Copies characters of one string to another. These versions of [`strncpy`, `_strncpy_l`, `wcsncpy`, `_wcsncpy_l`, `_mbsncpy`, `_mbsncpy_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-strncpy-l-wcsncpy-wcsncpy-l-mbsncpy-mbsncpy-l?view=msvc-170) have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

For `_tcsnccpy_s`, `_tcsnccpy_s_l`, `_tcsnccpy_s`, and `_tcsnccpy_s_l` see [Generic-text function mappings](#generic-text-function-mappings).

## Syntax

```
errno_t strncpy_s(
   char *strDest,
   size_t numberOfElements,
   const char *strSource,
   size_t count
);
errno_t _strncpy_s_l(
   char *strDest,
   size_t numberOfElements,
   const char *strSource,
   size_t count,
   _locale_t locale
);
errno_t wcsncpy_s(
   wchar_t *strDest,
   size_t numberOfElements,
   const wchar_t *strSource,
   size_t count
);
errno_t _wcsncpy_s_l(
   wchar_t *strDest,
   size_t numberOfElements,
   const wchar_t *strSource,
   size_t count,
   _locale_t locale
);
errno_t _mbsncpy_s(
   unsigned char *strDest,
   size_t numberOfElements,
   const unsigned char *strSource,
   size_t count
);
errno_t _mbsncpy_s_l(
   unsigned char *strDest,
   size_t numberOfElements,
   const unsigned char *strSource,
   size_t count,
   _locale_t locale
);
template <size_t size>
errno_t strncpy_s(
   char (&strDest)[size],
   const char *strSource,
   size_t count
); // C++ only
template <size_t size>
errno_t _strncpy_s_l(
   char (&strDest)[size],
   const char *strSource,
   size_t count,
   _locale_t locale
); // C++ only
template <size_t size>
errno_t wcsncpy_s(
   wchar_t (&strDest)[size],
   const wchar_t *strSource,
   size_t count
); // C++ only
template <size_t size>
errno_t _wcsncpy_s_l(
   wchar_t (&strDest)[size],
   const wchar_t *strSource,
   size_t count,
   _locale_t locale
); // C++ only
template <size_t size>
errno_t _mbsncpy_s(
   unsigned char (&strDest)[size],
   const unsigned char *strSource,
   size_t count
); // C++ only
template <size_t size>
errno_t _mbsncpy_s_l(
   unsigned char (&strDest)[size],
   const unsigned char *strSource,
   size_t count,
   _locale_t locale
); // C++ only
```

### Parameters

_`strDest`_  
Destination string.

_`numberOfElements`_  
The size of the destination string, in characters.

_`strSource`_  
Source string.

_`count`_  
Number of characters to be copied, or [`_TRUNCATE`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/truncate?view=msvc-170).

_`locale`_  
The locale to use.

## Return value

Zero if successful, `STRUNCATE` if truncation occurred, otherwise an error code.

### Error conditions

_`strDest`_

_`numberOfElements`_

_`strSource`_

Return value

Contents of _`strDest`_

`NULL`

any

any

`EINVAL`

not modified

any

any

`NULL`

`EINVAL`

_`strDest[0]`_ set to 0

any

0

any

`EINVAL`

not modified

not `NULL`

too small

any

`ERANGE`

_`strDest[0]`_ set to 0

These functions try to copy the first _`D`_ characters of _`strSource`_ to _`strDest`_, where _`D`_ is the lesser of _`count`_ and the length of _`strSource`_. If those _`D`_ characters will fit within _`strDest`_ (whose size is given as _`numberOfElements`_) and still leave room for a null terminator, then those characters are copied and a terminating null is appended; otherwise, _`strDest[0]`_ is set to the null character and the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170).

There's an exception to the above paragraph. If _`count`_ is `_TRUNCATE`, then as much of _`strSource`_ as will fit into _`strDest`_ is copied while still leaving room for the terminating null, which is always appended.

For example,

```
char dst[5];
strncpy_s(dst, 5, "a long string", 5);
```

means that **`strncpy_s`** copies five characters into a 5-byte buffer. This copy would leave no space for the null terminator, so **`strncpy_s`** zeroes out the string, and calls the invalid parameter handler.

If truncation behavior is needed, use `_TRUNCATE` or (_`size`_ - 1):

```
strncpy_s(dst, 5, "a long string", _TRUNCATE);
strncpy_s(dst, 5, "a long string", 4);
```

Unlike **`strncpy`**, if _`count`_ is greater than the length of _`strSource`_, the destination string is NOT padded with null characters up to length _`count`_.

The behavior of **`strncpy_s`** is undefined if the source and destination strings overlap.

If _`strDest`_ or _`strSource`_ is `NULL`, or _`numberOfElements`_ is 0, the invalid parameter handler is invoked. If execution is allowed to continue, the function returns `EINVAL` and sets `errno` to `EINVAL`.

**`wcsncpy_s`** and **`_mbsncpy_s`** are wide-character and multibyte-character versions of **`strncpy_s`**. The arguments and return value of **`wcsncpy_s`** and **`mbsncpy_s`** do vary accordingly. These six functions behave identically otherwise.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of these functions without the **`_l`** suffix use the current locale for this locale-dependent behavior; the versions with the **`_l`** suffix are identical except that they use the locale parameter passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

In C++, using these functions is simplified by template overloads; the overloads can infer buffer length automatically (eliminating the need to specify a size argument) and they can automatically replace older, non-secure functions with their newer, secure counterparts. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

The debug library versions of these functions first fill the buffer with 0xFE. To disable this behavior, use [`_CrtSetDebugFillThreshold`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdebugfillthreshold?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text function mappings

The function in the `tchar.h` column maps to the function in the other columns depending on the character set that is defined at compile time.

`tchar.h` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsncpy_s`

**`strncpy_s`**

**`_mbsnbcpy_s`**

**`wcsncpy_s`**

`_tcsncpy_s_l`

**`_strncpy_s_l`**

**`_mbsnbcpy_s_l`**

**`_wcsncpy_s_l`**

`_tcsnccpy_s`

**`strncpy_s`**

**`_mbsncpy_s`**

**`_wcsncpy_s`**

`_tcsnccpy_s_l`

**`_strncpy_s_l`**

**`_mbsncpy_s_l`**

**`_wcsncpy_s_l`**

Note

**`_strncpy_s_l`**, **`_wcsncpy_s_l`** and **`_mbsncpy_s_l`** have no locale dependence. They're provided just for `_tcsncpy_s_l` and aren't intended to be called directly.

## Requirements

Routine

Required header

**`strncpy_s`**, **`_strncpy_s_l`**

`<string.h>`

**`wcsncpy_s`**, **`_wcsncpy_s_l`**

`<string.h>` or `<wchar.h>`

**`_mbsncpy_s`**, **`_mbsncpy_s_l`**

`<mbstring.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example: Copy chars to a buffer

```
// crt_strncpy_s_1.cpp
// compile with: /MTd

// these #defines enable secure template overloads
// (see last part of Examples() below)
#define _CRT_SECURE_CPP_OVERLOAD_STANDARD_NAMES 1
#define _CRT_SECURE_CPP_OVERLOAD_STANDARD_NAMES_COUNT 1

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <crtdbg.h>  // For _CrtSetReportMode
#include <errno.h>

// This example uses a 10-byte destination buffer.

errno_t strncpy_s_tester( const char * src,
                          int count )
{
   char dest[10];

   printf( "\n" );

   if ( count == _TRUNCATE )
      printf( "Copying '%s' to %d-byte buffer dest with truncation semantics\n",
               src, _countof(dest) );
   else
      printf( "Copying %d chars of '%s' to %d-byte buffer dest\n",
              count, src, _countof(dest) );

   errno_t err = strncpy_s( dest, _countof(dest), src, count );

   printf( "    new contents of dest: '%s'\n", dest );

   return err;
}

void Examples()
{
   strncpy_s_tester( "howdy", 4 );
   strncpy_s_tester( "howdy", 5 );
   strncpy_s_tester( "howdy", 6 );

   printf( "\nDestination buffer too small:\n" );
   strncpy_s_tester( "Hi there!!", 10 );

   printf( "\nTruncation examples:\n" );

   errno_t err = strncpy_s_tester( "How do you do?", _TRUNCATE );
   printf( "    truncation %s occur\n", err == STRUNCATE ? "did"
                                                       : "did not" );

   err = strncpy_s_tester( "Howdy.", _TRUNCATE );
   printf( "    truncation %s occur\n", err == STRUNCATE ? "did"
                                                       : "did not" );

   printf( "\nSecure template overload example:\n" );

   char dest[10];
   strncpy( dest, "very very very long", 15 );
   // With secure template overloads enabled (see #defines at
   // top of file), the preceding line is replaced by
   //    strncpy_s( dest, _countof(dest), "very very very long", 15 );
   // Instead of causing a buffer overrun, strncpy_s invokes
   // the invalid parameter handler.
   // If secure template overloads were disabled, strncpy would
   // copy 15 characters and overrun the dest buffer.
   printf( "    new contents of dest: '%s'\n", dest );
}

void myInvalidParameterHandler(
   const wchar_t* expression,
   const wchar_t* function,
   const wchar_t* file,
   unsigned int line,
   uintptr_t pReserved)
{
   wprintf(L"Invalid parameter handler invoked: %s\n", expression);
}

int main( void )
{
   _invalid_parameter_handler oldHandler, newHandler;

   newHandler = myInvalidParameterHandler;
   oldHandler = _set_invalid_parameter_handler(newHandler);
   // Disable the message box for assertions.
   _CrtSetReportMode(_CRT_ASSERT, 0);

   Examples();
}
```

```
Copying 4 chars of 'howdy' to 10-byte buffer dest
    new contents of dest: 'howd'

Copying 5 chars of 'howdy' to 10-byte buffer dest
    new contents of dest: 'howdy'

Copying 6 chars of 'howdy' to 10-byte buffer dest
    new contents of dest: 'howdy'

Destination buffer too small:

Copying 10 chars of 'Hi there!!' to 10-byte buffer dest
Invalid parameter handler invoked: (L"Buffer is too small" && 0)
    new contents of dest: ''

Truncation examples:

Copying 'How do you do?' to 10-byte buffer dest with truncation semantics
    new contents of dest: 'How do yo'
    truncation did occur

Copying 'Howdy.' to 10-byte buffer dest with truncation semantics
    new contents of dest: 'Howdy.'
    truncation did not occur

Secure template overload example:
Invalid parameter handler invoked: (L"Buffer is too small" && 0)
    new contents of dest: ''
```

## Example: `strncpy` and `strncpy_s`

```
// crt_strncpy_s_2.c
// contrasts strncpy and strncpy_s

#include <stdio.h>
#include <stdlib.h>

int main( void )
{
   char a[20] = "test";
   char s[20];

   // simple strncpy usage:

   strcpy_s( s, 20, "dogs like cats" );
   printf( "Original string:\n   '%s'\n", s );

   // Here we can't use strncpy_s since we don't
   // want null termination
   strncpy( s, "mice", 4 );
   printf( "After strncpy (no null-termination):\n   '%s'\n", s );
   strncpy( s+5, "love", 4 );
   printf( "After strncpy into middle of string:\n   '%s'\n", s );

   // If we use strncpy_s, the string is terminated
   strncpy_s( s, _countof(s), "mice", 4 );
   printf( "After strncpy_s (with null-termination):\n   '%s'\n", s );

}
```

```
Original string:
   'dogs like cats'
After strncpy (no null-termination):
   'mice like cats'
After strncpy into middle of string:
   'mice love cats'
After strncpy_s (with null-termination):
   'mice'
```

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`_mbsnbcpy`, `_mbsnbcpy_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcpy-mbsnbcpy-l?view=msvc-170)  
[`strcat_s`, `wcscat_s`, `_mbscat_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcat-s-wcscat-s-mbscat-s?view=msvc-170)  
[`strcmp`, `wcscmp`, `_mbscmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcmp-wcscmp-mbscmp?view=msvc-170)  
[`strcpy_s`, `wcscpy_s`, `_mbscpy_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcpy-s-wcscpy-s-mbscpy-s?view=msvc-170)  
[`strncat_s`, `_strncat_s_l`, `wcsncat_s`, `_wcsncat_s_l`, `_mbsncat_s`, `_mbsncat_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-s-strncat-s-l-wcsncat-s-wcsncat-s-l-mbsncat-s-mbsncat-s-l?view=msvc-170)  
[`strncmp`, `wcsncmp`, `_mbsncmp`, `_mbsncmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncmp-wcsncmp-mbsncmp-mbsncmp-l?view=msvc-170)  
[`_strnicmp`, `_wcsnicmp`, `_mbsnicmp`, `_strnicmp_l`, `_wcsnicmp_l`, `_mbsnicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnicmp-wcsnicmp-mbsnicmp-strnicmp-l-wcsnicmp-l-mbsnicmp-l?view=msvc-170)  
[`strrchr`, `wcsrchr`, `_mbsrchr`, `_mbsrchr_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strrchr-wcsrchr-mbsrchr-mbsrchr-l?view=msvc-170)  
[`_strset`, `_strset_l`, `_wcsset`, `_wcsset_l`, `_mbsset`, `_mbsset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strset-strset-l-wcsset-wcsset-l-mbsset-mbsset-l?view=msvc-170)  
[`strspn`, `wcsspn`, `_mbsspn`, `_mbsspn_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strspn-wcsspn-mbsspn-mbsspn-l?view=msvc-170)