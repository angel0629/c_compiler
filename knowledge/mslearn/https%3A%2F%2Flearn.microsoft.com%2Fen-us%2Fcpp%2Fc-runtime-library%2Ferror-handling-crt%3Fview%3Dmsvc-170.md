---
title: "Error handling (CRT)"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/error-handling-crt?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Use these routines to handle program errors.

## Error-handling routines

Routine

Use

[`assert`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-macro-assert-wassert?view=msvc-170) macro

Test for programming logic errors; available in both the release and debug versions of the run-time library.

[`_ASSERT`, `_ASSERTE`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-asserte-assert-expr-macros?view=msvc-170) macros

Similar to `assert`, but only available in the debug versions of the run-time library.

[`clearerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clearerr?view=msvc-170)

Reset error indicator. Calling `rewind` or closing a stream also resets the error indicator.

[`_eof`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/eof?view=msvc-170)

Check for end of file in low-level I/O.

[`feof`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feof?view=msvc-170)

Test for end of file. End of file is also indicated when `_read` returns 0.

[`ferror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ferror?view=msvc-170)

Test for stream I/O errors.

[`_RPT`, `_RPTF`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rpt-rptf-rptw-rptfw-macros?view=msvc-170) macros

Generate a report similar to `printf`, but only available in the debug versions of the run-time library.

[`_set_error_mode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-error-mode?view=msvc-170)

Modifies `__error_mode` to determine a non-default location where the C run time writes an error message for an error that will possibly end the program.

[`_set_purecall_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-purecall-handler-set-purecall-handler?view=msvc-170)

Sets the handler for a pure virtual function call.

## See also

*   [Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)