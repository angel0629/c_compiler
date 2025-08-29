---
title: "nextafter, nextafterf, nextafterl, _nextafter, _nextafterf, nexttoward, nexttowardf, nexttowardl"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/nextafter-functions?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns the next representable floating-point value.

## Syntax

```
double nextafter( double x, double y );
float nextafterf( float x, float y );
long double nextafterl( long double x, long double y );

double _nextafter( double x, double y );
float _nextafterf( float x, float y ); /* x64 only */

#define nextafter(X, Y) // Requires C11 or later

double nexttoward( double x, long double y );
float nexttowardf( float x, long double y );
long double nexttowardl( long double x, long double y );

#define nexttoward(X, Y) // Requires C11 or later

float nextafter( float x, float y ); /* C++ only, requires <cmath> */
long double nextafter( long double x, long double y ); /* C++ only, requires <cmath> */

float nexttoward( float x, long double y ); /* C++ only, requires <cmath> */
long double nexttoward( long double x, long double y ); /* C++ only, requires <cmath> */
```

### Parameters

_`x`_  
The floating-point value to start from.

_`y`_  
The floating-point value to go towards.

## Return value

Returns the next representable floating-point value of the return type after _`x`_ in the direction of _`y`_. If _`x`_ and _`y`_ are equal, the function returns _`y`_, converted to the return type, with no exception triggered. If _`x`_ isn't equal to _`y`_, and the result is a denormal or zero, the `FE_UNDERFLOW` and `FE_INEXACT` floating-point exception states are set, and the correct result is returned. If either _`x`_ or _`y`_ is a NAN, then the return value is one of the input NANs. If _`x`_ is finite and the result is infinite or not representable in the type, a correctly signed infinity or NAN is returned, the `FE_OVERFLOW` and `FE_INEXACT` floating-point exception states are set, and `errno` is set to `ERANGE`.

The **`nextafter`** and **`nexttoward`** function families are equivalent, except for the parameter type of _`y`_. If _`x`_ and _`y`_ are equal, the value returned is _`y`_ converted to the return type.

Because C++ allows overloading, if you include `<cmath>` you can call overloads of **`nextafter`** and **`nexttoward`** that return **`float`** and **`long double`** types. In a C program, unless you're using the `<tgmath.h>` macro to call this function, **`nextafter`** and **`nexttoward`** always return **`double`**.

If you use the `nextafter` or `nexttoward` macro from `<tgmath.h>`, the type of the argument determines which version of the function is selected. See [Type-generic math](https://learn.microsoft.com/en-us/cpp/c-runtime-library/tgmath?view=msvc-170) for details.

The **`_nextafter`** and **`_nextafterf`** functions are Microsoft-specific. The **`_nextafterf`** function is only available when compiling for x64.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header (C)

Required header (C++)

**`nextafter`**, **`nextafterf`**, **`nextafterl`**, **`_nextafterf`**, **`nexttoward`**, **`nexttowardf`**, **`nexttowardl`**

`<math.h>`

`<math.h>` or `<cmath>`

**`_nextafter`**

`<float.h>`

`<float.h>` or `<cfloat>`

**`nextafter`** macro, **`nexttoward`** macro

`<tgmath.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`isnan`, `_isnan`, `_isnanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isnan-isnan-isnanf?view=msvc-170)