---
title: "qsort"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/qsort?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Performs a quick sort. A more secure version of this function is available; see [`qsort_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/qsort-s?view=msvc-170).

## Syntax

```
void qsort(
   void *base,
   size_t number,
   size_t width,
   int (__cdecl *compare )(const void *, const void *)
);
```

### Parameters

_`base`_  
Start of target array.

_`number`_  
Array size in elements.

_`width`_  
Element size in bytes.

_`compare`_  
Pointer to a user-supplied routine that compares two array elements and returns a value that specifies their relationship.

The **`qsort`** function implements a quick-sort algorithm to sort an array of _`number`_ elements, each of _`width`_ bytes. The argument _`base`_ is a pointer to the base of the array to be sorted. **`qsort`** overwrites this array by using the sorted elements.

**`qsort`** calls the _`compare`_ routine one or more times during the sort, and passes pointers to two array elements on each call. If _`compare`_ indicates two elements are the same, their order in the resulting sorted array is unspecified.

```
compare(const void *elem1, const void *elem2);
```

The routine compares the elements and returns one of the following values.

Compare function return value

Description

< 0

**`elem1`** less than **`elem2`**

0

**`elem1`** equivalent to **`elem2`**

\> 0

**`elem1`** greater than **`elem2`**

The array is sorted in increasing order, as defined by the comparison function. To sort an array in decreasing order, reverse the sense of "greater than" and "less than" in the comparison function.

This function validates its parameters. If _`compare`_ or _`number`_ is `NULL`, or if _`base`_ is `NULL` and _`number`_ is nonzero, or if _`width`_ is less than zero, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the function returns, and `errno` is set to `EINVAL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`qsort`**

`<stdlib.h>` and `<search.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_qsort.c
// arguments: every good boy deserves favor

/* This program reads the command-line
* parameters and uses qsort to sort them. It
* then displays the sorted arguments.
*/

#include <stdlib.h>
#include <string.h>
#include <stdio.h>

int compare( const void *arg1, const void *arg2 );

int main( int argc, char **argv )
{
   int i;
   /* Eliminate argv[0] from sort: */
   argv++;
   argc--;

   /* Sort remaining args using Quicksort algorithm: */
   qsort( (void *)argv, (size_t)argc, sizeof( char * ), compare );

   /* Output sorted list: */
   for( i = 0; i < argc; ++i )
      printf( " %s", argv[i] );
   printf( "\n" );
}

int compare( const void *arg1, const void *arg2 )
{
   /* Compare all of both strings: */
   return _stricmp( * ( char** ) arg1, * ( char** ) arg2 );
}
```

```
boy deserves every favor good
```

## See also

[Searching and sorting](https://learn.microsoft.com/en-us/cpp/c-runtime-library/searching-and-sorting?view=msvc-170)  
[`bsearch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/bsearch?view=msvc-170)  
[`_lsearch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lsearch?view=msvc-170)