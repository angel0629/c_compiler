---
title: "write"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/posix-write?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The Microsoft-implemented POSIX function name `write` is a deprecated alias for the [`_write`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/write?view=msvc-170) function. By default, it generates [Compiler warning (level 3) C4996](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-warnings/compiler-warning-level-3-c4996?view=msvc-170). The name is deprecated because it doesn't follow the Standard C rules for implementation-specific names. However, the function is still supported.

We recommend you use [`_write`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/write?view=msvc-170) instead. Or, you can continue to use this function name, and disable the warning. For more information, see [Turn off the warning](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-warnings/compiler-warning-level-3-c4996?view=msvc-170#turn-off-the-warning) and [POSIX function names](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-warnings/compiler-warning-level-3-c4996?view=msvc-170#posix-function-names).