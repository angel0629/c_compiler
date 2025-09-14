---
title: "_rotl, _rotl64, _rotr, _rotr64"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rotl-rotl64-rotr-rotr64?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Rotates bits to the left (**`_rotl`**) or right (**`_rotr`**).

## Syntax

```
unsigned int _rotl(
   unsigned int value,
   int shift
);
unsigned __int64 _rotl64(
   unsigned __int64 value,
   int shift
);
unsigned int _rotr(
   unsigned int value,
   int shift
);
unsigned __int64 _rotr64(
   unsigned __int64 value,
   int shift
);
```

### Parameters

_`value`_  
Value to be rotated.

_`shift`_  
Number of bits to shift.

## Return value

The rotated value. There's no error return.

The **`_rotl`** and **`_rotr`** functions rotate the unsigned _`value`_ by _`shift`_ bits. **`_rotl`** rotates the value left. **`_rotr`** rotates the value right. Both functions wrap bits rotated off one end of _`value`_ to the other end.

## Requirements

Routine

Required header

**`_rotl`**, **`_rotl64`**

<stdlib.h>

**`_rotr`**, **`_rotr64`**

<stdlib.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_rot.c
/* This program shifts values to rotate an integer.
*/

#include <stdlib.h>
#include <stdio.h>

int main( void )
{
   unsigned val = 0x0fd93;
   __int64 val2 = 0x0101010101010101;

   printf( "0x%4.4x rotated left three times is 0x%4.4x\n",
           val, _rotl( val, 3 ) );
   printf( "0x%4.4x rotated right four times is 0x%4.4x\n",
           val, _rotr( val, 4 ) );

   printf( "%I64x rotated left three times is %I64x\n",
           val2, _rotl64( val2, 3 ) );
   printf( "%I64x rotated right four times is %I64x\n",
           val2, _rotr64( val2, 4 ) );
}
```

### Output

```
0xfd93 rotated left three times is 0x7ec98
0xfd93 rotated right four times is 0x30000fd9
101010101010101 rotated left three times is 808080808080808
101010101010101 rotated right four times is 1010101010101010
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`_lrotl`, `_lrotr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lrotl-lrotr?view=msvc-170)