---
title: "_getch, _getwch"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getch-getwch?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets a character from the console without echo.

## Syntax

```
int _getch( void );
wint_t _getwch( void );
```

## Return value

Returns the character read. There's no error return.

The **`_getch`** and **`_getwch`** functions read a single character from the console without echoing the character. To read a function key or arrow key, each function must be called twice. The first call returns `0` or `0xE0`. The second call returns the [key scan code](https://learn.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-6.0/aa299374\(v=vs.60\)).

These functions lock the calling thread and so are thread-safe. For non-locking versions, see [`_getch_nolock`, `_getwch_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getch-nolock-getwch-nolock?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`Tchar.h` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_gettch`**

**`_getch`**

**`_getch`**

**`_getwch`**

## Requirements

Routine

Required header

**`_getch`**

`<conio.h>`

**`_getwch`**

`<conio.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_getch.c
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
      ch = _getch();
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
Type 'Y' when finished typing keys: Y
```

## See also

[Console and port I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/console-and-port-i-o?view=msvc-170)  
[`_getche`, `_getwche`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getche-getwche?view=msvc-170)  
[`_cgets`, `_cgetws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/cgets-cgetws?view=msvc-170)  
[`getc`, `getwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getc-getwc?view=msvc-170)  
[`_ungetch`, `_ungetwch`, `_ungetch_nolock`, `_ungetwch_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ungetch-ungetwch-ungetch-nolock-ungetwch-nolock?view=msvc-170)