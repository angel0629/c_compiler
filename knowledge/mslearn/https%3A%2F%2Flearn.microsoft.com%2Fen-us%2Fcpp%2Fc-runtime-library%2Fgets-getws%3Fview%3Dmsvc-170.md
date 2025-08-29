---
title: "gets, _getws"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/gets-getws?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets a line from the **`stdin`** stream. More secure versions of these functions are available; see [`gets_s`, `_getws_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gets-s-getws-s?view=msvc-170).

Important

These functions are obsolete. Beginning in Visual Studio 2015, they are not available in the CRT. The secure versions of these functions, `gets_s` and `_getws_s`, are still available. For information on these alternative functions, see [`gets_s`, `_getws_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gets-s-getws-s?view=msvc-170).

## Syntax

```
char *gets(
   char *buffer
);
wchar_t *_getws(
   wchar_t *buffer
);
template <size_t size>
char *gets(
   char (&buffer)[size]
); // C++ only
template <size_t size>
wchar_t *_getws(
   wchar_t (&buffer)[size]
); // C++ only
```

### Parameters

_`buffer`_  
Storage location for input string.

## Return value

Returns its argument if successful. A `NULL` pointer indicates an error or end-of-file condition. Use [`ferror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ferror?view=msvc-170) or [`feof`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feof?view=msvc-170) to determine which one has occurred. If _`buffer`_ is `NULL`, these functions invoke an invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return `NULL` and set `errno` to `EINVAL`.

The **`gets`** function reads a line from the standard input stream **`stdin`** and stores it in _`buffer`_. The line consists of all characters up to and including the first newline character ('\\n'). **`gets`** then replaces the newline character with a null character ('\\0') before returning the line. In contrast, the `fgets` function retains the newline character. **`_getws`** is a wide-character version of **`gets`**; its argument and return value are wide-character strings.

Important

Because there is no way to limit the number of characters read by **`gets`**, untrusted input can easily cause buffer overruns. Use `fgets` instead.

In C++, these functions have template overloads that invoke the newer, secure counterparts of these functions. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_getts`

**`gets`**

**`gets`**

**`_getws`**

## Requirements

Routine

Required header

**`gets`**

`<stdio.h>`

**`_getws`**

`<stdio.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_gets.c
// compile with: /WX /W3

#include <stdio.h>

int main( void )
{
   char line[21]; // room for 20 chars + '\0'
   gets( line );  // C4996
   // Danger: No way to limit input to 20 chars.
   // Consider using gets_s instead.
   printf( "The line entered was: %s\n", line );
}
```

Input longer than 20 characters will overrun the line buffer and almost certainly cause the program to crash.

```

Hello there!The line entered was: Hello there!
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fgets`, `fgetws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgets-fgetws?view=msvc-170)  
[`fputs`, `fputws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fputs-fputws?view=msvc-170)  
[`puts`, `_putws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/puts-putws?view=msvc-170)