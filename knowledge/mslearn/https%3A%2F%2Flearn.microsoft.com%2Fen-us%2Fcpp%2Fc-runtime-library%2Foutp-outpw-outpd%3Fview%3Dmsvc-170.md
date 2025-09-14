---
title: "outp, outpw, _outp, _outpw, _outpd"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/outp-outpw-outpd?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Outputs, at a port, a byte (**`outp`**, **`_outp`**), a word (**`outpw`**, **`_outpw`**), or a double word (**`_outpd`**).

## Syntax

```
int _outp(
   unsigned short port,
   int data_byte
);
unsigned short _outpw(
   unsigned short port,
   unsigned short data_word
);
unsigned long _outpd(
   unsigned short port,
   unsigned long data_word
);
```

### Parameters

_`port`_  
Port number.

_`data_byte`_, _`data_word`_  
Output values.

## Return value

The functions return the data output. There's no error return.

The **`_outp`**, **`_outpw`**, and **`_outpd`** functions write a byte, a word, and a double word, respectively, to the specified output port. The _`port`_ argument can be any unsigned integer in the range 0 - 65,535. _`data_byte`_ can be any integer in the range 0 - 255. _`data_word`_ can be any value in the range of an integer, an unsigned short integer, and an unsigned long integer, respectively.

Because these functions write directly to an I/O port, they can't be used in user-mode Windows code.

For information about using I/O ports in the Windows operating system, see [Serial communications](https://learn.microsoft.com/en-us/previous-versions/ff802693\(v=msdn.10\)).

The **`outp`** and **`outpw`** names are older, deprecated names for the **`_outp`** and **`_outpw`** functions. For more information, see [POSIX function names](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-warnings/compiler-warning-level-3-c4996?view=msvc-170#posix-function-names).

## Requirements

Routine

Required header

**`_outp`**

<conio.h>

**`_outpw`**

<conio.h>

**`_outpd`**

<conio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[Console and port I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/console-and-port-i-o?view=msvc-170)  
[`inp`, `inpw`, `_inp`, `_inpw`, `_inpd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/inp-inpw-inpd?view=msvc-170)