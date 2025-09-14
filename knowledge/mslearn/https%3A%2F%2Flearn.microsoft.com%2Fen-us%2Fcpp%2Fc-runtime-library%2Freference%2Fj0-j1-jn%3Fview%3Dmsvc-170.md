---
title: "j0, j1, jn"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/j0-j1-jn?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The Microsoft-implemented POSIX function names `j0`, `j1`, and `jn` are deprecated aliases for the [`_j0`, `_j1`, and `_jn`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/bessel-functions-j0-j1-jn-y0-y1-yn?view=msvc-170) functions. By default, they generate [Compiler warning (level 3) C4996](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-warnings/compiler-warning-level-3-c4996?view=msvc-170). The names are deprecated because they don't follow the Standard C rules for implementation-specific names. However, the functions are still supported.

We recommend you use [`_j0`, `_j1`, and `_jn`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/bessel-functions-j0-j1-jn-y0-y1-yn?view=msvc-170) instead. Or, you can continue to use these function names, and disable the warning. For more information, see [Turn off the warning](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-warnings/compiler-warning-level-3-c4996?view=msvc-170#turn-off-the-warning) and [POSIX function names](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-warnings/compiler-warning-level-3-c4996?view=msvc-170#posix-function-names).