---
title: "vprintf Functions"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/vprintf-functions?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Each of the `vprintf` functions takes a pointer to an argument list, then formats and writes the given data to a particular destination. The functions differ in several ways: in the parameter validation, whether the functions take single-byte or wide character strings, the output destination, and the support for specifying the order parameters are used in the format string.

[`_vcprintf`, `_vcwprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vcprintf-vcprintf-l-vcwprintf-vcwprintf-l?view=msvc-170)  
[`vfprintf`, `vfwprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vfprintf-vfprintf-l-vfwprintf-vfwprintf-l?view=msvc-170)  
[`_vfprintf_p`, `_vfprintf_p_l`, `_vfwprintf_p`, `_vfwprintf_p_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vfprintf-p-vfprintf-p-l-vfwprintf-p-vfwprintf-p-l?view=msvc-170)  
[`vfprintf_s`, `_vfprintf_s_l`, `vfwprintf_s`, `_vfwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vfprintf-s-vfprintf-s-l-vfwprintf-s-vfwprintf-s-l?view=msvc-170)  
[`vprintf`, `vwprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vprintf-vprintf-l-vwprintf-vwprintf-l?view=msvc-170)  
[`_vprintf_p`, `_vprintf_p_l`, `_vwprintf_p`, `_vwprintf_p_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vprintf-p-vprintf-p-l-vwprintf-p-vwprintf-p-l?view=msvc-170)  
[`vprintf_s`, `_vprintf_s_l`, `vwprintf_s`, `_vwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vprintf-s-vprintf-s-l-vwprintf-s-vwprintf-s-l?view=msvc-170)  
[`_vscprintf`, `_vscprintf_l`, `_vscwprintf`, `_vscwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vscprintf-vscprintf-l-vscwprintf-vscwprintf-l?view=msvc-170)  
[`_vsnprintf`, `_vsnwprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsnprintf-vsnprintf-vsnprintf-l-vsnwprintf-vsnwprintf-l?view=msvc-170)  
[`vsprintf`, `vswprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsprintf-vsprintf-l-vswprintf-vswprintf-l-vswprintf-l?view=msvc-170)  
[`_vsprintf_p`, `_vsprintf_p_l`, `_vswprintf_p`, `_vswprintf_p_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsprintf-p-vsprintf-p-l-vswprintf-p-vswprintf-p-l?view=msvc-170)  
[`vsprintf_s`, `_vsprintf_s_l`, `vswprintf_s`, `_vswprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsprintf-s-vsprintf-s-l-vswprintf-s-vswprintf-s-l?view=msvc-170)

The `vprintf` functions are similar to their counterpart functions as listed in the following table. However, each `vprintf` function accepts a pointer to an argument list, whereas each of the counterpart functions accepts an argument list.

These functions format data for output to destinations as follows.

Function

Counterpart function

Output destination

Parameter Validation

Positional Parameter Support

`_vcprintf`

[`_cprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-cprintf-l-cwprintf-cwprintf-l?view=msvc-170)

console

Check for null.

no

`_vcwprintf`

[`_cwprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-cprintf-l-cwprintf-cwprintf-l?view=msvc-170)

console

Check for null.

no

`vfprintf`

[`fprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-fprintf-l-fwprintf-fwprintf-l?view=msvc-170)

_`stream`_

Check for null.

no

`vfprintf_p`

[`fprintf_p`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-p-fprintf-p-l-fwprintf-p-fwprintf-p-l?view=msvc-170)

_`stream`_

Check for null and valid format.

yes

`vfprintf_s`

[`fprintf_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-s-fprintf-s-l-fwprintf-s-fwprintf-s-l?view=msvc-170)

_`stream`_

Check for null and valid format.

no

`vfwprintf`

[`fwprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-fprintf-l-fwprintf-fwprintf-l?view=msvc-170)

_`stream`_

Check for null.

no

`vfwprintf_p`

[`fwprintf_p`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-p-fprintf-p-l-fwprintf-p-fwprintf-p-l?view=msvc-170)

_`stream`_

Check for null and valid format.

yes

`vfwprintf_s`

[`fwprintf_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-s-fprintf-s-l-fwprintf-s-fwprintf-s-l?view=msvc-170)

_`stream`_

Check for null and valid format.

no

`vprintf`

[`printf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170)

`stdout`

Check for null.

no

`vprintf_p`

[`printf_p`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-p-printf-p-l-wprintf-p-wprintf-p-l?view=msvc-170)

`stdout`

Check for null and valid format.

yes

`vprintf_s`

[`printf_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-s-printf-s-l-wprintf-s-wprintf-s-l?view=msvc-170)

`stdout`

Check for null and valid format.

no

`vwprintf`

