---
title: "gets_s, _getws_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gets-s-getws-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets a line from the **`stdin`** stream. These versions of [`gets`, `_getws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/gets-getws?view=msvc-170) have security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
char *gets_s(
   char *buffer,
   size_t sizeInCharacters
);
wchar_t *_getws_s(
   wchar_t *buffer,
   size_t sizeInCharacters
);
```

```
template <size_t size>
char *gets_s( char (&buffer)[size] ); // C++ only

template <size_t size>
wchar_t *_getws_s( wchar_t (&buffer)[size] ); // C++ only
```

### Parameters

_`buffer`_  
Storage location for input string.

_`sizeInCharacters`_  
The size of the buffer.

## Return value

Returns _`buffer`_ if successful. A `NULL` pointer indicates an error or end-of-file condition. Use [`ferror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ferror?view=msvc-170) or [`feof`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/feof?view=msvc-170) to determine which one has occurred.

The **`gets_s`** function reads a line from the standard input stream **`stdin`** and stores it in _`buffer`_. The line consists of all characters up to and including the first newline character ('`\n`'). **`gets_s`** then replaces the newline character with a null character ('`\0`') before returning the line. In contrast, the **`fgets_s`** function retains the newline character.

If the first character read is the end-of-file character, a null character is stored at the beginning of _`buffer`_, and `NULL` is returned.

**`_getws_s`** is a wide-character version of **`gets_s`**; its argument and return value are wide-character strings.

If _`buffer`_ is `NULL` or _`sizeInCharacters`_ is less than or equal to zero, or if the buffer is too small to contain the input line and null terminator, these functions invoke an invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions return `NULL` and set errno to `ERANGE`.

In C++, using these functions is simplified by template overloads; the overloads can infer buffer length automatically (eliminating the need to specify a size argument) and they can automatically replace older, non-secure functions with their newer, secure counterparts. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_getts_s`

**`gets_s`**

**`gets_s`**

**`_getws_s`**

## Requirements

Routine

Required header

**`gets_s`**

`<stdio.h>`

**`_getws_s`**

`<stdio.h>` or `<wchar.h>`

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles that are associated with the console, **`stdin`**, **`stdout`**, and **`stderr`**, must be redirected before C run-time functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_gets_s.c
// This program retrieves a string from the stdin and
// prints the same string to the console.

#include <stdio.h>

int main( void )
{
   char line[21]; // room for 20 chars + '\0'
   gets_s( line, 20 );
   printf( "The line entered was: %s\n", line );
}
```

```
Hello there!
```

```
The line entered was: Hello there!
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`gets`, `_getws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/gets-getws?view=msvc-170)  
[`fgets`, `fgetws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgets-fgetws?view=msvc-170)  
[`fputs`, `fputws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fputs-fputws?view=msvc-170)  
[`puts`, `_putws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/puts-putws?view=msvc-170)