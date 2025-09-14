---
title: "Global Variables"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-variables?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The Microsoft C run-time library provides the following global variables or macros. Several of these global variables or macros have been deprecated in favor of more-secure functional versions, which we recommend you use instead of the global variables.

Variable

Description

[`__argc`, `__argv`, `__wargv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/argc-argv-wargv?view=msvc-170)

Contains the command-line arguments.

[`_daylight`, `_dstbias`, `_timezone`, and `_tzname`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/daylight-dstbias-timezone-and-tzname?view=msvc-170)

Deprecated. Instead, use `_get_daylight`, `_get_dstbias`, `_get_timezone`, and `_get_tzname`.

Adjusts for local time; used in some date and time functions.

[`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170)

Deprecated. Instead, use `_get_errno`, `_set_errno`, `_get_doserrno`, `_set_doserrno`, `perror` and `strerror`.

Stores error codes and related information.

[`_environ`, `_wenviron`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/environ-wenviron?view=msvc-170)

Deprecated. Instead, use `getenv_s`, `_wgetenv_s`, `_dupenv_s`, `_wdupenv_s`, `_putenv_s`, and `_wputenv_s`.

Pointers to arrays of pointers to the process environment strings; initialized at startup.

[`_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/fmode?view=msvc-170)

Deprecated. Instead, use `_get_fmode` or `_set_fmode`.

Sets default file-translation mode.

[`_iob`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/iob?view=msvc-170)

Array of I/O control structures for the console, files, and devices.

[`_pctype`, `_pwctype`, `_wctype`, `_mbctype`, `_mbcasemap`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/pctype-pwctype-wctype-mbctype-mbcasemap?view=msvc-170)

Contains information used by the character-classification functions.

[`_pgmptr`, `_wpgmptr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/pgmptr-wpgmptr?view=msvc-170)

Deprecated. Instead, use `_get_pgmptr` or `_get_wpgmptr`.

Based on how the program is invoked, the runtime initializes these values at program startup: either to the fully qualified or relative path of the program, the full program name, or the program name without its file name extension.

## See also

[C runtime library reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/c-run-time-library-reference?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)  
[`__argc`, `__argv`, `__wargv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/argc-argv-wargv?view=msvc-170)  
[`_get_daylight`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-daylight?view=msvc-170)  
[`_get_dstbias`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-dstbias?view=msvc-170)  
[`_get_timezone`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-timezone?view=msvc-170)  
[`_get_tzname`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-tzname?view=msvc-170)  
[`perror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/perror-wperror?view=msvc-170)  
[`strerror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strerror-strerror-wcserror-wcserror?view=msvc-170)  
[`_get_doserrno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-doserrno?view=msvc-170)  
[`_set_doserrno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-doserrno?view=msvc-170)  
[`_get_errno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-errno?view=msvc-170)  
[`_set_errno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-errno?view=msvc-170)  
[`_dupenv_s`, `_wdupenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/dupenv-s-wdupenv-s?view=msvc-170)  
[`getenv`, `_wgetenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-wgetenv?view=msvc-170)  
[`getenv_s`, `_wgetenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-s-wgetenv-s?view=msvc-170)  
[`_putenv`, `_wputenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-wputenv?view=msvc-170)  
[`_putenv_s`, `_wputenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-s-wputenv-s?view=msvc-170)  
[`_get_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-fmode?view=msvc-170)  
[`_set_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-fmode?view=msvc-170)