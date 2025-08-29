---
title: "Backward Compatibility"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/backward-compatibility?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
For compatibility between product versions, the library OLDNAMES.LIB maps old names to new names. For instance, `open` maps to `_open`. You must explicitly link with OLDNAMES.LIB only when you compile with the following combinations of command-line options:

*   `/Zl` (omit default library name from object file) and `/Ze` (the default: use Microsoft extensions)
    
*   `/link` (linker-control), `/NOD` (no default-library search), and `/Ze`
    

For more information about compiler command-line options, see [Compiler options](https://learn.microsoft.com/en-us/cpp/build/reference/compiler-options?view=msvc-170).

## See also

[Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170)