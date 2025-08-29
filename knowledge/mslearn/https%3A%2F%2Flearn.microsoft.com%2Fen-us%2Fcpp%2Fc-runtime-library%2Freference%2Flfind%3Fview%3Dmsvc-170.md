---
title: "_lfind"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lfind?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Performs a linear search for the specified key. A more secure version of this function is available; see [`_lfind_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lfind-s?view=msvc-170).

## Syntax

```
void *_lfind(
   const void *key,
   const void *base,
   unsigned int *num,
   unsigned int width,
   int (__cdecl *compare)(const void *, const void *)
);
```

### Parameters

_`key`_  
Object to search for.

_`base`_  
Pointer to the base of search data.

_`number`_  
Number of array elements.

_`width`_  
Width of array elements.

_`compare`_  
Pointer to comparison routine. The first parameter is a pointer to key for search. The second parameter is a pointer to array element to be compared with key.

## Return value

If the key is found, **`_lfind`** returns a pointer to the element of the array at _`base`_ that matches _`key`_. If the key isn't found, **`_lfind`** returns `NULL`.

The **`_lfind`** function performs a linear search for the value _`key`_ in an array of _`number`_ elements, each of _`width`_ bytes. Unlike `bsearch`, **`_lfind`** doesn't require the array to be sorted. The _`base`_ argument is a pointer to the base of the array to be searched. The _`compare`_ argument is a pointer to a user-supplied routine that compares two array elements and then returns a value specifying their relationship. **`_lfind`** calls the _`compare`_ routine one or more times during the search, passing pointers to two array elements on each call. The _`compare`_ routine must compare the elements and then return nonzero (meaning the elements are different) or 0 (meaning the elements are identical).

This function validates its parameters. If _`compare`_, _`key`_ or _`number`_ is `NULL`, or if _`base`_ is `NULL` and _`number`_ is nonzero, or if _`width`_ is less than zero, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the function returns `NULL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_lfind`**

<search.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_lfind.c
// This program uses _lfind to search a string array
// for an occurrence of "hello".

#include <search.h>
#include <string.h>
#include <stdio.h>

int compare(const void *arg1, const void *arg2 )
{
   return( _stricmp( * (char**)arg1, * (char**)arg2 ) );
}

int main( )
{
   char *arr[] = {"Hi", "Hello", "Bye"};
   int n = sizeof(arr) / sizeof(char*);
   char **result;
   char *key = "hello";

   result = (char **)_lfind( &key, arr,
                      &n, sizeof(char *), compare );

   if( result )
      printf( "%s found\n", *result );
   else
      printf( "hello not found!\n" );
}
```

```
Hello found
```

## See also

[Searching and sorting](https://learn.microsoft.com/en-us/cpp/c-runtime-library/searching-and-sorting?view=msvc-170)  
[`_lfind_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lfind-s?view=msvc-170)  
[`bsearch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/bsearch?view=msvc-170)  
[`_lsearch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lsearch?view=msvc-170)  
[`qsort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/qsort?view=msvc-170)