[`wprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170)

`stdout`

Check for null.

no

`vwprintf_p`

[`wprintf_p`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-p-printf-p-l-wprintf-p-wprintf-p-l?view=msvc-170)

`stdout`

Check for null and valid format.

yes

`vwprintf_s`

[`wprintf_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-s-printf-s-l-wprintf-s-wprintf-s-l?view=msvc-170)

`stdout`

Check for null and valid format.

no

`vsprintf`

[`sprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-sprintf-l-swprintf-swprintf-l-swprintf-l?view=msvc-170)

memory pointed to by _`buffer`_

Check for null.

no

`vsprintf_p`

[`sprintf_p`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-p-sprintf-p-l-swprintf-p-swprintf-p-l?view=msvc-170)

memory pointed to by _`buffer`_

Check for null and valid format.

yes

`vsprintf_s`

[`sprintf_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-s-sprintf-s-l-swprintf-s-swprintf-s-l?view=msvc-170)

memory pointed to by _`buffer`_

Check for null and valid format.

no

`vswprintf`

[`swprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-sprintf-l-swprintf-swprintf-l-swprintf-l?view=msvc-170)

memory pointed to by _`buffer`_

Check for null.

no

`vswprintf_p`

[`swprintf_p`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-p-sprintf-p-l-swprintf-p-swprintf-p-l?view=msvc-170)

memory pointed to by _`buffer`_

Check for null and valid format.

yes

`vswprintf_s`

[`swprintf_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-s-sprintf-s-l-swprintf-s-swprintf-s-l?view=msvc-170)

memory pointed to by _`buffer`_

Check for null and valid format.

no

`_vscprintf`

[`_vscprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vscprintf-vscprintf-l-vscwprintf-vscwprintf-l?view=msvc-170)

memory pointed to by _`buffer`_

Check for null.

no

`_vscwprintf`

[`_vscwprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vscprintf-vscprintf-l-vscwprintf-vscwprintf-l?view=msvc-170)

memory pointed to by _`buffer`_

Check for null.

no

`_vsnprintf`

[`_snprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/snprintf-snprintf-snprintf-l-snwprintf-snwprintf-l?view=msvc-170)

memory pointed to by _`buffer`_

Check for null.

no

`_vsnwprintf`

[`_snwprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/snprintf-snprintf-snprintf-l-snwprintf-snwprintf-l?view=msvc-170)

memory pointed to by _`buffer`_

Check for null.

no

The `argptr` argument has type `va_list`, which is defined in VARARGS.H and STDARG.H. The `argptr` variable must be initialized by **va\_start,** and may be reinitialized by subsequent `va_arg` calls; `argptr` then points to the beginning of a list of arguments that are converted and transmitted for output according to the corresponding specifications in the _`format`_ argument. _`format`_ has the same form and function as the _`format`_ argument for [`printf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170). None of these functions invoke `va_end`. For a more complete description of each `vprintf` function, see the description of its counterpart function as listed in the preceding table.

`_vsnprintf` differs from `vsprintf` in that it writes no more than _`count`_ bytes to _`buffer`_.

The versions of these functions with the **w** infix in the name are wide-character versions of the corresponding functions without the **w** infix; in each of these wide-character functions, _`buffer`_ and _`format`_ are wide-character strings. Otherwise, each wide-character function behaves identically to its SBCS counterpart function.

The versions of these functions with **`_s`** and **`_p`** suffixes are the more secure versions. These versions validate the format strings. They'll generate an exception if the format string isn't well formed (for example, if invalid formatting characters are used).

The versions of these functions with the **`_p`** suffix let you specify the order in which the supplied arguments are substituted in the format string. For more information, see [printf\_p Positional Parameters](https://learn.microsoft.com/en-us/cpp/c-runtime-library/printf-p-positional-parameters?view=msvc-170).

For `vsprintf`, `vswprintf`, `_vsnprintf` and `_vsnwprintf`, if copying occurs between strings that overlap, the behavior is undefined.

Important

Ensure that _`format`_ is not a user-defined string. For more information, see [Avoiding buffer overruns](https://learn.microsoft.com/en-us/windows/win32/SecBP/avoiding-buffer-overruns). If using the secure versions of these functions (either the **`_s`** or **`_p`** suffixes), a user-supplied format string could trigger an invalid parameter exception if the user-supplied string contains invalid formatting characters.

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fprintf`, `_fprintf_l`, `fwprintf`, `_fwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-fprintf-l-fwprintf-fwprintf-l?view=msvc-170)  
[`printf`, `_printf_l`, `wprintf`, `_wprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170)  
[`sprintf`, `_sprintf_l`, `swprintf`, `_swprintf_l`, `__swprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-sprintf-l-swprintf-swprintf-l-swprintf-l?view=msvc-170)  
[`va_arg`, `va_copy`, `va_end`, `va_start`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/va-arg-va-copy-va-end-va-start?view=msvc-170)