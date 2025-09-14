---
title: "strupr, wcsupr"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strupr-wcsupr?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The Microsoft-specific function names `strupr` and `wcsupr` are deprecated aliases for the [`_strupr` and `_wcsupr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strupr-strupr-l-mbsupr-mbsupr-l-wcsupr-l-wcsupr?view=msvc-170) functions. By default, they generate [Compiler warning (level 3) C4996](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-warnings/compiler-warning-level-3-c4996?view=msvc-170). The names are deprecated because they don't follow the Standard C rules for implementation-specific names. However, the functions are still supported.

We recommend you use [`_strupr` and `_wcsupr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strupr-strupr-l-mbsupr-mbsupr-l-wcsupr-l-wcsupr?view=msvc-170) or the security-enhanced [`_strupr_s` and `_wcsupr_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strupr-s-strupr-s-l-mbsupr-s-mbsupr-s-l-wcsupr-s-wcsupr-s-l?view=msvc-170) functions instead. Or, you can continue to use these function names, and disable the warning. For more information, see [Turn off the warning](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-warnings/compiler-warning-level-3-c4996?view=msvc-170#turn-off-the-warning) and [POSIX function names](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-warnings/compiler-warning-level-3-c4996?view=msvc-170#posix-function-names).