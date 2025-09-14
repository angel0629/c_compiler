---
title: "_countof Macro"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/countof-macro?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Computes the number of elements in a statically allocated array.

## Syntax

```
#define _countof(array) (sizeof(array) / sizeof(array[0]))
```

### Parameters

_`array`_  
The name of an array.

## Return value

The number of elements in the array, expressed as a **`size_t`**.

**`_countof`** is implemented as a function-like preprocessor macro. The C++ version has extra template machinery to detect at compile time if a pointer is passed instead of a statically declared array.

Ensure that _`array`_ is actually an array, not a pointer. In C, **`_countof`** produces erroneous results if _`array`_ is a pointer. In C++, **`_countof`** fails to compile if _`array`_ is a pointer. An array passed as a parameter to a function _decays to a pointer_, which means that within the function, you can't use **`_countof`** to determine the extent of the array.

## Requirements

Macro

Required header

**`_countof`**

`<stdlib.h>`

## Example

```
// crt_countof.cpp
#define _UNICODE
#include <stdio.h>
#include <stdlib.h>
#include <tchar.h>

int main( void )
{
   _TCHAR arr[20], *p;
   printf( "sizeof(arr) = %zu bytes\n", sizeof(arr) );
   printf( "_countof(arr) = %zu elements\n", _countof(arr) );
   // In C++, the following line would generate a compile-time error:
   // printf( "%zu\n", _countof(p) ); // error C2784 (because p is a pointer)

   _tcscpy_s( arr, _countof(arr), _T("a string") );
   // unlike sizeof, _countof works here for both narrow- and wide-character strings
}
```

```
sizeof(arr) = 40 bytes
_countof(arr) = 20 elements
```

## See also

[`sizeof` Operator](https://learn.microsoft.com/en-us/cpp/cpp/sizeof-operator?view=msvc-170)