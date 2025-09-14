---
title: "_getch_nolock, _getwch_nolock"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getch-nolock-getwch-nolock?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets a character from the console without echo and without locking.

## Syntax

```
int _getch_nolock( void );
wint_t _getwch_nolock( void );
```

## Return value

Returns the character read. There's no error return.

**`_getch_nolock`** and **`_getwch_nolock`** are identical to `_getch` and `_getchw` except that they not protected from interference by other threads. They might be faster because they don't incur the overhead of locking out other threads. Use these functions only in thread-safe contexts such as single-threaded applications or where the calling scope already handles thread isolation.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_gettch_nolock`

**`_getch_nolock`**

**`_getch_nolock`**

**`_getwch_nolock`**

## Requirements

Routine

Required header

**`_getch_nolock`**

<conio.h>

**`_getwch_nolock`**

<conio.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_getch_nolock.c
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
      ch = _getch_nolock();
      ch = toupper( ch );
   } while( ch != 'Y' );

   _putch_nolock( ch );
   _putch_nolock( '\r' );    // Carriage return
   _putch_nolock( '\n' );    // Line feed
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