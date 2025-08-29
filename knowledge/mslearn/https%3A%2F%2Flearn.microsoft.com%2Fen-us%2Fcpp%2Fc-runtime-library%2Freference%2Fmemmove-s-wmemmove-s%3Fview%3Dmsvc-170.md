---
title: "memmove_s, wmemmove_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memmove-s-wmemmove-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Moves one buffer to another. These functions are versions of [`memmove`, `wmemmove`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memmove-wmemmove?view=msvc-170) with security enhancements as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t memmove_s(
   void *dest,
   size_t numberOfElements,
   const void *src,
   size_t count
);
errno_t wmemmove_s(
   wchar_t *dest,
   size_t numberOfElements,
   const wchar_t *src,
   size_t count
);
```

### Parameters

_`dest`_  
Destination object.

_`numberOfElements`_  
Size of the destination buffer.

_`src`_  
Source object.

_`count`_  
Number of bytes (**`memmove_s`**) or characters (**`wmemmove_s`**) to copy.

## Return value

Zero if successful; an error code on failure

### Error conditions

_`dest`_

_`numberOfElements`_

_`src`_

Return value

Contents of _`dest`_

`NULL`

any

any

`EINVAL`

not modified

any

any

`NULL`

`EINVAL`

not modified

any

< _`count`_

any

`ERANGE`

not modified

Copies _`count`_ bytes of characters from _`src`_ to _`dest`_. If some portions of the source and the destination regions overlap, **`memmove_s`** ensures that the original source bytes in the overlapping region are copied before being overwritten.

If _`dest`_ or if _`src`_ is a null pointer, or if the destination string is too small, these functions invoke an invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170) . If execution is allowed to continue, these functions return `EINVAL` and set `errno` to `EINVAL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`memmove_s`**

<string.h>

**`wmemmove_s`**

<wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_memmove_s.c
//
// The program demonstrates the
// memmove_s function which works as expected
// for moving overlapping regions.

#include <stdio.h>
#include <string.h>

int main()
{
   char str[] = "0123456789";

   printf("Before: %s\n", str);

   // Move six bytes from the start of the string
   // to a new position shifted by one byte. To protect against
   // buffer overrun, the secure version of memmove requires the
   // the length of the destination string to be specified.

   memmove_s((str + 1), strnlen(str + 1, 10), str, 6);

   printf_s(" After: %s\n", str);
}
```

### Output

```
Before: 0123456789
After: 0012345789
```

## See also

[Buffer manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/buffer-manipulation?view=msvc-170)  
[`_memccpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memccpy?view=msvc-170)  
[`memcpy`, `wmemcpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memcpy-wmemcpy?view=msvc-170)  
[`strcpy_s`, `wcscpy_s`, `_mbscpy_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcpy-s-wcscpy-s-mbscpy-s?view=msvc-170)  
[`strcpy`, `wcscpy`, `_mbscpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcpy-wcscpy-mbscpy?view=msvc-170)  
[`strncpy_s`, `_strncpy_s_l`, `wcsncpy_s`, `_wcsncpy_s_l`, `_mbsncpy_s`, `_mbsncpy_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-s-strncpy-s-l-wcsncpy-s-wcsncpy-s-l-mbsncpy-s-mbsncpy-s-l?view=msvc-170)  
[`strncpy`, `_strncpy_l`, `wcsncpy`, `_wcsncpy_l`, `_mbsncpy`, `_mbsncpy_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-strncpy-l-wcsncpy-wcsncpy-l-mbsncpy-mbsncpy-l?view=msvc-170)