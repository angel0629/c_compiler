---
title: "to Functions"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/to-functions?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Each of the **`to`** functions and its associated macro, if any, converts a single character to another character.

[`__toascii`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/toascii-toascii?view=msvc-170)  
[`tolower`, `_tolower`, `towlower`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tolower-tolower-towlower-tolower-l-towlower-l?view=msvc-170)  
[`toupper`, `_toupper`, `towupper`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/toupper-toupper-towupper-toupper-l-towupper-l?view=msvc-170)

The **`to`** functions and macro conversions are as follows.

Routine

Macro

Description

`__toascii`

`__toascii`

Converts `c` to ASCII character

`tolower`

`tolower`

Converts `c` to lowercase if appropriate

`_tolower`

`_tolower`

Converts `c` to lowercase

`towlower`

None

Converts `c` to corresponding wide-character lowercase letter

`toupper`

`toupper`

Converts `c` to uppercase if appropriate

`_toupper`

`_toupper`

Converts `c` to uppercase

`towupper`

None

Converts c to corresponding wide-character uppercase letter

To use the function versions of the **`to`** routines that are also defined as macros, either remove the macro definitions with `#undef` directives or don't include `CTYPE.H`. If you use the /Za compiler option, the compiler uses the function version of `toupper` or `tolower`. Declarations of the `toupper` and `tolower` functions are in `STDLIB.H`.

The `__toascii` routine sets all but the low-order 7 bits of `c` to 0, so that the converted value represents a character in the ASCII character set. If `c` already represents an ASCII character, `c` is unchanged.

The `tolower` and `toupper` routines:

*   Are dependent on the `LC_CTYPE` category of the current locale (`tolower` calls `isupper` and `toupper` calls `islower`).
*   Convert `c` if `c` represents a convertible letter of the appropriate case in the current locale and the opposite case exists for that locale. Otherwise, `c` is unchanged.

The `_tolower` and `_toupper` routines:

*   Are locale-independent, much faster versions of `tolower` and **toupper.**
*   Can be used only when **isascii(**`c`**)** and either **isupper(**`c`**)** or **islower(**`c`**)**, respectively, are nonzero.
*   Have undefined results if `c` isn't an ASCII letter of the appropriate case for converting.

The `towlower` and `towupper` functions return a converted copy of `c` if and only if both of the following conditions are nonzero. Otherwise, `c` is unchanged.

*   `c` is a wide character of the appropriate case (that is, for which `iswupper` or **iswlower,** respectively, is nonzero).
*   There's a corresponding wide character of the target case (that is, for which `iswlower` or **iswupper,** respectively, is nonzero).

## Example

```
// crt_toupper.c
/* This program uses toupper and tolower to
 * analyze all characters between 0x0 and 0x7F. It also
 * applies _toupper and _tolower to any code in this
 * range for which these functions make sense.
 */

#include <ctype.h>
#include <string.h>
#include <stdio.h>

char msg[] = "Some of THESE letters are Uppercase.";
char *p;

int main( void )
{
   printf( "%s\n", msg );

   /* Reverse case of message. */
   for( p = msg; p < msg + strlen( msg ); p++ )
   {
      if( islower( *p ) )
         putchar( _toupper( *p ) );
      else if( isupper( *p ) )
         putchar( _tolower( *p ) );
      else
         putchar( *p );
   }
}
```

```
Some of THESE letters are Uppercase.
sOME OF these LETTERS ARE uPPERCASE.
```

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[`Locale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)