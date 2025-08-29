---
title: "_lfind_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lfind-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Performs a linear search for the specified key. A version of [`_lfind`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lfind?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
void *_lfind_s(
   const void *key,
   const void *base,
   unsigned int *num,
   size_t size,
   int (__cdecl *compare)(void *, const void *, const void *),
   void * context
);
```

### Parameters

_`key`_  
Object to search for.

_`base`_  
Pointer to the base of search data.

_`number`_  
Number of array elements.

_`size`_  
Size of array elements in bytes.

_`compare`_  
Pointer to comparison routine. The first parameter is the _`context`_ pointer. The second parameter is a pointer to key for search. The third parameter is a pointer to array element to be compared with key.

_`context`_  
A pointer to an object that might be accessed in the comparison function.

## Return value

If the key is found, **`_lfind_s`** returns a pointer to the element of the array at _`base`_ that matches _`key`_. If the key isn't found, **`_lfind_s`** returns `NULL`.

If invalid parameters are passed to the function, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the function returns `NULL`.

### Error conditions

_`key`_

_`base`_

_`compare`_

_`number`_

_`size`_

`errno`

`NULL`

any

any

any

any

`EINVAL`

any

`NULL`

any

!= 0

any

`EINVAL`

any

any

any

any

zero

`EINVAL`

any

any

`NULL`

an

any

`EINVAL`

The **`_lfind_s`** function performs a linear search for the value _`key`_ in an array of _`number`_ elements, each of _`size`_ bytes. Unlike `bsearch_s`, **`_lfind_s`** doesn't require the array to be sorted. The _`base`_ argument is a pointer to the base of the array to be searched. The _`compare`_ argument is a pointer to a user-supplied routine that compares two array elements and then returns a value specifying their relationship. **`_lfind_s`** calls the _`compare`_ routine one or more times during the search, passing the _`context`_ pointer and pointers to two array elements on each call. The _`compare`_ routine must compare the elements then return nonzero (meaning that the elements are different) or 0 (meaning the elements are identical).

**`_lfind_s`** is similar to **`_lfind`** except for the addition of the _`context`_ pointer to the arguments of the comparison function and the parameter list of the function. The _`context`_ pointer can be useful if the searched data structure is part of an object and the _`compare`_ function needs to access members of the object. The _`compare`_ function can cast the void pointer into the appropriate object type and access members of that object. The addition of the _`context`_ parameter makes **`_lfind_s`** more secure because extra context can be used to avoid reentrancy bugs associated with using static variables to make data available to the _`compare`_ function.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_lfind_s`**

<search.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_lfind_s.cpp
// This program uses _lfind_s to search a string array,
// passing a locale as the context.
// compile with: /EHsc
#include <stdlib.h>
#include <stdio.h>
#include <search.h>
#include <process.h>
#include <locale.h>
#include <locale>
#include <windows.h>
using namespace std;

// The sort order is dependent on the code page.  Use 'chcp' at the
// command line to change the codepage.  When executing this application,
// the command prompt codepage must match the codepage used here:

#define CODEPAGE_850

#ifdef CODEPAGE_850
// Codepage 850 is the OEM codepage used by the command line,
// so \x00e1 is the German Sharp S

char *array1[] = { "wei\x00e1", "weis", "annehmen", "weizen", "Zeit",
                   "weit" };

#define GERMAN_LOCALE "German_Germany.850"

#endif

#ifdef CODEPAGE_1252
   // If using codepage 1252 (ISO 8859-1, Latin-1), use \x00df
   // for the German Sharp S
char *array1[] = { "wei\x00df", "weis", "annehmen", "weizen", "Zeit",
                   "weit" };

#define GERMAN_LOCALE "German_Germany.1252"

#endif

// The context parameter lets you create a more generic compare.
// Without this parameter, you would have stored the locale in a
// static variable, thus making it vulnerable to thread conflicts
// (if this were a multithreaded program).

int compare( void *pvlocale, const void *str1, const void *str2)
{
    char *s1 = *(char**)str1;
    char *s2 = *(char**)str2;

    locale& loc = *( reinterpret_cast< locale * > ( pvlocale));

    return use_facet< collate<char> >(loc).compare(
       s1, s1+strlen(s1),
       s2, s2+strlen(s2) );
}

void find_it( char *key, char *array[], unsigned int num, locale &loc )
{
   char **result = (char **)_lfind_s( &key, array,
                      &num, sizeof(char *), compare, &loc );
   if( result )
      printf( "%s found\n", *result );
   else
      printf( "%s not found\n", key );
}

int main( )
{
   find_it( "weit", array1, sizeof(array1)/sizeof(char*), locale(GERMAN_LOCALE) );
}
```

```
weit found
```

## See also

[Searching and sorting](https://learn.microsoft.com/en-us/cpp/c-runtime-library/searching-and-sorting?view=msvc-170)  
[`bsearch_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/bsearch-s?view=msvc-170)  
[`_lsearch_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lsearch-s?view=msvc-170)  
[`qsort_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/qsort-s?view=msvc-170)  
[`_lfind`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lfind?view=msvc-170)