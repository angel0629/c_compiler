---
title: "___mb_cur_max_func, ___mb_cur_max_l_func, __p___mb_cur_max, __mb_cur_max"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/mb-cur-max-func-mb-cur-max-l-func-p-mb-cur-max-mb-cur-max?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Internal CRT function. Retrieves the maximum number of bytes in a multibyte character for the current or specified locale.

## Syntax

```
int ___mb_cur_max_func(void);
int ___mb_cur_max_l_func(_locale_t locale);
int * __p___mb_cur_max(void);
#define __mb_cur_max (___mb_cur_max_func())
```

#### Parameters

_`locale`_  
The locale structure to retrieve the result from. If this value is null, the current thread locale is used.

## Return value

The maximum number of bytes in a multibyte character for the current thread locale or the specified locale.

## Remarks

**`___mb_cur_max_func`** is an internal function that the CRT uses to retrieve the current value of the [`MB_CUR_MAX`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/mb-cur-max?view=msvc-170) macro from thread local storage. We recommend that you use the `MB_CUR_MAX` macro in your code for portability.

The **`__mb_cur_max`** macro is a convenient way to call the **`___mb_cur_max_func`** function. The **`__p___mb_cur_max`** function is defined for compatibility with Visual C++ 5.0 and earlier versions.

Internal CRT functions are implementation-specific and subject to change with each release. We don't recommend their use in your code.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`___mb_cur_max_func`**, **`___mb_cur_max_l_func`**, **`__p___mb_cur_max`**

<ctype.h>, <stdlib.h>

## See also

[`MB_CUR_MAX`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/mb-cur-max?view=msvc-170)