---
title: "not"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/not?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
An alternative to the **`!`** operator.

## Syntax

```
#define not !
```

## Remarks

The macro yields the operator **`!`**.

## Example

```
// iso646_not.cpp
// compile with: /EHsc
#include <iostream>
#include <iso646.h>

int main( )
{
   using namespace std;
   int a = 0;

   if (!a)
      cout << "a is zero" << endl;

   if (not(a))
      cout << "a is zero" << endl;
}
```

```
a is zero
a is zero
```

## Requirements

**Header:** <iso646.h>