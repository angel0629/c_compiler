---
title: "Constant and Global Variable Mappings"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/constant-and-global-variable-mappings?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
These generic-text constant, global variable, and standard-type mappings are defined in TCHAR.H and depend on whether the constant `_UNICODE` or `_MBCS` has been defined in your program.

### Generic-text constant and global variable mappings

Generic-text - object name

SBCS (`_UNICODE`, `_MBCS` not defined)

`_MBCS` defined

`_UNICODE` defined

`_TEOF`

`EOF`

`EOF`

`WEOF`

`_tenviron`

`_environ`

`_environ`

`_wenviron`

`_tpgmptr`

`_pgmptr`

`_pgmptr`

`_wpgmptr`

## See also

[Generic-text mappings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/generic-text-mappings?view=msvc-170)  
[Data type mappings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-type-mappings?view=msvc-170)  
[Routine mappings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/routine-mappings?view=msvc-170)  
[A sample generic-text program](https://learn.microsoft.com/en-us/cpp/c-runtime-library/a-sample-generic-text-program?view=msvc-170)  
[Using generic-text mappings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/using-generic-text-mappings?view=msvc-170)