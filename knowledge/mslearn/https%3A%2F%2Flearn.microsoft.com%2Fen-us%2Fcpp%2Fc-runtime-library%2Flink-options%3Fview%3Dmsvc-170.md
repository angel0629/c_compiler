---
title: "Link options"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/link-options?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The CRT lib directory includes several small object files that enable specific CRT features without code changes. These object files are called "link options" because you only have to add them to the linker command line to use them. To do this from Visual Studio, in the Solution Explorer right-click your project and choose **Properties**. Under **Configuration Properties**, choose **Linker** > **Input** > **Additional Dependencies** and specify the additional items to add to the link command line.

CLR pure mode versions of these objects are deprecated in Visual Studio 2015 and unsupported in Visual Studio 2017. Use the regular versions for native and [`/clr`](https://learn.microsoft.com/en-us/cpp/build/reference/clr-common-language-runtime-compilation?view=msvc-170) code.

Native and /clr

Pure mode

Description

`binmode.obj`

`pbinmode.obj`

Sets the default file-translation mode to binary. See [`_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/fmode?view=msvc-170).

`chkstk.obj`

n/a

Provides stack-checking and alloca support when not using the CRT.

`commode.obj`

`pcommode.obj`

Sets the global commit flag to "commit". See [`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170) and [`fopen_s`, `_wfopen_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-s-wfopen-s?view=msvc-170).

`exe_initialize_mta.lib`

n/a

Initializes the MTA apartment during EXE startup, which allows the use of COM objects in global smart pointers. Because this option leaks an MTA apartment reference during shutdown, don't use it for DLLs. Linking to this file is equivalent to including `combase.h` and defining `_EXE_INITIALIZE_MTA`. Using this link option adds [`onecore.lib`](https://learn.microsoft.com/en-us/windows/win32/apiindex/windows-umbrella-libraries) to the default library list. If this effect is undesirable (such as using onecore\_apiset.lib or other umbrella library), use [`/NODEFAULTLIB`](https://learn.microsoft.com/en-us/cpp/build/reference/nodefaultlib-ignore-libraries?view=msvc-170) to override this behavior and provide an alternative.

`fp10.obj`

n/a

Changes the default precision control to 64 bits. See [Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170).

`invalidcontinue.obj`

`pinvalidcontinue.obj`

Sets a default invalid parameter handler that does nothing, meaning that invalid parameters passed to CRT functions will just set errno and return an error result.

`legacy_stdio_float_rounding.obj`

n/a

The printing of floating-point values (for example, when using [`printf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170)) with the Windows 10 19041 Universal C Runtime has been fixed. It now properly rounds exactly representable floating-point numbers, and respects the floating-point rounding requested by [`fesetround`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fegetround-fesetround2?view=msvc-170). This behavior update is available in Visual Studio 2019 version 16.2 and later. Legacy behavior is used in earlier versions of Visual Studio, or by providing this link option.

`loosefpmath.obj`

n/a

Ensures that floating point code tolerates denormal values.

`newmode.obj`

`pnewmode.obj`

Causes [`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170) to call the new handler on failure. See [`_set_new_mode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-mode?view=msvc-170), [`_set_new_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-handler?view=msvc-170), [`calloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/calloc?view=msvc-170), and [`realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/realloc?view=msvc-170).

`noarg.obj`

`pnoarg.obj`

Disables all processing of argc and argv.

`nochkclr.obj`

n/a

Does nothing. Remove from your project.

`noenv.obj`

`pnoenv.obj`

Disables the creation of a cached environment for the CRT.

`nothrownew.obj`

`pnothrownew.obj`

Enables the non-throwing version of new in the CRT. See [new and delete Operators](https://learn.microsoft.com/en-us/cpp/cpp/new-and-delete-operators?view=msvc-170).

`setargv.obj`

`psetargv.obj`

Enables command-line argument wildcard expansion. See [Expanding wildcard arguments](https://learn.microsoft.com/en-us/cpp/c-language/expanding-wildcard-arguments?view=msvc-170).

`threadlocale.obj`

`pthreadlocale.obj`

Enables per-thread locale for all new threads by default.

`wsetargv.obj`

`pwsetargv.obj`

Enables command-line argument wildcard expansion. See [Expanding wildcard arguments](https://learn.microsoft.com/en-us/cpp/c-language/expanding-wildcard-arguments?view=msvc-170).

## See also

*   [C runtime (CRT) and C++ Standard Library (STL) `.lib` files](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170)