---
title: "memcpy, wmemcpy"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memcpy-wmemcpy?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Copies bytes between buffers. More secure versions of these functions are available; see [`memcpy_s`, `wmemcpy_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memcpy-s-wmemcpy-s?view=msvc-170).

## Syntax

```
void *memcpy(
   void *dest,
   const void *src,
   size_t count
);
wchar_t *wmemcpy(
   wchar_t *dest,
   const wchar_t *src,
   size_t count
);
```

### Parameters

_`dest`_  
New buffer.

_`src`_  
Buffer to copy from.

_`count`_  
Number of characters to copy.

## Return value

The value of _`dest`_.

**`memcpy`** copies _`count`_ bytes from _`src`_ to _`dest`_; **`wmemcpy`** copies _`count`_ wide characters. If the source and destination regions overlap, the behavior of **`memcpy`** is undefined. Use **`memmove`** to handle overlapping regions.

Important

Make sure that the destination buffer is large enough to accommodate the number of copied characters. For more information, see [Avoiding buffer overruns](https://learn.microsoft.com/en-us/windows/win32/SecBP/avoiding-buffer-overruns).

Important

Because so many buffer overruns, and thus potential security exploits, have been traced to improper usage of **`memcpy`**, this function is listed among the "banned" functions by the Security Development Lifecycle (SDL). You may observe that some VC++ library classes continue to use **`memcpy`**. Furthermore, you may observe that the VC++ compiler optimizer sometimes emits calls to **`memcpy`**. The Visual C++ product is developed in accordance with the SDL process, and thus usage of this banned function has been closely evaluated. In the case of library use of it, the calls have been carefully scrutinized to ensure that buffer overruns will not be allowed through these calls. In the case of the compiler, sometimes certain code patterns are recognized as identical to the pattern of **`memcpy`**, and are thus replaced with a call to the function. In such cases, the use of **`memcpy`** is no more unsafe than the original instructions would have been; they have simply been optimized to a call to the performance-tuned **`memcpy`** function. Just as the use of "safe" CRT functions doesn't guarantee safety (they just make it harder to be unsafe), the use of "banned" functions doesn't guarantee danger (they just require greater scrutiny to ensure safety).

Because **`memcpy`** usage by the VC++ compiler and libraries has been so carefully scrutinized, these calls are permitted within code that otherwise conforms with the SDL. **`memcpy`** calls introduced in application source code only conform with the SDL when that use has been reviewed by security experts.

The **`memcpy`** and **`wmemcpy`** functions are only deprecated if the constant `_CRT_SECURE_DEPRECATE_MEMORY` is defined before the `#include` statement, as in the following examples:

```
#define _CRT_SECURE_DEPRECATE_MEMORY
#include <memory.h>
```

or

```
#define _CRT_SECURE_DEPRECATE_MEMORY
#include <wchar.h>
```

## Requirements

Routine

Required header

**`memcpy`**

`<memory.h>` or `<string.h>`

**`wmemcpy`**

`<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

See [`memmove`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memmove-wmemmove?view=msvc-170) for a sample of how to use **`memcpy`**.

## See also

[Buffer manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/buffer-manipulation?view=msvc-170)  
[`_memccpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memccpy?view=msvc-170)  
[`memchr`, `wmemchr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memchr-wmemchr?view=msvc-170)  
[`memcmp`, `wmemcmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memcmp-wmemcmp?view=msvc-170)  
[`memmove`, `wmemmove`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memmove-wmemmove?view=msvc-170)  
[`memset`, `wmemset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memset-wmemset?view=msvc-170)  
[`strcpy_s`, `wcscpy_s`, `_mbscpy_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcpy-s-wcscpy-s-mbscpy-s?view=msvc-170)  
[`strncpy_s`, `_strncpy_s_l`, `wcsncpy_s`, `_wcsncpy_s_l`, `_mbsncpy_s`, `_mbsncpy_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-s-strncpy-s-l-wcsncpy-s-wcsncpy-s-l-mbsncpy-s-mbsncpy-s-l?view=msvc-170)