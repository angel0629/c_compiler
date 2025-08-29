---
title: "_lrotl, _lrotr"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lrotl-lrotr?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Rotates bits to the left (**`_lrotl`**) or right (**`_lrotr`**).

## Syntax

```
unsigned long _lrotl( unsigned long value, int shift );
unsigned long _lrotr( unsigned long value, int shift );
```

### Parameters

_`value`_  
Value to be rotated.

_`shift`_  
Number of bits to shift _`value`_.

## Return value

Both functions return the rotated value. There's no error return.

The **`_lrotl`** and **`_lrotr`** functions rotate _`value`_ by _`shift`_ bits. **`_lrotl`** rotates the value left, toward more significant bits. **`_lrotr`** rotates the value right, toward less significant bits. Both functions wrap bits rotated off one end of _`value`_ to the other end.

## Requirements

Routine

Required header

**`_lrotl`**, **`_lrotr`**

<stdlib.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_lrot.c

#include <stdlib.h>
#include <stdio.h>

int main( void )
{
   unsigned long val = 0x0fac35791;

   printf( "0x%8.8lx rotated left eight bits is 0x%8.8lx\n",
            val, _lrotl( val, 8 ) );
   printf( "0x%8.8lx rotated right four bits is 0x%8.8lx\n",
            val, _lrotr( val, 4 ) );
}
```

```
0xfac35791 rotated left eight bits is 0xc35791fa
0xfac35791 rotated right four bits is 0x1fac3579
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`_rotl`, `_rotl64`, `_rotr`, `_rotr64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rotl-rotl64-rotr-rotr64?view=msvc-170)