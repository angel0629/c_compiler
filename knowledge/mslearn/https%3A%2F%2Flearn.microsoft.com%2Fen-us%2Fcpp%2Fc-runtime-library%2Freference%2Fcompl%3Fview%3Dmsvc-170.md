---
title: "compl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/compl?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
An alternative to the ~ operator.

## Syntax

```
#define compl ~
```

## Remarks

The macro yields the operator ~.

## Example

```
// iso646_compl.cpp
// compile with: /EHsc
#include <iostream>
#include <iso646.h>

int main( )
{
   using namespace std;
   int a = 1, result;

   result = ~a;
   cout << result << endl;

   result= compl(a);
   cout << result << endl;
}
```

```
-2
-2
```

## Requirements

**Header:** <iso646.h>