---
title: "_pgmptr, _wpgmptr"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/pgmptr-wpgmptr?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The path of the executable file. Deprecated; use [`_get_pgmptr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-pgmptr?view=msvc-170) and [`_get_wpgmptr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-wpgmptr?view=msvc-170).

## Syntax

```
extern char *_pgmptr;
extern wchar_t *_wpgmptr;
```

When a program is run from the command interpreter (Cmd.exe), **`_pgmptr`** is automatically initialized to the full path of the executable file. For example, if Hello.exe is in C:\\BIN and C:\\BIN is in the path, **`_pgmptr`** is set to _`C:\BIN\Hello.exe`_ when you execute:

```
C> hello
```

When a program isn't run from the command line, **`_pgmptr`** might be initialized to the program name (the file's base name without the file name extension) or to a file name, relative path, or full path.

**`_wpgmptr`** is the wide-character counterpart of **`_pgmptr`** for use with programs that use `wmain`.

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tpgmptr`

**`_pgmptr`**

**`_pgmptr`**

**`_wpgmptr`**

## Requirements

Variable

Required header

**`_pgmptr`**, **`_wpgmptr`**

<stdlib.h>

## Example

The following program demonstrates the use of **`_pgmptr`**.

```
// crt_pgmptr.c
// compile with: /W3
// The following program demonstrates the use of _pgmptr.
//
#include <stdio.h>
#include <stdlib.h>
int main( void )
{
   printf("The full path of the executing program is : %Fs\n",
     _pgmptr); // C4996
   // Note: _pgmptr is deprecated; use _get_pgmptr instead
}
```

You could use **`_wpgmptr`** by changing `%Fs` to `%S` and `main` to `wmain`.

## See also

[Global variables](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-variables?view=msvc-170)