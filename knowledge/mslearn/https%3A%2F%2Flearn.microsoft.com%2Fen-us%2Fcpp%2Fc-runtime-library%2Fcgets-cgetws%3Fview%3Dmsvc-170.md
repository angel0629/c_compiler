---
title: "_cgets, _cgetws"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/cgets-cgetws?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets a character string from the console. More secure versions of these functions are available; see [`_cgets_s`, `_cgetws_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cgets-s-cgetws-s?view=msvc-170).

Important

These functions are obsolete. Beginning in Visual Studio 2015, they are not available in the CRT. The secure versions of these functions, \_cgets\_s and \_cgetws\_s, are still available. For information on these alternative functions, see [`_cgets_s`, `_cgetws_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cgets-s-cgetws-s?view=msvc-170).

## Syntax

```
char *_cgets(
   char *buffer
);
wchar_t *_cgetws(
   wchar_t *buffer
);
template <size_t size>
char *_cgets(
   char (&buffer)[size]
); // C++ only
template <size_t size>
wchar_t *_cgetws(
   wchar_t (&buffer)[size]
); // C++ only
```

#### Parameters

_`buffer`_  
Storage location for data.

## Return value

**`_cgets`** and **`_cgetws`** return a pointer to the start of the string, at `buffer[2]`. If _`buffer`_ is `NULL`, these functions invoke the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, they return `NULL` and set `errno` to `EINVAL`.

These functions read a string of characters from the console and store the string and its length in the location pointed to by _`buffer`_. The _`buffer`_ parameter must be a pointer to a character array. The first element of the array, `buffer[0]`, must contain the maximum length (in characters) of the string to be read. The array must contain enough elements to hold the string, a terminating null character ('\\0'), and 2 extra bytes. The function reads characters until a carriage return-line feed (CR-LF) combination or the specified number of characters is read. The string is stored starting at `buffer[2]`. If the function reads a CR-LF, it stores the null character ('\\0'). The function then stores the actual length of the string in the second array element, `buffer[1]`.

Because all editing keys are active when **`_cgets`** or **`_cgetws`** is called while in a console window, pressing the F3 key repeats the last entered entry.

In C++, these functions have template overloads that invoke the newer, secure counterparts of these functions. For more information, see [Secure template overloads](https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_cgetts`

**`_cgets`**

**`_cgets`**

**`_cgetws`**

## Requirements

Routine

Required header

**`_cgets`**

<conio.h>

**`_cgetws`**

<conio.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_cgets.c
// compile with: /c /W3
// This program creates a buffer and initializes
// the first byte to the size of the buffer. Next, the
// program accepts an input string using _cgets and displays
// the size and text of that string.

#include <conio.h>
#include <stdio.h>
#include <errno.h>

int main( void )
{
   char buffer[83] = { 80 };  // Maximum characters in 1st byte
   char *result;

   printf( "Input line of text, followed by carriage return:\n");

   // Input a line of text:
   result = _cgets( buffer ); // C4996
   // Note: _cgets is deprecated; consider using _cgets_s
   if (!result)
   {
      printf( "An error occurred reading from the console:"
              " error code %d\n", errno);
   }
   else
   {
      printf( "\nLine length = %d\nText = %s\n",
              buffer[1], result );
   }
}
```

```

      A line of input.Input line of text, followed by carriage return:
Line Length = 16
Text = A line of input.
```

## See also

[Console and port I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/console-and-port-i-o?view=msvc-170)  
[`_getch`, `_getwch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getch-getwch?view=msvc-170)