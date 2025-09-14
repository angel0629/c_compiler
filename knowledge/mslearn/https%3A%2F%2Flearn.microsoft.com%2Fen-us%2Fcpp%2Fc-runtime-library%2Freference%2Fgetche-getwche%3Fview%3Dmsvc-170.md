---
title: "_getche, _getwche"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getche-getwche?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets a character from the console with echo.

## Syntax

```
int _getche( void );
wint_t _getwche( void );
```

## Return value

Returns the character read. There's no error return.

The **`_getche`** and **`_getwche`** functions read a single character from the console with echo, meaning that the character is displayed at the console. None of these functions can be used to read CTRL+C. When **`_getche`** or **`_getwche`** reads a function key or an arrow key, the function must be called twice; the first call returns 0 or 0xE0, and the second call returns the actual key code.

These functions lock the calling thread and are therefore thread-safe. For non-locking versions, see [`_getche_nolock`, `_getwche_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getche-nolock-getwche-nolock?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_gettche`

**`_getche`**

**`_getche`**

**`_getwche`**

## Requirements

Routine

Required header

**`_getche`**

<conio.h>

**`_getwche`**

<conio.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_getche.c
// This program reads characters from
// the keyboard until it receives a 'Y' or 'y'.

#include <conio.h>
#include <ctype.h>

int main( void )
{
   int ch;

   _cputs( "Type 'Y' when finished typing keys: " );
   do
   {
      ch = _getche();
      ch = toupper( ch );
   } while( ch != 'Y' );

   _putch( ch );
   _putch( '\r' );    // Carriage return
   _putch( '\n' );    // Line feed
}
```

```
abcdefy
```

```
Type 'Y' when finished typing keys: abcdefyY
```

## See also

[Console and port I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/console-and-port-i-o?view=msvc-170)  
[`_cgets`, `_cgetws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/cgets-cgetws?view=msvc-170)  
[`getc`, `getwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getc-getwc?view=msvc-170)  
[`_ungetch`, `_ungetwch`, `_ungetch_nolock`, `_ungetwch_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ungetch-ungetwch-ungetch-nolock-ungetwch-nolock?view=msvc-170)