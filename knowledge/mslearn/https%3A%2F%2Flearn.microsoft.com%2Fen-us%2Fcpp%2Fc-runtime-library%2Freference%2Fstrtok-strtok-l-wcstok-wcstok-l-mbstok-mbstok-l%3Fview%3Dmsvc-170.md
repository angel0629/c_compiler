---
title: "strtok, _strtok_l, wcstok, _wcstok_l, _mbstok, _mbstok_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtok-strtok-l-wcstok-wcstok-l-mbstok-mbstok-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Finds the next token in a string, by using the current locale or a specified locale that's passed in. More secure versions of these functions are available; see [`strtok_s`, `_strtok_s_l`, `wcstok_s`, `_wcstok_s_l`, `_mbstok_s`, `_mbstok_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtok-s-strtok-s-l-wcstok-s-wcstok-s-l-mbstok-s-mbstok-s-l?view=msvc-170).

## Syntax

```
char *strtok(
   char *strToken,
   const char *strDelimit
);
char *_strtok_l(
   char *strToken,
   const char *strDelimit,
   _locale_t locale
);
wchar_t *wcstok( /* Non-standard, define _CRT_NON_CONFORMING_WCSTOK to use */
   wchar_t *strToken,
   const wchar_t *strDelimit
);
wchar_t *wcstok(
   wchar_t *strToken,
   const wchar_t *strDelimit,
   wchar_t **context
);
wchar_t *_wcstok_l(
   wchar_t *strToken,
   const wchar_t *strDelimit,
   _locale_t locale
);
unsigned char *_mbstok(
   unsigned char *strToken,
   const unsigned char *strDelimit
);
unsigned char *_mbstok_l(
   unsigned char *strToken,
   const unsigned char *strDelimit,
   _locale_t locale
);
```

### Parameters

_`strToken`_  
String containing token or tokens.

_`strDelimit`_  
Set of delimiter characters.

_`locale`_  
Locale to use.

_`context`_  
Points to memory used to store the internal state of the parser so that the parser can continue from where it left off the next time you call **`wcstok`**.

## Return value

Returns a pointer to the next token found in _`strToken`_. The functions return `NULL` when no more tokens are found. Each call modifies _`strToken`_ by substituting a null character for the first delimiter that occurs after the returned token.

The **`strtok`** function finds the next token in _`strToken`_. The set of characters in _`strDelimit`_ specifies possible delimiters of the token to be found in _`strToken`_ on the current call. **`wcstok`** and **`_mbstok`** are wide-character and multibyte-character versions of **`strtok`**. The arguments and return value of **`wcstok`** are wide-character strings. The argumets and return value of **`_mbstok`** are multibyte-character strings. These three functions behave identically otherwise.

The two argument version of **`wcstok`** isn't standard. If you need to use that version, you'll need to define `_CRT_NON_CONFORMING_WCSTOK` before you `#include <wchar.h>` (or `#include <string.h>`).

Important

These functions incur a potential threat brought about by a buffer overrun problem. Buffer overrun problems are a frequent method of system attack, resulting in an unwarranted elevation of privilege. For more information, see [Avoiding buffer overruns](https://learn.microsoft.com/en-us/windows/win32/SecBP/avoiding-buffer-overruns).

On the first call to **`strtok`**, the function skips leading delimiters and returns a pointer to the first token in _`strToken`_, terminating the token with a null character. More tokens can be broken out of the remainder of _`strToken`_ by a series of calls to **`strtok`**. Each call to **`strtok`** modifies _`strToken`_ by inserting a null character after the **`token`** returned by that call. To read the next token from _`strToken`_, call **`strtok`** with a `NULL` value for the _`strToken`_ argument. The `NULL` _`strToken`_ argument causes **`strtok`** to search for the next token in the modified _`strToken`_. The _`strDelimit`_ argument can take any value from one call to the next so that the set of delimiters may vary.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170).

The versions of these functions without the **`_l`** suffix use the current locale for this locale-dependent behavior. The versions with the **`_l`** suffix are identical except that they use the locale parameter passed in instead. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

Note

Each function uses a thread-local static variable for parsing the string into tokens. Therefore, multiple threads can simultaneously call these functions without undesirable effects. However, within a single thread, interleaving calls to one of these functions is highly likely to produce data corruption and inaccurate results. When parsing different strings, finish parsing one string before starting to parse the next. Also, be aware of the potential for danger when calling one of these functions from within a loop where another function is called. If the other function ends up using one of these functions, an interleaved sequence of calls will result, triggering data corruption.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcstok`

**`strtok`**

**`_mbstok`**

**`wcstok`**

`_tcstok`

**`_strtok_l`**

**`_mbstok_l`**

**`_wcstok_l`**

## Requirements

Routine

Required header

**`strtok`**

`<string.h>`

**`wcstok`**

`<string.h>` or `<wchar.h>`

**`_wcstok_l`**

`<tchar.h>`

**`_mbstok`**, **`_mbstok_l`**

`<mbstring.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_strtok.c
// compile with: /W3
// In this program, a loop uses strtok
// to print all the tokens (separated by commas
// or blanks) in the string named "string".
//
#include <string.h>
#include <stdio.h>

char string[] = "A string\tof ,,tokens\nand some  more tokens";
char seps[]   = " ,\t\n";
char *token;

int main( void )
{
   printf( "Tokens:\n" );

   // Establish string and get the first token:
   token = strtok( string, seps ); // C4996
   // Note: strtok is deprecated; consider using strtok_s instead
   while( token != NULL )
   {
      // While there are tokens in "string"
      printf( " %s\n", token );

      // Get next token:
      token = strtok( NULL, seps ); // C4996
   }
}
```

```
Tokens:
A
string
of
tokens
and
some
more
tokens
```

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`strcspn`, `wcscspn`, `_mbscspn`, `_mbscspn_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcspn-wcscspn-mbscspn-mbscspn-l?view=msvc-170)  
[`strspn`, `wcsspn`, `_mbsspn`, `_mbsspn_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strspn-wcsspn-mbsspn-mbsspn-l?view=msvc-170)