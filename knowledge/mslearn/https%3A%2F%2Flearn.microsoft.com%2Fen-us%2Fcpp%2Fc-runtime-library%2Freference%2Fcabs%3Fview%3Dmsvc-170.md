---
title: "_cabs"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cabs?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Calculates the absolute value of a complex number.

## Syntax

```
double _cabs(
   struct _complex z
);
```

### Parameters

_`z`_  
Complex number.

## Return value

**`_cabs`** returns the absolute value of its argument if successful. On overflow, **`_cabs`** returns `HUGE_VAL` and sets `errno` to `ERANGE`. You can change error handling with [`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170).

The **`_cabs`** function calculates the absolute value of a complex number, which must be a structure of type [`_complex`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170). The structure _`z`_ is composed of a real component _`x`_ and an imaginary component _`y`_. A call to **`_cabs`** produces a value equivalent to that of the expression `sqrt( z.x * z.x + z.y * z.y )`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_cabs`**

<math.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_cabs.c
// Using _cabs, this program calculates
// the absolute value of a complex number.

#include <math.h>
#include <stdio.h>

int main( void )
{
   struct _complex number = { 3.0, 4.0 };
   double d;

   d = _cabs( number );
   printf( "The absolute value of %f + %fi is %f\n",
           number.x, number.y, d );
}
```

```
The absolute value of 3.000000 + 4.000000i is 5.000000
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`abs`, `labs`, `llabs`, `_abs64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abs-labs-llabs-abs64?view=msvc-170)  
[`fabs`, `fabsf`, `fabsl`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fabs-fabsf-fabsl?view=msvc-170)