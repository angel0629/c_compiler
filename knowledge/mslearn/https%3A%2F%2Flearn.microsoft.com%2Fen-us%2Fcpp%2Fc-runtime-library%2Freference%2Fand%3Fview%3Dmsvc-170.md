---
title: "and"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/and?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
An alternative to the && operator.

## Syntax

```
#define and &&
```

## Remarks

The macro yields the operator &&.

## Example

```
// iso646_and.cpp
// compile with: /EHsc
#include <iostream>
#include <iso646.h>

int main( )
{
   using namespace std;
   bool a = true, b = false, result;

   boolalpha(cout);

   result= a && b;
   cout << result << endl;

   result= a and b;
   cout << result << endl;
}
```

```
false
false
```

## Requirements

**Header:** <iso646.h>