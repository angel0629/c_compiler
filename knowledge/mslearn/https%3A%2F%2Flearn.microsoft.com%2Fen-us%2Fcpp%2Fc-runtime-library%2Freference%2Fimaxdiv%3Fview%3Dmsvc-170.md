---
title: "imaxdiv"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/imaxdiv?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Computes the quotient and the remainder of two integer values of any size as a single operation.

## Syntax

```
imaxdiv_t imaxdiv(
   intmax_t numer,
   intmax_t denom
);
```

### Parameters

_`numer`_  
The numerator.

_`denom`_  
The denominator.

## Return value

**`imaxdiv`**, called with arguments of type [`intmax_t`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170), returns a structure of type [`imaxdiv_t`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170) that comprises the quotient and the remainder.

The **`imaxdiv`** function divides _`numer`_ by _`denom`_ and thereby computes the quotient and the remainder. The `imaxdiv_t` structure contains the quotient, `intmax_t` `quot`, and the remainder, `intmax_t` **`rem`**. The sign of the quotient is the same as the sign of the mathematical quotient. Its absolute value is the largest integer that's less than the absolute value of the mathematical quotient. If the denominator is 0, the program terminates with an error message.

## Requirements

Routine

Required header

**`imaxdiv`**

<inttypes.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_imaxdiv.c
// Build using: cl /W3 /Tc crt_imaxdiv.c
// This example takes two integers as command-line
// arguments and calls imaxdiv to divide the first
// argument by the second, then displays the results.

#include <stdio.h>
#include <stdlib.h>
#include <inttypes.h>

int main(int argc, char *argv[])
{
   intmax_t x,y;
   imaxdiv_t div_result;

   x = atoll(argv[1]);
   y = atoll(argv[2]);

   printf("The call to imaxdiv(%lld, %lld)\n", x, y);
   div_result = imaxdiv(x, y);
   printf("results in a quotient of %lld, and a remainder of %lld\n\n",
          div_result.quot, div_result.rem);
}
```

When built and then called with command line parameters of `9460730470000000 8766`, the code generates this output:

```
The call to imaxdiv(9460730470000000, 8766)
results in a quotient of 1079252848505, and a remainder of 5170
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`div`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/div?view=msvc-170)  
[`ldiv`, `lldiv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/div?view=msvc-170)