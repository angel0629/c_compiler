---
title: "_lsearch_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lsearch-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Performs a linear search for a value. A version of [`_lsearch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lsearch?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
void *_lsearch_s(
   const void *key,
   void *base,
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
Pointer to the base of array to be searched.

_`number`_  
Number of elements.

_`size`_  
Size of each array element in bytes.

_`compare`_  
Pointer to the comparison routine. The second parameter is a pointer to the key for search. The third parameter is a pointer to an array element to be compared with the key.

_`context`_  
A pointer to an object that might be accessed in the comparison function.

## Return value

If _`key`_ is found, **`_lsearch_s`** returns a pointer to the element of the array at _`base`_ that matches _`key`_. If _`key`_ isn't found, **`_lsearch_s`** returns a pointer to the newly added item at the end of the array.

If invalid parameters are passed to the function, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, then `errno` is set to `EINVAL` and the function returns `NULL`. For more information, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

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

The **`_lsearch_s`** function performs a linear search for the value _`key`_ in an array of _`number`_ elements, each of _`size`_ bytes. Unlike `bsearch_s`, **`_lsearch_s`** doesn't require the array to be sorted. If _`key`_ isn't found, then **`_lsearch_s`** adds it to the end of the array and increments _`number`_.

The _`compare`_ function is a pointer to a user-supplied routine that compares two array elements and returns a value specifying their relationship. The _`compare`_ function also takes the pointer to the context as the first argument. **`_lsearch_s`** calls _`compare`_ one or more times during the search, passing pointers to two array elements on each call. _`compare`_ must compare the elements and then return either nonzero (meaning the elements are different) or 0 (meaning the elements are identical).

The _`context`_ pointer can be useful if the searched data structure is part of an object and the _`compare`_ function needs to access members of the object. For example, code in the _`compare`_ function can cast the void pointer into the appropriate object type and access members of that object. The addition of the _`context`_ pointer makes **`_lsearch_s`** more secure because extra context can be used to avoid reentrancy bugs associated with using static variables to make data available to the _`compare`_ function.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_lsearch_s`**

<search.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Searching and sorting](https://learn.microsoft.com/en-us/cpp/c-runtime-library/searching-and-sorting?view=msvc-170)  
[`bsearch_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/bsearch-s?view=msvc-170)  
[`_lfind_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lfind-s?view=msvc-170)  
[`_lsearch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lsearch?view=msvc-170)