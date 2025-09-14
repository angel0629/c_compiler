---
title: "bitor"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/bitor?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
An alternative to the `|` operator.

## Syntax

```
#define bitor |
```

## Remarks

The macro yields the operator `|`.

## Example

```
// iso646_bitor.cpp
// compile with: /EHsc
#include <iostream>
#include <iso646.h>

int main( )
{
   using namespace std;
   int a = 1, b = 2, result;

   result = a | b;
   cout << result << endl;

   result= a bitor b;
   cout << result << endl;
}
```

```
3
3
```

## Requirements

**Header:** <iso646.h>