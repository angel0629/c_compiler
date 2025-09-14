---
title: "Compatibility"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The Universal C Runtime Library (UCRT) supports most of the C standard library required for C++ conformance. It implements the C99 (ISO/IEC 9899:1999) library, with certain exceptions:

*   strict type compatibility in <complex.h>.
*   `aligned_alloc`, which will probably not be implemented because the Windows operating system doesn't support aligned allocations. Use the non-standard `_aligned_malloc`, instead.
*   `strerrorlen_s`
*   atomic support in <stdatomic.h>
*   threading support in <threads.h>

The UCRT also implements a large subset of the POSIX.1 (ISO/IEC 9945-1:1996, the POSIX System Application Program Interface) C library. However, it's not fully conformant to any specific POSIX standard. The UCRT also implements several Microsoft-specific functions and macros that aren't part of a standard.

Functions specific to the Microsoft implementation of Visual C++ are found in the vcruntime library. Many of these functions are for internal use and can't be called by user code. Some are documented for use in debugging and implementation compatibility.

The C++ standard reserves names that begin with an underscore in the global namespace to the implementation. Both the POSIX functions and Microsoft-specific runtime library functions are in the global namespace, but aren't part of the standard C runtime library. It's why the preferred Microsoft implementations of these functions have a leading underscore. For portability, the UCRT also supports the default names, but the Microsoft C++ compiler issues a deprecation warning when code that uses them is compiled. Only the default names are deprecated, not the functions themselves. To suppress the warning, define `_CRT_NONSTDC_NO_WARNINGS` before including any headers in code that uses the original POSIX names. Because the C standard doesn't allow non-standard names in header files, by default [`/std:c11`](https://learn.microsoft.com/en-us/cpp/build/reference/std-specify-language-standard-version?view=msvc-170) and [`/std:c17`](https://learn.microsoft.com/en-us/cpp/build/reference/std-specify-language-standard-version?view=msvc-170) don't expose the default names for POSIX functions, types, and macros. If these names are necessary, define `_CRT_DECLARE_NONSTDC_NAMES` to expose them.

Certain functions in the standard C library have a history of unsafe usage, because of misused parameters and unchecked buffers. These functions are often the source of security issues in code. Microsoft created a set of safer versions of these functions that verify parameter usage. They invoke the invalid parameter handler when an issue is detected at runtime. By default, the Microsoft C++ compiler issues a deprecation warning when a function is used that has a safer variant available. When you compile your code as C++, you can define `_CRT_SECURE_CPP_OVERLOAD_STANDARD_NAMES` as 1 to eliminate most warnings. This macro enables template overloads to call the safer variants while maintaining portable source code. To suppress the warning, define `_CRT_SECURE_NO_WARNINGS` before including any headers in code that uses these functions. For more information, see [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

Except as noted within the documentation for specific functions, the UCRT is compatible with the Windows API. Certain functions aren't supported in Windows Store or Universal Windows Platform ([UWP](https://learn.microsoft.com/en-us/uwp)) apps. These functions are listed in [CRT functions not supported in Universal Windows Platform apps](https://learn.microsoft.com/en-us/cpp/cppcx/crt-functions-not-supported-in-universal-windows-platform-apps?view=msvc-170).

## Related articles

Title

Description

[UWP apps, the Windows Runtime, and the C runtime](https://learn.microsoft.com/en-us/cpp/c-runtime-library/windows-store-apps-the-windows-runtime-and-the-c-run-time?view=msvc-170)

Describes when UCRT routines aren't compatible with Universal Windows apps or Microsoft Store apps.

[ANSI C conformance](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ansi-c-compliance?view=msvc-170)

Describes standard-conforming names in the UCRT.

[UNIX](https://learn.microsoft.com/en-us/cpp/c-runtime-library/unix?view=msvc-170)

Provides guidelines for porting programs to UNIX.

[Windows platforms (CRT)](https://learn.microsoft.com/en-us/cpp/c-runtime-library/windows-platforms-crt?view=msvc-170)

Lists the operating systems that CRT supports.

[Backward compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/backward-compatibility?view=msvc-170)

Describes how to map old CRT names to the new ones.

[C runtime (CRT) and C++ Standard Library (STL) `.lib` files](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170)

Provides an overview of the CRT library (.lib) files and the associated compiler options.