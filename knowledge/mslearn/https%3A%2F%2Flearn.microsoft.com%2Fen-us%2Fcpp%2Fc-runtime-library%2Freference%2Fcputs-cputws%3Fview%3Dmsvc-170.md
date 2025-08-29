---
title: "_cputs, _cputws"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cputs-cputws?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Puts a string to the console.

## Syntax

```
int _cputs(
   const char *str
);
int _cputws(
   const wchar_t *str
);
```

### Parameters

_`str`_  
Output string.

## Return value

If successful, **`_cputs`** returns 0. If the function fails, it returns a nonzero value.

The **`_cputs`** function writes the null-terminated string that's pointed to by _`str`_ directly to the console. A carriage return-line feed (CR-LF) combination isn't automatically appended to the string.

This function validates its parameter. If _`str`_ is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL`, and -1 is returned.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_cputts`

**`_cputs`**

**`_cputs`**

**`_cputws`**

## Requirements

Routine

Required header

Optional header

**`_cputs`**

<conio.h>

<errno.h>

**`_cputws`**

<conio.h>

<errno.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// crt_cputs.c
// compile with: /c
// This program first displays a string to the console.

#include <conio.h>
#include <errno.h>

void print_to_console(char* buffer)
{
   int retval;
   retval = _cputs( buffer );
   if (retval)
   {
       if (errno == EINVAL)
       {
         _cputs( "Invalid buffer in print_to_console.\r\n");
       }
       else
         _cputs( "Unexpected error in print_to_console.\r\n");
   }
}

void wprint_to_console(wchar_t* wbuffer)
{
   int retval;
   retval = _cputws( wbuffer );
   if (retval)
   {
       if (errno == EINVAL)
       {
         _cputws( L"Invalid buffer in wprint_to_console.\r\n");
       }
       else
         _cputws( L"Unexpected error in wprint_to_console.\r\n");
   }
}

int main()
{
   // String to print at console.
   // Notice the \r (return) character.
   char* buffer = "Hello world (courtesy of _cputs)!\r\n";
   wchar_t *wbuffer = L"Hello world (courtesy of _cputws)!\r\n";
   print_to_console(buffer);
   wprint_to_console( wbuffer );
}
```

```
Hello world (courtesy of _cputs)!
Hello world (courtesy of _cputws)!
```

## See also

[Console and port I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/console-and-port-i-o?view=msvc-170)  
[`_putch`, `_putwch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putch-putwch?view=msvc-170)