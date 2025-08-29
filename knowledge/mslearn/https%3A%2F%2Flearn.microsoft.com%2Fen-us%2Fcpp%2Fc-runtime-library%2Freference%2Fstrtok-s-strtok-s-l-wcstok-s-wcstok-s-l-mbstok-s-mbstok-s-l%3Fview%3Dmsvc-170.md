---
title: "strtok_s, _strtok_s_l, wcstok_s, _wcstok_s_l, _mbstok_s, _mbstok_s_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtok-s-strtok-s-l-wcstok-s-wcstok-s-l-mbstok-s-mbstok-s-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Finds the next token in a string, by using the current locale or a locale that's passed in. These versions of [`strtok`, `_strtok_l`, `wcstok`, `_wcstok_l`, `_mbstok`, `_mbstok_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtok-strtok-l-wcstok-wcstok-l-mbstok-mbstok-l?view=msvc-170) have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
char* strtok_s(
   char* str,
   const char* delimiters,
   char** context
);

char* _strtok_s_l(
   char* str,
   const char* delimiters,
   char** context,
   _locale_t locale
);

wchar_t* wcstok_s(
   wchar_t* str,
   const wchar_t* delimiters,
   wchar_t** context
);

wchar_t *_wcstok_s_l(
   wchar_t* str,
   const wchar_t* delimiters,
   wchar_t** context,
   _locale_t locale
);

unsigned char* _mbstok_s(
   unsigned char* str,
   const unsigned char* delimiters,
   char** context
);

unsigned char* _mbstok_s_l(
   unsigned char* str,
   const unsigned char* delimiters,
   char** context,
   _locale_t locale
);
```

### Parameters

_`str`_  
A string containing the token or tokens to find.

_`delimiters`_  
The set of delimiter characters to use.

_`context`_  
Used to store position information between calls to the function.

_`locale`_  
The locale to use.

## Return value

Returns a pointer to the next token found in _`str`_. Returns `NULL` when no more tokens are found. Each call modifies _`str`_ by substituting a null character for the first delimiter that occurs after the returned token.

### Error conditions

_`str`_

_`delimiters`_

_`context`_

Return value

`errno`

`NULL`

any

pointer to a null pointer

`NULL`

`EINVAL`

any

`NULL`

any

`NULL`

`EINVAL`

any

any

`NULL`

`NULL`

`EINVAL`

If _`str`_ is `NULL` but _`context`_ is a pointer to a valid context pointer, there's no error.

The **`strtok_s`** family of functions finds the next token in _`str`_. The set of characters in _`delimiters`_ specifies possible delimiters of the token to be found in _`str`_ on the current call. **`wcstok_s`** and **`_mbstok_s`** are wide-character and multibyte-character versions of **`strtok_s`**. The arguments and return values of **`wcstok_s`** and **`_wcstok_s_l`** are wide-character strings. The arguments and return values of **`_mbstok_s`** and **`_mbstok_s_l`** are multibyte-character strings. These functions behave identically otherwise.

This function validates its parameters. When an error condition occurs, as in the Error Conditions table, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EINVAL` and return `NULL`.

On the first call to **`strtok_s`**, the function skips leading delimiters and returns a pointer to the first token in _`str`_, terminating the token with a null character. More tokens can be broken out of the remainder of _`str`_ by a series of calls to **`strtok_s`**. Each call to **`strtok_s`** modifies _`str`_ by inserting a null character after the token returned by that call. The _`context`_ pointer keeps track of which string is being read and where in the string the next token is to be read. To read the next token from _`str`_, call **`strtok_s`** with a `NULL` value for the _`str`_ argument, and pass the same _`context`_ parameter. The `NULL` _`str`_ argument causes **`strtok_s`** to search for the next token in the modified _`str`_. The _`delimiters`_ argument can take any value from one call to the next so that the set of delimiters may vary.

Since the _`context`_ parameter supersedes the static buffers used in **`strtok`** and **`_strtok_l`**, it's possible to parse two strings simultaneously in the same thread.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170).

The versions of these functions without the **`_l`** suffix use the current thread locale for this locale-dependent behavior. The versions with the **`_l`** suffix are identical except they instead use the locale specified by the _`locale`_ parameter. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcstok_s`

**`strtok_s`**

**`_mbstok_s`**

**`wcstok_s`**

`_tcstok_s_l`

**`_strtok_s_l`**

**`_mbstok_s_l`**

**`_wcstok_s_l`**

## Requirements

Routine

Required header

**`strtok_s`**

`<string.h>`

**`_strtok_s_l`**

`<string.h>`

**`wcstok_s`**,  
**`_wcstok_s_l`**

`<string.h>` or `<wchar.h>`

**`_mbstok_s`**,  
**`_mbstok_s_l`**

`<mbstring.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_strtok_s.c
// In this program, a loop uses strtok_s
// to print all the tokens (separated by commas
// or blanks) in two strings at the same time.

#include <string.h>
#include <stdio.h>

char string1[] =
    "A string\tof ,,tokens\nand some  more tokens";
char string2[] =
    "Another string\n\tparsed at the same time.";
char seps[]   = " ,\t\n";
char *token1 = NULL;
char *token2 = NULL;
char *next_token1 = NULL;
char *next_token2 = NULL;

int main(void)
{
    printf("Tokens:\n");

    // Establish string and get the first token:
    token1 = strtok_s(string1, seps, &next_token1);
    token2 = strtok_s(string2, seps, &next_token2);

    // While there are tokens in "string1" or "string2"
    while ((token1 != NULL) || (token2 != NULL))
    {
        // Get next token:
        if (token1 != NULL)
        {
            printf(" %s\n", token1);
            token1 = strtok_s(NULL, seps, &next_token1);
        }
        if (token2 != NULL)
        {
            printf("        %s\n", token2);
            token2 = strtok_s(NULL, seps, &next_token2);
        }
    }
}
```

```
Tokens:
A
        Another
string
        string
of
        parsed
tokens
        at
and
        the
some
        same
more
        time.
tokens
```

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`strcspn`, `wcscspn`, `_mbscspn`, `_mbscspn_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcspn-wcscspn-mbscspn-mbscspn-l?view=msvc-170)  
[`strspn`, `wcsspn`, `_mbsspn`, `_mbsspn_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strspn-wcsspn-mbsspn-mbsspn-l?view=msvc-170)