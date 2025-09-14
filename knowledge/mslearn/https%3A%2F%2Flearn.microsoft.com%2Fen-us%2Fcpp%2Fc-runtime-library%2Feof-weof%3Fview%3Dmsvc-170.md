---
title: "EOF, WEOF"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/eof-weof?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
## Syntax

```
#include <stdio.h>
```

## Remarks

`EOF` is returned by an I/O routine when the end-of-file (or in some cases, an error) is encountered.

`WEOF` yields the return value, of type **`wint_t`**, used to signal the end of a wide stream, or to report an error condition.

## See also

[`putc`, `putwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putc-putwc?view=msvc-170)  
[`ungetc`, `ungetwc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ungetc-ungetwc?view=msvc-170)  
[`scanf`, `_scanf_l`, `wscanf`, `_wscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-scanf-l-wscanf-wscanf-l?view=msvc-170)  
[`fflush`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fflush?view=msvc-170)  
[`fclose`, `_fcloseall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fclose-fcloseall?view=msvc-170)  
[`_ungetch`, `_ungetwch`, `_ungetch_nolock`, `_ungetwch_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ungetch-ungetwch-ungetch-nolock-ungetwch-nolock?view=msvc-170)  
[`_putch`, `_putwch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putch-putwch?view=msvc-170)  
[`isascii`, `__isascii`, `iswascii`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isascii-isascii-iswascii?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)