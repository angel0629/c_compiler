---
title: "Global state in the CRT"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Some functions in the Universal C Runtime (UCRT) use global state. For example, `setlocale()` sets the locale for the entire program, which affects the digit separators, text code page, and so on.

The UCRT's global state isn't shared between applications and the OS. For example, if your application calls `setlocale()`, it won't affect the locale for any OS components that uses the C run-time, or the other way around.

## OS-specific versions of CRT functions

In the UCRT, functions that interact with global state have a "twin" function, prefixed with `_o_`. For example:

*   `setlocale()` affects global state specific to the app.
*   `_o_setlocale()` affects global state shared by all OS components, but not apps.

The only difference between these "twin" functions is that when they read/write the global CRT state, the OS-specific versions (that is, the versions that start with `_o_`) use the OS copy of global state instead of the app's copy of global state.

The OS-specific versions of these functions are in `ucrt.osmode.lib`. For example, the OS-specific version of `setlocale()` is `_o_setlocale()`

There are two ways to isolate your component's CRT state from an app's CRT state:

*   Statically link your component by using compiler options `/MT` (release) or `/MTd` (debug). For details, see [/MD, /MT, /LD](https://learn.microsoft.com/en-us/cpp/build/reference/md-mt-ld-use-run-time-library?view=msvc-170). Static linking can greatly increase binary size.
*   Starting in Windows versions beginning with Windows 10 version 2004, dynamically link to the CRT but call the OS-mode exports (the functions that begin with _o_). To call the OS-mode exports, statically link as before, but ignore the static UCRT by using linker option `/NODEFAULTLIB:libucrt.lib` (release) or `/NODEFAULTLIB:libucrtd.lib` (debug). And add `ucrt.osmode.lib` to the linker input. See [`/NODEFAULTLIB` (Ignore Libraries)](https://learn.microsoft.com/en-us/cpp/build/reference/nodefaultlib-ignore-libraries?view=msvc-170) for details.

Note

In source code, write `setlocale()`, not `_o_setlocale()`. When you link against `ucrt.osmode.lib`, the linker will automatically substitute the OS-specific version of the function. That is, `setlocale()` will be substituted with `_o_setlocale()`.

Linking against `ucrt.osmode.lib` disables some UCRT calls that are only available in app mode. Attempting to call these functions will result in a link error.

## Global state affected by app/OS separation

Global state affected by the separation of app and OS state includes:

*   [Locale data](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)
*   Signal handlers set by [`signal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/signal?view=msvc-170)
*   Termination routines set by [`terminate`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-terminate-crt?view=msvc-170)
*   [`errno` and `_doserrno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170)
*   Random number generation state used by [`rand`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rand?view=msvc-170) and [`srand`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/srand?view=msvc-170)
*   Functions that return a buffer that the user doesn't need to release: [`strtok`, `wcstok`, `_mbstok`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtok-strtok-l-wcstok-wcstok-l-mbstok-mbstok-l?view=msvc-170)  
    [`Tmpnam`, `_wtmpnam`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tempnam-wtempnam-tmpnam-wtmpnam?view=msvc-170)  
    [`asctime`, `_wasctime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-wasctime?view=msvc-170)  
    [`gmtime`, `_gmtime32`, `_gmtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-gmtime32-gmtime64?view=msvc-170)  
    [`_fcvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fcvt?view=msvc-170)  
    [`_ecvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ecvt?view=msvc-170)  
    [`strerror`, `_strerror`, `_wcserror`, `__wcserror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strerror-strerror-wcserror-wcserror?view=msvc-170)
*   The buffer used by [`_putch`, `_putwch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putch-putwch?view=msvc-170)
*   [`_set_invalid_parameter_handler`, `_set_thread_local_invalid_parameter_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-invalid-parameter-handler-set-thread-local-invalid-parameter-handler?view=msvc-170)
*   [`_set_new_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-handler?view=msvc-170) and [`_set_new_mode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-mode?view=msvc-170)
*   [`fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/text-and-binary-mode-file-i-o?view=msvc-170)
*   [Time zone information](https://learn.microsoft.com/en-us/cpp/c-runtime-library/time-management?view=msvc-170)

## See also

[C Run-Time library reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/c-run-time-library-reference?view=msvc-170)