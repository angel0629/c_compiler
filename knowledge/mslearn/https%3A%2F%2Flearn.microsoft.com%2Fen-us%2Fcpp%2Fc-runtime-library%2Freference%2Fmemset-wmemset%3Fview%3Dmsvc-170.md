---
title: "memset, wmemset"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memset-wmemset?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Sets a buffer to a specified character.

## Syntax

```
void *memset(
   void *dest,
   int c,
   size_t count
);
wchar_t *wmemset(
   wchar_t *dest,
   wchar_t c,
   size_t count
);
```

### Parameters

_`dest`_  
Pointer to destination.

_`c`_  
Character to set.

_`count`_  
Number of characters.

## Return value

The value of _`dest`_.

Sets the first _`count`_ characters of _`dest`_ to the character _`c`_.

**Security Note** Make sure that the destination buffer has enough room for at least _`count`_ characters. For more information, see [Avoiding buffer overruns](https://learn.microsoft.com/en-us/windows/win32/SecBP/avoiding-buffer-overruns).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`memset`**

`<memory.h>` or `<string.h>`

**`wmemset`**

`<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_memset.c
/* This program uses memset to
* set the first four chars of buffer to "*".
*/

#include <memory.h>
#include <stdio.h>

int main( void )
{
   char buffer[] = "This is a test of the memset function";

   printf( "Before: %s\n", buffer );
   memset( buffer, '*', 4 );
   printf( "After:  %s\n", buffer );
}
```

The example produces this output:

```
Before: This is a test of the memset function
After:  **** is a test of the memset function
```

Here's an example of the use of `wmemset`:

```
// crt_wmemset.c
/* This program uses memset to
* set the first four chars of buffer to "*".
*/

#include <wchar.h>
#include <stdio.h>

int main( void )
{
   wchar_t buffer[] = L"This is a test of the wmemset function";

   wprintf( L"Before: %s\n", buffer );
   wmemset( buffer, L'*', 4 );
   wprintf( L"After:  %s\n", buffer );
}
```

The example produces this output:

```
Before: This is a test of the wmemset function
After:  **** is a test of the wmemset function
```

## See also

[Buffer manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/buffer-manipulation?view=msvc-170)  
[`_memccpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memccpy?view=msvc-170)  
[`memchr`, `wmemchr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memchr-wmemchr?view=msvc-170)  
[`memcmp`, `wmemcmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memcmp-wmemcmp?view=msvc-170)  
[`memcpy`, `wmemcpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memcpy-wmemcpy?view=msvc-170)  
[`_strnset`, `_strnset_l`, `_wcsnset`, `_wcsnset_l`, `_mbsnset`, `_mbsnset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnset-strnset-l-wcsnset-wcsnset-l-mbsnset-mbsnset-l?view=msvc-170)