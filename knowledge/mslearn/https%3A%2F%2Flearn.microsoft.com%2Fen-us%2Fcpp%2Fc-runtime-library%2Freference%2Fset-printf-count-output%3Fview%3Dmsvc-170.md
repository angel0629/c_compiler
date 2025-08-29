---
title: "_set_printf_count_output"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-printf-count-output?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Enable or disable support of the **%n** format in [`printf`, `_printf_l`, `wprintf`, `_wprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170)\-family functions.

## Syntax

```
int _set_printf_count_output(
   int enable
);
```

### Parameters

_`enable`_  
A non-zero value to enable **%n** support, 0 to disable **%n** support.

## Property value or return value

The state of **%n** support before calling this function: non-zero if **%n** support was enabled, 0 if it was disabled.

Because of security reasons, support for the **%n** format specifier is disabled by default in `printf` and all its variants. If **%n** is encountered in a `printf` format specification, the default behavior is to invoke the invalid parameter handler as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). Calling **`_set_printf_count_output`** with a non-zero argument will cause `printf`\-family functions to interpret **%n** as described in [Format specification syntax: `printf` and `wprintf` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-syntax-printf-and-wprintf-functions?view=msvc-170).

## Requirements

Routine

Required header

**`_set_printf_count_output`**

<stdio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_set_printf_count_output.c
#include <stdio.h>

int main()
{
   int e;
   int i;
   e = _set_printf_count_output( 1 );
   printf( "%%n support was %sabled.\n",
        e ? "en" : "dis" );
   printf( "%%n support is now %sabled.\n",
        _get_printf_count_output() ? "en" : "dis" );
   printf( "12345%n6789\n", &i ); // %n format should set i to 5
   printf( "i = %d\n", i );
}
```

```
%n support was disabled.
%n support is now enabled.
123456789
i = 5
```

## See also

[`_get_printf_count_output`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-printf-count-output?view=msvc-170)