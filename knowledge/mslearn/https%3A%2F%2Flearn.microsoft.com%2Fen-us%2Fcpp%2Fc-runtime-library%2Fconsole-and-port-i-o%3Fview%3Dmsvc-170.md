---
title: "Console and Port I/O"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/console-and-port-i-o?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
These routines read and write on your console or on the specified port. The console I/O routines aren't compatible with stream I/O or low-level I/O library routines. The console or port doesn't have to be opened or closed before I/O is performed, so there are no open or close routines in this category. In the Windows operating systems, the output from these functions is always directed to the console and can't be redirected.

## Console and port I/O routines

Routine

Use

[`_cgets`, `_cgetws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/cgets-cgetws?view=msvc-170), [`_cgets_s`, `_cgetws_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cgets-s-cgetws-s?view=msvc-170)

Read string from console

[`_cprintf`, `_cwprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-cprintf-l-cwprintf-cwprintf-l?view=msvc-170), [`_cprintf_s`, `_cprintf_s_l`, `_cwprintf_s`, `_cwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-s-cprintf-s-l-cwprintf-s-cwprintf-s-l?view=msvc-170)

Write formatted data to console

[`_cputs`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cputs-cputws?view=msvc-170)

Write string to console

[`_cscanf`, `_cwscanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cscanf-cscanf-l-cwscanf-cwscanf-l?view=msvc-170), [`_cscanf_s`, `_cscanf_s_l`, `_cwscanf_s`, `_cwscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cscanf-s-cscanf-s-l-cwscanf-s-cwscanf-s-l?view=msvc-170)

Read formatted data from console

[`_getch`, `_getwch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getch-getwch?view=msvc-170)

Read character from console

[`_getche`, `_getwche`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getch-getwch?view=msvc-170)

Read character from console and echo it

[`_inp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/inp-inpw-inpd?view=msvc-170)

Read a byte from the specified I/O port

[`_inpd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/inp-inpw-inpd?view=msvc-170)

Read double word from specified I/O port

[`_inpw`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/inp-inpw-inpd?view=msvc-170)

Read 2-byte word from specified I/O port

[`_kbhit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/kbhit?view=msvc-170)

Check for keystroke at console; use before attempting to read from console

[`_outp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/outp-outpw-outpd?view=msvc-170)

Write a byte to the specified I/O port

[`_outpd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/outp-outpw-outpd?view=msvc-170)

Write double word to specified I/O port

[`_outpw`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/outp-outpw-outpd?view=msvc-170)

Write word to specified I/O port

[`_putch`, `_putwch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putch-putwch?view=msvc-170)

Write character to console

[`_ungetch`, `_ungetwch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ungetch-ungetwch-ungetch-nolock-ungetwch-nolock?view=msvc-170)

"Unget" last character read from console so it becomes next character read

## See also

[Input and output](https://learn.microsoft.com/en-us/cpp/c-runtime-library/input-and-output?view=msvc-170)  
[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)