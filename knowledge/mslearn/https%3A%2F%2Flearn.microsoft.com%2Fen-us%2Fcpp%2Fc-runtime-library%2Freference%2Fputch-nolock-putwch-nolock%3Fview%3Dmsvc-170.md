---
title: "_putch_nolock, _putwch_nolock"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putch-nolock-putwch-nolock?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Writes a character to the console without locking.

## Syntax

```
int _putch_nolock(
int c
);
wint_t _putwch_nolock(
wchar_t c
);
```

### Parameters

_`c`_  
Character to be output.

## Return value

Returns _`c`_ if successful. If **`_putch_nolock`** fails, it returns `EOF`; if **`_putwch_nolock`** fails, it returns `WEOF`.

**`_putch_nolock`** and **`_putwch_nolock`** are identical to `_putch` and `_putwch`, respectively, except that they aren't protected from interference by other threads. They might be faster because they don't incur the overhead of locking out other threads. Use these functions only in thread-safe contexts such as single-threaded applications or where the calling scope already handles thread isolation.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_puttch_nolock`

**`_putch_nolock`**

**`_putch_nolock`**

**`_putwch_nolock`**

## Requirements

Routine

Required header

**`_putch_nolock`**

<conio.h>

**`_putwch_nolock`**

<conio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[Console and port I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/console-and-port-i-o?view=msvc-170)  
[`_cprintf`, `_cprintf_l`, `_cwprintf`, `_cwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-cprintf-l-cwprintf-cwprintf-l?view=msvc-170)  
[`_getch`, `_getwch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getch-getwch?view=msvc-170)