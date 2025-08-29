---
title: "__min"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/min?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
A preprocessor macro that returns the smaller of two values.

## Syntax

```
#define __min(a,b) (((a) < (b)) ? (a) : (b))
```

### Parameters

_`a`_, _`b`_  
Values of any type that the **<** operator works on.

## Return value

The smaller of the two arguments.

The **`__min`** macro compares two values and returns the value of the smaller one. The arguments can be of any numeric data type, signed or unsigned. Both arguments and the return value must be of the same data type.

The argument returned is evaluated twice by the macro. Double evaluation can lead to unexpected results if the argument is an expression that alters its value when it's evaluated, such as `*p++`.

## Requirements

Routine

Required header

**`__min`**

<stdlib.h>

## Example

```
// crt_minmax.c

#include <stdlib.h>
#include <stdio.h>

int main( void )
{
   int a = 10;
   int b = 21;

   printf( "The larger of %d and %d is %d\n",  a, b, __max( a, b ) );
   printf( "The smaller of %d and %d is %d\n", a, b, __min( a, b ) );
}
```

```
The larger of 10 and 21 is 21
The smaller of 10 and 21 is 10
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`__max`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/max?view=msvc-170)