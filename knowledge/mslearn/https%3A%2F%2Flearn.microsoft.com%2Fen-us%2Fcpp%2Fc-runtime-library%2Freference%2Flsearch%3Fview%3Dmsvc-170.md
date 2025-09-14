---
title: "_lsearch"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lsearch?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Performs a linear search for a value; adds to end of list if not found. A more secure version of this function is available; see [`_lsearch_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lsearch-s?view=msvc-170).

## Syntax

```
void *_lsearch(
   const void *key,
   void *base,
   unsigned int *num,
   unsigned int width,
   int (__cdecl *compare)(const void *, const void *)
);
```

### Parameters

_`key`_  
Object to search for.

_`base`_  
Pointer to the base of array to be searched.

_`number`_  
Number of elements.

_`width`_  
Width of each array element.

_`compare`_  
Pointer to the comparison routine. The first parameter is a pointer to the key for search. The second parameter is a pointer to an array element to be compared with the key.

## Return value

If the key is found, **`_lsearch`** returns a pointer to the element of the array at _`base`_ that matches _`key`_. If the key isn't found, **`_lsearch`** returns a pointer to the newly added item at the end of the array.

The **`_lsearch`** function performs a linear search for the value _`key`_ in an array of _`number`_ elements, each of _`width`_ bytes. Unlike **`bsearch`**, **`_lsearch`** doesn't require the array to be sorted. If _`key`_ isn't found, **`_lsearch`** adds it to the end of the array and increments _`number`_.

The _`compare`_ argument is a pointer to a user-supplied routine that compares two array elements and returns a value specifying their relationship. **`_lsearch`** calls the _`compare`_ routine one or more times during the search, passing pointers to two array elements on each call. _`compare`_ must compare the elements and return either nonzero (meaning the elements are different) or 0 (meaning the elements are identical).

This function validates its parameters. If _`compare`_, _`key`_ or _`number`_ is `NULL`, or if _`base`_ is `NULL` and _`number`_ is nonzero, or if _`width`_ is less than zero, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the function returns `NULL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_lsearch`**

<search.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_lsearch.c
#include <search.h>
#include <string.h>
#include <stdio.h>

int compare( const void *arg1, const void *arg2 );

int main(void)
{
   char * wordlist[4] = { "hello", "thanks", "bye" };
                            // leave room to grow...
   int n = 3;
   char **result;
   char *key = "extra";
   int i;

   printf( "wordlist before _lsearch:" );
   for( i=0; i<n; ++i ) printf( " %s", wordlist[i] );
   printf( "\n" );

   result = (char **)_lsearch( &key, wordlist,
                      &n, sizeof(char *), compare );

   printf( "wordlist after _lsearch:" );
   for( i=0; i<n; ++i ) printf( " %s", wordlist[i] );
   printf( "\n" );
}

int compare(const void *arg1, const void *arg2 )
{
   return( _stricmp( * (char**)arg1, * (char**)arg2 ) );
}
```

```
wordlist before _lsearch: hello thanks bye
wordlist after _lsearch: hello thanks bye extra
```

## See also

[Searching and sorting](https://learn.microsoft.com/en-us/cpp/c-runtime-library/searching-and-sorting?view=msvc-170)  
[`bsearch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/bsearch?view=msvc-170)  
[`_lfind`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lfind?view=msvc-170)  
[`_lsearch_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lsearch-s?view=msvc-170)