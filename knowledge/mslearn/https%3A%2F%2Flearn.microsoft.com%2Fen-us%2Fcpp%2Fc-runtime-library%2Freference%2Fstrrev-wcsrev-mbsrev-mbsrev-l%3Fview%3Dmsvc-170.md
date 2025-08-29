---
title: "_strrev, _wcsrev, _mbsrev, _mbsrev_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strrev-wcsrev-mbsrev-mbsrev-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reverses the characters of a string.

## Syntax

```
char *_strrev(
   char *str
);
wchar_t *_wcsrev(
   wchar_t *str
);
unsigned char *_mbsrev(
   unsigned char *str
);
unsigned char *_mbsrev_l(
   unsigned char *str,
   _locale_t locale
);
```

### Parameters

_`str`_  
Null-terminated string to reverse.

_`locale`_  
Locale to use.

## Return value

Returns a pointer to the altered string. No return value is reserved to indicate an error.

The **`_strrev`** function reverses the order of the characters in _`str`_. The terminating null character remains in place. **`_wcsrev`** and **`_mbsrev`** are wide-character and multibyte-character versions of **`_strrev`**. The arguments and return value of **`_wcsrev`** are wide-character strings. The arguments and return value of **`_mbsrev`** are multibyte-character strings. For **`_mbsrev`**, the order of bytes in each multibyte character in _`str`_ isn't changed. These three functions behave identically otherwise.

**`_mbsrev`** validates its parameters. If either _`string1`_ or _`string2`_ is a null pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, **`_mbsrev`** returns `NULL` and sets `errno` to `EINVAL`. **`_strrev`** and **`_wcsrev`** don't validate their parameters.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of these functions are identical, except that the ones that don't have the `_l` suffix use the current locale and the ones that do have the `_l` suffix instead use the locale parameter that's passed in. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

Important

These functions might be vulnerable to buffer overrun threats. Buffer overruns can be used for system attacks because they can cause an unwarranted elevation of privilege. For more information, see [Avoiding buffer overruns](https://learn.microsoft.com/en-us/windows/win32/SecBP/avoiding-buffer-overruns).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsrev`

**`_strrev`**

**`_mbsrev`**

**`_wcsrev`**

**n/a**

**n/a**

**`_mbsrev_l`**

**n/a**

## Requirements

Routine

Required header

**`_strrev`**

<string.h>

**`_wcsrev`**

<string.h> or <wchar.h>

**`_mbsrev`**, **`_mbsrev_l`**

<mbstring.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_strrev.c
// This program checks a string to see
// whether it is a palindrome: that is, whether
// it reads the same forward and backward.
//

#include <string.h>
#include <stdio.h>

int main( void )
{
   char* string = "Able was I ere I saw Elba";
   int result;

   // Reverse string and compare (ignore case):
   result = _stricmp( string, _strrev( _strdup( string ) ) );
   if( result == 0 )
      printf( "The string \"%s\" is a palindrome\n", string );
   else
      printf( "The string \"%s\" is not a palindrome\n", string );
}
```

```
The string "Able was I ere I saw Elba" is a palindrome
```

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`strcpy`, `wcscpy`, `_mbscpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcpy-wcscpy-mbscpy?view=msvc-170)  
[`_strset`, `_strset_l`, `_wcsset`, `_wcsset_l`, `_mbsset`, `_mbsset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strset-strset-l-wcsset-wcsset-l-mbsset-mbsset-l?view=msvc-170)