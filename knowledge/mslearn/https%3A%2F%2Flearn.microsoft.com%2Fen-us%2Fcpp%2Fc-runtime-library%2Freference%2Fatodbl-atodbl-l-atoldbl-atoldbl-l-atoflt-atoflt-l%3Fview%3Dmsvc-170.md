---
title: "_atodbl, _atodbl_l, _atoldbl, _atoldbl_l, _atoflt, _atoflt_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atodbl-atodbl-l-atoldbl-atoldbl-l-atoflt-atoflt-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts a string to a double (**`_atodbl`**), long double (**`_atoldbl`**), or float (**`_atoflt`**).

## Syntax

```
int _atodbl( _CRT_DOUBLE * value, char * str );
int _atodbl_l ( _CRT_DOUBLE * value, char * str, _locale_t locale );
int _atoldbl( _LDOUBLE * value, char * str );
int _atoldbl_l ( _LDOUBLE * value, char * str, _locale_t locale );
int _atoflt( _CRT_FLOAT * value, const char * str );
int _atoflt_l( _CRT_FLOAT * value, const char * str, _locale_t locale );
```

### Parameters

_`value`_  
The double, long double, or float value that's produced by converting the string to a floating-point value. These values are wrapped in a structure.

_`str`_  
The string to be parsed to convert into a floating-point value.

_`locale`_  
The locale to use.

## Return value

Returns 0 if successful. Possible error codes are `_UNDERFLOW` or `_OVERFLOW`, which are defined in the header file <math.h>.

These functions convert a string to a floating-point value. The difference between these functions and the `atof` family of functions is that these functions don't generate floating-point code and don't cause hardware exceptions. Instead, error conditions are reported as error codes.

If a string doesn't have a valid interpretation as a floating-point value, _`value`_ is set to zero, and the return value is zero.

The versions of these functions that have the `_l` suffix are identical the versions that don't have the suffix, except that they use the _`locale`_ parameter that's passed in instead of the current thread locale.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routines

Required header

**`_atodbl`**, **`_atoldbl`**, **`_atoflt`**

**`_atodbl_l`**, **`_atoldbl_l`**, **`_atoflt_l`**

<stdlib.h>

## Example

```
// crt_atodbl.c
// Uses _atodbl to convert a string to a double precision
// floating point value.

#include <stdlib.h>
#include <stdio.h>

int main()
{
   char str1[256] = "3.141592654";
   char abc[256] = "abc";
   char oflow[256] = "1.0E+5000";
   _CRT_DOUBLE dblval;
   _CRT_FLOAT fltval;
   int retval;

   retval = _atodbl(&dblval, str1);

   printf("Double value: %lf\n", dblval.x);
   printf("Return value: %d\n\n", retval);

   retval = _atoflt(&fltval, str1);
   printf("Float value: %f\n", fltval.f);
   printf("Return value: %d\n\n", retval);

   // A non-floating point value: returns 0.
   retval = _atoflt(&fltval, abc);
   printf("Float value: %f\n", fltval.f);
   printf("Return value: %d\n\n", retval);

   // Overflow.
   retval = _atoflt(&fltval, oflow);
   printf("Float value: %f\n", fltval.f);
   printf("Return value: %d\n\n", retval);

   return 0;
}
```

```
Double value: 3.141593
Return value: 0

Float value: 3.141593
Return value: 0

Float value: 0.000000
Return value: 0

Float value: inf
Return value: 3
```

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`atof`, `_atof_l`, `_wtof`, `_wtof_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atof-atof-l-wtof-wtof-l?view=msvc-170)