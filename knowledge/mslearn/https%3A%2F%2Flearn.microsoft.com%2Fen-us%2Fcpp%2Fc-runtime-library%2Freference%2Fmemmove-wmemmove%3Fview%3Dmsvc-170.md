---
title: "memmove, wmemmove"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memmove-wmemmove?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Moves one buffer to another. More secure versions of these functions are available; see [`memmove_s`, `wmemmove_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memmove-s-wmemmove-s?view=msvc-170).

## Syntax

```
void *memmove(
   void *dest,
   const void *src,
   size_t count
);
wchar_t *wmemmove(
   wchar_t *dest,
   const wchar_t *src,
   size_t count
);
```

### Parameters

_`dest`_  
Destination object.

_`src`_  
Source object.

_`count`_  
Number of bytes (**`memmove`**) or characters (**`wmemmove`**) to copy.

## Return value

The value of _`dest`_.

Copies _`count`_ bytes (**`memmove`**) or characters (**`wmemmove`**) from _`src`_ to _`dest`_. If some portions of the source and the destination regions overlap, both functions ensure that the original source bytes in the overlapping region are copied before being overwritten.

**Security Note** Make sure that the destination buffer is large enough to accommodate the number of moved characters. For more information, see [Avoiding buffer overruns](https://learn.microsoft.com/en-us/windows/win32/SecBP/avoiding-buffer-overruns).

The **`memmove`** and **`wmemmove`** functions are only deprecated if the constant `_CRT_SECURE_DEPRECATE_MEMORY` is defined before the `#include` statement, as shown in the following example:

```
#define _CRT_SECURE_DEPRECATE_MEMORY
#include <string.h>
```

or

```
#define _CRT_SECURE_DEPRECATE_MEMORY
#include <wchar.h>
```

## Requirements

Routine

Required header

**`memmove`**

`<string.h>`

**`wmemmove`**

`<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_memcpy.c
// Illustrate overlapping copy: memmove
// always handles it correctly; memcpy may handle
// it correctly.
//

#include <memory.h>
#include <string.h>
#include <stdio.h>

char str1[7] = "aabbcc";

int main( void )
{
   printf( "The string: %s\n", str1 );
   memcpy( str1 + 2, str1, 4 );
   printf( "New string: %s\n", str1 );

   strcpy_s( str1, sizeof(str1), "aabbcc" );   // reset string

   printf( "The string: %s\n", str1 );
   memmove( str1 + 2, str1, 4 );
   printf( "New string: %s\n", str1 );
}
```

```
The string: aabbcc
New string: aaaabb
The string: aabbcc
New string: aaaabb
```

## See also

[Buffer manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/buffer-manipulation?view=msvc-170)  
[`_memccpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memccpy?view=msvc-170)  
[`memcpy`, `wmemcpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memcpy-wmemcpy?view=msvc-170)  
[`strcpy`, `wcscpy`, `_mbscpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcpy-wcscpy-mbscpy?view=msvc-170)  
[`strncpy`, `_strncpy_l`, `wcsncpy`, `_wcsncpy_l`, `_mbsncpy`, `_mbsncpy_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-strncpy-l-wcsncpy-wcsncpy-l-mbsncpy-mbsncpy-l?view=msvc-170)