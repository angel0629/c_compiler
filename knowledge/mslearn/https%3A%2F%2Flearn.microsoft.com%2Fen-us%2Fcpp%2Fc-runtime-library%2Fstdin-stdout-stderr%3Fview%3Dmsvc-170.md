---
title: "stdin, stdout, stderr"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/stdin-stdout-stderr?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
## Syntax

```
#define stdin  /* implementation defined */
#define stdout /* implementation defined */
#define stderr /* implementation defined */
```

## Remarks

The **`stdin`**, **`stdout`**, and **`stderr`** global constant pointers are standard streams for input, output, and error output.

By default, standard input is read from the keyboard, while standard output and standard error are printed to the screen.

The following stream pointers are available to access the standard streams:

Pointer

Stream

**`stdin`**

Standard input

**`stdout`**

Standard output

**`stderr`**

Standard error

These pointers can be used as arguments to functions. Some functions, such as [`getchar`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getchar-getwchar?view=msvc-170) and [`putchar`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putchar-putwchar?view=msvc-170), use **`stdin`** and **`stdout`** automatically.

These pointers are constants, and can't be assigned new values. The [`freopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freopen-wfreopen?view=msvc-170) function can be used to redirect the streams to disk files or to other devices. The operating system allows you to redirect a program's standard input and output at the command level.

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)