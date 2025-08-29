---
title: "_memccpy"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memccpy?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Copies characters from a buffer.

## Syntax

```
void *_memccpy(
   void *dest,
   const void *src,
   int c,
   size_t count
);
```

### Parameters

_`dest`_  
Pointer to the destination.

_`src`_  
Pointer to the source.

_`c`_  
Last character to copy.

_`count`_  
Number of characters.

## Return value

If the character _`c`_ is copied, **`_memccpy`** returns a pointer to the char in _`dest`_ that immediately follows the character. If _`c`_ isn't copied, it returns `NULL`.

The **`_memccpy`** function copies zero or more characters of _`src`_ to _`dest`_, halting when the character _`c`_ has been copied or when _`count`_ characters have been copied, whichever comes first.

**Security Note** Make sure that the destination buffer is the same size or larger than the source buffer. For more information, see [Avoiding buffer overruns](https://learn.microsoft.com/en-us/windows/win32/SecBP/avoiding-buffer-overruns).

## Requirements

Routine

Required header

**`_memccpy`**

<memory.h> or <string.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_memccpy.c

#include <memory.h>
#include <stdio.h>
#include <string.h>

char string1[60] = "The quick brown dog jumps over the lazy fox";

int main( void )
{
   char buffer[61];
   char *pdest;

   printf( "Function: _memccpy 60 characters or to character 's'\n" );
   printf( "Source: %s\n", string1 );
   pdest = _memccpy( buffer, string1, 's', 60 );
   *pdest = '\0';
   printf( "Result: %s\n", buffer );
   printf( "Length: %d characters\n", strlen( buffer ) );
}
```

### Output

```
Function: _memccpy 60 characters or to character 's'
Source: The quick brown dog jumps over the lazy fox
Result: The quick brown dog jumps
Length: 25 characters
```

## See also

[Buffer manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/buffer-manipulation?view=msvc-170)  
[`memchr`, `wmemchr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memchr-wmemchr?view=msvc-170)  
[`memcmp`, `wmemcmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memcmp-wmemcmp?view=msvc-170)  
[`memcpy`, `wmemcpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memcpy-wmemcpy?view=msvc-170)  
[`memset`, `wmemset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memset-wmemset?view=msvc-170)