---
title: "imaxabs"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/imaxabs?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates the absolute value of an integer of any size.

## Syntax

```
intmax_t imaxabs(
   intmax_t n
);
```

### Parameters

_`n`_  
Integer value.

## Return value

The **`imaxabs`** function returns the absolute value of the argument. There's no error return.

Note

Because the range of negative integers that can be represented by using `intmax_t` is larger than the range of positive integers that can be represented, it's possible to supply an argument to **`imaxabs`** that can't be converted. If the absolute value of the argument cannot be represented by the return type, the behavior of **`imaxabs`** is undefined.

## Requirements

Routine

Required header

**`imaxabs`**

<inttypes.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_imaxabs.c
// Build using: cl /W3 /Tc crt_imaxabs.c
// This example calls imaxabs to compute an
// absolute value, then displays the results.

#include <stdio.h>
#include <stdlib.h>
#include <inttypes.h>

int main(int argc, char *argv[])
{
   intmax_t x = LLONG_MIN + 2;

   printf("The absolute value of %lld is %lld\n", x, imaxabs(x));
}
```

```
The absolute value of -9223372036854775806 is 9223372036854775806
```

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`abs`, `labs`, `llabs`, `_abs64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abs-labs-llabs-abs64?view=msvc-170)  
[`_cabs`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cabs?view=msvc-170)  
[`fabs`, `fabsf`, `fabsl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fabs-fabsf-fabsl?view=msvc-170)