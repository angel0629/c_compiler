---
title: "_set_output_format"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/set-output-format?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Customizes output formats used by formatted I/O functions.

Important

This function is obsolete. Beginning in Visual Studio 2015, it is not available in the CRT.

## Syntax

```
unsigned int _set_output_format(
   unsigned int format
);
```

#### Parameters

_`format`_  
\[in\] An value representing the format to use.

## Return value

The previous output format.

**`_set_output_format`** is used to configure the output of formatted I/O functions such as [`printf_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-s-printf-s-l-wprintf-s-wprintf-s-l?view=msvc-170). The only formatting convention that can be changed by this function is the number of digits displayed in exponents in the output of floating point numbers.

By default, the output of floating point numbers by functions such as `printf_s`, `wprintf_s`, and related functions in the Visual C++ Standard C library prints three digits for the exponent, even if three digits aren't required to represent the value of the exponent. Zeroes are used to pad the value to three digits. **`_set_output_format`** allows you to change this behavior so that only two digits are printed in the exponent unless a third digit is required by the size of the exponent.

To enable two-digit exponents, call this function with the parameter `_TWO_DIGIT_EXPONENT`, as shown in the example. To disable two digit exponents, call this function with an argument of 0.

## Requirements

Routine

Required header

**`_set_output_format`**

<stdio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170) in the Introduction.

## Example

```
// crt_set_output_format.c
#include <stdio.h>

void printvalues(double x, double y)
{
   printf_s("%11.4e %11.4e\n", x, y);
   printf_s("%11.4E %11.4E\n", x, y);
   printf_s("%11.4g %11.4g\n", x, y);
   printf_s("%11.4G %11.4G\n", x, y);
}

int main()
{
   double x = 1.211E-5;
   double y = 2.3056E-112;
   unsigned int old_exponent_format;

   // Use the default format
   printvalues(x, y);

   // Enable two-digit exponent format
   old_exponent_format = _set_output_format(_TWO_DIGIT_EXPONENT);

   printvalues(x, y);

   // Disable two-digit exponent format
   _set_output_format( old_exponent_format );

   printvalues(x, y);
}
```

```
1.2110e-005 2.3056e-112
1.2110E-005 2.3056E-112
1.211e-005  2.306e-112
1.211E-005  2.306E-112
1.2110e-05 2.3056e-112
1.2110E-05 2.3056E-112
  1.211e-05  2.306e-112
  1.211E-05  2.306E-112
1.2110e-005 2.3056e-112
1.2110E-005 2.3056E-112
1.211e-005  2.306e-112
1.211E-005  2.306E-112
```

## See also

[`printf_s`, `_printf_s_l`, `wprintf_s`, `_wprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-s-printf-s-l-wprintf-s-wprintf-s-l?view=msvc-170)  
[`_get_output_format`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/get-output-format?view=msvc-170)