---
title: "strlwr, wcslwr"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strlwr-wcslwr?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The Microsoft-specific function names `strlwr` and `wcslwr` are deprecated aliases for the [`_strlwr` and `_wcslwr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strlwr-wcslwr-mbslwr-strlwr-l-wcslwr-l-mbslwr-l?view=msvc-170) functions. By default, they generate [Compiler warning (level 3) C4996](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-warnings/compiler-warning-level-3-c4996?view=msvc-170). The names are deprecated because they don't follow the Standard C rules for implementation-specific names. However, the functions are still supported.

We recommend you use [\_strlwr or \_wcslwr](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strlwr-wcslwr-mbslwr-strlwr-l-wcslwr-l-mbslwr-l?view=msvc-170) or the security-enhanced [`_strlwr_s` and `_wcslwr_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strlwr-s-strlwr-s-l-mbslwr-s-mbslwr-s-l-wcslwr-s-wcslwr-s-l?view=msvc-170) functions instead. Or, you can continue to use these function names, and disable the warning. For more information, see [Turn off the warning](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-warnings/compiler-warning-level-3-c4996?view=msvc-170#turn-off-the-warning) and [POSIX function names](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-warnings/compiler-warning-level-3-c4996?view=msvc-170#posix-function-names).