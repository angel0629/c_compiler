---
title: "_fmode"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/fmode?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The `_fmode` variable sets the default file-translation mode for text or binary translation. This global variable has been deprecated for the more secure functional versions [`_get_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-fmode?view=msvc-170) and [`_set_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-fmode?view=msvc-170), which should be used in place of the global variable. It's declared in Stdlib.h as follows.

## Syntax

```
extern int _fmode;
```

## Remarks

The default setting of `_fmode` is `_O_TEXT` for text-mode translation. `_O_BINARY` is the setting for binary mode.

You can change the value of `_fmode` in three ways:

*   Link with Binmode.obj. This object file changes the initial setting of `_fmode` to `_O_BINARY`, causing all files except `stdin`, `stdout`, and `stderr` to be opened in binary mode.
    
*   Make a call to `_get_fmode` or `_set_fmode` to get or set the `_fmode` global variable, respectively.
    
*   Change the value of `_fmode` directly by setting it in your program.
    

## See also

[Global variables](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-variables?view=msvc-170)  
[`_get_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-fmode?view=msvc-170)  
[`_set_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-fmode?view=msvc-170)