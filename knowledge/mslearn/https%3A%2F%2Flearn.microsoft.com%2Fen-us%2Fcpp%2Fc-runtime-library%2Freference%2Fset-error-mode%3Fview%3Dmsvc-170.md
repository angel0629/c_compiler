---
title: "_set_error_mode"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-error-mode?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Modifies `__error_mode` to determine a non-default location where the C runtime writes an error message for an error that might end the program.

## Syntax

```
int _set_error_mode(
   int mode_val
);
```

### Parameters

_`mode_val`_  
Destination of error messages.

## Return value

Returns the old setting or -1 if an error occurs.

Controls the error output sink by setting the value of `__error_mode`. For example, you can direct output to a standard error or use the `MessageBox` API.

The _`mode_val`_ parameter can be set to one of the following values.

Value

Description

`_OUT_TO_DEFAULT`

Error sink is determined by `__app_type`.

`_OUT_TO_STDERR`

Error sink is a standard error.

`_OUT_TO_MSGBOX`

Error sink is a message box.

`_REPORT_ERRMODE`

Report the current `__error_mode` value.

If a value is passed in other than the listed ones, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, **`_set_error_mode`** sets `errno` to `EINVAL` and returns -1.

When it's used with an [`assert`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-macro-assert-wassert?view=msvc-170), **`_set_error_mode`** displays the statement that failed in the dialog box, and gives you the option of choosing the **Ignore** button, so that you can continue to run the program.

## Requirements

Routine

Required header

**`_set_error_mode`**

<stdlib.h>

## Example

```
// crt_set_error_mode.c

#include <stdlib.h>
#include <assert.h>

int main()
{
   _set_error_mode(_OUT_TO_STDERR);
   assert(2+2==5);
}
```

```
Assertion failed: 2+2==5, file crt_set_error_mode.c, line 8

This application has requested the Runtime to terminate it in an unusual way.
Please contact the application's support team for more information.
```

## See also

[assert Macro, \_assert, \_wassert](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-macro-assert-wassert?view=msvc-170)