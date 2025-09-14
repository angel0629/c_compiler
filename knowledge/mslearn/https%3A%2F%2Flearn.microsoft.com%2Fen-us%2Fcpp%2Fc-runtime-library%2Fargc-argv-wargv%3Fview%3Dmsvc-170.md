---
title: "__argc, __argv, __wargv"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/argc-argv-wargv?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The **`__argc`** global variable is a count of the number of command-line arguments passed to the program. **`__argv`** is a pointer to an array of single-byte-character or multi-byte-character strings that contain the program arguments, and **`__wargv`** is a pointer to an array of wide-character strings that contain the program arguments. These global variables provide the arguments to `main` or `wmain`.

## Syntax

```
extern int __argc;
extern char ** __argv;
extern wchar_t ** __wargv;
```

In a program that uses the `main` function, **`__argc`** and **`__argv`** are initialized at program startup by using the command line that's used to start the program. The command line is parsed into individual arguments, and wildcards are expanded. The count of arguments is assigned to **`__argc`** and the argument strings are allocated on the heap, and a pointer to the array of arguments is assigned to **`__argv`**. In a program compiled to use wide characters and a `wmain` function, the arguments are parsed and wildcards are expanded as wide-character strings, and a pointer to the array of argument strings is assigned to **`__wargv`**.

For portable code, we recommend you use the arguments passed to `main` to get the command-line arguments in your program.

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` not defined

`_UNICODE` defined

`__targv`

**`__argv`**

**`__wargv`**

## Requirements

Global variable

Required header

**`__argc`**, **`__argv`**, **`__wargv`**

<stdlib.h>, <cstdlib> (C++)

**`__argc`**, **`__argv`**, and **`__wargv`** are Microsoft extensions. For compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Global variables](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-variables?view=msvc-170)  
[`main` function and command-line arguments (C++)](https://learn.microsoft.com/en-us/cpp/cpp/main-function-command-line-args?view=msvc-170)  
[Using `wmain` instead of `main`](https://learn.microsoft.com/en-us/cpp/cpp/main-function-command-line-args?view=msvc-170)