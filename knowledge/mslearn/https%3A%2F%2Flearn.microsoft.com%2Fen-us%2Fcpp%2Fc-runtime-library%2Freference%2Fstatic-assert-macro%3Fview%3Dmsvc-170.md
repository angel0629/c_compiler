---
title: "_STATIC_ASSERT Macro"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/static-assert-macro?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Evaluate an expression at compile time and generate an error when the result is `FALSE`.

## Syntax

```
_STATIC_ASSERT(
    booleanExpression
);
```

### Parameters

_`booleanExpression`_  
Expression (including pointers) that evaluates to nonzero (`TRUE`) or 0 (`FALSE`).

## Remarks

This macro resembles the [`_ASSERT` and `_ASSERTE` macros](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-asserte-assert-expr-macros?view=msvc-170), except that _`booleanExpression`_ is evaluated at compile time instead of at runtime. If _`booleanExpression`_ evaluates to `FALSE` (0), [Compiler Error C2466](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-errors-1/compiler-error-c2466?view=msvc-170) is generated.

## Example

In this example, we check whether the [`sizeof`](https://learn.microsoft.com/en-us/cpp/c-language/sizeof-operator-c?view=msvc-170) an **`int`** is larger than or equal to 2 bytes and whether the [`sizeof`](https://learn.microsoft.com/en-us/cpp/c-language/sizeof-operator-c?view=msvc-170) a **`long`** is 1 byte. The program won't compile and it will generate [Compiler Error C2466](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-errors-1/compiler-error-c2466?view=msvc-170) because a **`long`** is larger than 1 byte.

```
// crt__static_assert.c

#include <crtdbg.h>
#include <stdio.h>

_STATIC_ASSERT(sizeof(int) >= 2);
_STATIC_ASSERT(sizeof(long) == 1);  // C2466

int main()
{
    printf("I am sure that sizeof(int) will be >= 2: %d\n",
        sizeof(int));
    printf("I am not so sure that sizeof(long) == 1: %d\n",
        sizeof(long));
}
```

## Requirements

Macro

Required header

**`_STATIC_ASSERT`**

<crtdbg.h>

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)  
[`_ASSERT`, `_ASSERTE`, `_ASSERT_EXPR` macros](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-asserte-assert-expr-macros?view=msvc-170)