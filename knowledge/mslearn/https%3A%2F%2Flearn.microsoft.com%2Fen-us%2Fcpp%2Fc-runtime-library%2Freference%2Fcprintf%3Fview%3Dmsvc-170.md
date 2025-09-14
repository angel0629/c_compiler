---
title: "cprintf"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The Microsoft-specific function name `cprintf` is a deprecated alias for the [`_cprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-cprintf-l-cwprintf-cwprintf-l?view=msvc-170) function. By default, it generates [Compiler warning (level 3) C4996](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-warnings/compiler-warning-level-3-c4996?view=msvc-170). The name is deprecated because it doesn't follow the Standard C rules for implementation-specific names. However, the function is still supported.

We recommend you use the [`_cprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-cprintf-l-cwprintf-cwprintf-l?view=msvc-170) or security-enhanced [`_cprintf_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-s-cprintf-s-l-cwprintf-s-cwprintf-s-l?view=msvc-170) function instead. Or, you can continue to use this function name, and disable the warning. For more information, see [Turn off the warning](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-warnings/compiler-warning-level-3-c4996?view=msvc-170#turn-off-the-warning) and [POSIX function names](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-warnings/compiler-warning-level-3-c4996?view=msvc-170#posix-function-names).

Important

This API cannot be used in applications that execute in the Windows Runtime. For more information, see [CRT functions not supported in Universal Windows Platform apps](https://learn.microsoft.com/en-us/cpp/cppcx/crt-functions-not-supported-in-universal-windows-platform-apps?view=msvc-170).

Starting in Windows 10 version 2004 (build 19041), the `printf` family of functions prints exactly representable floating point numbers according to the IEEE 754 rules for rounding. In previous versions of Windows, exactly representable floating point numbers ending in '5' would always round up. IEEE 754 states that they must round to the closest even digit (also known as "Banker's Rounding"). For example, both `printf("%1.0f", 1.5)` and `printf("%1.0f", 2.5)` should round to 2. Previously, 1.5 would round to 2 and 2.5 would round to 3. This change only affects exactly representable numbers. For example, 2.35 (which, when represented in memory, is closer to 2.35000000000000008) continues to round up to 2.4. Rounding done by these functions now also respects the floating point rounding mode set by [`fesetround`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetround-fesetround2?view=msvc-170). Previously, rounding always chose `FE_TONEAREST` behavior. This change only affects programs built using Visual Studio 2019 version 16.2 and later. To use the legacy floating point rounding behavior, link with [`legacy_stdio_float_rounding.obj`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/link-options?view=msvc-170).