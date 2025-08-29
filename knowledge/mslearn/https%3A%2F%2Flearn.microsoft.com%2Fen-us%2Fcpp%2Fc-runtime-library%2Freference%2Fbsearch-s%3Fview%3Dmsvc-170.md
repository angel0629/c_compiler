---
title: "bsearch_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/bsearch-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Performs a binary search of a sorted array. This function is a version of [`bsearch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/bsearch?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
void *bsearch_s(
   const void *key,
   const void *base,
   size_t number,
   size_t width,
   int ( __cdecl *compare ) ( void *, const void *key, const void *datum),
   void * context
);
```

### Parameters

_`key`_  
Pointer to the key to search for.

_`base`_  
Pointer to the base of the search data.

_`number`_  
Number of elements.

_`width`_  
Width of elements.

_`compare`_  
Callback function that compares two elements. The first argument is the _`context`_ pointer. The second argument is a pointer to the _`key`_ for the search. The third argument is a pointer to the array element to be compared with _`key`_.

_`context`_  
A pointer to an object that can be accessed in the comparison function.

## Return value

**`bsearch_s`** returns a pointer to an occurrence of _`key`_ in the array pointed to by _`base`_. If _`key`_ isn't found, the function returns `NULL`. If the array isn't in ascending sort order or contains duplicate records with identical keys, the result is unpredictable.

If invalid parameters are passed to the function, it invokes the invalid parameter handler as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the function returns `NULL`. For more information, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

### Error conditions

_`key`_

_`base`_

_`compare`_

_`number`_

_`width`_

`errno` value

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

\= 0

`EINVAL`

any

any

`NULL`

an

any

`EINVAL`

The **`bsearch_s`** function performs a binary search of a sorted array of _`number`_ elements, each of _`width`_ bytes in size. The _`base`_ value is a pointer to the base of the array to be searched, and _`key`_ is the value being sought. The _`compare`_ parameter is a pointer to a user-supplied routine that compares the requested key to an array element and returns one of the following values specifying their relationship:

Value returned by _`compare`_ routine

Description

< 0

Key is less than array element.

0

Key is equal to array element.

\> 0

Key is greater than array element.

The _`context`_ pointer may be useful if the searched data structure is part of an object, and the compare function needs to access members of the object. The _`compare`_ function may cast the void pointer into the appropriate object type and access members of that object. The addition of the _`context`_ parameter makes **`bsearch_s`** more secure, since the context may be used to avoid reentrancy bugs associated with using static variables to make data available to the _`compare`_ function.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`bsearch_s`**

<stdlib.h> and <search.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

This program sorts a string array with [`qsort_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/qsort-s?view=msvc-170), and then uses bsearch\_s to find the word "cat".

```
// crt_bsearch_s.cpp
// This program uses bsearch_s to search a string array,
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
#define ENGLISH_LOCALE "English_US.850"
#endif

#ifdef CODEPAGE_1252
#define ENGLISH_LOCALE "English_US.1252"
#endif

// The context parameter lets you create a more generic compare.
// Without this parameter, you would have stored the locale in a
// static variable, thus making it vulnerable to thread conflicts
// (if this were a multithreaded program).

int compare( void *pvlocale, char **str1, char **str2)
{
    char *s1 = *str1;
    char *s2 = *str2;

    locale& loc = *( reinterpret_cast< locale * > ( pvlocale));

    return use_facet< collate<char> >(loc).compare(
       s1, s1+strlen(s1),
       s2, s2+strlen(s2) );
}

int main( void )
{
   char *arr[] = {"dog", "pig", "horse", "cat", "human", "rat", "cow", "goat"};

   char *key = "cat";
   char **result;
   int i;

   /* Sort using Quicksort algorithm: */
   qsort_s( arr,
            sizeof(arr)/sizeof(arr[0]),
            sizeof( char * ),
            (int (*)(void*, const void*, const void*))compare,
            &locale(ENGLISH_LOCALE) );

   for( i = 0; i < sizeof(arr)/sizeof(arr[0]); ++i )    /* Output sorted list */
      printf( "%s ", arr[i] );

   /* Find the word "cat" using a binary search algorithm: */
   result = (char **)bsearch_s( &key,
                                arr,
                                sizeof(arr)/sizeof(arr[0]),
                                sizeof( char * ),
                                (int (*)(void*, const void*, const void*))compare,
                                &locale(ENGLISH_LOCALE) );
   if( result )
      printf( "\n%s found at %Fp\n", *result, result );
   else
      printf( "\nCat not found!\n" );
}
```

```
cat cow dog goat horse human pig rat
cat found at 002F0F04
```

## See also

[Searching and sorting](https://learn.microsoft.com/en-us/cpp/c-runtime-library/searching-and-sorting?view=msvc-170)  
[`_lfind`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lfind?view=msvc-170)  
[`_lsearch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lsearch?view=msvc-170)  
[`qsort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/qsort?view=msvc-170)