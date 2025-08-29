---
title: "_putch, _putwch"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putch-putwch?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Writes a character to the console.

## Syntax

```
int _putch(
   int c
);

wint_t _putwch(
   wchar_t c
);
```

### Parameters

_`c`_  
Character to be output.

## Return value

Returns _`c`_ if successful. If **`_putch`** fails, it returns `EOF`; if **`_putwch`** fails, it returns `WEOF`.

These functions write the character _`c`_ directly, without buffering, to the console. In Windows NT, **`_putwch`** writes Unicode characters using the current console locale setting.

The versions with the `_nolock` suffix are identical except that they aren't protected from interference by other threads. For more information, see [`_putch_nolock`, `_putwch_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putch-nolock-putwch-nolock?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_puttch`

**`_putch`**

**`_putch`**

**`_putwch`**

## Requirements

Routine

Required header

**`_putch`**

<conio.h>

**`_putwch`**

<conio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

See the example for [`_getch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getch-getwch?view=msvc-170).

## See also

[Console and port I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/console-and-port-i-o?view=msvc-170)  
[`_cprintf`, `_cprintf_l`, `_cwprintf`, `_cwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-cprintf-l-cwprintf-cwprintf-l?view=msvc-170)  
[`_getch`, `_getwch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getch-getwch?view=msvc-170)