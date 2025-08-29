---
title: "and_eq"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/and-eq?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
An alternative to the &= operator.

## Syntax

```
#define and_eq &=
```

## Remarks

The macro yields the operator &=.

## Example

```
// iso646_and_eq.cpp
// compile with: /EHsc
#include <iostream>
#include <iso646.h>

int main( )
{
   using namespace std;
   int a = 3, b = 2, result;

   result= a &= b;
   cout << result << endl;

   result= a and_eq b;
   cout << result << endl;
}
```

```
2
2
```

## Requirements

**Header:** <iso646.h>