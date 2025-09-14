---
title: "__max"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/max?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
A preprocessor macro that returns the larger of two values.

## Syntax

```
#define __max(a,b) (((a) > (b)) ? (a) : (b))
```

### Parameters

_`a`_, _`b`_  
Values of any numeric type to be compared.

## Return value

**`__max`** returns the larger of its arguments.

## Remarks

The **`__max`** macro compares two values and returns the value of the larger one. The arguments can be of any numeric data type, signed or unsigned. Both arguments and the return value must be of the same data type.

The argument returned is evaluated twice by the macro. Double evaluation can lead to unexpected results if the argument is an expression that alters its value when it's evaluated, such as `*p++`.

## Requirements

Macro

Required header

**`__max`**

<stdlib.h>

## Example

For more information, see the example for [`__min`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/min?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`__min`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/min?view=msvc-170)