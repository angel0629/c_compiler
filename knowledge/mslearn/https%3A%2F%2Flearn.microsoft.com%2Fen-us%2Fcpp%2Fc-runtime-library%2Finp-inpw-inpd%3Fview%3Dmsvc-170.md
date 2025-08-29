---
title: "inp, _inp, inpw, _inpw, _inpd"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/inp-inpw-inpd?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Inputs, from a port, a byte (**`inp`**, **`_inp`**), a word (**`inpw`**, **`_inpw`**), or a double word (**`_inpd`**).

## Syntax

```
int _inp(
   unsigned short port
);
unsigned short _inpw(
   unsigned short port
);
unsigned long _inpd(
   unsigned short port
);
```

### Parameters

_`port`_  
I/O port number.

## Return value

The functions return the byte, word, or double word read from _`port`_. There's no error return.

The **`_inp`**, **`_inpw`**, and **`_inpd`** functions read a byte, a word, and a double word, respectively, from the specified input port. The input value can be any unsigned short integer in the range 0 - 65,535.

Because these functions read directly from an I/O port, they can't be used in user code.

The **`inp`** and **`inpw`** names are older, deprecated names for the **`_inp`** and **`_inpw`** functions. For more information, see [POSIX function names](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-warnings/compiler-warning-level-3-c4996?view=msvc-170#posix-function-names).

## Requirements

Routine

Required header

**`_inp`**

<conio.h>

**`_inpw`**

<conio.h>

**`_inpd`**

<conio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[Console and port I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/console-and-port-i-o?view=msvc-170)  
[`outp`, `outpw`, `_outp`, `_outpw`, `_outpd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/outp-outpw-outpd?view=msvc-170)