---
title: "toascii, __toascii"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/toascii-toascii?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Converts characters to 7-bit ASCII by truncation.

## Syntax

```
int __toascii(
   int c
);
#define toascii __toascii
```

### Parameters

_`c`_  
Character to convert.

## Return value

**`__toascii`** converts the value of _`c`_ to the 7-bit ASCII range and returns the result. There's no return value reserved to indicate an error.

## Remarks

The **`__toascii`** routine converts the given character to an ASCII character by truncating it to the low-order 7 bits. No other transformation is applied.

The **`__toascii`** routine is defined as a macro unless the preprocessor macro `_CTYPE_DISABLE_MACROS` is defined. For backward compatibility, **`toascii`** is defined as a macro only when [`__STDC__`](https://learn.microsoft.com/en-us/cpp/preprocessor/predefined-macros?view=msvc-170) isn't defined or is defined as 0; otherwise it's undefined.

## Requirements

Routine

Required header

**`toascii`**, **`__toascii`**

C: <ctype.h>

C++: <cctype> or <ctype.h>

The **`toascii`** macro is a POSIX extension, and **`__toascii`** is a Microsoft-specific implementation of the POSIX extension. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)  
[`to` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/to-functions?view=msvc-170)