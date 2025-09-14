---
title: "errno, _doserrno, _sys_errlist, and _sys_nerr"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Global macros that hold error codes that are set during program execution, and string equivalents of the error codes for display.

## Syntax

```
#define errno   (*_errno())
#define _doserrno   (*__doserrno())
#define _sys_errlist (__sys_errlist())
#define _sys_nerr (*__sys_nerr())
```

Both **`errno`** and **`_doserrno`** are set to 0 by the runtime during program startup. **`errno`** is set on an error in a system-level call. Because **`errno`** holds the value for the last call that set it, this value may be changed by succeeding calls. Run-time library calls that set **`errno`** on an error don't clear **`errno`** on success. Always clear **`errno`** by calling `_set_errno(0)` immediately before a call that may set it, and check it immediately after the call.

On an error, **`errno`** isn't necessarily set to the same value as the error code returned by a system call. For I/O operations, **`_doserrno`** stores the operating-system error-code equivalents of **`errno`** codes. For most non-I/O operations, the value of **`_doserrno`** isn't set.

Each **`errno`** value is associated with an error message in **`_sys_errlist`** that can be printed by using one of the [`perror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/perror-wperror?view=msvc-170) functions, or stored in a string by using one of the [`strerror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strerror-strerror-wcserror-wcserror?view=msvc-170) or [`strerror_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strerror-s-strerror-s-wcserror-s-wcserror-s?view=msvc-170) functions. The `perror` and `strerror` functions use the **`_sys_errlist`** array and **`_sys_nerr`**—the number of elements in **`_sys_errlist`**—to process error information. Direct access to **`_sys_errlist`** and **`_sys_nerr`** is deprecated for code-security reasons. We recommend that you use the more secure, functional versions instead of the global macros, as shown here:

Global macro

Functional equivalents

**`_doserrno`**

[`_get_doserrno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-doserrno?view=msvc-170), [`_set_doserrno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-doserrno?view=msvc-170)

**`errno`**

[`_get_errno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-errno?view=msvc-170), [`_set_errno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-errno?view=msvc-170)

**`_sys_errlist`**, **`_sys_nerr`**

[`strerror_s`, `_strerror_s`, `_wcserror_s`, `__wcserror_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strerror-s-strerror-s-wcserror-s-wcserror-s?view=msvc-170)

Library math routines set **`errno`** by calling [`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170). To handle math errors differently, write your own routine according to the `_matherr` reference description and name it `_matherr`.

All **`errno`** values are predefined constants in `<errno.h>`, and are UNIX-compatible. Only `ERANGE`, `EILSEQ`, and `EDOM` are specified in the ISO C99 standard. For a complete list, see [`errno` constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-constants?view=msvc-170).

## Requirements

Global macro

Required header

Optional header

`errno`

`<errno.h>` or `<stdlib.h>`, `<cerrno>` or `<cstdlib>` (C++)

`_doserrno`, `_sys_errlist`, `_sys_nerr`

`<stdlib.h>`, `<cstdlib>` (C++)

`<errno.h>`, `<cerrno>` (C++)

The `_doserrno`, `_sys_errlist`, and `_sys_nerr` macros are Microsoft extensions. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Global variables](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-variables?view=msvc-170)  
[`errno` constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-constants?view=msvc-170)  
[`perror`, `_wperror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/perror-wperror?view=msvc-170)  
[`strerror`, `_strerror`, `_wcserror`, `__wcserror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strerror-strerror-wcserror-wcserror?view=msvc-170)  
[`strerror_s`, `_strerror_s`, `_wcserror_s`, `__wcserror_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strerror-s-strerror-s-wcserror-s-wcserror-s?view=msvc-170)  
[`_get_doserrno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-doserrno?view=msvc-170)  
[`_set_doserrno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-doserrno?view=msvc-170)  
[`_get_errno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-errno?view=msvc-170)  
[`_set_errno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-errno?view=msvc-170)