---
title: "_cscanf, _cscanf_l, _cwscanf, _cwscanf_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cscanf-cscanf-l-cwscanf-cwscanf-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Reads formatted data from the console. More secure versions of these functions are available; see [`_cscanf_s`, `_cscanf_s_l`, `_cwscanf_s`, `_cwscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cscanf-s-cscanf-s-l-cwscanf-s-cwscanf-s-l?view=msvc-170).

Note

In Visual Studio 2015 The `printf` and `scanf` family of functions were declared as **`inline`** and moved to the `<stdio.h>` and `<conio.h>` headers. If you are migrating older code you might see Linker Error LNK2019 in connection with these functions. For more information, see [Visual C++ change history 2003 - 2015](https://learn.microsoft.com/en-us/cpp/porting/visual-cpp-change-history-2003-2015?view=msvc-170#stdio_and_conio).

## Syntax

```
int _cscanf(
   const char *format [,
   argument] ...
);
int _cscanf_l(
   const char *format,
   _locale_t locale [,
   argument] ...
);
int _cwscanf(
   const wchar_t *format [,
   argument] ...
);
int _cwscanf_l(
   const wchar_t *format,
   _locale_t locale [,
   argument] ...
);
```

### Parameters

_`format`_  
Format-control string.

_`argument`_  
Optional parameters.

_`locale`_  
The locale to use.

## Return value

The number of fields that were successfully converted and assigned. The return value doesn't include fields that were read but not assigned. The return value is `EOF` for an attempt to read at end of file. An `EOF` can also be returned when keyboard input is redirected at the operating-system command-line level. A return value of zero means that no fields were assigned.

The **`_cscanf`** function reads data directly from the console into the locations given by _`argument`_. The [`_getche`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getch-getwch?view=msvc-170) function is used to read characters. Each optional parameter must be a pointer to a variable with a type that corresponds to a type specifier in _`format`_. The format controls the interpretation of the input fields and has the same form and function as the _`format`_ parameter for the [`scanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-scanf-l-wscanf-wscanf-l?view=msvc-170) function. While **`_cscanf`** normally echoes the input character, it doesn't do so if the last call was to `_ungetch`.

This function validates its parameters. If format is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the function returns `EOF`.

The versions of these functions with the `_l` suffix are identical except that they use the locale parameter passed in instead of the current thread locale.

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcscanf`

**`_cscanf`**

**`_cscanf`**

**`_cwscanf`**

`_tcscanf_l`

**`_cscanf_l`**

**`_cscanf_l`**

**`_cwscanf_l`**

## Requirements

Routine

Required header

**`_cscanf`**, **`_cscanf_l`**

<conio.h>

**`_cwscanf`**, **`_cwscanf_l`**

<conio.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_cscanf.c
// compile with: /c /W3
/* This program prompts for a string
* and uses _cscanf to read in the response.
* Then _cscanf returns the number of items
* matched, and the program displays that number.
*/

#include <stdio.h>
#include <conio.h>

int main( void )
{
   int   result, i[3];

   _cprintf_s( "Enter three integers: ");
   result = _cscanf( "%i %i %i", &i[0], &i[1], &i[2] ); // C4996
   // Note: _cscanf is deprecated; consider using _cscanf_s instead
   _cprintf_s( "\r\nYou entered " );
   while( result-- )
      _cprintf_s( "%i ", i[result] );
   _cprintf_s( "\r\n" );
}
```

```
1 2 3
```

```
Enter three integers: 1 2 3
You entered 3 2 1
```

## See also

[Console and port I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/console-and-port-i-o?view=msvc-170)  
[`_cprintf`, `_cprintf_l`, `_cwprintf`, `_cwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-cprintf-l-cwprintf-cwprintf-l?view=msvc-170)  
[`fscanf`, `_fscanf_l`, `fwscanf`, `_fwscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fscanf-fscanf-l-fwscanf-fwscanf-l?view=msvc-170)  
[`scanf_s`, `_scanf_s_l`, `wscanf_s`, `_wscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-s-scanf-s-l-wscanf-s-wscanf-s-l?view=msvc-170)  
[`sscanf`, `_sscanf_l`, `swscanf`, `_swscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-sscanf-l-swscanf-swscanf-l?view=msvc-170)