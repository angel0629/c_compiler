---
title: "_strdec, _wcsdec, _mbsdec, _mbsdec_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdec-wcsdec-mbsdec-mbsdec-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Moves a string pointer back one character.

## Syntax

```
unsigned char *_strdec(
   const unsigned char *start,
   const unsigned char *current
);
unsigned wchar_t *_wcsdec(
   const unsigned wchar_t *start,
   const unsigned wchar_t *current
);
unsigned char *_mbsdec(
   const unsigned char *start,
   const unsigned char *current
);
unsigned char *_mbsdec_l(
   const unsigned char *start,
   const unsigned char *current,
   _locale_t locale
);
```

### Parameters

_`start`_  
Pointer to any character (or for **`_mbsdec`** and **`_mbsdec_l`**, the first byte of any multibyte character) in the source string; _`start`_ must precede _`current`_ in the source string.

_`current`_  
Pointer to any character (or for **`_mbsdec`** and **`_mbsdec_l`**, the first byte of any multibyte character) in the source string; _`current`_ must follow _`start`_ in the source string.

_`locale`_  
Locale to use.

## Return value

**`_mbsdec`**, **`_mbsdec_l`**, **`_strdec`**, and **`_wcsdec`** each return a pointer to the character that immediately precedes _`current`_; **`_mbsdec`** returns `NULL` if the value of _`start`_ is greater than or equal to that of _`current`_. `_tcsdec` maps to one of these functions and its return value depends on the mapping.

The **`_mbsdec`** and **`_mbsdec_l`** functions return a pointer to the first byte of the multibyte character that immediately precedes _`current`_ in the string that contains _`start`_.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). **`_mbsdec`** recognizes multibyte-character sequences according to the locale that's currently in use, while **`_mbsdec_l`** is identical except that it instead uses the locale parameter that's passed in. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

If _`start`_ or _`current`_ is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function returns `EINVAL` and sets `errno` to `EINVAL`.

Important

These functions might be vulnerable to buffer overrun threats. Buffer overruns can be used for system attacks because they can cause an unwarranted elevation of privilege. For more information, see [Avoiding buffer overruns](https://learn.microsoft.com/en-us/windows/win32/SecBP/avoiding-buffer-overruns).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsdec`

**`_strdec`**

**`_mbsdec`**

**`_wcsdec`**

**`_strdec`** and **`_wcsdec`** are single-byte-character and wide-character versions of **`_mbsdec`** and **`_mbsdec_l`**. **`_strdec`** and **`_wcsdec`** are provided only for this mapping and shouldn't be used otherwise.

For more information, see [Using generic-text mappings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/using-generic-text-mappings?view=msvc-170) and [Generic-text mappings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/generic-text-mappings?view=msvc-170).

## Requirements

Routine

Required header

Optional header

**`_mbsdec`**

<mbstring.h>

<mbctype.h>

**`_mbsdec_l`**

<mbstring.h>

<mbctype.h>

**`_strdec`**

<tchar.h>

**`_wcsdec`**

<tchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

The following example shows a use of `_tcsdec`.

```
// crt_tcsdec.cpp
// Compile by using: cl /EHsc crt_tcsdec.cpp
#include <iostream>
#include <tchar.h>
using namespace std;

int main()
{
   const TCHAR *str = _T("12345");
   cout << "str: " << str << endl;

   const TCHAR *str2;
   str2 = str + 2;
   cout << "str2: " << str2 << endl;

   TCHAR *answer;
   answer = _tcsdec( str, str2 );
   cout << "answer: " << answer << endl;

   return (0);
}
```

The following example shows a use of **`_mbsdec`**.

```
// crt_mbsdec.cpp
// Compile by using: cl /EHsc crt_mbsdec.c
#include <iostream>
#include <mbstring.h>
using namespace std;

int main()
{
   char *str = "12345";
   cout << "str: " << str << endl;

   char *str2;
   str2 = str + 2;
   cout << "str2: " << str2 << endl;

   unsigned char *answer;
   answer = _mbsdec( reinterpret_cast<unsigned char *>( str ), reinterpret_cast<unsigned char *>( str2 ));

   cout << "answer: " << answer << endl;

   return (0);
}
```

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`_strinc`, `_wcsinc`, `_mbsinc`, `_mbsinc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strinc-wcsinc-mbsinc-mbsinc-l?view=msvc-170)  
[`_strnextc`, `_wcsnextc`, `_mbsnextc`, `_mbsnextc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnextc-wcsnextc-mbsnextc-mbsnextc-l?view=msvc-170)  
[`_strninc`, `_wcsninc`, `_mbsninc`, `_mbsninc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strninc-wcsninc-mbsninc-mbsninc-l?view=msvc-170)