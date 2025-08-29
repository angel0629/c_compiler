---
title: "memcpy_s, wmemcpy_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memcpy-s-wmemcpy-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Copies bytes between buffers. These functions are versions of [`memcpy`, `wmemcpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memcpy-wmemcpy?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t memcpy_s(
   void *dest,
   size_t destSize,
   const void *src,
   size_t count
);
errno_t wmemcpy_s(
   wchar_t *dest,
   size_t destSize,
   const wchar_t *src,
   size_t count
);
```

### Parameters

_`dest`_  
New buffer.

_`destSize`_  
Size of the destination buffer, in bytes for `memcpy_s` and wide characters (`wchar_t`) for `wmemcpy_s`.

_`src`_  
Buffer to copy from.

_`count`_  
Number of characters to copy.

## Return value

Zero if successful; an error code on failure.

### Error conditions

_`dest`_

_`destSize`_

_`src`_

_`count`_

Return value

Contents of _`dest`_

any

any

any

0

0

Not modified

`NULL`

any

any

non-zero

`EINVAL`

Not modified

any

any

`NULL`

non-zero

`EINVAL`

_`dest`_ is zeroed out

any

< _`count`_

any

non-zero

`ERANGE`

_`dest`_ is zeroed out

**`memcpy_s`** copies _`count`_ bytes from _`src`_ to _`dest`_; **`wmemcpy_s`** copies _`count`_ wide characters. If the source and destination regions overlap, the behavior of **`memcpy_s`** is undefined. Use **`memmove_s`** to handle overlapping regions.

These functions validate their parameters. If _`count`_ is non-zero and _`dest`_ or _`src`_ is a null pointer, or _`destSize`_ is smaller than _`count`_, these functions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return `EINVAL` or `ERANGE`, and set `errno` to the return value.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`memcpy_s`**

`<memory.h>` or `<string.h>`

**`wmemcpy_s`**

`<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_memcpy_s.c
// Copy memory in a more secure way.

#include <memory.h>
#include <stdio.h>

int main()
{
   int a1[10], a2[100], i;
   errno_t err;

   // Populate a2 with squares of integers
   for (i = 0; i < 100; i++)
   {
      a2[i] = i*i;
   }

   // Tell memcpy_s to copy 10 ints (40 bytes), giving
   // the size of the a1 array (also 40 bytes).
   err = memcpy_s(a1, sizeof(a1), a2, 10 * sizeof (int) );
   if (err)
   {
      printf("Error executing memcpy_s.\n");
   }
   else
   {
     for (i = 0; i < 10; i++)
       printf("%d ", a1[i]);
   }
   printf("\n");
}
```

```
0 1 4 9 16 25 36 49 64 81
```

## See also

[Buffer manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/buffer-manipulation?view=msvc-170)  
[`_memccpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memccpy?view=msvc-170)  
[`memchr`, `wmemchr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memchr-wmemchr?view=msvc-170)  
[`memcmp`, `wmemcmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memcmp-wmemcmp?view=msvc-170)  
[`memmove`, `wmemmove`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memmove-wmemmove?view=msvc-170)  
[`memset`, `wmemset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memset-wmemset?view=msvc-170)  
[`strcpy`, `wcscpy`, `_mbscpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcpy-wcscpy-mbscpy?view=msvc-170)  
[`strncpy`, `_strncpy_l`, `wcsncpy`, `_wcsncpy_l`, `_mbsncpy`, `_mbsncpy_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-strncpy-l-wcsncpy-wcsncpy-l-mbsncpy-mbsncpy-l?view=msvc-170)  
[`strncpy_s`, `_strncpy_s_l`, `wcsncpy_s`, `_wcsncpy_s_l`, `_mbsncpy_s`, `_mbsncpy_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-s-strncpy-s-l-wcsncpy-s-wcsncpy-s-l-mbsncpy-s-mbsncpy-s-l?view=msvc-170)