---
title: "UWP Apps, the Windows Runtime, and the C Run-Time"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/windows-store-apps-the-windows-runtime-and-the-c-run-time?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Universal Windows Platform (UWP) apps are programs that run in the Windows Runtime that executes on Windows 8 and later. The Windows Runtime is a trustworthy environment that controls the functions, variables, and resources that are available to a UWP app. However, by design, Windows Runtime restrictions prevent the use of most C Run-Time Library (CRT) features in UWP apps.

UWP apps don't support the following CRT features:

*   Most CRT functions that are related to unsupported functionality.
    
    For example, a UWP app can't create a process by using the `exec` and `spawn` families of routines.
    
    When a CRT function isn't supported in a UWP app, that fact is noted in its reference article.
    
*   Most multibyte character and string functions.
    
    However, both Unicode and ANSI text are supported.
    
*   Environment variables.
    
*   The concept of a current working directory.
    
*   UWP apps and DLLs that are statically linked to the CRT and built by using the [/MT](https://learn.microsoft.com/en-us/cpp/build/reference/md-mt-ld-use-run-time-library?view=msvc-170) or `/MTd` compiler options.
    
    That is, an app that uses a multithread, static version of the CRT.
    
*   An app that's built by using the [/MDd](https://learn.microsoft.com/en-us/cpp/build/reference/md-mt-ld-use-run-time-library?view=msvc-170) compiler option.
    
    That is, a debug, multithread, and DLL-specific version of the CRT. Such an app isn't supported on the Windows Runtime.
    

For a complete list of CRT functions that aren't available in a UWP app and suggestions for alternative functions, see [CRT functions not supported in Universal Windows Platform apps](https://learn.microsoft.com/en-us/cpp/cppcx/crt-functions-not-supported-in-universal-windows-platform-apps?view=msvc-170).

## See also

[Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170)  
[Windows Runtime unsupported CRT functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/windows-runtime-unsupported-crt-functions?view=msvc-170)  
[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)  
[Create a Universal Windows Platform console app](https://learn.microsoft.com/en-us/windows/uwp/launch-resume/console-uwp)