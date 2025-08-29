---
title: "_get_output_format"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/get-output-format?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets the current value of the output format flag.

Important

This function is obsolete. Beginning in Visual Studio 2015, it is not available in the CRT.

## Syntax

```
unsigned int _get_output_format();
```

## Return value

The current value of the output format flag.

## Remarks

The output format flag controls features of formatted I/O. The flag has two possible values: 0 and `_TWO_DIGIT_EXPONENT`. If `_TWO_DIGIT_EXPONENT` is set, the floating point number is printed with only two digits in the exponent unless a third digit is required by the size of the exponent. If the flag is zero, the floating point output displays three digits of exponent, using zeroes if necessary to pad the value to three digits.

## Requirements

Routine

Required header

**`_get_output_format`**

<stdio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170) in the Introduction.

## See also

[Format specification syntax: `printf` and `wprintf` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-syntax-printf-and-wprintf-functions?view=msvc-170)  
[`printf`, `_printf_l`, `wprintf`, `_wprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170)  
[`printf_s`, `_printf_s_l`, `wprintf_s`, `_wprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-s-printf-s-l-wprintf-s-wprintf-s-l?view=msvc-170)  
[`_set_output_format`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/set-output-format?view=msvc-170)