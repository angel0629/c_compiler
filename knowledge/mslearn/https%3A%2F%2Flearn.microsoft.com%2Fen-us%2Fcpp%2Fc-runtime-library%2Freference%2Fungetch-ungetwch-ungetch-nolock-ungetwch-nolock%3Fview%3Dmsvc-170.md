---
title: "_ungetch, _ungetwch, _ungetch_nolock, _ungetwch_nolock"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ungetch-ungetwch-ungetch-nolock-ungetwch-nolock?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Pushes back the last character that's read from the console.

## Syntax

```
int _ungetch(
   int c
);
wint_t _ungetwch(
   wint_t c
);
int _ungetch_nolock(
   int c
);
wint_t _ungetwch_nolock(
   wint_t c
);
```

### Parameters

_`c`_  
Character to be pushed.

## Return value

Both functions return the character _`c`_ if successful. If there's an error, **`_ungetch`** returns a value of `EOF` and **`_ungetwch`** returns `WEOF`.

These functions push the character _`c`_ back to the console, causing _`c`_ to be the next character read by `_getch` or `_getche` (or `_getwch` or `_getwche`). **`_ungetch`** and **`_ungetwch`** fail if they're called more than once before the next read. The _`c`_ argument may not be `EOF` (or `WEOF`).

The versions with the `_nolock` suffix are identical except that they aren't protected from interference by other threads. They may be faster since they don't incur the overhead of locking out other threads. Use these functions only in thread-safe contexts such as single-threaded applications or where the calling scope already handles thread isolation.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_ungettch`

**`_ungetch`**

**`_ungetch`**

**`_ungetwch`**

`_ungettch_nolock`

**`_ungetch_nolock`**

**`_ungetch_nolock`**

**`_ungetwch_nolock`**

## Requirements

Routine

Required header

**`_ungetch`**, **`_ungetch_nolock`**

<conio.h>

**`_ungetwch`**, **`_ungetwch_nolock`**

<conio.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_ungetch.c
// In this program, a white-space delimited
// token is read from the keyboard. When the program
// encounters a delimiter, it uses _ungetch to replace
// the character in the keyboard buffer.
//

#include <conio.h>
#include <ctype.h>
#include <stdio.h>

int main( void )
{
   char buffer[100];
   int count = 0;
   int ch;

   ch = _getche();
   while( isspace( ch ) )      // Skip preceding white space.
      ch = _getche();
   while( count < 99 )         // Gather token.
   {
      if( isspace( ch ) )      // End of token.
         break;
      buffer[count++] = (char)ch;
      ch = _getche();
   }
   _ungetch( ch );            // Put back delimiter.
   buffer[count] = '\0';      // Null terminate the token.
   printf( "\ntoken = %s\n", buffer );
}
```

```

Whitetoken = White
```

## See also

[Console and port I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/console-and-port-i-o?view=msvc-170)  
[`_cscanf`, `_cscanf_l`, `_cwscanf`, `_cwscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cscanf-cscanf-l-cwscanf-cwscanf-l?view=msvc-170)  
[`_getch`, `_getwch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getch-getwch?view=msvc-170)