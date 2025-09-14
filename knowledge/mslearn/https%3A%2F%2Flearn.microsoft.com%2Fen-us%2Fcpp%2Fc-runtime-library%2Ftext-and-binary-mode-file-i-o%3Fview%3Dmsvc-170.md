---
title: "Text and Binary Mode File I/O"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/text-and-binary-mode-file-i-o?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
File I/O operations take place in one of two translation modes, _text_ or _binary_, depending on the mode in which the file is opened. Data files are often processed in text mode. To control the file translation mode, one can:

*   Retain the current default setting and specify the alternative mode only when you open selected files.
    
*   Use the function [`_set_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-fmode?view=msvc-170) to change the default mode for newly opened files. Use [`_get_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-fmode?view=msvc-170) to find the current default mode. The initial default setting is ANSI text mode (`_O_TEXT`).
    
*   Change the default translation mode directly by setting the global variable [`_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/fmode?view=msvc-170) in your program. The function `_set_fmode` sets the value of this variable, but it can also be set directly.
    

When you call a file-open function such as [`_open`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170), [`fopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170), [`fopen_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-s-wfopen-s?view=msvc-170), [`freopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freopen-wfreopen?view=msvc-170), [`freopen_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freopen-s-wfreopen-s?view=msvc-170), [`_fsopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fsopen-wfsopen?view=msvc-170) or [`_sopen_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sopen-s-wsopen-s?view=msvc-170), you can override the current default setting of `_fmode` by specifying the appropriate argument to the function [`_set_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-fmode?view=msvc-170). The `stdin`, `stdout`, and `stderr` streams always open in text mode by default; you can also override this default when opening any of these files. Use [`_setmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmode?view=msvc-170) to change the translation mode using the file descriptor after the file is open.

## See also

[Input and output](https://learn.microsoft.com/en-us/cpp/c-runtime-library/input-and-output?view=msvc-170)  
[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)