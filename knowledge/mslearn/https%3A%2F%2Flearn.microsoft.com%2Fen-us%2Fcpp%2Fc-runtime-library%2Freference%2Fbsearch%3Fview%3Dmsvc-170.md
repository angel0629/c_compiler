---
title: "bsearch"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/bsearch?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Performs a binary search of a sorted array. A more secure version of this function is available; see [`bsearch_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/bsearch-s?view=msvc-170).

## Syntax

```
void *bsearch(
   const void *key,
   const void *base,
   size_t num,
   size_t width,
   int ( __cdecl *compare ) (const void *key, const void *datum)
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
Callback function that compares two elements. The first is a pointer to the key for the search, and the second is a pointer to the array element to be compared with the key.

## Return value

**`bsearch`** returns a pointer to an occurrence of _`key`_ in the array pointed to by _`base`_. If _`key`_ isn't found, the function returns `NULL`. If the array isn't in ascending sort order or contains duplicate records with identical keys, the result is unpredictable.

The **`bsearch`** function performs a binary search of a sorted array of _`number`_ elements, each of _`width`_ bytes in size. The _`base`_ value is a pointer to the base of the array to be searched, and _`key`_ is the value being sought. The _`compare`_ parameter is a pointer to a user-supplied routine that compares the requested key to an array element. It returns one of the following values that specify their relationship:

Value returned by _`compare`_ routine

Description

`< 0`

Key is less than array element.

`0`

Key is equal to array element.

`> 0`

Key is greater than array element.

This function validates its parameters. If _`compare`_, _`key`_ or _`number`_ is `NULL`, or if _`base`_ is `NULL` and _`number`_ is nonzero, or if _`width`_ is zero, the function invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the function returns `NULL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`bsearch`**

<stdlib.h> and <search.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

This program sorts a string array with qsort, and then uses bsearch to find the word "cat".

```
// crt_bsearch.c
#include <search.h>
#include <string.h>
#include <stdio.h>

int compare( char **arg1, char **arg2 )
{
   /* Compare all of both strings: */
   return _strcmpi( *arg1, *arg2 );
}

int main( void )
{
   char *arr[] = {"dog", "pig", "horse", "cat", "human", "rat", "cow", "goat"};
   char **result;
   char *key = "cat";
   int i;

   /* Sort using Quicksort algorithm: */
   qsort( (void *)arr, sizeof(arr)/sizeof(arr[0]), sizeof( char * ), (int (*)(const
   void*, const void*))compare );

   for( i = 0; i < sizeof(arr)/sizeof(arr[0]); ++i )    /* Output sorted list */
      printf( "%s ", arr[i] );

   /* Find the word "cat" using a binary search algorithm: */
   result = (char **)bsearch( (char *) &key, (char *)arr, sizeof(arr)/sizeof(arr[0]),
                              sizeof( char * ), (int (*)(const void*, const void*))compare );
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