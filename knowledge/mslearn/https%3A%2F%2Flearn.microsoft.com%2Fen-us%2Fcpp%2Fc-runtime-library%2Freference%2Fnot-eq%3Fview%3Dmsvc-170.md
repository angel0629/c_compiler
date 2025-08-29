---
title: "not_eq"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/not-eq?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
An alternative spelling for the **`!=`** operator.

## Syntax

```
#define not_eq !=
```

## Remarks

C++:

*   **`not_eq`** can be used as alternative to **`!=`**. The [`/permissive-`](https://learn.microsoft.com/en-us/cpp/build/reference/permissive-standards-conformance?view=msvc-170) or [`/Za`](https://learn.microsoft.com/en-us/cpp/build/reference/za-ze-disable-language-extensions?view=msvc-170) compiler option is required.
*   Including `<iso646.h>` or `<ciso646>` is deprecated. You can use the alternative spelling without including any header files.
*   There's no alternative spelling for **`==`**.

C:

*   **`not_eq`** is an alternative spelling for **`!=`**. It is provided as a macro in `<iso646.h>`, which you must `#include`.
*   There's no alternative spelling for **`==`**.

## Example

```
// compile with: /EHsc
#include <iostream>
#include <iso646.h>

int main( )
{
   int x = 1, y = 2;
    
    // not_eq is available in C++ and C
    // This example is for C++, so no header file is needed to use not_eq
    // When compiling for C, #include <iso646.h> to use not_eq
    if (x not_eq y)
    {
        std::cout << "Not equal\n";
    }
}
```

```
Not equal
```

## Requirements

**Header:** `<iso646.h>` is necessary if you are compiling for C.